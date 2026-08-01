'use strict';

/* Progress migration, local storage loading and saving.
   Split from DYAAPS.html without changing the original logic. */

function migrateMistake(item, year) {
  if (!item || !item.q || !item.q.text) return null;

  const question = normaliseQuestion(
    item.q,
    item.q.skill || item.q.operation || 'mixed'
  );

  return {
    key: item.key || `${year}|${question.skill}|${question.text}|${question.answerType}|${question.answer}`,
    year,
    q: question,
    lastAnswer: item.lastAnswer != null ? String(item.lastAnswer) : '',
    wrongCount: Number(item.wrongCount) || 1,
    mastery: Number(item.mastery) || 0,
    updated: Number(item.updated) || Date.now()
  };
}

function readYearProgress(year) {
  const keys = getStudentStorageKeys(year);
  const result = {
    stars: 0,
    best: 0,
    hero: 'fox',
    mistakes: []
  };

  try {
    const stars = Number(localStorage.getItem(keys.stars));
    const best = Number(localStorage.getItem(keys.best));
    const hero = localStorage.getItem(keys.hero);
    const rawBank = JSON.parse(localStorage.getItem(keys.mistakes) || '[]');

    if (Number.isFinite(stars) && stars >= 0) result.stars = stars;
    if (Number.isFinite(best) && best >= 0) result.best = best;
    if (hero && HEROES[hero]) result.hero = hero;

    if (Array.isArray(rawBank)) {
      result.mistakes = rawBank
        .map(item => migrateMistake(item, year))
        .filter(Boolean);
    }
  } catch (error) {
    console.warn(`Could not load Year ${year} progress.`, error);
  }

  return result;
}

function loadProgress() {
  for (const year of Object.keys(YEAR_CONFIGS).map(Number)) {
    progressByYear[year] = readYearProgress(year);
  }

  applyYearProgress(state.year);
}

function applyYearProgress(year) {
  const profile = progressByYear[year] || {
    stars: 0,
    best: 0,
    hero: 'fox',
    mistakes: []
  };

  state.totalStars = profile.stars;
  state.bestScore = profile.best;
  state.heroKey = profile.hero;
  state.mistakeBank = profile.mistakes;
  state.roundMistakes = [];

  heroSelect.value = state.heroKey;
}

function saveProgress() {
  const keys = getStudentStorageKeys(state.year);

  progressByYear[state.year] = {
    stars: state.totalStars,
    best: state.bestScore,
    hero: state.heroKey,
    mistakes: state.mistakeBank
  };

  try {
    localStorage.setItem(keys.stars, String(state.totalStars));
    localStorage.setItem(keys.best, String(state.bestScore));
    localStorage.setItem(keys.hero, state.heroKey);
    localStorage.setItem(
      keys.mistakes,
      JSON.stringify(state.mistakeBank.slice(0, 120))
    );
  } catch (error) {
    console.warn(`Could not save Year ${state.year} progress.`, error);
  }
}
