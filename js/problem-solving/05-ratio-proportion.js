'use strict';

/* Ratio plus direct and inverse proportion problem banks.
   Split from DYAAPS.html without changing the original logic. */

function psGenRatio() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Sharing in a given ratio
  if (type === 1) {
    if (s === 'basic') {
      const a = randInt(2, 6);
      const b = randInt(3, 8);
      const unit = randInt(4, 12);
      const total = (a + b) * unit;

      return psQ(
        'ratio',
        s,
        `A prize of $${total} is shared between Mia and Noah in the ratio ${a}:${b}. How much does Mia receive?`,
        a * unit,
        'Add the ratio parts, find the value of one part, then multiply by Mia’s number of parts.'
      );
    }

    if (s === 'multi') {
      const a = randInt(2, 5);
      const b = randInt(3, 6);
      const c = randInt(4, 8);
      const unit = randInt(5, 12);
      const total = (a + b + c) * unit;

      return psQ(
        'ratio',
        s,
        `A grant of $${total} is shared among three clubs in the ratio ${a}:${b}:${c}. Calculate the difference between the largest share and the smallest share.`,
        (Math.max(a, b, c) - Math.min(a, b, c)) * unit,
        'Find the value of one ratio part, then compare the largest and smallest numbers of parts.'
      );
    }

    const a = randInt(2, 5);
    const b = randInt(a + 1, a + 5);
    const unit = randInt(6, 15);
    const reserved = randInt(3, 8) * 10;
    const sharedAmount = (a + b) * unit;
    const total = sharedAmount + reserved;

    return psQ(
      'ratio',
      s,
      `A fund contains $${total}. First, $${reserved} is reserved for equipment. The rest is shared between two teams in the ratio ${a}:${b}. Calculate the larger share.`,
      b * unit,
      'Subtract the reserved amount first, then divide the remainder according to the ratio.'
    );
  }

  // 2. Total known: find one of the parts
  if (type === 2) {
    if (s === 'basic') {
      const boysParts = randInt(2, 5);
      const girlsParts = randInt(boysParts + 1, boysParts + 5);
      const unit = randInt(4, 10);
      const total = (boysParts + girlsParts) * unit;

      return psQ(
        'ratio',
        s,
        `There are ${total} students in a group. The ratio of boys to girls is ${boysParts}:${girlsParts}. How many girls are there?`,
        girlsParts * unit,
        'Add the ratio parts and use the total to find the value of one part.'
      );
    }

    if (s === 'multi') {
      const a = randInt(2, 4);
      const b = randInt(3, 6);
      const c = randInt(4, 8);
      const unit = randInt(4, 10);
      const total = (a + b + c) * unit;

      return psQ(
        'ratio',
        s,
        `A box contains ${total} red, blue and green counters in the ratio ${a}:${b}:${c}. How many blue counters are in the box?`,
        b * unit,
        'Add all three ratio parts, find one part, then multiply by the number of blue parts.'
      );
    }

    const a = randInt(2, 5);
    const b = randInt(a + 2, a + 6);
    const unit = randInt(5, 12);
    const total = (a + b) * unit;
    const moved = randInt(2, Math.min(8, b * unit - 1));

    return psQ(
      'ratio',
      s,
      `Two classes contain ${total} students in the ratio ${a}:${b}. Then ${moved} students move from the larger class to the smaller class. How many students are now in the smaller class?`,
      a * unit + moved,
      'Use the original total and ratio to find both class sizes before applying the transfer.'
    );
  }

  // 3. One part known: find the total
  if (type === 3) {
    if (s === 'basic') {
      const a = randInt(2, 6);
      const b = randInt(3, 8);
      const unit = randInt(4, 10);
      const firstPart = a * unit;

      return psQ(
        'ratio',
        s,
        `The ratio of red beads to blue beads is ${a}:${b}. There are ${firstPart} red beads. How many beads are there altogether?`,
        (a + b) * unit,
        'Use the known red amount to find the value of one ratio part, then find the total number of parts.'
      );
    }

    if (s === 'multi') {
      const a = randInt(2, 4);
      const b = randInt(3, 6);
      const c = randInt(4, 8);
      const unit = randInt(4, 10);
      const known = b * unit;

      return psQ(
        'ratio',
        s,
        `The numbers of Year 7, Year 8 and Year 9 students at an event are in the ratio ${a}:${b}:${c}. There are ${known} Year 8 students. How many students are at the event altogether?`,
        (a + b + c) * unit,
        'Find the value of one ratio part from the Year 8 group, then multiply by the total number of parts.'
      );
    }

    const a = randInt(2, 4);
    const b = randInt(3, 6);
    const c = randInt(4, 8);
    const unit = randInt(5, 12);
    const givenAway = randInt(2, Math.min(8, b * unit - 1));
    const remaining = b * unit - givenAway;

    return psQ(
      'ratio',
      s,
      `Three collections are in the ratio ${a}:${b}:${c}. After ${givenAway} items are removed from the second collection, it contains ${remaining} items. How many items were in the three collections originally?`,
      (a + b + c) * unit,
      'Reconstruct the original second collection, use it to find one ratio part, then calculate the original total.'
    );
  }

  // 4. Equivalent ratios
  if (type === 4) {
    if (s === 'basic') {
      const a = randInt(2, 7);
      const b = randInt(3, 9);
      const k = randInt(2, 6);

      return psQ(
        'ratio',
        s,
        `${a}:${b} = ${a * k}:?. Find the missing number.`,
        b * k,
        'Multiply both parts of the ratio by the same scale factor.'
      );
    }

    if (s === 'multi') {
      const a = randInt(2, 7);
      const b = randInt(3, 9);
      const k = randInt(2, 7);

      return psQ(
        'ratio',
        s,
        `?:${b * k} is equivalent to ${a}:${b}. Find the missing number.`,
        a * k,
        'Find the scale factor from the second ratio part, then apply it to the first part.'
      );
    }

    const a = randInt(2, 6);
    const b = randInt(3, 8);
    const firstScale = randInt(2, 5);
    const secondScale = randInt(2, 4);
    const firstTerm = a * firstScale * secondScale;

    return psQ(
      'ratio',
      s,
      `${a}:${b} = ${a * firstScale}:${b * firstScale}. The second ratio is then enlarged again so that its first term becomes ${firstTerm}. What is the corresponding second term?`,
      b * firstScale * secondScale,
      'Identify the second scale factor and apply it to both terms of the already enlarged ratio.'
    );
  }

  // 5. Ratio tables
  if (type === 5) {
    if (s === 'basic') {
      const rate = randInt(3, 9);
      const first = randInt(2, 4);
      const second = randInt(first + 1, first + 4);
      const third = randInt(second + 1, second + 5);

      return psQ(
        'ratio',
        s,
        `A ratio table shows: boxes ${first}, ${second}, ${third}; pencils ${first * rate}, ${second * rate}, ?. How many pencils correspond to ${third} boxes?`,
        third * rate,
        'Use one complete column to find the constant number of pencils per box.'
      );
    }

    if (s === 'multi') {
      const rate = randInt(4, 12);
      const knownQuantity = randInt(3, 7);
      const targetQuantity = randInt(knownQuantity + 3, knownQuantity + 9);

      return psQ(
        'ratio',
        s,
        `A ratio table contains the pair (${knownQuantity}, ${knownQuantity * rate}). Use the same ratio to complete the pair (${targetQuantity}, ?).`,
        targetQuantity * rate,
        'First find the multiplier from the known pair, then apply it to the target quantity.'
      );
    }

    const rate = randInt(4, 10);
    const x1 = randInt(2, 5);
    const x2 = randInt(x1 + 2, x1 + 6);
    const y3 = randInt(x2 + 2, x2 + 7) * rate;

    return psQ(
      'ratio',
      s,
      `A ratio table shows the pairs (${x1}, ${x1 * rate}), (${x2}, ${x2 * rate}) and (?, ${y3}). Find the missing first value.`,
      y3 / rate,
      'Use the first two pairs to identify the constant ratio, then work backwards from the final second value.'
    );
  }

  // 6. Changing ratios
  if (type === 6) {
    if (s === 'basic') {
      const redParts = randInt(2, 5);
      const blueParts = randInt(redParts + 1, redParts + 5);
      const unit = randInt(4, 10);
      const red = redParts * unit;
      const blue = blueParts * unit;
      const added = blue - red;

      return psQ(
        'ratio',
        s,
        `The ratio of red counters to blue counters is ${redParts}:${blueParts}. After ${added} red counters are added, the two colours have equal numbers. How many blue counters were there originally?`,
        blue,
        'The difference between the two original amounts equals the number of red counters added.'
      );
    }

    if (s === 'multi') {
      const redParts = randInt(2, 5);
      const blueParts = randInt(redParts + 2, redParts + 6);
      const unit = randInt(5, 12);
      const addedParts = randInt(1, blueParts - redParts);
      const added = addedParts * unit;
      const newRed = (redParts + addedParts) * unit;
      const blue = blueParts * unit;
      const newRatio = simplifyRatio(newRed, blue);

      return psQ(
        'ratio',
        s,
        `Red and blue counters are originally in the ratio ${redParts}:${blueParts}. After ${added} red counters are added, the new ratio is ${newRatio}. How many counters were there originally altogether?`,
        (redParts + blueParts) * unit,
        'Represent the original amounts using one ratio part, then use the added counters and the new ratio to determine that part.'
      );
    }

    const redParts = randInt(2, 5);
    const blueParts = randInt(redParts + 3, redParts + 7);
    const unit = randInt(5, 12);
    const transferParts = randInt(1, Math.min(2, blueParts - 1));
    const transferred = transferParts * unit;
    const newRed = (redParts + transferParts) * unit;
    const newBlue = (blueParts - transferParts) * unit;
    const newRatio = simplifyRatio(newRed, newBlue);

    return psQ(
      'ratio',
      s,
      `Red and blue counters are originally in the ratio ${redParts}:${blueParts}. Then ${transferred} blue counters are moved to the red group. The new ratio is ${newRatio}. How many counters were there originally altogether?`,
      (redParts + blueParts) * unit,
      'The transfer changes both groups but not the total. Use the original ratio and transferred amount to find one original ratio part.'
    );
  }

  // 7. Mixed ratios
  if (type === 7) {
    if (s === 'basic') {
      const a = randInt(2, 6);
      const b = randInt(3, 7);
      const c = randInt(4, 9);

      return psQRatio(
        'ratio',
        s,
        `A:B = ${a}:${b} and B:C = ${b}:${c}. Find A:C in its simplest form.`,
        simplifyRatio(a, c),
        'The value representing B is already the same in both ratios, so compare A directly with C.'
      );
    }

    const a = randInt(2, 6);
    const b = randInt(3, 8);
    const c = randInt(2, 7);
    const d = randInt(3, 9);
    const commonB = lcm(b, c);
    const combinedA = a * (commonB / b);
    const combinedC = d * (commonB / c);

    if (s === 'multi') {
      return psQRatio(
        'ratio',
        s,
        `A:B = ${a}:${b} and B:C = ${c}:${d}. Find A:C in its simplest form.`,
        simplifyRatio(combinedA, combinedC),
        'Scale both ratios until the two values representing B are equal, then compare A with C.'
      );
    }

    const unit = randInt(3, 9);
    const total = (combinedA + commonB + combinedC) * unit;

    return psQ(
      'ratio',
      s,
      `A:B = ${a}:${b} and B:C = ${c}:${d}. The total of A, B and C is ${total}. Calculate C.`,
      combinedC * unit,
      'Combine the two ratios by making the B-parts equal, then use the total to find the value of one combined ratio part.'
    );
  }

  // 8. Recipe adjustment
  if (type === 8) {
    if (s === 'basic') {
      const originalServings = pick([2, 3, 4, 5, 6]);
      const scale = randInt(2, 4);
      const ingredient = randInt(2, 6);
      const targetServings = originalServings * scale;

      return psQ(
        'ratio',
        s,
        `A recipe for ${originalServings} people uses ${ingredient} cups of rice. How many cups are needed for ${targetServings} people?`,
        ingredient * scale,
        'The number of servings and the ingredient amount must be multiplied by the same scale factor.'
      );
    }

    if (s === 'multi') {
      const originalServings = pick([3, 4, 5, 6]);
      const scale = randInt(2, 4);
      const flour = randInt(2, 6);
      const milk = randInt(1, 5);
      const targetServings = originalServings * scale;

      return psQ(
        'ratio',
        s,
        `A recipe for ${originalServings} people uses ${flour} cups of flour and ${milk} cups of milk. The recipe is adjusted for ${targetServings} people. How many cups of flour and milk are needed altogether?`,
        (flour + milk) * scale,
        'Find the serving scale factor, multiply both ingredient amounts, then add them.'
      );
    }

    const flourParts = randInt(2, 5);
    const sugarParts = randInt(1, 4);
    const batchUnit = randInt(2, 6);
    const batches = randInt(2, 5);
    const oneBatchTotal = (flourParts + sugarParts) * batchUnit;

    return psQ(
      'ratio',
      s,
      `Flour and sugar are mixed in the ratio ${flourParts}:${sugarParts}. One batch uses ${oneBatchTotal} cups of the mixture. How many cups of sugar are needed for ${batches} identical batches?`,
      sugarParts * batchUnit * batches,
      'Use the total mixture in one batch to find one ratio part, then scale the sugar amount by the number of batches.'
    );
  }

  // 9. Map scales
  if (type === 9) {
    if (s === 'basic') {
      const scale = pick([2, 5, 10, 20, 25, 50]);
      const mapLength = randInt(2, 12);

      return psQ(
        'ratio',
        s,
        `A map uses the scale 1 cm : ${scale} km. Two towns are ${mapLength} cm apart on the map. What is the actual distance in kilometres?`,
        mapLength * scale,
        'Multiply the map distance by the number of kilometres represented by 1 cm.'
      );
    }

    if (s === 'multi') {
      const scale = pick([2, 5, 10, 20, 25]);
      const firstLeg = randInt(2, 8);
      const secondLeg = randInt(2, 8);

      return psQ(
        'ratio',
        s,
        `A map uses the scale 1 cm : ${scale} km. A route has two map sections measuring ${firstLeg} cm and ${secondLeg} cm. What is the total actual distance?`,
        (firstLeg + secondLeg) * scale,
        'Add the map lengths first, then apply the map scale.'
      );
    }

    const scale = pick([5, 10, 20, 25, 50]);
    const originalMapLength = randInt(3, 12);
    const enlargement = pick([2, 3]);
    const actualDistance = originalMapLength * scale;

    return psQ(
      'ratio',
      s,
      `A route is ${actualDistance} km long. On a map with scale 1 cm : ${scale} km, the map is then enlarged by a factor of ${enlargement}. How long is the route on the enlarged map, in centimetres?`,
      originalMapLength * enlargement,
      'First find the route length on the original map, then apply the enlargement factor.'
    );
  }

  // 10. Unit rates
  if (s === 'basic') {
    const items = randInt(3, 9);
    const unitCost = randInt(3, 12);
    const totalCost = items * unitCost;

    return psQ(
      'ratio',
      s,
      `${items} notebooks cost $${totalCost}. What is the cost per notebook?`,
      unitCost,
      'Divide the total cost by the number of notebooks.'
    );
  }

  if (s === 'multi') {
    const knownQuantity = randInt(3, 8);
    const unitCost = randInt(3, 12);
    const targetQuantity = randInt(knownQuantity + 2, knownQuantity + 8);

    return psQ(
      'ratio',
      s,
      `${knownQuantity} metres of fabric cost $${knownQuantity * unitCost}. At the same unit rate, how much will ${targetQuantity} metres cost?`,
      targetQuantity * unitCost,
      'Find the cost per metre, then multiply by the required number of metres.'
    );
  }

  const packAItems = randInt(3, 7);
  const packBItems = randInt(4, 8);
  const cheaperRate = randInt(3, 8);
  const dearerRate = cheaperRate + randInt(1, 4);
  const packACheaper = chance(0.5);
  const packACost = packAItems * (packACheaper ? cheaperRate : dearerRate);
  const packBCost = packBItems * (packACheaper ? dearerRate : cheaperRate);
  const comparisonQuantity = lcm(packAItems, packBItems);

  return psQ(
    'ratio',
    s,
    `Pack A contains ${packAItems} items and costs $${packACost}. Pack B contains ${packBItems} items and costs $${packBCost}. For ${comparisonQuantity} items, how much money is saved by buying at the cheaper unit rate?`,
    (dearerRate - cheaperRate) * comparisonQuantity,
    'Calculate the cost per item for each pack, then compare the costs for the same number of items.'
  );
}

function psGenProportion() {
  const s = chooseProblemStructure();
  const type = randInt(1, 6);

  // 1. Fixed unit price — direct proportion
  if (type === 1) {
    if (s === 'basic') {
      const unitPrice = randInt(3, 12);
      const knownQuantity = randInt(2, 8);
      const targetQuantity = randInt(knownQuantity + 1, knownQuantity + 8);

      return psQ(
        'proportion',
        s,
        `${knownQuantity} identical items cost $${knownQuantity * unitPrice}. At the same unit price, how much will ${targetQuantity} items cost?`,
        targetQuantity * unitPrice,
        'Find the cost of one item, then multiply by the new quantity.'
      );
    }

    if (s === 'multi') {
      const unitPrice = randInt(3, 8);
      const knownQuantity = randInt(3, 7);
      const targetQuantity = randInt(knownQuantity + 2, knownQuantity + 8);
      const targetCost = targetQuantity * unitPrice;
      const payment = Math.ceil((targetCost + randInt(10, 35)) / 10) * 10;

      return psQ(
        'proportion',
        s,
        `${knownQuantity} kg of fruit costs $${knownQuantity * unitPrice}. At the same price per kilogram, a customer buys ${targetQuantity} kg and pays $${payment}. How much change should the customer receive?`,
        payment - targetCost,
        'Find the price per kilogram, calculate the new cost, then subtract it from the payment.'
      );
    }

    const unitPrice = randInt(3, 10);
    const knownQuantity = randInt(3, 8);
    const purchasedQuantity = randInt(10, 20);
    const returnedQuantity = randInt(2, purchasedQuantity - 3);
    const totalCost = purchasedQuantity * unitPrice;

    return psQ(
      'proportion',
      s,
      `${knownQuantity} identical folders cost $${knownQuantity * unitPrice}. A school later places an order costing $${totalCost} at the same unit price, but returns ${returnedQuantity} folders. How many folders does the school keep?`,
      purchasedQuantity - returnedQuantity,
      'Use the fixed unit price to find the original number ordered, then subtract the returned folders.'
    );
  }

  // 2. Fixed speed — distance is directly proportional to time
  if (type === 2) {
    if (s === 'basic') {
      const speed = pick([40, 50, 60, 70, 80, 90]);
      const knownTime = randInt(2, 5);
      const targetTime = randInt(knownTime + 1, knownTime + 4);

      return psQ(
        'proportion',
        s,
        `A vehicle travels ${speed * knownTime} km in ${knownTime} hours at a constant speed. How far will it travel in ${targetTime} hours at the same speed?`,
        speed * targetTime,
        'Find the distance travelled in one hour, then multiply by the new time.'
      );
    }

    if (s === 'multi') {
      const speed = pick([40, 60, 80, 100]);
      const knownTime = randInt(2, 5);
      const firstTime = randInt(1, 3);
      const secondTime = pick([0.5, 1.5, 2.5]);

      return psQ(
        'proportion',
        s,
        `A train travels ${speed * knownTime} km in ${knownTime} hours at a constant speed. It then travels for ${firstTime} hours, stops, and continues for another ${secondTime} hours at the same speed. What total distance does it travel while moving?`,
        speed * (firstTime + secondTime),
        'Find the constant speed, then multiply it by the total time spent moving.'
      );
    }

    const speed = pick([40, 50, 60, 70, 80]);
    const totalTime = randInt(5, 9);
    const elapsedTime = randInt(1, totalTime - 2);
    const remainingDistance = speed * (totalTime - elapsedTime);

    return psQ(
      'proportion',
      s,
      `A bus travels at a constant speed. After ${elapsedTime} hours, it has ${remainingDistance} km left in a journey that takes ${totalTime} hours altogether. What is the total length of the journey?`,
      speed * totalTime,
      'Use the remaining distance and remaining time to find the constant speed, then find the full distance.'
    );
  }

  // 3. Fixed work efficiency — output depends on machine-hours or worker-hours
  if (type === 3) {
    if (s === 'basic') {
      const rate = randInt(5, 15);
      const machines1 = randInt(2, 5);
      const machines2 = randInt(machines1 + 1, machines1 + 5);
      const hours = randInt(2, 6);
      const firstOutput = machines1 * hours * rate;

      return psQ(
        'proportion',
        s,
        `${machines1} identical machines produce ${firstOutput} parts in ${hours} hours. At the same efficiency, how many parts will ${machines2} machines produce in ${hours} hours?`,
        machines2 * hours * rate,
        'The time is unchanged, so output is directly proportional to the number of machines.'
      );
    }

    if (s === 'multi') {
      const rate = randInt(6, 18);
      const machines1 = randInt(2, 6);
      const hours1 = randInt(3, 8);
      const machines2 = randInt(3, 8);
      const hours2 = randInt(2, 9);
      const firstOutput = machines1 * hours1 * rate;
      const targetOutput = machines2 * hours2 * rate;

      return psQ(
        'proportion',
        s,
        `${machines1} identical machines produce ${firstOutput} components in ${hours1} hours. At the same efficiency, how many hours will ${machines2} machines need to produce ${targetOutput} components?`,
        hours2,
        'Find the output per machine-hour, then divide the target output by the new number of machines.'
      );
    }

    const rate = randInt(5, 14);
    const firstMachines = randInt(2, 5);
    const firstHours = randInt(2, 5);
    const secondMachines = randInt(3, 7);
    const secondHours = randInt(2, 5);
    const totalOutput = rate * (
      firstMachines * firstHours + secondMachines * secondHours
    );

    return psQ(
      'proportion',
      s,
      `${firstMachines} identical printers operate for ${firstHours} hours. Then ${secondMachines} printers operate for another ${secondHours} hours. Each printer works at the same constant rate of ${rate} pages per hour. How many pages are printed altogether?`,
      totalOutput,
      'Calculate the printer-hours in each stage, multiply by the common rate, and add the two outputs.'
    );
  }

  // 4. Number of workers and time — inverse proportion
  if (type === 4) {
    if (s === 'basic') {
      const workers1 = randInt(3, 8);
      const days1 = randInt(6, 15);
      const totalWorkerDays = workers1 * days1;
      const divisors = [2, 3, 4, 5, 6, 8, 10, 12]
        .filter(value => value !== workers1 && totalWorkerDays % value === 0);

      if (!divisors.length) return psGenProportion();

      const workers2 = pick(divisors);

      return psQ(
        'proportion',
        s,
        `${workers1} workers can complete a task in ${days1} days. Assuming all workers have the same efficiency, how many days would ${workers2} workers require?`,
        totalWorkerDays / workers2,
        'For a fixed amount of work, workers multiplied by days remains constant.'
      );
    }

    if (s === 'multi') {
      const workers1 = randInt(4, 8);
      const plannedDays = randInt(8, 16);
      const firstDays = randInt(2, plannedDays - 3);
      const totalWorkerDays = workers1 * plannedDays;
      const completedWorkerDays = workers1 * firstDays;
      const remainingWorkerDays = totalWorkerDays - completedWorkerDays;
      const possibleWorkers = [2, 3, 4, 5, 6, 8, 10, 12]
        .filter(value => value !== workers1 && remainingWorkerDays % value === 0);

      if (!possibleWorkers.length) return psGenProportion();

      const workers2 = pick(possibleWorkers);

      return psQ(
        'proportion',
        s,
        `${workers1} workers are expected to finish a project in ${plannedDays} days. After they work for ${firstDays} days, the team changes to ${workers2} workers of equal efficiency. How many more days are needed to complete the project?`,
        remainingWorkerDays / workers2,
        'Convert the whole project into worker-days, subtract the completed work, then divide by the new team size.'
      );
    }

    const workers1 = randInt(4, 9);
    const plannedDays = randInt(9, 18);
    const firstDays = randInt(2, plannedDays - 4);
    const secondDays = randInt(3, 9);
    const totalWorkerDays = workers1 * plannedDays;
    const remainingWorkerDays = totalWorkerDays - workers1 * firstDays;

    if (remainingWorkerDays % secondDays !== 0) return psGenProportion();

    const workers2 = remainingWorkerDays / secondDays;

    if (workers2 < 2 || workers2 > 16 || workers2 === workers1) {
      return psGenProportion();
    }

    return psQ(
      'proportion',
      s,
      `${workers1} workers could complete a project in ${plannedDays} days. They work together for ${firstDays} days, after which the remaining work is completed in ${secondDays} days by a different-sized team of equally efficient workers. How many workers are in the second team?`,
      workers2,
      'Find the total worker-days, subtract the first stage, then divide the remaining worker-days by the second-stage time.'
    );
  }

  // 5. Proportional relationships shown in tables
  if (type === 5) {
    if (s === 'basic') {
      const k = randInt(3, 12);
      const x1 = randInt(2, 5);
      const x2 = x1 + randInt(1, 3);
      const x3 = x2 + randInt(1, 3);

      return psQ(
        'proportion',
        s,
        `A table shows a direct proportion: x-values ${x1}, ${x2}, ${x3}; corresponding y-values ${x1 * k}, ${x2 * k}, ?. What is the missing y-value?`,
        x3 * k,
        'Find the constant value of y ÷ x, then use it for the missing entry.'
      );
    }

    if (s === 'multi') {
      const constant = pick([24, 36, 48, 60, 72, 84, 96, 120]);
      const divisors = [];

      for (let value = 2; value <= 12; value++) {
        if (constant % value === 0) divisors.push(value);
      }

      if (divisors.length < 3) return psGenProportion();

      const shuffled = [...divisors].sort(() => Math.random() - 0.5);
      const [x1, x2, x3] = shuffled.slice(0, 3);

      return psQ(
        'proportion',
        s,
        `A table shows an inverse proportion: x-values ${x1}, ${x2}, ${x3}; corresponding y-values ${constant / x1}, ${constant / x2}, ?. What is the missing y-value?`,
        constant / x3,
        'For inverse proportion, each x × y product is the same.'
      );
    }

    if (chance(0.5)) {
      const k = randInt(3, 10);
      const x1 = randInt(2, 4);
      const x2 = x1 + randInt(1, 3);
      const x3 = x2 + randInt(1, 3);
      const targetX = x3 + randInt(1, 4);

      return psQ(
        'proportion',
        s,
        `The table contains the pairs (${x1}, ${x1 * k}), (${x2}, ${x2 * k}) and (${x3}, ${x3 * k}). Assuming the same proportional relationship continues, what is y when x = ${targetX}?`,
        targetX * k,
        'Identify the constant ratio y ÷ x, then extend the table.'
      );
    }

    const constant = pick([36, 48, 60, 72, 84, 96, 120]);
    const divisors = [];

    for (let value = 2; value <= 12; value++) {
      if (constant % value === 0) divisors.push(value);
    }

    if (divisors.length < 4) return psGenProportion();

    const shuffled = [...divisors].sort(() => Math.random() - 0.5);
    const [x1, x2, x3, targetX] = shuffled.slice(0, 4);

    return psQ(
      'proportion',
      s,
      `The table contains the pairs (${x1}, ${constant / x1}), (${x2}, ${constant / x2}) and (${x3}, ${constant / x3}). Assuming the same proportional relationship continues, what is y when x = ${targetX}?`,
      constant / targetX,
      'Recognise that x × y is constant, then use the inverse-proportion relationship.'
    );
  }

  // 6. Building and using proportion formulas
  if (s === 'basic') {
    const k = randInt(3, 12);
    const x = randInt(2, 9);

    return psQ(
      'proportion',
      s,
      `The quantity y is directly proportional to x and is modelled by y = kx. When x = ${x}, y = ${x * k}. What is the value of k?`,
      k,
      'For y = kx, divide y by x to find the constant of proportionality.'
    );
  }

  if (s === 'multi') {
    const k = randInt(3, 12);
    const x1 = randInt(2, 8);
    const x2 = randInt(x1 + 2, x1 + 10);

    return psQ(
      'proportion',
      s,
      `A quantity y is directly proportional to x. When x = ${x1}, y = ${x1 * k}. Use a model of the form y = kx to calculate y when x = ${x2}.`,
      x2 * k,
      'First calculate k = y ÷ x, then substitute the new x-value into y = kx.'
    );
  }

  const constant = pick([24, 36, 48, 60, 72, 84, 96, 120]);
  const possibleX = [];

  for (let value = 2; value <= 12; value++) {
    if (constant % value === 0) possibleX.push(value);
  }

  if (possibleX.length < 2) return psGenProportion();

  const x1 = pick(possibleX);
  const remainingX = possibleX.filter(value => value !== x1);
  const x2 = pick(remainingX);
  const y1 = constant / x1;
  const y2 = constant / x2;

  return psQ(
    'proportion',
    s,
    `The quantity y is inversely proportional to x and is modelled by y = k/x. When x = ${x1}, y = ${y1}. Calculate x when y = ${y2}.`,
    x2,
    'Find k using x × y, then solve the inverse-proportion model for x.'
  );
}
