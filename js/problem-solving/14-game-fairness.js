'use strict';

/* Game fairness, outcome counting, rule comparison and fair-game design. */

function gameFairnessQ(structure, text, answer, hint) {
  return psQ('gameFairness', structure, text, answer, hint);
}

function gameFairnessQFrac(structure, text, answer, hint) {
  return psQFrac('gameFairness', structure, text, answer, hint);
}

function gameFairnessDiceSumWays(target) {
  let count = 0;

  for (let first = 1; first <= 6; first++) {
    for (let second = 1; second <= 6; second++) {
      if (first + second === target) count++;
    }
  }

  return count;
}

function gameFairnessCountOrderedPairs(size, predicate, allowSame = true) {
  let count = 0;

  for (let first = 1; first <= size; first++) {
    for (let second = 1; second <= size; second++) {
      if (!allowSame && first === second) continue;
      if (predicate(first, second)) count++;
    }
  }

  return count;
}

function gameFairnessShuffle(values) {
  const copy = [...values];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function psGenGameFairness() {
  const s = chooseProblemStructure();
  const type = randInt(1, 8);

  // 1. Counting winning outcomes
  if (type === 1) {
    if (s === 'basic') {
      const sides = pick([6, 8, 10, 12]);
      const threshold = randInt(2, sides - 2);
      const greaterThan = chance(0.5);
      const winning = greaterThan ? sides - threshold : threshold;

      return gameFairnessQ(
        s,
        `A fair ${sides}-sided die is numbered from 1 to ${sides}. A player wins by rolling ${greaterThan ? `a number greater than ${threshold}` : `a number no greater than ${threshold}`}. How many winning outcomes are there?`,
        winning,
        'List the die results that satisfy the winning condition, then count them.'
      );
    }

    if (s === 'multi') {
      const target = randInt(4, 10);
      const ways = gameFairnessDiceSumWays(target);

      return gameFairnessQ(
        s,
        `Two fair six-sided dice are rolled. A player wins when the sum is ${target}. How many ordered outcomes produce a win? Treat 2 then 5 as different from 5 then 2.`,
        ways,
        'List the ordered pairs whose two numbers add to the required total.'
      );
    }

    const size = pick([5, 6, 7, 8]);
    const divisor = pick([2, 3, 4]);
    const ways = gameFairnessCountOrderedPairs(
      size,
      (first, second) => (first + second) % divisor === 0,
      false
    );

    return gameFairnessQ(
      s,
      `Two different cards are selected in order from cards numbered 1 to ${size}, without replacement. A player wins when the sum of the two card numbers is divisible by ${divisor}. How many ordered winning outcomes are possible?`,
      ways,
      'List or systematically count all ordered pairs of different cards, then keep those whose sum is divisible by the stated number.'
    );
  }

  // 2. Decide whether a game is fair
  if (type === 2) {
    if (s === 'basic') {
      const total = pick([6, 8, 10, 12]);
      const fair = chance(0.5);
      const aWins = fair ? total / 2 : randInt(1, total / 2 - 1);
      const bWins = total - aWins;

      return gameFairnessQ(
        s,
        `A spinner has ${total} equal sections. Player A wins on ${aWins} sections and Player B wins on ${bWins} sections. Is the game fair? Enter 1 for fair or 0 for unfair.`,
        fair ? 1 : 0,
        'The game is fair only when both players have the same number of equally likely winning outcomes.'
      );
    }

    if (s === 'multi') {
      const useCoins = chance(0.5);

      if (useCoins) {
        return gameFairnessQ(
          s,
          'Two fair coins are tossed. Player A wins when the two results are the same. Player B wins when the two results are different. Is the game fair? Enter 1 for fair or 0 for unfair.',
          1,
          'There are four equally likely outcomes. Compare HH and TT with HT and TH.'
        );
      }

      return gameFairnessQ(
        s,
        'Two fair six-sided dice are rolled. Player A wins when the sum is at most 7. Player B wins when the sum is greater than 7. Is the game fair? Enter 1 for fair or 0 for unfair.',
        0,
        'Count the ordered outcomes on each side of the rule. The two totals are not equal.'
      );
    }

    let targetA;
    let targetB;
    let waysA;
    let waysB;

    do {
      targetA = randInt(3, 11);
      targetB = randInt(3, 11);
    } while (targetA === targetB);

    waysA = gameFairnessDiceSumWays(targetA);
    waysB = gameFairnessDiceSumWays(targetB);

    return gameFairnessQ(
      s,
      `Two fair six-sided dice are rolled. Player A wins when the sum is ${targetA}, and Player B wins when the sum is ${targetB}. All other sums are draws. Is the game fair? Enter 1 for fair or 0 for unfair.`,
      waysA === waysB ? 1 : 0,
      `Compare the number of ordered dice outcomes that make a total of ${targetA} with the number that make a total of ${targetB}.`
    );
  }

  // 3. Compare games or plans
  if (type === 3) {
    if (s === 'basic') {
      let game1Wins;
      let game1Total;
      let game2Wins;
      let game2Total;

      do {
        game1Total = pick([6, 8, 10, 12]);
        game1Wins = randInt(1, game1Total - 1);
        game2Total = pick([6, 8, 10, 12]);
        game2Wins = randInt(1, game2Total - 1);
      } while (game1Wins * game2Total === game2Wins * game1Total);

      const answer = game1Wins * game2Total > game2Wins * game1Total ? 1 : 2;

      return gameFairnessQ(
        s,
        `Game 1 gives ${game1Wins} winning outcomes out of ${game1Total} equally likely outcomes. Game 2 gives ${game2Wins} winning outcomes out of ${game2Total} equally likely outcomes. Which game gives the better chance of winning? Enter 1 for Game 1 or 2 for Game 2.`,
        answer,
        'Compare the two winning fractions using a common denominator or cross-multiplication.'
      );
    }

    if (s === 'multi') {
      const target = pick([5, 6, 8, 9]);
      const diceWays = gameFairnessDiceSumWays(target);
      let spinnerTotal;
      let spinnerWins;

      do {
        spinnerTotal = pick([8, 10, 12]);
        spinnerWins = randInt(1, spinnerTotal - 1);
      } while (diceWays * spinnerTotal === spinnerWins * 36);

      const answer = diceWays * spinnerTotal > spinnerWins * 36 ? 1 : 2;

      return gameFairnessQ(
        s,
        `Game 1 uses two fair six-sided dice and is won when the sum is ${target}. Game 2 uses a spinner with ${spinnerTotal} equal sections, of which ${spinnerWins} are winning sections. Which game gives the better chance of winning? Enter 1 for Game 1 or 2 for Game 2.`,
        answer,
        'Find the probability of the required dice total, compare it with the spinner probability, and choose the larger value.'
      );
    }

    const options = gameFairnessShuffle([
      { description: 'a fair coin lands heads', numerator: 1, denominator: 2 },
      { description: 'a fair twelve-section spinner lands on one of 5 winning sections', numerator: 5, denominator: 12 },
      { description: 'a card numbered 1 to 9 is selected and the number is greater than 5', numerator: 4, denominator: 9 }
    ]);
    let bestIndex = 0;

    for (let i = 1; i < options.length; i++) {
      if (options[i].numerator * options[bestIndex].denominator > options[bestIndex].numerator * options[i].denominator) {
        bestIndex = i;
      }
    }

    return gameFairnessQ(
      s,
      `Three games are offered. Game 1 is won when ${options[0].description}. Game 2 is won when ${options[1].description}. Game 3 is won when ${options[2].description}. Which game gives the greatest chance of winning? Enter 1, 2, or 3.`,
      bestIndex + 1,
      'Write each winning chance as a fraction, then compare all three probabilities.'
    );
  }

  // 4. Change outcomes to make a game fair
  if (type === 4) {
    if (s === 'basic') {
      const smaller = randInt(2, 7);
      const difference = randInt(1, 6);
      const larger = smaller + difference;
      const redIsSmaller = chance(0.5);
      const red = redIsSmaller ? smaller : larger;
      const blue = redIsSmaller ? larger : smaller;

      return gameFairnessQ(
        s,
        `A bag contains ${red} red counters and ${blue} blue counters. Player A wins by drawing red and Player B wins by drawing blue. Only counters of the less common colour may be added. How many counters must be added to make the game fair?`,
        difference,
        'Make the two colour counts equal by adding the difference to the smaller group.'
      );
    }

    if (s === 'multi') {
      const total = pick([8, 10, 12, 14, 16]);
      const fairCount = total / 2;
      const aWins = randInt(1, fairCount - 1);
      const bWins = total - aWins;
      const changes = fairCount - aWins;

      return gameFairnessQ(
        s,
        `A spinner has ${total} equal sections. Player A currently wins on ${aWins} sections and Player B wins on ${bWins} sections. One change means recolouring one of Player B's sections as a Player A section. What is the minimum number of changes needed to make the game fair?`,
        changes,
        'Each recoloured section increases A by 1 and decreases B by 1, so stop when both players have half the sections.'
      );
    }

    const activeTotal = pick([10, 12, 14, 16]);
    const neutral = pick([2, 3, 4]);
    const fairCount = activeTotal / 2;
    const aWins = randInt(1, fairCount - 1);
    const bWins = activeTotal - aWins;
    const changes = fairCount - aWins;

    return gameFairnessQ(
      s,
      `A spinner has ${activeTotal + neutral} equal sections. Player A wins on ${aWins} sections, Player B wins on ${bWins} sections, and ${neutral} sections give a replay. A change may recolour one B-winning section as an A-winning section; replay sections cannot be changed. What is the minimum number of changes needed to make the game fair?`,
      changes,
      'Replay outcomes affect neither player. Balance only the A-winning and B-winning sections, noting that each change moves one section from B to A.'
    );
  }

  // 5. Two-stage games
  if (type === 5) {
    if (s === 'basic') {
      return gameFairnessQFrac(
        s,
        'Two fair coins are tossed. A player wins when the two results are the same. What is the probability of winning?',
        1 / 2,
        'The winning outcomes are HH and TT out of four equally likely outcomes.'
      );
    }

    if (s === 'multi') {
      const evenWins = chance(0.5);
      const coinSide = evenWins ? 'heads' : 'tails';
      const parity = evenWins ? 'even' : 'odd';

      return gameFairnessQFrac(
        s,
        `A fair coin is tossed and a fair six-sided die is rolled. A player wins only when the coin shows ${coinSide} and the die shows an ${parity} number. What is the probability of winning?`,
        1 / 4,
        'Multiply the probability of the required coin result by the probability of the required die result.'
      );
    }

    const target = pick([5, 6, 8, 9]);
    const sumProbability = gameFairnessDiceSumWays(target) / 36;

    return gameFairnessQFrac(
      s,
      `A fair coin is tossed and then two fair six-sided dice are rolled. A player wins only when the coin shows heads and the dice sum to ${target}. What is the probability of winning?`,
      (1 / 2) * sumProbability,
      'Find the probability of heads, find the probability of the required dice total, then multiply because both conditions must occur.'
    );
  }

  // 6. Replacement and no replacement
  if (type === 6) {
    if (s === 'basic') {
      return gameFairnessQFrac(
        s,
        'A bag contains 2 red counters and 2 blue counters. One counter is selected, replaced, and a second counter is selected. What is the probability that the two counters have the same colour?',
        1 / 2,
        'Add the probability of red then red to the probability of blue then blue.'
      );
    }

    if (s === 'multi') {
      const pair = pick([[2, 2], [3, 3], [2, 4], [3, 5]]);
      const red = pair[0];
      const blue = pair[1];
      const total = red + blue;
      const probability = (red * (red - 1) + blue * (blue - 1)) / (total * (total - 1));

      return gameFairnessQFrac(
        s,
        `A bag contains ${red} red counters and ${blue} blue counters. Two counters are selected without replacement. What is the probability that the two counters have the same colour?`,
        probability,
        'Add the probability of selecting two reds to the probability of selecting two blues.'
      );
    }

    const pair = pick([[2, 2], [3, 3], [2, 4], [3, 5]]);
    const red = pair[0];
    const blue = pair[1];
    const total = red + blue;
    const sameWithReplacement = (red * red + blue * blue) / (total * total);
    const sameWithoutReplacement = (red * (red - 1) + blue * (blue - 1)) / (total * (total - 1));
    const difference = sameWithReplacement - sameWithoutReplacement;

    return gameFairnessQFrac(
      s,
      `A bag contains ${red} red counters and ${blue} blue counters. Two counters are selected. By how much is the probability of selecting two counters of the same colour greater when the first counter is replaced than when it is not replaced?`,
      difference,
      'Calculate the same-colour probability under each rule, then subtract the no-replacement probability from the replacement probability.'
    );
  }

  // 7. Fair scores and prizes
  if (type === 7) {
    if (s === 'basic') {
      const denominator = pick([3, 4, 5, 6]);
      const bPoints = randInt(2, 6);
      const aPoints = (denominator - 1) * bPoints;

      return gameFairnessQ(
        s,
        `Player A wins with probability 1/${denominator}, while Player B wins with probability ${denominator - 1}/${denominator}. Player A receives ${aPoints} points for a win. How many points should Player B receive for a win so that both players have the same expected score?`,
        bPoints,
        'For fairness, probability multiplied by points must be equal for the two players.'
      );
    }

    if (s === 'multi') {
      const denominator = pick([4, 5, 6, 8, 10]);
      const fee = randInt(2, 8);
      const prize = denominator * fee;

      return gameFairnessQ(
        s,
        `A game costs $${fee} to play. The probability of winning is 1/${denominator}, and a losing player receives nothing. What prize should be paid for a win so that the expected payout equals the entry fee?`,
        prize,
        'For a fair game, winning probability multiplied by the prize should equal the entry fee.'
      );
    }

    const total = pick([8, 10, 12]);
    const aOutcomes = randInt(2, total - 2);
    const bOutcomes = total - aOutcomes;
    const factor = randInt(2, 5);
    const aPoints = bOutcomes * factor;
    const bPoints = aOutcomes * factor;

    return gameFairnessQ(
      s,
      `A spinner has ${total} equal sections. Player A wins on ${aOutcomes} sections and earns ${aPoints} points for a win. Player B wins on the remaining ${bOutcomes} sections. How many points should Player B earn for a win so that both players have the same expected score?`,
      bPoints,
      'Set A\'s winning probability multiplied by A\'s score equal to B\'s winning probability multiplied by B\'s score.'
    );
  }

  // 8. Design a fair game under stated constraints
  if (s === 'basic') {
    const total = pick([8, 10, 12, 14]);
    const aWins = total / 2;

    return gameFairnessQ(
      s,
      `A spinner has ${total} equal sections. Player A is assigned ${aWins} winning sections. To make the game fair with no draw sections, how many winning sections must be assigned to Player B?`,
      aWins,
      'With no draws, the two players must receive the same number of equally likely sections.'
    );
  }

  if (s === 'multi') {
    const total = pick([12, 16, 20, 24]);
    const divisor = pick([3, 4]);
    const aWins = Math.floor(total / divisor);

    return gameFairnessQ(
      s,
      `Cards numbered 1 to ${total} are equally likely to be selected. Player A wins on multiples of ${divisor}. Player B's winning rule must use the same number of card outcomes, and all other outcomes may be draws. How many card outcomes must Player B's rule contain?`,
      aWins,
      'Count the multiples of the stated divisor from 1 to the largest card number. Player B needs the same number of winning outcomes.'
    );
  }

  const designs = gameFairnessShuffle([
    {
      label: 'numbers that leave remainder 1 when divided by 3',
      set: [1, 4, 7, 10]
    },
    {
      label: 'prime numbers',
      set: [2, 3, 5, 7, 11]
    },
    {
      label: 'numbers greater than 8',
      set: [9, 10, 11, 12]
    }
  ]);
  const aSet = new Set([3, 6, 9, 12]);
  const validIndex = designs.findIndex(design =>
    design.set.length === aSet.size && design.set.every(value => !aSet.has(value))
  );

  return gameFairnessQ(
    s,
    `Cards numbered 1 to 12 are equally likely to be selected. Player A wins on multiples of 3. Player B needs a disjoint rule with the same number of winning outcomes; all remaining cards are draws. Option 1: ${designs[0].label}. Option 2: ${designs[1].label}. Option 3: ${designs[2].label}. Which option makes the game fair without overlapping Player A's outcomes? Enter 1, 2, or 3.`,
    validIndex + 1,
    'Player A has four winning cards. Choose the option that also has four cards and shares none of Player A\'s multiples of 3.'
  );
}
