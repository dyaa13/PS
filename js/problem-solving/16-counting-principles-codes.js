'use strict';

/* Counting principles and code problems based on addition, multiplication,
   slot counting, repetition rules, character patterns and code restrictions. */

function countingCodesQ(structure, text, answer, hint) {
  return psQ('countingCodes', structure, text, answer, hint);
}

function countingCodesFallingProduct(totalChoices, slots) {
  let result = 1;

  for (let i = 0; i < slots; i++) {
    result *= totalChoices - i;
  }

  return result;
}

function psGenCountingCodes() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Addition principle: one complete outcome comes from one case OR another.
  if (type === 1) {
    if (s === 'basic') {
      const red = randInt(4, 12);
      const blue = randInt(3, 10);

      return countingCodesQ(
        s,
        `A school access code is chosen from either ${red} red codes or ${blue} blue codes. The two sets do not overlap. How many different access codes are available altogether?`,
        red + blue,
        'The code comes from one case or the other, so add the two separate counts.'
      );
    }

    if (s === 'multi') {
      const lettersA = randInt(4, 9);
      const digitsA = randInt(3, 8);
      const lettersB = randInt(3, 7);
      const symbolsB = randInt(2, 5);
      const firstCase = lettersA * digitsA;
      const secondCase = lettersB * symbolsB;

      return countingCodesQ(
        s,
        `A library ID has one of two non-overlapping formats. Format A is one of ${lettersA} letters followed by one of ${digitsA} digits. Format B is one of ${lettersB} letters followed by one of ${symbolsB} symbols. How many different IDs are possible altogether?`,
        firstCase + secondCase,
        'Count each complete format using multiplication, then add the two non-overlapping cases.'
      );
    }

    const letters = randInt(5, 10);
    const digits = randInt(5, 9);
    const twoLetterCodes = letters * (letters - 1);
    const letterDigitCodes = letters * digits * (digits - 1);

    return countingCodesQ(
      s,
      `A competition code is either two different letters chosen from ${letters} available letters, or one letter followed by two different digits chosen from ${digits} available digits. The two formats cannot overlap. How many different codes are possible?`,
      twoLetterCodes + letterDigitCodes,
      'Count the two-letter format and the letter-two-digit format separately, then add the results.'
    );
  }

  // 2. Multiplication principle and the slot method.
  if (type === 2) {
    if (s === 'basic') {
      const letters = randInt(5, 12);
      const digits = randInt(4, 10);

      return countingCodesQ(
        s,
        `A two-character code has one letter chosen from ${letters} available letters, followed by one digit chosen from ${digits} available digits. Repetition is allowed. How many codes are possible?`,
        letters * digits,
        'Treat the two positions as slots and multiply the number of choices for the letter slot by the number for the digit slot.'
      );
    }

    if (s === 'multi') {
      const first = randInt(4, 9);
      const second = randInt(5, 10);
      const third = randInt(2, 6);
      const fourth = randInt(3, 8);

      return countingCodesQ(
        s,
        `A four-part security code is built in stages. There are ${first} choices for the first slot, ${second} for the second, ${third} for the third and ${fourth} for the fourth. How many complete security codes are possible?`,
        first * second * third * fourth,
        'One complete code needs one choice from every slot, so multiply all four numbers of choices.'
      );
    }

    const departments = randInt(3, 8);
    const letters = randInt(5, 10);
    const digits = randInt(5, 10);
    const symbols = randInt(2, 5);

    return countingCodesQ(
      s,
      `A staff login contains a department choice, a letter, two digits and a symbol. There are ${departments} departments, ${letters} permitted letters, ${digits} permitted digits and ${symbols} permitted symbols. Repetition is allowed in the two digit positions. How many logins are possible?`,
      departments * letters * digits * digits * symbols,
      'Write one slot for each stage: department, letter, digit, digit and symbol. Multiply the choices in all five slots.'
    );
  }

  // 3. Repetition allowed.
  if (type === 3) {
    if (s === 'basic') {
      const characters = randInt(4, 9);
      const length = randInt(2, 4);

      return countingCodesQ(
        s,
        `A ${length}-character code uses ${characters} available characters. The same character may be used more than once. How many codes are possible?`,
        characters ** length,
        'Because repetition is allowed, every slot has the same number of choices.'
      );
    }

    if (s === 'multi') {
      const letters = randInt(5, 10);
      const digits = randInt(4, 9);

      return countingCodesQ(
        s,
        `A four-character code has two letters followed by two digits. There are ${letters} permitted letters and ${digits} permitted digits. Repetition is allowed. How many codes are possible?`,
        letters * letters * digits * digits,
        'Use four slots. Repetition means both letter slots have the same number of choices, and both digit slots do as well.'
      );
    }

    const uppercase = randInt(4, 8);
    const lowercase = randInt(5, 10);
    const digits = randInt(5, 10);
    const symbols = randInt(2, 5);

    return countingCodesQ(
      s,
      `A password has one uppercase letter, two lowercase letters, one digit and one symbol in that fixed order. There are ${uppercase} permitted uppercase letters, ${lowercase} permitted lowercase letters, ${digits} permitted digits and ${symbols} permitted symbols. Repetition is allowed. How many passwords are possible?`,
      uppercase * lowercase * lowercase * digits * symbols,
      'Multiply the choices for the five fixed slots. The two lowercase slots keep the same number of choices because repetition is allowed.'
    );
  }

  // 4. Repetition not allowed.
  if (type === 4) {
    if (s === 'basic') {
      const letters = randInt(5, 12);

      return countingCodesQ(
        s,
        `A two-letter code is made from ${letters} available letters. The same letter cannot be used twice. How many different codes are possible?`,
        letters * (letters - 1),
        'There are all available letters for the first slot, then one fewer choice for the second slot.'
      );
    }

    if (s === 'multi') {
      const digits = randInt(6, 10);
      const length = randInt(3, 4);

      return countingCodesQ(
        s,
        `A ${length}-digit PIN is formed from ${digits} available digits. A digit cannot be repeated, and the PIN may begin with 0. How many PINs are possible?`,
        countingCodesFallingProduct(digits, length),
        'A PIN may begin with 0. Reduce the number of choices by one after each digit is used.'
      );
    }

    const letters = randInt(6, 10);
    const digits = randInt(6, 10);

    return countingCodesQ(
      s,
      `A five-character code has three letters followed by two digits. There are ${letters} permitted letters and ${digits} permitted digits. No letter may repeat and no digit may repeat. How many codes are possible?`,
      letters * (letters - 1) * (letters - 2) * digits * (digits - 1),
      'Count the letter slots without repetition, then count the digit slots without repetition, and multiply the two results.'
    );
  }

  // 5. Character-type patterns in any order.
  if (type === 5) {
    if (s === 'basic') {
      const letters = randInt(5, 10);
      const digits = randInt(4, 9);

      return countingCodesQ(
        s,
        `A three-character code contains exactly two letters and one digit, in any order. There are ${letters} permitted letters and ${digits} permitted digits. Repetition is allowed. How many codes are possible?`,
        3 * letters * letters * digits,
        'There are three possible letter-digit type patterns. Count one pattern, then multiply by three.'
      );
    }

    if (s === 'multi') {
      const letters = randInt(5, 10);
      const digits = randInt(5, 9);

      return countingCodesQ(
        s,
        `A three-character code contains exactly one letter and two different digits, in any order. There are ${letters} permitted letters and ${digits} permitted digits. How many codes are possible?`,
        3 * letters * digits * (digits - 1),
        'Choose the position of the letter, then choose the letter and the two ordered, non-repeating digits.'
      );
    }

    const letters = randInt(5, 9);
    const digits = randInt(5, 9);

    return countingCodesQ(
      s,
      `A four-character code contains exactly two different letters and two different digits, in any order. There are ${letters} permitted letters and ${digits} permitted digits. How many codes are possible?`,
      6 * letters * (letters - 1) * digits * (digits - 1),
      'First count the six possible positions for the two letter slots. Then choose and order two different letters and two different digits.'
    );
  }

  // 6. Exactly a stated number of one character type.
  if (type === 6) {
    if (s === 'basic') {
      const letters = randInt(5, 10);
      const digits = randInt(4, 9);

      return countingCodesQ(
        s,
        `A three-character code uses ${letters} permitted letters and ${digits} permitted digits. It must contain exactly one digit. Repetition is allowed. How many codes are possible?`,
        3 * digits * letters * letters,
        'Choose which one of the three positions contains the digit, then fill the digit and letter slots.'
      );
    }

    if (s === 'multi') {
      const letters = randInt(5, 9);
      const digits = randInt(5, 9);

      return countingCodesQ(
        s,
        `A four-character code uses ${letters} permitted letters and ${digits} permitted digits. It must contain exactly two digits. The two digits must be different, but letters may repeat. How many codes are possible?`,
        6 * digits * (digits - 1) * letters * letters,
        'Choose the two digit positions, choose two ordered different digits, then fill the two letter positions.'
      );
    }

    const letters = randInt(6, 10);
    const digits = randInt(6, 10);

    return countingCodesQ(
      s,
      `A four-character code must begin with a letter and contain exactly two digits altogether. There are ${letters} permitted letters and ${digits} permitted digits. No letter or digit may repeat. How many codes are possible?`,
      3 * letters * (letters - 1) * digits * (digits - 1),
      'The first slot is a letter. Choose the two digit positions among the remaining three slots, then fill all slots without repetition.'
    );
  }

  // 7. At least and at most, including the complement method.
  if (type === 7) {
    if (s === 'basic') {
      const letters = randInt(5, 10);
      const digits = randInt(4, 9);
      const total = (letters + digits) ** 2;
      const noDigits = letters ** 2;

      return countingCodesQ(
        s,
        `A two-character code uses ${letters} permitted letters and ${digits} permitted digits. Repetition is allowed. How many codes contain at least one digit?`,
        total - noDigits,
        'Count all two-character codes, then subtract the codes containing no digits.'
      );
    }

    if (s === 'multi') {
      const letters = randInt(5, 10);
      const digits = randInt(4, 9);
      const noDigits = letters ** 3;
      const exactlyOneDigit = 3 * digits * letters * letters;

      return countingCodesQ(
        s,
        `A three-character code uses ${letters} permitted letters and ${digits} permitted digits. Repetition is allowed. How many codes contain at most one digit?`,
        noDigits + exactlyOneDigit,
        'At most one digit means zero digits or exactly one digit. Count the two cases separately and add.'
      );
    }

    const letters = randInt(5, 9);
    const digits = randInt(5, 9);
    const total = (letters + digits) ** 4;
    const allLetters = letters ** 4;
    const allDigits = digits ** 4;

    return countingCodesQ(
      s,
      `A four-character code uses ${letters} permitted letters and ${digits} permitted digits. Repetition is allowed. How many codes contain at least one letter and at least one digit?`,
      total - allLetters - allDigits,
      'Start with all codes. Subtract the all-letter codes and the all-digit codes.'
    );
  }

  // 8. Codes, PINs and whole numbers, especially the leading-zero rule.
  if (type === 8) {
    if (s === 'basic') {
      const length = randInt(3, 5);
      const pinCount = 10 ** length;
      const numberCount = 9 * (10 ** (length - 1));

      return countingCodesQ(
        s,
        `A ${length}-digit PIN may begin with 0, but a ${length}-digit whole number cannot begin with 0. How many more ${length}-digit PINs are there than ${length}-digit whole numbers?`,
        pinCount - numberCount,
        'A PIN has 10 choices in every position. A whole number has only 9 choices for its first digit.'
      );
    }

    if (s === 'multi') {
      const length = randInt(3, 5);
      const pinCount = countingCodesFallingProduct(10, length);
      const numberCount = 9 * countingCodesFallingProduct(9, length - 1);

      return countingCodesQ(
        s,
        `Digits may not repeat. A ${length}-digit PIN may begin with 0, but a ${length}-digit whole number cannot. How many more valid PINs are there than valid whole numbers?`,
        pinCount - numberCount,
        'Count non-repeating PINs using all ten digits, then count whole numbers with a nonzero first digit and no repetition.'
      );
    }

    const length = randInt(4, 6);
    const middleSlots = length - 2;
    const answer = 9 * (10 ** middleSlots) * 5;

    return countingCodesQ(
      s,
      `How many ${length}-digit whole numbers begin with a nonzero digit and end with an even digit? Digits may repeat, and 0 is counted as even.`,
      answer,
      'The first digit has 9 choices, each middle digit has 10 choices, and the final even digit has 5 choices.'
    );
  }

  // 9. Uppercase, lowercase, digits and symbols are separate character types.
  if (type === 9) {
    if (s === 'basic') {
      const uppercase = randInt(4, 9);
      const lowercase = randInt(5, 10);
      const digits = randInt(4, 10);

      return countingCodesQ(
        s,
        `A three-character code contains one uppercase letter, followed by one lowercase letter, followed by one digit. There are ${uppercase} permitted uppercase letters, ${lowercase} permitted lowercase letters and ${digits} permitted digits. How many codes are possible?`,
        uppercase * lowercase * digits,
        'Uppercase letters, lowercase letters and digits are separate sets of choices. Multiply the three slot counts.'
      );
    }

    if (s === 'multi') {
      const uppercase = randInt(4, 8);
      const lowercase = randInt(5, 9);
      const digits = randInt(4, 9);

      return countingCodesQ(
        s,
        `A three-character code contains exactly one uppercase letter, one lowercase letter and one digit, in any order. There are ${uppercase} permitted uppercase letters, ${lowercase} permitted lowercase letters and ${digits} permitted digits. How many codes are possible?`,
        6 * uppercase * lowercase * digits,
        'There are six possible orders for the three different character types. Multiply by the choices within each type.'
      );
    }

    const uppercase = randInt(4, 8);
    const lowercase = randInt(5, 9);
    const digits = randInt(4, 9);
    const symbols = randInt(2, 5);

    return countingCodesQ(
      s,
      `A four-character password contains exactly one uppercase letter, one lowercase letter, one digit and one symbol, in any order. There are ${uppercase} permitted uppercase letters, ${lowercase} permitted lowercase letters, ${digits} permitted digits and ${symbols} permitted symbols. How many passwords are possible?`,
      24 * uppercase * lowercase * digits * symbols,
      'The four different character types can be arranged in 24 orders. Then choose one character from each type.'
    );
  }

  // 10. Multiple restrictions and code capacity.
  if (type === 10) {
    if (s === 'basic') {
      const letters = randInt(5, 10);
      const digits = randInt(4, 10);
      const capacity = letters * letters * digits;
      const required = capacity + randInt(-Math.min(40, capacity - 1), Math.min(40, capacity));
      const safeRequired = Math.max(1, required);

      return countingCodesQ(
        s,
        `A student code has two letters followed by one digit. There are ${letters} permitted letters and ${digits} permitted digits, and repetition is allowed. The school needs ${safeRequired} different codes. Is this code system large enough? Enter 1 for yes or 0 for no.`,
        capacity >= safeRequired ? 1 : 0,
        'Find the total number of possible codes, then compare it with the number required.'
      );
    }

    if (s === 'multi') {
      const first = randInt(4, 10);
      const second = randInt(4, 10);
      const missing = randInt(3, 12);
      const total = first * second * missing;

      return countingCodesQ(
        s,
        `A three-slot code system produces exactly ${total} different codes. The first slot has ${first} choices and the second slot has ${second} choices. Every complete combination is valid. How many choices must the third slot have?`,
        missing,
        'Use the multiplication principle in reverse by dividing the total by the known slot counts.'
      );
    }

    const letters = randInt(5, 9);
    const digits = randInt(5, 9);
    const allPatterns = 6 * letters * (letters - 1) * digits * (digits - 1);
    const invalidStartingZero = 3 * (digits - 1) * letters * (letters - 1);

    return countingCodesQ(
      s,
      `A four-character code contains exactly two different letters and two different digits, in any order. There are ${letters} permitted letters and ${digits} permitted digits, including 0. The code cannot begin with 0. How many valid codes are possible?`,
      allPatterns - invalidStartingZero,
      'Count all valid two-letter, two-digit arrangements without repetition, then subtract those that begin with 0.'
    );
  }

  return countingCodesQ(
    s,
    'A one-character code is chosen from 10 digits. How many codes are possible?',
    10,
    'Count the available choices.'
  );
}
