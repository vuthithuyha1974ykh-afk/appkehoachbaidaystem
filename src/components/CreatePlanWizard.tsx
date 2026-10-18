import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Layers,
  Wrench,
  Clock,
  Users,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Flame,
  Sprout,
  TreeDeciduous,
  Leaf,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { StemPlanInput, GradeLevel, DifficultyLevel, ActivityType, SgkUploadInput } from '../types/stem';
import { SgkDirectPlanner } from './SgkDirectPlanner';

interface CreatePlanWizardProps {
  onSubmit: (input: StemPlanInput) => void;
  onGenerateFromSgk?: (input: SgkUploadInput) => Promise<void>;
  isLoading: boolean;
}

const PRESET_TEMPLATES = [
  {
    grade: 1 as GradeLevel,
    title: 'Chong chóng quay đón gió kì diệu',
    topic: 'Hiện tượng tự nhiên & Năng lượng gió',
    subject: 'Tự nhiên và Xã hội (Lớp 1)',
    integrated: ['Mỹ thuật', 'Toán học'],
    periods: 1,
    duration: '1 tiết (35 phút)',
    context: 'Làm thế nào để tạo ra đồ chơi giúp học sinh nhìn thấy và đo được độ mạnh của gió?',
    materials: 'Giấy màu vuông, que ống hút, đinh ghim bịt đầu an toàn, hạt cườm',
    difficulty: 'basic' as DifficultyLevel,
    activities: ['design_make', 'life_connected'] as ActivityType[]
  },
  {
    grade: 2 as GradeLevel,
    title: 'Thước kẻ đa năng thông minh',
    topic: 'Đo lường & Hình học phẳng',
    subject: 'Toán học (Lớp 2 - Xăng-ti-mét)',
    integrated: ['Mỹ thuật', 'Tự nhiên và Xã hội'],
    periods: 2,
    duration: '2 tiết (70 phút)',
    context: 'Khi làm thủ công cần đo nhiều đồ vật cong và thẳng, các bạn cần chiếc thước đo tiện dụng và sáng tạo.',
    materials: 'Bìa carton cứng, que kem, giấy kẻ ô li, kim cánh phượng, bút màu',
    difficulty: 'basic' as DifficultyLevel,
    activities: ['design_make', 'applied_math'] as ActivityType[]
  },
  {
    grade: 3 as GradeLevel,
    title: 'Bè cứu sinh mini vượt lũ',
    topic: 'Vật nổi - Vật chìm & Phòng chống bão lũ',
    subject: 'Tự nhiên và Xã hội (Lớp 3)',
    integrated: ['Toán học', 'Mỹ thuật', 'Kỹ thuật'],
    periods: 2,
    duration: '2 tiết (70 phút)',
    context: 'Mùa bão lũ miền Trung, người dân cần phương tiện cứu hộ chở đồ tiếp tế qua vùng nước sâu.',
    materials: 'Chai nhựa rỗng có nắp, que kem gỗ, dây chun, băng dính chống thấm nước',
    difficulty: 'medium' as DifficultyLevel,
    activities: ['design_make', 'problem_solving', 'recycling'] as ActivityType[]
  },
  {
    grade: 4 as GradeLevel,
    title: 'Bình lọc nước mini lọc sạch nước bẩn',
    topic: 'Nước và Bảo vệ nguồn nước sạch',
    subject: 'Khoa học (Lớp 4)',
    integrated: ['Công nghệ', 'Toán học', 'Đạo đức'],
    periods: 2,
    duration: '2 tiết (70 phút)',
    context: 'Trong chuyến dã ngoại hoặc vùng ngập lụt thiếu nước sạch, làm sao lọc nước đục thành nước trong?',
    materials: 'Chai nhựa cắt đôi, sỏi lớn, cát sạch, than hoạt tính, bông gòn, gạc y tế',
    difficulty: 'medium' as DifficultyLevel,
    activities: ['experiment', 'environment', 'scientific_discovery'] as ActivityType[]
  },
  {
    grade: 5 as GradeLevel,
    title: 'Thùng rác phân loại thông minh gạt tự động',
    topic: 'Cơ học đòn bẩy & Phân loại rác tại nguồn',
    subject: 'Khoa học (Lớp 5)',
    integrated: ['Công nghệ', 'Toán học', 'Mỹ thuật'],
    periods: 2,
    duration: '2 tiết (70 phút)',
    context: 'Thùng rác lớp học thường bị vứt lẫn lộn và dùng tay mở nắp không hợp vệ sinh.',
    materials: 'Hộp carton, que tre, que kem, dây chun, nắp chai, nhãn dán xanh/cam',
    difficulty: 'advanced' as DifficultyLevel,
    activities: ['design_make', 'engineering', 'recycling', 'environment'] as ActivityType[]
  }
];

const ACTIVITY_OPTIONS: { id: ActivityType; label: string; icon: string; desc: string }[] = [
  { id: 'design_make', label: 'Thiết kế và chế tạo', icon: '🛠️', desc: 'Học sinh vẽ phác thảo và tự tay lắp ráp sản phẩm' },
  { id: 'scientific_discovery', label: 'Khám phá khoa học', icon: '🔬', desc: 'Tìm hiểu hiện tượng, quy luật tự nhiên' },
  { id: 'problem_solving', label: 'Giải quyết vấn đề', icon: '💡', desc: 'Giải quyết một khó khăn, nhu cầu thực tiễn' },
  { id: 'experiment', label: 'Thí nghiệm', icon: '🧪', desc: 'Thử nghiệm, quan sát biến đổi, rút ra kết luận' },
  { id: 'recycling', label: 'Tái chế', icon: '♻️', desc: 'Tận dụng chai lọ, bìa carton, rác thải sạch' },
  { id: 'environment', label: 'Môi trường', icon: '🌱', desc: 'Bảo vệ nguồn nước, cây xanh, phân loại rác' },
  { id: 'engineering', label: 'Kỹ thuật', icon: '⚙️', desc: 'Ứng dụng cơ cấu chuyển động, đòn bẩy, trục quay' },
  { id: 'technology', label: 'Công nghệ', icon: '📱', desc: 'Sử dụng công cụ, vật liệu mới, mô hình' },
  { id: 'applied_math', label: 'Toán học ứng dụng', icon: '📐', desc: 'Đo lường, tính toán diện tích, tỷ lệ, số liệu' },
  { id: 'life_connected', label: 'STEM gắn với đời sống', icon: '🏡', desc: 'Gắn liền với sinh hoạt gia đình, trường học' },
  { id: 'mini_project', label: 'STEM theo dự án nhỏ', icon: '📋', desc: 'Dự án liên môn nhiều tiết, báo cáo triển lãm' },
];

const INTEGRATED_SUBJECT_OPTIONS = [
  'Toán học',
  'Tự nhiên và Xã hội',
  'Khoa học',
  'Công nghệ',
  'Mỹ thuật',
  'Tin học',
  'Tiếng Việt',
  'Đạo đức'
];

export const CreatePlanWizard: React.FC<CreatePlanWizardProps> = ({
  onSubmit,
  onGenerateFromSgk,
  isLoading
}) => {
  const [creationMode, setCreationMode] = useState<'sgk' | 'wizard'>('sgk');
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<StemPlanInput>({
    title: '',
    grade: 3,
    mainSubject: 'Tự nhiên và Xã hội',
    integratedSubjects: ['Toán học', 'Mỹ thuật'],
    duration: '2 tiết (70 phút)',
    numberOfPeriods: 2,
    stemTopic: '',
    realContext: '',
    classSize: '32 học sinh (6 nhóm)',
    classroomCharacteristics: 'Lớp học sôi nổi, các em thích làm thủ công',
    facilities: 'Phòng học tiêu chuẩn, máy chiếu, bảng phụ',
    availableMaterials: 'Que kem, chai nhựa, bìa carton, băng dính, dây chun, kéo an toàn',
    budget: '0đ (Tận dụng đồ tái chế sẵn có)',
    studentLevel: 'Đã quen với thảo luận nhóm, cần rèn luyện thêm kỹ năng chế tạo',
    teacherLearningOutcomes: '',
    difficultyLevel: 'medium',
    activityTypes: ['design_make', 'problem_solving', 'recycling']
  });

  // Dynamic Loading Message
  const [loadingStepIndex, setLoadingStepIndex] = useState<number>(0);
  const loadingSteps = [
    '🔍 Đang phân tích thông tin đầu vào & đối tượng học sinh...',
    '🧠 Đang thiết kế chuỗi hoạt động học tập định hướng STEM...',
    '🛠️ Đang xây dựng nhiệm vụ chế tạo & quy trình kỹ thuật...',
    '📊 Đang tạo hệ thống câu hỏi 4 mức & tiêu chí đánh giá Rubric...',
    '✅ Đang kiểm tra an toàn và hoàn thiện Kế hoạch bài dạy...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStepIndex(0);
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Load preset
  const applyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setFormData((prev) => ({
      ...prev,
      grade: preset.grade,
      title: preset.title,
      stemTopic: preset.topic,
      mainSubject: preset.subject,
      integratedSubjects: preset.integrated,
      numberOfPeriods: preset.periods,
      duration: preset.duration,
      realContext: preset.context,
      availableMaterials: preset.materials,
      difficultyLevel: preset.difficulty,
      activityTypes: preset.activities
    }));
  };

  const toggleIntegratedSubject = (subj: string) => {
    setFormData((prev) => {
      const exists = prev.integratedSubjects.includes(subj);
      return {
        ...prev,
        integratedSubjects: exists
          ? prev.integratedSubjects.filter((s) => s !== subj)
          : [...prev.integratedSubjects, subj]
      };
    });
  };

  const toggleActivityType = (type: ActivityType) => {
    setFormData((prev) => {
      const exists = prev.activityTypes.includes(type);
      if (exists && prev.activityTypes.length === 1) return prev; // At least one
      return {
        ...prev,
        activityTypes: exists
          ? prev.activityTypes.filter((t) => t !== type)
          : [...prev.activityTypes, type]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Creation Mode Switcher */}
      <div className="mb-8 p-1.5 bg-slate-200/80 rounded-2xl flex items-center gap-2 max-w-xl mx-auto shadow-inner">
        <button
          type="button"
          onClick={() => setCreationMode('sgk')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            creationMode === 'sgk'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-700 hover:text-emerald-700 hover:bg-white/50'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>⚡ Cách 1: Gửi SGK (1 chạm - Nhanh nhất)</span>
        </button>

        <button
          type="button"
          onClick={() => setCreationMode('wizard')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            creationMode === 'wizard'
              ? 'bg-white text-slate-900 shadow-md border border-slate-200'
              : 'text-slate-700 hover:text-emerald-700 hover:bg-white/50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span>📝 Cách 2: Biểu mẫu chi tiết (4 bước)</span>
        </button>
      </div>

      {creationMode === 'sgk' && onGenerateFromSgk ? (
        <SgkDirectPlanner
          onGenerateFromSgk={onGenerateFromSgk}
          isLoading={isLoading}
        />
      ) : (
        <>
          {/* Wizard Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Quy trình thiết kế chuẩn STEM Tiểu học
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Thiết kế Kế hoạch bài dạy STEM
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
              Điền thông tin bài dạy để AI tạo tiến trình học tập chuẩn xác theo định hướng:
              <span className="font-semibold text-emerald-700"> Thực tiễn → Thiết kế → Chế tạo → Thử nghiệm → Cải tiến</span>.
            </p>
          </div>

      {/* Preset Fast Picker */}
      <div className="mb-8 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-2xl p-4 border border-emerald-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-bold text-slate-800">
              Điền nhanh mẫu bài dạy STEM tiêu biểu:
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            (Bấm để điền mẫu cho từng khối lớp)
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESET_TEMPLATES.map((p) => (
            <button
              key={p.grade}
              type="button"
              onClick={() => applyPreset(p)}
              className={`p-2.5 rounded-xl border text-left transition-all group ${
                formData.grade === p.grade && formData.title === p.title
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 border-emerald-200 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black px-1.5 py-0.5 rounded ${
                  formData.grade === p.grade && formData.title === p.title
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Lớp {p.grade}
                </span>
                <span className="text-xs">👉</span>
              </div>
              <p className="text-xs font-bold mt-1.5 line-clamp-2 leading-tight">
                {p.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Step Progress Tabs */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={`flex items-center gap-2 text-sm font-bold pb-2 transition-colors relative ${
            currentStep === 1
              ? 'text-emerald-700 border-b-2 border-emerald-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            currentStep === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            1
          </span>
          <span>BƯỚC 1: Thông tin bài dạy</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className={`flex items-center gap-2 text-sm font-bold pb-2 transition-colors relative ${
            currentStep === 2
              ? 'text-emerald-700 border-b-2 border-emerald-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            currentStep === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            2
          </span>
          <span>BƯỚC 2: Chọn mức độ</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className={`flex items-center gap-2 text-sm font-bold pb-2 transition-colors relative ${
            currentStep === 3
              ? 'text-emerald-700 border-b-2 border-emerald-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            3
          </span>
          <span>BƯỚC 3: Loại hoạt động</span>
        </button>
      </div>

      {/* Loading Screen Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-25" />
              <div className="w-20 h-20 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-emerald-600 animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Đang kiến tạo Kế hoạch bài dạy STEM
            </h3>
            <p className="text-sm font-medium text-emerald-700 h-10 flex items-center justify-center">
              {loadingSteps[loadingStepIndex]}
            </p>

            <div className="w-full bg-slate-100 rounded-full h-2.5 my-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-600 to-teal-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((loadingStepIndex + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2 text-left bg-slate-50 p-4 rounded-xl text-xs text-slate-600">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Kiểm tra tính an toàn & độ tuổi học sinh Tiểu học
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Đảm bảo quy trình thiết kế kỹ thuật (Engineering Design Process)
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Xây dựng Rubric 4 mức và Phiếu học tập thực hành
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ==================== BƯỚC 1: THÔNG TIN BÀI DẠY ==================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                1. Thông tin chung về bài dạy STEM
              </h2>

              {/* Tên bài học */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Tên bài dạy / Chủ đề STEM <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ví dụ: Chế tạo chong chóng đón gió, Bè cứu sinh mini, Thùng rác phân loại thông minh..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition-all"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Nếu để trống hoặc nhập ngắn, AI sẽ tự đề xuất tên sản phẩm hấp dẫn cho học sinh.
                </p>
              </div>

              {/* Khối lớp & Thời lượng */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Khối lớp Tiểu học <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          const newGrade = g as GradeLevel;
                          setFormData({
                            ...formData,
                            grade: newGrade,
                            mainSubject: newGrade <= 3 ? 'Tự nhiên và Xã hội' : 'Khoa học'
                          });
                        }}
                        className={`py-2.5 rounded-xl font-extrabold text-sm border transition-all ${
                          formData.grade === g
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Lớp {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Thời lượng / Số tiết <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.numberOfPeriods}
                    onChange={(e) => {
                      const periods = Number(e.target.value);
                      setFormData({
                        ...formData,
                        numberOfPeriods: periods,
                        duration: `${periods} tiết (${periods * 35} phút)`
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                  >
                    <option value={1}>1 tiết (35 phút) - Bài học STEM tinh gọn</option>
                    <option value={2}>2 tiết (70 phút) - Bài học STEM tiêu chuẩn</option>
                    <option value={3}>3 tiết (105 phút) - Bài học STEM mở rộng</option>
                    <option value={4}>4 tiết (Dự án STEM theo chuyên đề)</option>
                  </select>
                </div>
              </div>

              {/* Môn học chính & Chủ đề STEM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Môn học chính
                  </label>
                  <input
                    type="text"
                    value={formData.mainSubject}
                    onChange={(e) => setFormData({ ...formData, mainSubject: e.target.value })}
                    placeholder="Tự nhiên và Xã hội, Khoa học, Toán, Tin học, Công nghệ..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Chủ đề STEM
                  </label>
                  <input
                    type="text"
                    value={formData.stemTopic}
                    onChange={(e) => setFormData({ ...formData, stemTopic: e.target.value })}
                    placeholder="Hiện tượng tự nhiên, Tái chế, Đo lường, Năng lượng, Cơ học..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Môn học tích hợp */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Các môn học tích hợp STEM
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEGRATED_SUBJECT_OPTIONS.map((subj) => {
                    const isSelected = formData.integratedSubjects.includes(subj);
                    return (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => toggleIntegratedSubject(subj)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {subj}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bối cảnh thực tiễn */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Bối cảnh thực tiễn / Tình huống khởi động
                </label>
                <textarea
                  rows={3}
                  value={formData.realContext}
                  onChange={(e) => setFormData({ ...formData, realContext: e.target.value })}
                  placeholder="Ví dụ: Trong sân trường có nhiều chai nhựa bỏ đi... Hoặc: Mùa mưa lũ đường xá bị ngập cần chuyển mì tôm cho bà con... (Bỏ trống nếu muốn AI tự đề xuất tình huống)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                />
                <p className="text-xs text-amber-600 font-medium mt-1">
                  💡 Tình huống thực tiễn càng gần gũi thì học sinh càng hào hứng bắt tay chế tạo!
                </p>
              </div>

              {/* Vật liệu có sẵn & Kinh phí */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Vật liệu có sẵn / Dễ kiếm
                  </label>
                  <input
                    type="text"
                    value={formData.availableMaterials}
                    onChange={(e) => setFormData({ ...formData, availableMaterials: e.target.value })}
                    placeholder="Bìa carton, chai nhựa, que kem, que xiên tre, băng keo, dây chun..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Kinh phí dự kiến
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="0đ (Tận dụng đồ tái chế) hoặc dưới 20.000đ/nhóm"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Sĩ số lớp & Mức độ học sinh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Số lượng học sinh & Nhóm
                  </label>
                  <input
                    type="text"
                    value={formData.classSize}
                    onChange={(e) => setFormData({ ...formData, classSize: e.target.value })}
                    placeholder="30-35 học sinh (chia làm 6 nhóm)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Đặc điểm & Mức độ học sinh
                  </label>
                  <input
                    type="text"
                    value={formData.studentLevel}
                    onChange={(e) => setFormData({ ...formData, studentLevel: e.target.value })}
                    placeholder="Mới làm quen STEM / Thích thao tác cắt dán / Đã có kỹ năng hợp tác"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Yêu cầu cần đạt giáo viên cung cấp (tùy chọn) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-bold text-slate-700">
                    Yêu cầu cần đạt (do giáo viên cung cấp - Tùy chọn)
                  </label>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                    Để trống: AI sẽ tự đề xuất chuẩn
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={formData.teacherLearningOutcomes}
                  onChange={(e) => setFormData({ ...formData, teacherLearningOutcomes: e.target.value })}
                  placeholder="Nhập yêu cầu cần đạt theo chương trình GDPT 2018 (nếu có). Nếu để trống, AI sẽ tự xây dựng mục tiêu phù hợp lứa tuổi."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 transition-all"
              >
                <span>Sang Bước 2: Chọn mức độ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== BƯỚC 2: CHỌN MỨC ĐỘ ==================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Leaf className="w-5 h-5 text-emerald-600" />
                2. Chọn mức độ thử thách cho học sinh
              </h2>
              <p className="text-sm text-slate-600">
                AI sẽ căn chỉnh độ phức tạp của sản phẩm, thời gian chế tạo và hệ thống câu hỏi gợi mở theo mức độ bạn chọn:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Mức Cơ bản */}
                <div
                  onClick={() => setFormData({ ...formData, difficultyLevel: 'basic' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.difficultyLevel === 'basic'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">
                    🌱 Cơ bản
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Nhiệm vụ rõ ràng, thao tác đơn giản, nhiều gợi ý trực quan từ giáo viên. Rất phù hợp cho Lớp 1–2 hoặc học sinh mới tiếp cận STEM.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1">
                    <li>✓ Thao tác gấp, dán, đan que cơ bản</li>
                    <li>✓ Tiêu chí thành công dễ đạt</li>
                    <li>✓ Tuyệt đối an toàn</li>
                  </ul>
                </div>

                {/* Mức Trung bình */}
                <div
                  onClick={() => setFormData({ ...formData, difficultyLevel: 'medium' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.difficultyLevel === 'medium'
                      ? 'border-teal-600 bg-teal-50/70 shadow-md ring-2 ring-teal-500/20'
                      : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">
                    🌿 Trung bình (Khuyên dùng)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Cân bằng giữa khám phá và chế tạo. Học sinh tự thiết kế bản vẽ và thử nghiệm nhiều lần để tìm phương án tối ưu.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1">
                    <li>✓ Phối hợp nhóm chặt chẽ</li>
                    <li>✓ Thử tải trọng, đo đạc số liệu</li>
                    <li>✓ Có bước tìm lỗi và sửa chữa</li>
                  </ul>
                </div>

                {/* Mức Nâng cao */}
                <div
                  onClick={() => setFormData({ ...formData, difficultyLevel: 'advanced' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.difficultyLevel === 'advanced'
                      ? 'border-sky-600 bg-sky-50/70 shadow-md ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                    <TreeDeciduous className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">
                    🌳 Nâng cao
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Đòi hỏi tư duy sáng tạo cao, ứng dụng cơ chế đòn bẩy, trục truyền động, góc đo hoặc dự án liên môn phức tạp hơn (Lớp 4–5).
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1">
                    <li>✓ Tự lập bản vẽ kỹ thuật chi tiết</li>
                    <li>✓ Thử thách giới hạn vật tư và thời gian</li>
                    <li>✓ Giải thích sâu nguyên lý khoa học</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Bước 1</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 transition-all"
              >
                <span>Sang Bước 3: Loại hoạt động</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== BƯỚC 3: LOẠI HOẠT ĐỘNG STEM ==================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-emerald-600" />
                  3. Chọn loại hoạt động STEM (Có thể chọn nhiều)
                </h2>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  Đã chọn {formData.activityTypes.length} loại
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Lựa chọn trọng tâm hoạt động mà bạn muốn học sinh được trải nghiệm nhiều nhất:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ACTIVITY_OPTIONS.map((act) => {
                  const isChecked = formData.activityTypes.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      onClick={() => toggleActivityType(act.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl select-none">{act.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{act.label}</h4>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-snug">{act.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pre-flight verification summary box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Cam kết kiểm soát chất lượng AI của STEM Plan AI:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>✓ Tự động kiểm tra độ an toàn cho học sinh Tiểu học</div>
                  <div>✓ Luôn có cơ hội để học sinh thử nghiệm và cải tiến</div>
                  <div>✓ Không áp đặt một đáp án duy nhất nếu có nhiều cách làm</div>
                  <div>✓ Mục tiêu, hoạt động và đánh giá liên kết chặt chẽ</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Bước 2</span>
              </button>

              {/* NÚT CHÍNH: TẠO KẾ HOẠCH BÀI DẠY STEM */}
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-extrabold text-base shadow-lg shadow-emerald-600/30 active:scale-98 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>✨ TẠO KẾ HOẠCH BÀI DẠY STEM</span>
              </button>
            </div>
          </div>
        )}
      </form>
        </>
      )}
    </div>
  );
};
