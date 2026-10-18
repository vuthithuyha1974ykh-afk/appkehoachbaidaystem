import React, { useState } from 'react';
import { Sparkles, X, RefreshCw, Wand2 } from 'lucide-react';

interface RegenerateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionName: string;
  sectionKey: string;
  onConfirm: (sectionKey: string, customInstruction: string) => void;
  isLoading: boolean;
}

export const RegenerateSectionModal: React.FC<RegenerateSectionModalProps> = ({
  isOpen,
  onClose,
  sectionName,
  sectionKey,
  onConfirm,
  isLoading,
}) => {
  const [instruction, setInstruction] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    'Làm cho hoạt động sinh động và hấp dẫn hơn bằng trò chơi',
    'Đơn giản hóa vật liệu và thao tác cho học sinh thao tác nhanh hơn',
    'Tăng cường cơ hội để học sinh được sai và sửa, thử nghiệm cải tiến',
    'Thêm câu hỏi gợi mở mức 3 và 4 kích thích tư duy sáng tạo',
    'Tối ưu thời gian ngắn gọn để kịp thời lượng tiết học'
  ];

  const handleRun = () => {
    onConfirm(sectionKey, instruction);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Tạo lại phần: {sectionName}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Chỉ làm mới phần này, giữ nguyên toàn bộ các phần khác của bài dạy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Yêu cầu điều chỉnh của giáo viên:
            </label>
            <textarea
              rows={3}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Ví dụ: Tạo phần khởi động hấp dẫn hơn bằng một câu đố vui hoặc video ngắn; Giảm độ khó cho học sinh lớp 1..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs font-medium"
            />
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              💡 Gợi ý nhanh:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInstruction(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-[11px] text-slate-600 border border-slate-200 text-left transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleRun}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-extrabold shadow-md hover:from-teal-700 hover:to-emerald-700 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Đang tạo lại...' : 'Tạo lại phần này'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
