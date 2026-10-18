import React from 'react';
import {
  HelpCircle,
  ShieldAlert,
  Compass,
  Lightbulb,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Smile,
  BookOpen
} from 'lucide-react';

export const StemGuide: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Cẩm nang sư phạm STEM Tiểu học
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Hướng dẫn thiết kế & Tổ chức bài dạy STEM Tiểu học
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Được tổng hợp từ hướng dẫn chuyên môn của Bộ GD&ĐT (Công văn 2345/BGDĐT-GDTH) và các chuẩn mực giáo dục STEM quốc tế.
        </p>
      </div>

      {/* 1. Engineering Design Process (Quy trình thiết kế kỹ thuật) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              1. Quy trình thiết kế kỹ thuật (Engineering Design Process)
            </h2>
            <p className="text-xs text-slate-500">
              Khung sườn cốt lõi biến bài học thành trải nghiệm giải quyết vấn đề thực tế
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-emerald-700 text-sm block">
              Bước 1: Xác định vấn đề thực tiễn
            </span>
            <p>
              Xuất phát từ một tình huống gần gũi trong trường học hoặc đời sống (ví dụ: rác thải nhựa, bão lũ ngập đường, thời tiết nóng bức...). Học sinh nhận diện nhu cầu cần chế tạo một công cụ hoặc giải pháp.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-teal-700 text-sm block">
              Bước 2: Tìm hiểu kiến thức nền & Vật liệu
            </span>
            <p>
              Học sinh quan sát, sờ nắm, thử nghiệm nhanh tính chất vật liệu (vật nổi/chìm, độ cứng của bìa, lực đàn hồi của dây chun, tính xoay của trục...) để chọn vật tư phù hợp.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-sky-700 text-sm block">
              Bước 3: Đề xuất ý tưởng & Vẽ bản thiết kế
            </span>
            <p>
              Làm việc nhóm: Mỗi học sinh đưa ra phương án, nhóm thống nhất và vẽ phác thảo bản vẽ chi tiết kèm kích thước và chú thích vật liệu. Tuyệt đối không áp đặt 1 đáp án duy nhất!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-indigo-700 text-sm block">
              Bước 4: Chế tạo sản phẩm theo thiết kế
            </span>
            <p>
              Phân công nhiệm vụ cụ thể: ai cắt, ai dán, ai giữ thanh. Giáo viên bao quát, hỗ trợ thao tác khó và giám sát an toàn lao động.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-amber-700 text-sm block">
              Bước 5: Thử nghiệm theo tiêu chí thành công
            </span>
            <p>
              Cho sản phẩm vận hành thực tế (thổi gió, đặt quả cân, đổ nước lọc, đạp chân mở nắp). Đo đạc số liệu khách quan ghi vào phiếu học tập.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-rose-700 text-sm block">
              Bước 6: Cải tiến & Tối ưu (Sai và sửa)
            </span>
            <p>
              Nếu chưa đạt, học sinh tìm nguyên nhân: Tại sao bè nghiêng? Tại sao chong chóng kẹt? Điều chỉnh lại vị trí phao hoặc trục quay.
            </p>
          </div>
        </div>
      </div>

      {/* 2. 10 Safety Principles */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              2. 10 Nguyên tắc an toàn vàng cho học sinh Tiểu học
            </h2>
            <p className="text-xs text-slate-500">
              Tuyệt đối tuân thủ khi chuẩn bị vật tư và tổ chức hoạt động thực hành
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          {[
            '1. Chỉ sử dụng kéo học sinh có đầu tròn (đầu tù), không dùng kéo mũi nhọn.',
            '2. Không dùng dao rọc giấy hoặc dao sắc cho học sinh Lớp 1, 2, 3.',
            '3. Súng bắn keo nến nóng CHỈ do giáo viên thao tác tại bàn kỹ thuật riêng.',
            '4. Các que xiên tre, tăm nhọn phải được bấm bỏ đầu nhọn hoặc bọc đất nặn/nút xốp.',
            '5. Chai lọ tái chế phải được rửa sạch, phơi khô và khử trùng trước khi đem vào lớp.',
            '6. Không dùng pin có dòng xả cao hoặc mạch điện có điện áp nguy hiểm.',
            '7. Tuyệt đối không dùng hóa chất tẩy rửa độc hại, chất dễ cháy nổ.',
            '8. Sau khi thử nghiệm nước (bè nổi, lọc nước), phải lau khô sàn ngay tránh trơn ngã.',
            '9. Không cho học sinh ngậm hoặc đùa nghịch các vật nhỏ (hạt cườm, viên bi, ốc vít).',
            '10. Luôn có túi đựng rác tại bàn nhóm và rửa tay sạch sẽ sau giờ học.'
          ].map((rule, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 font-medium flex items-start gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 4-level Guiding Questions Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              3. Ma trận 4 mức câu hỏi gợi mở của Giáo viên
            </h2>
            <p className="text-xs text-slate-500">
              Giúp giáo viên không mớm sẵn đáp án mà kích hoạt tư duy khám phá tự nhiên
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-extrabold text-slate-900 text-sm block">
              Mức 1: Quan sát
            </span>
            <p className="text-slate-500 italic">"Em nhìn thấy điều gì?"</p>
            <p className="text-slate-600">
              Học sinh mô tả hình dạng, chuyển động, hiện tượng đang diễn ra trước mắt.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
            <span className="font-extrabold text-sky-950 text-sm block">
              Mức 2: Giải thích
            </span>
            <p className="text-sky-800 italic">"Vì sao em nghĩ như vậy?"</p>
            <p className="text-slate-600">
              Học sinh vận dụng kiến thức khoa học đã học để giải thích nguyên nhân hiện tượng.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <span className="font-extrabold text-amber-950 text-sm block">
              Mức 3: Vận dụng
            </span>
            <p className="text-amber-800 italic">"Nếu thay đổi vật liệu thì...?"</p>
            <p className="text-slate-600">
              Dự đoán điều gì xảy ra khi thay đổi kích thước, độ dày hoặc góc nghiêng.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <span className="font-extrabold text-emerald-950 text-sm block">
              Mức 4: Cải tiến
            </span>
            <p className="text-emerald-800 italic">"Em sẽ thay đổi điều gì để tốt hơn?"</p>
            <p className="text-slate-600">
              Đề xuất giải pháp khắc phục khi sản phẩm bị lỗi hoặc nâng cao hiệu suất hoạt động.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
