'use strict';

/* Information sufficiency, missing information, uniqueness and redundant-data reasoning. */

const INFORMATION_SUFFICIENCY_CODE_KEY =
  'Use these codes: 1 = Statement 1 alone is sufficient; 2 = Statement 2 alone is sufficient; 3 = both statements together are sufficient, but neither alone; 4 = either statement alone is sufficient; 5 = even both statements together are not sufficient.';

function informationSufficiencyQ(structure, text, answer, hint) {
  return psQ('informationSufficiency', structure, text, answer, hint);
}

function informationSufficiencyDataQ(structure, stem, statement1, statement2, answer, hint) {
  return informationSufficiencyQ(
    structure,
    `${stem} Statement 1: ${statement1} Statement 2: ${statement2} ${INFORMATION_SUFFICIENCY_CODE_KEY}`,
    answer,
    hint
  );
}

function informationSufficiencyCountMultiples(lower, upper, divisor) {
  let count = 0;

  for (let value = lower; value <= upper; value++) {
    if (value % divisor === 0) count++;
  }

  return count;
}

function psGenInformationSufficiency() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Decide whether one piece of information is sufficient.
  if (type === 1) {
    if (s === 'basic') {
      const sufficient = chance(0.5);
      const packets = randInt(4, 12);
      const perPacket = randInt(3, 10);

      return informationSufficiencyQ(
        s,
        sufficient
          ? `A shop has ${packets} sealed packets, and every packet contains ${perPacket} stickers. Is this information sufficient to determine the total number of stickers? Enter 1 for sufficient or 0 for insufficient.`
          : `A shop has ${packets} sealed packets of stickers. Is this information sufficient to determine the total number of stickers? Enter 1 for sufficient or 0 for insufficient.`,
        sufficient ? 1 : 0,
        sufficient
          ? 'The number of packets and the number in each packet determine one total.'
          : 'The number of stickers in each packet is still unknown.'
      );
    }

    if (s === 'multi') {
      const length = randInt(6, 18);
      const width = randInt(3, length - 1);
      const perimeter = 2 * (length + width);
      const sufficient = chance(0.5);

      return informationSufficiencyQ(
        s,
        sufficient
          ? `A rectangle has a perimeter of ${perimeter} cm. The length is ${length} cm. Is this information sufficient to determine its area? Enter 1 for sufficient or 0 for insufficient.`
          : `A rectangle has a perimeter of ${perimeter} cm. The length is greater than the width. Is this information sufficient to determine its area? Enter 1 for sufficient or 0 for insufficient.`,
        sufficient ? 1 : 0,
        sufficient
          ? 'Use the perimeter and the known length to find the width, then the area is fixed.'
          : 'Many different rectangles can have the stated perimeter with length greater than width.'
      );
    }

    const divisor = randInt(4, 9);
    const targetMultiple = randInt(4, 12) * divisor;
    const sufficient = chance(0.5);
    const lower = sufficient
      ? targetMultiple - randInt(1, divisor - 1)
      : targetMultiple - divisor;
    const upper = sufficient
      ? targetMultiple + randInt(1, divisor - 1)
      : targetMultiple + divisor;
    const multipleCount = informationSufficiencyCountMultiples(lower, upper, divisor);

    return informationSufficiencyQ(
      s,
      `An integer is between ${lower} and ${upper}, inclusive, and is divisible by ${divisor}. Is this information sufficient to determine the integer uniquely? Enter 1 for sufficient or 0 for insufficient.`,
      multipleCount === 1 ? 1 : 0,
      'List the multiples of the divisor in the stated interval. The information is sufficient only when exactly one value is possible.'
    );
  }

  // 2. Choose the missing information that makes a problem solvable.
  if (type === 2) {
    if (s === 'basic') {
      const rows = randInt(4, 12);

      return informationSufficiencyQ(
        s,
        `A hall has ${rows} equal rows of chairs. Which additional information is sufficient to determine the total number of chairs? Enter 1 for the number of chairs in each row, 2 for the colour of the chairs, or 3 for the name of the hall.`,
        1,
        'Total chairs equals the number of rows multiplied by the number of chairs in each row.'
      );
    }

    if (s === 'multi') {
      const fixedFee = randInt(8, 25);
      const items = randInt(5, 18);

      return informationSufficiencyQ(
        s,
        `An order contains ${items} identical items and has a fixed delivery fee of $${fixedFee}. Which additional information is sufficient to determine the total cost? Enter 1 for the cost of one item, 2 for the delivery distance, or 3 for the colour of the packaging.`,
        1,
        'The total cost is the fixed fee plus the number of items multiplied by the cost per item.'
      );
    }

    const totalDistance = randInt(120, 360);

    return informationSufficiencyQ(
      s,
      `A vehicle travelled ${totalDistance} km in two stages. The distance for the first stage is known, and the distance and speed for the second stage are known. Which additional information is sufficient to determine the average speed for the whole journey? Enter 1 for the time taken for the first stage, 2 for the fuel used, or 3 for the road name.`,
      1,
      'Average speed for the whole journey requires total distance and total time.'
    );
  }

  // 3. Classic two-statement data sufficiency with all five answer codes.
  if (type === 3) {
    const mode = randInt(1, 5);
    const x = randInt(8, 40);
    const add = randInt(3, 12);
    const multiplier = randInt(2, 7);

    if (mode === 1) {
      return informationSufficiencyDataQ(
        s,
        'What is the value of the positive integer x?',
        `x + ${add} = ${x + add}.`,
        `x is ${x % 2 === 0 ? 'even' : 'odd'}.`,
        1,
        'Statement 1 fixes one exact value. Statement 2 leaves many positive integers possible.'
      );
    }

    if (mode === 2) {
      return informationSufficiencyDataQ(
        s,
        'What is the value of the positive integer x?',
        `x is ${x % 2 === 0 ? 'even' : 'odd'}.`,
        `${multiplier}x = ${multiplier * x}.`,
        2,
        'Statement 2 fixes one exact value. Statement 1 does not.'
      );
    }

    if (mode === 3) {
      const y = randInt(3, 20);

      return informationSufficiencyDataQ(
        s,
        'What is the value of x?',
        `x + y = ${x + y}.`,
        `y = ${y}.`,
        3,
        'Neither statement alone determines x, but substituting Statement 2 into Statement 1 does.'
      );
    }

    if (mode === 4) {
      return informationSufficiencyDataQ(
        s,
        'What is the value of x?',
        `x + ${add} = ${x + add}.`,
        `${multiplier}x = ${multiplier * x}.`,
        4,
        'Each statement independently gives the same exact value of x.'
      );
    }

    return informationSufficiencyDataQ(
      s,
      'What is the value of the integer x?',
      `x > ${x - 2}.`,
      `x < ${x + 2}.`,
      5,
      'Even together, the two inequalities allow more than one integer value.'
    );
  }

  // 4. Digit and code information.
  if (type === 4) {
    if (s === 'basic') {
      const tens = randInt(2, 8);
      const ones = randInt(1, 8);

      return informationSufficiencyDataQ(
        s,
        'What is the two-digit number?',
        `Its tens digit is ${tens}.`,
        `Its ones digit is ${ones}.`,
        3,
        'Each statement fixes only one digit. Together they determine the whole number.'
      );
    }

    if (s === 'multi') {
      const ones = randInt(1, 6);
      const difference = randInt(1, 3);
      const tens = ones + difference;

      return informationSufficiencyDataQ(
        s,
        'What is the two-digit number?',
        `The sum of its digits is ${tens + ones}.`,
        `The tens digit is ${difference} greater than the ones digit.`,
        3,
        'Each condition allows several two-digit numbers. Solving the sum and difference together fixes both digits.'
      );
    }

    const hundreds = randInt(2, 8);
    const tens = randInt(1, 8);
    const ones = randInt(1, 8);

    return informationSufficiencyDataQ(
      s,
      'What is the three-digit code?',
      `Its hundreds digit is ${hundreds}, and the sum of all three digits is ${hundreds + tens + ones}.`,
      `Its tens digit is ${tens}, and its ones digit is ${ones}.`,
      3,
      'Statement 1 leaves several possible pairs for the last two digits. Statement 2 leaves the first digit unknown. Together they determine the code.'
    );
  }

  // 5. Ages and quantities.
  if (type === 5) {
    if (s === 'basic') {
      const younger = randInt(8, 18);
      const older = younger + randInt(2, 10);

      return informationSufficiencyDataQ(
        s,
        `Two siblings have a total age of ${younger + older} years. What is the younger sibling's age?`,
        `The older sibling is ${older} years old.`,
        'The older sibling is older than the younger sibling.',
        1,
        'The total and the exact older age determine the younger age. A general age comparison does not.'
      );
    }

    if (s === 'multi') {
      const younger = randInt(10, 24);
      const difference = randInt(2, 12);
      const older = younger + difference;

      return informationSufficiencyDataQ(
        s,
        `Two people have a total age of ${younger + older} years. What is the older person's age?`,
        `The older person is ${difference} years older than the younger person.`,
        `The younger person is ${younger} years old.`,
        4,
        'With the total known, either the age difference or one exact age is enough to find the older age.'
      );
    }

    const c = randInt(8, 18);
    const b = c + randInt(2, 7);
    const a = b + randInt(2, 7);

    return informationSufficiencyDataQ(
      s,
      `The ages of A, B and C total ${a + b + c} years. What is A's age?`,
      `A is ${a - b} years older than B.`,
      `B is ${b - c} years older than C.`,
      3,
      'One age difference leaves two degrees of freedom. Both differences with the total produce one set of ages.'
    );
  }

  // 6. Geometry and measurement information.
  if (type === 6) {
    if (s === 'basic') {
      const length = randInt(7, 18);
      const width = randInt(3, length - 1);
      const perimeter = 2 * (length + width);

      return informationSufficiencyDataQ(
        s,
        `A rectangle has a perimeter of ${perimeter} cm. What is its area?`,
        `Its length is ${length} cm.`,
        `Its width is ${width} cm.`,
        4,
        'The perimeter and either one side determine the other side, so either statement alone is sufficient.'
      );
    }

    if (s === 'multi') {
      const width = randInt(4, 12);
      const difference = randInt(2, 8);
      const length = width + difference;

      return informationSufficiencyDataQ(
        s,
        'What is the area of a rectangle with whole-number side lengths?',
        `Its perimeter is ${2 * (length + width)} cm.`,
        `Its length is ${difference} cm greater than its width.`,
        3,
        'The perimeter alone allows several rectangles, and the difference alone gives no scale. Together they determine both sides.'
      );
    }

    const length = randInt(10, 24);
    const width = randInt(4, length - 2);
    const area = length * width;
    const perimeter = 2 * (length + width);

    return informationSufficiencyDataQ(
      s,
      `A rectangle has area ${area} cm², and its length is greater than its width. What is its width?`,
      `Its length is ${length} cm.`,
      `Its perimeter is ${perimeter} cm.`,
      4,
      'The area with the length gives the width. The area and perimeter determine the two side lengths, and the length-greater-than-width condition identifies the width.'
    );
  }

  // 7. Ordering, positions and schedules.
  if (type === 7) {
    if (s === 'basic') {
      const aPosition = randInt(2, 7);

      return informationSufficiencyDataQ(
        s,
        'What is Bena\'s position from the front of a line?',
        `Aria is in position ${aPosition}.`,
        'Bena stands immediately after Aria.',
        3,
        'The first statement locates Aria, and the second links Bena to Aria. Both are required.'
      );
    }

    if (s === 'multi') {
      const total = randInt(12, 30);
      const fromBack = randInt(3, total - 3);

      return informationSufficiencyDataQ(
        s,
        `There are ${total} people in a line. What is Chen's position from the front?`,
        `Chen is ${fromBack}th from the back.`,
        'Chen stands somewhere after Dalia.',
        1,
        'The total number and Chen’s position from the back determine the position from the front. The relative statement does not.'
      );
    }

    const slot = randInt(2, 4);

    return informationSufficiencyDataQ(
      s,
      'Five presentations occupy time slots 1 to 5. What is the time slot of Presentation C?',
      `Presentation A is in slot ${slot - 1}.`,
      'Presentation C is immediately after Presentation A.',
      3,
      'Neither statement locates C alone. Together they place C one slot after A.'
    );
  }

  // 8. Averages, totals and missing data.
  if (type === 8) {
    if (s === 'basic') {
      const count = randInt(4, 10);
      const average = randInt(8, 25);

      return informationSufficiencyDataQ(
        s,
        `A set contains ${count} scores. What is the total of the scores?`,
        `The mean score is ${average}.`,
        `The highest score is ${average + randInt(2, 8)}.`,
        1,
        'The number of scores and the mean determine the total. The highest score does not.'
      );
    }

    if (s === 'multi') {
      const count = randInt(4, 12);
      const average = randInt(10, 30);

      return informationSufficiencyDataQ(
        s,
        'What is the total of a set of scores?',
        `The mean score is ${average}.`,
        `There are ${count} scores.`,
        3,
        'A mean without a count and a count without a mean are each insufficient. Together, total = mean × count.'
      );
    }

    const count = randInt(5, 12);
    const total = count * randInt(12, 35);

    return informationSufficiencyDataQ(
      s,
      'What is the mean of a data set?',
      `The total of all values is ${total}.`,
      `The data set contains ${count} values.`,
      3,
      'The mean requires both the total and the number of values.'
    );
  }

  // 9. Rates, costs and plan comparisons.
  if (type === 9) {
    if (s === 'basic') {
      const items = randInt(4, 15);
      const price = randInt(3, 18);

      return informationSufficiencyDataQ(
        s,
        'What is the total cost of a purchase of identical items?',
        `There are ${items} items.`,
        `Each item costs $${price}.`,
        3,
        'Both the number of items and the unit price are needed.'
      );
    }

    if (s === 'multi') {
      const fixedFee = randInt(5, 20);
      const distance = randInt(4, 18);
      const rate = randInt(2, 6);

      return informationSufficiencyDataQ(
        s,
        `A delivery charge includes a fixed fee of $${fixedFee}. What is the total delivery charge?`,
        `The delivery distance is ${distance} km.`,
        `The charge is $${rate} per kilometre.`,
        3,
        'The variable part of the charge needs both the distance and the rate; then add the known fixed fee.'
      );
    }

    const items = randInt(20, 60);
    const aFixed = randInt(10, 30);
    const aRate = randInt(3, 6);
    const bFixed = randInt(0, 15);
    const bRate = aRate + randInt(1, 3);

    return informationSufficiencyDataQ(
      s,
      `A customer must buy ${items} identical items. Which supplier is cheaper?`,
      `Supplier A charges $${aFixed} plus $${aRate} per item.`,
      `Supplier B charges $${bFixed} plus $${bRate} per item.`,
      3,
      'The total cost for both suppliers must be known before the cheaper plan can be identified.'
    );
  }

  // 10. Identify unnecessary or redundant information.
  if (s === 'basic') {
    const boxes = randInt(4, 10);
    const perBox = randInt(5, 12);

    return informationSufficiencyQ(
      s,
      `A teacher wants to find the total number of pencils. The facts are: 1. There are ${boxes} boxes. 2. Each box contains ${perBox} pencils. 3. The boxes are blue. Which fact is not needed? Enter 1, 2 or 3.`,
      3,
      'The total uses the number of boxes and pencils per box. The colour does not affect the calculation.'
    );
  }

  if (s === 'multi') {
    const distance = randInt(80, 240);
    const speed = pick([40, 50, 60, 80]);

    return informationSufficiencyQ(
      s,
      `A student wants to calculate the arrival time. The facts are: 1. The distance is ${distance} km. 2. The average speed is ${speed} km/h. 3. The journey starts at 9:00 am. 4. The vehicle is silver. Which fact is not needed? Enter 1, 2, 3 or 4.`,
      4,
      'The distance and speed give the travel time, and the starting time gives the arrival time. The vehicle colour is irrelevant.'
    );
  }

  const x = randInt(8, 30);
  const y = randInt(3, x - 1);

  return informationSufficiencyQ(
    s,
    `The values of x and y must be determined. The facts are: 1. x + y = ${x + y}. 2. x − y = ${x - y}. 3. x is positive. Which fact is redundant? Enter 1, 2 or 3.`,
    3,
    'The sum and difference equations uniquely determine x and y. The positivity statement adds no necessary information.'
  );
}
