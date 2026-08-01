'use strict';

/* Runtime state plus cached DOM element references.
   Split from DYAAPS.html without changing the original logic. */

const state = {
  year: 7,
  running: false,
  paused: false,
  locked: false,
  reviewMode: false,
  reviewQueue: [],
  reviewIndex: 0,
  reviewSource: 'saved',
  mode: 'mixed',
  selectedSkills: [],
  level: 'auto',
  duration: 900,
  remaining: 900,
  score: 0,
  correct: 0,
  answered: 0,
  streak: 0,
  bestStreak: 0,
  totalStars: 0,
  bestScore: 0,
  heroKey: 'fox',
  current: null,
  questionStartedAt: 0,
  timerId: null,
  soundOn: true,
  mission: null,
  missionRewarded: false,
  roundMistakes: [],
  mistakeBank: [],
  skillStats: {},
  recentQuestionKeys: [],
  recentQuestionLimit: 12
};

const progressByYear = {};

const $ = id => document.getElementById(id);
const yearSelect = $('yearSelect');
const skillPicker = $('skillPicker');
const skillPickerSummary = $('skillPickerSummary');
const skillCheckboxes = $('skillCheckboxes');
const selectAllSkillsBtn = $('selectAllSkillsBtn');
const clearSkillsBtn = $('clearSkillsBtn');
const doneSkillsBtn = $('doneSkillsBtn');
const skillSelectionHelp = $('skillSelectionHelp');
const levelSelect = $('levelSelect');
const timeSelect = $('timeSelect');
const heroSelect = $('heroSelect');
const startBtn = $('startBtn');
const pauseBtn = $('pauseBtn');
const finishBtn = $('finishBtn');
const reviewSavedBtn = $('reviewSavedBtn');
const testQuestionsBtn = $('testQuestionsBtn');
const viewRecordsBtn = $('viewRecordsBtn');
const practiceRecords = $('practiceRecords');
const practiceRecordTable = $('practiceRecordTable');
const practiceRecordCount = $('practiceRecordCount');
const clearPracticeRecordsBtn = $('clearPracticeRecordsBtn');
const closePracticeRecordsBtn = $('closePracticeRecordsBtn');
const reviewRoundBtn = $('reviewRoundBtn');
const reviewBankBtn = $('reviewBankBtn');
const showMistakesBtn = $('showMistakesBtn');
const playAgainBtn = $('playAgainBtn');
const clearMistakesBtn = $('clearMistakesBtn');
const closeMistakesBtn = $('closeMistakesBtn');
const soundBtn = $('soundBtn');
const studentIdentityOverlay = $('studentIdentityOverlay');
const studentNameInput = $('studentNameInput');
const studentNameError = $('studentNameError');
const continueStudentBtn = $('continueStudentBtn');
const changeStudentBtn = $('changeStudentBtn');
const studentNameDisplay = $('studentNameDisplay');
const practiceRecordStudentName = $('practiceRecordStudentName');
const answerInput = $('answerInput');
const submitBtn = $('submitBtn');
const questionText = $('questionText');
const modeBadge = $('modeBadge');
const feedback = $('feedback');
const hint = $('hint');
const streakBanner = $('streakBanner');
const timerValue = $('timerValue');
const scoreValue = $('scoreValue');
const correctValue = $('correctValue');
const answeredValue = $('answeredValue');
const streakValue = $('streakValue');
const accuracyValue = $('accuracyValue');
const timerCard = $('timerCard');
const streakCard = $('streakCard');
const totalStars = $('totalStars');
const heroAvatar = $('heroAvatar');
const heroName = $('heroName');
const heroLevel = $('heroLevel');
const heroBar = $('heroBar');
const missionText = $('missionText');
const missionStatus = $('missionStatus');
const savedCountTop = $('savedCountTop');
const savedCountPanel = $('savedCountPanel');
const bestScoreValue = $('bestScoreValue');
const progressTitle = $('progressTitle');
const raceProgress = $('raceProgress');
const rocket = $('rocket');
const playArea = $('playArea');
const summary = $('summary');
const summaryTitle = $('summaryTitle');
const summaryHero = $('summaryHero');
const summaryStars = $('summaryStars');
const summaryScore = $('summaryScore');
const endCorrect = $('endCorrect');
const endAnswered = $('endAnswered');
const endAccuracy = $('endAccuracy');
const endStreak = $('endStreak');
const summaryFocus = $('summaryFocus');
const summaryMessage = $('summaryMessage');
const badges = $('badges');
const rewardToast = $('rewardToast');
const reviewList = $('reviewList');
const reviewTable = $('reviewTable');
const confettiLayer = $('confettiLayer');
const gameTitle = $('gameTitle');
const skillLabel = $('skillLabel');
const teacherNote = $('teacherNote');
const testPanel = $('testPanel');
const testScope = $('testScope');
const testValidValue = $('testValidValue');
const testUniqueValue = $('testUniqueValue');
const testRepeatValue = $('testRepeatValue');
const testIssueValue = $('testIssueValue');
const testMessage = $('testMessage');
const testBreakdown = $('testBreakdown');
const testIssues = $('testIssues');
const closeTestBtn = $('closeTestBtn');
const keypadButtons = [...document.querySelectorAll('.key-btn')];

let audioContext = null;
