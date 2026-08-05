'use strict';

/* Divisibility rules, missing digits and digit-based logical reasoning. */

const DIGIT_LOGIC_DIVISORS = [2, 3, 4, 5, 6, 8, 9, 10];

function digitLogicDigits(number, width = null) {
  const text = width == null
    ? String(Math.abs(number))
    : String(Math.abs(number)).padStart(width, '0');
  return [...text].map(Number);
}

function digitLogicDigitSum(number, width = null) {
  return digitLogicDigits(number, width).reduce((sum, digit) => sum + digit, 0);
}

function digitLogicReverse(number, width = null) {
  const text = width == null
    ? String(Math.abs(number))
    : String(Math.abs(number)).padStart(width, '0');
  return Number([...text].reverse().join(''));
}

function digitLogicNumberFromDigits(digits) {
  return Number(digits.join(''));
}

function digitLogicUniquePermutations(digits) {
  const results = new Set();

  function build(prefix, remaining) {
    if (remaining.length === 0) {
      if (prefix[0] !== 0) {
        results.add(digitLogicNumberFromDigits(prefix));
      }
      return;
    }

    const used = new Set();

    remaining.forEach((digit, index) => {
      if (used.has(digit)) return;
      used.add(digit);

      build(
        [...prefix, digit],
        remaining.filter((_, remainingIndex) => remainingIndex !== index)
      );
    });
  }

  build([], digits);
  return [...results].sort((a, b) => a - b);
}

function digitLogicValidReplacementDigits(pattern, divisor, options = {}) {
  const valid = [];
  const start = options.allowLeadingZero ? 0 : 1;

  for (let digit = start; digit <= 9; digit++) {
    const number = Number(pattern.replace('?', String(digit)));

    if (number % divisor === 0) {
      valid.push(digit);
    }
  }

  return valid;
}

function digitLogicFindNumbers(minimum, maximum, predicate) {
  const values = [];

  for (let number = minimum; number <= maximum; number++) {
    if (predicate(number)) values.push(number);
  }

  return values;
}

function digitLogicCoprimePair() {
  const pairs = [
    [4, 9],
    [5, 8],
    [7, 8],
    [5, 6],
    [8, 9]
  ];
  return pick(pairs);
}

function digitLogicQ(structure, text, answer, hint) {
  return psQ('divisibilityDigitLogic', structure, text, answer, hint);
}

function psGenDivisibilityDigitLogic() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Direct use of divisibility rules
  if (type === 1) {
    if (s === 'basic') {
      const divisor = pick(DIGIT_LOGIC_DIVISORS);
      const multiple = randInt(12, 120) * divisor;
      const makeDivisible = chance(0.65);
      const number = makeDivisible
        ? multiple
        : multiple + randInt(1, divisor - 1);

      return digitLogicQ(
        s,
        `Is ${number} divisible by ${divisor}? Enter 1 for yes or 0 for no.`,
        makeDivisible ? 1 : 0,
        `Use the divisibility rule for ${divisor}, then decide whether the division has no remainder.`
      );
    }

    if (s === 'multi') {
      const divisorA = pick([2, 3, 4, 5, 6, 8, 9]);
      let divisorB = pick([2, 3, 4, 5, 6, 8, 9]);
      while (divisorB === divisorA) divisorB = pick([2, 3, 4, 5, 6, 8, 9]);
      const base = lcm(divisorA, divisorB);
      const multiplier = randInt(12, 80);
      const valid = chance(0.65);
      const number = valid
        ? base * multiplier
        : base * multiplier + pick([1, 2, 5, 7]);

      return digitLogicQ(
        s,
        `A number must be divisible by both ${divisorA} and ${divisorB}. Does ${number} satisfy both conditions? Enter 1 for yes or 0 for no.`,
        number % divisorA === 0 && number % divisorB === 0 ? 1 : 0,
        `Test the number against both divisibility conditions. It must pass both tests.`
      );
    }

    const divisors = pick([
      [2, 3, 5],
      [3, 4, 5],
      [4, 6, 9],
      [5, 6, 8]
    ]);
    const common = divisors.reduce((value, divisor) => lcm(value, divisor), 1);
    const number = common * randInt(5, 30);
    const changed = chance(0.5) ? number : number + pick([1, 7, 11, 13]);
    const answer = divisors.filter(divisor => changed % divisor === 0).length;

    return digitLogicQ(
      s,
      `Test ${changed} for divisibility by ${divisors.join(', ')}. How many of these divisors divide ${changed} exactly?`,
      answer,
      'Apply each divisibility rule separately, then count how many conditions are satisfied.'
    );
  }

  // 2. One missing digit
  if (type === 2) {
    if (s === 'basic') {
      const divisor = pick([3, 4, 5, 8, 9]);
      let pattern;
      let validDigits;

      do {
        const hundreds = randInt(1, 9);
        const tens = randInt(0, 9);
        const ones = randInt(0, 9);
        const position = randInt(0, 2);
        const chars = [hundreds, tens, ones].map(String);
        chars[position] = '?';
        pattern = chars.join('');
        validDigits = digitLogicValidReplacementDigits(pattern, divisor, {
          allowLeadingZero: position !== 0
        });
      } while (validDigits.length === 0 || validDigits.length > 4);

      const askSmallest = chance(0.5);
      const answer = askSmallest ? validDigits[0] : validDigits[validDigits.length - 1];

      return digitLogicQ(
        s,
        `Replace ? in ${pattern} with a digit so that the number is divisible by ${divisor}. What is the ${askSmallest ? 'smallest' : 'largest'} possible digit?`,
        answer,
        `Try the digits allowed in the missing position and apply the divisibility rule for ${divisor}.`
      );
    }

    if (s === 'multi') {
      let pattern;
      let divisorA;
      let divisorB;
      let validDigits;

      do {
        divisorA = pick([2, 3, 4, 5, 6, 8, 9]);
        divisorB = pick([3, 4, 5, 6, 8, 9]);
        while (divisorB === divisorA) divisorB = pick([3, 4, 5, 6, 8, 9]);

        const digits = [randInt(1, 9), randInt(0, 9), randInt(0, 9), randInt(0, 9)];
        const position = randInt(1, 3);
        digits[position] = '?';
        pattern = digits.join('');
        validDigits = [];

        for (let digit = 0; digit <= 9; digit++) {
          const number = Number(pattern.replace('?', String(digit)));
          if (number % divisorA === 0 && number % divisorB === 0) validDigits.push(digit);
        }
      } while (validDigits.length === 0 || validDigits.length > 3);

      return digitLogicQ(
        s,
        `Replace ? in ${pattern} with a digit so that the number is divisible by both ${divisorA} and ${divisorB}. How many digits can replace the question mark?`,
        validDigits.length,
        'A replacement digit is valid only when the completed number satisfies both divisibility tests.'
      );
    }

    let pattern;
    let divisor;
    let validDigits;

    do {
      divisor = pick([6, 8, 9, 12, 15, 18]);
      const digits = [randInt(1, 9), randInt(0, 9), randInt(0, 9), randInt(0, 9)];
      const position = randInt(1, 3);
      digits[position] = '?';
      pattern = digits.join('');
      validDigits = [];

      for (let digit = 0; digit <= 9; digit++) {
        const number = Number(pattern.replace('?', String(digit)));
        if (number % divisor === 0) validDigits.push(digit);
      }
    } while (validDigits.length < 2 || validDigits.length > 5);

    return digitLogicQ(
      s,
      `Every digit that can replace ? in ${pattern} and make the number divisible by ${divisor} is written down. What is the sum of all the valid replacement digits?`,
      validDigits.reduce((sum, digit) => sum + digit, 0),
      `Test all possible replacement digits, keep every valid one, then add those digits.`
    );
  }

  // 3. Digit sum and divisibility by 3 or 9
  if (type === 3) {
    if (s === 'basic') {
      const digits = [randInt(1, 9), randInt(0, 9), randInt(0, 9), randInt(0, 9)];
      const number = digitLogicNumberFromDigits(digits);

      return digitLogicQ(
        s,
        `Find the sum of the digits of ${number}.`,
        digits.reduce((sum, digit) => sum + digit, 0),
        'Add the thousands, hundreds, tens and ones digits.'
      );
    }

    if (s === 'multi') {
      const targetMultiple = pick([18, 27, 36]);
      const knownA = randInt(1, 9);
      const knownB = randInt(0, 9);
      const missing = targetMultiple - knownA - knownB;

      if (missing < 0 || missing > 18) return psGenDivisibilityDigitLogic();

      const pairs = [];
      for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
          if (x + y === missing) pairs.push([x, y]);
        }
      }

      if (pairs.length === 0) return psGenDivisibilityDigitLogic();

      return digitLogicQ(
        s,
        `The four-digit number ${knownA}?${knownB}? is divisible by 9, and the sum of its four digits is ${targetMultiple}. How many ordered pairs of digits can replace the two question marks?`,
        pairs.length,
        'The two missing digits must add to the difference between the required digit sum and the two known digits.'
      );
    }

    const digitSum = pick([9, 18, 27]);
    const hundreds = randInt(1, 9);
    const values = [];

    for (let tens = 0; tens <= 9; tens++) {
      for (let ones = 0; ones <= 9; ones++) {
        const number = 100 * hundreds + 10 * tens + ones;
        if (hundreds + tens + ones === digitSum && number % 2 === 0) {
          values.push(number);
        }
      }
    }

    if (values.length === 0) return psGenDivisibilityDigitLogic();

    return digitLogicQ(
      s,
      `How many three-digit even numbers begin with ${hundreds} and have a digit sum of ${digitSum}?`,
      values.length,
      'The ones digit must be even. Count the tens-and-ones pairs that give the required digit sum.'
    );
  }

  // 4. Arrange given digits to make divisible numbers
  if (type === 4) {
    if (s === 'basic') {
      let digits;
      let divisor;
      let valid;

      do {
        digits = [randInt(1, 9), randInt(0, 9), randInt(0, 9)];
        divisor = pick([2, 3, 5, 9]);
        valid = digitLogicUniquePermutations(digits).filter(number => number % divisor === 0);
      } while (valid.length === 0);

      const askLargest = chance(0.5);

      return digitLogicQ(
        s,
        `Use the digits ${digits.join(', ')} exactly once to make a three-digit number divisible by ${divisor}. What is the ${askLargest ? 'largest' : 'smallest'} possible number?`,
        askLargest ? valid[valid.length - 1] : valid[0],
        'List or reason through the valid arrangements, then choose the required extreme value.'
      );
    }

    if (s === 'multi') {
      let digits;
      let divisor;
      let valid;

      do {
        digits = [randInt(1, 9), randInt(0, 9), randInt(0, 9), randInt(0, 9)];
        divisor = pick([4, 6, 8, 9]);
        valid = digitLogicUniquePermutations(digits).filter(number => number % divisor === 0);
      } while (valid.length < 2 || valid.length > 18);

      return digitLogicQ(
        s,
        `Use the digits ${digits.join(', ')} exactly once to form four-digit numbers. How many distinct numbers are divisible by ${divisor}?`,
        valid.length,
        'Generate each distinct arrangement without a leading zero, then test divisibility.'
      );
    }

    let digits;
    let divisorA;
    let divisorB;
    let valid;

    do {
      digits = [randInt(1, 9), randInt(0, 9), randInt(0, 9), randInt(0, 9)];
      [divisorA, divisorB] = digitLogicCoprimePair();
      valid = digitLogicUniquePermutations(digits).filter(
        number => number % divisorA === 0 && number % divisorB === 0
      );
    } while (valid.length < 2 || valid.length > 10);

    const smallest = valid[0];
    const largest = valid[valid.length - 1];

    return digitLogicQ(
      s,
      `Use the digits ${digits.join(', ')} exactly once to make four-digit numbers divisible by both ${divisorA} and ${divisorB}. What is the difference between the largest and smallest possible numbers?`,
      largest - smallest,
      `A valid number must be divisible by the least common multiple of ${divisorA} and ${divisorB}. Find the extreme valid arrangements and subtract.`
    );
  }

  // 5. Smallest or largest number under digit restrictions
  if (type === 5) {
    if (s === 'basic') {
      const divisor = pick([3, 4, 5, 6, 8, 9]);
      const minimum = randInt(10, 80) * 10;
      const answer = Math.ceil(minimum / divisor) * divisor;

      return digitLogicQ(
        s,
        `What is the smallest integer greater than or equal to ${minimum} that is divisible by ${divisor}?`,
        answer,
        `Find the first multiple of ${divisor} at or above ${minimum}.`
      );
    }

    if (s === 'multi') {
      const divisor = pick([6, 8, 9, 12, 15, 18]);
      const digitSum = pick([9, 18, 27]);
      const values = digitLogicFindNumbers(
        100,
        999,
        number => number % divisor === 0 && digitLogicDigitSum(number) === digitSum
      );

      if (values.length === 0) return psGenDivisibilityDigitLogic();
      const askLargest = chance(0.5);

      return digitLogicQ(
        s,
        `Find the ${askLargest ? 'largest' : 'smallest'} three-digit number that is divisible by ${divisor} and has a digit sum of ${digitSum}.`,
        askLargest ? values[values.length - 1] : values[0],
        'Use both the divisibility condition and the required digit sum. The number must satisfy both.'
      );
    }

    const divisorA = pick([4, 5, 8, 9]);
    let divisorB = pick([3, 6, 7, 9]);
    while (divisorB === divisorA) divisorB = pick([3, 6, 7, 9]);
    const requiredDigit = randInt(1, 9);
    const values = digitLogicFindNumbers(
      1000,
      9999,
      number => number % divisorA === 0
        && number % divisorB === 0
        && String(number).includes(String(requiredDigit))
    );

    if (values.length === 0) return psGenDivisibilityDigitLogic();

    return digitLogicQ(
      s,
      `Find the smallest four-digit number that is divisible by both ${divisorA} and ${divisorB} and contains the digit ${requiredDigit} at least once.`,
      values[0],
      `Search through multiples of the least common multiple of ${divisorA} and ${divisorB}, beginning with the smallest four-digit multiple.`
    );
  }

  // 6. Count numbers in a range
  if (type === 6) {
    if (s === 'basic') {
      const divisor = pick([2, 3, 4, 5, 6, 8, 9, 10]);
      const maximum = randInt(5, 20) * divisor;

      return digitLogicQ(
        s,
        `How many positive integers from 1 to ${maximum}, inclusive, are divisible by ${divisor}?`,
        Math.floor(maximum / divisor),
        `Count the multiples ${divisor}, ${2 * divisor}, ${3 * divisor}, and so on up to ${maximum}.`
      );
    }

    if (s === 'multi') {
      const divisor = pick([3, 4, 6, 8, 9]);
      const minimum = randInt(2, 8) * 10;
      const maximum = minimum + randInt(80, 220);
      const digit = randInt(0, 9);
      const values = digitLogicFindNumbers(
        minimum,
        maximum,
        number => number % divisor === 0 && String(number).includes(String(digit))
      );

      return digitLogicQ(
        s,
        `How many integers from ${minimum} to ${maximum}, inclusive, are divisible by ${divisor} and contain the digit ${digit}?`,
        values.length,
        `List the multiples of ${divisor} in the interval, then keep only those containing the required digit.`
      );
    }

    const divisorA = pick([3, 4, 5, 6, 8, 9]);
    let divisorB = pick([4, 5, 6, 7, 8, 9]);
    while (divisorB === divisorA) divisorB = pick([4, 5, 6, 7, 8, 9]);
    const maximum = randInt(250, 700);
    const values = digitLogicFindNumbers(
      1,
      maximum,
      number => (number % divisorA === 0 || number % divisorB === 0)
        && number % lcm(divisorA, divisorB) !== 0
    );

    return digitLogicQ(
      s,
      `How many positive integers not greater than ${maximum} are divisible by exactly one of ${divisorA} and ${divisorB}?`,
      values.length,
      'Count multiples of each divisor, then exclude numbers divisible by both.'
    );
  }

  // 7. Reversed digits and divisibility
  if (type === 7) {
    if (s === 'basic') {
      const tens = randInt(1, 9);
      const ones = randInt(1, 9);
      const number = 10 * tens + ones;
      const reversed = 10 * ones + tens;

      return digitLogicQ(
        s,
        `The digits of ${number} are reversed. What number is formed?`,
        reversed,
        'Exchange the tens and ones digits.'
      );
    }

    if (s === 'multi') {
      let number;
      let reversed;
      let divisor;

      do {
        const digits = [randInt(1, 9), randInt(0, 9), randInt(1, 9)];
        number = digitLogicNumberFromDigits(digits);
        reversed = digitLogicReverse(number, 3);
        divisor = pick([3, 9, 11]);
      } while (number === reversed);

      const answer = Number(number % divisor === 0 && reversed % divisor === 0);

      return digitLogicQ(
        s,
        `A three-digit number is ${number}. Its digits are reversed to form ${reversed}. Are both numbers divisible by ${divisor}? Enter 1 for yes or 0 for no.`,
        answer,
        'Apply the divisibility test to both the original and reversed numbers.'
      );
    }

    let number;
    let reversed;
    let divisor;
    let difference;

    do {
      const digits = [randInt(1, 9), randInt(0, 9), randInt(1, 9)];
      number = digitLogicNumberFromDigits(digits);
      reversed = digitLogicReverse(number, 3);
      difference = Math.abs(number - reversed);
      divisor = pick([9, 11, 18, 99]);
    } while (difference === 0 || difference % divisor !== 0);

    return digitLogicQ(
      s,
      `A three-digit number is ${number}. Reverse its digits, then find the difference between the larger and smaller numbers. How many times is this difference divisible by ${divisor}?`,
      difference / divisor,
      'Form the reversed number, subtract the smaller from the larger, then divide the difference by the stated divisor.'
    );
  }

  // 8. Repeated digits and divisibility
  if (type === 8) {
    if (s === 'basic') {
      const digit = randInt(1, 9);
      const number = 111 * digit;

      return digitLogicQ(
        s,
        `A three-digit number has the same digit in all three places. The repeated digit is ${digit}. What is the number?`,
        number,
        'A number with three repeated digits is 100 times the digit, plus 10 times the digit, plus the digit.'
      );
    }

    if (s === 'multi') {
      const divisor = pick([3, 9, 11, 37]);
      const validDigits = [];

      for (let digit = 1; digit <= 9; digit++) {
        if ((111 * digit) % divisor === 0) validDigits.push(digit);
      }

      return digitLogicQ(
        s,
        `A three-digit number has the form aaa, where a is a non-zero digit. For how many values of a is the number divisible by ${divisor}?`,
        validDigits.length,
        'The number aaa equals 111 × a. Test the possible non-zero digits.'
      );
    }

    const divisor = pick([7, 13, 37]);
    const values = [];

    for (let a = 1; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        if (a === b) continue;
        const number = 1000 * a + 100 * b + 10 * a + b;
        if (number % divisor === 0) values.push(number);
      }
    }

    return digitLogicQ(
      s,
      `A four-digit number has the form abab, where a and b are different digits and a is non-zero. How many such numbers are divisible by ${divisor}?`,
      values.length,
      'Write the number as 1010a + 101b, or systematically test the permitted digit pairs.'
    );
  }

  // 9. Multiple digit conditions
  if (type === 9) {
    if (s === 'basic') {
      const divisor = pick([2, 5, 10]);
      const tens = randInt(1, 9);
      const validOnes = [];

      for (let ones = 0; ones <= 9; ones++) {
        const number = 10 * tens + ones;
        if (number % divisor === 0) validOnes.push(ones);
      }

      return digitLogicQ(
        s,
        `A two-digit number has tens digit ${tens}. How many choices are there for the ones digit if the number must be divisible by ${divisor}?`,
        validOnes.length,
        `Use the divisibility rule for ${divisor} to identify the possible final digits.`
      );
    }

    if (s === 'multi') {
      const divisor = pick([4, 6, 8, 9]);
      const values = digitLogicFindNumbers(
        100,
        999,
        number => {
          const [a, b, c] = digitLogicDigits(number, 3);
          return number % divisor === 0 && a < b && b < c;
        }
      );

      return digitLogicQ(
        s,
        `How many three-digit numbers have digits in strictly increasing order from left to right and are divisible by ${divisor}?`,
        values.length,
        'The hundreds digit must be smaller than the tens digit, which must be smaller than the ones digit. Test divisibility as well.'
      );
    }

    const divisor = pick([6, 8, 9, 12, 18]);
    const digitSum = pick([9, 18, 27]);
    const values = digitLogicFindNumbers(
      1000,
      9999,
      number => {
        const digits = digitLogicDigits(number, 4);
        return number % divisor === 0
          && digitLogicDigitSum(number) === digitSum
          && new Set(digits).size === 4;
      }
    );

    if (values.length === 0) return psGenDivisibilityDigitLogic();

    return digitLogicQ(
      s,
      `How many four-digit numbers are divisible by ${divisor}, have digit sum ${digitSum}, and use four different digits?`,
      values.length,
      'A number must satisfy all three conditions: divisibility, the stated digit sum, and no repeated digits.'
    );
  }

  // 10. Constraint and optimisation problems
  if (s === 'basic') {
    const divisor = pick([3, 4, 5, 6, 8, 9]);
    const number = randInt(20, 90);
    const addition = (divisor - (number % divisor)) % divisor;

    return digitLogicQ(
      s,
      `What is the smallest non-negative integer that must be added to ${number} to make the result divisible by ${divisor}?`,
      addition,
      'Move from the number to the next multiple of the divisor.'
    );
  }

  if (s === 'multi') {
    const divisor = pick([6, 8, 9, 12, 15, 18]);
    const minimum = randInt(100, 400);
    const maximum = minimum + randInt(80, 220);
    const forbiddenDigit = randInt(0, 9);
    const values = digitLogicFindNumbers(
      minimum,
      maximum,
      number => number % divisor === 0 && !String(number).includes(String(forbiddenDigit))
    );

    if (values.length === 0) return psGenDivisibilityDigitLogic();

    return digitLogicQ(
      s,
      `A code must be between ${minimum} and ${maximum}, inclusive, divisible by ${divisor}, and must not contain the digit ${forbiddenDigit}. What is the smallest possible code?`,
      values[0],
      `List multiples of ${divisor} from the lower limit upward and stop at the first one without the forbidden digit.`
    );
  }

  const divisorA = pick([4, 5, 6, 8, 9]);
  let divisorB = pick([6, 7, 8, 9, 11]);
  while (divisorB === divisorA) divisorB = pick([6, 7, 8, 9, 11]);
  const digitSum = pick([9, 18, 27]);
  const values = digitLogicFindNumbers(
    100,
    999,
    number => number % divisorA === 0
      && number % divisorB === 0
      && digitLogicDigitSum(number) === digitSum
  );

  if (values.length === 0) return psGenDivisibilityDigitLogic();

  return digitLogicQ(
    s,
    `A three-digit lock code must be divisible by both ${divisorA} and ${divisorB}, and its digits must add to ${digitSum}. What is the largest possible code?`,
    values[values.length - 1],
    `Search the common multiples of ${divisorA} and ${divisorB}, then keep only those with the required digit sum.`
  );
}
