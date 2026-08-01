'use strict';

/* Application configuration, heroes, level definitions and student storage keys.
   Split from DYAAPS.html without changing the original logic. */

let STUDENT_NAME = '';

const LAST_STUDENT_NAME_KEY = 'dyaaLastStudentName';
const MAX_PRACTICE_RECORDS = 500;

const CLOUD_RECORD_URL =
  'https://script.google.com/macros/s/AKfycbzmwxvMt73TGqnPOHw9jVYxFKlWNpPJUSfuAWKU9BAhGRo-p5aXnd9gP6a7fjpHDsWeSQ/exec';

const CLASS_TOKEN = 'dyaa-shared-class-2026';

const HEROES = {
  fox: { emoji: '🦊', name: 'Number Fox' },
  robot: { emoji: '🤖', name: 'Maths Robot' },
  dragon: { emoji: '🐉', name: 'Number Dragon' },
  ranger: { emoji: '🚀', name: 'Space Ranger' }
};

const YEAR_CONFIGS = {
  7: {
    levelName: 'Beginner',
    title: 'Problem Solving — Beginner',
    skillLabel: 'Beginner Problem Types',
    mixed: 'Mixed Beginner Problem Solving',
    labels: {
      arithmetic: 'Four Operations in Context',
      comparison: 'Comparison and Difference',
      fractions: 'Fraction Problems',
      decimalsMoney: 'Decimals and Money',
      percentages: 'Percentage Problems',
      ratio: 'Ratio and Sharing',
      geometryMeasurement: 'Geometry and Measurement',
      angleReasoning: 'Angle Reasoning',
      sequences: 'Sequences and Patterns',
      statistics: 'Statistics',
      probability: 'Probability',
      logicConstraints: 'Logical Reasoning',
      review: 'Mistake Review'
    },
    skills: [
      'arithmetic', 'comparison', 'fractions', 'decimalsMoney',
      'percentages', 'ratio', 'geometryMeasurement', 'angleReasoning',
      'sequences', 'statistics', 'probability', 'logicConstraints'
    ],
    levels: [
      ['auto', 'Automatic Mix'],
      ['basic', 'Basic Understanding Only'],
      ['multi', 'Multi-step Problems Only'],
      ['nonroutine', 'Non-routine Problems Only']
    ],
    teacher: 'Questions use formal examination-style wording. Automatic Mix selects approximately 60% Basic Understanding, 30% Multi-step Problems, and 10% Non-routine Problems.'
  },
  8: {
    levelName: 'Intermediate',
    title: 'Problem Solving — Intermediate',
    skillLabel: 'Intermediate Problem Types',
    mixed: 'Mixed Intermediate Problem Solving',
    labels: {
      arithmetic: 'Four Operations in Context',
      comparison: 'Comparison and Difference',
      fractions: 'Fraction Problems',
      decimalsMoney: 'Decimals and Money',
      percentages: 'Percentage Problems',
      ratio: 'Ratio and Sharing',
      proportion: 'Direct and Inverse Proportion',
      speedDistanceTime: 'Speed, Distance and Time',
      workRate: 'Work Rate',
      age: 'Age Problems',
      numberProblems: 'Number Problems',
      equations: 'Equation Problems',
      geometryMeasurement: 'Geometry and Measurement',
      angleReasoning: 'Angle Reasoning',
      pythagorasTrig: 'Pythagoras and Trigonometry',
      coordinatesLines: 'Coordinates and Straight Lines',
      sequences: 'Sequences and Patterns',
      statistics: 'Statistics',
      probability: 'Probability',
      logicConstraints: 'Logical Reasoning',
      modelling: 'Mathematical Modelling',
      review: 'Mistake Review'
    },
    skills: [
      'arithmetic', 'comparison', 'fractions', 'decimalsMoney',
      'percentages', 'ratio', 'proportion', 'speedDistanceTime',
      'workRate', 'age', 'numberProblems', 'equations',
      'geometryMeasurement', 'angleReasoning', 'pythagorasTrig',
      'coordinatesLines', 'sequences', 'statistics', 'probability',
      'logicConstraints', 'modelling'
    ],
    levels: [
      ['auto', 'Automatic Mix'],
      ['basic', 'Basic Understanding Only'],
      ['multi', 'Multi-step Problems Only'],
      ['nonroutine', 'Non-routine Problems Only']
    ],
    teacher: 'Questions use formal examination-style wording. Automatic Mix selects approximately 30% Basic Understanding, 50% Multi-step Problems, and 20% Non-routine Problems.'
  },
  9: {
    levelName: 'Advanced',
    title: 'Problem Solving — Advanced',
    skillLabel: 'Advanced Problem Types',
    mixed: 'Mixed Advanced Problem Solving',
    labels: {
      arithmetic: 'Four Operations in Context',
      comparison: 'Comparison and Difference',
      fractions: 'Fraction Problems',
      decimalsMoney: 'Decimals and Money',
      percentages: 'Percentage Problems',
      ratio: 'Ratio and Sharing',
      proportion: 'Direct and Inverse Proportion',
      speedDistanceTime: 'Speed, Distance and Time',
      workRate: 'Work Rate and Tanks',
      age: 'Age Problems',
      numberProblems: 'Number Problems',
      equations: 'Equation Problems',
      complexLinearEquations: 'Complex Linear Equation Problems',
      geometryMeasurement: 'Geometry and Measurement',
      angleReasoning: 'Angle and Shape Reasoning',
      pythagorasTrig: 'Pythagoras and Trigonometry',
      coordinatesLines: 'Coordinates and Straight Lines',
      sequences: 'Sequences and Patterns',
      statistics: 'Statistics',
      probability: 'Probability',
      logicConstraints: 'Logical and Constraint Problems',
      optimisation: 'Optimisation Problems',
      modelling: 'Mathematical Modelling',
      review: 'Mistake Review'
    },
    skills: [
      'arithmetic', 'comparison', 'fractions', 'decimalsMoney',
      'percentages', 'ratio', 'proportion', 'speedDistanceTime',
      'workRate', 'age', 'numberProblems', 'equations',
      'complexLinearEquations', 'geometryMeasurement', 'angleReasoning', 'pythagorasTrig',
      'coordinatesLines', 'sequences', 'statistics', 'probability',
      'logicConstraints', 'optimisation', 'modelling'
    ],
    levels: [
      ['auto', 'Automatic Mix'],
      ['basic', 'Basic Understanding Only'],
      ['multi', 'Multi-step Problems Only'],
      ['nonroutine', 'Non-routine Problems Only']
    ],
    teacher: 'Questions use formal examination-style wording. Automatic Mix selects approximately 15% Basic Understanding, 45% Multi-step Problems, and 40% Non-routine Problems.'
  }
};
const BASE_STORAGE_BY_YEAR = {
  7: { stars: 'dyaaPSBeginnerStars', hero: 'dyaaPSBeginnerHero', best: 'dyaaPSBeginnerBest', mistakes: 'dyaaPSBeginnerMistakes' },
  8: { stars: 'dyaaPSIntermediateStars', hero: 'dyaaPSIntermediateHero', best: 'dyaaPSIntermediateBest', mistakes: 'dyaaPSIntermediateMistakes' },
  9: { stars: 'dyaaPSAdvancedStars', hero: 'dyaaPSAdvancedHero', best: 'dyaaPSAdvancedBest', mistakes: 'dyaaPSAdvancedMistakes' }
};

function normaliseStudentName(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ');
}

function getStudentStorageId() {
  return encodeURIComponent(
    normaliseStudentName(STUDENT_NAME).toLowerCase()
  );
}

function getPracticeRecordsKey() {
  return `dyaaPracticeRecords_${getStudentStorageId()}`;
}

function getPendingCloudRecordsKey() {
  return `dyaaPendingCloudRecords_${getStudentStorageId()}`;
}

function getStudentStorageKeys(year) {
  const base = BASE_STORAGE_BY_YEAR[year];
  const suffix = getStudentStorageId();

  return {
    stars: `${base.stars}_${suffix}`,
    hero: `${base.hero}_${suffix}`,
    best: `${base.best}_${suffix}`,
    mistakes: `${base.mistakes}_${suffix}`
  };
}
