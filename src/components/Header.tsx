import React from 'react';
import {
  Rocket,
  FilePlus2,
  BookOpen,
  FileCheck2,
  TableProperties,
  HelpCircle,
  Home,
  Sparkles
} from 'lucide-react';

export type NavTab = 'home' | 'create' | 'library' | 'worksheet' | 'rubric' | 'guide';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onNewPlanClick: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onNewPlanClick,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Rocket className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-transparent">
                  STEM PLAN AI
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Tiểu học 1–5
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Trợ lý soạn Kế hoạch bài dạy STEM Tiểu học
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'home'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4 text-emerald-600" />
              <span>Trang chủ</span>
            </button>

            <button
              onClick={() => onSelectTab('create')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'create'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <FilePlus2 className="w-4 h-4 text-teal-600" />
              <span>Tạo KHBD</span>
            </button>

            <button
              onClick={() => onSelectTab('library')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors relative ${
                activeTab === 'library'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Kho bài dạy</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[11px] font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('worksheet')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'worksheet'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-amber-600" />
              <span>Phiếu học tập</span>
            </button>

            <button
              onClick={() => onSelectTab('rubric')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'rubric'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <TableProperties className="w-4 h-4 text-indigo-600" />
              <span>Rubric</span>
            </button>

            <button
              onClick={() => onSelectTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'guide'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Hướng dẫn</span>
            </button>
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNewPlanClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/30 hover:scale-105 active:scale-98 transition-all ring-2 ring-emerald-300/60"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>⚡ Soạn từ SGK (1 chạm)</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-100 gap-2 no-scrollbar">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'home' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600'
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => onSelectTab('create')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'create' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600'
            }`}
          >
            Tạo KHBD
          </button>
          <button
            onClick={() => onSelectTab('library')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'library' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600'
            }`}
          >
            Kho bài ({savedCount})
          </button>
          <button
            onClick={() => onSelectTab('worksheet')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'worksheet' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600'
            }`}
          >
            Phiếu học tập
          </button>
          <button
            onClick={() => onSelectTab('rubric')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'rubric' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600'
            }`}
          >
            Rubric
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'guide' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600'
            }`}
          >
            Hướng dẫn
          </button>
        </div>
      </div>
    </header>
  );
};
