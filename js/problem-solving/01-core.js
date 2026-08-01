'use strict';

/* Problem-solving structure selection and question constructors.
   Split from DYAAPS.html without changing the original logic. */

/* ===== DYAA PROBLEM-SOLVING QUESTION BANKS ===== */

const PROBLEM_STRUCTURE_LABELS = {
  basic: 'Basic Understanding',
  multi: 'Multi-step Problem',
  nonroutine: 'Non-routine Problem'
};

function currentProblemLevelName() {
  return currentConfig().levelName;
}

function chooseProblemStructure() {
  if (['basic', 'multi', 'nonroutine'].includes(state.level)) {
    return state.level;
  }

  const roll = randInt(1, 100);

  if (state.year === 7) {
    return roll <= 60 ? 'basic' : roll <= 90 ? 'multi' : 'nonroutine';
  }

  if (state.year === 8) {
    return roll <= 30 ? 'basic' : roll <= 80 ? 'multi' : 'nonroutine';
  }

  return roll <= 15 ? 'basic' : roll <= 60 ? 'multi' : 'nonroutine';
}

function attachProblemMetadata(question, structure) {
  return {
    ...question,
    structure,
    structureLabel: PROBLEM_STRUCTURE_LABELS[structure]
  };
}

function psQ(skill, structure, text, answer, hint) {
  return attachProblemMetadata(q(skill, text, answer, hint), structure);
}

function psQFrac(skill, structure, text, answer, hint) {
  return attachProblemMetadata(qFrac(skill, text, answer, hint), structure);
}

function psQRatio(skill, structure, text, answer, hint) {
  return attachProblemMetadata(qRatio(skill, text, answer, hint), structure);
}

function psQTime(skill, structure, text, hours, minutes, hint) {
  const safeHours = ((Number(hours) % 24) + 24) % 24;
  const safeMinutes = Number(minutes);
  const hhmm = safeHours * 100 + safeMinutes;
  const question = q(skill, text, hhmm, hint);

  question.answerType = 'time';
  question.displayAnswer = `${String(safeHours).padStart(2, '0')}:${String(safeMinutes).padStart(2, '0')}`;

  return attachProblemMetadata(question, structure);
}
