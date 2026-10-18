import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  X,
  Sparkles,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { PlanEvaluation } from '../types/stem';

interface PlanEvaluatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: PlanEvaluation | null;
  isLoading: boolean;
  onRunAudit: () => void;
  planTitle: string;
}

export const PlanEvaluatorModal: React.FC<PlanEvaluatorModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  isLoading,
  onRunAudit,
  planTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl">
                Kiểm tra chất lượng KHBD STEM
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                10 tiêu chí sư phạm giáo dục STEM Tiểu học Việt Nam
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {isLoading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">
                AI đang rà soát 10 tiêu chuẩn sư phạm của bài dạy "{planTitle}"...
              </p>
              <p className="text-xs text-slate-500">
                Kiểm tra tính an toàn, thời lượng, mức độ tự chủ của học sinh và tính khả thi của sản phẩm...
              </p>
            </div>
          ) : !evaluation ? (
            <div className="py-12 text-center space-y-4">
              <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">
                Chưa có dữ liệu kiểm định cho bài dạy này
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Bấm nút bên dưới để AI tự động phân tích tính an toàn, sự phù hợp lứa tuổi và logic bài học.
              </p>
              <button
                onClick={onRunAudit}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700"
              >
                Kiểm tra ngay
              </button>
            </div>
          ) : (
            <>
              {/* Score card */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Điểm đánh giá sư phạm
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-emerald-700">
                      {evaluation.overallScore}
                    </span>
                    <span className="text-slate-500 text-sm font-bold">/ 100 điểm</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 max-w-md leading-relaxed">
                    {evaluation.summary}
                  </p>
                </div>
                <div className="px-4 py-3 rounded-xl bg-white shadow-xs border border-emerald-100 text-center">
                  <span className="text-xs font-bold text-slate-500">Đánh giá chung</span>
                  <div className="text-sm font-extrabold text-emerald-600 mt-0.5">
                    {evaluation.overallScore >= 90
                      ? '🌟 Xuất sắc - Chuẩn STEM'
                      : evaluation.overallScore >= 75
                      ? '👍 Đạt chuẩn tốt'
                      : '⚠️ Cần hoàn thiện thêm'}
                  </div>
                </div>
              </div>

              {/* 10 Checklist criteria */}
              {evaluation.checklist && evaluation.checklist.length > 0 && (
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Bộ 10 câu hỏi kiểm định trước khi dạy:
                  </h4>
                  <div className="space-y-2">
                    {evaluation.checklist.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                          item.passed
                            ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                            : 'bg-amber-50/50 border-amber-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {item.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold">{item.question}</span>
                            {item.note && (
                              <p className="text-slate-500 text-[11px] mt-0.5">{item.note}</p>
                            )}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] shrink-0 ${
                            item.passed
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.passed ? 'ĐẠT' : 'XEM XÉT'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3 Categories: 🟢 Điểm tốt, 🟡 Điểm cần xem xét, 🔴 Vấn đề cần chỉnh sửa */}
              <div className="grid grid-cols-1 gap-4">
                {/* 🟢 Điểm tốt */}
                <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2">
                    <span>🟢</span> ĐIỂM TỐT CỦA BÀI DẠY
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {evaluation.goodPoints.map((gp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{gp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 🟡 Điểm cần xem xét */}
                {evaluation.pointsToConsider && evaluation.pointsToConsider.length > 0 && (
                  <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
                      <span>🟡</span> ĐIỂM CẦN XEM XÉT & TỐI ƯU
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {evaluation.pointsToConsider.map((ptc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{ptc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 🔴 Vấn đề cần chỉnh sửa */}
                {evaluation.issuesToFix && evaluation.issuesToFix.length > 0 && (
                  <div className="bg-rose-50/80 rounded-2xl p-4 border border-rose-200">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-rose-900 flex items-center gap-1.5 mb-2">
                      <span>🔴</span> LƯU Ý AN TOÀN & ĐIỀU CHỈNH
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {evaluation.issuesToFix.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gợi ý cụ thể */}
                {evaluation.suggestions && evaluation.suggestions.length > 0 && (
                  <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-200">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-sky-900 flex items-center gap-1.5 mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                      GỢI Ý CẢI TIẾN TỪ CHUYÊN GIA
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {evaluation.suggestions.map((sug, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-sky-600 font-bold">💡</span>
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={onRunAudit}
            disabled={isLoading}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Kiểm tra lại toàn diện
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
