'use strict';

/* Statistics, probability, logic, optimisation and modelling.
   Split from DYAAPS.html without changing the original logic. */

function psGenStatistics() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const mean = randInt(8, 20);
    const values = [mean - 4, mean - 1, mean, mean + 2, mean + 3];
    return psQ('statistics', s,
      `Calculate the mean of the values ${values.join(', ')}.`,
      mean,
      'Add the values and divide by the number of values.');
  }

  if (s === 'multi') {
    const count = pick([5, 6, 8, 10]);
    const mean = randInt(10, 24);
    const missing = randInt(6, 30);
    const known = [];
    let remaining = count * mean - missing;
    for (let i = 0; i < count - 2; i++) {
      const value = randInt(5, Math.max(6, Math.floor(remaining / (count - 1 - i))));
      known.push(value);
      remaining -= value;
    }
    known.push(remaining);
    if (known.some(v => v < 0 || v > 60)) return psGenStatistics();
    return psQ('statistics', s,
      `${count} values have a mean of ${mean}. The known values are ${known.join(', ')}. Calculate the missing value.`,
      missing,
      'Find the required total and subtract the sum of the known values.');
  }

  if (chance(0.5)) {
    const n1 = pick([4, 5, 6, 8]);
    const n2 = pick([3, 4, 5, 6]);
    const m1 = randInt(10, 20);
    const m2 = randInt(20, 30);
    const combined = (n1 * m1 + n2 * m2) / (n1 + n2);
    if (!Number.isInteger(combined) && combined * 2 !== Math.round(combined * 2)) return psGenStatistics();
    return psQ('statistics', s,
      `Group A contains ${n1} values with a mean of ${m1}. Group B contains ${n2} values with a mean of ${m2}. Calculate the mean of all the values combined.`,
      combined,
      'Find each group total, add the totals, and divide by the combined number of values.');
  }

  const oldMean = randInt(10, 20);
  const count = randInt(5, 10);
  const increase = randInt(3, 12);
  return psQ('statistics', s,
    `A data set contains ${count} values with a mean of ${oldMean}. One value is increased by ${increase}, while all other values remain unchanged. Calculate the new mean.`,
    round2(oldMean + increase / count),
    'The total increases by the stated amount; divide this increase by the number of values.');
}

function psGenProbability() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const red = randInt(2, 8);
    const blue = randInt(2, 8);
    const green = randInt(1, 6);
    return psQFrac('probability', s,
      `A bag contains ${red} red counters, ${blue} blue counters, and ${green} green counters. One counter is selected at random. Calculate the probability that it is red.`,
      red / (red + blue + green),
      'Probability equals favourable outcomes divided by total outcomes.');
  }

  if (s === 'multi') {
    const red = randInt(2, 6);
    const blue = randInt(2, 6);
    const total = red + blue;
    return psQFrac('probability', s,
      `A bag contains ${red} red counters and ${blue} blue counters. A counter is selected, replaced, and a second counter is selected. Calculate the probability that both counters are blue.`,
      (blue / total) ** 2,
      'With replacement, multiply the same probability for each selection.');
  }

  if (chance(0.5)) {
    const red = randInt(3, 7);
    const blue = randInt(2, 6);
    const total = red + blue;
    return psQFrac('probability', s,
      `A bag contains ${red} red counters and ${blue} blue counters. Two counters are selected without replacement. Calculate the probability that one counter of each colour is selected, in any order.`,
      2 * red / total * blue / (total - 1),
      'Add the probabilities of red then blue and blue then red.');
  }

  const pA = pick([0.2, 0.25, 0.3, 0.4, 0.5]);
  const pB = pick([0.2, 0.25, 0.4, 0.5, 0.6]);
  return psQ('probability', s,
    `Two independent events have probabilities ${fmt(pA)} and ${fmt(pB)}. Calculate the probability that at least one of the events occurs.`,
    round2(1 - (1 - pA) * (1 - pB)),
    'Use the complement: subtract the probability that neither event occurs from 1.');
}

function psGenLogicConstraints() {
  const s = chooseProblemStructure();
  const namePool = ['Ava', 'Ben', 'Chloe', 'Daniel', 'Ella', 'Finn', 'Grace', 'Hugo', 'Isla', 'Jack', 'Lily', 'Noah'];
  const names = [...namePool].sort(() => Math.random() - 0.5).slice(0, 4);

  if (s === 'basic') {
    return psQ('logicConstraints', s,
      `Four students—${names[0]}, ${names[1]}, ${names[2]}, and ${names[3]}—stand in a line. ${names[0]} is before ${names[1]}. ${names[2]} is after ${names[1]}. ${names[3]} is first. What is ${names[1]}’s position? Enter 1 for first, 2 for second, 3 for third, or 4 for fourth.`,
      3,
      `Place ${names[3]} first, then use the required order ${names[0]} before ${names[1]} before ${names[2]}.`);
  }

  if (s === 'multi') {
    const subjectPool = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Geography', 'Music', 'Technology', 'Biology', 'Drama'];
    const subjects = [...subjectPool].sort(() => Math.random() - 0.5).slice(0, 5);
    return psQ('logicConstraints', s,
      `Five books are arranged from left to right. The ${subjects[3]} book is immediately to the right of the ${subjects[2]} book. The ${subjects[0]} book is at the far left. The ${subjects[1]} book is at the far right. The ${subjects[4]} book is not next to the ${subjects[0]} book. What is the position of the ${subjects[2]} book? Enter a number from 1 to 5.`,
      2,
      `Use the fixed end positions and the adjacent ${subjects[2]}–${subjects[3]} pair.`);
  }

  if (chance(0.5)) {
    const digits = [...new Set([randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9)])]
      .slice(0, 3)
      .sort((a, b) => a - b);
    if (digits.length < 3) return psGenLogicConstraints();
    const code = digits[2] * 100 + digits[1] * 10 + digits[0];
    return psQ('logicConstraints', s,
      `A three-digit code uses the digits ${digits[0]}, ${digits[1]}, and ${digits[2]} exactly once. The first digit is greater than the second digit, and the third digit is the smallest digit. What is the code?`,
      code,
      'The smallest digit must be last; then place the larger of the remaining digits first.');
  }

  return psQ('logicConstraints', s,
    `Four runners—${names[0]}, ${names[1]}, ${names[2]}, and ${names[3]}—finish a race in different positions. ${names[0]} finishes third. ${names[1]} finishes before ${names[0]}. ${names[2]} finishes after ${names[0]}. ${names[3]} does not finish first or fourth. What is ${names[3]}’s finishing position? Enter 1, 2, 3, or 4.`,
    2,
    `Use ${names[0]}’s fixed third position and the before-and-after conditions.`);
}

function psGenOptimisation() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const budget = pick([50, 60, 75, 80, 100]);
    const price = pick([6, 7, 8, 9, 12]);
    return psQ('optimisation', s,
      `A school has a budget of $${budget}. Each calculator costs $${price}. What is the greatest number of calculators the school can purchase without exceeding the budget?`,
      Math.floor(budget / price),
      'Divide the budget by the unit price and take the whole-number part.');
  }

  if (s === 'multi') {
    const capacity = pick([18, 24, 30, 36]);
    const items = randInt(capacity * 3 + 1, capacity * 9 - 1);
    return psQ('optimisation', s,
      `A crate can hold at most ${capacity} items. What is the minimum number of crates required to pack ${items} items?`,
      Math.ceil(items / capacity),
      'Divide by the capacity and round up to a complete number of crates.');
  }

  const perimeter = 2 * randInt(12, 50);
  const half = perimeter / 2;
  const a = Math.floor(half / 2);
  const b = half - a;
  const context = pick(['rectangle', 'rectangular garden', 'rectangular enclosure', 'rectangular display']);
  return psQ('optimisation', s,
    `A ${context} has whole-number side lengths and a perimeter of ${perimeter} cm. Calculate the greatest possible area.`,
    a * b,
    'For a fixed perimeter, the area is greatest when the side lengths are as close as possible.');
}

function psGenModelling() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const fixed = pick([3, 4, 5, 6]);
    const rate = pick([1.5, 2, 2.5, 3]);
    const distance = randInt(4, 16);
    return psQ('modelling', s,
      `A taxi fare is modelled by the rule C = ${fixed} + ${fmt(rate)}d, where C is the fare in dollars and d is the distance in kilometres. Calculate the fare for a journey of ${distance} km.`,
      fixed + rate * distance,
      'Substitute the journey distance into the model.');
  }

  if (s === 'multi') {
    const fixed = pick([10, 12, 15, 18]);
    const rate = pick([0.2, 0.25, 0.3, 0.4]);
    const usage = pick([50, 80, 100, 120, 150]);
    return psQ('modelling', s,
      `A monthly service cost is modelled by C = ${fixed} + ${fmt(rate)}u, where u is the number of units used. A customer uses ${usage} units and receives a $5 credit. Calculate the final monthly charge.`,
      round2(fixed + rate * usage - 5),
      'Use the model to find the original charge, then subtract the credit.');
  }

  const fixedA = pick([20, 25, 30, 35]);
  const rateA = pick([2, 3, 4, 5]);
  const rateB = randInt(1, rateA - 1);
  const x = randInt(8, 24);
  const fixedB = fixedA + (rateA - rateB) * x;
  return psQ('modelling', s,
    `Company A models its charge by A = ${fixedA} + ${rateA}n. Company B models its charge by B = ${fixedB} + ${rateB}n, where n is the number of units. For what value of n are the charges equal?`,
    x,
    'Set the two models equal and solve for n.');
}
