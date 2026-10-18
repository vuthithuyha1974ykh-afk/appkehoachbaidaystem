import React from 'react';
import {
  Rocket,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  Wrench,
  Users,
  Compass,
  FileCheck2,
  TableProperties,
  Zap
} from 'lucide-react';
import { StemLessonPlan, SgkUploadInput } from '../types/stem';
import { SgkDirectPlanner } from './SgkDirectPlanner';

interface HomeOverviewProps {
  onStartCreate: () => void;
  onExploreLibrary: () => void;
  samplePlans: StemLessonPlan[];
  onOpenSamplePlan: (plan: StemLessonPlan) => void;
  onGenerateFromSgk: (input: SgkUploadInput) => Promise<void>;
  isGenerating: boolean;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onStartCreate,
  onExploreLibrary,
  samplePlans,
  onOpenSamplePlan,
  onGenerateFromSgk,
  isGenerating,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* DIRECT SGK UPLOAD CARD - PLACED AT THE TOP */}
      <div id="sgk-planner-section">
        <SgkDirectPlanner
          onGenerateFromSgk={onGenerateFromSgk}
          isLoading={isGenerating}
        />
      </div>

      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-800 to-sky-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Rocket className="w-4 h-4 text-emerald-300 animate-bounce" />
            Trợ lý đắc lực cho Giáo viên Tiểu học Việt Nam
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            STEM PLAN AI <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
              Trợ lý soạn Kế hoạch bài dạy STEM
            </span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed max-w-2xl">
            Giúp giáo viên Lớp 1–5 nhanh chóng thiết kế, tinh chỉnh và hoàn thiện Kế hoạch bài dạy STEM sinh động, an toàn, chuẩn quy trình kỹ thuật và đúng định hướng chương trình GDPT Tiểu học.
          </p>

          {/* 5-step simple workflow */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 block mb-2">
              Trải nghiệm đơn giản 5 bước:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-slate-900">
              <span className="px-3 py-1.5 rounded-xl bg-white shadow-xs">
                1. Nhập thông tin
              </span>
              <span className="text-white">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-300 shadow-xs">
                2. Bấm tạo
              </span>
              <span className="text-white">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-teal-200 shadow-xs">
                3. Nhận kế hoạch
              </span>
              <span className="text-white">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-sky-200 shadow-xs">
                4. Chỉnh sửa
              </span>
              <span className="text-white">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-300 shadow-xs">
                5. Xuất Word & Sử dụng
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onStartCreate}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-sm shadow-lg hover:from-emerald-300 hover:to-teal-200 hover:scale-102 active:scale-98 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-emerald-950" />
              <span>Bắt đầu soạn bài ngay</span>
            </button>

            <button
              onClick={onExploreLibrary}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem Kho bài dạy mẫu</span>
            </button>
          </div>
        </div>
      </div>

      {/* STEM Pedagogy Philosophy */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Triết lý giáo dục STEM Tiểu học
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Học qua hành – Sáng tạo từ thực tiễn
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Không biến bài học STEM thành lý thuyết suông. Mọi kế hoạch bài dạy do AI thiết kế đều lấy học sinh làm trung tâm theo tiến trình chuẩn:
          </p>
        </div>

        {/* 8-step process bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
          {[
            { step: '1', title: 'Thực tiễn', icon: '🌍' },
            { step: '2', title: 'Xác định vấn đề', icon: '❓' },
            { step: '3', title: 'Ý tưởng', icon: '💡' },
            { step: '4', title: 'Bản thiết kế', icon: '📐' },
            { step: '5', title: 'Chế tạo', icon: '🛠️' },
            { step: '6', title: 'Thử nghiệm', icon: '🧪' },
            { step: '7', title: 'Cải tiến', icon: '🔄' },
            { step: '8', title: 'Chia sẻ', icon: '🎤' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex flex-col items-center justify-center space-y-1"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-extrabold text-slate-800 text-[11px] leading-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        {/* 8 Pillars Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            'Học sinh được tự tay làm',
            'Học sinh được quan sát & đo đạc',
            'Học sinh được đặt câu hỏi & dự đoán',
            'Học sinh được thử nghiệm',
            'Học sinh được sai và sửa',
            'Học sinh được hợp tác nhóm',
            'Học sinh tạo ra sản phẩm thực tế',
            'Học sinh giải thích sản phẩm của mình'
          ].map((pill, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{pill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Lesson Plans for Grade 1-5 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Bài dạy STEM tiêu biểu sẵn có (Lớp 1 – 5)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Mở xem ngay để tham khảo cấu trúc chuẩn mực hoặc tùy biến theo lớp của bạn
            </p>
          </div>
          <button
            onClick={onExploreLibrary}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>Xem tất cả bài mẫu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {samplePlans.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              onClick={() => onOpenSamplePlan(plan)}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                    Lớp {plan.overviewSummary.grade}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    ⏱️ {plan.overviewSummary.duration}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {plan.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {plan.realContext.scenario}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                  <p className="line-clamp-1">
                    <strong>Sản phẩm:</strong> {plan.stemProduct.name}
                  </p>
                  <p className="line-clamp-1 text-slate-500 text-[11px]">
                    <strong>Vật liệu:</strong> {plan.overviewSummary.materials}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Khám phá bài học này</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Tạo KHBD tùy chỉnh cao
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Nhập nhanh các yêu cầu, AI đề xuất mục tiêu, tiến trình 5-7 hoạt động và câu hỏi gợi mở 4 mức.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Kiểm tra chất lượng 10 tiêu chí
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tự động chấm điểm, chỉ rõ 🟢 Điểm tốt, 🟡 Cần xem xét và 🔴 Lưu ý an toàn trước khi lên lớp.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Phiếu học tập & Rubric
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Sinh tự động phiếu học tập (vẽ, dán, đo lường) và bảng Rubric 4 mức độ để in hoặc xuất Word.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Tái tạo từng phần độc lập
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Giáo viên có thể yêu cầu AI làm lại riêng phần Khởi động, Chế tạo hoặc Thử nghiệm mà không mất bài cũ.
          </p>
        </div>
      </div>
    </div>
  );
};
