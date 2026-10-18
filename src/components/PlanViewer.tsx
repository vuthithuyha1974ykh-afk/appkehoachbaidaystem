import React, { useState } from 'react';
import {
  ShieldAlert,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  FileCheck2,
  TableProperties,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  Edit3,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  Eye,
  Settings,
  Layers,
  Wrench,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { StemLessonPlan, LearningActivity } from '../types/stem';
import { copyToClipboard, exportPlanToWord } from '../utils/exportUtils';
import { RegenerateSectionModal } from './RegenerateSectionModal';
import { EditSectionModal } from './EditSectionModal';

interface PlanViewerProps {
  plan: StemLessonPlan;
  onUpdatePlan: (updatedPlan: StemLessonPlan) => void;
  onOpenAudit: () => void;
  onOpenWorksheet: () => void;
  onOpenRubric: () => void;
  onSaveToLibrary: (plan: StemLessonPlan) => void;
  isSavedInLibrary: boolean;
  onRegenerateSectionRequest: (sectionKey: string, feedback: string) => Promise<void>;
  isRegeneratingSection: boolean;
}

export const PlanViewer: React.FC<PlanViewerProps> = ({
  plan,
  onUpdatePlan,
  onOpenAudit,
  onOpenWorksheet,
  onOpenRubric,
  onSaveToLibrary,
  isSavedInLibrary,
  onRegenerateSectionRequest,
  isRegeneratingSection,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    context: true,
    objectives: true,
    stemKnowledge: true,
    product: true,
    preparation: true,
    activities: true,
    questions: true,
    difficulties: true,
    differentiation: true,
    assessment: true,
    rubric: true,
    worksheet: true
  });

  // Modals for editing & regenerating section
  const [activeRegenSection, setActiveRegenSection] = useState<{ key: string; name: string } | null>(null);
  const [activeEditSection, setActiveEditSection] = useState<{
    key: string;
    title: string;
    content: string;
  } | null>(null);

  const toggleSection = (sec: string) => {
    setExpandedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const expandAll = () => {
    const allTrue: Record<string, boolean> = {};
    Object.keys(expandedSections).forEach((k) => (allTrue[k] = true));
    setExpandedSections(allTrue);
  };

  const collapseAll = () => {
    const allFalse: Record<string, boolean> = {};
    Object.keys(expandedSections).forEach((k) => (allFalse[k] = false));
    setExpandedSections(allFalse);
  };

  const handleCopySection = async (key: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleCopyEntirePlan = async () => {
    let full = `KẾ HOẠCH BÀI DẠY STEM: ${plan.title.toUpperCase()}\n`;
    full += `Lớp: ${plan.overviewSummary.grade} | Thời lượng: ${plan.overviewSummary.duration}\n\n`;
    full += `I. BỐI CẢNH THỰC TIỄN:\n${plan.realContext.scenario}\nVấn đề: ${plan.realContext.problemStatement}\n\n`;
    full += `II. MỤC TIÊU:\n- Kiến thức:\n${plan.objectives.knowledge.map((k) => `  + ${k}`).join('\n')}\n`;
    full += `- Năng lực STEM:\n${plan.objectives.competencies.stemCompetencies.map((c) => `  + ${c}`).join('\n')}\n\n`;
    full += `III. SẢN PHẨM STEM: ${plan.stemProduct.name}\n- Vật liệu: ${plan.stemProduct.materials.join(', ')}\n- Tiêu chí thành công: ${plan.stemProduct.successCriteria.join('; ')}\n\n`;
    full += `IV. TIẾN TRÌNH DẠY HỌC:\n`;
    plan.activities.forEach((act) => {
      full += `\n${act.name}\n- Mục tiêu: ${act.objective}\n- Hoạt động GV: ${act.teacherActivity.join('; ')}\n- Hoạt động HS: ${act.studentActivity.join('; ')}\n- Sản phẩm: ${act.expectedProduct}\n`;
    });

    const ok = await copyToClipboard(full);
    if (ok) {
      setCopiedKey('entire_plan');
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Action Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-md flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm sm:text-base text-slate-800 line-clamp-1 max-w-xs sm:max-w-md">
            {plan.title}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            Lớp {plan.overviewSummary.grade}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Kiểm tra chất lượng */}
          <button
            onClick={onOpenAudit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 text-xs font-bold transition-all shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Kiểm tra KHBD</span>
          </button>

          {/* Phiếu học tập */}
          <button
            onClick={onOpenWorksheet}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200 text-xs font-bold transition-all shadow-xs"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Phiếu học tập</span>
          </button>

          {/* Rubric */}
          <button
            onClick={onOpenRubric}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold transition-all shadow-xs"
          >
            <TableProperties className="w-3.5 h-3.5 text-indigo-600" />
            <span>Rubric</span>
          </button>

          {/* Lưu vào kho */}
          <button
            onClick={() => onSaveToLibrary(plan)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs ${
              isSavedInLibrary
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            {isSavedInLibrary ? (
              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
            <span>{isSavedInLibrary ? 'Đã lưu kho' : 'Lưu vào kho'}</span>
          </button>

          {/* Sao chép toàn bộ */}
          <button
            onClick={handleCopyEntirePlan}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-xs"
          >
            {copiedKey === 'entire_plan' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedKey === 'entire_plan' ? 'Đã sao chép' : 'Sao chép KHBD'}</span>
          </button>

          {/* Xuất file Word */}
          <button
            onClick={() => exportPlanToWord(plan)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Word (.doc)</span>
          </button>
        </div>
      </div>

      {/* Expand/Collapse All controls */}
      <div className="flex justify-end gap-2 text-xs font-bold text-slate-500">
        <button
          onClick={expandAll}
          className="hover:text-emerald-700 transition-colors flex items-center gap-1"
        >
          <ChevronDown className="w-3.5 h-3.5" /> Mở rộng tất cả
        </button>
        <span>•</span>
        <button
          onClick={collapseAll}
          className="hover:text-emerald-700 transition-colors flex items-center gap-1"
        >
          <ChevronUp className="w-3.5 h-3.5" /> Thu gọn tất cả
        </button>
      </div>

      {/* ==================== 📋 TÓM TẮT KẾ HOẠCH ==================== */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold tracking-wider uppercase backdrop-blur-md">
              📋 Tóm tắt kế hoạch bài dạy STEM
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs">
              Lớp {plan.overviewSummary.grade}
            </span>
          </div>

          <span className="text-xs text-emerald-100 font-medium">
            Mức độ: {plan.overviewSummary.difficultyLevel}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
          {plan.title}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-emerald-200 font-semibold block">Khối lớp</span>
            <span className="text-sm font-bold">Lớp {plan.overviewSummary.grade}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-emerald-200 font-semibold block">Chủ đề STEM</span>
            <span className="text-sm font-bold line-clamp-1" title={plan.overviewSummary.stemTopic}>
              {plan.overviewSummary.stemTopic}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-emerald-200 font-semibold block">Thời lượng</span>
            <span className="text-sm font-bold">{plan.overviewSummary.duration}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 sm:col-span-2">
            <span className="text-[11px] text-emerald-200 font-semibold block">Sản phẩm STEM</span>
            <span className="text-sm font-bold line-clamp-1" title={plan.overviewSummary.product}>
              {plan.overviewSummary.product}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-emerald-200 font-semibold block">Vật liệu chính</span>
            <span className="text-sm font-bold line-clamp-1" title={plan.overviewSummary.materials}>
              {plan.overviewSummary.materials}
            </span>
          </div>
        </div>
      </div>

      {/* ==================== 1. THÔNG TIN CHUNG ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('generalInfo')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center">
              1
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              THÔNG TIN CHUNG
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {expandedSections.generalInfo ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.generalInfo && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <div>
              <p><strong>Môn học chính:</strong> {plan.generalInfo.subject}</p>
              <p className="mt-1">
                <strong>Các môn tích hợp:</strong> {plan.generalInfo.integratedSubjects.join(', ')}
              </p>
            </div>
            <div>
              <p><strong>Thời lượng:</strong> {plan.generalInfo.periods} tiết ({plan.overviewSummary.duration})</p>
              <p className="mt-1"><strong>Sĩ số & Nhóm:</strong> {plan.generalInfo.classSize || '30 - 35 học sinh'}</p>
              <p className="mt-1 text-xs text-slate-500"><strong>Đặc điểm học sinh:</strong> {plan.generalInfo.targetAudience}</p>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 2. BỐI CẢNH THỰC TIỄN ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('context')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-extrabold text-sm flex items-center justify-center">
              2
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              BỐI CẢNH THỰC TIỄN
            </h3>
            {plan.realContext.isAiSuggested && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                AI đề xuất – giáo viên cần kiểm tra
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopySection(
                  'context',
                  `Tình huống: ${plan.realContext.scenario}\nVấn đề: ${plan.realContext.problemStatement}\nCâu hỏi: ${plan.realContext.drivingQuestion}`
                );
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              {copiedKey === 'context' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveEditSection({
                  key: 'context',
                  title: 'Bối cảnh thực tiễn',
                  content: `${plan.realContext.scenario}\n\nVấn đề cần giải quyết: ${plan.realContext.problemStatement}\n\nCâu hỏi định hướng: ${plan.realContext.drivingQuestion}`
                });
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveRegenSection({ key: 'context', name: 'Bối cảnh thực tiễn' });
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {expandedSections.context ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.context && (
          <div className="p-6 space-y-4 text-sm text-slate-700">
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100">
              <span className="font-bold text-teal-900 block mb-1">
                Tình huống thực tế gần gũi học sinh:
              </span>
              <p className="leading-relaxed">{plan.realContext.scenario}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">
                  Vấn đề cần giải quyết:
                </span>
                <p>{plan.realContext.problemStatement}</p>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                <span className="font-bold text-amber-900 block mb-1">
                  Câu hỏi định hướng học tập:
                </span>
                <p className="font-medium text-amber-800 italic">
                  "{plan.realContext.drivingQuestion}"
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 3. MỤC TIÊU ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('objectives')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 font-extrabold text-sm flex items-center justify-center">
              3
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              MỤC TIÊU BÀI DẠY (Kiến thức - Năng lực - Phẩm chất)
            </h3>
            {plan.objectives.isAiSuggested && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                AI đề xuất – giáo viên cần kiểm tra
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopySection(
                  'objectives',
                  `Kiến thức:\n${plan.objectives.knowledge.join('\n')}\n\nNăng lực STEM:\n${plan.objectives.competencies.stemCompetencies.join('\n')}\n\nPhẩm chất:\n${plan.objectives.qualities.join('\n')}`
                );
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              {copiedKey === 'objectives' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveRegenSection({ key: 'objectives', name: 'Mục tiêu bài dạy' });
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {expandedSections.objectives ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.objectives && (
          <div className="p-6 space-y-5 text-sm text-slate-700">
            {/* 1. Kiến thức */}
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-2 text-emerald-800">
                1. Kiến thức cốt lõi:
              </h4>
              <ul className="space-y-1.5 pl-4 list-disc">
                {plan.objectives.knowledge.map((k, idx) => (
                  <li key={idx}>{k}</li>
                ))}
              </ul>
            </div>

            {/* 2. Năng lực */}
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-2 text-sky-800">
                2. Năng lực:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100">
                  <span className="font-bold text-xs uppercase text-sky-900 block mb-2">
                    Năng lực đặc thù STEM (Thiết kế & Giải quyết vấn đề)
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                    {plan.objectives.competencies.stemCompetencies.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-xs uppercase text-slate-800 block mb-2">
                    Năng lực chung (Tự chủ, Hợp tác, Giao tiếp)
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                    {plan.objectives.competencies.generalCompetencies.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Phẩm chất */}
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-2 text-amber-800">
                3. Phẩm chất chủ yếu:
              </h4>
              <ul className="space-y-1.5 pl-4 list-disc">
                {plan.objectives.qualities.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 4. KIẾN THỨC STEM (S-T-E-M) ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('stemKnowledge')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-extrabold text-sm flex items-center justify-center">
              4
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              KIẾN THỨC STEM TÍCH HỢP (S – T – E – M)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopySection(
                  'stemKnowledge',
                  `S (Khoa học): ${plan.stemKnowledge.science}\nT (Công nghệ): ${plan.stemKnowledge.technology}\nE (Kỹ thuật): ${plan.stemKnowledge.engineering}\nM (Toán học): ${plan.stemKnowledge.mathematics}`
                );
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              {copiedKey === 'stemKnowledge' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            {expandedSections.stemKnowledge ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.stemKnowledge && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-2">
                S
              </span>
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-emerald-900 mb-1">
                Khoa học (Science)
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed">
                {plan.stemKnowledge.science}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
              <span className="w-8 h-8 rounded-lg bg-sky-600 text-white font-black text-sm flex items-center justify-center mb-2">
                T
              </span>
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-sky-900 mb-1">
                Công nghệ (Technology)
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed">
                {plan.stemKnowledge.technology}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="w-8 h-8 rounded-lg bg-amber-600 text-white font-black text-sm flex items-center justify-center mb-2">
                E
              </span>
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-amber-900 mb-1">
                Kỹ thuật (Engineering)
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed">
                {plan.stemKnowledge.engineering}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
              <span className="w-8 h-8 rounded-lg bg-purple-600 text-white font-black text-sm flex items-center justify-center mb-2">
                M
              </span>
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-purple-900 mb-1">
                Toán học (Mathematics)
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed">
                {plan.stemKnowledge.mathematics}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 5. SẢN PHẨM STEM ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('product')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center">
              5
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              SẢN PHẨM STEM VÀ TIÊU CHÍ ĐÁNH GIÁ THÀNH CÔNG
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopySection(
                  'product',
                  `Tên sản phẩm: ${plan.stemProduct.name}\nMục đích: ${plan.stemProduct.purpose}\nVật liệu: ${plan.stemProduct.materials.join(', ')}\nTiêu chí thành công: ${plan.stemProduct.successCriteria.join('; ')}`
                );
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              {copiedKey === 'product' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveRegenSection({ key: 'stemProduct', name: 'Sản phẩm STEM' });
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {expandedSections.product ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.product && (
          <div className="p-6 space-y-4 text-sm text-slate-700">
            <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Tên sản phẩm</span>
                <h4 className="text-lg font-extrabold text-emerald-800">
                  {plan.stemProduct.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-500 uppercase">Mục đích sử dụng</span>
                <p className="font-medium text-slate-800">{plan.stemProduct.purpose}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-xs uppercase text-slate-800 block mb-2">
                  Quy cách kỹ thuật:
                </span>
                <ul className="text-xs space-y-1 list-disc pl-4">
                  {plan.stemProduct.specifications.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-xs uppercase text-slate-800 block mb-2">
                  Giới hạn thiết kế:
                </span>
                <ul className="text-xs space-y-1 list-disc pl-4">
                  {plan.stemProduct.designConstraints.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <span className="font-bold text-xs uppercase text-emerald-900 block mb-2">
                  Tiêu chí thành công (Đo lường được):
                </span>
                <ul className="text-xs space-y-1.5 list-disc pl-4 text-emerald-950 font-medium">
                  {plan.stemProduct.successCriteria.map((sc, idx) => (
                    <li key={idx}>{sc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 6. CHUẨN BỊ & AN TOÀN ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('preparation')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-sm flex items-center justify-center">
              6
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              CHUẨN BỊ THIẾT BỊ, VẬT LIỆU & LƯU Ý AN TOÀN
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopySection(
                  'preparation',
                  `Giáo viên: ${plan.preparation.teacher.join('; ')}\nHọc sinh: ${plan.preparation.student.join('; ')}\nLưu ý an toàn: ${plan.preparation.safetyNotes.join('; ')}`
                );
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              {copiedKey === 'preparation' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            {expandedSections.preparation ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.preparation && (
          <div className="p-6 space-y-4 text-sm text-slate-700">
            {/* LƯU Ý AN TOÀN NỔI BẬT */}
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950">
              <div className="flex items-center gap-2 font-black text-sm uppercase text-amber-900 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                ⚠️ LƯU Ý AN TOÀN ĐẶC BIỆT DÀNH CHO TIỂU HỌC:
              </div>
              <ul className="space-y-1 text-xs list-disc pl-5 font-semibold">
                {plan.preparation.safetyNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-xs uppercase text-slate-800 block mb-2">
                  1. Giáo viên chuẩn bị:
                </span>
                <ul className="text-xs space-y-1 list-disc pl-4">
                  {plan.preparation.teacher.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-xs uppercase text-slate-800 block mb-2">
                  2. Học sinh chuẩn bị (theo nhóm):
                </span>
                <ul className="text-xs space-y-1 list-disc pl-4">
                  {plan.preparation.student.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 7. TIẾN TRÌNH DẠY HỌC CHI TIẾT ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('activities')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-extrabold text-sm flex items-center justify-center">
              7
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              TIẾN TRÌNH DẠY HỌC (CHUỖI HOẠT ĐỘNG STEM)
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs">
              {plan.activities.length} hoạt động
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveRegenSection({ key: 'activities', name: 'Tiến trình dạy học' });
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {expandedSections.activities ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.activities && (
          <div className="p-6 space-y-6">
            {plan.activities.map((act, idx) => (
              <div
                key={act.step || idx}
                className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white"
              >
                {/* Activity header */}
                <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {act.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {act.stageType}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-xs font-semibold">
                      ⏱️ {act.time}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                    <p><strong>Mục tiêu:</strong> {act.objective}</p>
                    <p><strong>Nội dung:</strong> {act.content}</p>
                  </div>

                  {/* 2 columns table of teacher vs student activity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 rounded-xl overflow-hidden">
                    <div className="p-4 bg-sky-50/40 border-b md:border-b-0 md:border-r border-slate-200">
                      <h5 className="font-extrabold text-xs uppercase tracking-wider text-sky-900 mb-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-600" />
                        Hoạt động của Giáo viên
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                        {act.teacherActivity.map((ta, tIdx) => (
                          <li key={tIdx}>{ta}</li>
                        ))}
                      </ul>

                      {/* Guiding questions */}
                      {act.guidingQuestions && act.guidingQuestions.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-sky-200/60">
                          <span className="font-bold text-[11px] text-sky-950 uppercase block mb-1">
                            💬 Câu hỏi gợi mở:
                          </span>
                          <ul className="space-y-1 text-[11px] italic text-sky-900 pl-3">
                            {act.guidingQuestions.map((gq, gIdx) => (
                              <li key={gIdx}>"{gq}"</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-emerald-50/40">
                      <h5 className="font-extrabold text-xs uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        Hoạt động của Học sinh
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                        {act.studentActivity.map((sa, sIdx) => (
                          <li key={sIdx}>{sa}</li>
                        ))}
                      </ul>

                      {/* Expected Product */}
                      <div className="mt-3 pt-3 border-t border-emerald-200/60">
                        <span className="font-bold text-[11px] text-emerald-950 uppercase block mb-1">
                          🎯 Sản phẩm học tập mong đợi:
                        </span>
                        <p className="text-xs font-bold text-emerald-800">
                          {act.expectedProduct}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ==================== 8. HỆ THỐNG CÂU HỎI GỢI MỞ THEO 4 MỨC ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('questions')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-extrabold text-sm flex items-center justify-center">
              8
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              HỆ THỐNG CÂU HỎI GỢI MỞ THEO 4 MỨC ĐỘ
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopySection(
                  'questions',
                  `Mức 1 (Quan sát):\n${plan.guidingQuestionsByLevel.level1Observe.join('\n')}\n\nMức 2 (Giải thích):\n${plan.guidingQuestionsByLevel.level2Explain.join('\n')}\n\nMức 3 (Vận dụng):\n${plan.guidingQuestionsByLevel.level3Apply.join('\n')}\n\nMức 4 (Cải tiến):\n${plan.guidingQuestionsByLevel.level4Improve.join('\n')}`
                );
              }}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 text-xs font-semibold flex items-center gap-1"
            >
              {copiedKey === 'questions' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            {expandedSections.questions ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.questions && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-xs uppercase text-slate-800 block mb-1">
                Mức 1 – Quan sát ("Em nhìn thấy điều gì?")
              </span>
              <ul className="text-xs space-y-1 list-disc pl-4 italic text-slate-700">
                {plan.guidingQuestionsByLevel.level1Observe.map((q, idx) => (
                  <li key={idx}>"{q}"</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
              <span className="font-bold text-xs uppercase text-sky-900 block mb-1">
                Mức 2 – Giải thích ("Vì sao em nghĩ như vậy?")
              </span>
              <ul className="text-xs space-y-1 list-disc pl-4 italic text-slate-700">
                {plan.guidingQuestionsByLevel.level2Explain.map((q, idx) => (
                  <li key={idx}>"{q}"</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="font-bold text-xs uppercase text-amber-900 block mb-1">
                Mức 3 – Vận dụng ("Nếu thay đổi vật liệu thì điều gì xảy ra?")
              </span>
              <ul className="text-xs space-y-1 list-disc pl-4 italic text-slate-700">
                {plan.guidingQuestionsByLevel.level3Apply.map((q, idx) => (
                  <li key={idx}>"{q}"</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-xs uppercase text-emerald-900 block mb-1">
                Mức 4 – Cải tiến ("Em sẽ thay đổi điều gì để tốt hơn?")
              </span>
              <ul className="text-xs space-y-1 list-disc pl-4 italic text-emerald-950 font-medium">
                {plan.guidingQuestionsByLevel.level4Improve.map((q, idx) => (
                  <li key={idx}>"{q}"</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 9. DỰ KIẾN KHÓ KHĂN & GỢI Ý HỖ TRỢ ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('difficulties')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 font-extrabold text-sm flex items-center justify-center">
              9
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              DỰ KIẾN KHÓ KHĂN & GỢI Ý HỖ TRỢ CỦA GIÁO VIÊN
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {expandedSections.difficulties ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.difficulties && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="border border-slate-300 p-2.5 text-left w-1/4">Khía cạnh</th>
                    <th className="border border-slate-300 p-2.5 text-left w-1/3">Khó khăn dự kiến của học sinh</th>
                    <th className="border border-slate-300 p-2.5 text-left">Gợi ý hỗ trợ của Giáo viên</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.difficultiesAndSupport.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 font-bold text-slate-900 bg-slate-50/60">
                        {item.aspect}
                      </td>
                      <td className="border border-slate-300 p-2.5 text-slate-700">
                        {item.difficulty}
                      </td>
                      <td className="border border-slate-300 p-2.5 text-emerald-800 font-medium">
                        💡 {item.teacherSupport}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 10. PHÂN HÓA ĐỐI TƯỢNG ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('differentiation')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-extrabold text-sm flex items-center justify-center">
              10
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              PHÂN HÓA ĐỐI TƯỢNG HỌC SINH
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {expandedSections.differentiation ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.differentiation && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="font-bold uppercase text-amber-900 block mb-2">
                Học sinh cần hỗ trợ (Nhiệm vụ đơn giản, gợi ý trực quan)
              </span>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                {plan.differentiation.studentsNeedingSupport.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="font-bold uppercase text-emerald-900 block mb-2">
                Học sinh hoàn thành tốt (Thử thách mở rộng, cải tiến thêm)
              </span>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                {plan.differentiation.advancedStudents.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 11. ĐÁNH GIÁ (TRƯỚC - TRONG - SAU) ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div
          onClick={() => toggleSection('assessment')}
          className="px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-extrabold text-sm flex items-center justify-center">
              11
            </span>
            <h3 className="font-extrabold text-base text-slate-900">
              ĐÁNH GIÁ QUÁ TRÌNH & KẾT QUẢ (Trước – Trong – Sau hoạt động)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {expandedSections.assessment ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {expandedSections.assessment && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold uppercase text-slate-900 block mb-2">
                1. Trước hoạt động
              </span>
              <ul className="space-y-1 list-disc pl-4 text-slate-600">
                {plan.assessment.preActivity.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
              <span className="font-bold uppercase text-sky-900 block mb-2">
                2. Trong hoạt động
              </span>
              <ul className="space-y-1 list-disc pl-4 text-slate-700">
                {plan.assessment.duringActivity.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="font-bold uppercase text-emerald-900 block mb-2">
                3. Cuối hoạt động
              </span>
              <ul className="space-y-1 list-disc pl-4 text-emerald-950">
                {plan.assessment.postActivity.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Quick Launch Cards for Rubric and Worksheet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={onOpenWorksheet}
          className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Phiếu học tập học sinh</h4>
              <p className="text-xs text-slate-500">Xem trước, chỉnh sửa và in ấn theo lứa tuổi</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-amber-600" />
        </div>

        <div
          onClick={onOpenRubric}
          className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-200 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <TableProperties className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Bảng Rubric 4 Mức</h4>
              <p className="text-xs text-slate-500">Xem ma trận đánh giá sản phẩm & hoạt động</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-indigo-600" />
        </div>
      </div>

      {/* Section Regeneration Modal */}
      {activeRegenSection && (
        <RegenerateSectionModal
          isOpen={Boolean(activeRegenSection)}
          onClose={() => setActiveRegenSection(null)}
          sectionName={activeRegenSection.name}
          sectionKey={activeRegenSection.key}
          isLoading={isRegeneratingSection}
          onConfirm={async (key, instruction) => {
            await onRegenerateSectionRequest(key, instruction);
            setActiveRegenSection(null);
          }}
        />
      )}

      {/* Direct Edit Modal */}
      {activeEditSection && (
        <EditSectionModal
          isOpen={Boolean(activeEditSection)}
          onClose={() => setActiveEditSection(null)}
          sectionTitle={activeEditSection.title}
          initialContent={activeEditSection.content}
          onSave={(newContent) => {
            // Apply edit logic if string
            if (activeEditSection.key === 'context') {
              onUpdatePlan({
                ...plan,
                realContext: {
                  ...plan.realContext,
                  scenario: newContent
                }
              });
            }
          }}
        />
      )}
    </div>
  );
};
