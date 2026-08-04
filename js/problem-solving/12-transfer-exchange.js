'use strict';

/* Transfer, exchange, redistribution and reverse-reasoning problem bank. */

const TRANSFER_NAME_POOL = [
  'Ava', 'Ben', 'Chloe', 'Daniel', 'Ella', 'Finn',
  'Grace', 'Hugo', 'Isla', 'Jack', 'Lily', 'Noah'
];

const TRANSFER_ITEM_POOL = [
  'counters', 'stickers', 'cards', 'marbles', 'tokens',
  'books', 'pencils', 'beads', 'shells', 'coins'
];

function transferTake(pool, count) {
  const copy = [...pool];

  for (let index = copy.length - 1; index > 0; index--) {
    const swapIndex = randInt(0, index);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy.slice(0, count);
}

function transferPair() {
  return transferTake(TRANSFER_NAME_POOL, 2);
}

function transferTriple() {
  return transferTake(TRANSFER_NAME_POOL, 3);
}

function transferItem() {
  return pick(TRANSFER_ITEM_POOL);
}


function transferRound2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function transferQ(structure, text, answer, hint) {
  const wholeNumberAnswer = Number.isInteger(answer);
  const checkedAnswer = wholeNumberAnswer ? answer : transferRound2(answer);
  const checkedText = wholeNumberAnswer
    ? text
    : `${text} Give your answer to 2 decimal places.`;

  return psQ('transferExchange', structure, checkedText, checkedAnswer, hint);
}

function psGenTransferExchange() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. A direct transfer and the resulting amount
  if (type === 1) {
    const [first, second] = transferPair();
    const item = transferItem();

    if (s === 'basic') {
      const firstStart = randInt(12, 40);
      const secondStart = randInt(5, 28);
      const moved = randInt(2, Math.min(10, firstStart - 2));
      const askReceiver = chance(0.55);
      const answer = askReceiver ? secondStart + moved : firstStart - moved;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. ${first} gives ${moved} ${item} to ${second}. How many ${item} does ${askReceiver ? second : first} have now?`,
        answer,
        askReceiver ? 'Add the transferred amount to the receiver.' : 'Subtract the transferred amount from the giver.'
      );
    }

    if (s === 'multi') {
      const firstStart = randInt(24, 55);
      const secondStart = randInt(8, 35);
      const moved = randInt(4, Math.min(15, firstStart - 5));
      const difference = Math.abs((firstStart - moved) - (secondStart + moved));

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. ${first} gives ${moved} ${item} to ${second}. What is the difference between their new amounts?`,
        difference,
        'Find both new amounts, then subtract the smaller amount from the larger amount.'
      );
    }

    const firstStart = randInt(30, 70);
    const secondStart = randInt(10, 45);
    const moved = randInt(5, Math.min(18, firstStart - 8));
    const extra = randInt(2, 10);
    const firstFinal = firstStart - moved + extra;
    const secondFinal = secondStart + moved;
    const answer = Math.abs(firstFinal - secondFinal);

    return transferQ(
        s,
      `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. ${first} gives ${moved} ${item} to ${second}. Later, ${first} receives ${extra} more ${item} from a teacher. What is the final difference between their amounts?`,
      answer,
      'Track both amounts through each change, then compare the two final amounts.'
    );
  }

  // 2. Transfer enough to make two amounts equal
  if (type === 2) {
    const [first, second] = transferPair();
    const item = transferItem();

    if (s === 'basic') {
      const equalAmount = randInt(12, 35);
      const moved = randInt(2, 12);
      const firstStart = equalAmount + moved;
      const secondStart = equalAmount - moved;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. How many ${item} must ${first} give to ${second} so that they have the same number?`,
        moved,
        'The transfer reduces one amount and increases the other by the same number.'
      );
    }

    if (s === 'multi') {
      const total = randInt(18, 45) * 2;
      const moved = randInt(3, Math.min(15, total / 2 - 3));
      const firstStart = total / 2 + moved;
      const secondStart = total / 2 - moved;
      const equalShare = total / 2;

      return transferQ(
        s,
        `${first} and ${second} have ${total} ${item} altogether. ${first} has ${moved * 2} more ${item} than ${second}. After ${first} gives some ${item} to ${second}, they have equal amounts. How many ${item} does each person have then?`,
        equalShare,
        'The total does not change. Divide the total equally between the two people.'
      );
    }

    const finalEqual = randInt(20, 50);
    const firstGift = randInt(4, 15);
    const secondLoss = randInt(2, 9);
    const firstStart = finalEqual + firstGift;
    const secondStart = finalEqual - firstGift + secondLoss;

    return transferQ(
        s,
      `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. First, ${second} loses ${secondLoss} ${item}. Then ${first} gives some ${item} to ${second}, and they finish with equal amounts. How many ${item} does ${first} give?`,
      firstGift,
      `After the loss, compare the two amounts. Half of their difference must be transferred.`
    );
  }

  // 3. Transfer to create a stated difference
  if (type === 3) {
    const [first, second] = transferPair();
    const item = transferItem();

    if (s === 'basic') {
      const secondStart = randInt(8, 25);
      const moved = randInt(2, 9);
      const targetDifference = randInt(3, 12);
      const firstStart = secondStart + 2 * moved + targetDifference;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. ${first} gives ${moved} ${item} to ${second}. How many more ${item} does ${first} have than ${second} after the transfer?`,
        targetDifference,
        'Subtract from the giver, add to the receiver, then compare.'
      );
    }

    if (s === 'multi') {
      const targetDifference = randInt(4, 16);
      const moved = randInt(3, 12);
      const secondStart = randInt(10, 28);
      const firstStart = secondStart + targetDifference + 2 * moved;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. How many ${item} must ${first} give to ${second} so that ${first} has exactly ${targetDifference} more than ${second}?`,
        moved,
        'Each item transferred reduces the difference by 2.'
      );
    }

    const targetDifference = randInt(5, 18);
    const moved = randInt(4, 14);
    const extraToSecond = randInt(2, 8);
    const secondStart = randInt(10, 30);
    const firstStart = secondStart + extraToSecond + targetDifference + 2 * moved;

    return transferQ(
        s,
      `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. A teacher gives ${extraToSecond} extra ${item} to ${second}. How many ${item} must ${first} then give to ${second} so that ${first} has exactly ${targetDifference} more than ${second}?`,
      moved,
      'Update the receiver first. Then use the fact that each transferred item changes the difference by 2.'
    );
  }

  // 4. Two people exchange different amounts
  if (type === 4) {
    const [first, second] = transferPair();
    const item = transferItem();

    if (s === 'basic') {
      const firstStart = randInt(15, 40);
      const secondStart = randInt(12, 35);
      const givesFirst = randInt(3, 9);
      const givesSecond = randInt(1, Math.min(7, secondStart - 2));
      const answer = firstStart - givesFirst + givesSecond;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. ${first} gives ${givesFirst} ${item} to ${second}, while ${second} gives ${givesSecond} ${item} to ${first}. How many ${item} does ${first} have after the exchange?`,
        answer,
        'Subtract what the person gives and add what the person receives.'
      );
    }

    if (s === 'multi') {
      const firstStart = randInt(20, 50);
      const secondStart = randInt(20, 50);
      const givesFirst = randInt(4, 12);
      const givesSecond = randInt(3, 10);
      const firstFinal = firstStart - givesFirst + givesSecond;
      const secondFinal = secondStart - givesSecond + givesFirst;
      const answer = Math.abs(firstFinal - secondFinal);

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. ${first} gives ${givesFirst} to ${second}, and ${second} gives ${givesSecond} to ${first}. What is the difference between their final amounts?`,
        answer,
        'Find both final amounts after the two-way exchange, then compare them.'
      );
    }

    const firstStart = randInt(28, 65);
    const secondStart = randInt(18, 55);
    const givesFirst = randInt(5, 15);
    const givesSecond = randInt(3, 12);
    const firstFinal = firstStart - givesFirst + givesSecond;
    const secondFinal = secondStart - givesSecond + givesFirst;
    const largerCode = firstFinal > secondFinal ? 1 : secondFinal > firstFinal ? 2 : 3;

    return transferQ(
        s,
      `${first} starts with ${firstStart} ${item} and ${second} starts with ${secondStart}. ${first} gives ${givesFirst} to ${second}, and ${second} gives ${givesSecond} to ${first}. Who finishes with more? Enter 1 for ${first}, 2 for ${second}, or 3 if they finish equal.`,
      largerCode,
      'Calculate both final amounts before making the comparison.'
    );
  }

  // 5. A chain of transfers among three people
  if (type === 5) {
    const [first, second, third] = transferTriple();
    const item = transferItem();

    if (s === 'basic') {
      const firstStart = randInt(18, 40);
      const secondStart = randInt(10, 30);
      const thirdStart = randInt(8, 28);
      const firstMove = randInt(2, Math.min(9, firstStart - 2));
      const secondMove = randInt(2, Math.min(8, secondStart + firstMove - 2));
      const answer = thirdStart + secondMove;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item}, ${second} has ${secondStart}, and ${third} has ${thirdStart}. ${first} gives ${firstMove} to ${second}. Then ${second} gives ${secondMove} to ${third}. How many ${item} does ${third} have now?`,
        answer,
        'Only the second transfer changes the third person’s amount.'
      );
    }

    if (s === 'multi') {
      const firstStart = randInt(24, 55);
      const secondStart = randInt(15, 40);
      const thirdStart = randInt(10, 35);
      const firstMove = randInt(4, 12);
      const secondMove = randInt(3, Math.min(10, secondStart + firstMove - 3));
      const firstFinal = firstStart - firstMove;
      const secondFinal = secondStart + firstMove - secondMove;
      const thirdFinal = thirdStart + secondMove;
      const answer = Math.max(firstFinal, secondFinal, thirdFinal) - Math.min(firstFinal, secondFinal, thirdFinal);

      return transferQ(
        s,
        `${first}, ${second}, and ${third} start with ${firstStart}, ${secondStart}, and ${thirdStart} ${item}. ${first} gives ${firstMove} to ${second}. Then ${second} gives ${secondMove} to ${third}. What is the difference between the largest and smallest final amounts?`,
        answer,
        'Track all three final amounts, identify the largest and smallest, and subtract.'
      );
    }

    const finalEqual = randInt(18, 38);
    const firstMove = randInt(4, 12);
    const secondMove = randInt(3, 10);
    const firstStart = finalEqual + firstMove;
    const secondStart = finalEqual - firstMove + secondMove;
    const thirdStart = finalEqual - secondMove;

    return transferQ(
        s,
      `${first}, ${second}, and ${third} have some ${item}. ${first} gives ${firstMove} to ${second}. Then ${second} gives ${secondMove} to ${third}. After these transfers, each person has ${finalEqual} ${item}. How many ${item} did ${second} have at the start?`,
      secondStart,
      'Work backwards from the equal final amount, accounting for what the middle person received and then gave away.'
    );
  }

  // 6. Reverse a transfer to find an original amount
  if (type === 6) {
    const [first, second] = transferPair();
    const item = transferItem();

    if (s === 'basic') {
      const moved = randInt(3, 10);
      const finalAmount = randInt(15, 40);
      const askGiver = chance(0.5);
      const original = askGiver ? finalAmount + moved : finalAmount - moved;

      return transferQ(
        s,
        `${first} gives ${moved} ${item} to ${second}. After the transfer, ${askGiver ? first : second} has ${finalAmount} ${item}. How many did ${askGiver ? first : second} have before the transfer?`,
        original,
        askGiver ? 'Reverse the giving by adding the transferred amount.' : 'Reverse the receiving by subtracting the transferred amount.'
      );
    }

    if (s === 'multi') {
      const moved = randInt(4, 12);
      const firstFinal = randInt(15, 35);
      const secondFinal = randInt(20, 45);
      const firstOriginal = firstFinal + moved;
      const secondOriginal = secondFinal - moved;
      const answer = firstOriginal + secondOriginal;

      return transferQ(
        s,
        `${first} gives ${moved} ${item} to ${second}. Afterwards, ${first} has ${firstFinal} and ${second} has ${secondFinal}. How many ${item} did they have altogether before the transfer?`,
        answer,
        'Reverse both changes, or notice that a transfer does not change the combined total.'
      );
    }

    const firstMove = randInt(5, 14);
    const secondMove = randInt(3, 10);
    const finalAmount = randInt(18, 45);
    const original = finalAmount + firstMove - secondMove;

    return transferQ(
        s,
      `${first} first gives ${firstMove} ${item} to ${second}. Later, ${second} gives ${secondMove} ${item} back to ${first}. ${first} then has ${finalAmount} ${item}. How many ${item} did ${first} have at the start?`,
      original,
      'Reverse the final amount: add what was first given away, then subtract what was received back.'
    );
  }

  // 7. Redistribute a total equally
  if (type === 7) {
    const names = transferTriple();
    const item = transferItem();

    if (s === 'basic') {
      const equalShare = randInt(8, 24);
      const total = equalShare * 3;

      return transferQ(
        s,
        `${names[0]}, ${names[1]}, and ${names[2]} have ${total} ${item} altogether. They redistribute them equally. How many ${item} does each person receive?`,
        equalShare,
        'Divide the unchanged total equally among the three people.'
      );
    }

    if (s === 'multi') {
      const moveA = randInt(2, 8);
      const moveB = randInt(2, 8);
      const equalShare = randInt(moveA + moveB + 4, moveA + moveB + 20);
      const starts = [equalShare + moveA, equalShare - moveA - moveB, equalShare + moveB];
      const giver = names[0];
      const receiver = names[1];

      return transferQ(
        s,
        `${names[0]}, ${names[1]}, and ${names[2]} have ${starts[0]}, ${starts[1]}, and ${starts[2]} ${item}. They redistribute all the ${item} equally. How many ${item} must ${giver} give away in total?`,
        moveA,
        `First find the equal share from the total. Compare ${giver}'s starting amount with that share.`
      );
    }

    const firstExcess = randInt(3, 10);
    const thirdExcess = randInt(2, 9);
    const equalShare = randInt(firstExcess + thirdExcess + 5, firstExcess + thirdExcess + 22);
    const firstStart = equalShare + firstExcess;
    const thirdStart = equalShare + thirdExcess;
    const secondStart = equalShare - firstExcess - thirdExcess;

    return transferQ(
        s,
      `${names[0]}, ${names[1]}, and ${names[2]} have ${firstStart}, ${secondStart}, and ${thirdStart} ${item}. They want equal amounts using the fewest individual item transfers. What is the minimum number of ${item} that must be moved?`,
      firstExcess + thirdExcess,
      'Only items above the equal share need to move. Add the two excess amounts.'
    );
  }

  // 8. Transfer a fraction of an amount
  if (type === 8) {
    const [first, second] = transferPair();
    const item = transferItem();

    if (s === 'basic') {
      const denominator = pick([2, 3, 4, 5]);
      const unit = randInt(4, 12);
      const firstStart = denominator * unit;
      const secondStart = randInt(6, 24);
      const moved = unit;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and gives one-${denominator === 2 ? 'half' : denominator === 3 ? 'third' : denominator === 4 ? 'quarter' : 'fifth'} of them to ${second}. How many ${item} does ${second} receive?`,
        moved,
        `Divide ${firstStart} by ${denominator}.`
      );
    }

    if (s === 'multi') {
      const denominator = pick([3, 4, 5]);
      const unit = randInt(5, 12);
      const firstStart = denominator * unit;
      const secondStart = randInt(8, 28);
      const moved = unit;
      const answer = secondStart + moved;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. ${first} gives one-${denominator === 3 ? 'third' : denominator === 4 ? 'quarter' : 'fifth'} of ${first}'s ${item} to ${second}. How many ${item} does ${second} have then?`,
        answer,
        `Find the fraction transferred, then add it to ${second}'s starting amount.`
      );
    }

    const denominator = pick([3, 4, 5]);
    const unit = randInt(5, 11);
    const firstStart = denominator * unit;
    const moved = unit;
    const secondFinal = randInt(moved + 12, moved + 38);
    const secondStart = secondFinal - moved;

    return transferQ(
        s,
      `${first} has ${firstStart} ${item} and gives one-${denominator === 3 ? 'third' : denominator === 4 ? 'quarter' : 'fifth'} of them to ${second}. After receiving them, ${second} has ${secondFinal} ${item}. How many ${item} did ${second} have at the start?`,
      secondStart,
      'Find the transferred fraction first, then work backwards from the receiver’s final amount.'
    );
  }

  // 9. Compare transfer plans
  if (type === 9) {
    const [first, second] = transferPair();
    const item = transferItem();

    if (s === 'basic') {
      const secondStart = randInt(8, 25);
      const startingDifference = randInt(8, 24);
      const firstStart = secondStart + startingDifference;
      const planA = randInt(2, 7);
      const planB = planA + randInt(2, 6);
      const diffA = Math.abs((firstStart - planA) - (secondStart + planA));
      const diffB = Math.abs((firstStart - planB) - (secondStart + planB));
      const answer = diffA < diffB ? 1 : diffB < diffA ? 2 : 3;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. Plan 1 transfers ${planA} from ${first} to ${second}. Plan 2 transfers ${planB}. Which plan leaves the smaller difference? Enter 1 for Plan 1, 2 for Plan 2, or 3 if the differences are equal.`,
        answer,
        'Calculate the final difference for each plan and compare.'
      );
    }

    if (s === 'multi') {
      const secondStart = randInt(10, 35);
      const startingDifference = randInt(10, 30);
      const firstStart = secondStart + startingDifference;
      const maxMove = Math.floor(startingDifference / 2);
      const planA = Math.max(1, maxMove - randInt(0, 3));
      const planB = maxMove + randInt(1, 4);
      const diffA = Math.abs((firstStart - planA) - (secondStart + planA));
      const diffB = Math.abs((firstStart - planB) - (secondStart + planB));
      const answer = diffA < diffB ? 1 : diffB < diffA ? 2 : 3;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. Plan 1 transfers ${planA} from ${first} to ${second}; Plan 2 transfers ${planB}. Which plan makes their amounts closer? Enter 1 for Plan 1, 2 for Plan 2, or 3 if both are equally close.`,
        answer,
        'Work out both final differences. A transfer can go past equality, so compare absolute differences.'
      );
    }

    const secondStart = randInt(12, 40);
    const startingDifference = randInt(12, 36);
    const firstStart = secondStart + startingDifference;
    const limit = randInt(3, 9);
    const plans = transferTake([randInt(2, 8), randInt(9, 15), randInt(16, 22)], 3);
    const feasible = plans.map(moved => ({
      moved,
      difference: Math.abs((firstStart - moved) - (secondStart + moved))
    }));
    const validPlans = feasible.filter(plan => plan.difference <= limit);

    if (validPlans.length === 0) {
      return psGenTransferExchange();
    }

    const minimumMoved = Math.min(...validPlans.map(plan => plan.moved));

    return transferQ(
        s,
      `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. A plan is acceptable only if their final amounts differ by no more than ${limit}. The available transfers are ${plans.join(', ')} ${item} from ${first} to ${second}. What is the smallest acceptable transfer?`,
      minimumMoved,
      'Test each available transfer, keep only those that meet the difference limit, then choose the smallest.'
    );
  }

  // 10. Conservation of total and hidden transfers
  {
    const [first, second, third] = transferTriple();
    const item = transferItem();

    if (s === 'basic') {
      const firstStart = randInt(10, 30);
      const secondStart = randInt(10, 30);
      const moved = randInt(2, Math.min(8, firstStart - 2));
      const total = firstStart + secondStart;

      return transferQ(
        s,
        `${first} has ${firstStart} ${item} and ${second} has ${secondStart}. ${first} gives ${moved} to ${second}. How many ${item} do they have altogether after the transfer?`,
        total,
        'A transfer changes who holds the items, but not the combined total.'
      );
    }

    if (s === 'multi') {
      const firstStart = randInt(15, 35);
      const secondStart = randInt(12, 32);
      const thirdStart = randInt(10, 30);
      const firstMove = randInt(2, Math.min(8, firstStart - 2));
      const secondMove = randInt(2, Math.min(8, secondStart + firstMove - 2));
      const total = firstStart + secondStart + thirdStart;

      return transferQ(
        s,
        `${first}, ${second}, and ${third} have ${firstStart}, ${secondStart}, and ${thirdStart} ${item}. ${first} gives ${firstMove} to ${second}, and then ${second} gives ${secondMove} to ${third}. How many ${item} do the three people have altogether at the end?`,
        total,
        'Internal transfers do not change the total number of items.'
      );
    }

    const finalA = randInt(15, 40);
    const finalB = randInt(15, 40);
    const finalC = randInt(15, 40);
    const externalLoss = randInt(3, 10);
    const startingTotal = finalA + finalB + finalC + externalLoss;

    return transferQ(
        s,
      `${first}, ${second}, and ${third} repeatedly transfer ${item} among themselves. During the process, ${externalLoss} ${item} are lost. They finish with ${finalA}, ${finalB}, and ${finalC}. How many ${item} did they have altogether at the start?`,
      startingTotal,
      'Transfers among the three do not change the total. Add the lost items back to the final combined amount.'
    );
  }
}
