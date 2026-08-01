'use strict';

/* Age, number and linear-equation problem banks.
   Split from DYAAPS.html without changing the original logic. */

function psGenAge() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const age = randInt(8, 16);
    const years = randInt(3, 12);
    return psQ('age', s,
      `A student is currently ${age} years old. How old will the student be in ${years} years?`,
      age + years,
      'Add the number of years to the current age.');
  }

  if (s === 'multi') {
    const child = randInt(8, 16);
    const multiple = randInt(3, 5);
    const parent = child * multiple;
    const years = randInt(4, 12);
    return psQ('age', s,
      `A parent is currently ${multiple} times as old as a child. In ${years} years, the sum of their ages will be ${parent + child + 2 * years}. Calculate the child’s current age.`,
      child,
      'Represent the current ages using the stated multiple and use the future sum.');
  }

  const child = randInt(6, 14);
  const parent = randInt(32, 48);
  const futureMultiple = pick([2, 3]);
  const years = (parent - futureMultiple * child) / (futureMultiple - 1);
  if (!Number.isInteger(years) || years <= 0 || years > 25) return psGenAge();
  return psQ('age', s,
    `A parent is ${parent} years old and a child is ${child} years old. In how many years will the parent be ${futureMultiple} times as old as the child?`,
    years,
    'Add the same number of years to both ages and form an equation.');
}

function psGenNumberProblems() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const n = randInt(12, 60);
    return psQ('numberProblems', s,
      `Three consecutive integers have a middle value of ${n}. Calculate their sum.`,
      3 * n,
      'The integers are one less than, equal to, and one greater than the middle value.');
  }

  if (s === 'multi') {
    const first = randInt(8, 40);
    const sum = first + (first + 1) + (first + 2);
    return psQ('numberProblems', s,
      `The sum of three consecutive integers is ${sum}. Calculate the largest integer.`,
      first + 2,
      'Divide the sum by three to find the middle integer.');
  }

  const tens = randInt(2, 8);
  const ones = randInt(1, tens - 1);
  const number = 10 * tens + ones;
  const reversed = 10 * ones + tens;
  return psQ('numberProblems', s,
    `A two-digit number has digits whose sum is ${tens + ones}. Reversing the digits decreases the number by ${number - reversed}. Calculate the original number.`,
    number,
    'Use the digit sum together with the change caused by reversing the digits.');
}

function psGenEquations() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const x = randInt(6, 30);
    const a = randInt(2, 8);
    const b = randInt(3, 20);
    return psQ('equations', s,
      `A number is multiplied by ${a} and then increased by ${b}. The result is ${a * x + b}. Calculate the number.`,
      x,
      'Form and solve a one-variable equation.');
  }

  if (s === 'multi') {
    const notebooks = randInt(4, 12);
    const price = randInt(3, 15);
    const fixed = randInt(8, 25);
    const total = notebooks * price + fixed;
    return psQ('equations', s,
      `A delivery charge of $${fixed} is added to the cost of ${notebooks} identical notebooks. The total charge is $${total}. Calculate the price of one notebook.`,
      price,
      'Subtract the fixed charge, then divide by the number of notebooks.');
  }

  const x = randInt(4, 20);
  const a = randInt(3, 7);
  const c = randInt(1, a - 1);
  const b = randInt(4, 18);
  const d = a * x + b - c * x;
  return psQ('equations', s,
    `Two service plans have equal costs for a certain number of uses. Plan A costs $${b} plus $${a} per use. Plan B costs $${d} plus $${c} per use. For how many uses are the costs equal?`,
    x,
    'Set the two cost expressions equal and solve.');
}


function psGenComplexLinearEquations() {
  const s = chooseProblemStructure();
  const basicTypes = [3, 5, 6, 9];
  const multiTypes = [1, 2, 3, 5, 6, 7, 9, 12];
  const nonroutineTypes = [1, 2, 4, 7, 8, 10, 11, 12];
  const type = pick(
    s === 'basic'
      ? basicTypes
      : s === 'multi'
        ? multiTypes
        : nonroutineTypes
  );

  if (type === 1) {
    let childAge;
    let adultAge;
    let multiplier;
    let presentOffset;
    let years;
    let futureMultiplier;
    let futureOffset;

    do {
      childAge = randInt(9, 18);
      multiplier = pick([3, 4]);
      presentOffset = randInt(4, 14);
      years = randInt(4, 10);
      futureMultiplier = pick([2, 3]);
      adultAge = multiplier * childAge + presentOffset;
      futureOffset = adultAge + years - futureMultiplier * (childAge + years);
    } while (futureOffset < 4 || futureOffset > 35 || adultAge > 75);

    const relationship = pick([
      ['father', 'son'],
      ['father', 'daughter'],
      ['mother', 'son'],
      ['mother', 'daughter'],
      ['uncle', 'nephew'],
      ['uncle', 'niece'],
      ['aunt', 'nephew'],
      ['aunt', 'niece']
    ]);
    const adultRole = relationship[0];
    const childRole = relationship[1];

    return psQ('complexLinearEquations', s,
      `A ${adultRole}'s present age is ${presentOffset} years more than ${multiplier} times the present age of the ${childRole}. In ${years} years, the ${adultRole}'s age will be ${futureOffset} years more than ${futureMultiplier} times the ${childRole}'s age. Calculate the ${childRole}'s present age.`,
      childAge,
      'Let the younger person’s present age be x. Form one equation using the future-age relationship and solve it.');
  }

  if (type === 2) {
    const totalTickets = randInt(40, 90);
    const freeStudentTickets = randInt(2, 6);
    const adultPrice = randInt(15, 25);
    const studentPrice = randInt(8, adultPrice - 4);
    const adultTickets = randInt(12, totalTickets - freeStudentTickets - 10);
    const revenue = adultPrice * adultTickets
      + studentPrice * (totalTickets - adultTickets - freeStudentTickets);

    return psQ('complexLinearEquations', s,
      `A school event issued ${totalTickets} tickets. Adult tickets cost $${adultPrice} and student tickets cost $${studentPrice}. Of the student tickets issued, ${freeStudentTickets} were provided free of charge. The total ticket revenue was $${revenue}. Calculate the number of adult tickets issued.`,
      adultTickets,
      'Let x be the number of adult tickets. The number of paid student tickets is the total minus x and the free student tickets.');
  }

  if (type === 3) {
    const numberOfItems = randInt(2, 5);
    const discount = pick([10, 15, 20, 25, 30]);
    const multiplier = (100 - discount) / 100;
    const coupon = randInt(3, 9);
    const delivery = randInt(6, 15);
    const originalPrice = pick([40, 50, 60, 70, 75, 80, 90, 100, 120]);
    const finalPayment = round2(
      numberOfItems * (multiplier * originalPrice - coupon) + delivery
    );

    return psQ('complexLinearEquations', s,
      `A customer purchases ${numberOfItems} identical items. Each item is discounted by ${discount}%, after which a $${coupon} coupon is applied to each discounted item. A delivery charge of $${delivery} is then added. The final payment is $${fmt(finalPayment)}. Calculate the original price of one item.`,
      originalPrice,
      'Let x be the original price of one item. Apply the percentage multiplier, coupon and delivery charge in the stated order.');
  }

  if (type === 4) {
    const settings = pick([
      { markup: 40, discount: 15, net: 1.19, step: 100 },
      { markup: 50, discount: 20, net: 1.20, step: 10 },
      { markup: 30, discount: 10, net: 1.17, step: 100 },
      { markup: 25, discount: 10, net: 1.125, step: 40 }
    ]);
    const costPrice = settings.step * randInt(2, 6);
    const reduction = randInt(8, 24);
    const profit = round2((settings.net - 1) * costPrice - reduction);

    if (profit <= 0 || !Number.isInteger(profit)) {
      return psGenComplexLinearEquations();
    }

    return psQ('complexLinearEquations', s,
      `A shop marks an item up by ${settings.markup}% above its cost price. During a sale, the marked price is reduced by ${settings.discount}%, and a further $${reduction} is then deducted. The final selling price is $${profit} more than the cost price. Calculate the cost price.`,
      costPrice,
      'Let x be the cost price. Express the final selling price in terms of x and set it equal to x plus the stated profit.');
  }

  if (type === 5) {
    const width = randInt(7, 18);
    const lengthMultiplier = pick([2, 3]);
    const lengthOffset = randInt(2, 6);
    const originalLength = lengthMultiplier * width - lengthOffset;
    const lengthIncrease = randInt(3, 8);
    const widthDecrease = randInt(1, Math.min(4, width - 2));
    const newPerimeter = 2 * (
      originalLength + lengthIncrease + width - widthDecrease
    );

    return psQ('complexLinearEquations', s,
      `The length of a rectangle is ${lengthOffset} cm less than ${lengthMultiplier} times its width. The length is then increased by ${lengthIncrease} cm, while the width is decreased by ${widthDecrease} cm. The perimeter of the new rectangle is ${newPerimeter} cm. Calculate the original width.`,
      width,
      'Let the original width be x cm. Express the original length in terms of x, then use the new perimeter.');
  }

  if (type === 6) {
    let firstAngle;
    let secondAngle;
    let thirdAngle;
    let increase;
    let difference;

    do {
      firstAngle = randInt(24, 42);
      increase = randInt(6, 16);
      secondAngle = 2 * firstAngle + increase;
      thirdAngle = 180 - firstAngle - secondAngle;
      difference = secondAngle - thirdAngle;
    } while (thirdAngle <= 15 || difference <= 5);

    return psQ('complexLinearEquations', s,
      `In a triangle, the second angle is ${increase}° more than twice the first angle. The third angle is ${difference}° less than the second angle. Calculate the size of the first angle.`,
      firstAngle,
      'Let the first angle be x°. Express the other two angles in terms of x and use the angle sum of a triangle.');
  }

  if (type === 7) {
    const firstFraction = pick([[1, 4], [1, 5], [2, 5], [1, 3]]);
    const secondFraction = pick([[1, 3], [1, 4], [2, 5], [1, 2]]);
    const denominatorLCM = lcm(firstFraction[1], secondFraction[1]);
    const originalAmount = denominatorLCM * randInt(12, 30);
    const afterFirst = originalAmount * (1 - firstFraction[0] / firstFraction[1]);
    const afterSecond = afterFirst * (1 - secondFraction[0] / secondFraction[1]);
    const added = randInt(8, 25);
    const finalAmount = round2(afterSecond + added);
    const contextData = pick([
      ['water tank', 'litres'],
      ['fuel tank', 'litres'],
      ['grain silo', 'kilograms'],
      ['storage container', 'units']
    ]);
    const context = contextData[0];
    const unit = contextData[1];

    return psQ('complexLinearEquations', s,
      `A ${context} initially contains an unknown amount. First, ${firstFraction[0]}/${firstFraction[1]} of the original amount is removed. Next, ${secondFraction[0]}/${secondFraction[1]} of the remaining amount is removed. After ${added} ${unit} are added, the ${context} contains ${fmt(finalAmount)} ${unit}. Calculate the original amount.`,
      originalAmount,
      'Let the original amount be x. Apply each fraction to the correct amount, then include the quantity added.');
  }

  if (type === 8) {
    const scenario = pick([
      { first: [1, 5], second: [1, 4], target: [1, 2], step: 10 },
      { first: [1, 4], second: [1, 3], target: [2, 5], step: 10 },
      { first: [2, 5], second: [1, 3], target: [3, 8], step: 40 },
      { first: [1, 5], second: [2, 5], target: [2, 5], step: 25 },
      { first: [1, 4], second: [2, 5], target: [3, 8], step: 40 }
    ]);
    const firstFraction = scenario.first;
    const secondFraction = scenario.second;
    const targetFraction = scenario.target;
    const total = scenario.step * randInt(18, 40);
    const remainingAfterFirst = total * (1 - firstFraction[0] / firstFraction[1]);
    const remainingAfterSecond = remainingAfterFirst * (1 - secondFraction[0] / secondFraction[1]);
    const extraCompleted = round2(
      remainingAfterSecond - total * targetFraction[0] / targetFraction[1]
    );
    const context = pick([
      { noun: 'book', unit: 'pages', verb: 'read' },
      { noun: 'report', unit: 'pages', verb: 'completed' },
      { noun: 'project', unit: 'tasks', verb: 'completed' },
      { noun: 'training programme', unit: 'activities', verb: 'completed' }
    ]);

    return psQ('complexLinearEquations', s,
      `For a ${context.noun}, ${firstFraction[0]}/${firstFraction[1]} of the total is ${context.verb} first. Next, ${secondFraction[0]}/${secondFraction[1]} of the remaining amount is ${context.verb}. A further ${extraCompleted} ${context.unit} are then ${context.verb}, leaving ${targetFraction[0]}/${targetFraction[1]} of the original total unfinished. Calculate the original total.`,
      total,
      'Let the original total be x. Distinguish carefully between a fraction of the original total and a fraction of the remaining amount.');
  }

  if (type === 9) {
    const speedA = pick([45, 50, 55, 60, 65, 70]);
    const speedB = pick([60, 65, 70, 75, 80, 85]);
    const headStart = pick([0.5, 1, 1.5, 2]);
    const meetingTime = pick([1.5, 2, 2.5, 3, 3.5, 4]);
    const distance = round2(
      speedA * (meetingTime + headStart) + speedB * meetingTime
    );

    return psQ('complexLinearEquations', s,
      `Two vehicles travel towards each other from towns ${fmt(distance)} km apart. Vehicle A travels at ${speedA} km/h and departs ${fmt(headStart)} hours before Vehicle B. Vehicle B travels at ${speedB} km/h. Calculate the time, in hours, from the departure of Vehicle B until the vehicles meet.`,
      meetingTime,
      'Let x be the travel time of Vehicle B. Vehicle A travels for x plus the head-start time.');
  }

  if (type === 10) {
    const slowerSpeed = pick([4, 5, 6]);
    const fasterSpeed = 2 * slowerSpeed;
    const headStart = pick([1, 1.5, 2, 2.5]);
    const restTime = pick([0.5, 1]);
    const movingTime = round2(headStart + restTime);
    const slowerRole = pick(['walker', 'runner', 'maintenance vehicle']);
    const fasterRole = pick(['cyclist', 'motor scooter', 'service vehicle']);

    return psQ('complexLinearEquations', s,
      `A ${slowerRole} travels along a route at ${slowerSpeed} km/h and starts ${fmt(headStart)} hours before a ${fasterRole}. The ${fasterRole} travels at ${fasterSpeed} km/h but takes a rest of ${fmt(restTime)} hours before catching the ${slowerRole}. Calculate the number of hours for which the ${fasterRole} is actually moving before the catch-up occurs.`,
      movingTime,
      'Let x be the actual moving time of the faster traveller. The slower traveller moves during the head start, the rest period and the faster traveller’s moving time.');
  }

  if (type === 11) {
    let firstGroupSize;
    let secondGroupSize;
    let groupsBefore;
    let remainder;
    let fewerGroups;
    let studentsLeave;
    let originalStudents;

    do {
      firstGroupSize = pick([5, 6, 7]);
      secondGroupSize = pick([8, 9, 10]);
      groupsBefore = randInt(8, 16);
      remainder = randInt(1, firstGroupSize - 1);
      fewerGroups = randInt(2, 5);
      originalStudents = firstGroupSize * groupsBefore + remainder;
      studentsLeave = originalStudents
        - secondGroupSize * (groupsBefore - fewerGroups);
    } while (
      studentsLeave < 1
      || studentsLeave > 8
      || groupsBefore - fewerGroups < 2
    );

    return psQ('complexLinearEquations', s,
      `Students are first arranged into full groups of ${firstGroupSize}, with ${remainder} students left over. After ${studentsLeave} students leave, the remaining students can be arranged into full groups of ${secondGroupSize}, using ${fewerGroups} fewer groups than before. Calculate the original number of students.`,
      originalStudents,
      'Let x represent the original number of full groups. Form two expressions for the number of students and equate them after accounting for those who leave.');
  }

  const uses = randInt(8, 24);
  const fixedA = randInt(18, 35);
  const rateA = randInt(2, 5);
  const freeUses = randInt(1, 4);
  const rateB = randInt(rateA + 1, rateA + 4);
  const fixedB = fixedA + rateA * uses - rateB * (uses - freeUses);

  if (fixedB < 5 || fixedB >= fixedA) {
    return psGenComplexLinearEquations();
  }

  return psQ('complexLinearEquations', s,
    `Plan A charges a fixed fee of $${fixedA} plus $${rateA} per use. Plan B charges a fixed fee of $${fixedB}; its first ${freeUses} uses are free, and each additional use costs $${rateB}. Calculate the number of uses for which the two plans have the same total cost.`,
    uses,
    'Let x be the number of uses. For Plan B, only x minus the free uses are charged at the usage rate.');
}
