'use strict';

/* Generates a printable 50-question worksheet from the current selection.
   The browser print dialog can save the worksheet as a PDF. */

const PDF_EXPORT_QUESTION_COUNT = 50;

function pdfSafeFilenamePart(value) {
  return String(value || '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60) || 'Mixed';
}

function pdfFormattedDate(date = new Date()) {
  return date.toLocaleDateString('en-NZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function generateUniqueExportQuestions(count) {
  const savedRecentKeys = [...state.recentQuestionKeys];
  const savedCurrent = state.current;
  const questions = [];
  const seen = new Set();
  const maximumAttempts = count * 250;

  clearRecentQuestions();

  try {
    for (let attempt = 0; attempt < maximumAttempts && questions.length < count; attempt++) {
      const question = generateQuestion({ avoidRecent: false });
      const issues = generatedQuestionIssues(question);

      if (issues.length > 0) continue;

      const key = questionIdentityKey(question);
      if (seen.has(key)) continue;

      seen.add(key);
      questions.push(question);
    }
  } finally {
    state.recentQuestionKeys = savedRecentKeys;
    state.current = savedCurrent;
  }

  if (questions.length !== count) {
    throw new Error(
      `Only ${questions.length} unique valid questions could be generated. Try selecting more skills or using Automatic Mix.`
    );
  }

  return questions;
}

function exportQuestionHtml(question, index) {
  const structure = question.structureLabel
    || PROBLEM_STRUCTURE_LABELS[question.structure]
    || '';
  const skill = currentLabels()[question.skill] || question.skill;

  return `
    <article class="question-card">
      <div class="question-heading">
        <span class="question-number">${index + 1}</span>
        <span class="question-tags">${escapeHtml(skill)}${structure ? ` · ${escapeHtml(structure)}` : ''}</span>
      </div>
      <div class="question-text">${formatMathHtml(question.text)}</div>
      <div class="working-space"></div>
      <div class="answer-line">Answer: ____________________________________</div>
    </article>
  `;
}

function exportAnswerHtml(question, index) {
  const skill = currentLabels()[question.skill] || question.skill;

  return `
    <div class="answer-item">
      <b>${index + 1}.</b>
      <span>${escapeHtml(displayCorrect(question))}</span>
      <small>${escapeHtml(skill)}</small>
    </div>
  `;
}

function buildExportDocument(questions) {
  const config = currentConfig();
  const activeSkills = getActiveSkills();
  const levelText = levelSelect.options[levelSelect.selectedIndex]
    ? levelSelect.options[levelSelect.selectedIndex].textContent
    : state.level;
  const skillsText = activeSkills.length === config.skills.length
    ? config.mixed
    : activeSkills.map(skill => config.labels[skill] || skill).join(', ');
  const student = normaliseStudentName(STUDENT_NAME) || 'Student';
  const today = pdfFormattedDate();
  const title = `DYAA Problem Solving — ${currentProblemLevelName()}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>DYAA_${pdfSafeFilenamePart(currentProblemLevelName())}_${pdfSafeFilenamePart(levelText)}_50_Questions</title>
<style>
  @page{size:A4;margin:10mm}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;color:#142033;background:#eef2f7;font-family:Arial,Helvetica,sans-serif}
  body{padding:18px}
  .toolbar{position:sticky;top:0;z-index:5;display:flex;justify-content:center;gap:10px;margin:0 auto 14px;padding:10px;border-radius:12px;background:#173b64}
  .toolbar button{border:0;border-radius:999px;padding:10px 17px;color:#173b64;background:#ff9f1c;font-weight:900;cursor:pointer}
  .toolbar .close{color:#fff;background:#64748b}
  .sheet{width:min(900px,100%);margin:0 auto;background:#fff;box-shadow:0 8px 24px rgba(23,59,100,.16)}
  .cover{padding:15mm 12mm 8mm;border-bottom:3px solid #173b64}
  .brand{color:#173b64;font-size:24px;font-weight:900;letter-spacing:1px}
  h1{margin:6px 0 5px;color:#173b64;font-size:22px}
  .subtitle{color:#52606d;font-size:12px;font-weight:700;line-height:1.45}
  .student-row{display:grid;grid-template-columns:1fr .6fr;gap:18px;margin-top:14px;font-size:13px;font-weight:800}
  .line{display:inline-block;min-width:190px;border-bottom:1px solid #475569;padding:0 5px 3px}
  .questions{padding:8mm 10mm 10mm;column-count:2;column-gap:8mm}
  .question-card{break-inside:avoid;margin:0 0 7mm;padding:4mm;border:1px solid #b8c5d3;border-radius:8px;background:#fff}
  .question-heading{display:flex;align-items:center;gap:7px;margin-bottom:6px}
  .question-number{display:grid;place-items:center;min-width:24px;height:24px;border-radius:50%;color:#fff;background:#173b64;font-size:12px;font-weight:900}
  .question-tags{color:#64748b;font-size:8.5px;font-weight:800;text-transform:uppercase}
  .question-text{font-size:10.5px;font-weight:700;line-height:1.45}
  .question-text sup{font-size:.65em;line-height:0;vertical-align:super}
  .working-space{height:15mm;margin-top:5px;border-radius:5px;background:repeating-linear-gradient(to bottom,transparent 0,transparent 5mm,#dbe3ec 5mm,#dbe3ec 5.2mm)}
  .answer-line{margin-top:5px;color:#475569;font-size:9px;font-weight:800}
  .answers-page{break-before:page;padding:12mm}
  .answers-page h2{margin:0 0 4px;color:#173b64;font-size:22px}
  .answers-note{margin-bottom:12px;color:#64748b;font-size:11px}
  .answer-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 14px}
  .answer-item{display:grid;grid-template-columns:32px 1fr auto;align-items:baseline;gap:6px;padding:6px 8px;border-bottom:1px solid #d7dee7;font-size:11px}
  .answer-item span{font-weight:900}.answer-item small{color:#64748b;font-size:8px;text-align:right}
  .footer{display:flex;justify-content:space-between;padding:5mm 12mm 8mm;color:#64748b;font-size:9px}
  @media print{
    html,body{background:#fff}
    body{padding:0}
    .toolbar{display:none!important}
    .sheet{width:100%;box-shadow:none}
    .cover{padding-top:5mm}
  }
  @media(max-width:700px){.questions{column-count:1}.student-row{grid-template-columns:1fr}.answer-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
  <div class="toolbar">
    <button type="button" onclick="window.print()">Print / Save as PDF</button>
    <button class="close" type="button" onclick="window.close()">Close</button>
  </div>
  <main class="sheet">
    <header class="cover">
      <div class="brand">DYAA</div>
      <h1>${escapeHtml(title)} — 50 Questions</h1>
      <div class="subtitle">
        <b>Selected problem types:</b> ${escapeHtml(skillsText)}<br>
        <b>Question structure:</b> ${escapeHtml(levelText)}
      </div>
      <div class="student-row">
        <div>Name: <span class="line">${escapeHtml(student)}</span></div>
        <div>Date: <span class="line">${escapeHtml(today)}</span></div>
      </div>
    </header>
    <section class="questions">
      ${questions.map(exportQuestionHtml).join('')}
    </section>
    <section class="answers-page">
      <h2>Answer Key</h2>
      <div class="answers-note">Answers correspond to the 50 questions in this worksheet.</div>
      <div class="answer-grid">
        ${questions.map(exportAnswerHtml).join('')}
      </div>
    </section>
    <footer class="footer">
      <span>DYAA Education</span>
      <span>Together We Learn, Together We Grow 🚀</span>
    </footer>
  </main>
<script>
  window.addEventListener('load', () => {
    setTimeout(() => window.print(), 350);
  });
<\/script>
</body>
</html>`;
}

function exportSelectedQuestionsToPdf() {
  if (state.running) return;

  syncSelectedSkillsFromUI();
  state.level = levelSelect.value;

  if (getActiveSkills().length === 0) {
    alert('Select at least one problem type before exporting.');
    return;
  }

  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    alert('The PDF window was blocked. Allow pop-ups for this page, then try again.');
    return;
  }

  const originalText = exportQuestionsBtn.textContent;
  exportQuestionsBtn.disabled = true;
  exportQuestionsBtn.textContent = 'Generating 50 Questions…';

  try {
    const questions = generateUniqueExportQuestions(PDF_EXPORT_QUESTION_COUNT);
    const documentHtml = buildExportDocument(questions);

    printWindow.document.open();
    printWindow.document.write(documentHtml);
    printWindow.document.close();
  } catch (error) {
    printWindow.close();
    alert(error.message || 'Unable to generate the 50-question PDF.');
  } finally {
    exportQuestionsBtn.disabled = false;
    exportQuestionsBtn.textContent = originalText;
  }
}
