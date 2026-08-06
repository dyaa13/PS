'use strict';

/* Minimum and maximum problems involving capacity, resources, budgets,
   time, geometry, cost, redistribution and guaranteed outcomes. */

function minimumMaximumQ(structure, text, answer, hint) {
  return psQ('minimumMaximum', structure, text, answer, hint);
}

function minimumMaximumCeilDiv(total, capacity) {
  return Math.ceil(total / capacity);
}

function minimumMaximumMinimumVehicles(totalPeople, largeCapacity, smallCapacity, maxLarge) {
  let best = Infinity;

  for (let large = 0; large <= maxLarge; large++) {
    const remaining = Math.max(0, totalPeople - large * largeCapacity);
    const small = minimumMaximumCeilDiv(remaining, smallCapacity);
    best = Math.min(best, large + small);
  }

  return best;
}

function minimumMaximumClosestMultipleChange(value, divisor) {
  const remainder = value % divisor;
  return remainder === 0 ? 0 : Math.min(remainder, divisor - remainder);
}

function minimumMaximumMaxMixedProduction(
  resourceA,
  resourceB,
  productAUseA,
  productAUseB,
  productBUseA,
  productBUseB,
  minimumProductA
) {
  let best = 0;

  for (let productA = minimumProductA; productA * productAUseA <= resourceA; productA++) {
    const remainingA = resourceA - productA * productAUseA;
    const remainingB = resourceB - productA * productAUseB;

    if (remainingB < 0) break;

    const productB = Math.min(
      Math.floor(remainingA / productBUseA),
      Math.floor(remainingB / productBUseB)
    );

    best = Math.max(best, productA + productB);
  }

  return best;
}

function minimumMaximumMaxItemsFromPacks(
  budget,
  packSize,
  packCost,
  singleCost
) {
  let best = 0;

  for (let packs = 0; packs * packCost <= budget; packs++) {
    const remaining = budget - packs * packCost;
    const singles = Math.floor(remaining / singleCost);
    best = Math.max(best, packs * packSize + singles);
  }

  return best;
}

function minimumMaximumTwoMachineTime(durations) {
  const total = durations.reduce((sum, value) => sum + value, 0);
  let best = total;
  const combinations = 1 << durations.length;

  for (let mask = 0; mask < combinations; mask++) {
    let firstMachine = 0;

    for (let i = 0; i < durations.length; i++) {
      if (mask & (1 << i)) firstMachine += durations[i];
    }

    const secondMachine = total - firstMachine;
    best = Math.min(best, Math.max(firstMachine, secondMachine));
  }

  return best;
}

function minimumMaximumMinimumPerimeterForArea(area) {
  let best = Infinity;

  for (let width = 1; width * width <= area; width++) {
    if (area % width !== 0) continue;
    const length = area / width;
    best = Math.min(best, 2 * (length + width));
  }

  return best;
}

function minimumMaximumMaximumThreeSideArea(fenceLength) {
  let best = 0;

  for (let width = 1; 2 * width < fenceLength; width++) {
    const length = fenceLength - 2 * width;
    best = Math.max(best, width * length);
  }

  return best;
}

function minimumMaximumMinimumPackCost(
  requiredItems,
  firstSize,
  firstCost,
  secondSize,
  secondCost
) {
  let best = Infinity;
  const maxFirst = minimumMaximumCeilDiv(requiredItems, firstSize) + 2;
  const maxSecond = minimumMaximumCeilDiv(requiredItems, secondSize) + 2;

  for (let first = 0; first <= maxFirst; first++) {
    for (let second = 0; second <= maxSecond; second++) {
      const items = first * firstSize + second * secondSize;
      if (items < requiredItems) continue;
      best = Math.min(best, first * firstCost + second * secondCost);
    }
  }

  return best;
}

function minimumMaximumAdjacentRedistributionMoves(counts) {
  const total = counts.reduce((sum, value) => sum + value, 0);
  const target = total / counts.length;
  let prefixDifference = 0;
  let moves = 0;

  for (let i = 0; i < counts.length - 1; i++) {
    prefixDifference += counts[i] - target;
    moves += Math.abs(prefixDifference);
  }

  return moves;
}

function psGenMinimumMaximum() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Minimum containers and vehicles
  if (type === 1) {
    if (s === 'basic') {
      const capacity = randInt(5, 12);
      const fullContainers = randInt(4, 14);
      const extra = randInt(1, capacity - 1);
      const total = fullContainers * capacity + extra;

      return minimumMaximumQ(
        s,
        `${total} sports balls must be packed into boxes that hold at most ${capacity} balls each. What is the minimum number of boxes required?`,
        fullContainers + 1,
        'Divide the total by the capacity. A partly filled final box is still required.'
      );
    }

    if (s === 'multi') {
      const capacity = randInt(5, 8);
      const buses = randInt(4, 9);
      const adults = buses + randInt(0, 2);
      const minimumChildrenForBuses = (buses - 1) * (capacity - 1) + 1;
      const maximumChildren = Math.min(
        buses * (capacity - 1),
        buses * capacity - adults
      );
      const children = randInt(minimumChildrenForBuses, maximumChildren);
      const total = adults + children;
      const answer = Math.max(
        minimumMaximumCeilDiv(total, capacity),
        minimumMaximumCeilDiv(children, capacity - 1)
      );

      return minimumMaximumQ(
        s,
        `${adults} adults and ${children} children are travelling in vehicles that hold at most ${capacity} people. Every vehicle used must contain at least one adult. What is the minimum number of vehicles required?`,
        answer,
        'Check both the total passenger capacity and the maximum number of children that can travel when every vehicle needs an adult.'
      );
    }

    const largeCapacity = randInt(9, 14);
    const smallCapacity = randInt(4, largeCapacity - 3);
    const maxLarge = randInt(1, 4);
    const total = randInt(
      maxLarge * largeCapacity + smallCapacity + 1,
      maxLarge * largeCapacity + smallCapacity * 5
    );
    const answer = minimumMaximumMinimumVehicles(
      total,
      largeCapacity,
      smallCapacity,
      maxLarge
    );

    return minimumMaximumQ(
      s,
      `A group of ${total} people must be transported. A large bus holds ${largeCapacity} people, a small van holds ${smallCapacity} people, and no more than ${maxLarge} large ${maxLarge === 1 ? 'bus is' : 'buses are'} available. What is the minimum total number of vehicles required?`,
      answer,
      'Try each possible number of large buses from zero to the maximum available, then fill the remaining places with the minimum number of vans.'
    );
  }

  // 2. Maximum number of complete groups or packs
  if (type === 2) {
    if (s === 'basic') {
      const groupSize = randInt(4, 12);
      const groups = randInt(5, 16);
      const remainder = randInt(1, groupSize - 1);
      const total = groups * groupSize + remainder;

      return minimumMaximumQ(
        s,
        `${total} students are placed into complete teams of ${groupSize}. What is the maximum number of complete teams that can be formed?`,
        groups,
        'Only complete teams count, so use the whole-number quotient.'
      );
    }

    if (s === 'multi') {
      const pencilsPerPack = randInt(2, 6);
      const booksPerPack = randInt(2, 5);
      const limitingPacks = randInt(5, 14);
      const pencilExtraPacks = randInt(0, 5);
      const bookExtraPacks = randInt(0, 5);
      const pencils = (limitingPacks + pencilExtraPacks) * pencilsPerPack + randInt(0, pencilsPerPack - 1);
      const books = (limitingPacks + bookExtraPacks) * booksPerPack + randInt(0, booksPerPack - 1);
      const answer = Math.min(
        Math.floor(pencils / pencilsPerPack),
        Math.floor(books / booksPerPack)
      );

      return minimumMaximumQ(
        s,
        `Each study pack needs ${pencilsPerPack} pencils and ${booksPerPack} exercise books. There are ${pencils} pencils and ${books} exercise books available. What is the maximum number of complete study packs that can be made?`,
        answer,
        'Find how many packs each resource can support. The smaller result is the maximum number of complete packs.'
      );
    }

    const ribbonPerPack = randInt(2, 5);
    const cardsPerPack = randInt(2, 6);
    const stickersPerPack = randInt(3, 8);
    const reserveCards = randInt(3, 10);
    const basePacks = randInt(6, 15);
    const ribbon = (basePacks + randInt(0, 4)) * ribbonPerPack;
    const cards = reserveCards + (basePacks + randInt(0, 4)) * cardsPerPack;
    const stickers = (basePacks + randInt(0, 4)) * stickersPerPack;
    const answer = Math.min(
      Math.floor(ribbon / ribbonPerPack),
      Math.floor((cards - reserveCards) / cardsPerPack),
      Math.floor(stickers / stickersPerPack)
    );

    return minimumMaximumQ(
      s,
      `Each celebration pack needs ${ribbonPerPack} m of ribbon, ${cardsPerPack} cards and ${stickersPerPack} stickers. A club has ${ribbon} m of ribbon, ${cards} cards and ${stickers} stickers, but ${reserveCards} cards must be kept unused. What is the maximum number of complete packs that can be made?`,
      answer,
      'Subtract the required reserve first, then find how many packs each remaining resource can support.'
    );
  }

  // 3. Minimum amount to add or remove
  if (type === 3) {
    if (s === 'basic') {
      const divisor = randInt(4, 12);
      const quotient = randInt(5, 18);
      const remainder = randInt(1, divisor - 1);
      const total = quotient * divisor + remainder;
      const answer = divisor - remainder;

      return minimumMaximumQ(
        s,
        `${total} books are to be packed equally into piles of ${divisor}. What is the minimum number of additional books needed so that every pile is complete?`,
        answer,
        'Find the remainder, then complete the next group.'
      );
    }

    if (s === 'multi') {
      const divisor = randInt(5, 15);
      const quotient = randInt(6, 20);
      const remainder = randInt(1, divisor - 1);
      const total = quotient * divisor + remainder;
      const answer = minimumMaximumClosestMultipleChange(total, divisor);

      return minimumMaximumQ(
        s,
        `A warehouse has ${total} cans. The cans must be placed into complete cartons of ${divisor}. Cans may either be added or removed. What is the minimum number of cans that must be changed?`,
        answer,
        'Compare removing the remainder with adding enough cans to reach the next multiple.'
      );
    }

    const firstDivisor = pick([4, 5, 6, 8]);
    let secondDivisor;

    do {
      secondDivisor = pick([6, 8, 9, 10, 12]);
    } while (secondDivisor === firstDivisor);

    const commonMultiple = lcm(firstDivisor, secondDivisor);
    const multiplier = randInt(3, 12);
    const offset = randInt(1, commonMultiple - 1);
    const total = multiplier * commonMultiple + offset;
    const lowerChange = offset;
    const upperChange = commonMultiple - offset;
    const answer = Math.min(lowerChange, upperChange);

    return minimumMaximumQ(
      s,
      `A school has ${total} counters. The total must be divisible by both ${firstDivisor} and ${secondDivisor}. Counters may be added or removed. What is the minimum number of counters that must be changed?`,
      answer,
      'Find the least common multiple of the two divisors, then compare the distance to the nearest lower and higher common multiples.'
    );
  }

  // 4. Maximum production with limited resources
  if (type === 4) {
    if (s === 'basic') {
      const materialPerItem = randInt(3, 9);
      const items = randInt(7, 20);
      const extra = randInt(0, materialPerItem - 1);
      const material = items * materialPerItem + extra;

      return minimumMaximumQ(
        s,
        `Each banner needs ${materialPerItem} m of fabric. A workshop has ${material} m of fabric. What is the maximum number of complete banners that can be made?`,
        items,
        'Divide the available fabric by the amount needed for one banner and keep only complete banners.'
      );
    }

    if (s === 'multi') {
      const woodPerItem = randInt(2, 6);
      const screwsPerItem = randInt(3, 9);
      const target = randInt(6, 16);
      const wood = (target + randInt(0, 5)) * woodPerItem + randInt(0, woodPerItem - 1);
      const screws = (target + randInt(0, 5)) * screwsPerItem + randInt(0, screwsPerItem - 1);
      const answer = Math.min(
        Math.floor(wood / woodPerItem),
        Math.floor(screws / screwsPerItem)
      );

      return minimumMaximumQ(
        s,
        `Each shelf needs ${woodPerItem} wooden boards and ${screwsPerItem} screws. The workshop has ${wood} boards and ${screws} screws. What is the maximum number of complete shelves that can be made?`,
        answer,
        'Calculate the number supported by each resource and use the smaller result.'
      );
    }

    const standardWood = randInt(2, 4);
    const standardHours = randInt(2, 4);
    const premiumWood = standardWood + randInt(1, 3);
    const premiumHours = standardHours + randInt(1, 3);
    const minimumPremium = randInt(2, 5);
    const additionalStandardCapacity = randInt(4, 12);
    const wood = minimumPremium * premiumWood
      + additionalStandardCapacity * standardWood
      + randInt(0, standardWood - 1);
    const hours = minimumPremium * premiumHours
      + additionalStandardCapacity * standardHours
      + randInt(0, standardHours - 1);
    const answer = minimumMaximumMaxMixedProduction(
      wood,
      hours,
      premiumWood,
      premiumHours,
      standardWood,
      standardHours,
      minimumPremium
    );

    return minimumMaximumQ(
      s,
      `A workshop makes premium and standard display stands. A premium stand needs ${premiumWood} boards and ${premiumHours} labour-hours. A standard stand needs ${standardWood} boards and ${standardHours} labour-hours. The workshop has ${wood} boards and ${hours} labour-hours and must make at least ${minimumPremium} premium stands. What is the maximum total number of stands it can make?`,
      answer,
      'Try feasible numbers of premium stands starting from the required minimum, then use the remaining resources for as many standard stands as possible.'
    );
  }

  // 5. Maximum purchases within a budget
  if (type === 5) {
    if (s === 'basic') {
      const price = randInt(3, 12);
      const items = randInt(5, 18);
      const remainder = randInt(0, price - 1);
      const budget = items * price + remainder;

      return minimumMaximumQ(
        s,
        `A notebook costs $${price}. A student has $${budget}. What is the maximum number of notebooks the student can buy?`,
        items,
        'Divide the budget by the price and use the whole-number quotient.'
      );
    }

    if (s === 'multi') {
      const delivery = randInt(5, 18);
      const price = randInt(3, 10);
      const items = randInt(6, 20);
      const remainder = randInt(0, price - 1);
      const budget = delivery + items * price + remainder;

      return minimumMaximumQ(
        s,
        `An online store charges a fixed delivery fee of $${delivery}, then $${price} for each folder. A school has a total budget of $${budget}. What is the maximum number of folders it can order?`,
        items,
        'Subtract the fixed delivery fee before dividing the remaining budget by the price per folder.'
      );
    }

    const packSize = randInt(3, 8);
    const singleCost = randInt(3, 8);
    const packCost = packSize * singleCost - randInt(1, singleCost * 2);
    const budget = randInt(packCost * 3, packCost * 8 + singleCost * 4);
    const answer = minimumMaximumMaxItemsFromPacks(
      budget,
      packSize,
      packCost,
      singleCost
    );

    return minimumMaximumQ(
      s,
      `Markers may be bought in packs of ${packSize} for $${packCost} per pack or singly for $${singleCost} each. A teacher has $${budget}. What is the maximum number of markers that can be bought?`,
      answer,
      'Try each possible number of packs, use the remaining money for single markers, and keep the greatest total number of markers.'
    );
  }

  // 6. Minimum time or number of trips
  if (type === 6) {
    if (s === 'basic') {
      const capacity = randInt(4, 10);
      const trips = randInt(4, 12);
      const extra = randInt(1, capacity - 1);
      const items = (trips - 1) * capacity + extra;

      return minimumMaximumQ(
        s,
        `A trolley carries at most ${capacity} boxes per trip. What is the minimum number of trips needed to move ${items} boxes?`,
        trips,
        'Divide by the trip capacity and include a final trip for any remainder.'
      );
    }

    if (s === 'multi') {
      const loads = randInt(3, 7);
      const washTime = pick([20, 25, 30, 35, 40]);
      const dryTime = pick([25, 30, 35, 40, 45]);
      const answer = washTime + dryTime + (loads - 1) * Math.max(washTime, dryTime);

      return minimumMaximumQ(
        s,
        `A laundry has one washing machine and one dryer. Each of ${loads} loads needs ${washTime} minutes in the washer and then ${dryTime} minutes in the dryer. The machines may work at the same time on different loads. What is the minimum number of minutes needed to finish all ${loads} loads?`,
        answer,
        'After the first load, the slower machine controls how often another load can be completed.'
      );
    }

    const base = randInt(4, 9) * 5;
    const durations = [
      base,
      base + randInt(-2, 2) * 5,
      base + randInt(-2, 2) * 5,
      base + randInt(-2, 2) * 5
    ].map(value => Math.max(10, value));
    const answer = minimumMaximumTwoMachineTime(durations);

    return minimumMaximumQ(
      s,
      `Four printing jobs take ${durations[0]}, ${durations[1]}, ${durations[2]} and ${durations[3]} minutes. Two identical printers start at the same time, and each printer can complete only one job at a time. Jobs cannot be split. What is the minimum number of minutes needed to complete all four jobs?`,
      answer,
      'Divide the four jobs between the two printers so that the two total working times are as balanced as possible.'
    );
  }

  // 7. Maximum area and minimum perimeter
  if (type === 7) {
    if (s === 'basic') {
      const side = randInt(4, 15);
      const perimeter = 4 * side;
      const area = side * side;

      return minimumMaximumQ(
        s,
        `A rectangular enclosure has a perimeter of ${perimeter} m. Its side lengths must be whole numbers. What is the greatest possible area, in square metres?`,
        area,
        'For a fixed perimeter, the rectangle with side lengths closest to each other has the greatest area.'
      );
    }

    if (s === 'multi') {
      const pairs = pick([
        [6, 8], [6, 12], [8, 12], [8, 15], [9, 12], [10, 14], [12, 15]
      ]);
      const area = pairs[0] * pairs[1];
      const answer = minimumMaximumMinimumPerimeterForArea(area);

      return minimumMaximumQ(
        s,
        `A rectangular floor has an area of ${area} m². Its length and width must both be whole numbers. What is the smallest possible perimeter, in metres?`,
        answer,
        'List the factor pairs of the area. The pair with the closest side lengths gives the smallest perimeter.'
      );
    }

    const fenceLength = pick([24, 30, 36, 42, 48, 54, 60]);
    const answer = minimumMaximumMaximumThreeSideArea(fenceLength);

    return minimumMaximumQ(
      s,
      `A farmer has ${fenceLength} m of fencing to make a rectangular pen beside a straight wall. The wall forms one side, so fencing is needed for only the other three sides. All side lengths must be whole numbers. What is the greatest possible area, in square metres?`,
      answer,
      'Let the two equal widths use part of the fencing and use the remainder for the length beside the wall. Compare the possible integer areas.'
    );
  }

  // 8. Lowest cost or highest profit
  if (type === 8) {
    if (s === 'basic') {
      const cost = randInt(3, 12);
      const sellingPrice = cost + randInt(2, 8);
      const quantity = randInt(6, 20);
      const profit = (sellingPrice - cost) * quantity;

      return minimumMaximumQ(
        s,
        `A stall buys each drink for $${cost} and sells it for $${sellingPrice}. If it sells ${quantity} drinks, what is the greatest total profit, assuming all drinks are sold?`,
        profit,
        'Find the profit per drink, then multiply by the number sold.'
      );
    }

    if (s === 'multi') {
      const quantity = randInt(15, 60);
      const planAFee = randInt(10, 35);
      const planAUnit = randInt(2, 6);
      const planBUnit = planAUnit + randInt(1, 3);
      const planBFee = randInt(0, planAFee - 1);
      const totalA = planAFee + quantity * planAUnit;
      const totalB = planBFee + quantity * planBUnit;

      if (totalA === totalB) return psGenMinimumMaximum();

      return minimumMaximumQ(
        s,
        `A school needs ${quantity} identical folders. Supplier A charges a fixed fee of $${planAFee} plus $${planAUnit} per folder. Supplier B charges a fixed fee of $${planBFee} plus $${planBUnit} per folder. How much money is saved by choosing the cheaper supplier?`,
        Math.abs(totalA - totalB),
        'Calculate the total cost for each supplier, then subtract the smaller total from the larger total.'
      );
    }

    const firstSize = randInt(4, 8);
    const secondSize = randInt(firstSize + 1, firstSize + 6);
    const firstCost = randInt(6, 14);
    const secondCost = firstCost + randInt(2, 10);
    const required = randInt(secondSize * 3, secondSize * 8);
    const answer = minimumMaximumMinimumPackCost(
      required,
      firstSize,
      firstCost,
      secondSize,
      secondCost
    );

    return minimumMaximumQ(
      s,
      `Tiles are sold only in small packs of ${firstSize} for $${firstCost} and large packs of ${secondSize} for $${secondCost}. At least ${required} tiles are needed. What is the lowest possible total cost?`,
      answer,
      'Try combinations of the two pack sizes that provide at least the required number of tiles, then choose the lowest total cost.'
    );
  }

  // 9. Minimum changes or moves
  if (type === 9) {
    if (s === 'basic') {
      const smaller = randInt(8, 25);
      const transfer = randInt(2, 10);
      const larger = smaller + 2 * transfer;

      return minimumMaximumQ(
        s,
        `One shelf has ${larger} books and another has ${smaller} books. One move transfers one book from one shelf to the other. What is the minimum number of moves needed to make the two shelves equal?`,
        transfer,
        'Each move reduces the difference by 2, because one shelf loses a book while the other gains one.'
      );
    }

    if (s === 'multi') {
      const firstDifference = randInt(2, 8);
      const secondDifference = randInt(1, 6);
      const target = randInt(firstDifference + secondDifference + 2, firstDifference + secondDifference + 20);
      const counts = [
        target + firstDifference,
        target + secondDifference,
        target - firstDifference - secondDifference
      ];
      const answer = counts
        .filter(value => value > target)
        .reduce((sum, value) => sum + value - target, 0);

      return minimumMaximumQ(
        s,
        `Three storage bins contain ${counts[0]}, ${counts[1]} and ${counts[2]} balls. One move transfers one ball from one bin to another. What is the minimum number of moves needed so that all three bins contain the same number?`,
        answer,
        'Find the equal target amount, then total the surplus balls that must leave bins above the target.'
      );
    }

    const target = randInt(8, 20);
    const a = randInt(-5, 7);
    const b = randInt(-5, 7);
    const c = randInt(-5, 7);
    const d = -(a + b + c);

    if ([a, b, c, d].some(value => target + value < 0) || [a, b, c, d].every(value => value === 0)) {
      return psGenMinimumMaximum();
    }

    const counts = [target + a, target + b, target + c, target + d];
    const answer = minimumMaximumAdjacentRedistributionMoves(counts);

    return minimumMaximumQ(
      s,
      `Four shelves are arranged in a row and contain ${counts[0]}, ${counts[1]}, ${counts[2]} and ${counts[3]} books. A move transfers one book between two neighbouring shelves only. What is the minimum number of moves needed so that all four shelves contain ${target} books?`,
      answer,
      'Track the cumulative surplus or shortage after each shelf. Every book crossing a boundary counts as one move.'
    );
  }

  // 10. Minimum needed to guarantee an outcome
  if (s === 'basic') {
    const colours = randInt(3, 7);

    return minimumMaximumQ(
      s,
      `A bag contains counters in ${colours} different colours, with many counters of every colour. What is the minimum number of counters that must be selected without looking to guarantee that at least two selected counters have the same colour?`,
      colours + 1,
      'In the worst case, one counter of each colour is selected first. The next counter must repeat a colour.'
    );
  }

  if (s === 'multi') {
    const colours = randInt(3, 6);
    const matching = randInt(3, 5);
    const answer = colours * (matching - 1) + 1;

    return minimumMaximumQ(
      s,
      `A bag contains counters in ${colours} different colours, with enough counters of every colour. What is the minimum number of counters that must be selected without looking to guarantee at least ${matching} counters of one colour?`,
      answer,
      `In the worst case, select ${matching - 1} counters of each colour without reaching ${matching} of any colour, then select one more.`
    );
  }

  const targetMatches = randInt(3, 5);
  const colourCounts = [
    randInt(1, targetMatches - 1),
    randInt(targetMatches, targetMatches + 4),
    randInt(targetMatches, targetMatches + 5),
    randInt(1, targetMatches + 3)
  ];
  const worstCase = colourCounts.reduce(
    (sum, count) => sum + Math.min(count, targetMatches - 1),
    0
  );
  const total = colourCounts.reduce((sum, count) => sum + count, 0);

  if (worstCase >= total) return psGenMinimumMaximum();

  return minimumMaximumQ(
    s,
    `A bag contains ${colourCounts[0]} red, ${colourCounts[1]} blue, ${colourCounts[2]} green and ${colourCounts[3]} yellow counters. Counters are selected without looking and are not replaced. What is the minimum number that must be selected to guarantee at least ${targetMatches} counters of one colour?`,
    worstCase + 1,
    `For each colour, include at most ${targetMatches - 1} counters in the worst case. Add these possible selections, then take one more.`
  );
}
