'use strict';

/* Year UI, missions, status, question display and answer submission.
   Split from DYAAPS.html without changing the original logic. */

function updateYearUI(resetMode = true) {
  const config = currentConfig();

  gameTitle.textContent = config.title;
  document.title = `DYAA ${config.title}`;
  skillLabel.textContent = config.skillLabel;
  teacherNote.innerHTML = `<b>${config.levelName} problem-solving practice:</b> ${config.teacher}`;

  const previousSkills = state.selectedSkills.filter(skill => config.skills.includes(skill));
  state.selectedSkills = resetMode || previousSkills.length === 0
    ? [...config.skills]
    : previousSkills;

  skillCheckboxes.innerHTML = '';

  config.skills.forEach(skill => {
    const label = document.createElement('label');
    label.className = 'skill-option';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = skill;
    input.checked = state.selectedSkills.includes(skill);

    const labelText = document.createElement('span');
    labelText.textContent = config.labels[skill];

    label.appendChild(input);
    label.appendChild(labelText);
    skillCheckboxes.appendChild(label);
  });

  updateSelectionMode();
  updateSkillSelectionUI();
  skillPicker.open = false;

  levelSelect.innerHTML = '';

  config.levels.forEach(([value, label]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    levelSelect.appendChild(option);
  });

  if (!['auto', 'basic', 'multi', 'nonroutine'].includes(state.level)) {
    state.level = 'auto';
  }

  levelSelect.value = state.level;
  summaryTitle.textContent = `${config.levelName} Practice Complete!`;
  questionText.textContent = `Press “Start 15-Minute ${config.levelName} Practice”`;

  const robotOption = heroSelect.querySelector('option[value="robot"]');
  if (robotOption) {
    robotOption.textContent = '🤖 Problem-Solving Robot';
  }

  updateStartButton();
  updateHero();
  updateMistakeCounts();
}

function createMission() {
  const correctTarget = state.duration === 60
    ? 5
    : state.duration === 180
      ? 12
      : 20;

  const streakTarget = state.year === 7 ? 4 : state.year === 8 ? 5 : 6;

  return pick([
    {
      type: 'correct',
      target: correctTarget,
      text: `Answer ${correctTarget} questions correctly.`
    },
    {
      type: 'streak',
      target: streakTarget,
      text: `Build a streak of ${streakTarget} correct answers.`
    },
    {
      type: 'accuracy',
      target: 80,
      text: 'Finish with at least 80% accuracy.'
    }
  ]);
}

function missionComplete() {
  if (!state.mission) return false;

  if (state.mission.type === 'correct') {
    return state.correct >= state.mission.target;
  }

  if (state.mission.type === 'streak') {
    return state.bestStreak >= state.mission.target;
  }

  return state.answered >= 5
    && getAccuracy() >= state.mission.target;
}

function missionProgress() {
  if (!state.mission) return 'Mission reward: +5 stars';

  if (state.mission.type === 'correct') {
    return `Progress: ${state.correct}/${state.mission.target} · Reward: +5 stars`;
  }

  if (state.mission.type === 'streak') {
    return `Best streak: ${state.bestStreak}/${state.mission.target} · Reward: +5 stars`;
  }

  return `Accuracy: ${getAccuracy()}%/${state.mission.target}% · Reward: +5 stars`;
}

function resetSkillStats() {
  state.skillStats = {};

  currentConfig().skills.forEach(skill => {
    state.skillStats[skill] = {
      correct: 0,
      total: 0
    };
  });
}

function addMistake(question, userAnswer) {
  const item = {
    key: questionKey(question),
    year: state.year,
    q: { ...question },
    lastAnswer: String(userAnswer),
    wrongCount: 1,
    mastery: 0,
    updated: Date.now()
  };

  const bankIndex = state.mistakeBank.findIndex(
    existing => existing.key === item.key
  );

  if (bankIndex >= 0) {
    state.mistakeBank[bankIndex].lastAnswer = item.lastAnswer;
    state.mistakeBank[bankIndex].wrongCount =
      (state.mistakeBank[bankIndex].wrongCount || 0) + 1;
    state.mistakeBank[bankIndex].mastery = 0;
    state.mistakeBank[bankIndex].updated = Date.now();
  } else {
    state.mistakeBank.unshift(item);
  }

  const roundIndex = state.roundMistakes.findIndex(
    existing => existing.key === item.key
  );

  if (roundIndex < 0) {
    state.roundMistakes.push(item);
  } else {
    state.roundMistakes[roundIndex] = item;
  }

  saveProgress();
  updateMistakeCounts();
}

function markReviewCorrect(item) {
  const index = state.mistakeBank.findIndex(
    existing => existing.key === item.key
  );

  if (index < 0) return;

  state.mistakeBank[index].mastery =
    (state.mistakeBank[index].mastery || 0) + 1;

  if (state.mistakeBank[index].mastery >= 2) {
    state.mistakeBank.splice(index, 1);
    showReward('✅ Mastered twice — removed from the mistake bank!');
  } else {
    showReward('✅ Correct once. Solve it correctly one more time to master it.');
  }

  saveProgress();
  updateMistakeCounts();
}

function markReviewWrong(item, userAnswer) {
  const index = state.mistakeBank.findIndex(
    existing => existing.key === item.key
  );

  if (index >= 0) {
    state.mistakeBank[index].mastery = 0;
    state.mistakeBank[index].lastAnswer = String(userAnswer);
    state.mistakeBank[index].wrongCount =
      (state.mistakeBank[index].wrongCount || 0) + 1;
    state.mistakeBank[index].updated = Date.now();
  }

  saveProgress();
  updateMistakeCounts();
}

function currentHero() {
  const base = HEROES[state.heroKey];

  if (state.heroKey === 'robot') {
    return {
      emoji: base.emoji,
      name: state.year >= 7 ? 'Algebra Robot' : 'Maths Robot'
    };
  }

  return base;
}

function updateHero() {
  const hero = currentHero();
  const level = Math.floor(state.totalStars / 15) + 1;
  const progress = state.totalStars % 15;

  heroAvatar.textContent = hero.emoji;
  heroName.textContent = hero.name;
  heroLevel.textContent =
    `${currentProblemLevelName()} Level ${level} · ${progress}/15 stars`;
  heroBar.style.width = `${(progress / 15) * 100}%`;
  summaryHero.textContent = hero.emoji;
}

function updateRace() {
  const progress = Math.min(100, state.correct * 4);
  raceProgress.style.width = `${progress}%`;
  rocket.style.left =
    `calc(16px + (100% - 84px) * ${progress / 100})`;
}

function updateMistakeCounts() {
  savedCountTop.textContent = state.mistakeBank.length;
  savedCountPanel.textContent = state.mistakeBank.length;
  bestScoreValue.textContent = state.bestScore;
  progressTitle.textContent = `${currentProblemLevelName()} Progress`;
  reviewSavedBtn.disabled = state.mistakeBank.length === 0;
  reviewBankBtn.disabled = state.mistakeBank.length === 0;
  renderMistakeListIfOpen();
}

function updateStatus() {
  timerValue.textContent = state.reviewMode
    ? 'Review'
    : formatTime(state.remaining);
  scoreValue.textContent = state.score;
  correctValue.textContent = state.correct;
  answeredValue.textContent = state.answered;
  streakValue.textContent = state.streak;
  accuracyValue.textContent = state.answered
    ? `${getAccuracy()}%`
    : '—';
  totalStars.textContent = state.totalStars;

  missionStatus.textContent = state.reviewMode
    ? `Question ${Math.min(state.reviewIndex + 1, state.reviewQueue.length)} of ${state.reviewQueue.length}`
    : missionProgress();

  timerCard.classList.toggle(
    'warning',
    !state.reviewMode && state.remaining <= 30 && state.running
  );
  streakCard.classList.toggle('hot', state.streak >= 3);

  updateHero();
  updateRace();
  updateMistakeCounts();
}

function setControlsForGame(active) {
  yearSelect.disabled = active;
  skillPicker.classList.toggle('locked', active);
  skillCheckboxes.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.disabled = active;
  });
  selectAllSkillsBtn.disabled = active;
  clearSkillsBtn.disabled = active;
  doneSkillsBtn.disabled = active;
  if (active) skillPicker.open = false;
  levelSelect.disabled = active;
  timeSelect.disabled = active;
  heroSelect.disabled = active;

  startBtn.classList.toggle('hidden', active);
  reviewSavedBtn.classList.toggle('hidden', active);
  testQuestionsBtn.classList.toggle('hidden', active);
  exportQuestionsBtn.classList.toggle('hidden', active);
  pauseBtn.classList.toggle('hidden', !active || state.reviewMode);
  finishBtn.classList.toggle('hidden', !active);

  answerInput.disabled = !active || state.paused;
  submitBtn.disabled = !active || state.paused;

  keypadButtons.forEach(button => {
    button.disabled = !active || state.paused;
  });
}

function showQuestion() {
  if (!state.running || state.paused) return;

  state.locked = false;

  if (state.reviewMode) {
    const item = state.reviewQueue[state.reviewIndex];

    if (!item) {
      finishReview();
      return;
    }

    state.current = {
      ...item.q,
      _reviewItem: item
    };

    modeBadge.textContent =
      `Review · ${currentProblemLevelName()} · ${currentLabels()[state.current.skill] || state.current.skill}`;
    playArea.classList.add('review-mode');
  } else {
    state.current = generateQuestion();
    rememberRecentQuestion(state.current);
    const skillName = currentLabels()[state.current.skill] || state.current.skill;
    const structureName = state.current.structureLabel || PROBLEM_STRUCTURE_LABELS[state.current.structure] || '';
    modeBadge.textContent = structureName
      ? `${currentProblemLevelName()} · ${structureName} · ${skillName}`
      : `${currentProblemLevelName()} · ${skillName}`;
    playArea.classList.remove('review-mode');
  }

  state.questionStartedAt = performance.now();
  setMathDisplay(questionText, state.current.text);
  questionText.classList.toggle('small', state.current.text.length > 34);
  questionText.classList.remove('pop');
  void questionText.offsetWidth;
  questionText.classList.add('pop');

  answerInput.value = '';
  answerInput.className = 'answer-input';
  feedback.textContent = '';
  feedback.className = 'feedback';

  hint.textContent = state.reviewMode
    ? 'Try the question again. It will be removed after two correct review attempts.'
    : state.current.requireImproperFraction
      ? 'Enter the answer as an improper fraction, for example 7/4. Do not enter a mixed number.'
      : state.current.answerType === 'time' || /\bHHMM\b/.test(state.current.text)
        ? 'Enter time as HHMM without a colon, for example 0730. 7:30 and 07:30 are also accepted.'
        : 'Enter the numerical answer only. A whole number, decimal, fraction, ratio, or time format may be used when appropriate.';

  streakBanner.textContent =
    !state.reviewMode && state.streak >= 3
      ? `🔥 ${state.streak}-answer streak!`
      : '';

  answerInput.focus();
  updateStatus();
}

function submitAnswer() {
  if (
    !state.running
    || state.paused
    || state.locked
    || !state.current
  ) {
    return;
  }

  const raw = answerInput.value.trim();

  if (!raw) {
    feedback.textContent = 'Enter an answer first.';
    feedback.className = 'feedback bad';
    return;
  }

  state.locked = true;

  const correct = validateAnswer(raw, state.current);

  state.answered++;

  if (!state.reviewMode) {
    state.skillStats[state.current.skill].total++;
  }

  if (correct) {
    state.correct++;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.totalStars++;

    if (!state.reviewMode) {
      state.skillStats[state.current.skill].correct++;
    }

    const elapsed =
      (performance.now() - state.questionStartedAt) / 1000;
    const speedBonus = elapsed <= 5 ? 3 : 0;
    const streakBonus = state.streak >= 3 ? 3 : 0;

    state.score += 10 + speedBonus + streakBonus;

    answerInput.classList.add('correct');
    feedback.textContent = state.reviewMode
      ? 'Correct review!'
      : `Correct! Strong ${currentProblemLevelName().toLowerCase()} problem-solving!`;
    feedback.className = 'feedback good';
    setMathDisplay(hint, state.current.hint);

    playSound('correct');

    if (state.reviewMode) {
      markReviewCorrect(state.current._reviewItem);
    }

    if ([3, 5, 8].includes(state.streak)) {
      launchConfetti(18);
    }
  } else {
    state.streak = 0;
    answerInput.classList.add('wrong');
    feedback.textContent =
      `Correct answer: ${displayCorrect(state.current)}`;
    feedback.className = 'feedback bad';
    setMathDisplay(hint, state.current.hint);

    playSound('wrong');

    if (state.reviewMode) {
      markReviewWrong(state.current._reviewItem, raw);
    } else {
      addMistake(state.current, raw);
    }
  }

  saveProgress();
  updateStatus();

  setTimeout(() => {
    if (!state.running || state.paused) return;

    if (state.reviewMode) {
      state.reviewIndex++;

      if (state.reviewIndex >= state.reviewQueue.length) {
        finishReview();
      } else {
        showQuestion();
      }
    } else {
      showQuestion();
    }
  }, correct ? 800 : 1250);
}
