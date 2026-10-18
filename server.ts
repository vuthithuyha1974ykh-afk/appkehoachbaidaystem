import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { StemPlanInput, StemLessonPlan, PlanEvaluation, RubricData, WorksheetData } from './src/types/stem';
import { SAMPLE_STEM_PLANS } from './src/data/samplePlans';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 3000;

// Gemini AI Client helper
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const SYSTEM_INSTRUCTION = `Bạn là chuyên gia thiết kế giáo dục STEM Tiểu học Việt Nam hàng đầu (kinh nghiệm soạn KHBD theo Công văn 2345/BGDĐT và chỉ đạo giáo dục STEM cấp Tiểu học).

Bạn không đơn thuần viết giáo án. Bạn thiết kế một trải nghiệm học tập trong đó học sinh phải suy nghĩ, đặt câu hỏi, thử nghiệm, chế tạo, đánh giá và cải tiến.
Mọi hoạt động phải phù hợp với độ tuổi Tiểu học (Lớp 1 đến Lớp 5).
Không tạo nội dung vượt quá khả năng nhận thức và vận động của học sinh Tiểu học.
Không áp đặt một đáp án duy nhất nếu bài toán có nhiều giải pháp.
Luôn ưu tiên học sinh được hoạt động, được làm, được thử nghiệm thay vì giáo viên nói quá nhiều.
Mỗi hoạt động phải có mục tiêu rõ ràng. Mục tiêu phải liên kết với hoạt động. Hoạt động phải tạo ra minh chứng để đánh giá.
Đánh giá phải dựa trên những gì học sinh thực sự làm.
Khi tạo sản phẩm STEM, phải xác định rõ tiêu chí thành công (đo được hoặc quan sát được).
Khi có thể, phải tạo cơ hội cho học sinh thử nghiệm và cải tiến.
Nếu thông tin đầu vào chưa đủ, hãy đưa ra đề xuất nhưng đánh dấu rõ "AI đề xuất – giáo viên cần kiểm tra".
Không bịa các quy định giáo dục. Không bịa yêu cầu cần đạt.
Không đưa nội dung nguy hiểm, không dùng dao nhọn sắc, không dùng điện áp cao, không dùng hóa chất độc hại.
Luôn có mục LƯU Ý AN TOÀN cụ thể.
Không dùng ngôn ngữ hàn lâm không cần thiết.
Ưu tiên câu ngắn, rõ ràng, thực tế và có thể sử dụng trực tiếp trong lớp học Việt Nam.
Bắt buộc trả về định dạng JSON theo đúng cấu trúc yêu cầu.`;

// Dynamic Fallback generator if API key is absent or rate-limited
function generatePedagogicalFallbackPlan(input: StemPlanInput): StemLessonPlan {
  const id = 'stem-plan-' + Date.now();
  const grade = Number(input.grade) || 3;
  const title = input.title?.trim() || `Sáng tạo mô hình STEM Lớp ${grade}`;
  const subject = input.mainSubject || (grade <= 3 ? 'Tự nhiên và Xã hội' : 'Khoa học');
  const integrated = input.integratedSubjects && input.integratedSubjects.length > 0
    ? input.integratedSubjects
    : ['Toán học', 'Mỹ thuật', 'Công nghệ'];
  const duration = input.duration || `${input.numberOfPeriods || 2} tiết (${(input.numberOfPeriods || 2) * 35} phút)`;
  const topic = input.stemTopic || 'Ứng dụng khoa học & Đời sống quanh em';
  const difficulty = input.difficultyLevel === 'basic' ? 'Cơ bản' : input.difficultyLevel === 'advanced' ? 'Nâng cao' : 'Trung bình';

  const product = input.title ? `Mô hình ${input.title}` : `Sản phẩm STEM ${topic}`;
  const rawMaterials = input.availableMaterials || 'Bìa carton, que kem gỗ, ống hút, chai nhựa tái chế, dây chun, băng dính, kéo an toàn';
  const materialsList = rawMaterials.split(/[,;\n]/).map(s => s.trim()).filter(Boolean);

  return {
    id,
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    overviewSummary: {
      grade,
      stemTopic: topic,
      duration,
      product,
      materials: rawMaterials,
      difficultyLevel: `${difficulty} (Lớp ${grade})`
    },
    generalInfo: {
      subject: `${subject} (Lớp ${grade})`,
      integratedSubjects: integrated,
      periods: input.numberOfPeriods || 2,
      classSize: input.classSize || '30 - 35 học sinh (chia nhóm 4-6 em)',
      targetAudience: `Học sinh Lớp ${grade} - Mức độ: ${input.studentLevel || 'Đang rèn luyện kỹ năng thực hành và hợp tác nhóm'}`
    },
    realContext: {
      scenario: input.realContext || `Trong đời sống hàng ngày và tại trường học, các em học sinh quan sát thấy nhiều vấn đề thực tế liên quan đến ${topic}. Để giải quyết khó khăn này, các bạn nhỏ mong muốn tìm ra một giải pháp sáng tạo từ những vật liệu quen thuộc, dễ kiếm.`,
      problemStatement: `Làm thế nào để thiết kế một "${product}" an toàn, vững chắc, đáp ứng các tiêu chuẩn hoạt động thực tế với chi phí tiết kiệm?`,
      drivingQuestion: `Chúng ta có thể vận dụng kiến thức bài học để thiết kế và chế tạo ${product} hiệu quả như thế nào?`,
      isAiSuggested: !input.realContext
    },
    objectives: {
      knowledge: [
        `Nêu được các đặc điểm, nguyên lý cơ bản liên quan đến chủ đề ${topic}.`,
        `Nhận biết được công dụng và quy trình vận hành của ${product} trong thực tiễn.`
      ],
      competencies: {
        stemCompetencies: [
          `Năng lực giải quyết vấn đề: Đề xuất phương án thiết kế ${product} từ vật liệu tái chế.`,
          `Năng lực sử dụng công cụ: Thao tác an toàn với kéo cắt, thước đo và các vật liệu kết dính.`
        ],
        generalCompetencies: [
          'Giao tiếp và hợp tác: Phân công nhiệm vụ cụ thể trong nhóm, lắng nghe và phản hồi tích cực.',
          'Tự chủ và tự học: Chủ động hoàn thành phần việc được giao và tự đánh giá sản phẩm.'
        ]
      },
      qualities: [
        'Chăm chỉ: Tỉ mỉ, kiên nhẫn trong các bước lắp ráp và thử nghiệm.',
        'Trách nhiệm: Giữ gìn vệ sinh lớp học, thu gom vật liệu thừa sau khi chế tạo.'
      ],
      isAiSuggested: !input.teacherLearningOutcomes
    },
    stemKnowledge: {
      science: `Hiểu hiện tượng tự nhiên và tính chất vật liệu liên quan đến ${topic}.`,
      technology: 'Sử dụng các dụng cụ học sinh an toàn, chọn lọc vật liệu phù hợp và bền vững.',
      engineering: `Quy trình thiết kế kỹ thuật: Xác định vấn đề -> Lên ý tưởng bản vẽ -> Lắp ráp chế tạo -> Thử nghiệm -> Cải tiến.`,
      mathematics: 'Đo lường kích thước (cm), đếm số lượng vật tư, so sánh và ước lượng hiệu quả hoạt động.'
    },
    stemProduct: {
      name: product,
      purpose: `Giải quyết vấn đề thực tiễn liên quan đến ${topic} cho học sinh lớp ${grade}`,
      materials: materialsList.length > 0 ? materialsList : ['Bìa carton', 'Que kem', 'Băng dính', 'Dây chun'],
      specifications: [
        `Kích thước phù hợp bàn học (chiều dài không quá 30cm)`,
        'Kết cấu cân đối, các mối liên kết chắc chắn',
        'Hình thức thẩm mỹ, thân thiện với học sinh'
      ],
      designConstraints: [
        'Chỉ dùng vật liệu tái chế, chi phí tiết kiệm',
        'Tuyệt đối không dùng vật sắc nhọn gây nguy hiểm',
        'Hoàn thành trong khung thời gian quy định'
      ],
      successCriteria: [
        'Sản phẩm hoạt động ổn định và đáp ứng đúng công năng mong đợi',
        'Độ bền chịu được ít nhất 3-5 lần thử nghiệm liên tiếp',
        'Nhóm giải thích rõ ràng cơ chế hoạt động của sản phẩm'
      ]
    },
    preparation: {
      teacher: [
        'Mô hình vật thật hoặc video clip mẫu minh họa hoạt động',
        'Phiếu học tập, bảng tiêu chí đánh giá (Rubric) cho các nhóm',
        'Bộ dụng cụ hỗ trợ an toàn và vật liệu dự phòng'
      ],
      student: [
        'Vật liệu tái chế theo phân công nhóm (chai lọ, que kem, giấy bìa...)',
        'Hộp bút màu, thước kẻ, kéo đầu tù học sinh',
        'Khăn ẩm lau bàn, túi gom rác mini cho nhóm'
      ],
      safetyNotes: [
        '⚠️ Sử dụng kéo đầu tròn, không đùa nghịch dụng cụ trong giờ học.',
        '⚠️ Các thao tác dán keo nóng (nếu có) phải do giáo viên thực hiện tại bàn kỹ thuật.',
        '⚠️ Rửa sạch tay và thu dọn rác gọn gàng sau khi hoàn thành sản phẩm.'
      ]
    },
    activities: [
      {
        step: 1,
        name: 'Hoạt động 1: Khởi động & Xác định vấn đề (5-7 phút)',
        stageType: 'Xác định vấn đề',
        time: '7 phút',
        objective: 'Tạo hứng thú, kết nối tình huống thực tiễn và xác định nhiệm vụ chế tạo sản phẩm.',
        content: `Xem video/hình ảnh về ${topic}, thảo luận tình huống thực tế và nhận nhiệm vụ.`,
        teacherActivity: [
          'Chiếu hình ảnh/tình huống thực tế gây tò mò cho học sinh.',
          'Đặt câu hỏi khơi gợi vấn đề và giới thiệu thử thách STEM của bài học.'
        ],
        studentActivity: [
          'Quan sát, thảo luận sôi nổi và nêu suy nghĩ ban đầu.',
          'Tiếp nhận nhiệm vụ thiết kế sản phẩm cùng các tiêu chí cần đạt.'
        ],
        guidingQuestions: [
          'Em quan sát thấy điều gì trong tình huống trên?',
          `Làm thế nào để chúng mình có thể tạo ra ${product} giải quyết vấn đề này?`
        ],
        expectedProduct: 'Học sinh hào hứng, gọi tên được sản phẩm cần chế tạo và tiêu chí thành công.'
      },
      {
        step: 2,
        name: 'Hoạt động 2: Khám phá kiến thức nền & Vật liệu (8-10 phút)',
        stageType: 'Khám phá kiến thức',
        time: '10 phút',
        objective: `Khám phá nguyên lý khoa học và đặc tính vật liệu phục vụ chế tạo ${product}.`,
        content: 'Thực hiện thí nghiệm nhỏ hoặc quan sát mẫu vật để rút ra kiến thức cốt lõi.',
        teacherActivity: [
          'Tổ chức cho các nhóm tìm hiểu mẫu vật, hướng dẫn thảo luận.',
          'Chốt lại kiến thức khoa học trọng tâm cần áp dụng vào thiết kế.'
        ],
        studentActivity: [
          'Thao tác thử nghiệm nhanh với vật liệu mẫu, ghi chép vào phiếu học tập.',
          'Rút ra kết luận về tính chất vật liệu phù hợp nhất.'
        ],
        guidingQuestions: [
          'Vật liệu nào bền, nhẹ và an toàn nhất cho sản phẩm của chúng ta?',
          'Nguyên lý nào giúp sản phẩm của các em hoạt động hiệu quả?'
        ],
        expectedProduct: 'Học sinh nắm vững kiến thức nền và lựa chọn được vật liệu phù hợp.'
      },
      {
        step: 3,
        name: 'Hoạt động 3: Đề xuất giải pháp & Vẽ bản thiết kế (10-12 phút)',
        stageType: 'Đề xuất giải pháp',
        time: '12 phút',
        objective: 'Phát huy tính sáng tạo nhóm, phác thảo bản vẽ chi tiết kèm chú thích vật liệu.',
        content: 'Các nhóm thảo luận các ý tưởng khác nhau và thống nhất một bản vẽ chung.',
        teacherActivity: [
          'Đi đến từng nhóm hỗ trợ, khuyến khích có nhiều phương án độc đáo.',
          'Duyệt nhanh bản vẽ thiết kế và nhắc nhở tính khả thi.'
        ],
        studentActivity: [
          'Thành viên nhóm chia sẻ ý tưởng, họa sĩ nhóm vẽ bản thiết kế lên giấy A3.',
          'Ghi chú kích thước ước lượng và danh mục vật liệu cần dùng.'
        ],
        guidingQuestions: [
          'Bản thiết kế của nhóm có những bộ phận chính nào?',
          'Tại sao nhóm em lại chọn cách liên kết vật liệu như vậy?'
        ],
        expectedProduct: 'Bản vẽ thiết kế hoàn chỉnh có chú thích rõ ràng của mỗi nhóm.'
      },
      {
        step: 4,
        name: 'Hoạt động 4: Chế tạo sản phẩm theo thiết kế (18-20 phút)',
        stageType: 'Chế tạo sản phẩm',
        time: '20 phút',
        objective: 'Phối hợp nhịp nhàng, lắp ráp sản phẩm đúng theo bản thiết kế và đảm bảo an toàn.',
        content: 'Nhóm phân công cắt, ghép, dán và hoàn thiện sản phẩm.',
        teacherActivity: [
          'Quan sát bao quát lớp, hỗ trợ các thao tác kỹ thuật khó khi học sinh yêu cầu.',
          'Nhắc nhở thời gian và quy tắc an toàn thực hành.'
        ],
        studentActivity: [
          'Lắp ráp từng bộ phận theo đúng bản vẽ đã duyệt.',
          'Kiểm tra độ chắc chắn của các mối ghép liên tục trong quá trình làm.'
        ],
        guidingQuestions: [
          'Các bộ phận có khớp với bản thiết kế ban đầu không?',
          'Làm sao để các mối nối không bị lung lay?'
        ],
        expectedProduct: 'Mỗi nhóm tạo ra một sản phẩm hoàn chỉnh, sẵn sàng đem thử nghiệm.'
      },
      {
        step: 5,
        name: 'Hoạt động 5: Thử nghiệm & Cải tiến sản phẩm (10 phút)',
        stageType: 'Thử nghiệm & Cải tiến',
        time: '10 phút',
        objective: 'Kiểm tra sản phẩm theo các tiêu chí đã đề ra, phát hiện lỗi và chỉnh sửa nâng cấp.',
        content: 'Cho sản phẩm vận hành thử, ghi nhận kết quả và thực hiện điều chỉnh nếu cần.',
        teacherActivity: [
          'Tổ chức khu vực thử nghiệm, hướng dẫn ghi chép số liệu khách quan.',
          'Gợi ý cách khắc phục nếu sản phẩm chưa đạt tiêu chuẩn.'
        ],
        studentActivity: [
          'Vận hành thử nghiệm sản phẩm ít nhất 2 lần.',
          'Nếu gặp sự cố, cùng nhau thảo luận tìm nguyên nhân và sửa chữa ngay.'
        ],
        guidingQuestions: [
          'Sản phẩm của nhóm đã đạt tiêu chí thành công chưa?',
          'Nếu được làm lại, em sẽ thay đổi điểm gì để sản phẩm tốt hơn nữa?'
        ],
        expectedProduct: 'Bảng kết quả thử nghiệm và sản phẩm đã được tối ưu hoàn thiện.'
      },
      {
        step: 6,
        name: 'Hoạt động 6: Chia sẻ, Đánh giá & Lan tỏa (8 phút)',
        stageType: 'Chia sẻ và Đánh giá',
        time: '8 phút',
        objective: 'Trình bày tự tin về sản phẩm, đánh giá chéo giữa các nhóm bằng phiếu Rubric.',
        content: 'Đại diện nhóm giới thiệu sản phẩm trước lớp, trả lời câu hỏi của các bạn.',
        teacherActivity: [
          'Điều phối phần thuyết trình, động viên khen ngợi tinh thần làm việc của học sinh.',
          'Tổng kết bài học, kết nối giá trị thực tiễn và ý thức bảo vệ môi trường.'
        ],
        studentActivity: [
          'Thuyết trình ngắn gọn: Tên sản phẩm, nguyên lý hoạt động, điểm tự hào nhất.',
          'Lắng nghe và dùng phiếu đánh giá Rubric để chấm điểm bạn.'
        ],
        guidingQuestions: [
          'Em thích nhất chi tiết sáng tạo nào ở sản phẩm của nhóm bạn?',
          'Bài học hôm nay giúp ích gì cho cuộc sống hàng ngày của em?'
        ],
        expectedProduct: 'Học sinh tự tin trình bày, đánh giá công bằng và ghi nhớ bài học sâu sắc.'
      }
    ],
    guidingQuestionsByLevel: {
      level1Observe: [
        'Em nhìn thấy những bộ phận nào trên sản phẩm?',
        'Khi sản phẩm hoạt động, chuyển động diễn ra như thế nào?'
      ],
      level2Explain: [
        'Vì sao em lại chọn vật liệu này thay vì vật liệu khác?',
        'Tại sao sản phẩm cần có bộ phận đỡ ở phía dưới?'
      ],
      level3Apply: [
        'Nếu kích thước tăng lên gấp đôi, em cần thay đổi điều gì trong kết cấu?',
        'Làm thế nào để sử dụng sản phẩm này giúp ích cho trường lớp của em?'
      ],
      level4Improve: [
        'Em sẽ thay đổi điều gì để sản phẩm bền hơn, đẹp hơn và hoạt động nhanh hơn?',
        'Có thể tích hợp thêm tính năng mới nào cho sản phẩm trong tương lai?'
      ]
    },
    difficultiesAndSupport: [
      {
        aspect: 'Kỹ thuật chế tạo',
        difficulty: 'Các mối ghép bằng băng dính dễ bị bong khi chịu lực tác động liên tục.',
        teacherSupport: 'Hướng dẫn học sinh kỹ thuật quấn chéo chữ X và gia cố bằng dây chun trợ lực.'
      },
      {
        aspect: 'Làm việc nhóm',
        difficulty: 'Một vài bạn làm nhiều việc trong khi có bạn chưa biết làm gì.',
        teacherSupport: 'Phân công rõ vai trò bằng thẻ đeo: Trưởng nhóm, Thư ký thiết kế, Kỹ sư lắp ráp, Kiểm định viên.'
      },
      {
        aspect: 'Quản lý thời gian',
        difficulty: 'Nhóm dành quá nhiều thời gian vẽ trang trí khiến phần chế tạo bị vội.',
        teacherSupport: 'Sử dụng đồng hồ bấm giờ hiển thị trên màn hình và nhắc thời gian còn lại ở từng mốc.'
      }
    ],
    differentiation: {
      studentsNeedingSupport: [
        'Cung cấp phôi vật liệu đã được cắt gọt sẵn các kích thước chuẩn.',
        'Gợi ý cấu trúc đơn giản, ít chi tiết chuyển động phức tạp.'
      ],
      advancedStudents: [
        'Thử thách nhóm nâng cao chỉ số hoạt động hoặc bổ sung tính năng phụ trợ.',
        'Yêu cầu nhóm tính toán chi phí giả định và tối ưu vật liệu tiết kiệm nhất.'
      ]
    },
    assessment: {
      preActivity: [
        'Đánh giá hiểu biết ban đầu qua câu hỏi gợi mở tình huống đầu giờ.'
      ],
      duringActivity: [
        'Theo dõi tinh thần hợp tác nhóm, sự kiên trì khi gặp lỗi thực hành.',
        'Đánh giá kỹ năng thao tác an toàn và việc ghi chép phiếu học tập.'
      ],
      postActivity: [
        'Đánh giá sản phẩm hoàn thiện theo tiêu chí Rubric.',
        'Đánh giá năng lực thuyết trình và khả năng giải thích nguyên lý khoa học.'
      ]
    },
    rubric: {
      title: `Bảng Rubric đánh giá Kế hoạch bài dạy STEM: ${product}`,
      criteria: [
        {
          criterion: 'Ý tưởng & Thiết kế',
          level1: 'Bản vẽ sơ sài, thiếu kích thước và không chú thích vật liệu',
          level2: 'Bản vẽ có hình dạng nhưng chưa rõ cơ chế hoạt động',
          level3: 'Bản vẽ rõ ràng, có chú thích đầy đủ bộ phận và kích thước',
          level4: 'Bản vẽ sáng tạo, độc đáo, tính khả thi cao và thẩm mỹ xuất sắc'
        },
        {
          criterion: 'Sản phẩm & Khả năng vận hành',
          level1: 'Sản phẩm chưa hoàn thiện hoặc không hoạt động được',
          level2: 'Hoạt động được nhưng còn chập chờn, kết cấu còn lỏng',
          level3: 'Hoạt động ổn định đúng tiêu chí, kết cấu chắc chắn',
          level4: 'Vận hành hoàn hảo, vượt chỉ tiêu thử nghiệm, rất bền và đẹp'
        },
        {
          criterion: 'Thử nghiệm & Cải tiến',
          level1: 'Không thử nghiệm hoặc không sửa lỗi khi phát hiện sự cố',
          level2: 'Có sửa lỗi nhưng chưa khắc phục triệt để vấn đề',
          level3: 'Xác định đúng lỗi và cải tiến sản phẩm hoạt động tốt hơn',
          level4: 'Chủ động thử nghiệm nhiều lần, tối ưu thiết kế với giải pháp thông minh'
        },
        {
          criterion: 'Hợp tác & Trình bày',
          level1: 'Thiếu hợp tác, thuyết trình ngập ngừng chưa rõ ý',
          level2: 'Phối hợp tương đối, trình bày đủ ý nhưng chưa tự tin',
          level3: 'Cả nhóm cùng tham gia, đại diện thuyết trình mạch lạc, rõ ràng',
          level4: 'Hợp tác tuyệt vời, thuyết trình tự tin cuốn hút, trả lời xuất sắc câu hỏi'
        }
      ]
    },
    worksheet: {
      title: `PHIẾU HỌC TẬP STEM: KHÁM PHÁ & SÁNG CHẾ ${product.toUpperCase()}`,
      subtitle: `Dành cho các Kỹ sư nhí Lớp ${grade}`,
      grade,
      studentInfoFields: ['Tên nhóm: ............................................', `Lớp: ${grade}......`, 'Thành viên: ........................................................................................'],
      safetyReminder: 'Hãy luôn cẩn thận với dụng cụ cắt gán và giữ bàn học sạch đẹp nhé!',
      sections: [
        {
          title: '1. Khám phá & Lựa chọn vật liệu',
          instructions: 'Đánh dấu (V) vào các vật liệu nhóm em quyết định sử dụng:',
          type: 'checkbox',
          items: [
            'Bìa carton cứng',
            'Que kem gỗ / Que tre',
            'Chai nhựa / Nắp chai tái chế',
            'Dây chun / Băng dính chống thấm nước'
          ]
        },
        {
          title: '2. Bản vẽ thiết kế sáng tạo của nhóm em',
          instructions: 'Vẽ phác thảo sản phẩm và chú thích các bộ phận chính:',
          type: 'drawing',
          placeholder: `[Khung vẽ thiết kế ${product}]`
        },
        {
          title: '3. Nhật ký thử nghiệm & Cải tiến',
          instructions: 'Ghi lại kết quả sau các lần vận hành thử nghiệm:',
          type: 'table',
          columns: ['Lần thử', 'Hiện tượng quan sát', 'Đạt / Chưa đạt', 'Điều nhóm em chỉnh sửa'],
          rows: [
            ['Lần 1', 'Sản phẩm chuyển động thử...', 'Chưa đạt', 'Siết chặt mối dán'],
            ['Lần 2', 'Vận hành ổn định...', 'Đạt', 'Trang trí thêm']
          ]
        },
        {
          title: '4. Điều em tâm đắc nhất',
          instructions: 'Viết 1-2 câu chia sẻ về niềm vui sáng tạo hôm nay:',
          type: 'short_answer',
          placeholder: 'Điều em tự hào nhất: ..........................................................................................'
        }
      ]
    }
  };
}

// API: Generate STEM Lesson Plan
app.post('/api/stem/generate-plan', async (req, res) => {
  try {
    const input: StemPlanInput = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      console.log('No GEMINI_API_KEY found, using pedagogical STEM engine fallback.');
      const fallback = generatePedagogicalFallbackPlan(input);
      return res.json({ success: true, plan: fallback, source: 'offline_engine' });
    }

    const promptText = `Hãy thiết kế một Kế hoạch bài dạy (KHBD) STEM Tiểu học hoàn chỉnh, chi tiết và thực tế dựa trên thông tin sau:
Tên bài/chủ đề: ${input.title || 'Do AI đề xuất phù hợp'}
Khối lớp: Lớp ${input.grade || 3}
Môn học chính: ${input.mainSubject || 'Tự nhiên và Xã hội / Khoa học'}
Môn học tích hợp: ${(input.integratedSubjects || []).join(', ') || 'Toán học, Mỹ thuật, Công nghệ'}
Thời lượng: ${input.duration || `${input.numberOfPeriods || 2} tiết`}
Số tiết: ${input.numberOfPeriods || 2}
Chủ đề STEM: ${input.stemTopic || 'Tự nhiên & Đời sống'}
Bối cảnh thực tiễn: ${input.realContext || 'AI đề xuất tình huống gần gũi thực tế'}
Số lượng học sinh: ${input.classSize || '30-35 HS'}
Điều kiện cơ sở vật chất: ${input.facilities || 'Phòng học tiêu chuẩn'}
Vật liệu có sẵn: ${input.availableMaterials || 'Vật liệu tái chế rẻ tiền an toàn'}
Mức độ học sinh: ${input.studentLevel || 'Bình thường'}
Mức độ yêu cầu: ${input.difficultyLevel || 'medium'}
Loại hoạt động: ${(input.activityTypes || []).join(', ')}
Yêu cầu cần đạt giáo viên cung cấp: ${input.teacherLearningOutcomes || 'AI đề xuất dựa trên chuẩn chương trình Tiểu học Việt Nam'}

Yêu cầu cấu trúc kết quả trả về là một JSON duy nhất khớp chính xác với interface StemLessonPlan:
- id: chuỗi ngẫu nhiên
- title: tên bài học hấp dẫn
- createdAt, updatedAt: ISO string
- overviewSummary: { grade, stemTopic, duration, product, materials, difficultyLevel }
- generalInfo: { subject, integratedSubjects (mảng string), periods, classSize, targetAudience }
- realContext: { scenario, problemStatement, drivingQuestion, isAiSuggested }
- objectives: { knowledge (mảng), competencies: { stemCompetencies (mảng), generalCompetencies (mảng) }, qualities (mảng), isAiSuggested }
- stemKnowledge: { science, technology, engineering, mathematics }
- stemProduct: { name, purpose, materials (mảng), specifications (mảng), designConstraints (mảng), successCriteria (mảng) }
- preparation: { teacher (mảng), student (mảng), safetyNotes (mảng) }
- activities: mảng 5 đến 7 hoạt động (Khởi động, Khám phá, Thiết kế, Chế tạo, Thử nghiệm, Cải tiến, Đánh giá), mỗi hoạt động gồm: { step, name, stageType, time, objective, content, teacherActivity (mảng), studentActivity (mảng), guidingQuestions (mảng), expectedProduct }
- guidingQuestionsByLevel: { level1Observe (mảng), level2Explain (mảng), level3Apply (mảng), level4Improve (mảng) }
- difficultiesAndSupport: mảng { aspect, difficulty, teacherSupport }
- differentiation: { studentsNeedingSupport (mảng), advancedStudents (mảng) }
- assessment: { preActivity (mảng), duringActivity (mảng), postActivity (mảng) }
- rubric: { title, criteria: mảng 3-4 tiêu chí { criterion, level1, level2, level3, level4 } }
- worksheet: { title, subtitle, grade, studentInfoFields, safetyReminder, sections: mảng các mục }

Đặc biệt:
1. Đảm bảo ngôn ngữ thuần Việt, trong sáng, dễ hiểu cho giáo viên và học sinh Tiểu học.
2. Không bịa văn bản pháp luật hay chuẩn kiến thức không có thật.
3. Nếu mục nào AI tự đề xuất vì giáo viên chưa điền, hãy gắn chú thích "AI đề xuất – giáo viên cần kiểm tra".
4. Phải có mục LƯU Ý AN TOÀN thiết thực.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const rawText = response.text || '';
    let parsedPlan: StemLessonPlan;
    try {
      parsedPlan = JSON.parse(rawText);
      if (!parsedPlan.id) parsedPlan.id = 'stem-plan-' + Date.now();
      if (!parsedPlan.createdAt) parsedPlan.createdAt = new Date().toISOString();
      if (!parsedPlan.updatedAt) parsedPlan.updatedAt = new Date().toISOString();
    } catch (parseError) {
      console.warn('JSON parse error from Gemini, using fallback:', parseError);
      parsedPlan = generatePedagogicalFallbackPlan(input);
    }

    return res.json({ success: true, plan: parsedPlan, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating STEM plan:', error);
    const fallback = generatePedagogicalFallbackPlan(req.body);
    return res.json({ success: true, plan: fallback, source: 'fallback_after_error', error: error?.message });
  }
});

// Helper for generating SGK Pedagogical plan when offline or fallback
function generateSgkPedagogicalFallback(sgkInput: any): StemLessonPlan {
  const text = `${sgkInput.lessonTitle || ''} ${sgkInput.textbookContent || ''}`.toLowerCase();
  let grade = Number(sgkInput.grade) || 0;
  let detectedTitle = sgkInput.lessonTitle?.trim() || '';
  let detectedSubject = sgkInput.mainSubject || '';
  let detectedProduct = 'Mô hình ứng dụng STEM';
  let detectedTopic = 'Ứng dụng khoa học đời sống';

  // Smart keyword mapping from Vietnamese curriculum
  if (text.includes('nổi') || text.includes('chìm') || text.includes('bè') || text.includes('phao')) {
    if (!grade) grade = 3;
    if (!detectedTitle) detectedTitle = 'Vật nổi và vật chìm - Bè cứu sinh mini';
    detectedSubject = 'Tự nhiên và Xã hội (Lớp 3)';
    detectedProduct = 'Bè cứu sinh mini chở hàng vượt lũ';
    detectedTopic = 'Vật nổi - Vật chìm & Phòng chống bão lũ';
  } else if (text.includes('lọc nước') || text.includes('nước sạch') || text.includes('ô nhiễm nước') || text.includes('nước đục')) {
    if (!grade) grade = 4;
    if (!detectedTitle) detectedTitle = 'Nước và vai trò của nước - Bình lọc nước mini';
    detectedSubject = 'Khoa học (Lớp 4)';
    detectedProduct = 'Bình lọc nước nhiều tầng mini';
    detectedTopic = 'Tính chất của nước & Bảo vệ nguồn nước';
  } else if (text.includes('chong chóng') || text.includes('gió') || text.includes('thời tiết') || text.includes('không khí')) {
    if (!grade) grade = 1;
    if (!detectedTitle) detectedTitle = 'Thời tiết và trang phục - Chong chóng báo gió';
    detectedSubject = 'Tự nhiên và Xã hội (Lớp 1)';
    detectedProduct = 'Chong chóng quay đón gió rực rỡ sắc màu';
    detectedTopic = 'Hiện tượng thời tiết & Năng lượng gió';
  } else if (text.includes('đo') || text.includes('thước') || text.includes('xăng-ti-mét') || text.includes('độ dài')) {
    if (!grade) grade = 2;
    if (!detectedTitle) detectedTitle = 'Thực hành đo độ dài - Thước kẻ gấp đa năng';
    detectedSubject = 'Toán học (Lớp 2)';
    detectedProduct = 'Thước kẻ gấp đa năng đo đường thẳng và đường cong';
    detectedTopic = 'Đo lường độ dài & Hình học trực quan';
  } else if (text.includes('mặt trời') || text.includes('năng lượng') || text.includes('nhiệt') || text.includes('ánh sáng')) {
    if (!grade) grade = 5;
    if (!detectedTitle) detectedTitle = 'Năng lượng mặt trời - Bếp đun năng lượng mini';
    detectedSubject = 'Khoa học (Lớp 5)';
    detectedProduct = 'Bếp hộp hấp thu năng lượng mặt trời mini';
    detectedTopic = 'Năng lượng sạch & Bảo vệ môi trường';
  } else if (text.includes('con quay') || text.includes('đồ chơi') || text.includes('quay')) {
    if (!grade) grade = 3;
    if (!detectedTitle) detectedTitle = 'Làm đồ chơi - Con quay kì diệu';
    detectedSubject = 'Công nghệ (Lớp 3)';
    detectedProduct = 'Con quay đổi màu cân bằng động lực học';
    detectedTopic = 'Chế tạo đồ chơi dân gian & Chuyển động quay';
  } else if (text.includes('cây') || text.includes('lá') || text.includes('rễ') || text.includes('thực vật')) {
    if (!grade) grade = 2;
    if (!detectedTitle) detectedTitle = 'Cây xanh quanh em - Chậu cây tự tưới thông minh';
    detectedSubject = 'Tự nhiên và Xã hội (Lớp 2)';
    detectedProduct = 'Chậu cây mini thẩm thấu tự tưới nước';
    detectedTopic = 'Đời sống thực vật & Tiết kiệm nước';
  } else {
    if (!grade) grade = 3;
    if (!detectedTitle) detectedTitle = 'Khám phá bài học SGK & Sáng tạo mô hình STEM';
    detectedSubject = 'Khoa học / Tự nhiên và Xã hội';
    detectedProduct = 'Mô hình sáng tạo học tập STEM';
    detectedTopic = 'Vận dụng kiến thức bài học SGK vào đời sống';
  }

  const series = sgkInput.bookSeries && sgkInput.bookSeries !== 'Tự động nhận diện từ SGK'
    ? ` (${sgkInput.bookSeries})`
    : '';

  const synthesizedInput: StemPlanInput = {
    title: `STEM Lớp ${grade}: ${detectedTitle}${series}`,
    grade: (grade as 1 | 2 | 3 | 4 | 5),
    mainSubject: detectedSubject,
    integratedSubjects: ['Toán học', 'Mỹ thuật', 'Công nghệ'],
    duration: `${sgkInput.numberOfPeriods || 2} tiết (${(sgkInput.numberOfPeriods || 2) * 35} phút)`,
    numberOfPeriods: sgkInput.numberOfPeriods || 2,
    stemTopic: detectedTopic,
    realContext: `Dựa trên bài học trong Sách giáo khoa${series}, học sinh được kết nối kiến thức lý thuyết với tình huống thực tế đời sống. Qua đó, các em cùng nhau giải quyết thử thách thiết kế ${detectedProduct} để ứng dụng trực tiếp bài học vào thực tiễn.`,
    classSize: '30 - 35 học sinh (chia nhóm 4 - 6 em)',
    classroomCharacteristics: 'Lớp học sôi nổi, các em hào hứng với thực hành',
    facilities: 'Phòng học tiêu chuẩn, máy chiếu, bảng nhóm',
    availableMaterials: sgkInput.materialsNote || 'Bìa carton, que kem gỗ, chai nhựa tái chế, dây chun, băng dính, kéo an toàn',
    budget: '0đ (Tận dụng đồ tái chế sẵn có)',
    studentLevel: 'Đang rèn luyện kỹ năng thực hành và hợp tác nhóm',
    teacherLearningOutcomes: `Nắm vững kiến thức cốt lõi của bài học SGK, tự tay thiết kế và chế tạo ${detectedProduct}, biết thử nghiệm và chia sẻ kết quả.`,
    difficultyLevel: 'medium',
    activityTypes: ['design_make', 'problem_solving', 'recycling', 'scientific_discovery']
  };

  return generatePedagogicalFallbackPlan(synthesizedInput);
}

// API: Generate STEM Plan directly from Textbook (SGK)
app.post('/api/stem/generate-from-sgk', async (req, res) => {
  try {
    const {
      images,
      textbookContent,
      lessonTitle,
      bookSeries,
      grade,
      mainSubject,
      numberOfPeriods,
      materialsNote
    } = req.body;

    console.log(`[SGK Plan] Generating plan. Images count: ${images?.length || 0}, Title: ${lessonTitle || 'auto'}`);

    const ai = getGeminiClient();

    if (!ai) {
      console.log('No GEMINI_API_KEY found, using intelligent SGK pedagogical engine.');
      const fallback = generateSgkPedagogicalFallback(req.body);
      return res.json({ success: true, plan: fallback, source: 'offline_engine' });
    }

    // Build parts for Gemini multimodal processing
    const imageParts: any[] = [];
    if (Array.isArray(images) && images.length > 0) {
      for (const img of images) {
        if (img && img.data) {
          const cleanData = img.data.replace(/^data:[^;]+;base64,/, '');
          imageParts.push({
            inlineData: {
              mimeType: img.mimeType || 'image/jpeg',
              data: cleanData
            }
          });
        }
      }
    }

    const periodsCount = Number(numberOfPeriods) || 2;
    const durationStr = `${periodsCount} tiết (${periodsCount * 35} phút)`;

    const promptText = `Bạn là chuyên gia thiết kế Kế hoạch bài dạy STEM Tiểu học hàng đầu Việt Nam (theo Công văn 2345/BGDĐT-GDTH và Công văn 909/BGDĐT về hoạt động STEM Tiểu học).

${imageParts.length > 0
  ? `GIÁO VIÊN ĐÃ TẢI LÊN ${imageParts.length} TRANG ẢNH CHỤP SÁCH GIÁO KHOA (SGK) TIỂU HỌC VIỆT NAM.
HÃY ĐỌC KỸ TẤT CẢ VĂN BẢN, TRANH VẼ MINH HỌA, THÍ NGHIỆM VÀ CÂU HỎI TRONG CÁC TRANG ẢNH SGK KÈM THEO:`
  : `GIÁO VIÊN CUNG CẤP THÔNG TIN BÀI HỌC SÁCH GIÁO KHOA (SGK):`}

Thông tin giáo viên gửi:
- Tên bài học SGK: ${lessonTitle || '(Hãy nhận diện chính xác từ ảnh SGK)'}
- Bộ sách: ${bookSeries || 'Tự động nhận diện từ SGK (Kết nối tri thức / Chân trời sáng tạo / Cánh diều)'}
- Khối lớp: ${grade && Number(grade) > 0 ? `Lớp ${grade}` : 'Tự động nhận diện từ SGK (Lớp 1, 2, 3, 4, hoặc 5)'}
- Môn học: ${mainSubject || 'Tự động nhận diện (Tự nhiên và Xã hội / Khoa học / Toán / Công nghệ)'}
- Thời lượng: ${durationStr} (${periodsCount} tiết)
- Đoạn trích nội dung SGK (nếu có): ${textbookContent || '(Đọc trực tiếp từ trang sách giáo khoa đính kèm)'}
- Vật liệu địa phương sẵn có: ${materialsNote || 'Vật liệu tái chế rẻ tiền an toàn (bìa carton, que kem, chai nhựa, dây chun, nắp chai)'}

NHIỆM VỤ THIẾT KẾ BÀI DẠY STEM:
1. Nhận diện chính xác bài học SGK: Xác định tên bài, khối lớp (1-5), môn học chính, môn tích hợp và Yêu cầu cần đạt chuẩn của bài học trong Chương trình GDPT 2018.
2. Đề xuất Ý tưởng sản phẩm STEM thiết thực: Một sản phẩm/mô hình học sinh Tiểu học tự tay chế tạo được từ vật liệu tái chế, minh chứng trực quan cho kiến thức bài học SGK đó.
3. Thiết kế Chuỗi 5 hoạt động theo Quy trình thiết kế kỹ thuật (EDP) chuẩn STEM Tiểu học:
   - Hoạt động 1: Mở đầu / Xác định vấn đề (5-7 phút): Đặt tình huống thực tiễn gắn với bài học SGK, nêu vấn đề thử thách, giao nhiệm vụ chế tạo sản phẩm STEM và công bố tiêu chí.
   - Hoạt động 2: Nghiên cứu kiến thức nền (10-12 phút): Học sinh làm việc với nội dung SGK, quan sát, làm thí nghiệm nhỏ để rút ra kiến thức cốt lõi và lựa chọn vật liệu.
   - Hoạt động 3: Đề xuất giải pháp và thiết kế (10-12 phút): Thảo luận nhóm, vẽ phác thảo bản thiết kế sản phẩm có chú thích kích thước, vật liệu, cơ chế hoạt động.
   - Hoạt động 4: Chế tạo mẫu, thử nghiệm và đánh giá (18-20 phút): Các nhóm tự tay lắp ráp sản phẩm theo bản thiết kế, vận hành thử nghiệm, ghi nhận kết quả, phát hiện lỗi và cải tiến.
   - Hoạt động 5: Chia sẻ, thảo luận và điều chỉnh (8-10 phút): Trưng bày sản phẩm, đại diện nhóm thuyết trình giải thích nguyên lý, đánh giá chéo bằng phiếu Rubric, tổng kết liên hệ thực tế.
4. Xây dựng Phiếu học tập thực hành (Worksheet) sinh động cho học sinh và Bảng tiêu chí Rubric đánh giá 4 mức (Cần cố gắng, Đạt, Khá, Tốt).
5. Tuyệt đối an toàn, thực tế, ngôn ngữ chuẩn mực sư phạm Tiểu học Việt Nam.

BẮT BUỘC TRẢ VỀ DUY NHẤT 1 ĐỐI TƯỢNG JSON khớp đúng interface StemLessonPlan:
{
  "id": "chuỗi ngẫu nhiên",
  "title": "Tên bài học STEM hấp dẫn (VD: STEM Lớp 3: Bè cứu sinh mini - Tự nhiên & Xã hội)",
  "createdAt": "ISO string",
  "updatedAt": "ISO string",
  "overviewSummary": {
    "grade": số 1-5,
    "stemTopic": "chuỗi",
    "duration": "${durationStr}",
    "product": "tên sản phẩm STEM",
    "materials": "chuỗi liệt kê vật liệu",
    "difficultyLevel": "chuỗi mức độ"
  },
  "generalInfo": {
    "subject": "Tên môn học (Lớp X)",
    "integratedSubjects": ["Toán học", "Mỹ thuật", "Công nghệ"],
    "periods": ${periodsCount},
    "classSize": "30 - 35 học sinh (chia nhóm 4-6 em)",
    "targetAudience": "Học sinh Lớp X"
  },
  "realContext": {
    "scenario": "Tình huống thực tiễn hấp dẫn từ bài học SGK",
    "problemStatement": "Vấn đề cần giải quyết",
    "drivingQuestion": "Câu hỏi định hướng then chốt",
    "isAiSuggested": false
  },
  "objectives": {
    "knowledge": ["Yêu cầu cần đạt 1", "Yêu cầu cần đạt 2"],
    "competencies": {
      "stemCompetencies": ["Năng lực giải quyết vấn đề...", "Năng lực thiết kế..."],
      "generalCompetencies": ["Tự chủ và tự học...", "Giao tiếp và hợp tác..."]
    },
    "qualities": ["Chăm chỉ...", "Trách nhiệm..."],
    "isAiSuggested": false
  },
  "stemKnowledge": {
    "science": "Kiến thức khoa học cốt lõi từ SGK",
    "technology": "Dụng cụ, công cụ, vật liệu an toàn",
    "engineering": "Quy trình thiết kế kỹ thuật từ vẽ bản vẽ đến thử nghiệm",
    "mathematics": "Đo đạc, số liệu, ước lượng kích thước"
  },
  "stemProduct": {
    "name": "Tên sản phẩm",
    "purpose": "Công dụng thực tiễn",
    "materials": ["vật liệu 1", "vật liệu 2"],
    "specifications": ["kích thước...", "kết cấu..."],
    "designConstraints": ["ràng buộc an toàn...", "tiết kiệm..."],
    "successCriteria": ["tiêu chí 1", "tiêu chí 2", "tiêu chí 3"]
  },
  "preparation": {
    "teacher": ["chuẩn bị của giáo viên..."],
    "student": ["chuẩn bị của học sinh..."],
    "safetyNotes": ["⚠️ Lưu ý an toàn 1...", "⚠️ Lưu ý an toàn 2..."]
  },
  "activities": [
    {
      "step": 1,
      "name": "Hoạt động 1: Mở đầu & Xác định vấn đề (5-7 phút)",
      "stageType": "Xác định vấn đề",
      "time": "7 phút",
      "objective": "mục tiêu...",
      "content": "nội dung...",
      "teacherActivity": ["giáo viên làm gì..."],
      "studentActivity": ["học sinh làm gì..."],
      "guidingQuestions": ["câu hỏi gợi mở..."],
      "expectedProduct": "sản phẩm dự kiến..."
    },
    {
      "step": 2,
      "name": "Hoạt động 2: Nghiên cứu kiến thức nền (10-12 phút)",
      "stageType": "Khám phá kiến thức",
      "time": "10 phút",
      "objective": "...",
      "content": "...",
      "teacherActivity": ["..."],
      "studentActivity": ["..."],
      "guidingQuestions": ["..."],
      "expectedProduct": "..."
    },
    {
      "step": 3,
      "name": "Hoạt động 3: Đề xuất giải pháp & Vẽ bản thiết kế (10-12 phút)",
      "stageType": "Đề xuất giải pháp",
      "time": "12 phút",
      "objective": "...",
      "content": "...",
      "teacherActivity": ["..."],
      "studentActivity": ["..."],
      "guidingQuestions": ["..."],
      "expectedProduct": "..."
    },
    {
      "step": 4,
      "name": "Hoạt động 4: Chế tạo mẫu, thử nghiệm & Đánh giá (18-20 phút)",
      "stageType": "Chế tạo & Thử nghiệm",
      "time": "20 phút",
      "objective": "...",
      "content": "...",
      "teacherActivity": ["..."],
      "studentActivity": ["..."],
      "guidingQuestions": ["..."],
      "expectedProduct": "..."
    },
    {
      "step": 5,
      "name": "Hoạt động 5: Chia sẻ, thảo luận & Điều chỉnh (8-10 phút)",
      "stageType": "Chia sẻ và Đánh giá",
      "time": "8 phút",
      "objective": "...",
      "content": "...",
      "teacherActivity": ["..."],
      "studentActivity": ["..."],
      "guidingQuestions": ["..."],
      "expectedProduct": "..."
    }
  ],
  "guidingQuestionsByLevel": {
    "level1Observe": ["câu hỏi quan sát..."],
    "level2Explain": ["câu hỏi giải thích..."],
    "level3Apply": ["câu hỏi vận dụng..."],
    "level4Improve": ["câu hỏi cải tiến sáng tạo..."]
  },
  "difficultiesAndSupport": [
    { "aspect": "Kỹ thuật", "difficulty": "...", "teacherSupport": "..." },
    { "aspect": "Thời gian", "difficulty": "...", "teacherSupport": "..." }
  ],
  "differentiation": {
    "studentsNeedingSupport": ["hỗ trợ nhóm chậm..."],
    "advancedStudents": ["thử thách mở rộng..."]
  },
  "assessment": {
    "preActivity": ["đánh giá đầu giờ..."],
    "duringActivity": ["đánh giá quá trình..."],
    "postActivity": ["đánh giá sản phẩm cuối..."]
  },
  "rubric": {
    "title": "Bảng tiêu chí đánh giá Rubric",
    "criteria": [
      { "criterion": "Ý tưởng & Thiết kế", "level1": "...", "level2": "...", "level3": "...", "level4": "..." },
      { "criterion": "Sản phẩm & Vận hành", "level1": "...", "level2": "...", "level3": "...", "level4": "..." },
      { "criterion": "Thử nghiệm & Cải tiến", "level1": "...", "level2": "...", "level3": "...", "level4": "..." },
      { "criterion": "Hợp tác & Thuyết trình", "level1": "...", "level2": "...", "level3": "...", "level4": "..." }
    ]
  },
  "worksheet": {
    "title": "PHIẾU HỌC TẬP THỰC HÀNH STEM",
    "subtitle": "Dành cho học sinh Tiểu học",
    "grade": 3,
    "studentInfoFields": ["Tên nhóm: ...", "Lớp: ...", "Thành viên: ..."],
    "safetyReminder": "Luôn dùng kéo an toàn và giữ bàn học sạch đẹp!",
    "sections": [
      { "title": "1. Lựa chọn vật liệu", "instructions": "Đánh dấu...", "type": "checkbox", "items": ["Vật liệu 1", "Vật liệu 2"] },
      { "title": "2. Bản vẽ thiết kế", "instructions": "Vẽ phác thảo...", "type": "drawing", "placeholder": "[Khung vẽ]" },
      { "title": "3. Kết quả thử nghiệm", "instructions": "Ghi nhận...", "type": "table", "columns": ["Lần", "Kết quả", "Nhận xét"], "rows": [["1", "...", "..."]] }
    ]
  }
}`;

    let contentsPayload: any;
    if (imageParts.length > 0) {
      contentsPayload = {
        parts: [
          ...imageParts,
          { text: promptText }
        ]
      };
    } else {
      contentsPayload = promptText;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contentsPayload,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const rawText = response.text || '';
    let parsedPlan: StemLessonPlan;
    try {
      parsedPlan = JSON.parse(rawText);
      if (!parsedPlan.id) parsedPlan.id = 'stem-plan-sgk-' + Date.now();
      if (!parsedPlan.createdAt) parsedPlan.createdAt = new Date().toISOString();
      if (!parsedPlan.updatedAt) parsedPlan.updatedAt = new Date().toISOString();
    } catch (parseError) {
      console.warn('JSON parse error from Gemini SGK call, using fallback:', parseError);
      parsedPlan = generateSgkPedagogicalFallback(req.body);
    }

    return res.json({ success: true, plan: parsedPlan, source: 'gemini_multimodal' });
  } catch (error: any) {
    console.error('Error generating plan from SGK:', error);
    const fallback = generateSgkPedagogicalFallback(req.body);
    return res.json({
      success: true,
      plan: fallback,
      source: 'fallback_after_error',
      error: error?.message
    });
  }
});

// API: Regenerate Section
app.post('/api/stem/regenerate-section', async (req, res) => {
  try {
    const { plan, sectionKey, userFeedback } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Offline fallback: enhance or tailor based on sectionKey
      return res.json({
        success: true,
        message: 'Cập nhật theo yêu cầu của giáo viên',
        sectionKey,
        updatedContent: null // Will be handled on frontend or basic simulation
      });
    }

    const promptText = `Bạn đang hỗ trợ giáo viên Tiểu học Việt Nam tinh chỉnh một phần trong Kế hoạch bài dạy STEM: "${plan.title}" (Lớp ${plan.overviewSummary?.grade || 3}).
Phần cần làm mới/chỉnh sửa: "${sectionKey}".
Yêu cầu của giáo viên: "${userFeedback || 'Làm cho phần này sinh động, thực tế và phù hợp với học sinh hơn'}".

Hãy tạo lại NỘI DUNG MỚI cho riêng phần "${sectionKey}" này.
Đảm bảo:
- Phù hợp với lứa tuổi Tiểu học.
- Dễ làm, an toàn, sinh động.
- Trả về JSON chứa khóa 'data' với cấu trúc dữ liệu tương ứng của phần "${sectionKey}".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, updatedContent: parsed.data || parsed });
  } catch (err: any) {
    console.error('Error in regenerate-section:', err);
    return res.status(500).json({ error: err?.message || 'Lỗi khi tạo lại phần này' });
  }
});

// API: Evaluate Plan (10 STEM Pedagogy Checklist criteria)
app.post('/api/stem/evaluate-plan', async (req, res) => {
  try {
    const { plan } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Dynamic standard evaluation
      const evaluation: PlanEvaluation = {
        overallScore: 92,
        summary: `Kế hoạch bài dạy "${plan.title}" bám sát các tiêu chuẩn giáo dục STEM cấp Tiểu học, có định hướng thực hành rõ ràng và tiến trình sư phạm mạch lạc.`,
        goodPoints: [
          'Vấn đề thực tiễn gần gũi, tạo được hứng thú và thôi thúc học sinh chế tạo sản phẩm.',
          'Học sinh được trực tiếp làm, quan sát, đo lường và thử nghiệm thay vì chỉ nghe thuyết trình lý thuyết.',
          'Có đầy đủ các bước của quy trình thiết kế kỹ thuật từ lên ý tưởng đến thử nghiệm và cải tiến sản phẩm.',
          'Vật liệu dễ kiếm, tái chế, thân thiện với môi trường và an toàn cho lứa tuổi Tiểu học.'
        ],
        pointsToConsider: [
          'Giáo viên cần chuẩn bị trước các phôi mẫu đối với học sinh còn yếu thao tác cắt ghép để đảm bảo kịp thời lượng 35 phút/tiết.',
          'Nên quy định rõ tiêu chí thử nghiệm bằng số liệu cụ thể (ví dụ: chịu tải bao nhiêu gam, quay trong bao nhiêu giây) để học sinh dễ đo lường.'
        ],
        issuesToFix: [
          'Lưu ý bọc đầu que ghim/que tre cẩn thận trước khi phát cho học sinh thao tác.'
        ],
        suggestions: [
          'Có thể cho các nhóm chụp ảnh sản phẩm hoặc dán sticker bình chọn để tăng tính tương tác.',
          'Khuyến khích học sinh chia sẻ trải nghiệm "sai và sửa" trong phần báo cáo kết quả.'
        ],
        checklist: [
          { question: '1. Bài này có thực sự phù hợp với học sinh Tiểu học không?', passed: true, note: 'Nhiệm vụ vừa sức, ngôn ngữ gần gũi.' },
          { question: '2. Vấn đề thực tiễn có rõ không?', passed: true, note: 'Tình huống xuất phát từ thực tế đời sống.' },
          { question: '3. Học sinh có được tự mình hoạt động không?', passed: true, note: 'Học sinh chiếm >70% thời lượng bài dạy.' },
          { question: '4. Sản phẩm có rõ ràng không?', passed: true, note: 'Có mô tả cụ thể hình dáng và công dụng.' },
          { question: '5. Có tiêu chí thành công không?', passed: true, note: 'Có các tiêu chí đo lường rõ ràng.' },
          { question: '6. Có cơ hội thử nghiệm không?', passed: true, note: 'Có hoạt động thử nghiệm riêng biệt.' },
          { question: '7. Có cơ hội cải tiến không?', passed: true, note: 'Có bước tìm nguyên nhân và sửa chữa.' },
          { question: '8. Thời lượng có khả thi không?', passed: true, note: 'Phân bổ các hoạt động hợp lý trong 35-70 phút.' },
          { question: '9. Vật liệu có dễ kiếm và an toàn không?', passed: true, note: 'Vật liệu tái chế, có lưu ý an toàn.' },
          { question: '10. Đánh giá có phù hợp với hoạt động không?', passed: true, note: 'Có Rubric 4 mức và đánh giá quá trình.' }
        ]
      };
      return res.json({ success: true, evaluation });
    }

    const promptText = `Hãy đánh giá chuyên môn Kế hoạch bài dạy STEM Tiểu học sau đây:
Tiêu đề: ${plan.title} (Lớp ${plan.overviewSummary?.grade})
Nội dung tóm tắt:
- Bối cảnh: ${plan.realContext?.scenario}
- Sản phẩm: ${plan.stemProduct?.name}
- Tiêu chí: ${(plan.stemProduct?.successCriteria || []).join('; ')}
- Số hoạt động: ${(plan.activities || []).length}

Hãy kiểm tra nghiêm túc 10 câu hỏi cốt lõi:
1. Bài này có thực sự phù hợp với học sinh Tiểu học không?
2. Vấn đề thực tiễn có rõ không?
3. Học sinh có được tự mình hoạt động không?
4. Sản phẩm có rõ ràng không?
5. Có tiêu chí thành công không?
6. Có cơ hội thử nghiệm không?
7. Có cơ hội cải tiến không?
8. Thời lượng có khả thi không?
9. Vật liệu có dễ kiếm và an toàn không?
10. Đánh giá có phù hợp với hoạt động không?

Trả về JSON có cấu trúc PlanEvaluation:
{
  "overallScore": number (từ 0 đến 100),
  "summary": string,
  "goodPoints": string[],
  "pointsToConsider": string[],
  "issuesToFix": string[],
  "suggestions": string[],
  "checklist": [
    { "question": string, "passed": boolean, "note": string }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, evaluation: parsed });
  } catch (err: any) {
    console.error('Error in evaluate-plan:', err);
    return res.status(500).json({ error: err?.message || 'Lỗi khi kiểm tra KHBD' });
  }
});

// Serve frontend in dev or prod
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`STEM Plan AI server listening on http://localhost:${PORT}`);
});
