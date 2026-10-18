import React, { useState } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Trash2,
  Copy,
  ExternalLink,
  Plus,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  FileCheck2,
  Share2
} from 'lucide-react';
import { StemLessonPlan, GradeLevel } from '../types/stem';
import { exportPlanToWord } from '../utils/exportUtils';

interface PlanLibraryProps {
  plans: StemLessonPlan[];
  onSelectPlan: (plan: StemLessonPlan) => void;
  onDuplicatePlan: (plan: StemLessonPlan) => void;
  onDeletePlan: (id: string) => void;
  onAddNewClick: () => void;
}

export const PlanLibrary: React.FC<PlanLibraryProps> = ({
  plans,
  onSelectPlan,
  onDuplicatePlan,
  onDeletePlan,
  onAddNewClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.overviewSummary.stemTopic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.stemProduct.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade =
      selectedGrade === 'all' || plan.overviewSummary.grade === selectedGrade;

    const matchesDuration =
      selectedDuration === 'all' || plan.overviewSummary.duration.includes(selectedDuration);

    return matchesSearch && matchesGrade && matchesDuration;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Thư viện Kế hoạch bài dạy STEM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kho bài dạy STEM Tiểu học
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Lưu trữ, tìm kiếm, mở lại và chỉnh sửa các Kế hoạch bài dạy đã tạo ({plans.length} bài)
          </p>
        </div>

        <button
          onClick={onAddNewClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo KHBD mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tên bài, chủ đề, tên sản phẩm..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Grade filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap pl-1">
            Khối lớp:
          </span>
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              selectedGrade === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả
          </button>
          {[1, 2, 3, 4, 5].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedGrade === g
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lớp {g}
            </button>
          ))}
        </div>

        {/* Duration filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Mọi thời lượng</option>
            <option value="1 tiết">1 tiết (35 phút)</option>
            <option value="2 tiết">2 tiết (70 phút)</option>
            <option value="3 tiết">3 tiết</option>
            <option value="4 tiết">4 tiết (Dự án)</option>
          </select>
        </div>
      </div>

      {/* Grid of Lesson Plans */}
      {filteredPlans.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            Không tìm thấy bài dạy phù hợp
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Thử thay đổi từ khóa tìm kiếm hoặc bấm nút "Tạo KHBD mới" để thiết kế bài dạy đầu tiên.
          </p>
          <button
            onClick={onAddNewClick}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Tạo bài dạy ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-emerald-300"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                    Lớp {p.overviewSummary.grade}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {p.overviewSummary.duration}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectPlan(p)}
                  className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 cursor-pointer line-clamp-2 leading-snug"
                >
                  {p.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <p className="line-clamp-1">
                    <span className="font-bold text-slate-500">Chủ đề:</span> {p.overviewSummary.stemTopic}
                  </p>
                  <p className="line-clamp-1">
                    <span className="font-bold text-slate-500">Sản phẩm:</span> {p.overviewSummary.product}
                  </p>
                  <p className="line-clamp-1 text-slate-400 text-[11px]">
                    <span className="font-bold text-slate-500">Môn chính:</span> {p.generalInfo.subject}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectPlan(p)}
                  className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Mở xem chi tiết</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => exportPlanToWord(p)}
                    title="Tải file Word"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-slate-200 transition-colors"
                  >
                    <FileCheck2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicatePlan(p)}
                    title="Nhân bản (Sao chép bài này)"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeletePlan(p.id)}
                    title="Xóa bài dạy này"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
