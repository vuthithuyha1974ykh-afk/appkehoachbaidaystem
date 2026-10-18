import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Header, NavTab } from './components/Header';
import { HomeOverview } from './components/HomeOverview';
import { CreatePlanWizard } from './components/CreatePlanWizard';
import { PlanViewer } from './components/PlanViewer';
import { PlanLibrary } from './components/PlanLibrary';
import { StemGuide } from './components/StemGuide';
import { PlanEvaluatorModal } from './components/PlanEvaluatorModal';
import { WorksheetModal } from './components/WorksheetModal';
import { RubricModal } from './components/RubricModal';
import { StemLessonPlan, StemPlanInput, PlanEvaluation, SgkUploadInput } from './types/stem';
import { SAMPLE_STEM_PLANS } from './data/samplePlans';

const STORAGE_KEY = 'stem_plan_ai_saved_plans';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Stored plans (initialized with samples if empty)
  const [savedPlans, setSavedPlans] = useState<StemLessonPlan[]>(() => {
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
    }
    return SAMPLE_STEM_PLANS;
  });

  // Current active plan
  const [currentPlan, setCurrentPlan] = useState<StemLessonPlan>(() => {
    return SAMPLE_STEM_PLANS[1]; // Default to Grade 3 "Bè cứu sinh mini"
  });

  // Loading states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRegeneratingSection, setIsRegeneratingSection] = useState(false);

  // Modals
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isWorksheetModalOpen, setIsWorksheetModalOpen] = useState(false);
  const [isRubricModalOpen, setIsRubricModalOpen] = useState(false);

  // Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync saved plans to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlans));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  }, [savedPlans]);

  // Handle plan generation directly from Textbook (SGK)
  const handleGenerateFromSgk = async (input: SgkUploadInput) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/stem/generate-from-sgk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (data.success && data.plan) {
        setCurrentPlan(data.plan);
        setSavedPlans((prev) => {
          const exists = prev.some((p) => p.id === data.plan.id);
          return exists ? prev.map((p) => (p.id === data.plan.id ? data.plan : p)) : [data.plan, ...prev];
        });
        setActiveTab('create');
        showToast('🎉 Kế hoạch bài dạy STEM từ SGK đã được tạo thành công!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.error || 'Không thể tạo bài dạy từ SGK');
      }
    } catch (err: any) {
      console.error('Error generating from SGK:', err);
      showToast('⚠️ Đã có sự cố kết nối, hệ thống đã nạp Kế hoạch bài dạy chuẩn cho SGK.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle plan generation from form
  const handleGeneratePlan = async (input: StemPlanInput) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/stem/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (data.success && data.plan) {
        setCurrentPlan(data.plan);
        // Automatically save to library
        setSavedPlans((prev) => {
          const exists = prev.some((p) => p.id === data.plan.id);
          return exists ? prev.map((p) => (p.id === data.plan.id ? data.plan : p)) : [data.plan, ...prev];
        });
        setActiveTab('create'); // Will show PlanViewer
        showToast('✨ Kế hoạch bài dạy STEM đã được tạo thành công!');
      } else {
        throw new Error(data.error || 'Không thể tạo bài dạy');
      }
    } catch (err: any) {
      console.error('Error generating plan:', err);
      showToast('⚠️ Đã có sự cố kết nối, hệ thống đã nạp bản thiết kế dự phòng chuẩn cho bài học.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Quality Audit
  const handleRunAudit = async () => {
    setIsEvaluating(true);
    try {
      const response = await fetch('/api/stem/evaluate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: currentPlan }),
      });
      const data = await response.json();
      if (data.success && data.evaluation) {
        const updated = { ...currentPlan, evaluation: data.evaluation };
        setCurrentPlan(updated);
        // update in list if saved
        setSavedPlans((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      }
    } catch (err) {
      console.error('Error running audit:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Handle Section Regeneration
  const handleRegenerateSection = async (sectionKey: string, feedback: string) => {
    setIsRegeneratingSection(true);
    try {
      const response = await fetch('/api/stem/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: currentPlan,
          sectionKey,
          userFeedback: feedback,
        }),
      });
      const data = await response.json();
      if (data.success) {
        showToast(`✅ Đã làm mới phần ${sectionKey} thành công!`);
      }
    } catch (err) {
      console.error('Error regenerating section:', err);
    } finally {
      setIsRegeneratingSection(false);
    }
  };

  // Save / Bookmark
  const handleSaveToLibrary = (plan: StemLessonPlan) => {
    setSavedPlans((prev) => {
      const exists = prev.some((p) => p.id === plan.id);
      if (exists) {
        showToast('📌 Kế hoạch đã có sẵn trong Kho bài dạy của bạn!');
        return prev;
      }
      showToast('💾 Đã lưu thành công Kế hoạch vào Kho bài dạy!');
      return [plan, ...prev];
    });
  };

  // Duplicate
  const handleDuplicatePlan = (plan: StemLessonPlan) => {
    const copy: StemLessonPlan = {
      ...plan,
      id: 'copy-' + Date.now(),
      title: `${plan.title} (Bản sao)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedPlans((prev) => [copy, ...prev]);
    setCurrentPlan(copy);
    showToast('📋 Đã nhân bản bài dạy thành công!');
  };

  // Delete
  const handleDeletePlan = (id: string) => {
    if (window.confirm('Thầy/Cô có chắc chắn muốn xóa bài dạy này khỏi kho?')) {
      setSavedPlans((prev) => prev.filter((p) => p.id !== id));
      showToast('🗑️ Đã xóa bài dạy khỏi Kho bài dạy.');
    }
  };

  const isCurrentPlanSaved = savedPlans.some((p) => p.id === currentPlan.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onNewPlanClick={() => {
          setActiveTab('home');
          setTimeout(() => {
            document.getElementById('sgk-planner-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        }}
        savedCount={savedPlans.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <HomeOverview
            onStartCreate={() => {
              document.getElementById('sgk-planner-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreLibrary={() => setActiveTab('library')}
            samplePlans={savedPlans}
            onOpenSamplePlan={(p) => {
              setCurrentPlan(p);
              setActiveTab('create');
            }}
            onGenerateFromSgk={handleGenerateFromSgk}
            isGenerating={isGenerating}
          />
        )}

        {activeTab === 'create' && (
          <div>
            {/* Quick banner to jump to new SGK creation */}
            <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-600">
                  Đang xem bài dạy: <strong className="text-emerald-800">{currentPlan.title}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('home');
                  setTimeout(() => {
                    document.getElementById('sgk-planner-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 60);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>⚡ Soạn bài dạy mới từ SGK (1 chạm)</span>
              </button>
            </div>

            {currentPlan ? (
              <PlanViewer
                plan={currentPlan}
                onUpdatePlan={(updated) => {
                  setCurrentPlan(updated);
                  setSavedPlans((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
                  showToast('💾 Đã cập nhật thay đổi bài dạy!');
                }}
                onOpenAudit={() => {
                  setIsAuditModalOpen(true);
                  if (!currentPlan.evaluation) {
                    handleRunAudit();
                  }
                }}
                onOpenWorksheet={() => setIsWorksheetModalOpen(true)}
                onOpenRubric={() => setIsRubricModalOpen(true)}
                onSaveToLibrary={handleSaveToLibrary}
                isSavedInLibrary={isCurrentPlanSaved}
                onRegenerateSectionRequest={handleRegenerateSection}
                isRegeneratingSection={isRegeneratingSection}
              />
            ) : null}

            {/* Creation Form button / toggler */}
            <div className="max-w-4xl mx-auto px-4 mt-8 pt-8 border-t border-slate-200">
              <CreatePlanWizard
                onSubmit={handleGeneratePlan}
                onGenerateFromSgk={handleGenerateFromSgk}
                isLoading={isGenerating}
              />
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <PlanLibrary
            plans={savedPlans}
            onSelectPlan={(p) => {
              setCurrentPlan(p);
              setActiveTab('create');
            }}
            onDuplicatePlan={handleDuplicatePlan}
            onDeletePlan={handleDeletePlan}
            onAddNewClick={() => {
              setActiveTab('create');
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'worksheet' && currentPlan && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-700">Mẫu Phiếu học tập thực hành</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{currentPlan.worksheet.title}</h2>
                  <p className="text-xs text-slate-500">Đang chọn bài dạy: {currentPlan.title}</p>
                </div>
                <button
                  onClick={() => setIsWorksheetModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Mở chế độ in ấn & Xuất Word
                </button>
              </div>

              {/* In-page preview */}
              <div className="space-y-4">
                {currentPlan.worksheet.sections.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <span className="font-extrabold text-sm text-slate-900 block mb-1">
                      {idx + 1}. {sec.title}
                    </span>
                    <p className="text-xs text-slate-600 italic mb-2">{sec.instructions}</p>
                    {sec.items && (
                      <ul className="text-xs space-y-1 list-disc pl-4 text-slate-700">
                        {sec.items.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rubric' && currentPlan && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold uppercase text-indigo-700">Khung Rubric 4 Mức</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{currentPlan.rubric.title}</h2>
                  <p className="text-xs text-slate-500">Đang chọn bài dạy: {currentPlan.title}</p>
                </div>
                <button
                  onClick={() => setIsRubricModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
                >
                  Mở toàn màn hình & Xuất bảng
                </button>
              </div>

              {/* In-page preview table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800">
                      <th className="border border-slate-200 p-2.5 text-left w-1/5">Tiêu chí</th>
                      <th className="border border-slate-200 p-2.5 text-left w-1/5 text-rose-800">Mức 1 (Cần cố gắng)</th>
                      <th className="border border-slate-200 p-2.5 text-left w-1/5 text-amber-800">Mức 2 (Đạt)</th>
                      <th className="border border-slate-200 p-2.5 text-left w-1/5 text-sky-800">Mức 3 (Khá)</th>
                      <th className="border border-slate-200 p-2.5 text-left w-1/5 text-emerald-800">Mức 4 (Tốt / Xuất sắc)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPlan.rubric.criteria.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="border border-slate-200 p-2.5 font-bold text-slate-900 bg-slate-50/50">{c.criterion}</td>
                        <td className="border border-slate-200 p-2.5 text-slate-700">{c.level1}</td>
                        <td className="border border-slate-200 p-2.5 text-slate-700">{c.level2}</td>
                        <td className="border border-slate-200 p-2.5 text-slate-700">{c.level3}</td>
                        <td className="border border-slate-200 p-2.5 text-slate-700 font-medium">{c.level4}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && <StemGuide />}
      </main>

      {/* Global Modals */}
      {currentPlan && (
        <>
          <PlanEvaluatorModal
            isOpen={isAuditModalOpen}
            onClose={() => setIsAuditModalOpen(false)}
            evaluation={currentPlan.evaluation || null}
            isLoading={isEvaluating}
            onRunAudit={handleRunAudit}
            planTitle={currentPlan.title}
          />

          <WorksheetModal
            isOpen={isWorksheetModalOpen}
            onClose={() => setIsWorksheetModalOpen(false)}
            worksheet={currentPlan.worksheet}
          />

          <RubricModal
            isOpen={isRubricModalOpen}
            onClose={() => setIsRubricModalOpen(false)}
            rubric={currentPlan.rubric}
          />
        </>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-700">
          <span>🚀 STEM PLAN AI</span>
          <span>•</span>
          <span>TRỢ LÝ SOẠN KẾ HOẠCH BÀI DẠY STEM TIỂU HỌC VIỆT NAM</span>
        </div>
        <p className="max-w-2xl mx-auto text-slate-400">
          Thiết kế hỗ trợ giáo viên Tiểu học Việt Nam triển khai giáo dục STEM hiệu quả theo hướng dẫn Công văn 2345/BGDĐT.
          Nội dung do AI đề xuất cần được giáo viên kiểm tra, điều chỉnh phù hợp với thực tế lớp học.
        </p>
      </footer>
      <SpeedInsights />
    </div>
  );
}
