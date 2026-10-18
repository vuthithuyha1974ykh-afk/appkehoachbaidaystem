import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  Image as ImageIcon,
  Sparkles,
  BookOpen,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Layers,
  Wrench,
  Clock,
  Trash2,
  FileText,
  Zap,
  Info
} from 'lucide-react';
import { SgkUploadInput, SgkImageFile, GradeLevel } from '../types/stem';

interface SgkDirectPlannerProps {
  onGenerateFromSgk: (input: SgkUploadInput) => Promise<void>;
  isLoading: boolean;
}

const POPULAR_SGK_SAMPLES = [
  {
    grade: 3 as GradeLevel,
    series: 'Cánh Diều',
    title: 'Bài 14: Vật nổi và vật chìm',
    subject: 'Tự nhiên và Xã hội (Lớp 3)',
    summary: 'Học sinh khám phá các vật liệu nổi và chìm trong nước. Thử thách chế tạo bè cứu sinh mini chở hàng cứu trợ vượt lũ.',
    expectedProduct: 'Bè cứu sinh mini từ chai nhựa và que kem'
  },
  {
    grade: 4 as GradeLevel,
    series: 'Kết nối tri thức với cuộc sống',
    title: 'Bài 9: Nước và vai trò của nước trong đời sống',
    subject: 'Khoa học (Lớp 4)',
    summary: 'Tìm hiểu về nguồn nước sạch và các nguyên nhân gây đục nước. Thử thách làm bình lọc nước mini nhiều tầng bằng cát, sỏi, than.',
    expectedProduct: 'Bình lọc nước mini nhiều tầng'
  },
  {
    grade: 2 as GradeLevel,
    series: 'Chân trời sáng tạo',
    title: 'Bài: Thực hành đo độ dài với đơn vị Xăng-ti-mét',
    subject: 'Toán học (Lớp 2)',
    summary: 'Học sinh làm quen với đo độ dài và ước lượng. Thử thách chế tạo thước kẻ gập đa năng đo được cả đường cong và góc.',
    expectedProduct: 'Thước kẻ đa năng thông minh'
  },
  {
    grade: 1 as GradeLevel,
    series: 'Kết nối tri thức với cuộc sống',
    title: 'Bài 21: Thời tiết và trang phục mùa hè - mùa đông',
    subject: 'Tự nhiên và Xã hội (Lớp 1)',
    summary: 'Nhận biết các hiện tượng thời tiết gió, mưa, nắng. Thử thách làm chong chóng quay đón gió nhiều cánh màu sắc.',
    expectedProduct: 'Chong chóng quay đón gió rực rỡ'
  },
  {
    grade: 5 as GradeLevel,
    series: 'Cánh Diều',
    title: 'Bài 12: Năng lượng mặt trời và ứng dụng',
    subject: 'Khoa học (Lớp 5)',
    summary: 'Tìm hiểu tác dụng nhiệt và ánh sáng của Mặt Trời. Thử thách thiết kế bếp hộp hấp thụ năng lượng mặt trời hâm nóng thức ăn.',
    expectedProduct: 'Bếp hộp hấp thụ nhiệt mặt trời mini'
  },
  {
    grade: 3 as GradeLevel,
    series: 'Kết nối tri thức với cuộc sống',
    title: 'Bài 8: Làm đồ chơi dân gian đơn giản',
    subject: 'Công nghệ (Lớp 3)',
    summary: 'Sử dụng kéo, giấy bìa, nắp chai tạo chuyển động quay cân bằng. Thử thách chế tạo con quay kì diệu đổi màu khi xoay.',
    expectedProduct: 'Con quay đổi màu cân bằng động lực học'
  }
];

export const SgkDirectPlanner: React.FC<SgkDirectPlannerProps> = ({
  onGenerateFromSgk,
  isLoading
}) => {
  const [images, setImages] = useState<SgkImageFile[]>([]);
  const [lessonTitle, setLessonTitle] = useState('');
  const [textbookContent, setTextbookContent] = useState('');
  const [bookSeries, setBookSeries] = useState('Tự động nhận diện từ SGK');
  const [grade, setGrade] = useState<GradeLevel | 0>(0);
  const [numberOfPeriods, setNumberOfPeriods] = useState<number>(2);
  const [materialsNote, setMaterialsNote] = useState('');
  const [previewModalImg, setPreviewModalImg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Loading indicator step
  const [loadingStep, setLoadingStep] = useState(0);
  React.useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 3200);
    return () => clearInterval(interval);
  }, [isLoading]);

  const LOADING_STEPS = [
    { title: 'Quét & Nhận diện trang SGK', desc: 'Đang đọc chữ, tranh ảnh minh họa và bài học từ trang sách giáo khoa...' },
    { title: 'Trích xuất Yêu cầu cần đạt', desc: 'Xác định chuẩn kiến thức và năng lực cốt lõi theo Chương trình GDPT 2018...' },
    { title: 'Thiết kế Ý tưởng sản phẩm STEM', desc: 'Lựa chọn mô hình thực tế, vật liệu tái chế an toàn, phù hợp lứa tuổi Tiểu học...' },
    { title: 'Xây dựng 5 Hoạt động Sư phạm', desc: 'Biên soạn tiến trình theo Quy trình kỹ thuật (Công văn 2345 & 909 BGDĐT)...' },
    { title: 'Tạo Phiếu học tập & Bảng Rubric', desc: 'Hoàn thiện phiếu thực hành và tiêu chí đánh giá quá trình học sinh...' }
  ];

  // Handle file uploads
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (base64) {
          const newImg: SgkImageFile = {
            data: base64,
            mimeType: file.type || 'image/jpeg',
            name: file.name,
            previewUrl: base64,
            size: file.size
          };
          setImages((prev) => [...prev, newImg]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectSample = (sample: typeof POPULAR_SGK_SAMPLES[0]) => {
    setLessonTitle(sample.title);
    setGrade(sample.grade);
    setBookSeries(sample.series);
    setTextbookContent(
      `Môn học: ${sample.subject}\nBộ sách: ${sample.series}\nNội dung bài học SGK: ${sample.summary}\nÝ tưởng sản phẩm STEM: ${sample.expectedProduct}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0 && !lessonTitle.trim() && !textbookContent.trim()) {
      alert('Thầy/Cô vui lòng tải ảnh trang SGK lên hoặc nhập tên/nội dung bài học SGK!');
      return;
    }

    onGenerateFromSgk({
      images,
      lessonTitle: lessonTitle.trim(),
      textbookContent: textbookContent.trim(),
      bookSeries: bookSeries === 'Tự động nhận diện từ SGK' ? undefined : bookSeries,
      grade: grade === 0 ? undefined : grade,
      numberOfPeriods,
      materialsNote: materialsNote.trim() || undefined
    });
  };

  const hasInput = images.length > 0 || lessonTitle.trim().length > 0 || textbookContent.trim().length > 0;

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-xl overflow-hidden relative">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-black uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
              Tính năng 1 chạm siêu tốc
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Gửi Sách Giáo Khoa (SGK) – Tạo Luôn Kế Hoạch Bài Dạy STEM
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium max-w-2xl">
              Thầy/Cô chỉ cần <strong>tải ảnh chụp trang SGK</strong> (hoặc dán tên bài/nội dung). AI sẽ tự động đọc bài học, trích xuất Yêu cầu cần đạt và xây dựng hoàn chỉnh Kế hoạch bài dạy STEM chuẩn Công văn 2345/BGDĐT!
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-2xl bg-amber-400 text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5">
              <span>⚡ Tiết kiệm 95% thời gian soạn bài</span>
            </span>
            <span className="text-emerald-200 text-xs font-medium">Lớp 1 – Lớp 5</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        {/* Step 1: Upload Images of SGK */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>Tải ảnh chụp trang Sách Giáo Khoa (Khuyên dùng - Hỗ trợ nhiều ảnh):</span>
            </label>
            <span className="text-xs text-slate-500 font-medium">
              Chụp rõ nét trang sách bài học (1 đến 5 trang)
            </span>
          </div>

          {/* Upload Drop Zone & Camera Buttons */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-2xl p-6 transition-all text-center group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <div className="max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white text-emerald-600 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-200">
                <UploadCloud className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Kéo thả hoặc bấm vào đây để chọn ảnh trang SGK từ máy tính/điện thoại
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Định dạng: JPG, PNG, WEBP (Có thể chọn nhiều trang bài học cùng lúc)
                </p>
              </div>

              {/* Action buttons inside zone */}
              <div className="flex items-center justify-center gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>Chọn tệp ảnh</span>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>📸 Chụp ảnh trực tiếp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Uploaded Images Thumbnails */}
          {images.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Đã nạp {images.length} trang sách giáo khoa:</span>
                <button
                  type="button"
                  onClick={() => setImages([])}
                  className="text-rose-600 hover:text-rose-800 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa tất cả</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border border-emerald-300 shadow-xs bg-slate-100 aspect-3/4"
                  >
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setPreviewModalImg(img.previewUrl || null)}
                    />
                    <div className="absolute top-1 left-1 bg-slate-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      Trang {idx + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-rose-600/90 hover:bg-rose-700 text-white p-1 rounded-md opacity-80 group-hover:opacity-100 transition-opacity"
                      title="Xóa trang này"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[10px] truncate p-1">
                      {img.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Textbook Title & Content (Optional or Direct Paste) */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-black">
              2
            </span>
            <span>Tên bài học hoặc Dán nội dung trang SGK:</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700">
                Tên bài học trong SGK (Nếu đã có):
              </span>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Ví dụ: Bài 14: Vật nổi và vật chìm (hoặc Bài 9: Nước quanh em)..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700">
                Bộ sách giáo khoa (Tùy chọn):
              </span>
              <select
                value={bookSeries}
                onChange={(e) => setBookSeries(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden text-sm font-medium bg-white"
              >
                <option value="Tự động nhận diện từ SGK">🤖 Tự động nhận diện từ SGK</option>
                <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống</option>
                <option value="Chân trời sáng tạo">Chân trời sáng tạo</option>
                <option value="Cánh Diều">Cánh Diều</option>
                <option value="Cùng học để phát triển">Cùng học để phát triển</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Đoạn trích nội dung / Thí nghiệm / Câu hỏi trong SGK (Dán văn bản nếu không có ảnh):</span>
              <span className="text-[11px] text-slate-400 font-normal">Không bắt buộc nếu đã gửi ảnh</span>
            </span>
            <textarea
              rows={3}
              value={textbookContent}
              onChange={(e) => setTextbookContent(e.target.value)}
              placeholder="Thầy/Cô có thể dán đoạn văn bản trong sách, các câu hỏi hoặc thí nghiệm của bài học tại đây..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden text-xs sm:text-sm font-medium"
            />
          </div>
        </div>

        {/* Step 3: Quick Settings (Grade, Duration, Local Materials) */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Tùy chọn nhanh cho bài học:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Grade */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Khối lớp:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value) as GradeLevel | 0)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold outline-hidden focus:border-emerald-500"
              >
                <option value={0}>🤖 Tự nhận diện từ SGK</option>
                <option value={1}>Lớp 1</option>
                <option value={2}>Lớp 2</option>
                <option value={3}>Lớp 3</option>
                <option value={4}>Lớp 4</option>
                <option value={5}>Lớp 5</option>
              </select>
            </div>

            {/* Duration */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Thời lượng bài học:</label>
              <select
                value={numberOfPeriods}
                onChange={(e) => setNumberOfPeriods(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold outline-hidden focus:border-emerald-500"
              >
                <option value={2}>2 tiết (70 phút - Khuyên dùng)</option>
                <option value={1}>1 tiết (35 phút)</option>
                <option value={3}>3 tiết (105 phút - Dự án)</option>
              </select>
            </div>

            {/* Available materials note */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Vật liệu sẵn có tại trường:</label>
              <input
                type="text"
                value={materialsNote}
                onChange={(e) => setMaterialsNote(e.target.value)}
                placeholder="Bìa carton, chai nhựa, que kem..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 1-Click Popular Textbook Samples */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Hoặc bấm thử nhanh 1 bài mẫu thực tế trong SGK Tiểu học:</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {POPULAR_SGK_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/60 text-left transition-all group flex flex-col justify-between space-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      Lớp {sample.grade} • {sample.series}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-emerald-600 font-bold">
                      Chọn ➔
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 mt-1 line-clamp-1">
                    {sample.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    🎯 Sản phẩm: {sample.expectedProduct}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* BIG ACTION BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !hasInput}
            className={`w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-base sm:text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
              isLoading || !hasInput
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
            }`}
          >
            <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
            <span>⚡ TẠO NGAY KẾ HOẠCH BÀI DẠY STEM TỪ SGK (1 CHẠM)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          {!hasInput && (
            <p className="text-center text-xs text-slate-500 mt-2 font-medium">
              💡 Thầy/Cô hãy tải ảnh trang sách giáo khoa lên hoặc bấm chọn 1 bài mẫu ở trên để bắt đầu!
            </p>
          )}
        </div>
      </form>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-white text-center animate-in fade-in">
          <div className="max-w-md w-full bg-slate-800/90 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Spinning icon */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping" />
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 border-r-teal-400 border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-emerald-300">
                AI ĐANG PHÂN TÍCH TRANG SGK & THIẾT KẾ BÀI DẠY
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Vui lòng đợi trong giây lát, hệ thống đang xây dựng bài dạy chuẩn Công văn 2345/BGDĐT...
              </p>
            </div>

            {/* Stepper display */}
            <div className="space-y-2.5 text-left bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
              {LOADING_STEPS.map((s, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 text-xs transition-colors ${
                    idx === loadingStep
                      ? 'text-emerald-300 font-bold'
                      : idx < loadingStep
                      ? 'text-slate-400'
                      : 'text-slate-600'
                  }`}
                >
                  <span className="mt-0.5">
                    {idx < loadingStep ? (
                      '✅'
                    ) : idx === loadingStep ? (
                      <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                    ) : (
                      '⏳'
                    )}
                  </span>
                  <div>
                    <span className="font-extrabold">{s.title}</span>
                    {idx === loadingStep && (
                      <p className="text-[11px] text-slate-300 font-normal mt-0.5 animate-pulse">
                        {s.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full transition-all duration-700"
                style={{ width: `${Math.min(100, (loadingStep + 1) * 22)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewModalImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewModalImg(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2">
            <button
              onClick={() => setPreviewModalImg(null)}
              className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-full hover:bg-slate-900 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewModalImg}
              alt="Xem trước trang SGK"
              className="max-h-[85vh] w-auto mx-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
