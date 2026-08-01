'use strict';

/* Question-bank routing, selection, duplicate control and 100-question testing.
   Split from DYAAPS.html without changing the original logic. */

const PROBLEM_BANKS = {
  arithmetic: psGenArithmetic,
  comparison: psGenComparison,
  fractions: psGenFractions,
  decimalsMoney: psGenDecimalsMoney,
  percentages: psGenPercentages,
  ratio: psGenRatio,
  proportion: psGenProportion,
  speedDistanceTime: psGenSpeedDistanceTime,
  workRate: psGenWorkRate,
  age: psGenAge,
  numberProblems: psGenNumberProblems,
  equations: psGenEquations,
  complexLinearEquations: psGenComplexLinearEquations,
  geometryMeasurement: psGenGeometryMeasurement,
  angleReasoning: psGenAngleReasoning,
  pythagorasTrig: psGenPythagorasTrig,
  coordinatesLines: psGenCoordinatesLines,
  sequences: psGenSequences,
  statistics: psGenStatistics,
  probability: psGenProbability,
  logicConstraints: psGenLogicConstraints,
  optimisation: psGenOptimisation,
  modelling: psGenModelling
};


const YEAR_BANKS = {
  7: Object.fromEntries(YEAR_CONFIGS[7].skills.map(skill => [skill, PROBLEM_BANKS[skill]])),
  8: Object.fromEntries(YEAR_CONFIGS[8].skills.map(skill => [skill, PROBLEM_BANKS[skill]])),
  9: Object.fromEntries(YEAR_CONFIGS[9].skills.map(skill => [skill, PROBLEM_BANKS[skill]]))
};


function currentConfig() {
  return YEAR_CONFIGS[state.year];
}

function currentLabels() {
  return currentConfig().labels;
}

function normaliseQuestion(raw, fallbackSkill) {
  const skill = raw.skill || raw.operation || fallbackSkill;
  const answerType = raw.answerType || 'number';
  const answer = answerType === 'number'
    ? roundTo(Number(raw.answer))
    : String(raw.answer);

  return {
    ...raw,
    skill,
    text: cleanDisplayNumbers(raw.text),
    answer,
    displayAnswer: raw.displayAnswer != null
      ? cleanDisplayNumbers(raw.displayAnswer)
      : answerType === 'number'
        ? fmt(answer)
        : String(answer),
    answerType,
    hint: cleanDisplayNumbers(raw.hint || '')
  };
}

function questionIdentityKey(question) {
  return `${state.year}|${question.skill}|${question.text}|${question.answerType}|${question.answer}`;
}

function generatedQuestionIssues(question) {
  const issues = [];

  if (!question || typeof question !== 'object') {
    return ['Question generator did not return an object.'];
  }

  if (typeof question.text !== 'string' || !question.text.trim()) {
    issues.push('Question text is empty.');
  }

  if (/NaN|undefined|Infinity/.test(String(question.text))) {
    issues.push('Question text contains an invalid value.');
  }

  if (!question.skill || !currentConfig().skills.includes(question.skill)) {
    issues.push(`Unknown skill: ${question.skill || 'missing'}.`);
  }

  if (question.answerType === 'ratio') {
    const match = String(question.answer).match(/^(-?\d+):(-?\d+)$/);

    if (!match || Number(match[2]) === 0) {
      issues.push('Ratio answer is invalid.');
    }
  } else if (!Number.isFinite(Number(question.answer))) {
    issues.push('Numeric answer is not finite.');
  }

  const shownAnswer = displayCorrect(question);

  if (!shownAnswer || /NaN|undefined|Infinity/.test(shownAnswer)) {
    issues.push('Displayed answer is invalid.');
  }

  return issues;
}

function clearRecentQuestions() {
  state.recentQuestionKeys = [];
}

function rememberRecentQuestion(question) {
  const key = questionIdentityKey(question);
  state.recentQuestionKeys.push(key);

  if (state.recentQuestionKeys.length > state.recentQuestionLimit) {
    state.recentQuestionKeys.splice(
      0,
      state.recentQuestionKeys.length - state.recentQuestionLimit
    );
  }
}

function getActiveSkills() {
  const config = currentConfig();
  const valid = state.selectedSkills.filter(skill => config.skills.includes(skill));
  return valid.length > 0 ? valid : [];
}

function updateSelectionMode() {
  const config = currentConfig();
  const activeSkills = getActiveSkills();

  state.mode = activeSkills.length === config.skills.length
    ? 'mixed'
    : activeSkills.length === 1
      ? activeSkills[0]
      : 'custom';
}

function selectedSkillsDescription(maxNames = 3) {
  const config = currentConfig();
  const activeSkills = getActiveSkills();

  if (activeSkills.length === 0) {
    return 'Select at least one skill';
  }

  if (activeSkills.length === config.skills.length) {
    return `All ${config.skills.length} skills selected`;
  }

  if (activeSkills.length <= maxNames) {
    return activeSkills
      .map(skill => config.labels[skill] || skill)
      .join(', ');
  }

  return `${activeSkills.length} skills selected`;
}

function syncSelectedSkillsFromUI() {
  state.selectedSkills = [...skillCheckboxes.querySelectorAll('input[type="checkbox"]:checked')]
    .map(input => input.value)
    .filter(skill => currentConfig().skills.includes(skill));

  updateSelectionMode();
  updateSkillSelectionUI();
}

function updateSkillSelectionUI() {
  const config = currentConfig();
  const activeSkills = getActiveSkills();
  const hasSelection = activeSkills.length > 0;

  skillPickerSummary.textContent = selectedSkillsDescription();
  skillPicker.classList.toggle('invalid', !hasSelection);
  skillSelectionHelp.classList.toggle('error', !hasSelection);
  skillSelectionHelp.textContent = hasSelection
    ? `Selected ${activeSkills.length} of ${config.skills.length}. Questions will be mixed only from these skills.`
    : 'Select at least one skill before starting or testing.';

  if (!state.running) {
    startBtn.disabled = !hasSelection;
    testQuestionsBtn.disabled = !hasSelection;
  }
}

function setSelectedSkills(skills) {
  const config = currentConfig();
  const validSkills = skills.filter(skill => config.skills.includes(skill));
  state.selectedSkills = [...new Set(validSkills)];

  skillCheckboxes.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.checked = state.selectedSkills.includes(input.value);
  });

  updateSelectionMode();
  clearRecentQuestions();
  testPanel.classList.remove('show');
  updateSkillSelectionUI();
}

function generateQuestion(options = {}) {
  const config = currentConfig();
  const avoidRecent = options.avoidRecent !== false;
  let validFallback = null;

  for (let attempt = 0; attempt < 80; attempt++) {
    const activeSkills = getActiveSkills();

    if (activeSkills.length === 0) {
      throw new Error('Select at least one skill before generating questions.');
    }

    const skill = pick(activeSkills);
    const generator = YEAR_BANKS[state.year][skill];

    if (!generator) {
      throw new Error(`No problem generator for ${currentProblemLevelName()}: ${skill}`);
    }

    const question = normaliseQuestion(generator(), skill);
    const issues = generatedQuestionIssues(question);

    if (issues.length > 0) {
      continue;
    }

    validFallback = question;

    if (
      !avoidRecent
      || !state.recentQuestionKeys.includes(questionIdentityKey(question))
    ) {
      return question;
    }
  }

  if (validFallback) {
    return validFallback;
  }

  throw new Error(`Unable to generate a valid ${currentProblemLevelName()} question.`);
}

function questionKey(question) {
  return questionIdentityKey(question);
}

function runQuestionTest() {
  if (state.running) return;

  syncSelectedSkillsFromUI();
  state.level = levelSelect.value;

  if (getActiveSkills().length === 0) {
    testPanel.classList.add('show');
    testMessage.className = 'test-message fail';
    testMessage.textContent = 'Select at least one skill before running the 100-question check.';
    return;
  }

  const savedRecentKeys = [...state.recentQuestionKeys];
  const savedCurrent = state.current;
  const seen = new Set();
  const skillCounts = {};
  const issues = [];
  let validCount = 0;
  let recentRepeatCount = 0;

  testQuestionsBtn.disabled = true;
  testQuestionsBtn.textContent = 'Testing 100 Questions…';
  testPanel.classList.add('show');
  testMessage.className = 'test-message';
  testMessage.textContent = 'Generating and checking 100 questions…';
  testBreakdown.innerHTML = '';
  testIssues.innerHTML = '';

  clearRecentQuestions();

  for (let index = 1; index <= 100; index++) {
    try {
      const question = generateQuestion();
      const key = questionIdentityKey(question);
      const questionIssues = generatedQuestionIssues(question);

      if (state.recentQuestionKeys.includes(key)) {
        recentRepeatCount++;
        questionIssues.push(
          `Repeated within the last ${state.recentQuestionLimit} questions.`
        );
      }

      if (questionIssues.length === 0) {
        validCount++;
      } else {
        questionIssues.forEach(issue => {
          issues.push(`Question ${index}: ${issue}`);
        });
      }

      seen.add(key);
      skillCounts[question.skill] = (skillCounts[question.skill] || 0) + 1;
      rememberRecentQuestion(question);
    } catch (error) {
      issues.push(`Question ${index}: ${error.message || String(error)}`);
    }
  }

  state.recentQuestionKeys = savedRecentKeys;
  state.current = savedCurrent;

  const labels = currentLabels();
  const activeSkills = getActiveSkills();
  const selectedSkill = activeSkills.length === currentConfig().skills.length
    ? currentConfig().mixed
    : activeSkills.length === 1
      ? labels[activeSkills[0]] || activeSkills[0]
      : `${activeSkills.length} selected skills`;
  const selectedLevel = levelSelect.options[levelSelect.selectedIndex]
    ? levelSelect.options[levelSelect.selectedIndex].textContent
    : state.level;

  testScope.textContent =
    `${currentProblemLevelName()} · ${selectedSkill} · ${selectedLevel}`;
  testValidValue.textContent = `${validCount}/100`;
  testUniqueValue.textContent = `${seen.size}/100`;
  testRepeatValue.textContent = String(recentRepeatCount);
  testIssueValue.textContent = String(issues.length);

  const passed = validCount === 100
    && recentRepeatCount === 0
    && issues.length === 0;

  testMessage.className = `test-message ${passed ? 'pass' : 'fail'}`;
  testMessage.textContent = passed
    ? `Check passed. All 100 questions were valid, and none repeated within the most recent ${state.recentQuestionLimit} questions.`
    : 'The check found one or more issues. Review the details below.';

  testBreakdown.innerHTML = Object.entries(skillCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([skill, count]) => (
      `<span class="test-chip">${escapeHtml(labels[skill] || skill)}: ${count}</span>`
    ))
    .join('');

  testIssues.innerHTML = issues
    .slice(0, 12)
    .map(issue => `<li>${escapeHtml(issue)}</li>`)
    .join('');

  if (issues.length > 12) {
    testIssues.innerHTML +=
      `<li>…and ${issues.length - 12} more issue(s).</li>`;
  }

  testQuestionsBtn.disabled = false;
  testQuestionsBtn.textContent = 'Test 100 Questions';
  testPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
