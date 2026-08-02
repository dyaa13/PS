'use strict';

/* Age, number and linear-equation problem banks.
   Split from DYAAPS.html without changing the original logic. */

function psGenAge() {
  const s = chooseProblemStructure();
  const type = randInt(1, 4);

  if (s === 'basic') {
    if (type === 1) {
      const younger = randInt(8, 15);
      const gap = randInt(2, 6);
      const older = younger + gap;

      return psQ(
        'age',
        s,
        `Two siblings have a combined age of ${younger + older} years. The older sibling is ${gap} years older than the younger sibling. How old is the younger sibling?`,
        younger,
        'Let the younger age be the unknown. The older age is the younger age plus the age gap.'
      );
    }

    if (type === 2) {
      const child = randInt(8, 16);
      const parentAtBirth = randInt(24, 34);
      const parent = child + parentAtBirth;

      return psQ(
        'age',
        s,
        `A parent was ${parentAtBirth} years old when their child was born. Their current ages add to ${parent + child} years. How old is the child now?`,
        child,
        'The parent is always the stated number of years older than the child. Use the age difference and the current total.'
      );
    }

    if (type === 3) {
      const younger = randInt(9, 15);
      const gap = randInt(2, 7);
      const years = randInt(3, 8);
      const futureSum = younger + (younger + gap) + 2 * years;

      return psQ(
        'age',
        s,
        `Two cousins are ${gap} years apart in age. In ${years} years, their ages will add to ${futureSum} years. How old is the younger cousin now?`,
        younger,
        'Work backwards from the future total, remembering that both cousins become older by the same number of years.'
      );
    }

    const student = randInt(10, 16);
    const coachGap = randInt(18, 30);
    const yearsAgo = randInt(2, Math.min(6, student - 7));
    const coach = student + coachGap;

    return psQ(
      'age',
      s,
      `${yearsAgo} years ago, a coach was ${coachGap} years older than a student. Their ages then added to ${coach + student - 2 * yearsAgo} years. How old is the student now?`,
      student,
      'Find the student’s age at the earlier time, then add the years that have passed.'
    );
  }

  if (s === 'multi') {
    if (type === 1) {
      const child = randInt(8, 16);
      const multiple = randInt(3, 5);
      const parent = child * multiple;
      const years = randInt(4, 12);

      return psQ(
        'age',
        s,
        `A parent is currently ${multiple} times as old as a child. In ${years} years, the sum of their ages will be ${parent + child + 2 * years}. Calculate the child’s current age.`,
        child,
        'Represent the current ages using the stated multiple, then use the future sum.'
      );
    }

    if (type === 2) {
      const younger = randInt(8, 14);
      const older = younger + randInt(3, 8);
      const adult = older + randInt(20, 30);
      const years = randInt(3, 8);
      const futureTotal = younger + older + adult + 3 * years;

      return psQ(
        'age',
        s,
        `Three family members are currently aged so that the second person is ${older - younger} years older than the youngest, and the oldest is ${adult - older} years older than the second person. In ${years} years, their ages will total ${futureTotal} years. How old is the youngest person now?`,
        younger,
        'Express all three current ages in terms of the youngest person, then use the future total.'
      );
    }

    if (type === 3) {
      const child = randInt(9, 15);
      const yearsAgo = randInt(2, Math.min(5, child - 6));
      const pastMultiple = pick([3, 4, 5]);
      const parent = pastMultiple * (child - yearsAgo) + yearsAgo;
      const yearsAhead = randInt(3, 8);
      const futureSum = parent + child + 2 * yearsAhead;

      return psQ(
        'age',
        s,
        `${yearsAgo} years ago, a parent was ${pastMultiple} times as old as their child. In ${yearsAhead} years, their ages will add to ${futureSum} years. Calculate the child’s current age.`,
        child,
        'Use the past relationship to express the parent’s current age, then apply the future-age sum.'
      );
    }

    const younger = randInt(8, 14);
    const gap = randInt(3, 7);
    const older = younger + gap;
    const years = randInt(4, 10);
    const futureMultiple = pick([2, 3]);
    const adult = futureMultiple * (older + years) - years;
    const currentTotal = adult + older + younger;

    if (adult <= older || adult > 75) return psGenAge();

    return psQ(
      'age',
      s,
      `Two siblings are ${gap} years apart. In ${years} years, an adult relative will be ${futureMultiple} times as old as the older sibling. The three current ages total ${currentTotal} years. How old is the younger sibling now?`,
      younger,
      'Express the older sibling and adult relative in terms of the younger sibling, then use the current total.'
    );
  }

  if (type === 1) {
    const child = randInt(6, 14);
    const parent = randInt(32, 48);
    const futureMultiple = pick([2, 3]);
    const years = (parent - futureMultiple * child) / (futureMultiple - 1);

    if (!Number.isInteger(years) || years <= 0 || years > 25) {
      return psGenAge();
    }

    return psQ(
      'age',
      s,
      `A parent is ${parent} years old and a child is ${child} years old. In how many years will the parent be ${futureMultiple} times as old as the child?`,
      years,
      'Add the same number of years to both ages and form an equation.'
    );
  }

  if (type === 2) {
    const child = randInt(8, 14);
    const yearsAgo = randInt(2, Math.min(5, child - 5));
    const pastMultiple = pick([4, 5]);
    const parent = pastMultiple * (child - yearsAgo) + yearsAgo;
    const yearsAhead = randInt(4, 10);
    const futureDifference = parent + yearsAhead - 2 * (child + yearsAhead);

    if (futureDifference < 2 || parent > 70) return psGenAge();

    return psQ(
      'age',
      s,
      `${yearsAgo} years ago, a parent was ${pastMultiple} times as old as their child. In ${yearsAhead} years, the parent will be ${futureDifference} years more than twice the child’s age. Calculate the child’s current age.`,
      child,
      'Use one unknown for the child’s current age. Translate both the past and future statements carefully.'
    );
  }

  if (type === 3) {
    const youngest = randInt(7, 13);
    const middleGap = randInt(2, 6);
    const adultMultiple = pick([3, 4]);
    const middle = youngest + middleGap;
    const adult = adultMultiple * youngest + randInt(2, 10);
    const years = randInt(3, 8);
    const futureTotal = youngest + middle + adult + 3 * years;

    return psQ(
      'age',
      s,
      `At a family gathering, the second-youngest person is ${middleGap} years older than the youngest. The adult is ${adult - adultMultiple * youngest} years more than ${adultMultiple} times the youngest person’s age. In ${years} years, the three ages will total ${futureTotal} years. Calculate the youngest person’s current age.`,
      youngest,
      'Express all three current ages in terms of the youngest person, then include the future increase for all three.'
    );
  }

  const student = randInt(10, 16);
  const teacher = student + randInt(20, 32);
  const yearsAgo = randInt(2, Math.min(6, student - 7));
  const yearsAhead = randInt(3, 9);
  const pastSum = teacher + student - 2 * yearsAgo;
  const futureDifference = teacher + yearsAhead - 2 * (student + yearsAhead);

  if (futureDifference < 1) return psGenAge();

  return psQ(
    'age',
    s,
    `${yearsAgo} years ago, a teacher and a student had a combined age of ${pastSum} years. In ${yearsAhead} years, the teacher will be ${futureDifference} years more than twice the student’s age. Calculate the student’s current age.`,
    student,
    'Use the past total to express one age in terms of the other, then use the future relationship.'
  );
}

function psGenNumberProblems() {
  const s = chooseProblemStructure();
  const type = randInt(1, 8);

  // 1. Two-digit and three-digit numbers
  if (type === 1) {
    if (s === 'basic') {
      if (chance(0.5)) {
        const tens = randInt(1, 9);
        const ones = randInt(0, 9);
        const number = 10 * tens + ones;

        return psQ(
          'numberProblems',
          s,
          `A ticket number contains ${tens} ten${tens === 1 ? '' : 's'} and ${ones} one${ones === 1 ? '' : 's'}. What is the ticket number?`,
          number,
          'Use place value: the tens digit represents groups of ten and the ones digit represents single units.'
        );
      }

      const hundreds = randInt(1, 9);
      const tens = randInt(0, 9);
      const ones = randInt(0, 9);
      const number = 100 * hundreds + 10 * tens + ones;

      return psQ(
        'numberProblems',
        s,
        `A parcel code contains ${hundreds} hundred${hundreds === 1 ? '' : 's'}, ${tens} ten${tens === 1 ? '' : 's'} and ${ones} one${ones === 1 ? '' : 's'}. What is the parcel code?`,
        number,
        'Combine the hundreds, tens and ones using place value.'
      );
    }

    if (s === 'multi') {
      const hundreds = randInt(5, 9);
      const firstDrop = randInt(1, 3);
      const tens = hundreds - firstDrop;
      const rise = randInt(1, Math.min(4, 9 - tens));
      const ones = tens + rise;
      const code = 100 * hundreds + 10 * tens + ones;
      const added = pick([100, 200, 300]);

      return psQ(
        'numberProblems',
        s,
        `A three-digit delivery code has a hundreds digit of ${hundreds}. Its tens digit is ${firstDrop} less than the hundreds digit, and its ones digit is ${rise} more than the tens digit. The company then adds ${added} to the code for a new delivery zone. What is the new code?`,
        code + added,
        'Find the tens and ones digits first, form the original code, then add the new-zone amount.'
      );
    }

    const hundreds = randInt(6, 9);
    const tens = randInt(4, hundreds - 1);
    const ones = 2 * randInt(1, Math.floor((tens - 1) / 2));
    const target = 100 * hundreds + 10 * tens + ones;
    const options = [
      target,
      100 * hundreds + 10 * ones + tens,
      100 * tens + 10 * hundreds + ones,
      100 * ones + 10 * tens + hundreds
    ];

    return psQ(
      'numberProblems',
      s,
      `A three-digit access code uses the digits ${hundreds}, ${tens} and ${ones}. The hundreds digit must be greater than the tens digit, the tens digit must be greater than the ones digit, and the code must be even. Which code is valid: ${options.join(', ')}?`,
      target,
      'Check all of the ordering and parity conditions rather than using only one clue.'
    );
  }

  // 2. Relationships between digits
  if (type === 2) {
    if (s === 'basic') {
      const ones = randInt(1, 5);
      const difference = randInt(1, Math.min(4, 9 - ones));
      const tens = ones + difference;
      const number = 10 * tens + ones;

      return psQ(
        'numberProblems',
        s,
        `A two-digit locker code has digits that add to ${tens + ones}. The tens digit is ${difference} greater than the ones digit. What is the locker code?`,
        number,
        'Use the digit sum and the difference between the two digits.'
      );
    }

    if (s === 'multi') {
      const ones = randInt(1, 4);
      const hundreds = ones + randInt(2, 4);
      const tens = 2 * ones;
      const code = 100 * hundreds + 10 * tens + ones;

      return psQ(
        'numberProblems',
        s,
        `A three-digit stock code has digits that add to ${hundreds + tens + ones}. The tens digit is twice the ones digit, and the hundreds digit is ${hundreds - ones} greater than the ones digit. What is the stock code?`,
        code,
        'Find the ones digit from the two relationships, then determine the tens and hundreds digits.'
      );
    }

    const ones = randInt(1, 5);
    const tens = ones + randInt(1, 3);
    const hundreds = tens + randInt(1, Math.min(3, 9 - tens));
    const code = 100 * hundreds + 10 * tens + ones;
    const reversed = 100 * ones + 10 * tens + hundreds;

    return psQ(
      'numberProblems',
      s,
      `A three-digit room code has digits that add to ${hundreds + tens + ones}. The hundreds digit is ${hundreds - tens} greater than the tens digit, and the tens digit is ${tens - ones} greater than the ones digit. Reversing the digits makes the number ${code - reversed} smaller. What is the original room code?`,
      code,
      'Use all the digit relationships and check that the reversal difference is satisfied.'
    );
  }

  // 3. Reversing or swapping digits
  if (type === 3) {
    if (s === 'basic') {
      const tens = randInt(2, 9);
      const ones = randInt(1, tens - 1);
      const number = 10 * tens + ones;
      const reversed = 10 * ones + tens;

      return psQ(
        'numberProblems',
        s,
        `A two-digit label has digits that add to ${tens + ones}. Reversing the digits makes the label ${number - reversed} smaller. What is the original label?`,
        number,
        'For a two-digit number, reversing the digits changes the number by 9 times the difference between the digits.'
      );
    }

    if (s === 'multi') {
      const tens = randInt(3, 9);
      const ones = randInt(1, tens - 1);
      const number = 10 * tens + ones;
      const reversed = 10 * ones + tens;
      const prefix = randInt(2, 8);
      const finalCode = prefix * 100 + number;

      return psQ(
        'numberProblems',
        s,
        `A two-digit parking code has digits that add to ${tens + ones}. When its digits are reversed, the new number is ${number - reversed} less than the original. The digit ${prefix} is then placed in front of the original code to identify the parking level. What is the final three-digit code?`,
        finalCode,
        'Find the original two-digit code first, then place the level digit in the hundreds position.'
      );
    }

    const ones = randInt(1, 5);
    const difference = randInt(2, Math.min(4, 9 - ones));
    const hundreds = ones + difference;
    const tens = randInt(0, 9);
    const code = 100 * hundreds + 10 * tens + ones;
    const reversed = 100 * ones + 10 * tens + hundreds;

    return psQ(
      'numberProblems',
      s,
      `A three-digit security code has a tens digit of ${tens}. Its digits add to ${hundreds + tens + ones}. Reversing the first and last digits makes the code ${code - reversed} smaller. What is the original security code?`,
      code,
      'The middle digit stays fixed. Use the digit sum and the change caused by swapping the hundreds and ones digits.'
    );
  }

  // 4. Digit sums
  if (type === 4) {
    if (s === 'basic') {
      const hundreds = randInt(1, 9);
      const tens = randInt(0, 9);
      const ones = randInt(0, 9);

      return psQ(
        'numberProblems',
        s,
        `A three-digit product code begins with ${hundreds}${tens}. The sum of its three digits is ${hundreds + tens + ones}. What is the missing ones digit?`,
        ones,
        'Subtract the two known digits from the total digit sum.'
      );
    }

    if (s === 'multi') {
      const hundreds = randInt(2, 9);
      const tens = randInt(0, 9);
      const ones = randInt(1, 9);
      const code = 100 * hundreds + 10 * tens + ones;
      const reversed = 100 * ones + 10 * tens + hundreds;

      return psQ(
        'numberProblems',
        s,
        `A three-digit equipment code starts with ${hundreds} and ends with ${ones}. Its digits add to ${hundreds + tens + ones}. After finding the missing tens digit, reverse the entire code. What is the difference between the larger and smaller codes?`,
        Math.abs(code - reversed),
        'Find the missing digit from the digit sum, form both codes, then compare them.'
      );
    }

    let hundreds;
    let remainingSum;
    let candidates;

    do {
      hundreds = randInt(2, 8);
      remainingSum = randInt(4, 15);
      candidates = [];

      for (let tens = 0; tens <= 9; tens++) {
        for (let ones = 0; ones <= 9; ones++) {
          if (
            tens + ones === remainingSum
            && tens > ones
            && hundreds !== tens
            && hundreds !== ones
            && tens !== ones
          ) {
            candidates.push(100 * hundreds + 10 * tens + ones);
          }
        }
      }
    } while (candidates.length < 2);

    return psQ(
      'numberProblems',
      s,
      `A three-digit security code starts with ${hundreds}. Its digits add to ${hundreds + remainingSum}. All three digits are different, and the tens digit is greater than the ones digit. What is the smallest possible code?`,
      Math.min(...candidates),
      'List the digit pairs that satisfy the required sum and restrictions, then choose the smallest valid code.'
    );
  }

  // 5. Consecutive integers
  if (type === 5) {
    if (s === 'basic') {
      const middleSeat = randInt(12, 80);
      const total = 3 * middleSeat;

      return psQ(
        'numberProblems',
        s,
        `Three adjacent theatre seats have consecutive seat numbers. Their numbers add to ${total}. What is the largest seat number?`,
        middleSeat + 1,
        'The three numbers are one below the middle number, the middle number, and one above it.'
      );
    }

    if (s === 'multi') {
      const firstRow = randInt(16, 45);
      const numberOfRows = randInt(4, 6);
      const lastRow = firstRow + numberOfRows - 1;
      const originalTotal = numberOfRows * (firstRow + lastRow) / 2;
      const closed = randInt(3, Math.min(10, lastRow - 1));

      return psQ(
        'numberProblems',
        s,
        `A small theatre has ${numberOfRows} rows, with each row containing one more seat than the row before it. After ${closed} seats in the back row are closed, ${originalTotal - closed} seats remain available. How many seats were originally in the back row?`,
        lastRow,
        'Restore the closed seats, then model the row sizes as consecutive whole numbers.'
      );
    }

    const smaller = randInt(12, 45);
    const larger = smaller + 1;
    const tileTotal = smaller * larger;
    const borderTiles = 2 * smaller + 2 * larger - 4;

    return psQ(
      'numberProblems',
      s,
      `A rectangular display uses ${tileTotal} square tiles. The number of tiles along its length is one more than the number along its width. How many of the tiles lie on the outside border of the display?`,
      borderTiles,
      'First determine the two consecutive side lengths, then count the border without counting corner tiles twice.'
    );
  }

  // 6. Odd and even numbers
  if (type === 6) {
    if (s === 'basic') {
      const useOdd = chance(0.5);
      const first = useOdd
        ? 2 * randInt(5, 30) + 1
        : 2 * randInt(5, 30);
      const total = first + (first + 2) + (first + 4);

      return psQ(
        'numberProblems',
        s,
        `Three consecutive ${useOdd ? 'odd' : 'even'} numbers add to ${total}. What is the largest number?`,
        first + 4,
        `Consecutive ${useOdd ? 'odd' : 'even'} numbers increase by 2.`
      );
    }

    if (s === 'multi') {
      const useOdd = chance(0.5);
      const first = useOdd
        ? 2 * randInt(6, 24) + 1
        : 2 * randInt(6, 24);
      const extra = randInt(3, 12);
      const finalTotal = first + (first + 2) + (first + 4) + extra;

      return psQ(
        'numberProblems',
        s,
        `A factory prepares three trial batches containing consecutive ${useOdd ? 'odd' : 'even'} numbers of items. An extra ${extra} items are then added to the largest batch, making the final total ${finalTotal}. How many items were originally in the largest batch?`,
        first + 4,
        'Remove the extra items first, then use three consecutive numbers that differ by 2.'
      );
    }

    const useOdd = chance(0.5);
    const first = useOdd
      ? 2 * randInt(8, 25) + 1
      : 2 * randInt(8, 25);
    const largest = first + 4;
    const addedToEach = randInt(2, 7);
    const removal = randInt(1, addedToEach);
    const safetyLimit = largest + addedToEach - removal;
    const originalTotal = first + (first + 2) + largest;

    return psQ(
      'numberProblems',
      s,
      `Three storage rows contain consecutive ${useOdd ? 'odd' : 'even'} numbers of boxes and hold ${originalTotal} boxes altogether. A new shipment adds ${addedToEach} boxes to each row. The largest row must not exceed ${safetyLimit} boxes. What is the minimum number of boxes that must be removed from the largest row after the shipment?`,
      removal,
      'Find the original largest row, add the shipment, then compare it with the safety limit.'
    );
  }

  // 7. Multiples and remainders
  if (type === 7) {
    if (s === 'basic') {
      const divisor = randInt(3, 9);
      const quotient = randInt(4, 15);
      const remainder = randInt(1, divisor - 1);
      const total = divisor * quotient + remainder;

      return psQ(
        'numberProblems',
        s,
        `A teacher fills ${quotient} complete trays with ${divisor} counters in each tray and has ${remainder} counters left over. How many counters are there altogether?`,
        total,
        'Multiply the number of complete trays by the counters per tray, then add the remainder.'
      );
    }

    if (s === 'multi') {
      const pair = pick([[4, 5], [5, 6], [5, 7], [6, 7], [7, 8]]);
      const firstDivisor = pair[0];
      const secondDivisor = pair[1];
      const cycle = firstDivisor * secondDivisor;
      let base;

      do {
        base = randInt(1, cycle - 1);
      } while (base % firstDivisor === 0 || base % secondDivisor === 0);

      const total = cycle * randInt(2, 6) + base;
      const left = randInt(2, Math.max(2, Math.floor(cycle / 3)));
      const right = randInt(2, Math.max(2, Math.floor(cycle / 3)));

      return psQ(
        'numberProblems',
        s,
        `A sports club has between ${total - left} and ${total + right} bibs. When the bibs are packed in groups of ${firstDivisor}, ${total % firstDivisor} are left over. When they are packed in groups of ${secondDivisor}, ${total % secondDivisor} are left over. How many bibs does the club have?`,
        total,
        'Test numbers in the stated range against both remainder conditions.'
      );
    }

    const pair = pick([[4, 5], [5, 6], [5, 7], [6, 7], [7, 8]]);
    const firstDivisor = pair[0];
    const secondDivisor = pair[1];
    const cycle = firstDivisor * secondDivisor;
    let base;

    do {
      base = randInt(1, cycle - 1);
    } while (base % firstDivisor === 0 || base % secondDivisor === 0);

    const total = cycle * randInt(3, 7) + base;
    const threshold = total - randInt(1, cycle - 1);

    return psQ(
      'numberProblems',
      s,
      `A warehouse needs the smallest possible number of labels greater than ${threshold}. When arranged in rows of ${firstDivisor}, ${total % firstDivisor} labels are left over. When arranged in rows of ${secondDivisor}, ${total % secondDivisor} labels are left over. What is the smallest possible number of labels?`,
      total,
      'The two remainder conditions repeat together after a full common cycle. Find the first valid number above the threshold.'
    );
  }

  // 8. Number patterns
  if (s === 'basic') {
    const start = randInt(3, 25);
    const step = randInt(2, 9);
    const terms = [start, start + step, start + 2 * step, start + 3 * step];

    return psQ(
      'numberProblems',
      s,
      `A shelf-label pattern begins ${terms.join(', ')}. The same rule continues. What is the next number?`,
      start + 4 * step,
      'Find the constant amount added from one term to the next.'
    );
  }

  if (s === 'multi') {
    const start = randInt(4, 20);
    const step = randInt(2, 8);
    const stage = randInt(5, 12);
    const atStage = start + (stage - 1) * step;
    const nextStage = atStage + step;

    return psQ(
      'numberProblems',
      s,
      `A tile pattern uses ${start} tiles in Stage 1 and ${step} more tiles in each new stage. How many tiles are needed for Stages ${stage} and ${stage + 1} altogether?`,
      atStage + nextStage,
      'Find the number of tiles in each required stage, then add the two results.'
    );
  }

  const stepA = randInt(2, 6);
  const stepDifference = randInt(2, 5);
  const stepB = stepA + stepDifference;
  const crossingStage = randInt(4, 10);
  const positiveDifferenceAtCrossing = randInt(1, stepDifference);
  const startA = randInt(30, 60);
  const startB = startA
    + positiveDifferenceAtCrossing
    - (crossingStage - 1) * stepDifference;

  if (startB <= 0) return psGenNumberProblems();

  return psQ(
    'numberProblems',
    s,
    `Two fundraising plans follow number patterns. Plan A starts at $${startA} in Week 1 and increases by $${stepA} each week. Plan B starts at $${startB} in Week 1 and increases by $${stepB} each week. In which week does Plan B first raise more money than Plan A?`,
    crossingStage,
    'Compare the two weekly patterns and identify the first week when Plan B becomes larger.'
  );
}
function psGenEquations() {
  const s = chooseProblemStructure();
  const type = randInt(1, 8);

  // BASIC: direct equations and simple one-context applications.
  if (s === 'basic') {
    // 1. One-step addition equation
    if (type === 1) {
      const original = randInt(12, 60);
      const delivered = randInt(6, 28);
      const finalTotal = original + delivered;

      return psQ(
        'equations',
        s,
        `A library shelf had some books. After ${delivered} new books were added, there were ${finalTotal} books on the shelf. How many books were there originally?`,
        original,
        'Let x be the original number of books. Solve x + the delivered books = the final total.'
      );
    }

    // 2. One-step subtraction equation
    if (type === 2) {
      const original = randInt(25, 90);
      const sold = randInt(5, original - 10);
      const remaining = original - sold;

      return psQ(
        'equations',
        s,
        `A stall began the day with some fruit boxes. After ${sold} boxes were sold, ${remaining} boxes remained. How many boxes were there at the start of the day?`,
        original,
        'Let x be the starting number. Solve x minus the number sold = the number remaining.'
      );
    }

    // 3. One-step multiplication equation
    if (type === 3) {
      const tickets = randInt(6, 28);
      const ticketPrice = randInt(3, 12);
      const revenue = tickets * ticketPrice;

      return psQ(
        'equations',
        s,
        `Tickets for a school event cost $${ticketPrice} each. The ticket sales total $${revenue}. How many tickets were sold?`,
        tickets,
        'Let x be the number of tickets. Solve ticket price × x = total sales.'
      );
    }

    // 4. One-step division equation
    if (type === 4) {
      const groups = randInt(3, 9);
      const perGroup = randInt(4, 15);
      const total = groups * perGroup;

      return psQ(
        'equations',
        s,
        `A coach divides ${total} training cones equally among several teams. Each team receives ${perGroup} cones. How many teams are there?`,
        groups,
        'Let x be the number of teams. Solve the total number of cones divided by x = cones per team.'
      );
    }

    // 5. Two-step linear equation
    if (type === 5) {
      const distance = randInt(4, 18);
      const fixedCharge = randInt(4, 12);
      const rate = randInt(2, 6);
      const total = fixedCharge + rate * distance;

      return psQ(
        'equations',
        s,
        `A taxi charges a fixed fee of $${fixedCharge} plus $${rate} per kilometre. The total fare is $${total}. How many kilometres were travelled?`,
        distance,
        'Subtract the fixed fee, then divide by the charge per kilometre.'
      );
    }

    // 6. Bracket equation
    if (type === 6) {
      const crates = randInt(3, 8);
      const regularItems = randInt(5, 16);
      const samplesPerCrate = randInt(1, 4);
      const total = crates * (regularItems + samplesPerCrate);

      return psQ(
        'equations',
        s,
        `${crates} identical display crates each contain the same number of regular products and ${samplesPerCrate} free samples. There are ${total} items altogether. How many regular products are in each crate?`,
        regularItems,
        `Let x be the regular products in each crate. Solve ${crates}(x + ${samplesPerCrate}) = ${total}.`
      );
    }

    // 7. Simple fraction equation
    if (type === 7) {
      const denominator = pick([3, 4, 5]);
      const usedParts = randInt(1, denominator - 1);
      const remainingParts = denominator - usedParts;
      const partValue = randInt(5, 18);
      const original = denominator * partValue;
      const remaining = remainingParts * partValue;

      return psQ(
        'equations',
        s,
        `${usedParts}/${denominator} of the water in a container is used. ${remaining} litres remain. How many litres were in the container originally?`,
        original,
        `The remaining fraction is ${remainingParts}/${denominator}. Let x be the original amount and solve (${remainingParts}/${denominator})x = ${remaining}.`
      );
    }

    // 8. Build a formula, then use it
    const fixedFee = randInt(5, 18);
    const rate = randInt(2, 7);
    const quantity = randInt(4, 15);
    const total = fixedFee + rate * quantity;

    return psQ(
      'equations',
      s,
      `A delivery company charges a fixed booking fee of $${fixedFee} and $${rate} for each parcel. Build a formula for the total cost and use it to find the cost of sending ${quantity} parcels.`,
      total,
      `If n is the number of parcels, the formula is C = ${fixedFee} + ${rate}n. Substitute n = ${quantity}.`
    );
  }

  // MULTI-STEP: intermediate quantities and broader equation structures.
  if (s === 'multi') {
    // 1. Multi-step two-step equation with several fixed amounts
    if (type === 1) {
      const hours = randInt(2, 9);
      const callout = randInt(25, 60);
      const hourlyRate = randInt(15, 30);
      const partsCost = randInt(20, 80);
      const total = callout + hourlyRate * hours + partsCost;

      return psQ(
        'equations',
        s,
        `A repair bill contains a $${callout} call-out fee, $${hourlyRate} per hour for labour, and $${partsCost} for parts. The total bill is $${total}. How many labour hours were charged?`,
        hours,
        'Subtract both fixed costs before dividing by the hourly labour rate.'
      );
    }

    // 2. Bracket equation with a further adjustment
    if (type === 2) {
      const crates = randInt(4, 9);
      const regularItems = randInt(6, 18);
      const samplesPerCrate = randInt(2, 5);
      const damaged = randInt(3, 12);
      const usable = crates * (regularItems + samplesPerCrate) - damaged;

      return psQ(
        'equations',
        s,
        `${crates} identical crates each contain the same number of regular products and ${samplesPerCrate} sample products. After ${damaged} damaged items are removed, ${usable} usable items remain. How many regular products were packed in each crate?`,
        regularItems,
        `Let x be the regular products per crate. Solve ${crates}(x + ${samplesPerCrate}) - ${damaged} = ${usable}.`
      );
    }

    // 3. Fraction equation requiring reconstruction
    if (type === 3) {
      const denominator = pick([3, 4, 5, 6]);
      const completedParts = randInt(1, denominator - 2);
      const extraCompleted = randInt(6, 24);
      const partValue = randInt(6, 20);
      const total = denominator * partValue;
      const remaining = total - completedParts * partValue - extraCompleted;

      if (remaining <= 0) return psGenEquations();

      return psQ(
        'equations',
        s,
        `A team first completes ${completedParts}/${denominator} of a project and then completes another ${extraCompleted} tasks. There are ${remaining} tasks still unfinished. How many tasks are in the whole project?`,
        total,
        'Let x be the total number of tasks. Subtract the stated fraction of x and the additional completed tasks from x.'
      );
    }

    // 4. Unknown on both sides
    if (type === 4) {
      const uses = randInt(5, 20);
      const rateA = randInt(4, 8);
      const rateB = randInt(1, rateA - 1);
      const fixedA = randInt(6, 20);
      const fixedB = fixedA + (rateA - rateB) * uses;

      return psQ(
        'equations',
        s,
        `Plan A charges $${fixedA} plus $${rateA} per use. Plan B charges $${fixedB} plus $${rateB} per use. For how many uses do the two plans have the same total cost?`,
        uses,
        'Form one cost expression for each plan, set them equal, and solve the equation with the unknown on both sides.'
      );
    }

    // 5. Simultaneous equations: total count and total revenue
    if (type === 5) {
      const adultTickets = randInt(8, 28);
      const studentTickets = randInt(10, 35);
      const adultPrice = randInt(9, 16);
      const studentPrice = randInt(4, adultPrice - 2);
      const totalTickets = adultTickets + studentTickets;
      const revenue = adultTickets * adultPrice + studentTickets * studentPrice;

      return psQ(
        'equations',
        s,
        `A concert sells ${totalTickets} tickets. Adult tickets cost $${adultPrice} and student tickets cost $${studentPrice}. The total ticket revenue is $${revenue}. How many adult tickets were sold?`,
        adultTickets,
        'Let a and s be the adult and student ticket numbers. Use a + s = total tickets and the ticket-revenue equation.'
      );
    }

    // 6. Quadratic equation application
    if (type === 6) {
      const width = randInt(5, 18);
      const difference = randInt(2, 9);
      const length = width + difference;
      const area = width * length;

      return psQ(
        'equations',
        s,
        `A rectangular garden has an area of ${area} m². Its length is ${difference} m greater than its width. What is the width of the garden?`,
        width,
        `Let the width be x metres, so the length is x + ${difference}. Solve x(x + ${difference}) = ${area} and use the positive solution.`
      );
    }

    // 7. Build a formula, then solve it in reverse
    if (type === 7) {
      const setupFee = randInt(18, 45);
      const rate = randInt(3, 9);
      const quantity = randInt(8, 26);
      const total = setupFee + rate * quantity;

      return psQ(
        'equations',
        s,
        `A printing company charges a setup fee of $${setupFee} and $${rate} for each banner. Build a formula for the total cost. An order costs $${total}. How many banners were ordered?`,
        quantity,
        `The formula is C = ${setupFee} + ${rate}n. Substitute the total cost and solve for n.`
      );
    }

    // 8. Geometry equation with brackets
    const width = randInt(5, 16);
    const multiplier = pick([2, 3]);
    const offset = randInt(2, 7);
    const length = multiplier * width + offset;
    const perimeter = 2 * (length + width);

    return psQ(
      'equations',
      s,
      `A rectangular enclosure has a length that is ${offset} m more than ${multiplier} times its width. Its perimeter is ${perimeter} m. What is its width?`,
      width,
      `Let the width be x. Then the length is ${multiplier}x + ${offset}. Use 2(length + width) = ${perimeter}.`
    );
  }

  // NON-ROUTINE: reverse reasoning, comparison, constraints and model choice.
  if (type === 1) {
    const trips = randInt(8, 24);
    const fixedA = randInt(12, 28);
    const rateA = randInt(2, 5);
    const freeTrips = randInt(1, 4);
    const rateB = randInt(rateA + 1, rateA + 4);
    const fixedB = fixedA + rateA * trips - rateB * (trips - freeTrips);

    if (fixedB < 4 || fixedB >= fixedA) return psGenEquations();

    return psQ(
      'equations',
      s,
      `Travel Plan A costs $${fixedA} plus $${rateA} per trip. Plan B costs $${fixedB}, includes ${freeTrips} free trip${freeTrips === 1 ? '' : 's'}, and charges $${rateB} for each later trip. For how many trips do the two plans cost the same?`,
      trips,
      'Build both cost expressions carefully. Plan B charges only for trips beyond the free allowance.'
    );
  }

  // 2. Solve the comparison point, then compare the plans later
  if (type === 2) {
    const equalUses = randInt(6, 18);
    const extraUses = randInt(3, 8);
    const rateA = randInt(5, 9);
    const rateB = randInt(1, rateA - 2);
    const fixedA = randInt(5, 18);
    const fixedB = fixedA + (rateA - rateB) * equalUses;
    const targetUses = equalUses + extraUses;
    const costA = fixedA + rateA * targetUses;
    const costB = fixedB + rateB * targetUses;
    const saving = Math.abs(costA - costB);

    return psQ(
      'equations',
      s,
      `Two tool-hire plans cost the same for an unknown number of uses. Plan A charges $${fixedA} plus $${rateA} per use. Plan B charges $${fixedB} plus $${rateB} per use. First find the equal-cost point. Then determine how much is saved by choosing the cheaper plan for ${targetUses} uses.`,
      saving,
      'Set the plans equal to find the crossover point, then calculate and compare both costs at the required number of uses.'
    );
  }

  // 3. Simultaneous equations with a physical constraint
  if (type === 3) {
    const vans = randInt(4, 16);
    const cars = randInt(8, 28);
    const totalVehicles = vans + cars;
    const totalWheels = 6 * vans + 4 * cars;

    return psQ(
      'equations',
      s,
      `A depot contains ${totalVehicles} vehicles, made up only of cars with 4 wheels and delivery vans with 6 wheels. Altogether, the vehicles have ${totalWheels} wheels. How many delivery vans are there?`,
      vans,
      'Let c and v be the numbers of cars and vans. Use the total-vehicle equation and the total-wheel equation together.'
    );
  }

  // 4. Quadratic equation from an outside path
  if (type === 4) {
    const length = randInt(8, 18);
    const width = randInt(5, length - 2);
    const pathWidth = randInt(1, 4);
    const totalArea = (length + 2 * pathWidth) * (width + 2 * pathWidth);

    return psQ(
      'equations',
      s,
      `A rectangular garden measures ${length} m by ${width} m. A path of equal width is built all the way around the outside. The combined area of the garden and path is ${totalArea} m². How wide is the path?`,
      pathWidth,
      `Let the path width be x metres. The outside dimensions are ${length} + 2x and ${width} + 2x. Solve the resulting quadratic equation and use the positive solution.`
    );
  }

  // 5. Reverse fraction equation with two stages
  if (type === 5) {
    const firstFraction = pick([[1, 4], [1, 5], [1, 3], [2, 5]]);
    const secondFraction = pick([[1, 3], [1, 4], [1, 2], [2, 5]]);
    const common = lcm(firstFraction[1], secondFraction[1]);
    const original = common * randInt(12, 30);
    const afterFirst = original * (1 - firstFraction[0] / firstFraction[1]);
    const afterSecond = afterFirst * (1 - secondFraction[0] / secondFraction[1]);
    const added = randInt(6, 24);
    const finalAmount = round2(afterSecond + added);

    return psQ(
      'equations',
      s,
      `A storage tank starts with an unknown amount of water. First, ${firstFraction[0]}/${firstFraction[1]} of the original amount is used. Then ${secondFraction[0]}/${secondFraction[1]} of the remaining water is used. After ${added} litres are added, the tank contains ${fmt(finalAmount)} litres. How much water was in the tank originally?`,
      original,
      'Let x be the original amount. Apply each fraction to the correct stage, then include the water added at the end.'
    );
  }

  // 6. Build a piecewise-style model and solve under a budget
  if (type === 6) {
    const included = randInt(2, 5);
    const fixedFee = randInt(10, 24);
    const extraRate = randInt(3, 7);
    const chargedExtra = randInt(4, 16);
    const totalDistance = included + chargedExtra;
    const budget = fixedFee + extraRate * chargedExtra;

    return psQ(
      'equations',
      s,
      `A courier charges $${fixedFee}, including the first ${included} km, and $${extraRate} for every additional kilometre. Build a formula for journeys longer than ${included} km. A delivery costs exactly $${budget}. How long is the journey?`,
      totalDistance,
      `For distance d, use C = ${fixedFee} + ${extraRate}(d - ${included}). Substitute the total cost and solve for d.`
    );
  }

  // 7. Bracket equation with percentage and fixed charge
  if (type === 7) {
    const quantity = randInt(8, 24);
    const unitPrice = pick([5, 10, 15, 20]);
    const discountPercent = pick([10, 20, 25]);
    const delivery = randInt(8, 25);
    const beforeDelivery = quantity * unitPrice * (1 - discountPercent / 100);
    const finalCost = round2(beforeDelivery + delivery);

    return psQ(
      'equations',
      s,
      `A shop sells identical items for $${unitPrice} each. An order receives a ${discountPercent}% discount on the items, then a $${delivery} delivery charge is added. The final cost is $${fmt(finalCost)}. How many items were ordered?`,
      quantity,
      'Let x be the number of items. Apply the discount to the full item cost before adding the fixed delivery charge.'
    );
  }

  // 8. Choose a plan under a budget constraint
  const quantity = randInt(10, 30);
  const fixedA = randInt(12, 30);
  const rateA = randInt(3, 7);
  const fixedB = randInt(4, fixedA - 2);
  const rateB = randInt(rateA + 1, rateA + 4);
  const costA = fixedA + rateA * quantity;
  const costB = fixedB + rateB * quantity;
  const saving = Math.abs(costA - costB);

  if (saving === 0) return psGenEquations();

  return psQ(
    'equations',
    s,
    `A school must order ${quantity} equipment packs. Supplier A charges a $${fixedA} setup fee and $${rateA} per pack. Supplier B charges a $${fixedB} setup fee and $${rateB} per pack. How much money is saved by choosing the cheaper supplier?`,
    saving,
    'Build a total-cost formula for each supplier, evaluate both formulas for the required order, and compare the results.'
  );
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
      `A rectangular garden bed is redesigned. Its original length is ${lengthOffset} cm less than ${lengthMultiplier} times its original width. During the redesign, the length is increased by ${lengthIncrease} cm and the width is decreased by ${widthDecrease} cm. The new perimeter is ${newPerimeter} cm. Calculate the original width.`,
      width,
      'Let the original width be x cm. Express the original length in terms of x, apply both design changes, then use the new perimeter.');
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
      `A triangular roof frame has three interior angles. The second angle is ${increase}° more than twice the first angle, and the third angle is ${difference}° less than the second angle. Calculate the size of the first angle.`,
      firstAngle,
      'Let the first frame angle be x°. Express the other two angles in terms of x and use the 180° angle sum of the triangular frame.');
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
      `Two vehicles travel towards each other from towns ${fmt(distance)} km apart. Vehicle A travels at ${speedA} km/h and departs ${fmt(headStart)} hour${headStart === 1 ? '' : 's'} before Vehicle B. Vehicle B travels at ${speedB} km/h. Calculate the time, in hours, from the departure of Vehicle B until the vehicles meet.`,
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
    `Plan A charges a fixed fee of $${fixedA} plus $${rateA} per use. Plan B charges a fixed fee of $${fixedB} and includes ${freeUses} free use${freeUses === 1 ? '' : 's'}; each additional use costs $${rateB}. Calculate the number of uses for which the two plans have the same total cost.`,
    uses,
    'Let x be the number of uses. For Plan B, only x minus the free uses are charged at the usage rate.');
}
