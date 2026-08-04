'use strict';

/* Ordering, ranking, seating and scheduling constraint problem bank. */

const ORDERING_NAME_POOL = [
  'Ava', 'Ben', 'Chloe', 'Daniel', 'Ella', 'Finn',
  'Grace', 'Hugo', 'Isla', 'Jack', 'Lily', 'Noah'
];

const ORDERING_ACTIVITY_POOL = [
  'Art', 'Music', 'Science', 'History', 'Drama',
  'Coding', 'Reading', 'Sport', 'Design', 'Geography'
];

const ORDERING_TASK_POOL = [
  'Measure', 'Cut', 'Assemble', 'Paint', 'Inspect', 'Pack',
  'Label', 'Test', 'Deliver', 'Record'
];

function orderingShuffle(values) {
  const result = [...values];

  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = randInt(0, index);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function orderingOrdinalSuffix(value) {
  const number = Math.abs(Number(value));
  const lastTwo = number % 100;

  if (lastTwo >= 11 && lastTwo <= 13) return 'th';

  const last = number % 10;
  if (last === 1) return 'st';
  if (last === 2) return 'nd';
  if (last === 3) return 'rd';
  return 'th';
}

function orderingTake(pool, count) {
  return orderingShuffle(pool).slice(0, count);
}

function orderingPermutations(values) {
  if (values.length <= 1) return [values.slice()];

  const result = [];

  values.forEach((value, index) => {
    const remaining = values.slice(0, index).concat(values.slice(index + 1));

    orderingPermutations(remaining).forEach(permutation => {
      result.push([value, ...permutation]);
    });
  });

  return result;
}

function orderingPosition(order, item) {
  return order.indexOf(item) + 1;
}

function orderingImmediatelyBefore(order, first, second) {
  return order.indexOf(second) - order.indexOf(first) === 1;
}

function orderingValidOrders(items, rules) {
  return orderingPermutations(items).filter(order =>
    rules.every(rule => rule(order))
  );
}

function orderingSequence(order) {
  return order.join(' → ');
}

function orderingNumberedPlans(plans) {
  return plans
    .map((plan, index) => `Plan ${index + 1}: ${orderingSequence(plan)}`)
    .join('  ');
}

function psGenOrderingConstraints() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Positions counted from the front and the back
  if (type === 1) {
    if (s === 'basic') {
      const total = randInt(8, 22);
      const frontPosition = randInt(2, total - 1);
      const backPosition = total - frontPosition + 1;
      const name = pick(ORDERING_NAME_POOL);

      return psQ(
        'orderingConstraints',
        s,
        `${name} is ${frontPosition}${orderingOrdinalSuffix(frontPosition)} from the front of a line of ${total} students. What is ${name}'s position from the back?`,
        backPosition,
        'Subtract the position from the front from the total, then add 1.'
      );
    }

    if (s === 'multi') {
      const total = randInt(12, 28);
      const firstPosition = randInt(2, total - 6);
      const placesBehind = randInt(2, Math.min(5, total - firstPosition - 1));
      const secondPosition = firstPosition + placesBehind;
      const secondFromBack = total - secondPosition + 1;
      const names = orderingTake(ORDERING_NAME_POOL, 2);

      return psQ(
        'orderingConstraints',
        s,
        `There are ${total} runners in a race. ${names[0]} is ${firstPosition}${orderingOrdinalSuffix(firstPosition)} from the front. ${names[1]} finishes ${placesBehind} places behind ${names[0]}. What is ${names[1]}'s position from the back?`,
        secondFromBack,
        `First find ${names[1]}'s position from the front, then convert it to a position from the back.`
      );
    }

    const firstFromFront = randInt(2, 9);
    const between = randInt(2, 7);
    const secondFromBack = randInt(2, 9);
    const total = firstFromFront + between + secondFromBack;
    const names = orderingTake(ORDERING_NAME_POOL, 2);

    return psQ(
      'orderingConstraints',
      s,
      `${names[0]} is ${firstFromFront}${orderingOrdinalSuffix(firstFromFront)} from the front of a line. ${names[1]} is ${secondFromBack}${orderingOrdinalSuffix(secondFromBack)} from the back, and exactly ${between} people stand between them. ${names[0]} is in front of ${names[1]}. How many people are in the line?`,
      total,
      `Count the people up to ${names[0]}, the people between them, ${names[1]}, and the people behind ${names[1]}.`
    );
  }

  // 2. Before-and-after chains
  if (type === 2) {
    if (s === 'basic') {
      const order = orderingTake(ORDERING_NAME_POOL, 4);
      const targetIndex = randInt(0, 3);

      return psQ(
        'orderingConstraints',
        s,
        `Four students finish a quiz in different positions. ${order[0]} finishes before ${order[1]}, ${order[1]} finishes before ${order[2]}, and ${order[2]} finishes before ${order[3]}. What is ${order[targetIndex]}'s position? Enter 1 for first, 2 for second, 3 for third, or 4 for fourth.`,
        targetIndex + 1,
        'Place the four students in the only order that satisfies the complete before-and-after chain.'
      );
    }

    if (s === 'multi') {
      const order = orderingTake(ORDERING_NAME_POOL, 5);
      const clues = orderingShuffle([
        `${order[1]} is immediately after ${order[0]}`,
        `${order[2]} is after ${order[1]} but before ${order[3]}`,
        `${order[4]} is immediately after ${order[3]}`
      ]);
      const targetIndex = randInt(1, 3);

      return psQ(
        'orderingConstraints',
        s,
        `Five students stand in a line. ${clues.join('. ')}. What is ${order[targetIndex]}'s position from the front?`,
        targetIndex + 1,
        'Build the adjacent pairs first, then place the person who must lie between the two pairs.'
      );
    }

    const order = orderingTake(ORDERING_NAME_POOL, 6);
    const clues = orderingShuffle([
      `${order[0]} is first`,
      `${order[1]} is immediately after ${order[0]}`,
      `${order[2]} is after ${order[1]} but before ${order[3]}`,
      `${order[3]} is immediately before ${order[4]}`,
      `${order[5]} is last`
    ]);
    const targetIndex = randInt(2, 4);

    return psQ(
      'orderingConstraints',
      s,
      `Six competitors finish in different positions. ${clues.join('. ')}. Determine ${order[targetIndex]}'s finishing position.`,
      targetIndex + 1,
      'Use the fixed first and last positions, join the adjacent pairs, and then place the remaining competitor between them.'
    );
  }

  // 3. Immediate left/right and adjacency conditions
  if (type === 3) {
    if (s === 'basic') {
      const seats = randInt(5, 9);
      const direction = chance(0.5) ? 1 : -1;
      const firstSeat = direction === 1
        ? randInt(1, seats - 1)
        : randInt(2, seats);
      const secondSeat = firstSeat + direction;
      const names = orderingTake(ORDERING_NAME_POOL, 2);

      return psQ(
        'orderingConstraints',
        s,
        `${seats} seats are numbered from left to right. ${names[0]} sits in seat ${firstSeat}. ${names[1]} sits immediately to ${direction === 1 ? 'the right' : 'the left'} of ${names[0]}. What is ${names[1]}'s seat number?`,
        secondSeat,
        'Move one seat in the stated direction.'
      );
    }

    if (s === 'multi') {
      const seats = randInt(6, 10);
      const centreSeat = randInt(2, seats - 1);
      const occupiedSide = chance(0.5) ? -1 : 1;
      const blockedSeat = centreSeat + occupiedSide;
      const answerSeat = centreSeat - occupiedSide;
      const names = orderingTake(ORDERING_NAME_POOL, 3);

      return psQ(
        'orderingConstraints',
        s,
        `${seats} seats are numbered from left to right. ${names[0]} sits in seat ${centreSeat}. ${names[1]} must sit next to ${names[0]}. ${names[2]} already occupies seat ${blockedSeat}. What seat must ${names[1]} use?`,
        answerSeat,
        `There are two seats next to seat ${centreSeat}; eliminate the one already occupied.`
      );
    }

    const order = orderingTake(ORDERING_NAME_POOL, 5);
    const targetIndex = randInt(1, 4);

    return psQ(
      'orderingConstraints',
      s,
      `Five students sit in seats 1 to 5 from left to right. ${order[0]} sits at the far left. ${order[1]} sits immediately to the right of ${order[0]}. ${order[2]} sits in the middle seat. ${order[3]} sits immediately to the left of ${order[4]}. What is ${order[targetIndex]}'s seat number?`,
      targetIndex + 1,
      'Place the fixed left pair and middle student first. The remaining adjacent pair must fill the last two seats.'
    );
  }

  // 4. Counting possible positions under restrictions
  if (type === 4) {
    if (s === 'basic') {
      const seats = randInt(6, 14);

      return psQ(
        'orderingConstraints',
        s,
        `A student may sit in any one of ${seats} seats in a row, but may not sit at either end. How many seat positions are possible?`,
        seats - 2,
        'Remove the two end seats from the total number of seats.'
      );
    }

    if (s === 'multi') {
      const leftSeat = randInt(1, 4);
      const rightSeat = leftSeat + randInt(5, 9);
      const possibleCount = rightSeat - leftSeat - 3;
      const names = orderingTake(ORDERING_NAME_POOL, 3);

      return psQ(
        'orderingConstraints',
        s,
        `${names[0]} sits in seat ${leftSeat} and ${names[1]} sits in seat ${rightSeat}. ${names[2]} must sit between them but may not sit next to either of them. How many seat positions are available for ${names[2]}?`,
        possibleCount,
        `The allowed seats begin two places after seat ${leftSeat} and end two places before seat ${rightSeat}.`
      );
    }

    const leftSeat = randInt(1, 4);
    const rightSeat = leftSeat + randInt(6, 10);
    const candidates = [];

    for (let seat = leftSeat + 2; seat <= rightSeat - 2; seat++) {
      candidates.push(seat);
    }

    const reservedSeat = pick(candidates);
    const names = orderingTake(ORDERING_NAME_POOL, 3);

    return psQ(
      'orderingConstraints',
      s,
      `${names[0]} sits in seat ${leftSeat} and ${names[1]} sits in seat ${rightSeat}. ${names[2]} must sit between them, may not sit next to either student, and may not use reserved seat ${reservedSeat}. How many seat positions remain possible for ${names[2]}?`,
      candidates.length - 1,
      'List all seats strictly between the two students, remove the two adjacent seats, and then remove the reserved seat.'
    );
  }

  // 5. Timetable and task-order problems
  if (type === 5) {
    if (s === 'basic') {
      const activities = orderingTake(ORDERING_ACTIVITY_POOL, 2);
      const secondSlot = randInt(2, 4);

      return psQ(
        'orderingConstraints',
        s,
        `A school timetable has four lesson slots. ${activities[0]} is scheduled immediately before ${activities[1]}, and ${activities[1]} is in slot ${secondSlot}. In which slot is ${activities[0]}?`,
        secondSlot - 1,
        'The first lesson must be one slot earlier than the second lesson.'
      );
    }

    if (s === 'multi') {
      const activities = orderingTake(ORDERING_ACTIVITY_POOL, 5);

      return psQ(
        'orderingConstraints',
        s,
        `Five activities use slots 1 to 5. ${activities[0]} is in slot 1. ${activities[1]} is immediately after ${activities[0]}. ${activities[4]} is in slot 5. ${activities[3]} is immediately before ${activities[4]}. ${activities[2]} occurs after ${activities[1]} but before ${activities[3]}. In which slot is ${activities[2]}?`,
        3,
        'Use the two fixed adjacent pairs. Only the middle slot remains for the activity between them.'
      );
    }

    const tasks = orderingTake(ORDERING_TASK_POOL, 4);
    const rules = [
      order => orderingPosition(order, tasks[0]) < orderingPosition(order, tasks[1]),
      order => orderingImmediatelyBefore(order, tasks[2], tasks[3]),
      order => orderingPosition(order, tasks[0]) !== 1
    ];
    const validOrders = orderingValidOrders(tasks, rules);

    return psQ(
      'orderingConstraints',
      s,
      `Four one-hour tasks—${tasks.join(', ')}—must fill four consecutive time slots. ${tasks[0]} must be completed before ${tasks[1]}. ${tasks[2]} must be immediately before ${tasks[3]}. ${tasks[0]} may not be in the first slot. How many different schedules satisfy all three conditions?`,
      validOrders.length,
      'List the possible adjacent pair first, then test the remaining two tasks against the before and position conditions.'
    );
  }

  // 6. Assigning people to consecutive days
  if (type === 6) {
    if (s === 'basic') {
      const names = orderingTake(ORDERING_NAME_POOL, 3);

      return psQ(
        'orderingConstraints',
        s,
        `Three students present on Monday, Tuesday and Wednesday, one per day. ${names[0]} presents before ${names[1]}, and ${names[1]} presents before ${names[2]}. On which day does ${names[1]} present? Enter Monday = 1, Tuesday = 2, Wednesday = 3.`,
        2,
        'The student between the other two must present on the middle day.'
      );
    }

    if (s === 'multi') {
      const names = orderingTake(ORDERING_NAME_POOL, 4);

      return psQ(
        'orderingConstraints',
        s,
        `Four students present from Monday to Thursday, one per day. ${names[0]} presents on Monday. ${names[3]} presents on Thursday. ${names[2]} presents immediately before ${names[3]}. ${names[1]} presents after ${names[0]} but before ${names[2]}. On which day does ${names[1]} present? Enter Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4.`,
        2,
        'Fix Monday and Thursday, place the student immediately before Thursday, then use the remaining day.'
      );
    }

    const names = orderingTake(ORDERING_NAME_POOL, 5);

    return psQ(
      'orderingConstraints',
      s,
      `Five students present from Monday to Friday, one per day. ${names[0]} presents on Monday. ${names[1]} presents immediately after ${names[0]}. ${names[4]} presents on Friday. ${names[3]} presents immediately before ${names[4]}. ${names[2]} presents after ${names[1]} but before ${names[3]}. On which day does ${names[2]} present? Enter Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5.`,
      3,
      'The Monday–Tuesday pair and Thursday–Friday pair leave only Wednesday for the remaining student.'
    );
  }

  // 7. Counting valid arrangements
  if (type === 7) {
    if (s === 'basic') {
      const items = orderingTake(ORDERING_NAME_POOL, 3);
      const rules = [
        order => orderingPosition(order, items[0]) < orderingPosition(order, items[1])
      ];
      const validOrders = orderingValidOrders(items, rules);

      return psQ(
        'orderingConstraints',
        s,
        `Three students—${items.join(', ')}—stand in a line. ${items[0]} must stand before ${items[1]}. How many different orders are possible?`,
        validOrders.length,
        'List all arrangements, then keep only those in which the required student appears first.'
      );
    }

    if (s === 'multi') {
      const items = orderingTake(ORDERING_NAME_POOL, 4);
      const rules = [
        order => orderingPosition(order, items[0]) < orderingPosition(order, items[1]),
        order => [1, 4].includes(orderingPosition(order, items[2]))
      ];
      const validOrders = orderingValidOrders(items, rules);

      return psQ(
        'orderingConstraints',
        s,
        `Four students—${items.join(', ')}—stand in a line. ${items[0]} must stand before ${items[1]}, and ${items[2]} must stand at one of the two ends. How many different orders satisfy both conditions?`,
        validOrders.length,
        'Consider each possible end position for the fixed student, then count orders that also satisfy the before condition.'
      );
    }

    const items = orderingTake(ORDERING_NAME_POOL, 5);
    const rules = [
      order => Math.abs(orderingPosition(order, items[0]) - orderingPosition(order, items[1])) !== 1,
      order => orderingPosition(order, items[2]) < orderingPosition(order, items[3]),
      order => ![1, 5].includes(orderingPosition(order, items[4]))
    ];
    const validOrders = orderingValidOrders(items, rules);

    return psQ(
      'orderingConstraints',
      s,
      `Five students—${items.join(', ')}—stand in a line. ${items[0]} and ${items[1]} may not stand next to each other. ${items[2]} must stand before ${items[3]}. ${items[4]} may not stand at either end. How many different orders satisfy all the conditions?`,
      validOrders.length,
      "Count systematically by fixing the restricted student's position, then apply the non-adjacent and before conditions."
    );
  }

  // 8. Selecting the only feasible plan
  if (type === 8) {
    const itemCount = s === 'nonroutine' ? 5 : 4;
    const items = orderingTake(ORDERING_TASK_POOL, itemCount);
    let conditionText;
    let rules;

    if (s === 'basic') {
      rules = [
        order => orderingPosition(order, items[0]) < orderingPosition(order, items[1]),
        order => orderingImmediatelyBefore(order, items[2], items[3])
      ];
      conditionText = `${items[0]} must occur before ${items[1]}, and ${items[2]} must occur immediately before ${items[3]}`;
    } else if (s === 'multi') {
      rules = [
        order => orderingPosition(order, items[0]) < orderingPosition(order, items[1]),
        order => orderingImmediatelyBefore(order, items[2], items[3]),
        order => orderingPosition(order, items[0]) !== 1
      ];
      conditionText = `${items[0]} must occur before ${items[1]}, ${items[2]} must occur immediately before ${items[3]}, and ${items[0]} may not be first`;
    } else {
      rules = [
        order => orderingPosition(order, items[0]) < orderingPosition(order, items[1]),
        order => orderingImmediatelyBefore(order, items[2], items[3]),
        order => ![1, 5].includes(orderingPosition(order, items[4])),
        order => orderingPosition(order, items[1]) > orderingPosition(order, items[4])
      ];
      conditionText = `${items[0]} must occur before ${items[1]}, ${items[2]} must occur immediately before ${items[3]}, ${items[4]} may not be first or last, and ${items[1]} must occur after ${items[4]}`;
    }

    const allOrders = orderingPermutations(items);
    const validOrders = allOrders.filter(order => rules.every(rule => rule(order)));
    const invalidOrders = allOrders.filter(order => !rules.every(rule => rule(order)));

    if (validOrders.length === 0 || invalidOrders.length < 2) {
      return psGenOrderingConstraints();
    }

    const selectedPlans = orderingShuffle([
      pick(validOrders),
      ...orderingShuffle(invalidOrders).slice(0, 2)
    ]);
    const correctPlan = selectedPlans.findIndex(order =>
      rules.every(rule => rule(order))
    ) + 1;

    return psQ(
      'orderingConstraints',
      s,
      `Only one of the following plans satisfies all conditions. Conditions: ${conditionText}. ${orderingNumberedPlans(selectedPlans)}. Enter the number of the valid plan.`,
      correctPlan,
      'Check every condition against each plan and eliminate a plan as soon as one condition fails.'
    );
  }

  // 9. Earliest or latest possible positions
  if (type === 9) {
    if (s === 'basic') {
      const total = randInt(6, 12);
      const fixedPosition = randInt(1, total - 2);
      const names = orderingTake(ORDERING_NAME_POOL, 2);

      return psQ(
        'orderingConstraints',
        s,
        `${names[0]} is in position ${fixedPosition} in a queue of ${total} people. ${names[1]} must stand somewhere after ${names[0]}. What is the earliest possible position for ${names[1]}?`,
        fixedPosition + 1,
        'The earliest allowed place is immediately after the fixed person.'
      );
    }

    if (s === 'multi') {
      const leftPosition = randInt(1, 4);
      const rightPosition = leftPosition + randInt(5, 9);
      const names = orderingTake(ORDERING_NAME_POOL, 3);

      return psQ(
        'orderingConstraints',
        s,
        `${names[0]} is in position ${leftPosition} and ${names[1]} is in position ${rightPosition}. ${names[2]} must stand after ${names[0]}, before ${names[1]}, and not next to ${names[0]}. What is the earliest possible position for ${names[2]}?`,
        leftPosition + 2,
        'Move past the fixed person and the seat immediately next to that person.'
      );
    }

    const leftPosition = randInt(1, 4);
    const rightPosition = leftPosition + randInt(6, 10);
    const candidates = [];

    for (let position = leftPosition + 2; position <= rightPosition - 2; position++) {
      candidates.push(position);
    }

    const reservedPosition = pick(candidates);
    const allowed = candidates.filter(position => position !== reservedPosition);
    const names = orderingTake(ORDERING_NAME_POOL, 3);

    return psQ(
      'orderingConstraints',
      s,
      `${names[0]} is in position ${leftPosition} and ${names[1]} is in position ${rightPosition}. ${names[2]} must stand between them, may not stand next to either of them, and may not use reserved position ${reservedPosition}. What is the latest possible position for ${names[2]}?`,
      Math.max(...allowed),
      'List the allowed positions, remove the reserved one, and choose the greatest remaining position number.'
    );
  }

  // 10. Prerequisite and dependency order
  if (s === 'basic') {
    const tasks = orderingTake(ORDERING_TASK_POOL, 4);

    return psQ(
      'orderingConstraints',
      s,
      `Four tasks must be completed. ${tasks[0]} must be done before ${tasks[1]}, and ${tasks[1]} must be done before ${tasks[2]}. ${tasks[3]} has no restriction. What is the minimum number of tasks that must be completed before ${tasks[2]}?`,
      2,
      `Both ${tasks[0]} and ${tasks[1]} must be completed before ${tasks[2]}.`
    );
  }

  if (s === 'multi') {
    const tasks = orderingTake(ORDERING_TASK_POOL, 5);

    return psQ(
      'orderingConstraints',
      s,
      `Five tasks must be completed. Both ${tasks[0]} and ${tasks[1]} must be completed before ${tasks[2]}. Task ${tasks[2]} must be completed before ${tasks[3]}. Task ${tasks[4]} has no restriction. What is the earliest possible position for ${tasks[3]} in the work order?`,
      4,
      `Three required tasks must appear before ${tasks[3]}, so its earliest possible position is immediately after them.`
    );
  }

  const tasks = orderingTake(ORDERING_TASK_POOL, 6);

  return psQ(
    'orderingConstraints',
    s,
    `Six tasks must be completed. Both ${tasks[0]} and ${tasks[1]} must be completed before ${tasks[2]}. Both ${tasks[2]} and ${tasks[3]} must be completed before ${tasks[4]}. Task ${tasks[5]} has no restriction. What is the earliest possible position for ${tasks[4]} in the work order?`,
    5,
    `The four prerequisite tasks ${tasks[0]}, ${tasks[1]}, ${tasks[2]}, and ${tasks[3]} must all appear before ${tasks[4]}.`
  );
}
