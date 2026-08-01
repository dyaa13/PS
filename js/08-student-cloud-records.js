'use strict';

/* Timer, student identity, local records and Google Sheet upload queue.
   Split from DYAAPS.html without changing the original logic. */

function timerTick() {
  if (!state.running || state.paused || state.reviewMode) return;

  state.remaining--;
  updateStatus();

  if (state.remaining <= 0) {
    finishGame();
  }
}

function clearProgressProfiles() {
  Object.keys(progressByYear).forEach(year => {
    delete progressByYear[year];
  });
}

function updateStudentIdentityUI() {
  studentNameDisplay.textContent = STUDENT_NAME || 'Student';
  practiceRecordStudentName.textContent = STUDENT_NAME || 'Student';
}

function showStudentIdentityOverlay() {
  studentNameInput.value = STUDENT_NAME
    || localStorage.getItem(LAST_STUDENT_NAME_KEY)
    || '';

  studentNameError.textContent = '';
  studentIdentityOverlay.classList.remove('hidden');

  window.setTimeout(() => {
    studentNameInput.focus();
    studentNameInput.select();
  }, 50);
}

function initialiseStudentSession(name) {
  const cleanedName = normaliseStudentName(name);

  if (cleanedName.length < 2) {
    studentNameError.textContent =
      'Please enter your real name using at least 2 characters.';
    studentNameInput.focus();
    return;
  }

  if (cleanedName.length > 40) {
    studentNameError.textContent =
      'Please use a name with no more than 40 characters.';
    studentNameInput.focus();
    return;
  }

  clearInterval(state.timerId);

  STUDENT_NAME = cleanedName;
  localStorage.setItem(LAST_STUDENT_NAME_KEY, STUDENT_NAME);
  updateStudentIdentityUI();

  state.running = false;
  state.paused = false;
  state.locked = false;
  state.reviewMode = false;
  state.current = null;
  state.year = Number(yearSelect.value);
  state.mode = 'mixed';
  state.level = levelSelect.value || 'core';
  state.roundMistakes = [];

  clearProgressProfiles();
  loadProgress();
  updateYearUI(true);
  resetSkillStats();

  state.remaining = Number(timeSelect.value);
  summary.style.display = 'none';
  reviewList.style.display = 'none';
  practiceRecords.style.display = 'none';
  testPanel.classList.remove('show');
  playArea.classList.remove('hidden');

  pauseBtn.classList.add('hidden');
  finishBtn.classList.add('hidden');
  answerInput.disabled = true;
  submitBtn.disabled = true;

  updatePracticeRecordCount();
  retryPendingPracticeUploads();
  updateStatus();

  studentIdentityOverlay.classList.add('hidden');
}

function loadPracticeRecords() {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(getPracticeRecordsKey()) || '[]'
    );

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Could not load practice records.', error);
    return [];
  }
}

function createPracticeSessionId() {
  if (
    typeof crypto !== 'undefined'
    && typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadPendingCloudRecords() {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(getPendingCloudRecordsKey()) || '[]'
    );

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Could not load pending cloud records.', error);
    return [];
  }
}

function savePendingCloudRecords(records) {
  try {
    localStorage.setItem(
      getPendingCloudRecordsKey(),
      JSON.stringify(records)
    );
    return true;
  } catch (error) {
    console.warn('Could not save the cloud upload queue.', error);
    return false;
  }
}

function buildCloudRecordPayload(record) {
  return {
    classToken: CLASS_TOKEN,
    student: record.student,
    completedAt: record.completedAt,
    year: record.year,
    skills: Array.isArray(record.skills)
      ? record.skills.join(', ')
      : String(record.skills || ''),
    difficulty: record.difficulty,
    durationMinutes: Math.round(
      Number(record.durationSeconds || 0) / 60
    ),
    answered: record.answered,
    correct: record.correct,
    accuracy: record.accuracy,
    score: record.score,
    bestStreak: record.bestStreak,
    sessionId: record.sessionId
  };
}

async function uploadPracticeRecordToCloud(record) {
  if (!navigator.onLine) {
    throw new Error('The browser is offline.');
  }

  await fetch(CLOUD_RECORD_URL, {
    method: 'POST',
    mode: 'no-cors',
    keepalive: true,
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(buildCloudRecordPayload(record))
  });
}

function queuePracticeRecordUpload(record) {
  const pending = loadPendingCloudRecords();
  const alreadyQueued = pending.some(
    item => item.sessionId === record.sessionId
  );

  if (!alreadyQueued) {
    pending.push(record);
    savePendingCloudRecords(pending);
  }

  retryPendingPracticeUploads();
}

let cloudUploadInProgress = false;

async function retryPendingPracticeUploads() {
  if (cloudUploadInProgress || !navigator.onLine) {
    return;
  }

  const pending = loadPendingCloudRecords();

  if (!pending.length) {
    return;
  }

  cloudUploadInProgress = true;
  const remaining = [...pending];

  try {
    while (remaining.length) {
      const record = remaining[0];

      await uploadPracticeRecordToCloud(record);
      remaining.shift();
      savePendingCloudRecords(remaining);
    }
  } catch (error) {
    console.warn(
      'Cloud upload is pending and will be retried later.',
      error
    );
  } finally {
    cloudUploadInProgress = false;
  }
}

function updatePracticeRecordCount() {
  practiceRecordCount.textContent = loadPracticeRecords().length;
}

function savePracticeRecord() {
  if (state.answered === 0) return false;

  const labels = currentLabels();
  const selectedSkills = getActiveSkills();
  const record = {
    sessionId: createPracticeSessionId(),
    student: STUDENT_NAME,
    completedAt: new Date().toISOString(),
    year: currentProblemLevelName(),
    skills: selectedSkills.map(skill => labels[skill] || skill),
    difficulty: levelSelect.options[levelSelect.selectedIndex]?.textContent || state.level,
    durationSeconds: state.duration,
    answered: state.answered,
    correct: state.correct,
    accuracy: getAccuracy(),
    score: state.score,
    bestStreak: state.bestStreak
  };

  const records = loadPracticeRecords();
  records.unshift(record);

  try {
    localStorage.setItem(
      getPracticeRecordsKey(),
      JSON.stringify(records.slice(0, MAX_PRACTICE_RECORDS))
    );
    updatePracticeRecordCount();
    queuePracticeRecordUpload(record);
    return true;
  } catch (error) {
    console.warn('Could not save the practice record.', error);
    return false;
  }
}

function renderPracticeRecords() {
  const records = loadPracticeRecords();

  if (!records.length) {
    practiceRecordTable.innerHTML = `
      <div class="review-empty">
        No practice records have been saved for ${escapeHtml(STUDENT_NAME)} yet.
      </div>
    `;
    return;
  }

  practiceRecordTable.innerHTML = records.map((record, index) => {
    const completed = new Date(record.completedAt);
    const dateText = Number.isNaN(completed.getTime())
      ? 'Unknown date'
      : completed.toLocaleString('en-NZ', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
    const skills = Array.isArray(record.skills) && record.skills.length
      ? record.skills.join(', ')
      : 'Mixed skills';
    const minutes = Math.round(Number(record.durationSeconds || 0) / 60);

    return `
      <div class="review-row practice-record-row">
        <div>
          <b>${escapeHtml(dateText)}</b><br>
          ${escapeHtml(record.year)} · ${escapeHtml(record.difficulty)}<br>
          ${escapeHtml(skills)} · ${minutes} min
        </div>
        <div>
          <b>${escapeHtml(record.correct)}/${escapeHtml(record.answered)}</b><br>
          ${escapeHtml(record.accuracy)}% accuracy
        </div>
        <div>
          <b>${escapeHtml(record.score)} pts</b><br>
          Best streak: ${escapeHtml(record.bestStreak)}
        </div>
        <button
          class="record-delete-btn"
          type="button"
          data-delete-record="${index}"
          aria-label="Delete practice record from ${escapeHtml(dateText)}"
        >
          Delete
        </button>
      </div>
    `;
  }).join('');
}

function deletePracticeRecord(index) {
  const records = loadPracticeRecords();

  if (!Number.isInteger(index) || index < 0 || index >= records.length) {
    return;
  }

  const record = records[index];
  const completed = new Date(record.completedAt);
  const dateText = Number.isNaN(completed.getTime())
    ? 'this practice record'
    : completed.toLocaleString('en-NZ', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

  if (!confirm(`Delete ${STUDENT_NAME}'s practice record from ${dateText}?`)) {
    return;
  }

  records.splice(index, 1);

  try {
    localStorage.setItem(
      getPracticeRecordsKey(),
      JSON.stringify(records)
    );
    updatePracticeRecordCount();
    renderPracticeRecords();
  } catch (error) {
    console.warn('Could not delete the practice record.', error);
  }
}

function togglePracticeRecords() {
  const willOpen = practiceRecords.style.display !== 'block';
  practiceRecords.style.display = willOpen ? 'block' : 'none';

  if (willOpen) {
    renderPracticeRecords();
    practiceRecords.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function clearPracticeRecords() {
  const records = loadPracticeRecords();
  if (!records.length) return;

  if (confirm(`Clear all practice records for ${STUDENT_NAME}?`)) {
    localStorage.removeItem(getPracticeRecordsKey());
    updatePracticeRecordCount();
    renderPracticeRecords();
  }
}
