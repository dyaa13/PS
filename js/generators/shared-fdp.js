'use strict';

/* Shared Year 7–9 fraction, decimal and percentage banks.
   Split from DYAAPS.html without changing the original logic. */

/* ===== SHARED YEAR 7–9 FRACTION, DECIMAL & PERCENTAGE BANKS ===== */

function shuffleCopy(values) {
  const out = [...values];

  for (let i = out.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }

  return out;
}

function sharedFdpPool() {
  const year = Number(state.year);
  const level = state.level;
  const pairs = [
    [1, 2], [1, 4], [3, 4],
    [1, 5], [2, 5], [3, 5], [4, 5],
    [1, 8], [3, 8], [5, 8], [7, 8]
  ];

  if (year >= 8 || level !== 'starter') {
    pairs.push(
      [1, 10], [3, 10], [7, 10], [9, 10],
      [3, 20], [7, 20], [9, 20], [11, 20], [13, 20], [17, 20], [19, 20],
      [3, 25], [7, 25], [9, 25], [11, 25], [13, 25], [17, 25], [19, 25]
    );
  }

  if (year >= 9 || level === 'challenge') {
    pairs.push(
      [1, 16], [3, 16], [5, 16], [7, 16], [9, 16], [11, 16], [13, 16], [15, 16],
      [3, 40], [7, 40], [11, 40], [13, 40], [17, 40], [19, 40], [23, 40], [27, 40], [31, 40], [37, 40]
    );
  }

  return pairs.map(([n, d]) => ({
    n,
    d,
    value: n / d
  }));
}

function sharedFdpDisplay(item, kind) {
  if (kind === 'fraction') {
    return `${item.n}/${item.d}`;
  }

  if (kind === 'percent') {
    return `${fmt(item.value * 100)}%`;
  }

  return fmt(item.value);
}

function sharedGenFDPConversions() {
  const year = Number(state.year);
  const L = state.level;
  const pool = sharedFdpPool();
  const maxType = L === 'starter'
    ? 4
    : L === 'core'
      ? 6
      : 8;
  const t = randInt(1, maxType);
  const item = pick(pool);

  if (t === 1) {
    return q(
      'fdpConversions',
      `${item.n}/${item.d} as a decimal = ?`,
      item.value,
      'Divide the numerator by the denominator.'
    );
  }

  if (t === 2) {
    return q(
      'fdpConversions',
      `${item.n}/${item.d} as a percentage = ?%`,
      item.value * 100,
      'Convert to a decimal, then multiply by 100.'
    );
  }

  if (t === 3) {
    return qFrac(
      'fdpConversions',
      `${fmt(item.value)} as a simplest fraction = ?`,
      item.value,
      'Write the decimal over 10, 100, 1000 or 10000, then simplify.'
    );
  }

  if (t === 4) {
    return q(
      'fdpConversions',
      `${fmt(item.value * 100)}% as a decimal = ?`,
      item.value,
      'Divide the percentage by 100.'
    );
  }

  if (t === 5) {
    return qFrac(
      'fdpConversions',
      `${fmt(item.value * 100)}% as a simplest fraction = ?`,
      item.value,
      'Write the percentage over 100 and simplify.'
    );
  }

  if (t === 6) {
    return q(
      'fdpConversions',
      `${fmt(item.value)} as a percentage = ?%`,
      item.value * 100,
      'Multiply the decimal by 100.'
    );
  }

  if (t === 7) {
    const targetDenominator = pick([20, 40, 50, 100]);
    const numerator = item.value * targetDenominator;

    if (Math.abs(numerator - Math.round(numerator)) < 1e-8) {
      return q(
        'fdpConversions',
        `${item.n}/${item.d} = ?/${targetDenominator}`,
        Math.round(numerator),
        'Use an equivalent fraction.'
      );
    }

    return q(
      'fdpConversions',
      `${item.n}/${item.d} as a percentage = ?%`,
      item.value * 100,
      'Convert to a decimal, then multiply by 100.'
    );
  }

  const base = pick(pool);
  const multiplier = randInt(2, year >= 9 ? 8 : 5);
  const targetNumerator = base.n * multiplier;
  const targetDenominator = base.d * multiplier;

  return q(
    'fdpConversions',
    `${base.n}/${base.d} = ?/${targetDenominator}`,
    targetNumerator,
    'Multiply the numerator and denominator by the same number.'
  );
}

function sharedGenFDPComparison() {
  const year = Number(state.year);
  const L = state.level;
  const pool = shuffleCopy(sharedFdpPool());
  const count = L === 'starter' && year === 7 ? 2 : 3;
  const items = pool.slice(0, count);
  const kinds = shuffleCopy(['fraction', 'decimal', 'percent']).slice(0, count);
  const entries = items.map((item, index) => ({
    item,
    value: item.value,
    display: sharedFdpDisplay(item, kinds[index])
  }));
  const mode = count === 2
    ? pick(['largest', 'smallest'])
    : pick(['largest', 'smallest', 'middle']);
  const values = entries.map(entry => entry.value);
  let targetValue;

  if (mode === 'largest') {
    targetValue = Math.max(...values);
  } else if (mode === 'smallest') {
    targetValue = Math.min(...values);
  } else {
    targetValue = [...values].sort((a, b) => a - b)[1];
  }

  const answer = values.findIndex(value => Math.abs(value - targetValue) < 1e-10) + 1;
  const list = entries
    .map((entry, index) => `${index + 1}) ${entry.display}`)
    .join('   ');

  return q(
    'fdpComparison',
    `Which is ${mode}? Enter the item number. ${list}`,
    answer,
    'Convert every value to the same form before comparing.'
  );
}

function sharedGenFDPOperations() {
  const year = Number(state.year);
  const L = state.level;
  const easyTemplates = [
    () => {
      const [n, d, decimal] = pick([
        [1, 4, 0.5], [3, 8, 0.25], [2, 5, 0.3], [5, 8, 0.125],
        [3, 4, 0.2], [1, 5, 0.65], [7, 10, 0.15], [3, 5, 0.4]
      ]);
      return q(
        'fdpOperations',
        `${n}/${d} + ${fmt(decimal)} = ?`,
        n / d + decimal,
        'Convert the fraction or decimal so both are in the same form.'
      );
    },
    () => {
      const [decimal, percent] = pick([
        [0.8, 25], [0.75, 20], [1.2, 50], [0.625, 12.5],
        [0.9, 40], [1.5, 75], [0.55, 20], [1.25, 25]
      ]);
      return q(
        'fdpOperations',
        `${fmt(decimal)} − ${fmt(percent)}% = ?`,
        decimal - percent / 100,
        'Convert the percentage to a decimal before subtracting.'
      );
    },
    () => {
      const [percent, n, d] = pick([
        [50, 3, 4], [25, 4, 5], [20, 3, 5], [75, 4, 5],
        [50, 7, 8], [40, 3, 4], [25, 3, 5], [10, 4, 5]
      ]);
      return qFrac(
        'fdpOperations',
        `${percent}% of ${n}/${d} = ?`,
        percent / 100 * n / d,
        'Convert the percentage to a fraction or decimal, then multiply.'
      );
    },
    () => {
      const [decimal, n, d] = pick([
        [0.8, 3, 4], [0.5, 3, 5], [1.2, 5, 6], [0.75, 2, 3],
        [0.4, 5, 8], [1.5, 2, 5], [0.25, 7, 8], [0.6, 5, 6]
      ]);
      return qFrac(
        'fdpOperations',
        `${fmt(decimal)} × ${n}/${d} = ?`,
        decimal * n / d,
        'Write the decimal as a fraction, then multiply.'
      );
    }
  ];

  const coreTemplates = [
    () => {
      const [n, d, decimal] = pick([
        [3, 4, 0.25], [3, 5, 0.2], [7, 8, 0.5], [9, 10, 0.3],
        [5, 8, 0.125], [4, 5, 0.4], [7, 10, 0.2], [3, 8, 0.125]
      ]);
      return qFrac(
        'fdpOperations',
        `${n}/${d} ÷ ${fmt(decimal)} = ?`,
        (n / d) / decimal,
        'Convert the decimal to a fraction, then divide by multiplying by the reciprocal.'
      );
    },
    () => {
      const [percent, n, d] = pick([
        [25, 3, 8], [40, 3, 5], [62.5, 1, 4], [50, 7, 10],
        [12.5, 3, 4], [75, 1, 5], [20, 7, 10], [37.5, 1, 2]
      ]);
      return qFrac(
        'fdpOperations',
        `${fmt(percent)}% + ${n}/${d} = ?`,
        percent / 100 + n / d,
        'Convert the percentage and fraction to a common form before adding.'
      );
    },
    () => {
      const [n, d, decimal, percent] = pick([
        [1, 4, 0.5, 50], [3, 8, 0.125, 80], [2, 5, 0.6, 25], [3, 4, 0.25, 40],
        [1, 5, 0.3, 60], [5, 8, 0.375, 50], [7, 10, 0.3, 20], [3, 5, 0.4, 75]
      ]);
      return qFrac(
        'fdpOperations',
        `(${n}/${d} + ${fmt(decimal)}) × ${fmt(percent)}% = ?`,
        (n / d + decimal) * percent / 100,
        'Work inside the brackets first, then multiply by the percentage.'
      );
    },
    () => {
      const [decimal, n, d] = pick([
        [0.75, 3, 8], [0.8, 2, 5], [1.25, 5, 8], [0.6, 3, 10],
        [1.5, 3, 4], [0.875, 7, 16], [0.45, 9, 20], [1.2, 3, 5]
      ]);
      return qFrac(
        'fdpOperations',
        `${fmt(decimal)} ÷ ${n}/${d} = ?`,
        decimal / (n / d),
        'Divide by a fraction by multiplying by its reciprocal.'
      );
    }
  ];

  const challengeTemplates = [
    () => {
      const [n, d, percent] = pick([
        [3, 4, 25], [5, 8, 12.5], [7, 10, 20], [9, 16, 6.25],
        [3, 5, 15], [7, 8, 25], [11, 20, 5], [13, 20, 10]
      ]);
      return qFrac(
        'fdpOperations',
        `${n}/${d} ÷ ${fmt(percent)}% = ?`,
        (n / d) / (percent / 100),
        'Convert the percentage to a decimal or fraction before dividing.'
      );
    },
    () => {
      const [decimal, percent, n, d] = pick([
        [1.2, 35, 3, 4], [0.95, 25, 2, 5], [1.5, 40, 7, 10], [0.875, 37.5, 1, 4],
        [1.25, 20, 3, 5], [0.8, 12.5, 1, 8], [1.6, 50, 4, 5], [0.725, 25, 3, 8]
      ]);
      return qFrac(
        'fdpOperations',
        `${fmt(decimal)} + ${fmt(percent)}% − ${n}/${d} = ?`,
        decimal + percent / 100 - n / d,
        'Convert all three values to the same form before calculating.'
      );
    },
    () => {
      const [n, d, percent, decimal] = pick([
        [3, 4, 25, 0.5], [7, 8, 37.5, 0.25], [4, 5, 20, 0.3], [9, 10, 30, 0.2],
        [5, 8, 12.5, 0.25], [7, 10, 20, 0.5], [11, 20, 5, 0.25], [3, 5, 10, 0.2]
      ]);
      return qFrac(
        'fdpOperations',
        `(${n}/${d} − ${fmt(percent)}%) ÷ ${fmt(decimal)} = ?`,
        (n / d - percent / 100) / decimal,
        'Calculate inside the brackets, then divide.'
      );
    },
    () => {
      const [percent, n, d, decimal] = pick([
        [50, 3, 4, 0.25], [25, 7, 8, 0.125], [40, 3, 5, 0.4], [75, 1, 2, 0.3],
        [20, 4, 5, 0.2], [62.5, 3, 8, 0.425], [10, 7, 10, 0.3], [37.5, 5, 8, 0.375]
      ]);
      return qFrac(
        'fdpOperations',
        `${fmt(percent)}% of (${n}/${d} + ${fmt(decimal)}) = ?`,
        percent / 100 * (n / d + decimal),
        'Work inside the brackets first, then find the stated percentage.'
      );
    }
  ];

  let templates = [...easyTemplates];

  if (L !== 'starter' || year >= 8) {
    templates = templates.concat(coreTemplates);
  }

  if (L === 'challenge' || year >= 9) {
    templates = templates.concat(challengeTemplates);
  }

  if (year === 7 && L === 'starter') {
    templates = easyTemplates;
  } else if (year === 7 && L === 'core') {
    templates = easyTemplates.concat(coreTemplates.slice(0, 2));
  } else if (year === 8 && L === 'starter') {
    templates = easyTemplates.concat(coreTemplates.slice(0, 1));
  } else if (year === 8 && L === 'core') {
    templates = easyTemplates.concat(coreTemplates);
  }

  return pick(templates)();
}
