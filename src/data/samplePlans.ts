import { StemLessonPlan } from '../types/stem';

export const SAMPLE_STEM_PLANS: StemLessonPlan[] = [
  {
    id: 'sample-plan-grade-1',
    title: 'Chong chóng quay đón gió kì diệu',
    createdAt: '2025-09-10T08:00:00Z',
    updatedAt: '2025-09-10T08:00:00Z',
    overviewSummary: {
      grade: 1,
      stemTopic: 'Hiện tượng tự nhiên & Năng lượng gió',
      duration: '1 tiết (35 phút)',
      product: 'Chong chóng 4 cánh quay tít khi có gió',
      materials: 'Giấy thủ công màu, ống hút nhựa, đinh ghim đầu tù/tăm xốp, hạt cườm',
      difficultyLevel: 'Cơ bản (Lớp 1)'
    },
    generalInfo: {
      subject: 'Tự nhiên và Xã hội (Lớp 1)',
      integratedSubjects: ['Mỹ thuật', 'Toán học (Hình vuông, tam giác)'],
      periods: 1,
      classSize: '30 - 35 học sinh (nhóm 4-5 em)',
      targetAudience: 'Học sinh Lớp 1 mới làm quen với hoạt động nhóm và thao tác gấp dán'
    },
    realContext: {
      scenario: 'Giờ ra chơi, bạn Bo và bạn Mai thấy những chiếc lá trên cây đung đưa và cảm thấy mát mẻ. Bo hỏi: "Gió không có màu sắc, làm sao để chúng mình nhìn thấy gió đang thổi mạnh hay nhẹ nhỉ?"',
      problemStatement: 'Làm thế nào để tạo ra một món đồ chơi nhỏ xinh giúp chúng ta "nhìn thấy" gió và biết gió thổi hướng nào?',
      drivingQuestion: 'Làm thế nào để làm được một chiếc chong chóng quay thật tít bằng giấy và que cầm an toàn?',
      isAiSuggested: false
    },
    objectives: {
      knowledge: [
        'Nhận biết được gió là không khí chuyển động, gió có thể làm quay chong chóng.',
        'Nhận biết hình dạng hình vuông, đường chéo và các cánh chong chóng.'
      ],
      competencies: {
        stemCompetencies: [
          'Năng lực giải quyết vấn đề: Biết cách chỉnh cánh chong chóng nếu chong chóng chưa quay.',
          'Năng lực sử dụng công cụ: Thao tác gấp giấy, cắt theo đường kẻ nét đứt bằng kéo an toàn đầu tù.'
        ],
        generalCompetencies: [
          'Tự chủ và tự học: Tự chọn màu giấy và hoàn thành sản phẩm của mình.',
          'Giao tiếp và hợp tác: Cùng bạn kiểm tra chong chóng đón gió ở sân trường.'
        ]
      },
      qualities: [
        'Chăm chỉ: Cẩn thận trong từng đường gấp và dán.',
        'Yêu thiên nhiên: Thích thú khám phá hiện tượng tự nhiên quanh em.'
      ],
      isAiSuggested: false
    },
    stemKnowledge: {
      science: 'Gió tác động lực vào các mặt nghiêng của cánh chong chóng làm nó quay tròn.',
      technology: 'Sử dụng kéo an toàn, ghim cố định trục quay có hạt đệm để giảm ma sát.',
      engineering: 'Quy trình: Cắt chéo 4 góc hình vuông -> Gấp so le 4 cánh -> Xỏ trục quay -> Thử nghiệm.',
      mathematics: 'Nhận biết hình vuông, đếm 4 cánh chong chóng, so sánh chong chóng quay nhanh/chậm.'
    },
    stemProduct: {
      name: 'Chong chóng gió 4 cánh sắc màu',
      purpose: 'Quan sát chuyển động của gió và vui chơi giải trí ngoài trời',
      materials: [
        '1 tờ giấy màu hình vuông (12x12 cm) có in sẵn nét đứt',
        '1 ống hút nhựa cứng làm cán',
        '1 đinh ghim bấm đầu tù hoặc que tăm xốp có bịt đầu',
        '1 hạt cườm nhỏ làm vòng đệm ma sát'
      ],
      specifications: [
        'Kích thước vừa vặn bàn tay học sinh lớp 1',
        'Trục quay êm, cánh cân đối',
        'Màu sắc tươi sáng'
      ],
      designConstraints: [
        'Chỉ dùng kéo đầu tù có giáo viên quan sát',
        'Không dùng keo nến nóng nguy hiểm',
        'Hoàn thành trong vòng 15 phút thực hành'
      ],
      successCriteria: [
        'Chong chóng đứng vững trên cán cầm',
        'Khi thổi nhẹ vào cánh hoặc chạy nhẹ về phía trước, chong chóng quay tít liên tục',
        'Cánh không bị bung rời khỏi trục quay'
      ]
    },
    preparation: {
      teacher: [
        '1 chiếc chong chóng mẫu đã hoàn thiện',
        'Video ngắn 1 phút về cối xay gió hoặc chong chóng đón gió',
        'Quạt gió nhỏ để thử nghiệm trong lớp',
        'Phiếu học tập mặt cười cho học sinh lớp 1'
      ],
      student: [
        'Kéo đầu tròn học sinh',
        'Hộp bút sáp màu',
        'Khăn ẩm lau tay'
      ],
      safetyNotes: [
        '⚠️ Học sinh lớp 1 CHỈ sử dụng kéo đầu tù dưới sự giám sát.',
        '⚠️ Đầu trục quay phải có nút đất nặn hoặc băng dính bọc kín, không để đầu kim loại hở gây chọc vào tay.'
      ]
    },
    activities: [
      {
        step: 1,
        name: 'Hoạt động 1: Khởi động & Nhận biết gió (5 phút)',
        stageType: 'Xác định vấn đề',
        time: '5 phút',
        objective: 'Khơi gợi hứng thú, nhận ra tác động của gió và đặt ra nhiệm vụ chế tạo chong chóng.',
        content: 'Quan sát hiện tượng gió thổi làm bay dải ruy-băng, xem chong chóng mẫu quay.',
        teacherActivity: [
          'Bật quạt thổi nhẹ vào dải ruy-băng màu: "Đố các con cái gì đang làm dải ruy-băng bay?"',
          'Đưa chiếc chong chóng mẫu ra trước gió quạt: "Chiếc chong chóng này quay được là nhờ đâu?"',
          'Giao nhiệm vụ: "Hôm nay mỗi bạn sẽ tự tay làm một chiếc chong chóng đón gió thật đẹp nhé!"'
        ],
        studentActivity: [
          'Quan sát dải ruy-băng và chong chóng quay.',
          'Hào hứng trả lời: "Thưa cô, do gió ạ!", reo hò khi chong chóng quay tít.',
          'Nhận nhiệm vụ học tập.'
        ],
        guidingQuestions: [
          'Em nhìn thấy điều gì xảy ra với chong chóng khi cô bật quạt gió?',
          'Nếu không có quạt thì làm sao để chong chóng của chúng mình quay được?'
        ],
        expectedProduct: 'Học sinh hào hứng, nêu được tên vật dụng muốn làm là chong chóng.'
      },
      {
        step: 2,
        name: 'Hoạt động 2: Khám phá cấu tạo chong chóng (7 phút)',
        stageType: 'Khám phá kiến thức',
        time: '7 phút',
        objective: 'Nhận biết các bộ phận chính: Cánh chong chóng, trục quay, que cầm.',
        content: 'Cầm chong chóng mẫu sờ và đếm số cánh, xem trục nối với cán cầm.',
        teacherActivity: [
          'Phát cho mỗi nhóm 1 chiếc chong chóng mẫu.',
          'Hướng dẫn các con đếm số cánh và sờ vào điểm nối ở giữa.',
          'Hỏi: "Các cánh này được gấp từ hình gì? Có mấy cánh?"'
        ],
        studentActivity: [
          'Quan sát theo nhóm, đếm ngón tay: 1, 2, 3, 4 cánh.',
          'Nhận biết cánh gấp từ mảnh giấy hình vuông, có lỗ xỏ ở tâm.'
        ],
        guidingQuestions: [
          'Chong chóng có mấy cánh?',
          'Điều gì giữ cho các cánh không bị rơi ra?'
        ],
        expectedProduct: 'Chỉ và gọi tên đúng 3 bộ phận: cánh, trục, que cầm.'
      },
      {
        step: 3,
        name: 'Hoạt động 3: Đề xuất & Thống nhất các bước làm (5 phút)',
        stageType: 'Đề xuất giải pháp',
        time: '5 phút',
        objective: 'Nắm được các bước làm chong chóng an toàn.',
        content: 'Xem tranh quy trình 4 bước đơn giản bằng hình ảnh sinh động.',
        teacherActivity: [
          'Trình chiếu tranh quy trình 4 bước: (1) Cắt 4 đường chéo -> (2) Gấp 4 góc so le vào giữa -> (3) Xỏ trục có hạt đệm -> (4) Cắm vào cán que.',
          'Lưu ý học sinh: Chỉ cắt đến chấm tròn đỏ dừng lại, không cắt đứt đôi tờ giấy!'
        ],
        studentActivity: [
          'Xem tranh và nhắc lại thao tác bằng cử chỉ tay.',
          'Chọn màu giấy yêu thích.'
        ],
        guidingQuestions: [
          'Nếu chúng mình cắt quá tay vào giữa thì tờ giấy sẽ bị làm sao?',
          'Gấp tất cả các góc hay chỉ gấp cách một góc thì gấp một góc?'
        ],
        expectedProduct: 'Ghi nhớ thao tác: Cắt theo nét đứt - Gấp so le - Ghim trục.'
      },
      {
        step: 4,
        name: 'Hoạt động 4: Thực hành chế tạo chong chóng (10 phút)',
        stageType: 'Chế tạo sản phẩm',
        time: '10 phút',
        objective: 'Tự tay cắt, gấp và cố định chong chóng vào que cầm.',
        content: 'Học sinh thực hành cá nhân với sự hỗ trợ của bạn cùng bàn và giáo viên.',
        teacherActivity: [
          'Bao quát lớp, hỗ trợ các em cầm kéo chưa thạo.',
          'Giúp học sinh xỏ trục ghim qua tâm và bọc nút bảo vệ an toàn ở đầu que.'
        ],
        studentActivity: [
          'Cầm kéo cắt theo 4 đường nét đứt trên tờ giấy màu.',
          'Gấp 4 đỉnh so le vào giữa tâm.',
          'Cùng cô giáo xỏ trục qua hạt cườm và cắm vào ống hút.'
        ],
        guidingQuestions: [
          'Các cánh của em đã gấp vào tâm chưa?',
          'Đầu ghim đã được bọc đất nặn/băng dính an toàn chưa?'
        ],
        expectedProduct: 'Mỗi học sinh hoàn thành 1 chiếc chong chóng trên que cầm.'
      },
      {
        step: 5,
        name: 'Hoạt động 5: Thử nghiệm đón gió & Cải tiến (5 phút)',
        stageType: 'Thử nghiệm & Cải tiến',
        time: '5 phút',
        objective: 'Thử nghiệm thổi gió hoặc cầm chạy nhẹ để chong chóng quay, điều chỉnh nếu bị kẹt.',
        content: 'Thổi phù vào chong chóng, kiểm tra độ quay tròn.',
        teacherActivity: [
          'Cho cả lớp cùng giơ chong chóng lên và thổi nhẹ: "1 - 2 - 3, thổi gió nào!"',
          'Quan sát xem chong chóng của bạn nào chưa quay để cùng tìm nguyên nhân (do ghim chặt quá ép cánh, hoặc cánh chạm vào que).'
        ],
        studentActivity: [
          'Thổi gió bằng miệng hoặc vẫy nhẹ tay về phía trước.',
          'Quan sát chong chóng của mình và bạn quay tít.',
          'Nếu chong chóng chưa quay, nới lỏng nhẹ trục ghim theo hướng dẫn.'
        ],
        guidingQuestions: [
          'Chong chóng của em có quay tròn không?',
          'Nếu nó bị kẹt không quay, em nghĩ do cánh bị ép chặt hay lỏng quá?'
        ],
        expectedProduct: 'Chong chóng quay trơn tru, học sinh biết nới lỏng trục nếu bị kẹt.'
      },
      {
        step: 6,
        name: 'Hoạt động 6: Chia sẻ & Khen ngợi (3 phút)',
        stageType: 'Chia sẻ và Đánh giá',
        time: '3 phút',
        objective: 'Tự hào về sản phẩm của mình, tích vào phiếu học tập mặt cười.',
        content: 'Giơ cao chong chóng khoe cả lớp, tích vào ô đánh giá.',
        teacherActivity: [
          'Tuyên dương cả lớp đã hoàn thành chiếc chong chóng an toàn và đẹp mắt.',
          'Hướng dẫn các con dán sticker mặt cười vào góc sản phẩm.'
        ],
        studentActivity: [
          'Giơ cao chong chóng chào các bạn.',
          'Cùng hát vang bài hát về gió và chong chóng.'
        ],
        guidingQuestions: [
          'Hôm nay em thấy làm chong chóng có vui không?',
          'Về nhà em sẽ khoe sản phẩm này với ai?'
        ],
        expectedProduct: 'Học sinh vui vẻ, tự tin giới thiệu sản phẩm.'
      }
    ],
    guidingQuestionsByLevel: {
      level1Observe: [
        'Em nhìn thấy chong chóng có mấy cánh?',
        'Khi có gió thổi vào thì cánh chong chóng chuyển động như thế nào?'
      ],
      level2Explain: [
        'Vì sao khi đứng yên không có gió chong chóng lại không quay?',
        'Tại sao lại cần hạt cườm nhỏ ở giữa cánh và que cầm?'
      ],
      level3Apply: [
        'Nếu hôm nay trời không có gió, làm thế nào để chong chóng của em vẫn quay được?',
        'Nếu em làm chong chóng bằng bìa quá dày thì chong chóng sẽ quay dễ hay khó?'
      ],
      level4Improve: [
        'Làm thế nào để chiếc chong chóng của em quay nhanh hơn nữa?',
        'Em có muốn trang trí thêm họa tiết gì lên cánh để khi quay nó tạo ra màu sắc ảo diệu không?'
      ]
    },
    difficultiesAndSupport: [
      {
        aspect: 'Chế tạo (Kỹ năng cắt)',
        difficulty: 'Học sinh lớp 1 cắt quá tay làm đứt lìa cánh hoặc cắt lệch đường chéo.',
        teacherSupport: 'In sẵn chấm tròn đỏ đậm ở vị trí dừng lại; giáo viên cầm tay hướng dẫn em cắt nhát đầu tiên.'
      },
      {
        aspect: 'Thử nghiệm (Kẹt trục quay)',
        difficulty: 'Ghim bấm ép quá sát vào que cầm khiến cánh không quay được khi thổi.',
        teacherSupport: 'Hướng dẫn em thêm 1 hạt cườm làm đệm ma sát và chừa khoảng trống 2mm giữa cánh và que.'
      },
      {
        aspect: 'An toàn (Đầu ghim nhọn)',
        difficulty: 'Nguy cơ đầu ghim chọc vào ngón tay trẻ nhỏ.',
        teacherSupport: 'Giáo viên trực tiếp dùng mẩu đất nặn hoặc băng dính xốp bọc kín chốt sau que cầm.'
      }
    ],
    differentiation: {
      studentsNeedingSupport: [
        'Phát giấy đã được cắt sẵn 4 đường chéo, học sinh chỉ cần thực hiện thao tác gấp góc so le.',
        'Nhờ bạn cùng bàn hỗ trợ giữ que khi xỏ trục.'
      ],
      advancedStudents: [
        'Khuyến khích vẽ thêm các sọc màu tương phản lên 4 cánh để tạo hiệu ứng vòng xoáy màu sắc khi quay.',
        'Thử làm thêm một chiếc chong chóng cỡ nhỏ hơn để so sánh tốc độ quay.'
      ]
    },
    assessment: {
      preActivity: [
        'Quan sát khả năng nhận biết hiện tượng gió và hình vuông của học sinh.'
      ],
      duringActivity: [
        'Đánh giá kỹ năng dùng kéo an toàn và thao tác gấp dán theo thứ tự.',
        'Khả năng tập trung và lắng nghe hướng dẫn của giáo viên.'
      ],
      postActivity: [
        'Sản phẩm chong chóng hoàn thiện, trục quay êm.',
        'Học sinh tích cực thử nghiệm và hào hứng chia sẻ.'
      ]
    },
    rubric: {
      title: 'Rubric đánh giá sản phẩm Chong chóng đón gió (Lớp 1)',
      criteria: [
        {
          criterion: 'Cấu tạo & Hình thức',
          level1: 'Chong chóng bị rách cánh hoặc thiếu que cầm',
          level2: 'Đủ 4 cánh và que cầm nhưng các cánh gấp chưa đều',
          level3: 'Cánh gấp đều, cân đối, màu sắc đẹp',
          level4: 'Rất đẹp, cánh cân xứng hoàn hảo, có trang trí thêm họa tiết sáng tạo'
        },
        {
          criterion: 'Khả năng quay đón gió',
          level1: 'Không quay được kể cả khi thổi mạnh',
          level2: 'Quay ngập ngừng, thỉnh thoảng bị kẹt',
          level3: 'Quay trơn tru khi thổi gió vừa phải',
          level4: 'Quay tít liên tục chỉ với một hơi thổi nhẹ hoặc bước đi nhẹ'
        },
        {
          criterion: 'Ý thức an toàn & Vệ sinh',
          level1: 'Vứt mẩu giấy vụn bừa bãi, đùa nghịch kéo',
          level2: 'Còn để rơi giấy vụn, dùng kéo đúng lúc được nhắc',
          level3: 'Sử dụng kéo cẩn thận, nhặt giấy vụn vào thùng rác',
          level4: 'Rất cẩn thận, bảo vệ đầu ghim an toàn, giúp bạn nhặt rác gọn gàng'
        }
      ]
    },
    worksheet: {
      title: 'PHIẾU HỌC TẬP STEM: CHONG CHÓNG KÌ DIỆU',
      subtitle: 'Dành cho các nhà sáng chế nhí Lớp 1',
      grade: 1,
      studentInfoFields: ['Tên em là: ............................................', 'Lớp: 1......', 'Nhóm: ................'],
      safetyReminder: 'Nhớ dùng kéo đầu tròn cẩn thận và không đùa nghịch que ghim nhé!',
      sections: [
        {
          title: '1. Em chọn màu gì cho chong chóng của mình?',
          instructions: 'Tô màu vào 4 cánh chong chóng dưới đây theo ý thích của em nhé:',
          type: 'drawing',
          placeholder: '[Hình vẽ phác thảo 4 cánh chong chóng để em tô sáp màu]'
        },
        {
          title: '2. Thử nghiệm đón gió cùng chong chóng',
          instructions: 'Đánh dấu (V) vào ô đúng với chiếc chong chóng của em:',
          type: 'checkbox',
          items: [
            'Chong chóng có đủ 4 cánh (Đúng / Chưa đúng)',
            'Khi thổi nhẹ, chong chóng quay tít (Đúng / Chưa đúng)',
            'Em giữ đầu ghim an toàn không chọc vào tay (Đúng / Chưa đúng)'
          ]
        },
        {
          title: '3. Cảm xúc của em hôm nay',
          instructions: 'Khoanh tròn vào khuôn mặt thể hiện niềm vui của em:',
          type: 'checkbox',
          items: [
            '😊 Rất thích và tự hào',
            '🙂 Thích vừa vừa',
            '🤔 Em muốn làm lại cho đẹp hơn'
          ]
        }
      ]
    }
  },
  {
    id: 'sample-plan-grade-3',
    title: 'Bè cứu sinh mini vượt lũ',
    createdAt: '2025-10-01T08:00:00Z',
    updatedAt: '2025-10-01T08:00:00Z',
    overviewSummary: {
      grade: 3,
      stemTopic: 'Vật nổi - Vật chìm & Phòng chống thiên tai',
      duration: '2 tiết (70 phút)',
      product: 'Bè cứu sinh mini chở được tải trọng quy định mà không bị chìm',
      materials: 'Que kem gỗ, chai nhựa rỗng (330ml), dây chun, băng dính xốp/băng keo nilon, nắp chai',
      difficultyLevel: 'Trung bình (Lớp 3)'
    },
    generalInfo: {
      subject: 'Tự nhiên và Xã hội (Lớp 3)',
      integratedSubjects: ['Toán (Đo lường gam, đếm số lượng)', 'Mỹ thuật (Tạo hình bè)', 'Kỹ thuật'],
      periods: 2,
      classSize: '32 học sinh (chia 6 nhóm)',
      targetAudience: 'Học sinh Lớp 3 có khả năng thảo luận nhóm, phác thảo bản vẽ và đo khối lượng quả cân'
    },
    realContext: {
      scenario: 'Vào mùa mưa bão, một số vùng trũng tại miền Trung nước ta nước lũ dâng cao làm ngập đường sá và nhà cửa. Các chú bộ đội và đội cứu hộ cần những chiếc xuồng, bè nổi chắc chắn để vận chuyển mì tôm, nước uống và thuốc men tiếp tế cho bà con.',
      problemStatement: 'Làm thế nào để thiết kế một chiếc bè cứu sinh mini từ vật liệu tái chế có thể nổi vững chắc trên mặt nước và chở được ít nhất 10 viên bi (hoặc 1 hộp sữa đặc) mà không bị lật hay chìm?',
      drivingQuestion: 'Chúng ta có thể kết hợp những vật liệu nổi nào để làm một chiếc bè cứu sinh mini chịu được tải trọng tốt nhất?',
      isAiSuggested: false
    },
    objectives: {
      knowledge: [
        'Phân biệt được vật nổi (chai nhựa có nắp, gỗ nhẹ, xốp) và vật chìm (đinh sắt, sỏi đá) trong nước.',
        'Hiểu rằng bè có diện tích đáy rộng và chứa nhiều khoang rỗng không khí sẽ có sức nổi tốt hơn.'
      ],
      competencies: {
        stemCompetencies: [
          'Năng lực thiết kế kỹ thuật: Biết vẽ phác thảo bè, chọn vật liệu gắn kết bằng dây chun/băng keo.',
          'Năng lực thử nghiệm và cải tiến: Đo tải trọng chịu đựng của bè, phân tích lý do bè bị nghiêng để chỉnh sửa.'
        ],
        generalCompetencies: [
          'Hợp tác nhóm: Phân công nhiệm vụ (trưởng nhóm, họa sĩ thiết kế, thợ lắp ráp, người thử nghiệm).',
          'Giao tiếp: Thuyết trình tự tin về cấu tạo và sức chở của bè.'
        ]
      },
      qualities: [
        'Nhân ái: Thể hiện sự đồng cảm, tinh thần tương thân tương ái hướng về đồng bào vùng lũ.',
        'Trách nhiệm: Tận dụng chai nhựa tái chế để bảo vệ môi trường sông ngòi.'
      ],
      isAiSuggested: false
    },
    stemKnowledge: {
      science: 'Lực đẩy của nước (lực Ác-si-mét định tính cấp tiểu học): Vật nhẹ, chứa không khí sẽ nổi trên mặt nước.',
      technology: 'Sử dụng băng dính chống thấm nước, dây thun chằng buộc kết cấu bè chắc chắn.',
      engineering: 'Quy trình kỹ thuật: Xác định yêu cầu tải trọng -> Thiết kế đáy bè -> Lắp ráp phao và sàn bè -> Thử tải -> Cải tiến.',
      mathematics: 'Đo kích thước (dài x rộng bè bằng thước cm), đếm số lượng vật tải (viên bi, quả cân), tính tải trọng tối đa.'
    },
    stemProduct: {
      name: 'Mô hình Bè cứu sinh mini vượt lũ',
      purpose: 'Vận chuyển hàng hóa cứu trợ giả định (viên bi, đồ hộp mini) an toàn trên mặt nước',
      materials: [
        '2 - 3 chai nước suối rỗng có nắp vặn kín',
        '15 - 20 que kem gỗ / que đè lưỡi',
        '10 dây chun vòng',
        'Cuộn băng dính đóng hàng chống nước',
        'Hộp giấy nhỏ đựng hàng cứu trợ'
      ],
      specifications: [
        'Kích thước chiều dài không quá 25 cm, chiều rộng 15 - 20 cm',
        'Có sàn bè phẳng để đặt hàng cứu trợ không bị trượt',
        'Bè cân đối, không bị chao đảo một bên'
      ],
      designConstraints: [
        'Chỉ dùng vật liệu an toàn, không dùng đinh nhọn',
        'Không dùng keo dán tan trong nước',
        'Thời gian chế tạo: 20 phút'
      ],
      successCriteria: [
        'Bè tự nổi cân bằng trên chậu nước khi không tải',
        'Chở được ít nhất 10 viên bi sắt/thủy tinh (tương đương 150g) nổi trong ít nhất 30 giây mà sàn bè không ngập nước',
        'Hàng hóa không bị rơi ra ngoài khi đẩy nhẹ bè di chuyển'
      ]
    },
    preparation: {
      teacher: [
        '2 chậu nước lớn (hoặc bể phao mini) để góc thử nghiệm lớp học',
        'Túi bi thủy tinh, quả cân 50g-100g làm tải trọng cứu trợ',
        'Khăn lau nước sàn',
        'Video 2 phút về bè cứu hộ vùng lũ'
      ],
      student: [
        'Chai nhựa đã rửa sạch và vặn chặt nắp do nhóm mang từ nhà',
        'Que kem, dây chun, kéo an toàn',
        'Bút dạ vẽ phác thảo trên giấy A3'
      ],
      safetyNotes: [
        '⚠️ Nước thử nghiệm cần lau khô ngay nếu bắn ra sàn để tránh trơn trượt.',
        '⚠️ Chai nhựa phải còn nguyên nắp kín, không dùng chai vỡ nứt mép nhọn.'
      ]
    },
    activities: [
      {
        step: 1,
        name: 'Hoạt động 1: Xem video mùa lũ & Đặt vấn đề cứu nạn (8 phút)',
        stageType: 'Xác định vấn đề',
        time: '8 phút',
        objective: 'Khơi dậy lòng trắc ẩn và nhận thức được nhu cầu chế tạo bè cứu sinh.',
        content: 'Xem clip cứu hộ bằng bè nổi, phân tích vì sao bè lại chở được người và đồ.',
        teacherActivity: [
          'Chiếu đoạn video ngắn: "Các con thấy nước dâng cao ngập hết đường, các chú bộ đội dùng phương tiện gì để đưa mì tôm cho người dân?"',
          'Nêu bài toán: "Hôm nay mỗi nhóm là một đội cứu hộ kỹ thuật nhí, chế tạo một chiếc bè mini chở hàng tiếp tế nhé!"'
        ],
        studentActivity: [
          'Theo dõi video với sự xúc động.',
          'Nêu phát biểu: "Dùng thuyền và bè nổi ạ!", tiếp nhận thử thách của nhóm.'
        ],
        guidingQuestions: [
          'Vì sao chiếc bè gỗ hay bè phao lại không bị chìm xuống đáy sông?',
          'Chiếc bè cứu sinh cần có những yêu cầu gì để chở được nhiều đồ?'
        ],
        expectedProduct: 'Học sinh xác định được nhiệm vụ và tiêu chí thành công của bè.'
      },
      {
        step: 2,
        name: 'Hoạt động 2: Thử nghiệm vật nổi - vật chìm (10 phút)',
        stageType: 'Khám phá kiến thức',
        time: '10 phút',
        objective: 'Khám phá đặc tính nổi của chai nhựa kín khí và que gỗ so với kim loại/đá.',
        content: 'Thả các vật mẫu vào khay nước nhỏ để kiểm chứng.',
        teacherActivity: [
          'Cho đại diện nhóm thả: 1 que kem, 1 chai nhựa có nắp, 1 hòn đá, 1 chiếc thìa sắt.',
          'Hỏi: "Vật nào nổi? Vì sao chai nhựa rỗng lại nổi rất cao trên mặt nước?"'
        ],
        studentActivity: [
          'Quan sát thực tế và ghi chép vào phiếu học tập cột "Nổi" / "Chìm".',
          'Nhận xét: Chai nhựa rỗng chứa nhiều không khí nên nổi rất tốt.'
        ],
        guidingQuestions: [
          'Nếu mở nắp chai để nước tràn vào đầy bên trong thì chai còn nổi không?',
          'Vật liệu nào tốt nhất để làm phao nâng đỡ cho bè?'
        ],
        expectedProduct: 'Hiểu nguyên lý: Không khí bên trong chai nhựa kín giúp tạo sức nổi mạnh.'
      },
      {
        step: 3,
        name: 'Hoạt động 3: Thảo luận ý tưởng & Vẽ bản thiết kế (12 phút)',
        stageType: 'Đề xuất giải pháp',
        time: '12 phút',
        objective: 'Làm việc nhóm, vẽ phác thảo kết cấu bè (vị trí chai phao, sàn que gỗ).',
        content: 'Nhóm vẽ sơ đồ bè trên giấy A3, chú thích vật liệu và kích thước dự kiến.',
        teacherActivity: [
          'Đến từng nhóm gợi ý: "Nên đặt 2 chai ở hai bên sườn bè hay đặt ở giữa thì bè ít bị lật?"',
          'Khuyến khích các nhóm thử nghiệm 2 kiểu dáng khác nhau: bè đôi (catamaran) hoặc bè 3 phao.'
        ],
        studentActivity: [
          'Họa sĩ nhóm vẽ phác thảo cấu tạo mặt trên và mặt dưới của bè.',
          'Cả nhóm thống nhất số lượng que kem và cách chằng dây chun.'
        ],
        guidingQuestions: [
          'Bè hình chữ nhật hay bè hình vuông sẽ chở hàng cân bằng hơn?',
          'Làm sao để que gỗ không bị tuột ra khi nước dập dềnh?'
        ],
        expectedProduct: 'Bản vẽ thiết kế có ghi rõ vị trí chai nhựa, sàn bè và dây buộc.'
      },
      {
        step: 4,
        name: 'Hoạt động 4: Chế tạo bè theo thiết kế (20 phút)',
        stageType: 'Chế tạo sản phẩm',
        time: '20 phút',
        objective: 'Lắp ráp các bộ phận thành chiếc bè hoàn chỉnh theo đúng bản vẽ.',
        content: 'Các thành viên phối hợp: cố định chai nhựa, đan sàn gỗ que kem, gia cố lan can.',
        teacherActivity: [
          'Quan sát thao tác của các nhóm, nhắc nhở an toàn khi kéo cắt băng dính.',
          'Nhắc các nhóm kiểm tra nắp chai xem đã vặn thật chặt chưa.'
        ],
        studentActivity: [
          'Dùng dây chun và băng keo liên kết 2 chai nhựa lại với nhau.',
          'Xếp các que kem đan khít tạo sàn phẳng vững chắc.',
          'Làm thêm gờ chắn nhỏ để hàng cứu trợ không bị lăn xuống nước.'
        ],
        guidingQuestions: [
          'Sàn bè của nhóm em đã đủ phẳng để đặt hộp hàng chưa?',
          'Các mối nối có bị lung lay không?'
        ],
        expectedProduct: 'Mỗi nhóm tạo ra 1 chiếc bè hoàn chỉnh, chắc chắn.'
      },
      {
        step: 5,
        name: 'Hoạt động 5: Thử tải trên mặt nước & Cải tiến (12 phút)',
        stageType: 'Thử nghiệm & Cải tiến',
        time: '12 phút',
        objective: 'Kiểm tra sức nổi, đo số lượng viên bi chở được, xác định điểm cần cải tiến.',
        content: 'Thả bè vào bể nước, lần lượt xếp từng viên bi vào lòng bè cho đến khi có dấu hiệu chìm.',
        teacherActivity: [
          'Điều hành khu vực thử tải, bấm giờ 30 giây cho mỗi mức tải trọng.',
          'Hỏi nhóm có bè bị nghiêng: "Vì sao bè của con bị chúc đầu xuống nước? Con sẽ chỉnh lại vị trí đặt hàng như thế nào?"'
        ],
        studentActivity: [
          'Đếm số viên bi đặt lên bè: 1, 2... 10... 15 viên bi.',
          'Ghi nhận kết quả: Bè nhóm chở được tối đa bao nhiêu viên bi?',
          'Thực hiện cải tiến nhanh: Dời vị trí chai phao rộng sang 2 bên để tăng độ thăng bằng.'
        ],
        guidingQuestions: [
          'Bè của nhóm em đạt được tiêu chí chở 10 viên bi chưa?',
          'Nếu bè bị nghiêng sang một bên, nguyên nhân do đâu và em sửa thế nào?'
        ],
        expectedProduct: 'Bảng số liệu thử tải của từng nhóm và phương án cải tiến đã thực hiện.'
      },
      {
        step: 6,
        name: 'Hoạt động 6: Trình diễn cứu hộ & Đánh giá (8 phút)',
        stageType: 'Chia sẻ và Đánh giá',
        time: '8 phút',
        objective: 'Thuyết trình về sản phẩm, đánh giá chéo giữa các nhóm bằng phiếu Rubric.',
        content: 'Đại diện nhóm biểu diễn chở hàng cứu hộ trước lớp và nêu bài học rút ra.',
        teacherActivity: [
          'Nhận xét sự sáng tạo của từng nhóm, tuyên dương tinh thần vượt khó cải tiến sản phẩm.',
          'Kết nối bài học với ý thức sẻ chia và bảo vệ môi trường.'
        ],
        studentActivity: [
          'Đại diện nhóm tự tin giới thiệu: Tên bè, sức chở tối đa, khó khăn đã vượt qua.',
          'Các nhóm khác chấm điểm hoa điểm tốt cho bạn.'
        ],
        guidingQuestions: [
          'Em ấn tượng nhất với thiết kế của nhóm nào? Vì sao?',
          'Nếu có thêm thời gian, em muốn gắn thêm chi tiết gì cho bè (ví dụ: cờ cứu hộ, mái che)?'
        ],
        expectedProduct: 'Học sinh trình bày lưu loát, hoàn thành phiếu đánh giá chéo.'
      }
    ],
    guidingQuestionsByLevel: {
      level1Observe: [
        'Em quan sát thấy chai nhựa rỗng nằm chìm hay nổi trên mặt nước?',
        'Khi đặt thêm bi sắt vào, mực nước dâng lên tới vị trí nào của bè?'
      ],
      level2Explain: [
        'Tại sao bè có 2 phao đặt cách xa nhau lại khó bị lật hơn bè chỉ có 1 phao ở giữa?',
        'Vì sao chúng mình phải vặn nắp chai thật chặt trước khi thả xuống nước?'
      ],
      level3Apply: [
        'Nếu hàng hóa cứu trợ là gạo và muối dễ tan trong nước, em cần thiết kế sàn bè cao hơn mặt nước bao nhiêu cm?',
        'Làm thế nào để đẩy chiếc bè di chuyển qua sông mà người cứu hộ không cần lội xuống nước sâu?'
      ],
      level4Improve: [
        'Làm cách nào để chiếc bè chở được gấp đôi tải trọng mà kích thước bè không tăng quá nhiều?',
        'Em có ý tưởng gắn thêm cánh buồm hoặc guồng quay chân vịt chạy bằng dây chun để bè tự bơi được không?'
      ]
    },
    difficultiesAndSupport: [
      {
        aspect: 'Kỹ thuật (Độ thăng bằng)',
        difficulty: 'Bè bị lật úp khi đặt tải trọng lệch tâm.',
        teacherSupport: 'Gợi ý học sinh tách rộng khoảng cách giữa 2 chai phao (thiết kế kiểu tàu 2 thân catamaran) và vẽ ô đánh dấu vị trí xếp hàng ở chính giữa sàn.'
      },
      {
        aspect: 'Vật liệu (Băng dính bị bong khi gặp nước)',
        difficulty: 'Dùng băng dính giấy hoặc băng dính dán học sinh dễ bị ngấm nước rã keo.',
        teacherSupport: 'Chuẩn bị băng dính đóng thùng nilon chống nước và dùng dây chun vòng buộc kép nhiều vòng trợ lực.'
      },
      {
        aspect: 'Làm việc nhóm',
        difficulty: 'Các bạn tranh nhau thả bi làm bè bị rung lắc và chìm.',
        teacherSupport: 'Phân công rõ ràng: 1 bạn giữ bè cố định, 1 bạn lần lượt đặt bi nhẹ nhàng, 1 bạn đếm và ghi số liệu.'
      }
    ],
    differentiation: {
      studentsNeedingSupport: [
        'Hướng dẫn làm bè cơ bản gồm 2 chai nước song song, dán 5-7 que kem làm sàn đơn giản.',
        'Cho phép thử tải ở mức 5 viên bi trước để lấy lại sự tự tin.'
      ],
      advancedStudents: [
        'Thử thách nhóm thiết kế thêm mái vòm che mưa cho hàng hóa bằng túi nilon tái chế.',
        'Nâng mức thử tải lên 20 viên bi hoặc gắn thêm guồng cánh quạt chạy bằng dây chun để bè tự tiến về phía trước.'
      ]
    },
    assessment: {
      preActivity: [
        'Khả năng nhận biết vật nổi - vật chìm qua câu hỏi tình huống đầu giờ.'
      ],
      duringActivity: [
        'Sự hợp tác nhóm, tính chính xác của bản vẽ phác thảo.',
        'Kỹ năng kiên trì sửa chữa, cải tiến khi bè bị nghiêng hoặc kẹt nước.'
      ],
      postActivity: [
        'Khả năng chịu tải thực tế của chiếc bè đạt >= 10 viên bi.',
        'Phần thuyết trình mạch lạc, giải thích được vì sao bè của nhóm nổi tốt.'
      ]
    },
    rubric: {
      title: 'Rubric đánh giá sản phẩm Bè cứu sinh mini (Lớp 3)',
      criteria: [
        {
          criterion: 'Tính chắc chắn & Sáng tạo',
          level1: 'Kết cấu lỏng lẻo, que kem bị xô lệch khi nhấc lên',
          level2: 'Bè tương đối chắc nhưng mối nối dây chun còn lỏng',
          level3: 'Bè chắc chắn, sàn phẳng, bố cục chai phao cân đối',
          level4: 'Rất vững chắc, có lan can chắn hàng, thiết kế kiểu dáng thẩm mỹ cao'
        },
        {
          criterion: 'Sức nổi & Khả năng tải trọng',
          level1: 'Bè bị lật hoặc chìm ngay khi chưa đặt tải trọng',
          level2: 'Chở được 5-8 viên bi thì bắt đầu ngập nước',
          level3: 'Chở vững vàng 10-14 viên bi trong 30 giây',
          level4: 'Chở xuất sắc trên 15 viên bi, không bị lật kể cả khi mặt nước gợn sóng'
        },
        {
          criterion: 'Thử nghiệm & Cải tiến',
          level1: 'Không thử nghiệm lại khi gặp lỗi',
          level2: 'Thử lại nhưng chưa biết tìm nguyên nhân điều chỉnh',
          level3: 'Tìm ra lỗi bè nghiêng và chỉnh lại phao thành công',
          level4: 'Chủ động phân tích nguyên nhân khoa học, tối ưu thiết kế đạt sức chở cao hơn'
        },
        {
          criterion: 'Kỹ năng hợp tác nhóm',
          level1: 'Mất trật tự, chỉ 1-2 bạn làm, các bạn khác đứng ngoài',
          level2: 'Có phân công nhưng phối hợp chưa nhịp nhàng',
          level3: 'Các thành viên đều có việc làm cụ thể, tôn trọng ý kiến nhau',
          level4: 'Hợp tác xuất sắc, hỗ trợ nhau nhịp nhàng, đại diện nhóm thuyết trình tự tin'
        }
      ]
    },
    worksheet: {
      title: 'PHIẾU HỌC TẬP: THIẾT KẾ BÈ CỨU SINH MINI VƯỢT LŨ',
      subtitle: 'Hồ sơ kỹ thuật của Đội cứu hộ nhí Lớp 3',
      grade: 3,
      studentInfoFields: ['Tên nhóm: ............................................', 'Lớp: 3......', 'Các thành viên: ........................................................................................'],
      safetyReminder: 'Lau khô tay và sàn nhà sau khi thử nghiệm nước. Cẩn thận khi dùng kéo cắt băng keo!',
      sections: [
        {
          title: '1. Khám phá vật liệu nổi - chìm',
          instructions: 'Đánh dấu (X) vào cột tương ứng khi thả các vật mẫu vào nước:',
          type: 'table',
          columns: ['Tên vật mẫu', 'Vật Nổi', 'Vật Chìm', 'Giải thích vì sao?'],
          rows: [
            ['Chai nhựa rỗng có nắp', '[ ]', '[ ]', 'Bên trong chứa nhiều không khí'],
            ['Que kem gỗ', '[ ]', '[ ]', 'Gỗ nhẹ hơn nước'],
            ['Hòn sỏi / Đinh sắt', '[ ]', '[ ]', 'Nặng và đặc ruột'],
            ['Viên bi sắt / bi ve', '[ ]', '[ ]', 'Đặc ruột, chìm xuống đáy']
          ]
        },
        {
          title: '2. Bản phác thảo thiết kế bè của nhóm em',
          instructions: 'Vẽ sơ đồ mặt phẳng chiếc bè (ghi rõ vị trí gắn chai nước và que gỗ):',
          type: 'drawing',
          placeholder: '[Khung vẽ bản thiết kế kích thước 15x20cm, ghi chú mũi tên vật liệu]'
        },
        {
          title: '3. Nhật ký thử nghiệm tải trọng',
          instructions: 'Ghi lại số lượng viên bi chở được qua từng lần thử:',
          type: 'table',
          columns: ['Lần thử', 'Số bi chở được', 'Hiện tượng quan sát được', 'Cách nhóm em sửa lỗi'],
          rows: [
            ['Lần 1', '...... viên bi', 'Bè hơi nghiêng sang phải', 'Dời phao chai nhựa sang 2 bên'],
            ['Lần 2 (Cải tiến)', '...... viên bi', 'Bè nổi rất cân bằng', 'Đạt tiêu chí xuất sắc!']
          ]
        },
        {
          title: '4. Tự đánh giá và cảm nghĩ',
          instructions: 'Ghi lại điều nhóm em thích nhất trong tiết học hôm nay:',
          type: 'short_answer',
          placeholder: 'Điều nhóm em tâm đắc nhất: .............................................................................'
        }
      ]
    }
  },
  {
    id: 'sample-plan-grade-5',
    title: 'Thùng rác phân loại thông minh gạt tự động',
    createdAt: '2025-10-05T08:00:00Z',
    updatedAt: '2025-10-05T08:00:00Z',
    overviewSummary: {
      grade: 5,
      stemTopic: 'Cơ học đòn bẩy & Phân loại rác bảo vệ môi trường',
      duration: '2 tiết (70 phút)',
      product: 'Thùng rác 2 ngăn có cơ cấu đạp chân mở nắp tự động không cần dùng tay',
      materials: 'Hộp carton phế liệu, que kem, xiên tre tròn, dây chun, dây chỉ dù, nắp chai nhựa, keo dán',
      difficultyLevel: 'Nâng cao (Lớp 5)'
    },
    generalInfo: {
      subject: 'Khoa học (Lớp 5 - Môi trường và Tài nguyên)',
      integratedSubjects: ['Công nghệ (Lắp ráp mô hình kỹ thuật)', 'Toán (Tính tỉ lệ đòn bẩy, góc mở)', 'Mỹ thuật'],
      periods: 2,
      classSize: '35 học sinh (chia 7 nhóm)',
      targetAudience: 'Học sinh Lớp 5 thành thạo tư duy đòn bẩy cơ học, khả năng phân loại rác hữu cơ/vô cơ'
    },
    realContext: {
      scenario: 'Tại lớp học và góc sân trường, học sinh sau giờ ăn bán trú thường bỏ chung hộp sữa chua, vỏ chuối và giấy nháp vào một sọt rác duy nhất, gây mùi hôi và lãng phí rác tái chế. Ngoài ra, việc dùng tay chạm trực tiếp vào nắp thùng rác tiềm ẩn nguy cơ lây lan vi khuẩn.',
      problemStatement: 'Làm thế nào để chế tạo một mô hình thùng rác phân loại 2 ngăn (Rác tái chế & Rác hữu cơ/sinh hoạt) có cơ cấu đòn bẩy đạp chân để mở nắp tự động, giúp bỏ rác hợp vệ sinh mà không cần chạm tay?',
      drivingQuestion: 'Chúng ta có thể ứng dụng nguyên lý đòn bẩy cơ học như thế nào để nắp thùng rác tự mở ra khi đạp chân và tự đóng lại khi thả chân ra?',
      isAiSuggested: false
    },
    objectives: {
      knowledge: [
        'Vận dụng nguyên lý đòn bẩy (Điểm tựa, Điểm đặt lực tác dụng, Điểm đặt lực cản) để truyền chuyển động mở nắp.',
        'Phân biệt chính xác rác tái chế (giấy, nhựa, kim loại) và rác sinh hoạt/hữu cơ (vỏ quả, thức ăn thừa).'
      ],
      competencies: {
        stemCompetencies: [
          'Năng lực kỹ thuật: Thiết kế bản lề nắp hộp và thanh truyền động đòn bẩy liên động.',
          'Năng lực giải quyết vấn đề thực tiễn: Tối ưu góc mở của nắp hộp đạt ít nhất 60 độ để tiện bỏ rác.'
        ],
        generalCompetencies: [
          'Tự chủ và làm việc nhóm: Lập kế hoạch phân công, đo đạc chính xác kích thước thanh đòn.',
          'Giao tiếp khoa học: Thuyết minh cơ chế chuyển động đòn bẩy rõ ràng.'
        ]
      },
      qualities: [
        'Ý thức bảo vệ môi trường: Thói quen phân loại rác tại nguồn.',
        'Kiên trì, sáng tạo: Thử nghiệm vị trí điểm tựa đòn bẩy nhiều lần để tìm vị trí tối ưu.'
      ],
      isAiSuggested: false
    },
    stemKnowledge: {
      science: 'Nguyên lý đòn bẩy loại 1 hoặc loại 3: Tác dụng lực vào một đầu làm đầu kia chuyển động theo hướng ngược lại hoặc cùng chiều qua điểm tựa.',
      technology: 'Ứng dụng cơ cấu trục quay (bản lề), thanh truyền lực (que tre), dây kéo đàn hồi.',
      engineering: 'Quy trình kỹ thuật 5 bước: Xác định thông số thùng rác -> Thiết kế khung và cơ cấu đòn bẩy -> Cắt ghép lắp ráp -> Thử nghiệm góc mở nắp -> Hoàn thiện tem nhãn phân loại.',
      mathematics: 'Đo góc (góc mở nắp >= 60 độ), đo chiều dài cánh tay đòn, tỉ lệ độ dài từ điểm tựa đến bàn đạp.'
    },
    stemProduct: {
      name: 'Thùng rác phân loại thông minh đạp chân 2 ngăn',
      purpose: 'Phân loại rác tại lớp học và mở nắp tự động không chạm tay',
      materials: [
        'Bìa carton cứng (tận dụng từ hộp bánh/hộp sữa)',
        '4-6 xiên tre tròn làm trục quay và thanh truyền',
        '8-10 que kem làm bàn đạp và cánh tay đòn',
        'Dây chun vòng và sợi chỉ dù làm dây truyền lực',
        'Băng dính hai mặt, keo nến (giáo viên hỗ trợ), giấy màu xanh lá và cam làm nhãn dán'
      ],
      specifications: [
        'Chiều cao thùng rác 15 - 20 cm, có vách ngăn đôi bên trong',
        'Mỗi ngăn có nắp riêng hoặc nắp đôi mở độc lập',
        'Màu sắc quy ước: Ngăn Xanh lá (Rác hữu cơ) - Ngăn Cam/Vàng (Rác tái chế)'
      ],
      designConstraints: [
        'Độ nhạy: Khi dùng một ngón tay ấn nhẹ bàn đạp, nắp phải mở lên ngay lập tức',
        'Độ bền: Cơ cấu chịu được ít nhất 20 lần đạp mở liên tục mà không tuột trục',
        'Vật liệu 100% tái chế'
      ],
      successCriteria: [
        'Nắp mở được góc từ 60 đến 90 độ khi đạp chân',
        'Khi thả chân ra, nắp tự động hạ xuống đậy kín miệng thùng',
        'Nhãn phân loại rác rõ ràng, có hình minh họa'
      ]
    },
    preparation: {
      teacher: [
        '1 mô hình đòn bẩy cơ bản minh họa (thước kẻ đặt trên cục tẩy)',
        'Mô hình thùng rác đạp chân mẫu để học sinh quan sát chuyển động',
        'Thước đo góc và súng bắn keo (giáo viên phụ trách ở bàn kỹ thuật)'
      ],
      student: [
        'Hộp carton đã cắt sẵn các tấm theo hướng dẫn sơ bộ',
        'Que kem, que tre, dây chun, kéo, bút chì, thước kẻ',
        'Hình ảnh minh họa các loại rác cắt từ báo cũ'
      ],
      safetyNotes: [
        '⚠️ Đầu xiên tre nhọn phải được cắt bỏ hoặc bọc nút xốp bảo vệ.',
        '⚠️ Keo nến nóng CHỈ do giáo viên hỗ trợ bấm dán ở khu vực cố định.'
      ]
    },
    activities: [
      {
        step: 1,
        name: 'Hoạt động 1: Vấn đề phân loại rác & Khảo sát thùng rác gia đình (8 phút)',
        stageType: 'Xác định vấn đề',
        time: '8 phút',
        objective: 'Nhận diện bất tiện của thùng rác mở bằng tay và ý nghĩa phân loại rác.',
        content: 'Thảo luận tình huống vi khuẩn bám trên nắp thùng rác và rác bị vứt lẫn lộn.',
        teacherActivity: [
          'Đưa ra câu hỏi: "Khi tay chúng ta đang bẩn sau giờ vẽ hoặc ăn uống, mở nắp thùng rác bằng tay có vệ sinh không?"',
          'Khảo sát: "Ở nhà các con có thùng rác đạp chân không? Làm sao bàn chân đạp ở dưới mà nắp ở trên lại mở ra được?"'
        ],
        studentActivity: [
          'Nhận xét: Không vệ sinh, dễ dính vi khuẩn.',
          'Phát hiện: Có một thanh cơ học truyền lực từ dưới bàn đạp lên trên nắp.'
        ],
        guidingQuestions: [
          'Cơ cấu cơ học nào giúp đổi hướng hoặc truyền chuyển động từ dưới lên trên?',
          'Tại sao một chiếc thùng rác thông minh lại cần có 2 ngăn riêng biệt?'
        ],
        expectedProduct: 'Xác định được mục tiêu: Tạo thùng rác 2 ngăn mở nắp bằng bàn đạp đòn bẩy.'
      },
      {
        step: 2,
        name: 'Hoạt động 2: Khám phá nguyên lý đòn bẩy truyền lực (10 phút)',
        stageType: 'Khám phá kiến thức',
        time: '10 phút',
        objective: 'Hiểu điểm tựa, cánh tay đòn tác dụng và lực kéo nâng nắp hộp.',
        content: 'Thử nghiệm cơ cấu bập bênh: ấn một đầu, đầu kia nhấc bổng lên.',
        teacherActivity: [
          'Dùng thước kẻ và cục gôm làm thí nghiệm đòn bẩy: "Khi cô ấn đầu này xuống, đầu kia chuyển động thế nào?"',
          'Vẽ sơ đồ truyền động: Bàn đạp (Đòn bẩy 1) -> Thanh đẩy dọc -> Bản lề nắp (Đòn bẩy 2).'
        ],
        studentActivity: [
          'Thực hành với thước kẻ trên bàn học để cảm nhận lực và điểm tựa.',
          'Ghi nhớ: Muốn đầu kia nâng cao, điểm tựa cần đặt gần đầu nâng hay gần đầu ấn?'
        ],
        guidingQuestions: [
          'Nếu điểm tựa quá sát đầu ấn thì đạp chân sẽ nặng hay nhẹ?',
          'Làm sao để khi nhấc chân ra thì nắp tự hạ xuống đậy kín?'
        ],
        expectedProduct: 'Nắm được nguyên lý liên kết đòn bẩy và trọng lực tự hạ nắp.'
      },
      {
        step: 3,
        name: 'Hoạt động 3: Thiết kế bản vẽ cơ khí mô hình (12 phút)',
        stageType: 'Đề xuất giải pháp',
        time: '12 phút',
        objective: 'Vẽ bản thiết kế chi tiết gồm: Kích thước thùng, vị trí trục quay, thanh truyền động.',
        content: 'Nhóm vẽ bản vẽ kỹ thuật tỷ lệ thực trên giấy kẻ ô vuông.',
        teacherActivity: [
          'Gợi ý 2 phương án truyền lực: Dùng thanh đẩy que tre trực tiếp hoặc dùng dây kéo qua ròng rọc/lỗ xỏ.',
          'Kiểm tra tính khả thi của bản vẽ từng nhóm trước khi cho chế tạo.'
        ],
        studentActivity: [
          'Phân công: 1 bạn vẽ mặt cắt bên của thùng, 1 bạn vẽ mặt trước 2 ngăn.',
          'Tính toán chiều dài thanh que tre cần dùng để nối từ chân lên nắp.'
        ],
        guidingQuestions: [
          'Nắp thùng sẽ quay quanh trục bản lề bằng gì (băng dính hay que tre)?',
          'Góc mở dự kiến của nắp là bao nhiêu độ?'
        ],
        expectedProduct: 'Bản vẽ kỹ thuật có đủ thông số và cơ chế truyền lực rõ ràng.'
      },
      {
        step: 4,
        name: 'Hoạt động 4: Chế tạo và lắp ráp cơ cấu (22 phút)',
        stageType: 'Chế tạo sản phẩm',
        time: '22 phút',
        objective: 'Tạo vỏ thùng 2 ngăn, gắn bản lề nắp và lắp thanh truyền đòn bẩy đạp chân.',
        content: 'Nhóm thực hiện chế tạo: Cắt bìa, lắp vách ngăn, khoan lỗ xỏ trục que tre, kết nối bàn đạp.',
        teacherActivity: [
          'Trực tiếp hỗ trợ cố định các điểm chịu lực bằng keo nóng tại góc kỹ thuật.',
          'Nhắc nhở học sinh thử độ trơn của trục quay trước khi dán chết vị trí.'
        ],
        studentActivity: [
          'Nhóm 1: Dán vách ngăn đôi và trang trí nhãn phân loại (Xanh lá - Cam).',
          'Nhóm 2: Lắp trục quay nắp và gắn cánh tay đòn nối.',
          'Lắp ráp thanh truyền que tre từ bàn đạp lên mép nắp sau.'
        ],
        guidingQuestions: [
          'Bàn đạp có bị cọ quẹt vào đáy thùng không?',
          'Khi ấn bàn đạp, thanh truyền có bị cong vênh không?'
        ],
        expectedProduct: 'Thùng rác hoàn thiện với cơ cấu truyền động chuyển động được.'
      },
      {
        step: 5,
        name: 'Hoạt động 5: Thử nghiệm góc mở, độ bền & Cải tiến (10 phút)',
        stageType: 'Thử nghiệm & Cải tiến',
        time: '10 phút',
        objective: 'Đo góc mở nắp bằng thước đo độ, thử nghiệm phân loại rác mẫu vào đúng ngăn.',
        content: 'Đạp thử 15 lần liên tục, đo góc mở, dán thêm đối trọng nếu nắp chưa đóng kín.',
        teacherActivity: [
          'Phát các thẻ rác mẫu (vỏ chuối, chai nhựa, giấy ăn bẩn, lon nước ngọt).',
          'Đo góc mở của các nhóm: "Nhóm nào nắp mở được trên 60 độ để bỏ vừa lon nước?"'
        ],
        studentActivity: [
          'Dùng thước đo độ đo góc mở của nắp khi ấn bàn đạp.',
          'Phát hiện lỗi: Nắp mở còn thấp (chỉ 40 độ) -> Điều chỉnh nối thanh đẩy ra xa điểm tựa hơn.',
          'Thử nghiệm phân loại thả rác mẫu vào từng ngăn.'
        ],
        guidingQuestions: [
          'Nắp mở đã đủ rộng để thả cả vỏ chai nhựa vào chưa?',
          'Làm thế nào để khi buông chân ra thì nắp tự sập xuống không bị kẹt lơ lửng?'
        ],
        expectedProduct: 'Góc mở nắp đạt chuẩn >= 60 độ, cơ cấu hoạt động trơn tru.'
      },
      {
        step: 6,
        name: 'Hoạt động 6: Báo cáo sáng chế & Tuyên truyền xanh (8 phút)',
        stageType: 'Chia sẻ và Đánh giá',
        time: '8 phút',
        objective: 'Thuyết trình cơ chế đòn bẩy và thông điệp phân loại rác bảo vệ Trái Đất.',
        content: 'Mỗi nhóm biểu diễn thao tác và đố các bạn phân loại đúng loại rác vào ngăn.',
        teacherActivity: [
          'Đánh giá tính ứng dụng cao của các sản phẩm, khen ngợi tinh thần sáng tạo cơ khí nhí.',
          'Phát động phong trào đặt các thùng rác này tại các góc học tập của lớp.'
        ],
        studentActivity: [
          'Trình bày: "Nhóm em dùng đòn bẩy loại 1, điểm tựa đặt ở khoảng cách 1/3 giúp đạp rất nhẹ mà nắp mở tới 75 độ..."',
          'Cả lớp hào hứng vỗ tay hưởng ứng phong trào sống xanh.'
        ],
        guidingQuestions: [
          'Sản phẩm của nhóm có thể ứng dụng ở đâu trong trường học?',
          'Nếu có cảm biến tự động (STEM Micro:bit/Arduino), em muốn nâng cấp thùng rác này thế nào?'
        ],
        expectedProduct: 'Bài thuyết trình khoa học ấn tượng, học sinh hiểu sâu về đòn bẩy.'
      }
    ],
    guidingQuestionsByLevel: {
      level1Observe: [
        'Khi ấn bàn đạp xuống, em thấy thanh truyền ở phía sau thùng rác chuyển động theo hướng nào?',
        'Nắp thùng rác mở ra được một góc ước lượng bao nhiêu độ?'
      ],
      level2Explain: [
        'Dựa vào nguyên lý đòn bẩy, hãy chỉ ra đâu là Điểm tựa, đâu là Điểm đặt lực nâng nắp?',
        'Vì sao thùng rác lại cần phân loại riêng rác tái chế và rác sinh hoạt?'
      ],
      level3Apply: [
        'Nếu muốn chỉ cần đạp một lực thật nhẹ mà vẫn mở được nắp thì em cần dời điểm tựa về phía nào?',
        'Làm cách nào để nắp thùng rác khi đóng lại không phát ra tiếng kêu cộp cộp khó chịu?'
      ],
      level4Improve: [
        'Làm thế nào để thiết kế 2 bàn đạp riêng biệt cho 2 ngăn, muốn mở ngăn nào chỉ cần đạp ngăn đó?',
        'Em có giải pháp cơ khí nào để khi rác đầy thì có một lá cờ nhỏ tự bật lên báo hiệu cho người dọn vệ sinh không?'
      ]
    },
    difficultiesAndSupport: [
      {
        aspect: 'Cơ khí (Thanh truyền que tre bị uốn cong)',
        difficulty: 'Khi đạp chân, thanh truyền chịu lực nén bị cong vênh khiến lực không truyền được lên nắp.',
        teacherSupport: 'Hướng dẫn học sinh ghép chập 2 que xiên tre lại với nhau hoặc luồn thanh tre qua một ống hút nhỏ cố định dọc thành hộp làm ống dẫn hướng.'
      },
      {
        aspect: 'Bản lề (Nắp bị kẹt không khép kín)',
        difficulty: 'Bản lề dán bằng băng keo quá dày hoặc bị xô lệch khiến nắp không đóng khít, bốc mùi.',
        teacherSupport: 'Dùng một que tăm xỏ qua làm trục bản lề quay tự do và dán một mẩu cúc áo nhỏ/đất nặn lên mép trước nắp để làm quả nặng kéo nắp tự khép.'
      },
      {
        aspect: 'Thời gian thi công',
        difficulty: 'Cắt bìa carton dày tốn nhiều thời gian của học sinh.',
        teacherSupport: 'Chuẩn bị sẵn các phôi hộp chữ nhật cơ bản, học sinh tập trung thời gian vào thiết kế và tinh chỉnh cơ cấu đòn bẩy.'
      }
    ],
    differentiation: {
      studentsNeedingSupport: [
        'Cung cấp bản vẽ mẫu 1:1 có đánh dấu sẵn lỗ khoan trục.',
        'Học sinh làm cơ cấu nắp mở chung cho cả 2 ngăn thay vì 2 nắp độc lập phức tạp.'
      ],
      advancedStudents: [
        'Thử thách thiết kế 2 bàn đạp độc lập cho 2 ngăn riêng biệt.',
        'Thiết kế thêm cơ cấu gạt phân loại tự động: gạt sang trái là rác tái chế, gạt sang phải là rác hữu cơ.'
      ]
    },
    assessment: {
      preActivity: [
        'Kiểm tra hiểu biết ban đầu về phân loại rác và nguyên lý bập bênh/đòn bẩy.'
      ],
      duringActivity: [
        'Kỹ năng đo đạc chính xác, sự kiên nhẫn khi cân chỉnh cơ cấu cơ khí.',
        'Khả năng giải thích cơ chế truyền chuyển động của từng thành viên.'
      ],
      postActivity: [
        'Góc mở của nắp đạt >= 60 độ, đóng khít sau khi nhả bàn đạp.',
        'Độ bền đạt >= 20 lần đạp mở liên tục, nhãn phân loại chính xác, sinh động.'
      ]
    },
    rubric: {
      title: 'Rubric đánh giá Thùng rác phân loại thông minh đòn bẩy (Lớp 5)',
      criteria: [
        {
          criterion: 'Cơ cấu đòn bẩy & Độ nhạy',
          level1: 'Đạp chân nắp không mở hoặc cơ cấu bị gãy ngay lần thử đầu',
          level2: 'Nắp mở được góc nhỏ (<45 độ), phải dùng lực đạp rất mạnh',
          level3: 'Đạp êm ái, nắp mở góc tốt (60 - 75 độ), tự hạ nắp khi nhấc chân',
          level4: 'Xuất sắc: Đạp cực nhẹ, nắp mở rộng >80 độ, có ống dẫn hướng thanh truyền rất êm'
        },
        {
          criterion: 'Phân loại rác & Tính ứng dụng',
          level1: 'Không có vách ngăn hoặc nhãn dán phân loại sai kiến thức',
          level2: 'Có 2 ngăn nhưng kích thước quá hẹp, nhãn dán chưa rõ',
          level3: 'Phân loại 2 ngăn rõ ràng, có biểu tượng rác trực quan, đậy kín mùi',
          level4: 'Thiết kế ngăn thông minh, tháo lắp túi rác dễ dàng, có thông điệp bảo vệ môi trường truyền cảm hứng'
        },
        {
          criterion: 'Độ bền cơ học & Thẩm mỹ',
          level1: 'Các mối dán lỏng lẻo, xiêu vẹo, bìa bị rách nát',
          level2: 'Hình thức tạm được nhưng còn nhiều vết keo lem nhem',
          level3: 'Khung hộp vuông vắn, mối dán chắc chắn, màu sắc hài hòa',
          level4: 'Tinh xảo như sản phẩm công nghiệp, màu sắc chuẩn quy định môi trường, cực kỳ chắc chắn'
        },
        {
          criterion: 'Giải thích nguyên lý khoa học',
          level1: 'Không giải thích được cơ chế hoạt động của sản phẩm',
          level2: 'Chỉ nói được "đạp ở dưới thì cái que đẩy nắp lên"',
          level3: 'Chỉ rõ được Điểm tựa, Cánh tay đòn và sự đổi hướng lực',
          level4: 'Thuyết trình khoa học xuất sắc, phân tích sâu về tỉ lệ đòn bẩy và đề xuất hướng tự động hóa'
        }
      ]
    },
    worksheet: {
      title: 'HỒ SƠ THIẾT KẾ: THÙNG RÁC PHÂN LOẠI THÔNG MINH ĐÒN BẨY',
      subtitle: 'Dự án STEM Kỹ sư Xanh - Lớp 5',
      grade: 5,
      studentInfoFields: ['Nhóm sáng chế: ............................................', 'Lớp: 5......', 'Trường Tiểu học: ................................................................'],
      safetyReminder: 'Không dùng tay sờ vào súng bắn keo nóng. Cắt xiên tre cẩn thận tránh bắn vào mắt!',
      sections: [
        {
          title: '1. Thử tài phân loại rác tại nguồn',
          instructions: 'Nối các loại rác sau vào đúng ngăn thùng rác của nhóm em:',
          type: 'checkbox',
          items: [
            '[Vỏ chai nước ngọt / Vỏ hộp sữa giấy]  ----->  [ Ngăn Rác Tái Chế ]',
            '[Vỏ chuối / Cơm thừa / Lá cây]  ----->  [ Ngăn Rác Hữu Cơ ]',
            '[Túi nilon sạch / Bìa carton phế liệu]  ----->  [ Ngăn Rác Tái Chế ]',
            '[Khăn giấy ăn đã qua sử dụng bẩn]  ----->  [ Ngăn Rác Sinh Hoạt Khác ]'
          ]
        },
        {
          title: '2. Sơ đồ phân tích nguyên lý đòn bẩy',
          instructions: 'Vẽ sơ đồ đòn bẩy của bàn đạp và chú thích 3 điểm quan trọng (Điểm tựa O, Điểm đặt lực chân F1, Điểm gắn thanh đẩy F2):',
          type: 'drawing',
          placeholder: '[Khung vẽ sơ đồ đòn bẩy và góc mở nắp thùng]'
        },
        {
          title: '3. Bảng đo đạc thông số kỹ thuật',
          instructions: 'Ghi lại các thông số kích thước thực tế sau khi nhóm chế tạo:',
          type: 'measurement',
          items: [
            'Chiều cao thùng rác: ................. cm',
            'Chiều dài bàn đạp: ................. cm (Khoảng cách từ điểm tựa đến chỗ đạp: ....... cm)',
            'Góc mở của nắp khi đạp hết cỡ: ................. độ (Dùng thước đo góc)',
            'Số lần đạp thử nghiệm thành công liên tiếp: ................. lần'
          ]
        },
        {
          title: '4. Đề xuất cải tiến cho phiên bản 2.0',
          instructions: 'Nếu được gắn thêm pin và cảm biến, nhóm em sẽ nâng cấp tính năng gì?',
          type: 'short_answer',
          placeholder: 'Tính năng nâng cấp thông minh: ..........................................................................................'
        }
      ]
    }
  }
];
