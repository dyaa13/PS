'use strict';

/* Keypad handling, event listeners and initial page startup.
   Split from DYAAPS.html without changing the original logic. */

function appendKey(key) {
  if (!state.running || state.paused || state.locked) return;
  if (answerInput.value.length >= 18) return;

  answerInput.value += key;
  answerInput.focus();
}

keypadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;
    const action = button.dataset.action;

    if (key !== undefined) {
      appendKey(key);
    } else if (action === 'clear') {
      answerInput.value = '';
      answerInput.focus();
    } else if (action === 'back') {
      answerInput.value = answerInput.value.slice(0, -1);
      answerInput.focus();
    } else if (action === 'enter') {
      submitAnswer();
    }
  });
});

answerInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitAnswer();
  }
});

submitBtn.addEventListener('click', submitAnswer);
startBtn.addEventListener('click', startGame);
continueStudentBtn.addEventListener('click', () => {
  initialiseStudentSession(studentNameInput.value);
});

studentNameInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    initialiseStudentSession(studentNameInput.value);
  }
});

studentNameInput.addEventListener('input', () => {
  studentNameError.textContent = '';
});

changeStudentBtn.addEventListener('click', () => {
  if (state.running) {
    alert('Finish the current warm-up before changing student.');
    return;
  }

  showStudentIdentityOverlay();
});

pauseBtn.addEventListener('click', togglePause);

finishBtn.addEventListener('click', () => {
  if (state.reviewMode) {
    finishReview();
  } else {
    finishGame();
  }
});

playAgainBtn.addEventListener('click', startGame);

reviewSavedBtn.addEventListener('click', () => {
  startReview(state.mistakeBank, 'saved');
});

testQuestionsBtn.addEventListener('click', runQuestionTest);
exportQuestionsBtn.addEventListener('click', exportSelectedQuestionsToPdf);

closeTestBtn.addEventListener('click', () => {
  testPanel.classList.remove('show');
});

practiceRecordTable.addEventListener('click', event => {
  const deleteButton = event.target.closest('[data-delete-record]');
  if (!deleteButton) return;

  deletePracticeRecord(Number(deleteButton.dataset.deleteRecord));
});

viewRecordsBtn.addEventListener('click', togglePracticeRecords);
clearPracticeRecordsBtn.addEventListener('click', clearPracticeRecords);
closePracticeRecordsBtn.addEventListener('click', () => {
  practiceRecords.style.display = 'none';
});

reviewBankBtn.addEventListener('click', () => {
  startReview(state.mistakeBank, 'saved');
});

reviewRoundBtn.addEventListener('click', () => {
  startReview(state.roundMistakes, 'round');
});

showMistakesBtn.addEventListener('click', toggleMistakeList);

closeMistakesBtn.addEventListener('click', () => {
  reviewList.style.display = 'none';
});

clearMistakesBtn.addEventListener('click', clearMistakes);

timeSelect.addEventListener('change', () => {
  state.remaining = Number(timeSelect.value);
  timerValue.textContent = formatTime(state.remaining);
  updateStartButton();
});

heroSelect.addEventListener('change', () => {
  state.heroKey = heroSelect.value;
  saveProgress();
  updateHero();
});

yearSelect.addEventListener('change', () => {
  if (state.running) return;

  saveProgress();

  state.year = Number(yearSelect.value);
  state.mode = 'mixed';
  state.selectedSkills = [];
  state.level = 'auto';
  clearRecentQuestions();
  testPanel.classList.remove('show');

  applyYearProgress(state.year);
  updateYearUI(true);
  resetSkillStats();

  summary.style.display = 'none';
  reviewList.style.display = 'none';
  practiceRecords.style.display = 'none';
  playArea.classList.remove('hidden');
  state.remaining = Number(timeSelect.value);

  updateStatus();
});

skillCheckboxes.addEventListener('change', event => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  syncSelectedSkillsFromUI();
});

selectAllSkillsBtn.addEventListener('click', () => {
  setSelectedSkills([...currentConfig().skills]);
  skillPicker.open = false;
});

clearSkillsBtn.addEventListener('click', () => {
  setSelectedSkills([]);
});

doneSkillsBtn.addEventListener('click', () => {
  if (getActiveSkills().length > 0) {
    skillPicker.open = false;
  }
});

document.addEventListener('click', event => {
  if (skillPicker.open && !skillPicker.contains(event.target)) {
    skillPicker.open = false;
  }
});

levelSelect.addEventListener('change', () => {
  state.level = levelSelect.value;
  clearRecentQuestions();
  testPanel.classList.remove('show');
});

soundBtn.addEventListener('click', () => {
  state.soundOn = !state.soundOn;
  soundBtn.textContent = state.soundOn
    ? '🔊 Sound On'
    : '🔇 Sound Off';
  soundBtn.setAttribute(
    'aria-pressed',
    String(state.soundOn)
  );

  if (state.soundOn) {
    playSound('correct');
  }
});

state.year = Number(yearSelect.value);
state.remaining = Number(timeSelect.value);

studentNameInput.value =
  localStorage.getItem(LAST_STUDENT_NAME_KEY) || '';

window.addEventListener('online', retryPendingPracticeUploads);
showStudentIdentityOverlay();
