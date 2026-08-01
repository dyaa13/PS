'use strict';

/* Year 7 and beginner-focused question generators.
   Split from DYAAPS.html without changing the original logic. */

/* ===== YEAR 7 QUESTION GENERATORS ===== */

function y7GenIntegers() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 3): L === 'core' ? randInt(1, 5): randInt(1, 7);
  if (t === 1) {
    const a = randInt( - 15, 15),
    b = randInt( - 15, 15);
    return q('integers', `${a} + (${b}) = ?`, a + b, 'Add signed integers carefully.')
  }
  if (t === 2) {
    const a = randInt( - 12, 18),
    b = randInt( - 12, 18);
    return q('integers', `${a} − (${b}) = ?`, a - b, 'Subtracting a negative means adding.')
  }
  if (t === 3) {
    const a = randInt( - 10, - 2),
    b = randInt(2, 9);
    return q('integers', `${a} × ${b} = ?`, a * b, 'A negative times a positive is negative.')
  }
  if (t === 4) {
    const a = randInt( - 9, - 2),
    b = randInt( - 9, - 2);
    return q('integers', `(${a}) × (${b}) = ?`, a * b, 'A negative times a negative is positive.')
  }
  if (t === 5) {
    const b = randInt(2, 10),
    ans = randInt( - 12, 12),
    a = b * ans;
    return q('integers', `${a} ÷ ${b} = ?`, ans, 'Use multiplication facts with signs.')
  }
  if (t === 6) {
    const a = randInt( - 20, 20);
    return q('integers', `|${a}| = ?`, Math.abs(a), 'Absolute value is distance from zero.')
  }
  const a = randInt( - 12, 8),
  b = randInt( - 8, 12),
  c = randInt(2, 6);
  return q('integers', `${a} − (${b}) × ${c} = ?`, a - b * c, 'Multiply before subtracting.')
}


function y7GenOrder() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 3): L === 'core' ? randInt(1, 5): randInt(1, 7);
  if (t === 1) {
    const a = randInt(8, 30),
    b = randInt(2, 9),
    c = randInt(2, 9);
    return q('order', `${a} + ${b} × ${c} = ?`, a + b * c, 'Multiply before adding.')
  }
  if (t === 2) {
    const a = randInt(2, 8),
    b = randInt(8, 18),
    c = randInt(2, 7);
    return q('order', `${a} × (${b} − ${c}) = ?`, a * (b - c), 'Brackets first.')
  }
  if (t === 3) {
    const d = randInt(2, 8),
    ans = randInt(4, 14),
    add = randInt(4, 20);
    return q('order', `${d*ans} ÷ ${d} + ${add} = ?`, ans + add, 'Division before addition.')
  }
  if (t === 4) {
    const a = randInt( - 8, 12),
    b = randInt(2, 7),
    c = randInt( - 5, 8);
    return q('order', `${a} + ${b} × (${c}) = ?`, a + b * c, 'Multiply first, including the sign.')
  }
  if (t === 5) {
    const a = randInt(3, 8),
    b = randInt(4, 10),
    c = randInt(2, 8),
    d = pick([2, 4]);
    const top = a * (b + c);
    return q('order', `${a} × (${b} + ${c}) ÷ ${d} = ?`, top / d, 'Brackets, then multiply and divide left to right.')
  }
  if (t === 6) {
    const a = randInt(20, 50),
    b = randInt( - 6, - 2),
    c = randInt(2, 7);
    return q('order', `${a} − (${b}) × ${c} = ?`, a - b * c, 'Multiply first; subtracting a negative product adds.')
  }
  const a = randInt(2, 6),
  b = randInt(4, 9),
  c = randInt(2, 5),
  d = randInt(1, 8);
  return q('order', `${a} × (${b} + ${c}) − ${d}² = ?`, a * (b + c) - d * d, 'Brackets and powers before other operations.')
}


function y7GenPowers() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 4): L === 'core' ? randInt(1, 6): randInt(1, 8);
  if (t === 1) {
    const n = randInt(2, L === 'challenge' ? 18: 14);
    return q('powers', `${n}² = ?`, n * n, 'Square means multiply the number by itself.')
  }
  if (t === 2) {
    const n = randInt(2, L === 'starter' ? 5: 8);
    return q('powers', `${n}³ = ?`, n * n * n, 'Cube means multiply three equal factors.')
  }
  if (t === 3) {
    const n = pick([4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144]);
    return q('powers', `√${n} = ?`, Math.sqrt(n), 'Find the positive square root.')
  }
  if (t === 4) {
    const b = pick([2, 3, 4, 5]),
    e = randInt(2, L === 'challenge' ? 5: 4);
    return q('powers', `${b}^${e} = ?`, b ** e, 'Write the power as repeated multiplication.')
  }
  if (t === 5) {
    const a = randInt(2, 8),
    b = randInt(2, 8);
    return q('powers', `${a}² + ${b}² = ?`, a * a + b * b, 'Calculate each square first.')
  }
  if (t === 6) {
    const b = pick([2, 3, 5]),
    a = randInt(1, 3),
    c = randInt(1, 3);
    return q('powers', `${b}^${a} × ${b}^${c} = ?`, b ** (a + c), 'Same base: add the exponents.')
  }
  if (t === 7) {
    const n = randInt(3, 9);
    return q('powers', `${n}³ − ${n}² = ?`, n ** 3 - n ** 2, 'Calculate powers first.')
  }
  const n = pick([8, 27, 64, 125, 216]);
  return q('powers', `Cube root of ${n} = ?`, Math.round(Math.cbrt(n)), 'Find the number whose cube is the given value.')
}


function y7GenFactors() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 4): L === 'core' ? randInt(1, 6): randInt(1, 8);
  if (t === 1) {
    const a = pick([12, 18, 24, 30, 36, 42, 48]),
    b = pick([16, 20, 24, 28, 32, 40, 54]);
    return q('factors', `HCF of ${a} and ${b} = ?`, gcd(a, b), 'Find the greatest common factor.')
  }
  if (t === 2) {
    const a = pick([3, 4, 5, 6, 8, 9, 10, 12]),
    b = pick([4, 5, 6, 8, 10, 12, 15]);
    return q('factors', `LCM of ${a} and ${b} = ?`, lcm(a, b), 'Find the first common multiple.')
  }
  if (t === 3) {
    const n = pick([19, 23, 29, 31, 37, 41, 43, 47, 53]);
    return q('factors', `Next prime after ${n} = ?`, nextPrime(n), 'Test each next number for divisibility.')
  }
  if (t === 4) {
    const n = pick([18, 20, 24, 28, 30, 36, 40, 42]);
    return q('factors', `How many factors does ${n} have?`, countFactors(n), 'List factor pairs.')
  }
  if (t === 5) {
    const n = pick([42, 54, 66, 70, 78, 84, 90, 98]);
    let sp = 2;
    while (n % sp !== 0) sp++;
    return q('factors', `Smallest prime factor of ${n} = ?`, sp, 'Test 2, then 3, then 5, then 7.')
  }
  if (t === 6) {
    const n = pick([12, 18, 20, 24, 27, 30, 36, 45]);
    const primes = [];
    let x = n,
    p = 2;
    while (x > 1) {
      while (x % p === 0) {
        primes.push(p);
        x /= p
      }
      p++
    }
    return q('factors', `How many prime factors (with repeats) are in ${n}?`, primes.length, 'Use a factor tree and count the prime leaves.')
  }
  if (t === 7) {
    const a = pick([2, 3, 5, 7]),
    b = pick([2, 3, 5]),
    n = a * a * b;
    return q('factors', `Largest prime factor of ${n} = ?`, Math.max(a, b), 'Use prime factorisation.')
  }
  const n = pick([60, 72, 84, 90, 96]);
  return q('factors', `How many distinct prime factors does ${n} have?`, new Set(primeFactors(n)).size, 'Count different primes, not repeats.')
}


function y7GenFractions() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 4): L === 'core' ? randInt(1, 6): randInt(1, 8);
  if (t === 1) {
    const [a,
    b,
    c,
    d] = pick([[1, 2, 1, 4], [2, 3, 1, 6], [3, 4, 1, 8], [2, 5, 1, 10]]),
    v = a / b + c / d;
    return qFrac('fractions', `${a}/${b} + ${c}/${d} = ?`, v, 'Find a common denominator.')
  }
  if (t === 2) {
    const [a,
    b,
    c,
    d] = pick([[5, 6, 1, 3], [7, 8, 1, 4], [4, 5, 3, 10], [3, 4, 1, 6]]),
    v = a / b - c / d;
    return qFrac('fractions', `${a}/${b} − ${c}/${d} = ?`, v, 'Find a common denominator before subtracting.')
  }
  if (t === 3) {
    const [a,
    b,
    c,
    d] = pick([[2, 3, 3, 4], [3, 5, 5, 6], [4, 7, 7, 8], [3, 4, 2, 5]]),
    v = a / b * c / d;
    return qFrac('fractions', `${a}/${b} × ${c}/${d} = ?`, v, 'Multiply numerators and denominators, then simplify.')
  }
  if (t === 4) {
    const [n,
    d] = pick([[3, 4], [2, 5], [5, 6], [3, 8], [7, 10]]),
    k = randInt(3, 12),
    whole = d * k;
    return q('fractions', `${n}/${d} of ${whole} = ?`, n * k, 'Divide by the denominator, then multiply by the numerator.')
  }
  if (t === 5) {
    const whole = randInt(1, 3),
    [n,
    d] = pick([[1, 2], [1, 3], [2, 3], [3, 4], [5, 6]]),
    v = whole + n / d;
    return qFrac('fractions', `${whole} + ${n}/${d} = ?`, v, 'Write the result as an improper fraction.')
  }
  if (t === 6) {
    const [n,
    d] = pick([[12, 18], [15, 25], [21, 28], [24, 36], [35, 49]]),
    g = gcd(n, d);
    return qFrac('fractions', `Simplify ${n}/${d}`, n / d, 'Divide numerator and denominator by their HCF.')
  }
  if (t === 7) {
    const [a,
    b,
    c,
    d] = pick([[3, 4, 2, 3], [5, 6, 3, 5], [7, 8, 1, 2]]),
    v = (a / b) / (c / d);
    return qFrac('fractions', `${a}/${b} ÷ ${c}/${d} = ?`, v, 'Multiply by the reciprocal.')
  }
  const [a,
  b,
  c,
  d] = pick([[1, 2, 3, 4], [2, 3, 5, 6], [3, 5, 7, 10]]);
  return q('fractions', `Which is larger? Enter 1 for ${a}/${b}, or 2 for ${c}/${d}.`, a / b > c / d ? 1: 2, 'Compare using a common denominator or decimals.')
}


function y7GenDecimals() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 4): L === 'core' ? randInt(1, 6): randInt(1, 8);
  if (t === 1) {
    const a = randInt(120, 850) / 100,
    b = randInt(15, 250) / 100;
    return q('decimals', `${fmt(a)} + ${fmt(b)} = ?`, roundTo(a + b), 'Line up decimal place values.')
  }
  if (t === 2) {
    const a = randInt(450, 999) / 100,
    b = randInt(10, Math.floor(a * 100) - 10) / 100;
    return q('decimals', `${fmt(a)} − ${fmt(b)} = ?`, roundTo(a - b), 'Subtract using place value.')
  }
  if (t === 3) {
    const a = randInt(12, 99) / 10,
    b = randInt(2, 9);
    return q('decimals', `${fmt(a)} × ${b} = ?`, roundTo(a * b), 'Multiply the whole-number facts, then use place value.')
  }
  if (t === 4) {
    const b = pick([2, 4, 5, 8]),
    ans = randInt(5, 50) / 10,
    a = roundTo(ans * b);
    return q('decimals', `${fmt(a)} ÷ ${b} = ?`, ans, 'Use a related multiplication fact.')
  }
  if (t === 5) {
    const n = randInt(12, 999) / 100,
    m = pick([10, 100, 1000]);
    return q('decimals', `${fmt(n)} × ${m} = ?`, roundTo(n * m), 'Use place value.')
  }
  if (t === 6) {
    const n = randInt(12, 9999),
    m = pick([10, 100, 1000]);
    return q('decimals', `${n} ÷ ${m} = ?`, roundTo(n / m), 'Use place value.')
  }
  if (t === 7) {
    const a = randInt(10, 90) / 100;
    return q('decimals', `${fmt(a)} + □ = 1`, roundTo(1 - a), 'Find the complement to 1.')
  }
  const a = pick([3.6, 4.8, 7.2, 8.4]),
  b = pick([.5, .25, .2, .1]);
  return q('decimals', `${fmt(a)} × ${fmt(b)} = ?`, roundTo(a * b), 'Use half, quarter, fifth or tenth.')
}


function y7GenPercentages() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 4): L === 'core' ? randInt(1, 6): randInt(1, 8);
  if (t === 1) {
    const p = pick([10, 20, 25, 50, 75]),
    base = pick([40, 60, 80, 100, 120, 160, 200, 240, 300]);
    return q('percentages', `${p}% of ${base} = ?`, base * p / 100, 'Build from 10%, 25% or 50%.')
  }
  if (t === 2) {
    const p = pick([5, 15, 30, 35, 60, 70]),
    base = pick([40, 60, 80, 100, 120, 160, 200, 240]);
    return q('percentages', `${p}% of ${base} = ?`, base * p / 100, 'Split the percentage into easy parts.')
  }
  if (t === 3) {
    const price = pick([60, 80, 120, 160, 200]),
    p = pick([10, 15, 20, 25, 30]);
    return q('percentages', `Original $${price}，after ${p}% off = $?`, roundTo(price * (1 - p / 100)), 'Find the discount, then subtract.')
  }
  if (t === 4) {
    const n = pick([40, 60, 80, 120, 160, 200]),
    p = pick([10, 20, 25]);
    return q('percentages', `Increase ${n} by ${p}%`, n * (1 + p / 100), 'Find the increase, then add it.')
  }
  if (t === 5) {
    const d = pick([.125, .2, .25, .35, .4, .6, .625, .75]);
    return q('percentages', `${fmt(d)} = ?%`, d * 100, 'Multiply by 100.')
  }
  if (t === 6) {
    const [n,
    d] = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 8], [5, 8]]);
    return q('percentages', `${n}/${d} = ?%`, n / d * 100, 'Convert the fraction to a decimal or denominator 100.')
  }
  if (t === 7) {
    const whole = pick([50, 75, 90, 120, 150]),
    p = pick([10, 20, 25, 30]);
    const part = whole * p / 100;
    return q('percentages', `${p}% of a number is ${part}. The number is ?`, whole, 'Divide the part by the percentage as a decimal.')
  }
  const old = pick([40, 50, 80, 100]),
  inc = pick([10, 20, 25, 50]);
  const neu = old * (1 + inc / 100);
  return q('percentages', `${old} increases to ${neu}. Percentage increase = ?%`, inc, 'Increase ÷ original × 100.')
}


function y7GenRatio() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 3): L === 'core' ? randInt(1, 5): randInt(1, 7);

  if (t === 1) {
    const a = randInt(2, 8),
    b = randInt(2, 9);

    let k;

    do {
      k = randInt(2, 6);
    } while (k === b);

    return qRatio('ratio', `Simplify ${a*k}:${b*k}`, simplifyRatio(a, b), 'Divide both parts by their HCF.')
  }

  if (t === 2) {
    const a = randInt(2, 7),
    b = randInt(3, 9);

    let k;

    do {
      k = randInt(2, 6);
    } while (k === b);

    return q('ratio', `${a}:${b} = ${a*k}:?`, b * k, 'Multiply both parts by the same scale factor.')
  }

  if (t === 3) {
    const a = randInt(2, 6),
    b = randInt(3, 8),
    total = (a + b) * randInt(3, 8);
    return q('ratio', `Share ${total} in the ratio ${a}:${b}. Smaller share = ?`, total * Math.min(a, b) / (a + b), 'Find one ratio part first.')
  }

  if (t === 4) {
    const items = randInt(3, 8),
    cost = items * randInt(3, 12);
    return q('ratio', `${items} books cost $${cost}. Cost per book = $?`, cost / items, 'Divide total cost by number of books.')
  }

  if (t === 5) {
    const speed = pick([40, 50, 60, 70, 80]),
    time = pick([1.5, 2, 2.5, 3]);
    return q('ratio', `${speed} km/h for ${time} h. Distance = ? km`, speed * time, 'Distance = speed × time.')
  }

  if (t === 6) {
    const a = randInt(2, 5),
    b = randInt(3, 7),
    red = a * randInt(3, 8);
    return q('ratio', `Red:Blue = ${a}:${b}. If red = ${red}, blue = ?`, red / a * b, 'Find the scale factor.')
  }

  const a = randInt(2, 6),
  b = randInt(3, 8);

  let k;

  do {
    k = randInt(2, 6);
  } while (k === b);

  const c = a * k;

  return q('ratio', `${a}:${b} = ${c}:?`, b * k, 'Use equivalent ratios or cross multiplication.')
}
function y7GenAlgebra() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 4): L === 'core' ? randInt(1, 6): randInt(1, 8);
  if (t === 1) {
    const x = randInt( - 5, 12),
    a = randInt(2, 7),
    b = randInt( - 9, 12);
    return q('algebra', `If x = ${x}, find ${a}x ${b>=0?'+':'−'} ${Math.abs(b)}.`, a * x + b, 'Substitute the value of x.')
  }
  if (t === 2) {
    const x = randInt(2, 10),
    a = randInt(2, 6),
    b = randInt(2, 6);
    return q('algebra', `If x = ${x}, find ${a}x + ${b}x.`, (a + b) * x, 'Combine like terms, then substitute.')
  }
  if (t === 3) {
    const x = randInt(2, 10),
    a = randInt(2, 6),
    b = randInt(2, 9);
    return q('algebra', `If x = ${x}, find ${a}(x + ${b}).`, a * (x + b), 'Calculate inside the brackets first.')
  }
  if (t === 4) {
    const a = randInt(2, 8),
    b = randInt(2, 8);
    return q('algebra', `Coefficient of x in ${a}x + ${b} + 3x = ?`, a + 3, 'Combine the x terms.')
  }
  if (t === 5) {
    const a = randInt(2, 6),
    b = randInt(2, 9),
    x = randInt(2, 10);
    return q('algebra', `If x = ${x}, find ${a}x² + ${b}.`, a * x * x + b, 'Square x before multiplying.')
  }
  if (t === 6) {
    const a = randInt(2, 5),
    b = randInt(2, 5),
    x = randInt(2, 8),
    y = randInt(2, 8);
    return q('algebra', `If x=${x}, y=${y}, find ${a}x + ${b}y.`, a * x + b * y, 'Substitute both values.')
  }
  if (t === 7) {
    const n = randInt(3, 12),
    a = randInt(2, 6),
    b = randInt( - 5, 10);
    return q('algebra', `For T = ${a}n ${b>=0?'+':'−'} ${Math.abs(b)}, find T when n=${n}.`, a * n + b, 'Substitute n into the rule.')
  }
  const x = randInt( - 5, 8),
  a = randInt(2, 5),
  b = randInt(1, 6),
  c = randInt( - 8, 8);
  return q('algebra', `If x=${x}, find ${a}(x − ${b}) ${c>=0?'+':'−'} ${Math.abs(c)}.`, a * (x - b) + c, 'Brackets first, then simplify.')
}


function y7GenEquations() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);
  const x = randInt(L === 'challenge' ? -8 : 1, 15);

  if (t === 1) {
    const b = randInt(3, 20);
    return q('equations', `x + ${b} = ${x + b}Then x = ?`, x, 'Undo addition by subtracting.');
  }

  if (t === 2) {
    const b = randInt(3, 20);
    return q('equations', `x − ${b} = ${x - b}Then x = ?`, x, 'Undo subtraction by adding.');
  }

  if (t === 3) {
    const a = randInt(2, 9);
    return q('equations', `${a}x = ${a * x}Then x = ?`, x, 'Divide both sides by the coefficient.');
  }

  if (t === 4) {
    const divisor = randInt(2, 9);
    const quotient = randInt(L === 'challenge' ? -8 : 1, 15);
    const dividend = divisor * quotient;
    return q(
      'equations',
      `x ÷ ${divisor} = ${quotient}Then x = ?`,
      dividend,
      'Multiply both sides by the divisor.'
    );
  }

  if (t === 5) {
    const a = randInt(2, 7);
    const b = randInt(2, 15);
    return q('equations', `${a}x + ${b} = ${a * x + b}Then x = ?`, x, 'Undo addition, then divide.');
  }

  if (t === 6) {
    const a = randInt(2, 7);
    const b = randInt(2, 15);
    return q('equations', `${a}x − ${b} = ${a * x - b}Then x = ?`, x, 'Undo subtraction, then divide.');
  }

  if (t === 7) {
    const a = randInt(2, 6);
    const b = randInt(1, 8);
    return q('equations', `${a}(x − ${b}) = ${a * (x - b)}Then x = ?`, x, 'Divide first, then add.');
  }

  const a = randInt(2, 6);
  const b = randInt(2, 9);
  const c = randInt(-8, 8);
  return q(
    'equations',
    `${a}x + ${b} = ${a * x + b}. Find ${a}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}.`,
    a * x + c,
    'Solve x, then evaluate the requested expression.'
  );
}

function y7GenSequences() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 3): L === 'core' ? randInt(1, 5): randInt(1, 7);
  if (t === 1) {
    const a = randInt( - 10, 20),
    d = randInt(2, 9);
    return q('sequences', `${a}, ${a+d}, ${a+2*d}, ${a+3*d}, ... next = ?`, a + 4 * d, 'Add the common difference.')
  }
  if (t === 2) {
    const a = randInt(1, 6),
    r = pick([2, 3, 4]);
    return q('sequences', `${a}, ${a*r}, ${a*r*r}, ${a*r*r*r}, ... next = ?`, a * r ** 4, 'Multiply by the common ratio.')
  }
  if (t === 3) {
    const a = randInt(1, 10),
    d = randInt(2, 8),
    n = randInt(5, 12);
    return q('sequences', `Sequence starts ${a} and increases by ${d}. Term ${n} = ?`, a + (n - 1) * d, 'Use first term + (n−1) × difference.')
  }
  if (t === 4) {
    const n = randInt(3, 10),
    a = randInt(2, 6),
    b = randInt( - 5, 8);
    return q('sequences', `Tₙ = ${a}n ${b>=0?'+':'−'} ${Math.abs(b)}. T${n} = ?`, a * n + b, 'Substitute the term number.')
  }
  if (t === 5) {
    const a = randInt( - 15, 5),
    d = randInt(3, 9);
    return q('sequences', `${a}, ${a+d}, □, ${a+3*d}. Missing term = ?`, a + 2 * d, 'The difference is constant.')
  }
  if (t === 6) {
    const a = randInt(2, 6),
    r = pick([ - 2, - 3, 2, 3]);
    return q('sequences', `${a}, ${a*r}, ${a*r*r}, ${a*r*r*r}, ... next = ?`, a * r ** 4, 'Multiply by the same number, including its sign.')
  }
  const a = randInt(1, 8),
  d = randInt(2, 7),
  term = a + randInt(4, 10) * d;
  return q('sequences', `In ${a}, ${a+d}, ${a+2*d}, ... which term equals ${term}?`, (term - a) / d + 1, 'Solve a + (n−1)d = given term.')
}


function y7GenEstimation() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 3): L === 'core' ? randInt(1, 5): randInt(1, 7);
  if (t === 1) {
    const n = randInt(100, 999);
    return q('estimation', `Round ${n} to nearest 10`, Math.round(n / 10) * 10, 'Look at the ones digit.')
  }
  if (t === 2) {
    const n = randInt(100, 9999);
    return q('estimation', `Round ${n} to nearest 100`, Math.round(n / 100) * 100, 'Look at the tens digit.')
  }
  if (t === 3) {
    const n = randInt(1000, 9999);
    return q('estimation', `Round ${n} to nearest 1000`, Math.round(n / 1000) * 1000, 'Look at the hundreds digit.')
  }
  if (t === 4) {
    const a = randInt(320, 480),
    b = randInt(150, 280);
    const ans = Math.round(a / 100) * 100 + Math.round(b / 100) * 100;
    return q('estimation', `Estimate ${a} + ${b} by rounding each to nearest 100`, ans, 'Round both numbers before adding.')
  }
  if (t === 5) {
    const a = randInt(42, 58),
    b = randInt(17, 23);
    const ans = Math.round(a / 10) * 10 * Math.round(b / 10) * 10;
    return q('estimation', `Estimate ${a} × ${b} by rounding each to nearest 10`, ans, 'Round both factors, then multiply.')
  }
  if (t === 6) {
    const n = randInt(1001, 9999) / 1000,
    dp = pick([1, 2]);
    return q('estimation', `Round ${fmt(n)} to ${dp} decimal place${dp===1?'':'s'}`, roundTo(n, dp), 'Check the next digit.')
  }
  const b = randInt(3, 7),
  ans = randInt(25, 65),
  friendly = b * ans,
  a = friendly + pick([ - 4, - 3, - 2, 2, 3, 4]);
  return q('estimation', `Estimate ${a} ÷ ${b} using ${friendly} ÷ ${b}`, ans, 'Use the friendly number shown.')
}


function y7GenUnits() {
  const L = state.level,
  t = L === 'starter' ? randInt(1, 4): L === 'core' ? randInt(1, 6): randInt(1, 8);
  if (t === 1) {
    const km = randInt(12, 89) / 10;
    return q('units', `${fmt(km)} km = ? m`, km * 1000, 'Multiply kilometres by 1000.')
  }
  if (t === 2) {
    const g = randInt(1200, 9500);
    return q('units', `${g} g = ? kg`, g / 1000, 'Divide grams by 1000.')
  }
  if (t === 3) {
    const l = randInt(12, 89) / 10;
    return q('units', `${fmt(l)} L = ? mL`, l * 1000, 'Multiply litres by 1000.')
  }
  if (t === 4) {
    const startH = randInt(1, 4),
    startM = pick([0, 10, 15, 20, 25, 30, 35, 40, 45]),
    mins = pick([35, 45, 50, 65, 75, 85]);
    const total = startH * 60 + startM + mins,
    endH = Math.floor(total / 60),
    endM = total % 60;
    return q('units', `${startH}:${String(startM).padStart(2,'0')} plus ${mins} min. Enter as HHMM without a colon (for example 0730); a colon is also accepted.`, endH * 100 + endM, 'Add minutes and regroup 60 minutes as 1 hour.')
  }
  if (t === 5) {
    const speed = pick([40, 50, 60, 70, 80, 90]),
    time = pick([1.5, 2, 2.5, 3]);
    return q('units', `${speed} km/h for ${time} h = ? km`, speed * time, 'Distance = speed × time.')
  }
  if (t === 6) {
    const distance = pick([120, 150, 180, 210, 240, 300]),
    time = pick([2, 3, 4, 5]);
    return q('units', `${distance} km in ${time} h. Speed = ? km/h`, distance / time, 'Speed = distance ÷ time.')
  }
  if (t === 7) {
    const m = randInt(120, 950) / 100;
    return q('units', `${fmt(m)} m = ? cm`, m * 100, 'Multiply metres by 100.')
  }
  const area = pick([1.5, 2.4, 3.2, 4.5]);
  return q('units', `${fmt(area)} m² = ? cm²`, area * 10000, 'Square-unit conversion: 1 m² = 10,000 cm².')
}


function y7GenGeometry() {
  const L = state.level;

  // Added word-problem scenario:
  // A square's perimeter is known; find the length of one side.
  // This appears in about 25% of Geometry questions.
    if (L === 'challenge' && chance(0.9)) {
    const width = randInt(6, 30);
    const length = randInt(width + 3, width + 25);
    const perimeter = 2 * (length + width);

    const questionText = pick([
      `A rectangular garden has a perimeter of ${perimeter} m and a length of ${length} m. What is its width?`,
      `A rectangular playground is ${length} m long. Its perimeter is ${perimeter} m. How wide is it?`,
      `A rectangular picture frame has a perimeter of ${perimeter} cm and a length of ${length} cm. Find its width.`,
      `A rectangular noticeboard is ${length} cm long. Its perimeter is ${perimeter} cm. What is its width?`
    ]);

    return q(
      'geometry',
      questionText,
      width,
      'Width = perimeter ÷ 2 − length.'
    );
  }
  if (chance(0.25)) {
    const side =
      L === 'starter'
        ? randInt(2, 12)
        : L === 'core'
          ? randInt(4, 25)
          : randInt(6, 40);

    const perimeter = side * 4;

    const questionText = pick([
      `A square garden has a perimeter of ${perimeter} m. What is the length of one side?`,
      `A square playground has a perimeter of ${perimeter} m. Find the length of one side.`,
      `A square picture frame has a perimeter of ${perimeter} cm. What is its side length?`,
      `A square tile has a perimeter of ${perimeter} cm. How long is each side?`,
      `A farmer builds a square fence with a total length of ${perimeter} m. How long is each side?`
    ]);

    return q(
      'geometry',
      questionText,
      side,
      'A square has 4 equal sides, so side length = perimeter ÷ 4.'
    );
  }

  const t =
    L === 'starter'
      ? randInt(1, 4)
      : L === 'core'
        ? randInt(1, 6)
        : randInt(1, 8);

  if (t === 1) {
    const l = randInt(5, 20);
    const w = randInt(3, 15);

    return q(
      'geometry',
      `Rectangle ${l} cm by ${w} cm. Perimeter = ? cm`,
      2 * (l + w),
      'Perimeter = 2(length + width).'
    );
  }

  if (t === 2) {
    const l = randInt(5, 20);
    const w = randInt(3, 15);

    return q(
      'geometry',
      `Rectangle ${l} cm by ${w} cm. Area = ? cm²`,
      l * w,
      'Area = length × width.'
    );
  }

  if (t === 3) {
    const b = randInt(4, 20);
    const h = randInt(3, 16);

    return q(
      'geometry',
      `Triangle base ${b} cm, height ${h} cm. Area = ? cm²`,
      (b * h) / 2,
      'Area = 1/2 × base × height.'
    );
  }

  if (t === 4) {
    const a = randInt(20, 85);
    const b = randInt(20, Math.min(85, 159 - a));

    return q(
      'geometry',
      `Triangle angles ${a}° and ${b}°. Third angle = ?°`,
      180 - a - b,
      'Angles in a triangle sum to 180°.'
    );
  }

  if (t === 5) {
    const a = randInt(20, 160);

    return q(
      'geometry',
      `Supplement of ${a}° = ?°`,
      180 - a,
      'Angles on a straight line sum to 180°.'
    );
  }

  if (t === 6) {
    const a = randInt(5, 85);

    return q(
      'geometry',
      `Complement of ${a}° = ?°`,
      90 - a,
      'Complementary angles sum to 90°.'
    );
  }

  if (t === 7) {
    const side = randInt(3, 18);

    return q(
      'geometry',
      `Square area ${side * side} cm². Side length = ? cm`,
      side,
      'Find the square root of the area.'
    );
  }

  const l = randInt(6, 20);
  const w = randInt(3, 15);
  const scale = pick([2, 3]);

  return q(
    'geometry',
    `A ${l}×${w} rectangle is enlarged by scale factor ${scale}. New area = ?`,
    l * w * scale * scale,
    'Area scales by the square of the scale factor.'
  );
}





/* ===== YEAR 7 ADDED FOCUSED QUESTION GENERATORS ===== */

function y7GenFDPConversions(){
  const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,7):randInt(1,9);
  if(t===1){const [n,d]=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8],[7,8]]);return q('fdpConversions',`${n}/${d} as a decimal = ?`,n/d,'Divide numerator by denominator.');}
  if(t===2){const [n,d]=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8],[7,8]]);return q('fdpConversions',`${n}/${d} as a percentage = ?%`,n/d*100,'Convert to decimal, then multiply by 100.');}
  if(t===3){const v=pick([0.125,0.2,0.25,0.3,0.375,0.4,0.5,0.625,0.75,0.8,0.875]);return qFrac('fdpConversions',`${fmt(v)} as a simplest fraction = ?`,v,'Write over 10, 100 or 1000 and simplify.');}
  if(t===4){const p=pick([12.5,20,25,30,37.5,40,50,62.5,75,80,87.5]);return q('fdpConversions',`${fmt(p)}% as a decimal = ?`,p/100,'Divide by 100.');}
  if(t===5){const p=pick([12.5,20,25,30,37.5,40,50,62.5,75,80,87.5]);return qFrac('fdpConversions',`${fmt(p)}% as a simplest fraction = ?`,p/100,'Write over 100 and simplify.');}
  if(t===6){const a=pick([0.35,0.45,0.55,0.65,0.72,0.85]),[n,d]=pick([[1,3],[2,5],[1,2],[3,5],[2,3],[3,4]]);return q('fdpConversions',`Which is larger? Enter 1 for ${fmt(a)}, or 2 for ${n}/${d}.`,a>n/d?1:2,'Convert both to decimals.');}
  if(t===7){const vals=pick([[0.375,40],[0.625,60],[0.72,75],[0.48,50],[0.85,80]]);return q('fdpConversions',`Which is larger? Enter 1 for ${fmt(vals[0])}, or 2 for ${vals[1]}%.`,vals[0]>vals[1]/100?1:2,'Convert the percentage to a decimal.');}
  if(t===8){const a=pick([0.25,0.4,0.6,0.75]),b=pick([20,35,50,65,80]);return q('fdpConversions',`${fmt(a)} + ${b}% = ?`,a+b/100,'Convert the percentage to a decimal before adding.');}
  const [n,d]=pick([[7,20],[9,20],[11,20],[13,20],[17,20],[19,20]]);return q('fdpConversions',`${n}/${d} as a percentage = ?%`,n/d*100,'Convert the denominator to 100.');
}

function y7GenPercentageChange(){
  const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,7):randInt(1,9);
  if(t===1){const n=pick([40,60,80,100,120,160,200,240]),p=pick([10,20,25,50]);return q('percentageChange',`Increase ${n} by ${p}%.`,n*(1+p/100),'Find the increase, then add it.');}
  if(t===2){const n=pick([40,60,80,100,120,160,200,240]),p=pick([10,20,25,50]);return q('percentageChange',`Decrease ${n} by ${p}%.`,n*(1-p/100),'Find the decrease, then subtract it.');}
  if(t===3){const price=pick([40,60,80,100,120,160,200]),p=pick([10,15,20,25,30]);return q('percentageChange',`original price $${price} after ${p}% off = $?`,roundTo(price*(1-p/100)),'Multiply by the percentage remaining.');}
  if(t===4){const old=pick([40,50,60,80,100,120]),p=pick([10,20,25,50]),neu=roundTo(old*(1+p/100));return q('percentageChange',`${old} increases to ${neu}. Percentage increase = ?%`,p,'Change ÷ original × 100.');}
  if(t===5){const old=pick([40,50,60,80,100,120]),p=pick([10,20,25]),neu=roundTo(old*(1-p/100));return q('percentageChange',`${old} decreases to ${neu}. Percentage decrease = ?%`,p,'Decrease ÷ original × 100.');}
  if(t===6){const cost=pick([40,50,60,80,100]),p=pick([10,20,25,30]);return q('percentageChange',`An item costs $${cost} and is sold for ${p}% profit. Selling price = $?`,cost*(1+p/100),'Profit is a percentage of cost price.');}
  if(t===7){const original=pick([40,50,60,80,100,120]),p=pick([10,20,25,50]),final=roundTo(original*(1+p/100));return q('percentageChange',`A number increases by ${p}% to ${final}. Original number = ?`,original,'Divide by the increase multiplier.');}
  if(t===8){const original=pick([60,80,100,120,160,200]),p=pick([10,20,25]),sale=roundTo(original*(1-p/100));return q('percentageChange',`After a ${p}% discount, a price is $${sale}. Original price = $?`,original,'Divide by the percentage remaining.');}
  const n=pick([80,100,120,160,200]),p1=pick([10,20,25]),p2=pick([10,20]);return q('percentageChange',`Increase ${n} by ${p1}%, then decrease the result by ${p2}%. Final value = ?`,roundTo(n*(1+p1/100)*(1-p2/100)),'Apply the two multipliers in order.');
}

function y7GenDirectProportion(){
  const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,7):randInt(1,9);
  if(t===1){const items=randInt(2,8),unit=randInt(3,15),target=randInt(2,12);return q('directProportion',`${items} books cost $${items*unit}. ${target} books cost $?`,target*unit,'Find the unit cost, then multiply.');}
  if(t===2){const kg=randInt(2,8),unit=randInt(3,12);return q('directProportion',`${kg} kg costs $${kg*unit}. Cost per kg = $?`,unit,'Divide cost by kilograms.');}
  if(t===3){const x1=randInt(2,8),k=randInt(2,10),x2=randInt(2,12);return q('directProportion',`y is directly proportional to x. When x=${x1}, y=${k*x1}. Find y when x=${x2}.`,k*x2,'Find the constant multiplier y ÷ x.');}
  if(t===4){const people=randInt(2,6),serves=randInt(2,6),target=people*randInt(2,4);return q('directProportion',`A recipe for ${people} people uses ${serves} cups. For ${target} people, cups needed = ?`,serves*target/people,'Scale both quantities by the same factor.');}
  if(t===5){const scale=pick([2,5,10,20,50]),cm=randInt(2,12);return q('directProportion',`Map scale: 1 cm represents ${scale} km. ${cm} cm represents ? km`,scale*cm,'Multiply map length by the scale rate.');}
  if(t===6){const workers=randInt(2,8),output=randInt(3,12),factor=randInt(2,4);return q('directProportion',`${workers} workers make ${output} units in a fixed time. ${workers*factor} workers make ? units at the same rate.`,output*factor,'Direct proportion: multiply by the same scale factor.');}
  if(t===7){const distance=pick([60,80,90,120,150]),time=pick([2,3,4,5]);return q('directProportion',`${distance} km in ${time} hours. Unit rate = ? km/h`,distance/time,'Divide by the number of hours.');}
  if(t===8){const a=randInt(2,7),b=randInt(3,9),x=a*randInt(2,8);return q('directProportion',`${a}:${b} = ${x}:?`,x/a*b,'Use the same scale factor in both ratio parts.');}
  const rate=pick([1.5,2.5,3.5,4.5]),count=randInt(4,12);return q('directProportion',`${count} metres at $${fmt(rate)} per metre cost $?`,count*rate,'Cost = quantity × unit rate.');
}

function y7GenSimplifyExpand(){
  const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,7):randInt(1,9);
  if(t===1){const a=randInt(2,9),b=randInt(2,9),c=randInt(1,7);return q('simplifyExpand',`Coefficient of x after simplifying ${a}x + ${b}x − ${c}x = ?`,a+b-c,'Combine like terms.');}
  if(t===2){const a=randInt(2,9),b=randInt(2,9),c=randInt(1,7);return q('simplifyExpand',`Coefficient of y after simplifying ${a}y − ${b} + ${c}y = ?`,a+c,'Only combine y-terms with y-terms.');}
  if(t===3){const a=randInt(2,8),b=randInt(2,9);return q('simplifyExpand',`Coefficient of x after expanding ${a}(x + ${b}) = ?`,a,'Multiply x by the outside factor.');}
  if(t===4){const a=randInt(2,8),b=randInt(2,9);return q('simplifyExpand',`Constant term after expanding ${a}(x + ${b}) = ?`,a*b,'Multiply the constant by the outside factor.');}
  if(t===5){const a=randInt(2,7),b=randInt(2,8),c=randInt(1,8);return q('simplifyExpand',`Coefficient of x after simplifying ${a}(x + ${b}) + ${c}x = ?`,a+c,'Expand, then combine x-terms.');}
  if(t===6){const a=randInt(2,7),b=randInt(2,8),c=randInt(-8,8);return q('simplifyExpand',`Constant term after simplifying ${a}(x − ${b}) ${c>=0?'+':'−'} ${Math.abs(c)} = ?`,-a*b+c,'Expand the bracket, then combine constants.');}
  if(t===7){const a=randInt(2,6),b=randInt(2,6),c=randInt(2,6);return q('simplifyExpand',`Coefficient of x after simplifying ${a}(x + ${b}) + ${c}(x − 1) = ?`,a+c,'Expand both brackets and combine x-terms.');}
  if(t===8){const a=randInt(2,7),b=randInt(2,8);return q('simplifyExpand',`Coefficient of x² in ${a}x(${b}x − 3) = ?`,a*b,'Multiply the coefficients and x × x.');}
  const g=randInt(2,8),a=randInt(2,7),b=randInt(2,9);return q('simplifyExpand',`Greatest numerical factor of ${g*a}x + ${g*b} = ?`,g*gcd(a,b),'Find the HCF of the coefficients.');
}

function y7GenTwoStepEquations() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 7)
      : randInt(1, 9);
  const x = randInt(L === 'challenge' ? -8 : 1, 15);

  if (t === 1) {
    const a = randInt(2, 8);
    const b = randInt(2, 15);
    return q('twoStepEquations', `${a}x + ${b} = ${a * x + b}. Find x.`, x, 'Subtract the constant, then divide.');
  }

  if (t === 2) {
    const a = randInt(2, 8);
    const b = randInt(2, 15);
    return q('twoStepEquations', `${a}x − ${b} = ${a * x - b}. Find x.`, x, 'Add the constant, then divide.');
  }

  if (t === 3) {
    const a = randInt(2, 7);
    const b = randInt(1, 8);
    return q('twoStepEquations', `${a}(x − ${b}) = ${a * (x - b)}. Find x.`, x, 'Divide first, then add.');
  }

  if (t === 4) {
    const a = randInt(2, 7);
    const b = randInt(1, 8);
    return q('twoStepEquations', `${a}(x + ${b}) = ${a * (x + b)}. Find x.`, x, 'Divide first, then subtract.');
  }

  if (t === 5) {
    const divisor = randInt(2, 8);
    const quotient = randInt(L === 'challenge' ? -8 : 1, 15);
    const b = randInt(1, 10);
    const dividend = divisor * quotient;
    return q(
      'twoStepEquations',
      `x ÷ ${divisor} + ${b} = ${quotient + b}. Find x.`,
      dividend,
      'Subtract, then multiply by the divisor.'
    );
  }

  if (t === 6) {
    const divisor = randInt(2, 8);
    const quotient = randInt(L === 'challenge' ? -8 : 1, 15);
    const b = randInt(1, 10);
    const dividend = divisor * quotient;
    return q(
      'twoStepEquations',
      `x ÷ ${divisor} − ${b} = ${quotient - b}. Find x.`,
      dividend,
      'Add, then multiply by the divisor.'
    );
  }

  if (t === 7) {
    const a = randInt(2, 6);
    const b = randInt(1, 8);
    const c = randInt(1, 8);
    return q('twoStepEquations', `${a}(x + ${b}) − ${c} = ${a * (x + b) - c}. Find x.`, x, 'Undo the outside constant, divide, then undo the bracket constant.');
  }

  if (t === 8) {
    const a = randInt(2, 6);
    const b = randInt(1, 8);
    const c = randInt(1, 8);
    return q('twoStepEquations', `${a}(x − ${b}) + ${c} = ${a * (x - b) + c}. Find x.`, x, 'Subtract the outside constant, divide, then add.');
  }

  const a = randInt(2, 7);
  const b = randInt(1, 9);
  const c = randInt(1, a - 1);
  const rhs = (a - c) * x + b;
  return q('twoStepEquations', `${a}x + ${b} = ${c}x + ${rhs}. Find x.`, x, 'Collect x-terms on one side.');
}

function y7GenInequalities(){
  const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,7):randInt(1,9);
  if(t===1){const a=randInt(2,12),boundary=randInt(-5,15);return q('inequalities',`x + ${a} > ${boundary+a}. Boundary value = ?`,boundary,'Subtract the constant from both sides.');}
  if(t===2){const a=randInt(2,8),limit=randInt(2,12);return q('inequalities',`${a}x ≤ ${a*limit}. Greatest integer solution = ?`,limit,'Divide by the positive coefficient.');}
  if(t===3){const a=randInt(2,8),limit=randInt(-5,12),b=randInt(1,12);return q('inequalities',`${a}x + ${b} ≥ ${a*limit+b}. Smallest integer solution = ?`,limit,'Subtract, then divide.');}
  if(t===4){const boundary=randInt(2,8);return q('inequalities',`How many integers from 0 to 10 satisfy x ≥ ${boundary}?`,11-boundary,'Count from the boundary through 10.');}
  if(t===5){const low=randInt(-6,0),high=randInt(2,9);return q('inequalities',`How many integers satisfy ${low} ≤ x < ${high}?`,high-low,'List from the lower bound to one below the upper bound.');}
  if(t===6){const a=-randInt(2,6),boundary=randInt(-5,10);return q('inequalities',`${a}x < ${a*boundary}. Smallest integer solution = ?`,boundary+1,'Dividing by a negative reverses the inequality.');}
  if(t===7){const a=randInt(2,6),b=randInt(-8,8),test=randInt(-6,12),boundary=randInt(-4,10),rhs=a*boundary+b,ok=a*test+b>=rhs;return q('inequalities',`Does x=${test} satisfy ${a}x ${b>=0?'+':'−'} ${Math.abs(b)} ≥ ${rhs}? Enter 1 for Yes, 0 for No.`,ok?1:0,'Substitute and compare.');}
  if(t===8){const a=-randInt(2,5),b=randInt(-6,6),boundary=randInt(-5,8),rhs=a*boundary+b;return q('inequalities',`${a}x ${b>=0?'+':'−'} ${Math.abs(b)} ≥ ${rhs}. Boundary value = ?`,boundary,'Solve the matching equation; reverse the inequality direction.');}
  const low=randInt(-8,2),high=randInt(low+3,10);return q('inequalities',`How many integers satisfy ${low} < x < ${high}?`,high-low-1,'Count the integers strictly between the endpoints.');
}

function y7GenCoordinates(){
  const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,7):randInt(1,9);
  if(t===1){const x=pick([-6,-5,-4,-3,3,4,5,6]),y=pick([-7,-5,-3,3,5,7]),quad=x>0&&y>0?1:x<0&&y>0?2:x<0&&y<0?3:4;return q('coordinates',`Point (${x}, ${y}) is in which quadrant? Enter 1, 2, 3 or 4.`,quad,'Use the signs of x and y.');}
  if(t===2){const horizontal=chance(.5),a=randInt(-8,4),b=randInt(a+2,10),fixed=randInt(-6,6);return q('coordinates',horizontal?`Distance between (${a}, ${fixed}) and (${b}, ${fixed}) = ?`:`Distance between (${fixed}, ${a}) and (${fixed}, ${b}) = ?`,b-a,'Subtract the changing coordinates.');}
  if(t===3){const x1=randInt(-8,4),x2=x1+2*randInt(1,6),y1=randInt(-8,4),y2=y1+2*randInt(1,6),ask=chance(.5);return q('coordinates',`Midpoint of (${x1}, ${y1}) and (${x2}, ${y2}). ${ask?'x':'y'}-coordinate = ?`,ask?(x1+x2)/2:(y1+y2)/2,'Average the matching coordinates.');}
  if(t===4){const m=pick([-3,-2,-1,1,2,3,4]),x1=randInt(-4,4),y1=randInt(-5,5),dx=pick([1,2,3]),x2=x1+dx,y2=y1+m*dx;return q('coordinates',`Slope through (${x1}, ${y1}) and (${x2}, ${y2}) = ?`,m,'Slope = change in y ÷ change in x.');}
  if(t===5){const m=pick([-4,-3,-2,2,3,4]),c=randInt(-8,8),x=randInt(-5,7);return q('coordinates',`For y = ${m}x ${c>=0?'+':'−'} ${Math.abs(c)}, find y when x=${x}.`,m*x+c,'Substitute x.');}
  if(t===6){const m=pick([-5,-3,-2,2,3,5]),c=randInt(-12,12);return q('coordinates',`y = ${m}x ${c>=0?'+':'−'} ${Math.abs(c)}. y-intercept = ?`,c,'The y-intercept is the constant term.');}
  if(t===7){const x=randInt(-8,8),y=randInt(-8,8),dx=randInt(-5,5),dy=randInt(-5,5),ask=chance(.5);return q('coordinates',`Translate (${x}, ${y}) by (${dx}, ${dy}). New ${ask?'x':'y'}-coordinate = ?`,ask?x+dx:y+dy,'Add the translation vector.');}
  if(t===8){const m=pick([2,3,4,5]),c=randInt(-8,8),x=randInt(-4,8),y=m*x+c;return q('coordinates',`On y = ${m}x ${c>=0?'+':'−'} ${Math.abs(c)}, y=${y}. Find x.`,x,'Subtract the intercept, then divide by the slope.');}
  const m=pick([-4,-3,-2,-1,1,2,3,4]);return q('coordinates',`A line is parallel to a line with slope ${m}. Its slope = ?`,m,'Parallel lines have equal slopes.');
}

function y7GenPythagoras(){
  const L=state.level,t=L==='starter'?randInt(1,3):L==='core'?randInt(1,6):randInt(1,8),triple=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25],[9,12,15],[12,16,20]]);
  if(t===1){return q('pythagoras',`Right triangle legs ${triple[0]} cm and ${triple[1]} cm. Hypotenuse = ? cm`,triple[2],'Use a² + b² = c².');}
  if(t===2){return q('pythagoras',`Right triangle hypotenuse ${triple[2]} cm and one leg ${triple[0]} cm. Other leg = ? cm`,triple[1],'Use c² − a² = b².');}
  if(t===3){return q('pythagoras',`Right triangle hypotenuse ${triple[2]} cm and one leg ${triple[1]} cm. Other leg = ? cm`,triple[0],'Subtract the known square from the hypotenuse square.');}
  if(t===4){const scale=randInt(2,4);return q('pythagoras',`Right triangle legs ${triple[0]*scale} cm and ${triple[1]*scale} cm. Hypotenuse = ? cm`,triple[2]*scale,'Recognise the scaled Pythagorean triple.');}
  if(t===5){const yes=chance(.5),sides=yes?triple:[triple[0],triple[1],triple[2]+1];return q('pythagoras',`Do sides ${sides[0]}, ${sides[1]}, ${sides[2]} form a right triangle? Enter 1 for Yes, 0 for No.`,yes?1:0,'Check whether a² + b² = c².');}
  if(t===6){const l=triple[0],w=triple[1];return q('pythagoras',`A rectangle is ${l} cm by ${w} cm. Its diagonal = ? cm`,triple[2],'The diagonal is the hypotenuse.');}
  if(t===7){const scale=randInt(2,4);return q('pythagoras',`A ladder reaches ${triple[1]*scale} m up a wall and its foot is ${triple[0]*scale} m from the wall. Ladder length = ? m`,triple[2]*scale,'Wall and ground form a right angle.');}
  const a=pick([1,2,3,4]),b=pick([1,2,3,4]);return q('pythagoras',`A right triangle has legs ${a*3} and ${a*4}. Its hypotenuse = ?`,a*5,'Recognise a scaled 3–4–5 triangle.');
}

function y7GenStatistics(){
  const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,7):randInt(1,9);
  if(t===1){const count=pick([4,5,6]),mean=randInt(6,18),vals=Array(count).fill(mean),change=randInt(1,Math.min(4,mean-1));vals[0]-=change;vals[1]+=change;return q('statistics',`Mean of ${vals.join(', ')} = ?`,mean,'Add and divide by the count.');}
  if(t===2){const vals=Array.from({length:7},()=>randInt(1,30));return q('statistics',`Median of ${vals.join(', ')} = ?`,median(vals),'Order the values and select the middle one.');}
  if(t===3){const mode=randInt(3,15),vals=[mode,mode,mode,mode+1,mode+3,mode+5,mode+7];for(let i=vals.length-1;i>0;i--){const j=randInt(0,i);[vals[i],vals[j]]=[vals[j],vals[i]];}return q('statistics',`Mode of ${vals.join(', ')} = ?`,mode,'Find the most frequent value.');}
  if(t===4){const low=randInt(1,15),high=randInt(low+8,low+30),vals=[low,randInt(low,high),randInt(low,high),randInt(low,high),high];return q('statistics',`Range of ${vals.join(', ')} = ?`,high-low,'Maximum − minimum.');}
  if(t===5){const count=pick([4,5,6]),mean=randInt(7,20),missing=randInt(3,25),total=count*mean;let known=[randInt(3,15),randInt(3,15)];while(known.length<count-1){known.push(randInt(3,15));}let adjust=total-missing-known.reduce((a,b)=>a+b,0);known[known.length-1]+=adjust;if(known[known.length-1]<0)return y7GenStatistics();return q('statistics',`${count} values have mean ${mean}. Known values: ${known.join(', ')}. Missing value = ?`,missing,'Total = mean × count, then subtract known values.');}
  if(t===6){const q1=randInt(3,10),med=randInt(q1+2,q1+8),q3=randInt(med+2,med+10);const vals=[q1-2,q1,q1+1,med,q3-1,q3,q3+2];return q('statistics',`For the ordered data ${vals.join(', ')}, interquartile range = ?`,q3-q1,'IQR = Q3 − Q1.');}
  if(t===7){const oldMean=randInt(6,16),count=randInt(4,8),add=randInt(1,8);return q('statistics',`Every value in a data set is increased by ${add}. The mean increases by ?`,add,'Adding the same amount to every value shifts the mean equally.');}
  if(t===8){const oldMean=randInt(6,16),count=randInt(4,8),factor=randInt(2,4);return q('statistics',`Every value in a data set is multiplied by ${factor}. If the old mean is ${oldMean}, new mean = ?`,oldMean*factor,'Multiplying every value multiplies the mean.');}
  const a=randInt(4,10),b=randInt(11,16),c=randInt(17,22),d=randInt(23,28),vals=[a,b,c,d];return q('statistics',`Median of the ordered values ${vals.join(', ')} = ?`,(b+c)/2,'Average the two middle values.');
}

function y7GenProbability(){
  const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,7):randInt(1,9);
  if(t===1){const red=randInt(1,8),blue=randInt(1,8),green=randInt(1,6);return qFrac('probability',`A bag has ${red} red, ${blue} blue and ${green} green counters. P(red) = ?`,red/(red+blue+green),'Favourable outcomes ÷ total outcomes.');}
  if(t===2){const p=pick([0.15,0.2,0.25,0.35,0.4,0.6,0.65,0.75,0.8]);return q('probability',`P(A) = ${fmt(p)}. P(not A) = ?`,1-p,'Complementary probabilities add to 1.');}
  if(t===3){return qFrac('probability','A fair coin is tossed twice. P(exactly one head) = ?',1/2,'Outcomes HT and TH are favourable.');}
  if(t===4){return qFrac('probability','A fair dice is rolled twice. P(two sixes) = ?',1/36,'Multiply 1/6 × 1/6.');}
  if(t===5){const p1=pick([1/2,1/3,1/4,2/3]),p2=pick([1/2,1/3,1/4,3/4]);return qFrac('probability',`Independent events have probabilities ${toFraction(p1)} and ${toFraction(p2)}. P(both) = ?`,p1*p2,'Multiply independent probabilities.');}
  if(t===6){const red=randInt(2,6),blue=randInt(2,6),total=red+blue;return qFrac('probability',`Choose from ${red} red and ${blue} blue counters, replace it, then choose again. P(two blue) = ?`,(blue/total)**2,'With replacement, multiply the same probability twice.');}
  if(t===7){const red=randInt(2,6),blue=randInt(2,6),total=red+blue;return qFrac('probability',`Choose from ${red} red and ${blue} blue counters without replacement. P(red then blue) = ?`,red/total*blue/(total-1),'The total decreases after the first choice.');}
  if(t===8){return qFrac('probability','A fair coin is tossed and a fair dice is rolled. P(head and an even number) = ?',1/4,'Multiply 1/2 by 3/6.');}
  return qFrac('probability','Two fair dice are rolled. P(both results are even) = ?',1/4,'Each dice has probability 3/6 of being even.');
}
