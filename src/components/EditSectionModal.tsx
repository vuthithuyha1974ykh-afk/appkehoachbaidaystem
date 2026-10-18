import React, { useState } from 'react';
import { Save, X, Edit3 } from 'lucide-react';

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string;
  initialContent: string;
  onSave: (newContent: string) => void;
}

export const EditSectionModal: React.FC<EditSectionModalProps> = ({
  isOpen,
  onClose,
  sectionTitle,
  initialContent,
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Chỉnh sửa trực tiếp: {sectionTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Thay đổi nội dung theo ý kiến chuyên môn của thầy/cô
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

        <div className="py-4">
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium leading-relaxed font-sans"
          />
          <p className="text-xs text-slate-400 mt-1">
            * Mỗi dòng hoặc gạch đầu dòng tương ứng với một ý trong kế hoạch.
          </p>
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
            onClick={() => {
              onSave(content);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow-md hover:bg-emerald-700 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
