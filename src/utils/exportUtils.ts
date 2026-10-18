import { StemLessonPlan, WorksheetData, RubricData } from '../types/stem';

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  });
}

export function exportPlanToWord(plan: StemLessonPlan) {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${plan.title}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000; margin: 20mm; }
        h1 { font-size: 18pt; text-align: center; color: #1e3a8a; text-transform: uppercase; margin-bottom: 5px; }
        h2 { font-size: 15pt; color: #047857; border-bottom: 2px solid #047857; padding-bottom: 3px; margin-top: 20px; }
        h3 { font-size: 13pt; color: #1e40af; margin-top: 15px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid #333; padding: 8px; text-align: left; vertical-align: top; }
        th { background-color: #f3f4f6; font-weight: bold; }
        .safety-box { background-color: #fffbeb; border: 2px dashed #d97706; padding: 10px; margin: 15px 0; }
        .summary-box { background-color: #f0fdf4; border: 1px solid #16a34a; padding: 10px; margin-bottom: 20px; }
        .meta-header { text-align: center; font-style: italic; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="meta-header">
        <p><strong>TRƯỜNG TIỂU HỌC: ..............................................................</strong></p>
        <p>TỔ CHUYÊN MÔN: .................................................................</p>
      </div>

      <h1>KẾ HOẠCH BÀI DẠY STEM</h1>
      <p style="text-align: center; font-size: 15pt; font-weight: bold; color: #b45309;">CHỦ ĐỀ: ${plan.title.toUpperCase()}</p>
      <p style="text-align: center;"><em>(Thời lượng: ${plan.overviewSummary.duration} - Lớp ${plan.overviewSummary.grade})</em></p>

      <div class="summary-box">
        <p><strong>📋 TÓM TẮT KẾ HOẠCH:</strong></p>
        <ul>
          <li><strong>Khối lớp:</strong> Lớp ${plan.overviewSummary.grade}</li>
          <li><strong>Chủ đề STEM:</strong> ${plan.overviewSummary.stemTopic}</li>
          <li><strong>Thời lượng:</strong> ${plan.overviewSummary.duration}</li>
          <li><strong>Sản phẩm STEM:</strong> ${plan.overviewSummary.product}</li>
          <li><strong>Vật liệu chính:</strong> ${plan.overviewSummary.materials}</li>
          <li><strong>Mức độ yêu cầu:</strong> ${plan.overviewSummary.difficultyLevel}</li>
        </ul>
      </div>

      <h2>I. THÔNG TIN CHUNG</h2>
      <p><strong>Môn học chính:</strong> ${plan.generalInfo.subject}</p>
      <p><strong>Các môn học tích hợp:</strong> ${plan.generalInfo.integratedSubjects.join(', ')}</p>
      <p><strong>Thời lượng:</strong> ${plan.generalInfo.periods} tiết</p>
      <p><strong>Đối tượng học sinh:</strong> ${plan.generalInfo.targetAudience}</p>

      <h2>II. BỐI CẢNH THỰC TIỄN</h2>
      <p><strong>Tình huống:</strong> ${plan.realContext.scenario}</p>
      <p><strong>Vấn đề cần giải quyết:</strong> ${plan.realContext.problemStatement}</p>
      <p><strong>Câu hỏi định hướng:</strong> ${plan.realContext.drivingQuestion}</p>

      <h2>III. MỤC TIÊU BÀI DẠY</h2>
      <h3>1. Kiến thức</h3>
      <ul>
        ${plan.objectives.knowledge.map(k => `<li>${k}</li>`).join('')}
      </ul>
      <h3>2. Năng lực</h3>
      <p><strong>- Năng lực STEM & giải quyết vấn đề:</strong></p>
      <ul>
        ${plan.objectives.competencies.stemCompetencies.map(c => `<li>${c}</li>`).join('')}
      </ul>
      <p><strong>- Năng lực chung (Tự chủ, Giao tiếp & Hợp tác):</strong></p>
      <ul>
        ${plan.objectives.competencies.generalCompetencies.map(c => `<li>${c}</li>`).join('')}
      </ul>
      <h3>3. Phẩm chất</h3>
      <ul>
        ${plan.objectives.qualities.map(q => `<li>${q}</li>`).join('')}
      </ul>

      <h2>IV. KIẾN THỨC STEM TÍCH HỢP</h2>
      <table>
        <tr>
          <th style="width: 20%;">Thành tố STEM</th>
          <th>Nội dung kiến thức tích hợp</th>
        </tr>
        <tr>
          <td><strong>S (Khoa học - Science)</strong></td>
          <td>${plan.stemKnowledge.science}</td>
        </tr>
        <tr>
          <td><strong>T (Công nghệ - Technology)</strong></td>
          <td>${plan.stemKnowledge.technology}</td>
        </tr>
        <tr>
          <td><strong>E (Kỹ thuật - Engineering)</strong></td>
          <td>${plan.stemKnowledge.engineering}</td>
        </tr>
        <tr>
          <td><strong>M (Toán học - Mathematics)</strong></td>
          <td>${plan.stemKnowledge.mathematics}</td>
        </tr>
      </table>

      <h2>V. SẢN PHẨM STEM VÀ TIÊU CHÍ ĐÁNH GIÁ</h2>
      <p><strong>Tên sản phẩm:</strong> ${plan.stemProduct.name}</p>
      <p><strong>Mục đích sử dụng:</strong> ${plan.stemProduct.purpose}</p>
      <p><strong>Quy cách sản phẩm:</strong></p>
      <ul>
        ${plan.stemProduct.specifications.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <p><strong>Giới hạn thiết kế:</strong></p>
      <ul>
        ${plan.stemProduct.designConstraints.map(d => `<li>${d}</li>`).join('')}
      </ul>
      <p><strong>Tiêu chí thành công:</strong></p>
      <ul>
        ${plan.stemProduct.successCriteria.map(sc => `<li><strong>${sc}</strong></li>`).join('')}
      </ul>

      <h2>VI. THIẾT BỊ VÀ VẬT LIỆU DẠY HỌC</h2>
      <p><strong>1. Giáo viên chuẩn bị:</strong></p>
      <ul>
        ${plan.preparation.teacher.map(t => `<li>${t}</li>`).join('')}
      </ul>
      <p><strong>2. Học sinh chuẩn bị (theo nhóm):</strong></p>
      <ul>
        ${plan.preparation.student.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <div class="safety-box">
        <strong>⚠️ LƯU Ý AN TOÀN TRONG TIẾT HỌC:</strong>
        <ul>
          ${plan.preparation.safetyNotes.map(n => `<li>${n}</li>`).join('')}
        </ul>
      </div>

      <h2>VII. TIẾN TRÌNH DẠY HỌC CHI TIẾT</h2>
      ${plan.activities.map(act => `
        <div style="margin-bottom: 25px;">
          <h3>${act.name}</h3>
          <p><strong>Mục tiêu:</strong> ${act.objective}</p>
          <p><strong>Nội dung:</strong> ${act.content}</p>
          <p><strong>Thời gian dự kiến:</strong> ${act.time}</p>
          <table>
            <tr>
              <th style="width: 50%;">Hoạt động của Giáo viên</th>
              <th style="width: 50%;">Hoạt động của Học sinh</th>
            </tr>
            <tr>
              <td>
                <ul>
                  ${act.teacherActivity.map(ta => `<li>${ta}</li>`).join('')}
                </ul>
                <p><strong>Câu hỏi gợi mở:</strong></p>
                <ul>
                  ${act.guidingQuestions.map(gq => `<li><em>"${gq}"</em></li>`).join('')}
                </ul>
              </td>
              <td>
                <ul>
                  ${act.studentActivity.map(sa => `<li>${sa}</li>`).join('')}
                </ul>
                <p><strong>Sản phẩm mong đợi:</strong></p>
                <p style="color: #047857;"><strong>${act.expectedProduct}</strong></p>
              </td>
            </tr>
          </table>
        </div>
      `).join('')}

      <h2>VIII. HỆ THỐNG CÂU HỎI GỢI MỞ THEO 4 MỨC ĐỘ</h2>
      <p><strong>Mức 1 - Quan sát ("Em nhìn thấy gì?"):</strong></p>
      <ul>
        ${plan.guidingQuestionsByLevel.level1Observe.map(q => `<li>${q}</li>`).join('')}
      </ul>
      <p><strong>Mức 2 - Giải thích ("Vì sao em nghĩ như vậy?"):</strong></p>
      <ul>
        ${plan.guidingQuestionsByLevel.level2Explain.map(q => `<li>${q}</li>`).join('')}
      </ul>
      <p><strong>Mức 3 - Vận dụng ("Nếu thay đổi vật liệu thì...?"):</strong></p>
      <ul>
        ${plan.guidingQuestionsByLevel.level3Apply.map(q => `<li>${q}</li>`).join('')}
      </ul>
      <p><strong>Mức 4 - Cải tiến ("Em sẽ thay đổi điều gì để tốt hơn?"):</strong></p>
      <ul>
        ${plan.guidingQuestionsByLevel.level4Improve.map(q => `<li>${q}</li>`).join('')}
      </ul>

      <h2>IX. DỰ KIẾN KHÓ KHĂN VÀ PHƯƠNG ÁN HỖ TRỢ</h2>
      <table>
        <tr>
          <th style="width: 25%;">Khía cạnh</th>
          <th style="width: 35%;">Khó khăn dự kiến của học sinh</th>
          <th style="width: 40%;">Gợi ý hỗ trợ của Giáo viên</th>
        </tr>
        ${plan.difficultiesAndSupport.map(d => `
          <tr>
            <td><strong>${d.aspect}</strong></td>
            <td>${d.difficulty}</td>
            <td>${d.teacherSupport}</td>
          </tr>
        `).join('')}
      </table>

      <h2>X. PHÂN HÓA ĐỐI TƯỢNG HỌC SINH</h2>
      <p><strong>1. Đối với học sinh cần hỗ trợ:</strong></p>
      <ul>
        ${plan.differentiation.studentsNeedingSupport.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <p><strong>2. Đối với học sinh hoàn thành tốt (Mở rộng/Sáng tạo):</strong></p>
      <ul>
        ${plan.differentiation.advancedStudents.map(a => `<li>${a}</li>`).join('')}
      </ul>

      <h2>XI. ĐÁNH GIÁ VÀ BẢNG TIÊU CHÍ RUBRIC</h2>
      <h3>Bảng Rubric đánh giá kết quả sản phẩm và quá trình:</h3>
      <table>
        <tr>
          <th>Tiêu chí</th>
          <th>Mức 1 (Cần cố gắng)</th>
          <th>Mức 2 (Đạt)</th>
          <th>Mức 3 (Khá)</th>
          <th>Mức 4 (Tốt / Xuất sắc)</th>
        </tr>
        ${plan.rubric.criteria.map(c => `
          <tr>
            <td><strong>${c.criterion}</strong></td>
            <td>${c.level1}</td>
            <td>${c.level2}</td>
            <td>${c.level3}</td>
            <td>${c.level4}</td>
          </tr>
        `).join('')}
      </table>

      <div style="margin-top: 40px; display: flex; justify-content: space-between;">
        <div style="float: left; width: 45%; text-align: center;">
          <p><strong>DUYỆT CỦA BẢN GIÁM HIỆU / TỔ TRƯỞNG</strong></p>
          <br><br><br>
          <p>................................................................</p>
        </div>
        <div style="float: right; width: 45%; text-align: center;">
          <p><em>Ngày ..... tháng ..... năm 202...</em></p>
          <p><strong>GIÁO VIÊN SOẠN BÀI</strong></p>
          <br><br><br>
          <p>................................................................</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `KHBD_STEM_${plan.title.replace(/[\s/\\?%*:|"<>]/g, '_')}_Lop${plan.overviewSummary.grade}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportWorksheetToWord(ws: WorksheetData) {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${ws.title}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5; color: #000; margin: 15mm; }
        h1 { font-size: 16pt; text-align: center; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px; }
        h2 { font-size: 13pt; text-align: center; font-style: italic; color: #4b5563; margin-top: 0; }
        .info-row { display: flex; justify-content: space-between; border-bottom: 1px dotted #333; padding-bottom: 5px; margin-bottom: 15px; }
        .section-box { border: 1px solid #16a34a; border-radius: 5px; padding: 12px; margin-bottom: 15px; }
        .section-title { font-size: 13pt; font-weight: bold; color: #15803d; margin-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #333; padding: 6px; }
        th { background-color: #f3f4f6; }
        .draw-box { height: 160px; border: 2px dashed #9ca3af; text-align: center; line-height: 160px; color: #9ca3af; }
        .safety { background-color: #fffbeb; border: 1px solid #f59e0b; padding: 8px; font-weight: bold; color: #b45309; text-align: center; margin-bottom: 15px; }
      </style>
    </head>
    <body>
      <h1>${ws.title}</h1>
      <h2>${ws.subtitle}</h2>

      <div class="safety">
        ⚠️ LƯU Ý: ${ws.safetyReminder}
      </div>

      <div class="info-row">
        ${ws.studentInfoFields.map(f => `<span><strong>${f}</strong></span>`).join(' &nbsp;&nbsp;&nbsp;&nbsp; ')}
      </div>

      ${ws.sections.map((s, idx) => `
        <div class="section-box">
          <div class="section-title">${idx + 1}. ${s.title}</div>
          <p><em>${s.instructions}</em></p>
          ${s.type === 'drawing' ? `<div class="draw-box">${s.placeholder || '[Vẽ bản thiết kế vào khung này]'}</div>` : ''}
          ${s.type === 'checkbox' && s.items ? `
            <ul>
              ${s.items.map(it => `<li>[ &nbsp; ] ${it}</li>`).join('')}
            </ul>
          ` : ''}
          ${s.type === 'table' && s.columns ? `
            <table>
              <tr>
                ${s.columns.map(c => `<th>${c}</th>`).join('')}
              </tr>
              ${(s.rows || []).map(r => `
                <tr>
                  ${r.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </table>
          ` : ''}
          ${s.type === 'short_answer' ? `
            <p style="border-bottom: 1px dotted #333; height: 35px;"></p>
            <p style="border-bottom: 1px dotted #333; height: 35px;"></p>
          ` : ''}
          ${s.type === 'measurement' && s.items ? `
            <ul>
              ${s.items.map(m => `<li>${m}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Phieu_Hoc_Tap_${ws.title.replace(/[\s/\\?%*:|"<>]/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
