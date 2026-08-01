'use strict';

/* Additional focused Year 8 question generators.
   Split from DYAAPS.html without changing the original logic. */

/* ===== ADDED FOCUSED YEAR 8 QUESTION GENERATORS ===== */

function y8GenReversePercentages() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);
  const percentage = pick(L === 'starter' ? [10, 20, 25, 50] : [10, 20, 25, 40, 50, 60]);

  if (t === 1) {
    const original = randInt(2, 15) * 20;
    const sale = original * (100 - percentage) / 100;
    return q('reversePercentages', `After a ${percentage}% discount, a price is $${fmt(sale)}. Original price = $?`, original, 'Divide the sale price by the percentage that remains.');
  }

  if (t === 2) {
    const original = randInt(2, 15) * 20;
    const finalValue = original * (100 + percentage) / 100;
    return q('reversePercentages', `A value increases by ${percentage}% to ${fmt(finalValue)}. Original value = ?`, original, 'The final value represents more than 100% of the original.');
  }

  if (t === 3) {
    const original = randInt(2, 18) * 20;
    const finalValue = original * (100 - percentage) / 100;
    return q('reversePercentages', `A value decreases by ${percentage}% to ${fmt(finalValue)}. Original value = ?`, original, 'The final value is the remaining percentage of the original.');
  }

  if (t === 4) {
    const remaining = pick([60, 70, 75, 80, 90]);
    const original = randInt(3, 18) * 20;
    const finalValue = original * remaining / 100;
    return q('reversePercentages', `${remaining}% of a number is ${fmt(finalValue)}. The whole number = ?`, original, 'Divide by the decimal form of the percentage.');
  }

  if (t === 5) {
    const original = randInt(4, 20) * 25;
    const finalValue = original * 1.25;
    return q('reversePercentages', `After a 25% increase, an amount is ${fmt(finalValue)}. Find the original amount.`, original, 'The final amount is 125% of the original.');
  }

  const original = randInt(4, 20) * 25;
  const finalValue = original * 0.75;
  return q('reversePercentages', `After a 25% decrease, an amount is ${fmt(finalValue)}. Find the original amount.`, original, 'The final amount is 75% of the original.');
}

function y8GenPercentageChange() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);
  const percentage = pick(L === 'starter' ? [10, 20, 25, 50] : [5, 10, 15, 20, 25, 40, 50]);
  const original = randInt(2, 18) * 20;

  if (t === 1) {
    const newValue = original * (100 + percentage) / 100;
    return q('percentageChange', `Increase ${original} by ${percentage}%.`, newValue, 'Find the percentage amount, then add it.');
  }

  if (t === 2) {
    const newValue = original * (100 - percentage) / 100;
    return q('percentageChange', `Decrease ${original} by ${percentage}%.`, newValue, 'Find the percentage amount, then subtract it.');
  }

  if (t === 3) {
    const change = original * percentage / 100;
    return q('percentageChange', `${original} increases to ${fmt(original + change)}. Percentage increase = ?%`, percentage, 'Change ÷ original × 100.');
  }

  if (t === 4) {
    const change = original * percentage / 100;
    return q('percentageChange', `${original} decreases to ${fmt(original - change)}. Percentage decrease = ?%`, percentage, 'Change ÷ original × 100.');
  }

  if (t === 5) {
    const first = pick([10, 20, 25]);
    const second = pick([10, 20, 25]);
    const after = original * (100 + first) / 100 * (100 - second) / 100;
    return q('percentageChange', `${original} increases by ${first}% then decreases by ${second}%. Final value = ?`, after, 'Apply each multiplier in order.');
  }

  const first = pick([10, 20, 25]);
  const second = pick([10, 20, 25]);
  const after = original * (100 - first) / 100 * (100 + second) / 100;
  return q('percentageChange', `${original} decreases by ${first}% then increases by ${second}%. Final value = ?`, after, 'Successive percentage changes are applied one after the other.');
}

function y8GenProfitLossDiscount() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 3) : L === 'core' ? randInt(1, 5) : randInt(1, 7);

  if (t === 1) {
    const cost = randInt(4, 20) * 10;
    const profit = randInt(1, 8) * 5;
    return q('profitLossDiscount', `An item costs $${cost} and sells for $${cost + profit}. Profit = $?`, profit, 'Selling price minus cost price.');
  }

  if (t === 2) {
    const cost = randInt(5, 20) * 10;
    const loss = randInt(1, 8) * 5;
    return q('profitLossDiscount', `An item costs $${cost} and sells for $${cost - loss}. Loss = $?`, loss, 'Cost price minus selling price.');
  }

  if (t === 3) {
    const original = randInt(3, 18) * 20;
    const discount = pick([10, 20, 25, 50]);
    return q('profitLossDiscount', `A $${original} item is discounted by ${discount}%. Sale price = $?`, original * (100 - discount) / 100, 'Subtract the discount from the original price.');
  }

  if (t === 4) {
    const cost = randInt(2, 15) * 20;
    const rate = pick([10, 20, 25, 50]);
    return q('profitLossDiscount', `Cost price $${cost}. Profit is ${rate}% of cost. Selling price = $?`, cost * (100 + rate) / 100, 'Add the profit to the cost price.');
  }

  if (t === 5) {
    const cost = randInt(2, 15) * 20;
    const rate = pick([10, 20, 25, 50]);
    return q('profitLossDiscount', `Cost price $${cost}. Loss is ${rate}% of cost. Selling price = $?`, cost * (100 - rate) / 100, 'Subtract the loss from the cost price.');
  }

  if (t === 6) {
    const cost = randInt(3, 15) * 20;
    const rate = pick([10, 20, 25, 50]);
    const sale = cost * (100 + rate) / 100;
    return q('profitLossDiscount', `An item costs $${cost} and sells for $${fmt(sale)}. Profit percentage = ?%`, rate, 'Profit ÷ cost × 100.');
  }

  const marked = randInt(4, 18) * 20;
  const discount = pick([10, 20, 25, 50]);
  const sale = marked * (100 - discount) / 100;
  return q('profitLossDiscount', `A sale price is $${fmt(sale)} after a ${discount}% discount. Marked price = $?`, marked, 'Use the percentage of the marked price that remains.');
}

function y8GenDirectInverseProportion() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);

  if (t === 1) {
    const unit = randInt(2, 12);
    const first = randInt(2, 8);
    const second = randInt(3, 12);
    return q('directInverseProportion', `${first} identical items cost $${first * unit}. ${second} items cost $?`, second * unit, 'Find the unit cost, then multiply.');
  }

  if (t === 2) {
    const k = randInt(2, 12);
    const x = randInt(2, 10);
    return q('directInverseProportion', `y is directly proportional to x and y = ${k * x} when x = ${x}. Find y when x = ${x + 3}.`, k * (x + 3), 'For direct proportion, y = kx.');
  }

  if (t === 3) {
    const workers1 = pick([2, 3, 4, 6]);
    const workers2 = pick([2, 3, 4, 6, 8, 12]);
    const constant = lcm(workers1, workers2) * randInt(2, 6);
    return q('directInverseProportion', `${workers1} workers take ${constant / workers1} hours. At the same rate, ${workers2} workers take ? hours.`, constant / workers2, 'Workers × time stays constant.');
  }

  if (t === 4) {
    const x1 = pick([2, 3, 4, 5, 6]);
    const x2 = pick([2, 3, 4, 5, 6, 8, 10]);
    const k = lcm(x1, x2) * randInt(2, 8);
    return q('directInverseProportion', `y is inversely proportional to x. If y = ${k / x1} when x = ${x1}, find y when x = ${x2}.`, k / x2, 'For inverse proportion, xy is constant.');
  }

  if (t === 5) {
    const x = randInt(2, 10);
    const k = randInt(2, 12);
    return q('directInverseProportion', `y ∝ x and y = ${k * x} when x = ${x}. Constant of proportionality k = ?`, k, 'Divide y by x.');
  }

  const x = pick([2, 3, 4, 5, 6, 8]);
  const k = x * randInt(3, 12);
  return q('directInverseProportion', `y ∝ 1/x and y = ${k / x} when x = ${x}. Constant xy = ?`, k, 'Multiply x and y.');
}

function y8GenPrimeFactorisation() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 3) : L === 'core' ? randInt(1, 5) : randInt(1, 7);
  const numbers = L === 'starter' ? [12, 18, 20, 24, 28, 30, 36, 40, 42, 45] : [48, 54, 60, 72, 75, 84, 90, 96, 108, 120, 126, 144];
  const n = pick(numbers);
  const factors = primeFactors(n);

  if (t === 1) {
    return q('primeFactorisation', `Largest prime factor of ${n} = ?`, Math.max(...factors), 'Use a factor tree or repeated division.');
  }

  if (t === 2) {
    return q('primeFactorisation', `Smallest prime factor of ${n} = ?`, Math.min(...factors), 'Test divisibility by small primes first.');
  }

  if (t === 3) {
    return q('primeFactorisation', `How many prime factors does ${n} have, counting repeats?`, factors.length, 'Count every prime in the prime factorisation.');
  }

  if (t === 4) {
    const p = pick([...new Set(factors)]);
    return q('primeFactorisation', `In the prime factorisation of ${n}, the exponent of ${p} is ?`, factors.filter(value => value === p).length, 'Count how many times that prime occurs.');
  }

  if (t === 5) {
    const p = pick([2, 3, 5]);
    const exponent = factors.filter(value => value === p).length;
    return q('primeFactorisation', `In ${n} = prime factors, how many times does ${p} divide ${n}?`, exponent, 'Repeatedly divide by the given prime.');
  }

  if (t === 6) {
    const p = pick([...new Set(factors)]);
    const exponent = factors.filter(value => value === p).length;
    const otherProduct = factors.filter(value => value !== p).reduce((a, b) => a * b, 1);
    return q('primeFactorisation', `${n} = ${p}^? × ${otherProduct}. Find ?.`, exponent, 'The exponent counts repeated copies of the prime.');
  }

  return q('primeFactorisation', `Number of different prime factors of ${n} = ?`, new Set(factors).size, 'Count distinct primes only.');
}

function y8GenHcfLcmProblems() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);
  const pairs = L === 'starter'
    ? [[8, 12], [9, 15], [10, 15], [12, 18], [14, 21], [15, 20], [16, 24], [18, 27], [20, 30], [21, 28], [24, 36], [25, 35]]
    : [[18, 30], [20, 32], [24, 40], [27, 45], [28, 42], [30, 48], [32, 56], [36, 48], [40, 60], [45, 60], [54, 72], [63, 84]];
  const [a, b] = pick(pairs);

  if (t === 1) {
    return q('hcfLcmProblems', `HCF of ${a} and ${b} = ?`, gcd(a, b), 'The HCF is the greatest shared factor.');
  }

  if (t === 2) {
    return q('hcfLcmProblems', `LCM of ${a} and ${b} = ?`, lcm(a, b), 'The LCM is the first common multiple.');
  }

  if (t === 3) {
    return q('hcfLcmProblems', `Two lights flash every ${a} seconds and ${b} seconds. They flash together again after ? seconds.`, lcm(a, b), 'Use the lowest common multiple.');
  }

  if (t === 4) {
    return q('hcfLcmProblems', `${a} red beads and ${b} blue beads are split into the greatest possible number of identical groups. Number of groups = ?`, gcd(a, b), 'Use the highest common factor.');
  }

  if (t === 5) {
    const groups = gcd(a, b);
    return q('hcfLcmProblems', `${a} apples and ${b} oranges are shared equally into the greatest number of bags. Items in each bag = ?`, a / groups + b / groups, 'Find the number of bags first, then total items per bag.');
  }

  const c = pick([6, 8, 9, 10, 12]);
  return q('hcfLcmProblems', `The LCM of ${a} and ${c} is ?`, lcm(a, c), 'List multiples or use prime factors.');
}

function y8GenExpandCoefficients() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);
  const a = randInt(2, 7);
  const b = randInt(2, 8);
  const c = randInt(1, 6);

  if (t === 1) {
    return q('expandCoefficients', `In ${a}(${b}x + ${c}), the coefficient of x after expanding is ?`, a * b, 'Multiply the outside number by the x coefficient.');
  }

  if (t === 2) {
    return q('expandCoefficients', `In ${a}(x + ${b}), the constant term after expanding is ?`, a * b, 'Multiply the outside number by the constant.');
  }

  if (t === 3) {
    const d = randInt(1, 8);
    return q('expandCoefficients', `After simplifying ${a}(${b}x + ${c}) + ${d}x, coefficient of x = ?`, a * b + d, 'Expand, then combine like terms.');
  }

  if (t === 4) {
    const d = randInt(1, 6);
    return q('expandCoefficients', `After simplifying ${a}(${b}x − ${c}) − ${d}x, coefficient of x = ?`, a * b - d, 'Expand both x terms and combine them.');
  }

  if (t === 5) {
    const d = randInt(1, 6);
    const e = randInt(1, 7);
    return q('expandCoefficients', `In (${a}x + ${b})(${d}x + ${e}), coefficient of x = ?`, a * e + b * d, 'The x terms come from the outer and inner products.');
  }

  const d = randInt(1, 6);
  const e = randInt(1, 7);
  return q('expandCoefficients', `In (${a}x − ${b})(${d}x + ${e}), coefficient of x = ?`, a * e - b * d, 'Combine the two products that contain one x.');
}

function y8GenFactorCommon() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);
  const g = randInt(2, 9);
  const a = randInt(2, 8);
  const b = randInt(2, 9);

  if (t === 1) {
    return q('factorCommon', `Greatest numerical common factor of ${g * a}x and ${g * b} = ?`, g, 'Find the HCF of the coefficients.');
  }

  if (t === 2) {
    return q('factorCommon', `${g * a}x + ${g * b} = ${g}(?x + ${b}). Find ?.`, a, 'Divide the x coefficient by the common factor.');
  }

  if (t === 3) {
    return q('factorCommon', `${g * a}x − ${g * b} = ${g}(?x − ${b}). Find ?.`, a, 'Divide every term by the common factor.');
  }

  if (t === 4) {
    const p = randInt(2, 4);
    const qPower = randInt(1, p);
    return q('factorCommon', `Highest common power of x in ${g * a}x^${p} + ${g * b}x^${qPower} is x^?.`, Math.min(p, qPower), 'Use the smaller exponent shared by both terms.');
  }

  if (t === 5) {
    const c = randInt(2, 8);
    return q('factorCommon', `After factorising ${g * a}x^2 + ${g * b}x, the coefficient of x inside the bracket is ?`, a, `Factor out ${g}x.`);
  }

  const c = randInt(2, 6);
  return q('factorCommon', `Greatest numerical common factor of ${g * a}x^2, ${g * b}x and ${g * c} = ?`, gcd(g * a, gcd(g * b, g * c)), 'Find the HCF of all three coefficients.');
}

function y8GenBothSidesEquations() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);
  const x = randInt(L === 'challenge' ? -8 : 1, 12);
  let a = randInt(3, 9);
  let c = randInt(1, a - 1);
  const b = randInt(-10, 15);
  const d = (a - c) * x + b;
  const signed = n => n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`;

  if (t === 1) {
    return q('bothSidesEquations', `${a}x ${signed(b)} = ${c}x ${signed(d)}. Find x.`, x, 'Collect x terms on one side and constants on the other.');
  }

  if (t === 2) {
    const positiveB = randInt(1, 12);
    const right = (a - c) * x + positiveB;
    return q('bothSidesEquations', `${a}x + ${positiveB} = ${c}x + ${right}. Find x.`, x, 'Subtract the smaller x term first.');
  }

  if (t === 3) {
    const p = randInt(2, 6);
    const qv = randInt(1, 8);
    const rightConst = p * qv + (p - c) * x;
    return q('bothSidesEquations', `${p}(x + ${qv}) = ${c}x + ${rightConst}. Find x.`, x, 'Expand the bracket, then collect like terms.');
  }

  if (t === 4) {
    const p = randInt(2, 6);
    const qv = randInt(1, 8);
    const rightConst = -p * qv + (p - c) * x;
    return q('bothSidesEquations', `${p}(x − ${qv}) = ${c}x ${signed(rightConst)}. Find x.`, x, 'Expand carefully before rearranging.');
  }

  if (t === 5) {
    a = randInt(4, 10);
    c = randInt(1, a - 1);
    const leftConst = randInt(-12, 12);
    const rightConst = (a - c) * x + leftConst;
    return q('bothSidesEquations', `${a}x ${signed(leftConst)} = ${c}x ${signed(rightConst)}. Find x.`, x, 'Move variable terms and constants in opposite directions.');
  }

  const p = randInt(2, 6);
  const r = randInt(1, p - 1);
  const qv = randInt(1, 7);
  const sv = p * (x + qv) - r * x;
  return q('bothSidesEquations', `${p}(x + ${qv}) = ${r}x + ${sv}. Find x.`, x, 'Expand, collect x terms, then divide.');
}

function y8GenInequalityBoundaries() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);
  const a = randInt(2, 8);
  const boundary = randInt(-5, 12);
  const b = randInt(-8, 12);

  if (t === 1) {
    const c = a * (boundary + 1) + b;
    return q('inequalityBoundaries', `Greatest integer satisfying ${a}x ${b < 0 ? `− ${Math.abs(b)}` : `+ ${b}`} < ${c} is ?`, boundary, 'Solve the inequality, then choose the greatest integer below the boundary.');
  }

  if (t === 2) {
    const c = a * boundary + b;
    return q('inequalityBoundaries', `Smallest integer satisfying ${a}x ${b < 0 ? `− ${Math.abs(b)}` : `+ ${b}`} ≥ ${c} is ?`, boundary, 'Solve for x and include the boundary.');
  }

  if (t === 3) {
    const c = a * boundary + b;
    return q('inequalityBoundaries', `Boundary value of ${a}x ${b < 0 ? `− ${Math.abs(b)}` : `+ ${b}`} ≤ ${c} is x = ?`, boundary, 'Replace the inequality sign with equals to find the boundary.');
  }

  if (t === 4) {
    const lower = randInt(-8, 2);
    const upper = lower + randInt(3, 10);
    return q('inequalityBoundaries', `How many integers satisfy ${lower} < x ≤ ${upper}?`, upper - lower, 'List the integers greater than the lower bound up to and including the upper bound.');
  }

  if (t === 5) {
    const c = -a * boundary + b;
    return q('inequalityBoundaries', `Boundary value of −${a}x ${b < 0 ? `− ${Math.abs(b)}` : `+ ${b}`} > ${c} is x = ?`, boundary, 'Find the equality boundary; remember the sign reverses when dividing by a negative.');
  }

  const lower = randInt(-10, 0);
  const upper = lower + randInt(4, 12);
  return q('inequalityBoundaries', `How many integers satisfy ${lower} ≤ x < ${upper}?`, upper - lower, 'Include the lower bound but exclude the upper bound.');
}

function y8GenGradientMidpoint() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);

  if (t === 1) {
    const x1 = randInt(-5, 5);
    const dx = randInt(1, 5);
    const m = randInt(-4, 5);
    const y1 = randInt(-8, 8);
    return q('gradientMidpoint', `Gradient of the line through (${x1}, ${y1}) and (${x1 + dx}, ${y1 + m * dx}) = ?`, m, 'Change in y ÷ change in x.');
  }

  if (t === 2) {
    const mx = randInt(-5, 8);
    const my = randInt(-5, 8);
    const dx = randInt(1, 6);
    const dy = randInt(1, 6);
    return q('gradientMidpoint', `The midpoint of (${mx - dx}, ${my - dy}) and (${mx + dx}, ${my + dy}) has x-coordinate ?`, mx, 'Average the two x-coordinates.');
  }

  if (t === 3) {
    const mx = randInt(-5, 8);
    const my = randInt(-5, 8);
    const dx = randInt(1, 6);
    const dy = randInt(1, 6);
    return q('gradientMidpoint', `The midpoint of (${mx - dx}, ${my - dy}) and (${mx + dx}, ${my + dy}) has y-coordinate ?`, my, 'Average the two y-coordinates.');
  }

  if (t === 4) {
    const m = randInt(-5, 5);
    const c = randInt(-10, 10);
    return q('gradientMidpoint', `For y = ${m}x ${c < 0 ? `− ${Math.abs(c)}` : `+ ${c}`}, the y-intercept is ?`, c, 'The y-intercept is the constant term.');
  }

  if (t === 5) {
    const m = randInt(-6, 6);
    return q('gradientMidpoint', `A line parallel to y = ${m}x + 7 has gradient ?`, m, 'Parallel lines have equal gradients.');
  }

  const x1 = randInt(-5, 5);
  const dx = randInt(1, 5);
  const m = randInt(-4, 5);
  const y1 = randInt(-8, 8);
  return q('gradientMidpoint', `A line has gradient ${m} and passes through (${x1}, ${y1}). When x = ${x1 + dx}, y = ?`, y1 + m * dx, 'Use the gradient as change in y per unit change in x.');
}

function y8GenPolygonAngles() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 3) : L === 'core' ? randInt(1, 5) : randInt(1, 7);

  if (t === 1) {
    const a = randInt(25, 80);
    const b = randInt(25, 80);
    return q('polygonAngles', `Two angles of a triangle are ${a}° and ${b}°. Third angle = ?°`, 180 - a - b, 'Angles in a triangle total 180°.');
  }

  if (t === 2) {
    const a = randInt(60, 120);
    const b = randInt(60, 120);
    const c = randInt(60, 120);
    return q('polygonAngles', `Three angles of a quadrilateral are ${a}°, ${b}° and ${c}°. Fourth angle = ?°`, 360 - a - b - c, 'Angles in a quadrilateral total 360°.');
  }

  if (t === 3) {
    const n = randInt(5, L === 'starter' ? 8 : 12);
    return q('polygonAngles', `Interior angle sum of a ${n}-sided polygon = ?°`, (n - 2) * 180, 'Use (n − 2) × 180°.');
  }

  if (t === 4) {
    const n = pick([3, 4, 5, 6, 8, 9, 10, 12]);
    return q('polygonAngles', `Each exterior angle of a regular ${n}-gon = ?°`, 360 / n, 'Exterior angles of any polygon total 360°.');
  }

  if (t === 5) {
    const n = pick([3, 4, 5, 6, 8, 9, 10, 12]);
    return q('polygonAngles', `Each interior angle of a regular ${n}-gon = ?°`, 180 - 360 / n, 'Interior and exterior angles on a straight line total 180°.');
  }

  if (t === 6) {
    const exterior = pick([30, 36, 40, 45, 60, 72, 90, 120]);
    return q('polygonAngles', `A regular polygon has exterior angle ${exterior}°. Number of sides = ?`, 360 / exterior, 'Number of sides = 360 ÷ exterior angle.');
  }

  const angle = randInt(35, 145);
  return q('polygonAngles', `Two parallel lines are cut by a transversal. An alternate interior angle is ${angle}°. The matching alternate angle = ?°`, angle, 'Alternate interior angles are equal.');
}

function y8GenPythagorasFocused() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 3) : randInt(1, 5);
  const triples = L === 'starter'
    ? [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [10, 24, 26], [12, 16, 20], [15, 20, 25]]
    : [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15], [10, 24, 26], [12, 16, 20], [15, 20, 25]];
  const [a, b, c] = pick(triples);

  if (t === 1) {
    return q('pythagorasFocused', `Right triangle legs ${a} cm and ${b} cm. Hypotenuse = ? cm`, c, 'Use a² + b² = c².');
  }

  if (t === 2) {
    return q('pythagorasFocused', `Right triangle hypotenuse ${c} cm and one leg ${a} cm. Other leg = ? cm`, b, 'Subtract the square of the known leg from the hypotenuse squared.');
  }

  if (t === 3) {
    const scale = randInt(2, 4);
    return q('pythagorasFocused', `A right triangle has legs ${a * scale} cm and ${b * scale} cm. Hypotenuse = ? cm`, c * scale, 'Recognise a scaled Pythagorean triple.');
  }

  if (t === 4) {
    return q('pythagorasFocused', `A rectangle is ${a} cm by ${b} cm. Its diagonal = ? cm`, c, 'The diagonal is the hypotenuse of a right triangle.');
  }

  const shownC = chance(0.5) ? c : c + pick([1, 2]);
  const isRight = a * a + b * b === shownC * shownC ? 1 : 0;
  return q('pythagorasFocused', `Do side lengths ${a}, ${b}, ${shownC} form a right triangle? Enter 1 for yes or 0 for no.`, isRight, 'Check whether the two smaller squares add to the largest square.');
}

function y8GenMissingStatistics() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 2) : L === 'core' ? randInt(1, 4) : randInt(1, 6);

  if (t === 1) {
    const count = randInt(4, 7);
    const meanValue = randInt(6, 20);
    const total = meanValue * count;
    const missing = randInt(2, Math.max(2, Math.min(meanValue * 2, total - 2 * (count - 1))));
    const known = [];
    let remaining = total - missing;

    for (let i = 0; i < count - 2; i++) {
      const placesLeft = count - 2 - i;
      const maximum = remaining - 2 * placesLeft;
      const value = randInt(2, Math.max(2, Math.min(maximum, meanValue * 2)));
      known.push(value);
      remaining -= value;
    }

    known.push(remaining);
    return q('missingStatistics', `The mean of ${known.join(', ')}, x is ${meanValue}. Find x.`, missing, 'Total = mean × number of values.');
  }

  if (t === 2) {
    const count = randInt(4, 8);
    const meanValue = randInt(5, 20);
    return q('missingStatistics', `${count} values have mean ${meanValue}. Their total = ?`, count * meanValue, 'Total = mean × number of values.');
  }

  if (t === 3) {
    const count = randInt(3, 7);
    const oldMean = randInt(5, 15);
    const newMean = oldMean + randInt(1, 4);
    const added = newMean * (count + 1) - oldMean * count;
    return q('missingStatistics', `${count} values have mean ${oldMean}. After adding ${added}, the new mean = ?`, newMean, 'Add the new value to the old total, then divide by the new count.');
  }

  if (t === 4) {
    const count = randInt(4, 8);
    const oldMean = randInt(8, 20);
    const newMean = oldMean + pick([-2, -1, 1, 2]);
    const removed = oldMean * count - newMean * (count - 1);
    return q('missingStatistics', `${count} values have mean ${oldMean}. One value, ${removed}, is removed. New mean = ?`, newMean, 'Subtract the removed value from the total, then divide by one fewer value.');
  }

  if (t === 5) {
    const minimum = randInt(2, 20);
    const range = randInt(5, 25);
    return q('missingStatistics', `A data set has minimum ${minimum} and range ${range}. Maximum = ?`, minimum + range, 'Maximum = minimum + range.');
  }

  const middle1 = randInt(5, 18);
  const middle2 = middle1 + pick([2, 4, 6, 8]);
  const values = [randInt(1, middle1), middle1, middle2, randInt(middle2, middle2 + 12)].sort((a, b) => a - b);
  return q('missingStatistics', `For ordered data ${values.join(', ')}, median = ?`, (values[1] + values[2]) / 2, 'For four values, average the middle two.');
}

function y8GenTwoStepProbability() {
  const L = state.level;
  const t = L === 'starter' ? randInt(1, 3) : L === 'core' ? randInt(1, 5) : randInt(1, 7);

  if (t === 1) {
    const target = pick(['two heads', 'two tails']);
    return qFrac('twoStepProbability', `A fair coin is tossed twice. Probability of ${target} = ?`, 1 / 4, 'Multiply 1/2 by 1/2.');
  }

  if (t === 2) {
    return qFrac('twoStepProbability', 'A fair coin is tossed twice. Probability of one head and one tail, in any order = ?', 1 / 2, 'There are two successful outcomes out of four equally likely outcomes.');
  }

  if (t === 3) {
    const successful = randInt(1, 5);
    const total = randInt(successful + 1, 8);
    return qFrac('twoStepProbability', `A spinner has ${total} equal sections, ${successful} are blue. It is spun twice. Probability of blue both times = ?`, (successful / total) ** 2, 'Multiply the probability of blue by itself.');
  }

  if (t === 4) {
    const red = randInt(1, 5);
    const blue = randInt(1, 5);
    const total = red + blue;
    return qFrac('twoStepProbability', `A bag has ${red} red and ${blue} blue counters. Two draws are made with replacement. Probability of two red counters = ?`, (red / total) ** 2, 'With replacement, multiply the same probability twice.');
  }

  if (t === 5) {
    const red = randInt(2, 6);
    const blue = randInt(1, 5);
    const total = red + blue;
    return qFrac('twoStepProbability', `A bag has ${red} red and ${blue} blue counters. Two draws are made without replacement. Probability of two red counters = ?`, red / total * (red - 1) / (total - 1), 'The total and red count both decrease after the first red draw.');
  }

  if (t === 6) {
    const face = randInt(1, 6);
    return qFrac('twoStepProbability', `A fair dice is rolled twice. Probability of getting ${face} both times = ?`, 1 / 36, 'Multiply 1/6 by 1/6.');
  }

  const failNumerator = pick([1, 2, 3]);
  const denominator = pick([4, 5, 6]);
  const fail = failNumerator / denominator;
  return qFrac('twoStepProbability', `The probability of failure on one independent attempt is ${failNumerator}/${denominator}. Probability of at least one success in two attempts = ?`, 1 - fail ** 2, 'Use 1 − P(two failures).');
}
