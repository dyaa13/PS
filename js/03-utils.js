'use strict';

/* Math, formatting, parsing and answer-validation helpers.
   Split from DYAAPS.html without changing the original logic. */

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function chance(p) {
  return Math.random() < p;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function roundTo(n, d = 6) {
  const m = 10 ** d;
  return Math.round((n + Number.EPSILON) * m) / m;
}

function round2(n) {
  return roundTo(n, 2);
}

function fmt(n) {
  const value = roundTo(Number(n), 8);
  return Number.isInteger(value)
    ? String(value)
    : String(value).replace(/0+$/, '').replace(/\.$/, '');
}

function cleanDisplayNumbers(value) {
  return String(value).replace(
    /-?\d+\.\d{7,}/g,
    token => {
      const number = Number(token);

      if (!Number.isFinite(number)) {
        return token;
      }

      const cleaned = roundTo(number, 8);

      return Math.abs(cleaned - Math.round(cleaned)) < 1e-8
        ? String(Math.round(cleaned))
        : fmt(cleaned);
    }
  );
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function nextPrime(n) {
  let x = n + 1;
  while (!isPrime(x)) x++;
  return x;
}

function countFactors(n) {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) count++;
  }
  return count;
}

function smallestPrimeFactor(n) {
  for (let i = 2; i <= n; i++) {
    if (n % i === 0 && isPrime(i)) return i;
  }
  return n;
}

function primeFactors(n) {
  const out = [];
  let p = 2;
  while (n > 1) {
    while (n % p === 0) {
      out.push(p);
      n /= p;
    }
    p++;
  }
  return out;
}

function squareMultiplier(n) {
  const factors = primeFactors(n);
  const counts = {};
  factors.forEach(p => {
    counts[p] = (counts[p] || 0) + 1;
  });
  return Object.entries(counts).reduce(
    (product, [p, count]) => product * (count % 2 ? Number(p) : 1),
    1
  );
}

function roundSig(n, sig) {
  if (n === 0) return 0;
  const p = sig - 1 - Math.floor(Math.log10(Math.abs(n)));
  const m = 10 ** p;
  return Math.round((n + Number.EPSILON) * m) / m;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function getAccuracy() {
  return state.answered
    ? Math.round((state.correct / state.answered) * 100)
    : 0;
}

function normaliseMinus(value) {
  return String(value)
    .trim()
    .replace(/[−–—]/g, '-')
    .replace(/\s+/g, '');
}

function parseNumeric(raw) {
  const compact = normaliseMinus(raw);

  if (!compact) return NaN;

  if (/^[-+]?\d*\.?\d+$/.test(compact)) {
    return Number(compact);
  }

  if (/^[-+]?\d+\/[-+]?\d+$/.test(compact)) {
    const [numerator, denominator] = compact.split('/').map(Number);
    return denominator !== 0 ? numerator / denominator : NaN;
  }

  const original = String(raw).trim();

  if (/^[-+]?\d+\s+\d+\/\d+$/.test(original)) {
    const parts = original.split(/\s+/);
    const whole = Number(parts[0]);
    const [numerator, denominator] = parts[1].split('/').map(Number);
    return whole >= 0
      ? whole + numerator / denominator
      : whole - numerator / denominator;
  }

  return NaN;
}

function parseTimeValue(raw) {
  const compact = String(raw)
    .trim()
    .replace(/：/g, ':')
    .replace(/\s+/g, '');

  let hours;
  let minutes;

  if (/^\d{1,2}:\d{2}$/.test(compact)) {
    [hours, minutes] = compact.split(':').map(Number);
  } else if (/^\d{3,4}$/.test(compact)) {
    const padded = compact.padStart(4, '0');
    hours = Number(padded.slice(0, 2));
    minutes = Number(padded.slice(2));
  } else {
    return NaN;
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return NaN;
  }

  return hours * 100 + minutes;
}

function simplifyRatio(a, b) {
  const divisor = gcd(a, b);
  return `${a / divisor}:${b / divisor}`;
}

function validateAnswer(raw, question) {
  const compact = normaliseMinus(raw);

  if (question.answerType === 'ratio') {
    const match = compact.match(/^(-?\d+):(-?\d+)$/);
    if (!match) return false;

    return simplifyRatio(Number(match[1]), Number(match[2])) === question.answer;
  }

  if (question.answerType === 'time' || /\bHHMM\b/.test(question.text)) {
    const value = parseTimeValue(raw);
    return Number.isFinite(value)
      && value === Number(question.answer);
  }

  if (question.requireImproperFraction) {
    const fractionMatch = compact.match(/^([-+]?\d+)\/([-+]?\d+)$/);
    if (!fractionMatch) return false;

    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);

    if (denominator === 0 || Math.abs(numerator) <= Math.abs(denominator)) {
      return false;
    }

    return Math.abs(numerator / denominator - Number(question.answer)) < 1e-6;
  }

  const value = parseNumeric(raw);

  return Number.isFinite(value)
    && Math.abs(value - Number(question.answer)) < 1e-6;
}

function q(skill, text, answer, hint) {
  const rounded = roundTo(answer);

  return {
    skill,
    text,
    answer: rounded,
    displayAnswer: fmt(rounded),
    answerType: 'number',
    hint
  };
}

function qFrac(skill, text, value, hint) {
  const rounded = roundTo(value);
  const isWholeNumber = Math.abs(value - Math.round(value)) < 1e-8;
  const requireImproperFraction =
    Math.abs(value) > 1 + 1e-8 && !isWholeNumber;

  return {
    skill,
    text: requireImproperFraction
      ? `${text} Enter your answer as an improper fraction.`
      : text,
    answer: rounded,
    displayAnswer: toFraction(value),
    answerType: 'number',
    requireImproperFraction,
    hint: requireImproperFraction
      ? `${hint} Enter the final answer as an improper fraction, for example 7/4.`
      : hint
  };
}

function qRatio(skill, text, ratio, hint) {
  return {
    skill,
    text,
    answer: ratio,
    displayAnswer: ratio,
    answerType: 'ratio',
    hint
  };
}

function toFraction(value) {
  const sign = value < 0 ? '-' : '';
  const x = Math.abs(value);

  for (let denominator = 1; denominator <= 120; denominator++) {
    const numerator = Math.round(x * denominator);

    if (Math.abs(numerator / denominator - x) < 1e-8) {
      const divisor = gcd(numerator, denominator);
      const simpleNumerator = numerator / divisor;
      const simpleDenominator = denominator / divisor;
      return simpleDenominator === 1
        ? `${sign}${simpleNumerator}`
        : `${sign}${simpleNumerator}/${simpleDenominator}`;
    }
  }

  return fmt(value);
}

function displayCorrect(question) {
  return question.displayAnswer != null
    ? String(question.displayAnswer)
    : fmt(Number(question.answer));
}
