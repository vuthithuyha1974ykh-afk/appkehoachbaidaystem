import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  TableProperties,
  Sparkles,
  Download
} from 'lucide-react';
import { RubricData } from '../types/stem';
import { copyToClipboard } from '../utils/exportUtils';

interface RubricModalProps {
  isOpen: boolean;
  onClose: () => void;
  rubric: RubricData;
  onRegenerateRubric?: () => void;
  isRegenerating?: boolean;
}

export const RubricModal: React.FC<RubricModalProps> = ({
  isOpen,
  onClose,
  rubric,
  onRegenerateRubric,
  isRegenerating = false,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    let text = `${rubric.title}\n\n`;
    text += 'Tiêu chí | Mức 1 (Cần cố gắng) | Mức 2 (Đạt) | Mức 3 (Khá) | Mức 4 (Tốt/Xuất sắc)\n';
    text += '---|---|---|---|---\n';
    rubric.criteria.forEach((c) => {
      text += `${c.criterion} | ${c.level1} | ${c.level2} | ${c.level3} | ${c.level4}\n`;
    });

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadWord = () => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${rubric.title}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; }
          h1 { font-size: 16pt; text-align: center; color: #1e3a8a; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #333; padding: 8px; vertical-align: top; text-align: left; }
          th { background-color: #f3f4f6; }
        </style>
      </head>
      <body>
        <h1>${rubric.title}</h1>
        <table>
          <tr>
            <th style="width: 20%;">Tiêu chí đánh giá</th>
            <th style="width: 20%;">Mức 1 (Cần cố gắng)</th>
            <th style="width: 20%;">Mức 2 (Đạt)</th>
            <th style="width: 20%;">Mức 3 (Khá)</th>
            <th style="width: 20%;">Mức 4 (Tốt / Xuất sắc)</th>
          </tr>
          ${rubric.criteria.map(c => `
            <tr>
              <td><strong>${c.criterion}</strong></td>
              <td>${c.level1}</td>
              <td>${c.level2}</td>
              <td>${c.level3}</td>
              <td>${c.level4}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rubric_${rubric.title.replace(/[\s/\\?%*:|"<>]/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:border-none">
        {/* Header - Not printed */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 px-6 py-4 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <TableProperties className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">
                Bảng Rubric Đánh giá STEM 4 Mức
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                Tiêu chuẩn hóa đánh giá sản phẩm & hoạt động học sinh Tiểu học
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onRegenerateRubric && (
              <button
                onClick={onRegenerateRubric}
                disabled={isRegenerating}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRegenerating ? 'Đang tạo...' : 'Tạo lại'}</span>
              </button>
            )}
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép bảng'}</span>
            </button>
            <button
              onClick={handleDownloadWord}
              className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Word</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white text-indigo-800 hover:bg-indigo-50 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Rubric</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 print:p-0 print:overflow-visible">
          <div className="text-center border-b border-slate-200 pb-4">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
              {rubric.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Khung ma trận 4 mức độ: Mức 1 (Cần cố gắng) → Mức 2 (Đạt) → Mức 3 (Khá) → Mức 4 (Tốt / Xuất sắc)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-300 rounded-xl overflow-hidden shadow-xs">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 text-slate-900 font-black">
                  <th className="border border-slate-300 p-3.5 text-left w-1/5">
                    Tiêu chí đánh giá
                  </th>
                  <th className="border border-slate-300 p-3.5 text-left w-1/5 bg-rose-50/50 text-rose-950">
                    Mức 1 (Cần cố gắng)
                  </th>
                  <th className="border border-slate-300 p-3.5 text-left w-1/5 bg-amber-50/50 text-amber-950">
                    Mức 2 (Đạt)
                  </th>
                  <th className="border border-slate-300 p-3.5 text-left w-1/5 bg-sky-50/50 text-sky-950">
                    Mức 3 (Khá)
                  </th>
                  <th className="border border-slate-300 p-3.5 text-left w-1/5 bg-emerald-50/50 text-emerald-950">
                    Mức 4 (Tốt / Xuất sắc)
                  </th>
                </tr>
              </thead>
              <tbody>
                {rubric.criteria.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="border border-slate-300 p-3 font-bold text-slate-900 bg-slate-50/80">
                      {c.criterion}
                    </td>
                    <td className="border border-slate-300 p-3 text-slate-700 leading-relaxed">
                      {c.level1}
                    </td>
                    <td className="border border-slate-300 p-3 text-slate-700 leading-relaxed">
                      {c.level2}
                    </td>
                    <td className="border border-slate-300 p-3 text-slate-700 leading-relaxed">
                      {c.level3}
                    </td>
                    <td className="border border-slate-300 p-3 text-slate-700 leading-relaxed font-medium">
                      {c.level4}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <span className="text-emerald-600 font-bold text-base">💡</span>
            <div>
              <p className="font-bold text-slate-800">
                Hướng dẫn giáo viên sử dụng Rubric trong tiết học Tiểu học:
              </p>
              <p className="mt-0.5">
                Giáo viên có thể sử dụng bảng này để đánh giá nhóm hoặc phát phiên bản rút gọn cho các nhóm chấm chéo nhau (peer assessment) bằng cách dán sticker 1–4 sao.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
