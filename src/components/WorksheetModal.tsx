import React from 'react';
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  Smile,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { WorksheetData } from '../types/stem';
import { exportWorksheetToWord, copyToClipboard } from '../utils/exportUtils';

interface WorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  worksheet: WorksheetData;
  onRegenerateWorksheet?: () => void;
  isRegenerating?: boolean;
}

export const WorksheetModal: React.FC<WorksheetModalProps> = ({
  isOpen,
  onClose,
  worksheet,
  onRegenerateWorksheet,
  isRegenerating = false,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    let text = `${worksheet.title}\n${worksheet.subtitle}\n`;
    text += `Lưu ý an toàn: ${worksheet.safetyReminder}\n`;
    text += `Thông tin học sinh: ${worksheet.studentInfoFields.join(' | ')}\n\n`;

    worksheet.sections.forEach((sec, i) => {
      text += `${i + 1}. ${sec.title}\n${sec.instructions}\n`;
      if (sec.items) {
        sec.items.forEach(it => (text += `  [ ] ${it}\n`));
      }
      if (sec.columns && sec.rows) {
        text += `  ${sec.columns.join(' | ')}\n`;
        sec.rows.forEach(r => (text += `  ${r.join(' | ')}\n`));
      }
      text += '\n';
    });

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isLowerGrade = worksheet.grade <= 2;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:border-none">
        {/* Header - Not printed */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">
                Phiếu học tập STEM
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                {isLowerGrade
                  ? 'Giao diện trực quan (hình ảnh, vẽ, tích chọn) cho Lớp 1–2'
                  : 'Giao diện phân tích (bảng dữ liệu, đo đạc, giải thích) cho Lớp 3–5'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onRegenerateWorksheet && (
              <button
                onClick={onRegenerateWorksheet}
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
              <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
            </button>
            <button
              onClick={() => exportWorksheetToWord(worksheet)}
              className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file Word</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white text-teal-800 hover:bg-teal-50 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In phiếu</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Worksheet Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 print:p-0 print:overflow-visible">
          {/* Header of Worksheet */}
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start text-xs font-bold text-slate-700 mb-2">
              <span>TRƯỜNG TIỂU HỌC: .......................................</span>
              <span>NĂM HỌC 202... - 202...</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
              {worksheet.title}
            </h1>
            <p className="text-sm font-medium text-slate-600 italic mt-0.5">
              {worksheet.subtitle}
            </p>
          </div>

          {/* Safety Reminder Banner */}
          {worksheet.safetyReminder && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold text-center flex items-center justify-center gap-2">
              <span>⚠️</span>
              <span>LƯU Ý AN TOÀN: {worksheet.safetyReminder}</span>
            </div>
          )}

          {/* Student Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
            {worksheet.studentInfoFields.map((field, i) => (
              <div key={i} className="flex items-center">
                <span>{field}</span>
              </div>
            ))}
          </div>

          {/* Worksheet Sections */}
          <div className="space-y-6">
            {worksheet.sections.map((section, idx) => (
              <div
                key={idx}
                className="border-2 border-emerald-600/40 rounded-2xl p-4 sm:p-5 bg-white relative space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {section.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 italic">
                  {section.instructions}
                </p>

                {/* Drawing Box */}
                {section.type === 'drawing' && (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl h-48 flex flex-col items-center justify-center text-slate-400 p-4 text-center bg-slate-50/50">
                    <span className="text-3xl mb-1">🎨</span>
                    <span className="text-xs font-semibold">
                      {section.placeholder || 'Khung vẽ ý tưởng thiết kế hoặc phác thảo sản phẩm của nhóm'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      (Dùng bút chì hoặc sáp màu để vẽ nhé!)
                    </span>
                  </div>
                )}

                {/* Checkbox Items */}
                {section.type === 'checkbox' && section.items && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {section.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-2.5 rounded-xl border border-slate-200 flex items-center gap-3 text-xs font-medium text-slate-800 bg-slate-50/60"
                      >
                        <div className="w-5 h-5 rounded-md border-2 border-slate-400 flex items-center justify-center shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Table type */}
                {section.type === 'table' && section.columns && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-emerald-50">
                          {section.columns.map((col, colIdx) => (
                            <th
                              key={colIdx}
                              className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-800"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(section.rows || []).map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-slate-50">
                            {row.map((cell, cellIdx) => (
                              <td
                                key={cellIdx}
                                className="border border-slate-300 px-3 py-2.5 text-slate-700"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Measurement Fields */}
                {section.type === 'measurement' && section.items && (
                  <div className="space-y-2 pt-1">
                    {section.items.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800"
                      >
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Short Answer Lines */}
                {section.type === 'short_answer' && (
                  <div className="space-y-3 pt-2">
                    <div className="border-b border-dotted border-slate-400 h-6" />
                    <div className="border-b border-dotted border-slate-400 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Self reflection sticker section for grade 1-2 */}
          {isLowerGrade && (
            <div className="border border-amber-200 bg-amber-50/50 p-4 rounded-2xl flex items-center justify-between text-xs">
              <span className="font-bold text-amber-900">
                Đánh giá nụ cười của em hôm nay:
              </span>
              <div className="flex items-center gap-4 text-2xl">
                <span title="Rất vui">😍</span>
                <span title="Hài lòng">😊</span>
                <span title="Cần cố gắng">🤔</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
