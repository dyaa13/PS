'use strict';

/* Sound, confetti, reward messages and start-button text.
   Split from DYAAPS.html without changing the original logic. */

function ensureAudio() {
  if (!state.soundOn) return null;

  if (!audioContext) {
    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioClass) return null;
    audioContext = new AudioClass();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return audioContext;
}

function tone(frequency, duration = 0.12, delay = 0, volume = 0.07) {
  const context = ensureAudio();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, context.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(
    volume,
    context.currentTime + delay + 0.015
  );
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    context.currentTime + delay + duration
  );

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(context.currentTime + delay);
  oscillator.stop(context.currentTime + delay + duration + 0.03);
}

function playSound(type) {
  if (type === 'correct') {
    tone(523, 0.12);
    tone(659, 0.15, 0.1);
  } else if (type === 'wrong') {
    tone(220, 0.2);
  } else if (type === 'finish') {
    tone(523, 0.12);
    tone(659, 0.12, 0.12);
    tone(784, 0.2, 0.24);
  }
}

function launchConfetti(number = 26) {
  const colors = [
    '#1f78d1',
    '#ff9f1c',
    '#f5b700',
    '#16803a',
    '#6b46c1'
  ];

  for (let i = 0; i < number; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${randInt(2, 97)}%`;
    piece.style.background = pick(colors);
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.animationDuration = `${1.05 + Math.random() * 0.7}s`;
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 2200);
  }
}

function showReward(message) {
  rewardToast.textContent = message;
  rewardToast.classList.remove('show');
  void rewardToast.offsetWidth;
  rewardToast.classList.add('show');
}

function updateStartButton() {
  const minutes = Math.round(Number(timeSelect.value) / 60);
  startBtn.textContent = `Start ${minutes}-Minute ${currentProblemLevelName()} Practice`;
}
