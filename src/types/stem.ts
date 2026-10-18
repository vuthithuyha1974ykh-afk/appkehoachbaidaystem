export type GradeLevel = 1 | 2 | 3 | 4 | 5;

export type DifficultyLevel = 'basic' | 'medium' | 'advanced';

export type ActivityType =
  | 'design_make' // Thiết kế và chế tạo
  | 'scientific_discovery' // Khám phá khoa học
  | 'problem_solving' // Giải quyết vấn đề
  | 'experiment' // Thí nghiệm
  | 'recycling' // Tái chế
  | 'environment' // Môi trường
  | 'engineering' // Kỹ thuật
  | 'technology' // Công nghệ
  | 'applied_math' // Toán học ứng dụng
  | 'life_connected' // STEM gắn với đời sống
  | 'mini_project'; // STEM theo dự án nhỏ

export interface SgkImageFile {
  data: string; // Base64 or object URL
  mimeType: string;
  name: string;
  previewUrl?: string;
  size?: number;
}

export interface SgkUploadInput {
  images?: SgkImageFile[];
  textbookContent?: string;
  lessonTitle?: string;
  bookSeries?: string; // 'Kết nối tri thức' | 'Chân trời sáng tạo' | 'Cánh diều' | 'Tự động'
  grade?: GradeLevel | 0; // 0 for auto-detect
  mainSubject?: string;
  numberOfPeriods?: number;
  materialsNote?: string;
}

export interface StemPlanInput {
  title: string;
  grade: GradeLevel;
  mainSubject: string;
  integratedSubjects: string[];
  duration: string;
  numberOfPeriods: number;
  stemTopic: string;
  realContext: string;
  classSize: string;
  classroomCharacteristics: string;
  facilities: string;
  availableMaterials: string;
  budget: string;
  studentLevel: string;
  teacherLearningOutcomes: string;
  difficultyLevel: DifficultyLevel;
  activityTypes: ActivityType[];
}

export interface LearningActivity {
  step: number;
  name: string;
  stageType: string;
  time: string;
  objective: string;
  content: string;
  teacherActivity: string[];
  studentActivity: string[];
  guidingQuestions: string[];
  expectedProduct: string;
}

export interface DifficultyItem {
  aspect: string;
  difficulty: string;
  teacherSupport: string;
}

export interface RubricCriterion {
  criterion: string;
  level1: string; // Cần cố gắng
  level2: string; // Đạt
  level3: string; // Khá
  level4: string; // Tốt / Xuất sắc
}

export interface RubricData {
  title: string;
  description?: string;
  criteria: RubricCriterion[];
}

export interface WorksheetSection {
  title: string;
  instructions: string;
  type: 'drawing' | 'checkbox' | 'table' | 'short_answer' | 'measurement';
  items?: string[];
  columns?: string[];
  rows?: string[][];
  placeholder?: string;
}

export interface WorksheetData {
  title: string;
  subtitle: string;
  grade: number;
  studentInfoFields: string[];
  safetyReminder: string;
  sections: WorksheetSection[];
}

export interface PlanEvaluation {
  overallScore: number; // 0 - 100
  summary: string;
  goodPoints: string[];
  pointsToConsider: string[];
  issuesToFix: string[];
  suggestions: string[];
  checklist: {
    question: string;
    passed: boolean;
    note: string;
  }[];
}

export interface StemLessonPlan {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;

  // 1. Tóm tắt kế hoạch & Thông tin chung
  overviewSummary: {
    grade: number;
    stemTopic: string;
    duration: string;
    product: string;
    materials: string;
    difficultyLevel: string;
  };
  generalInfo: {
    subject: string;
    integratedSubjects: string[];
    periods: number;
    classSize?: string;
    targetAudience: string;
  };

  // 2. Bối cảnh thực tiễn
  realContext: {
    scenario: string;
    problemStatement: string;
    drivingQuestion: string;
    isAiSuggested?: boolean;
  };

  // 3. Mục tiêu
  objectives: {
    knowledge: string[];
    competencies: {
      stemCompetencies: string[];
      generalCompetencies: string[];
    };
    qualities: string[];
    isAiSuggested?: boolean;
  };

  // 4. Kiến thức STEM
  stemKnowledge: {
    science: string;
    technology: string;
    engineering: string;
    mathematics: string;
  };

  // 5. Sản phẩm STEM
  stemProduct: {
    name: string;
    purpose: string;
    materials: string[];
    specifications: string[];
    designConstraints: string[];
    successCriteria: string[];
  };

  // 6. Chuẩn bị
  preparation: {
    teacher: string[];
    student: string[];
    safetyNotes: string[];
  };

  // 7. Tiến trình dạy học (Các hoạt động)
  activities: LearningActivity[];

  // 8. Hệ thống câu hỏi gợi mở
  guidingQuestionsByLevel: {
    level1Observe: string[];
    level2Explain: string[];
    level3Apply: string[];
    level4Improve: string[];
  };

  // 9. Dự kiến khó khăn & Hỗ trợ
  difficultiesAndSupport: DifficultyItem[];

  // 10. Phân hóa đối tượng
  differentiation: {
    studentsNeedingSupport: string[];
    advancedStudents: string[];
  };

  // 11. Đánh giá
  assessment: {
    preActivity: string[];
    duringActivity: string[];
    postActivity: string[];
  };

  // 12. Rubric
  rubric: RubricData;

  // 13. Phiếu học tập
  worksheet: WorksheetData;

  // 14. Kiểm tra chất lượng (nếu đã chạy)
  evaluation?: PlanEvaluation;
}
