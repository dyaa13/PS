'use strict';

/* Systematic listing, pairing, arrangements, outcomes, routes and restricted counting. */

function systematicCountingQ(structure, text, answer, hint) {
  return psQ('systematicCounting', structure, text, answer, hint);
}

function systematicCountingFactorial(n) {
  let value = 1;

  for (let i = 2; i <= n; i++) {
    value *= i;
  }

  return value;
}

function systematicCountingPermutations(n, r) {
  let value = 1;

  for (let i = 0; i < r; i++) {
    value *= n - i;
  }

  return value;
}

function systematicCountingCombinations(n, r) {
  const safeR = Math.min(r, n - r);
  let numerator = 1;
  let denominator = 1;

  for (let i = 1; i <= safeR; i++) {
    numerator *= n - safeR + i;
    denominator *= i;
  }

  return numerator / denominator;
}

function systematicCountingDigitNumbers(digits, length, predicate) {
  let count = 0;

  function build(current, used) {
    if (current.length === length) {
      const number = Number(current.join(''));
      if (predicate(number, current)) count++;
      return;
    }

    digits.forEach(digit => {
      if (used.has(digit)) return;
      if (current.length === 0 && digit === 0) return;

      current.push(digit);
      used.add(digit);
      build(current, used);
      used.delete(digit);
      current.pop();
    });
  }

  build([], new Set());
  return count;
}

function systematicCountingDiceOutcomes(sides, predicate) {
  let count = 0;

  for (let first = 1; first <= sides; first++) {
    for (let second = 1; second <= sides; second++) {
      if (predicate(first, second)) count++;
    }
  }

  return count;
}

function psGenSystematicCounting() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Systematic lists: fix the first position, then list the remaining possibilities.
  if (type === 1) {
    if (s === 'basic') {
      const symbols = randInt(3, 5);
      const answer = systematicCountingPermutations(symbols, 2);

      return systematicCountingQ(
        s,
        `A student makes two-symbol labels using ${symbols} different symbols. A symbol may not be repeated. How many different labels are possible?`,
        answer,
        `Fix the first symbol in turn. For each first symbol, there are ${symbols - 1} choices for the second symbol.`
      );
    }

    if (s === 'multi') {
      const largestDigit = randInt(5, 7);
      const digits = Array.from({ length: largestDigit }, (_, index) => index + 1);
      const answer = systematicCountingDigitNumbers(
        digits,
        3,
        number => number % 2 === 0
      );

      return systematicCountingQ(
        s,
        `Using the digits 1 to ${largestDigit}, how many different three-digit even numbers can be formed if no digit may be repeated?`,
        answer,
        'List the possible even units digits first. For each one, count the remaining choices for the hundreds and tens digits.'
      );
    }

    const largestDigit = randInt(5, 7);
    const lowerHundreds = randInt(2, largestDigit - 2);
    const digits = Array.from({ length: largestDigit + 1 }, (_, index) => index);
    const lowerBound = lowerHundreds * 100;
    const answer = systematicCountingDigitNumbers(
      digits,
      3,
      number => number > lowerBound && number % 2 === 0
    );

    return systematicCountingQ(
      s,
      `Using the digits 0 to ${largestDigit}, how many different three-digit even numbers greater than ${lowerBound} can be formed if no digit may be repeated?`,
      answer,
      'Classify the numbers by hundreds digit and then by the possible even units digits. Remember that the first digit cannot be 0.'
    );
  }

  // 2. Tables and two-way choices.
  if (type === 2) {
    if (s === 'basic') {
      const mains = randInt(3, 7);
      const drinks = randInt(2, 6);

      return systematicCountingQ(
        s,
        `A lunch consists of one main meal and one drink. There are ${mains} main meals and ${drinks} drinks. How many different lunches are possible?`,
        mains * drinks,
        'A two-way table would have one row for each main meal and one column for each drink.'
      );
    }

    if (s === 'multi') {
      const colours = randInt(4, 6);
      const sizes = randInt(3, 5);
      const unavailable = randInt(2, Math.min(4, colours * sizes - 1));

      return systematicCountingQ(
        s,
        `A shirt is chosen by colour and size. There are ${colours} colours and ${sizes} sizes. Every colour-size combination is available except for ${unavailable} specific combinations. How many available shirts are there?`,
        colours * sizes - unavailable,
        'Count every colour-size pair, then remove the unavailable cells from the table.'
      );
    }

    const meals = randInt(4, 6);
    const drinks = randInt(3, 5);
    const desserts = randInt(2, 4);
    const answer = meals * drinks * desserts - desserts - 1;

    return systematicCountingQ(
      s,
      `A meal deal contains one of ${meals} meals, one of ${drinks} drinks and one of ${desserts} desserts. One particular meal cannot be paired with one particular drink, regardless of dessert. One other separate meal-drink-dessert combination is unavailable. How many valid meal deals are possible?`,
      answer,
      'Start with all three-stage choices. Remove every dessert choice attached to the forbidden meal-drink pair, then remove the one separate unavailable combination.'
    );
  }

  // 3. Tree-style multi-stage choices and separate routes.
  if (type === 3) {
    if (s === 'basic') {
      const firstStage = randInt(3, 7);
      const secondStage = randInt(2, 6);

      return systematicCountingQ(
        s,
        `A visitor chooses one of ${firstStage} activities and then one of ${secondStage} session times. How many different activity-time plans are possible?`,
        firstStage * secondStage,
        'Each branch for an activity has the same number of session-time branches.'
      );
    }

    if (s === 'multi') {
      const toA = randInt(2, 5);
      const fromA = randInt(2, 5);
      const toB = randInt(2, 5);
      const fromB = randInt(2, 5);

      return systematicCountingQ(
        s,
        `A journey from a school to a museum must go through either Hub A or Hub B. There are ${toA} routes from the school to Hub A and ${fromA} routes from Hub A to the museum. There are ${toB} routes from the school to Hub B and ${fromB} routes from Hub B to the museum. How many different journeys are possible?`,
        toA * fromA + toB * fromB,
        'Multiply within each hub route, then add the two non-overlapping cases.'
      );
    }

    const toA = randInt(3, 6);
    const fromA = randInt(2, 5);
    const toB = randInt(2, 5);
    const fromB = randInt(3, 6);
    const answer = (toA - 1) * fromA + toB * fromB - 1;

    return systematicCountingQ(
      s,
      `A delivery can travel through Hub A or Hub B. Normally there are ${toA} first-stage routes and ${fromA} second-stage routes through Hub A, and ${toB} first-stage routes and ${fromB} second-stage routes through Hub B. One first-stage route to Hub A is closed. Through Hub B, one specific first-stage and second-stage route combination is not allowed. How many valid delivery journeys remain?`,
      answer,
      'Count the valid branches through each hub separately. A closed first-stage route removes all branches that followed it.'
    );
  }

  // 4. Repetition and no repetition in non-code contexts.
  if (type === 4) {
    if (s === 'basic') {
      const colours = randInt(4, 7);

      return systematicCountingQ(
        s,
        `A two-flag signal uses two different colours selected from ${colours} available colours. The top and bottom positions matter. How many signals are possible?`,
        systematicCountingPermutations(colours, 2),
        'Choose the top flag first, then choose a different colour for the bottom flag.'
      );
    }

    if (s === 'multi') {
      const stations = randInt(5, 8);

      return systematicCountingQ(
        s,
        `A team visits three different activity stations, in order, from ${stations} available stations. No station may be visited twice. How many different three-station schedules are possible?`,
        systematicCountingPermutations(stations, 3),
        'The number of available stations decreases after each choice.'
      );
    }

    const sports = randInt(4, 6);
    const snacks = randInt(3, 5);
    const answer = 2
      * systematicCountingPermutations(sports, 2)
      * systematicCountingPermutations(snacks, 2);

    return systematicCountingQ(
      s,
      `A four-stage festival plan must alternate between a sport and a snack. It may begin with either type. There are ${sports} sports and ${snacks} snacks, and no sport or snack may be repeated. How many valid plans are possible?`,
      answer,
      'There are two possible type patterns. For each pattern, choose two ordered, different sports and two ordered, different snacks.'
    );
  }

  // 5. Decide whether order matters.
  if (type === 5) {
    if (s === 'basic') {
      const students = randInt(5, 9);
      const ordered = chance(0.5);

      return systematicCountingQ(
        s,
        ordered
          ? `From ${students} students, one captain and one vice-captain are selected. How many different selections are possible?`
          : `From ${students} students, a two-person team is selected. The two members have the same role. How many different teams are possible?`,
        ordered
          ? systematicCountingPermutations(students, 2)
          : systematicCountingCombinations(students, 2),
        ordered
          ? 'Captain and vice-captain are different roles, so reversing the students gives a different selection.'
          : 'The order of the two team members does not create a new team.'
      );
    }

    if (s === 'multi') {
      const teams = randInt(5, 10);
      const twice = chance(0.5);

      return systematicCountingQ(
        s,
        `${teams} teams enter a round-robin competition. Every pair of teams plays ${twice ? 'twice' : 'once'}. How many matches are played altogether?`,
        systematicCountingCombinations(teams, 2) * (twice ? 2 : 1),
        'Count each unordered pair of teams once, then double the result only when each pair plays twice.'
      );
    }

    const students = randInt(6, 10);
    const answer = systematicCountingCombinations(students, 3) * 3;

    return systematicCountingQ(
      s,
      `A three-person team is selected from ${students} students. After the team is chosen, one of its three members is appointed leader. How many different team-and-leader outcomes are possible?`,
      answer,
      'First count the three-person teams without order. Then choose one leader from each team.'
    );
  }

  // 6. Whole-number formation with place-value restrictions.
  if (type === 6) {
    if (s === 'basic') {
      const largestDigit = randInt(5, 8);
      const evenDigits = Math.floor(largestDigit / 2);

      return systematicCountingQ(
        s,
        `Using the digits 1 to ${largestDigit}, how many two-digit even numbers can be formed if digits may be repeated?`,
        largestDigit * evenDigits,
        'Choose the units digit from the even digits, then choose any available digit for the tens place.'
      );
    }

    if (s === 'multi') {
      const largestDigit = randInt(5, 7);
      const digits = Array.from({ length: largestDigit + 1 }, (_, index) => index);
      const answer = systematicCountingDigitNumbers(
        digits,
        3,
        number => number % 2 === 1
      );

      return systematicCountingQ(
        s,
        `Using the digits 0 to ${largestDigit}, how many three-digit odd numbers can be formed if no digit may be repeated?`,
        answer,
        'Start with the possible odd units digits. The hundreds digit cannot be 0 or the chosen units digit.'
      );
    }

    const largestDigit = randInt(5, 7);
    const lowerThousands = randInt(2, largestDigit - 1);
    const digits = Array.from({ length: largestDigit + 1 }, (_, index) => index);
    const lowerBound = lowerThousands * 1000;
    const answer = systematicCountingDigitNumbers(
      digits,
      4,
      number => number > lowerBound && number % 5 === 0
    );

    return systematicCountingQ(
      s,
      `Using the digits 0 to ${largestDigit}, how many four-digit numbers greater than ${lowerBound} and divisible by 5 can be formed if no digit may be repeated?`,
      answer,
      'A number divisible by 5 ends in 0 or 5. Count by final digit, then apply the lower-bound and no-repetition restrictions.'
    );
  }

  // 7. Pairing, handshakes and restricted arrangements.
  if (type === 7) {
    if (s === 'basic') {
      const people = randInt(5, 10);

      return systematicCountingQ(
        s,
        `${people} people each shake hands with every other person exactly once. How many handshakes occur?`,
        systematicCountingCombinations(people, 2),
        'Each handshake is one unordered pair. Do not count the same two people twice.'
      );
    }

    if (s === 'multi') {
      const players = randInt(6, 10);
      const absent = randInt(1, 2);
      const present = players - absent;

      return systematicCountingQ(
        s,
        `${players} players were expected at a chess club, but ${absent} ${absent === 1 ? 'player was' : 'players were'} absent. Every pair of players who attended played one game. How many games were played?`,
        systematicCountingCombinations(present, 2),
        'Find the number who attended, then count every unordered pair of attendees.'
      );
    }

    const people = randInt(5, 7);
    const answer = systematicCountingFactorial(people)
      - 2 * systematicCountingFactorial(people - 1);

    return systematicCountingQ(
      s,
      `${people} people stand in a line. Two particular people, A and B, are not allowed to stand next to each other. How many valid arrangements are possible?`,
      answer,
      'Count all arrangements, then subtract the arrangements in which A and B form one adjacent block. The block can be AB or BA.'
    );
  }

  // 8. Coins, dice and ordered experimental outcomes.
  if (type === 8) {
    if (s === 'basic') {
      const tosses = randInt(3, 6);
      const heads = randInt(1, tosses - 1);

      return systematicCountingQ(
        s,
        `A fair coin is tossed ${tosses} times. How many different ordered outcomes contain exactly ${heads} ${heads === 1 ? 'head' : 'heads'}?`,
        systematicCountingCombinations(tosses, heads),
        'Choose which toss positions show heads. The remaining positions are tails.'
      );
    }

    if (s === 'multi') {
      const sides = 6;
      const target = randInt(5, 9);
      const answer = systematicCountingDiceOutcomes(
        sides,
        (first, second) => first + second === target
      );

      return systematicCountingQ(
        s,
        `Two distinguishable six-sided dice are rolled. How many ordered outcomes have a total of ${target}?`,
        answer,
        'List the first die systematically from 1 to 6 and find the matching second-die value.'
      );
    }

    const sides = 6;
    const target = randInt(6, 9);
    const specialFace = randInt(5, 6);
    const answer = systematicCountingDiceOutcomes(
      sides,
      (first, second) => first + second === target || first === specialFace || second === specialFace
    );

    return systematicCountingQ(
      s,
      `Two distinguishable six-sided dice are rolled. How many ordered outcomes have a total of ${target} or have at least one die showing ${specialFace}?`,
      answer,
      'Count both cases, but subtract outcomes that satisfy both conditions so they are not counted twice.'
    );
  }

  // 9. Routes and shortest paths without a diagram.
  if (type === 9) {
    if (s === 'basic') {
      const firstLeg = randInt(2, 6);
      const secondLeg = randInt(2, 6);

      return systematicCountingQ(
        s,
        `There are ${firstLeg} routes from Town A to Town B and ${secondLeg} routes from Town B to Town C. Every journey from A to C must pass through B. How many different journeys are possible?`,
        firstLeg * secondLeg,
        'Pair every first-leg route with every second-leg route.'
      );
    }

    if (s === 'multi') {
      const right = randInt(2, 5);
      const up = randInt(2, 4);

      return systematicCountingQ(
        s,
        `A robot moves from the southwest corner of a rectangular grid to the northeast corner. A shortest route requires exactly ${right} moves right and ${up} moves up, in any order. How many shortest routes are possible?`,
        systematicCountingCombinations(right + up, right),
        'A route is determined by choosing which move positions are the right moves; all other positions are up moves.'
      );
    }

    const right = randInt(4, 6);
    const up = randInt(3, 5);
    const closedRight = randInt(1, right - 1);
    const closedUp = randInt(1, up - 1);
    const total = systematicCountingCombinations(right + up, right);
    const throughClosed = systematicCountingCombinations(closedRight + closedUp, closedRight)
      * systematicCountingCombinations(
        (right - closedRight) + (up - closedUp),
        right - closedRight
      );

    return systematicCountingQ(
      s,
      `A shortest grid route requires ${right} moves right and ${up} moves up. The intersection reached after exactly ${closedRight} moves right and ${closedUp} moves up is closed. Moving only right or up, how many shortest routes avoid the closed intersection?`,
      total - throughClosed,
      'Count all shortest routes, then subtract the routes that pass through the closed intersection. Count the two parts of a route through that point separately.'
    );
  }

  // 10. Complements, overlap and correcting double counting.
  if (s === 'basic') {
    const tosses = randInt(3, 7);

    return systematicCountingQ(
      s,
      `A coin is tossed ${tosses} times. How many ordered outcomes contain at least one head?`,
      2 ** tosses - 1,
      'Count all outcomes, then subtract the one outcome containing no heads.'
    );
  }

  if (s === 'multi') {
    const divisorA = pick([3, 4, 5, 6]);
    let divisorB = pick([4, 5, 6, 7, 8]);
    while (divisorB === divisorA || divisorA % divisorB === 0 || divisorB % divisorA === 0) {
      divisorB = pick([4, 5, 6, 7, 8]);
    }
    const upper = randInt(80, 180);
    const overlap = lcm(divisorA, divisorB);
    const answer = Math.floor(upper / divisorA)
      + Math.floor(upper / divisorB)
      - Math.floor(upper / overlap);

    return systematicCountingQ(
      s,
      `From 1 to ${upper}, inclusive, how many integers are divisible by ${divisorA} or ${divisorB}?`,
      answer,
      'Add the two multiple counts, then subtract the numbers divisible by both because they were counted twice.'
    );
  }

  const divisorA = pick([3, 4, 5, 6]);
  let divisorB = pick([4, 5, 6, 7, 8]);
  while (divisorB === divisorA || divisorA % divisorB === 0 || divisorB % divisorA === 0) {
    divisorB = pick([4, 5, 6, 7, 8]);
  }
  const upper = randInt(100, 220);
  const overlap = lcm(divisorA, divisorB);
  const answer = Math.floor(upper / divisorA)
    + Math.floor(upper / divisorB)
    - 2 * Math.floor(upper / overlap);

  return systematicCountingQ(
    s,
    `From 1 to ${upper}, inclusive, how many integers are divisible by exactly one of ${divisorA} and ${divisorB}?`,
    answer,
    'Numbers divisible by both do not qualify. They appear in both individual counts, so remove them twice.'
  );
}
