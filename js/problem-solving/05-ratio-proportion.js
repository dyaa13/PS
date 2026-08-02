'use strict';

/* Ratio plus direct and inverse proportion problem banks.
   All questions are written as real-life application problems.
   Pure ratio equations, abstract tables and direct formula exercises have been removed. */

function psGenRatio() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Sharing money or resources in a given ratio
  if (type === 1) {
    if (s === 'basic') {
      const a = randInt(2, 6);
      const b = randInt(a + 1, a + 5);
      const unit = randInt(4, 12);
      const total = (a + b) * unit;

      return psQ(
        'ratio',
        s,
        `A $${total} fundraising prize is shared between two teams in the ratio ${a}:${b}. How much does the smaller team receive?`,
        a * unit,
        'Add the ratio parts, find the value of one part, then multiply by the smaller number of parts.'
      );
    }

    if (s === 'multi') {
      const a = randInt(2, 5);
      const b = randInt(3, 7);
      const c = randInt(4, 9);
      const unit = randInt(5, 12);
      const total = (a + b + c) * unit;

      return psQ(
        'ratio',
        s,
        `A school distributes ${total} new books among three classes in the ratio ${a}:${b}:${c}. How many more books does the class with the largest share receive than the class with the smallest share?`,
        (Math.max(a, b, c) - Math.min(a, b, c)) * unit,
        'Find the value of one ratio part, then compare the largest and smallest shares.'
      );
    }

    const a = randInt(2, 5);
    const b = randInt(a + 1, a + 5);
    const unit = randInt(6, 14);
    const reserved = randInt(3, 8) * 10;
    const shared = (a + b) * unit;
    const total = shared + reserved;

    return psQ(
      'ratio',
      s,
      `A community fund contains $${total}. First, $${reserved} is kept for venue hire. The rest is shared between two clubs in the ratio ${a}:${b}. What is the larger club's share?`,
      b * unit,
      'Subtract the reserved amount first, then divide the remaining money in the stated ratio.'
    );
  }

  // 2. Finding a group from the total
  if (type === 2) {
    if (s === 'basic') {
      const juniorParts = randInt(2, 5);
      const seniorParts = randInt(juniorParts + 1, juniorParts + 5);
      const unit = randInt(4, 10);
      const total = (juniorParts + seniorParts) * unit;

      return psQ(
        'ratio',
        s,
        `There are ${total} students at a sports clinic. The ratio of junior students to senior students is ${juniorParts}:${seniorParts}. How many senior students are there?`,
        seniorParts * unit,
        'Add the ratio parts, use the total to find one part, then find the senior group.'
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
        `A garden centre has ${total} flowering plants divided among roses, lilies and daisies in the ratio ${a}:${b}:${c}. How many lilies and daisies are there altogether?`,
        (b + c) * unit,
        'Find one ratio part from the total, then combine the required two groups.'
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
      `Two workshops have ${total} students altogether in the ratio ${a}:${b}. Then ${moved} students move from the larger workshop to the smaller workshop. How many students are now in the smaller workshop?`,
      a * unit + moved,
      'Use the total and original ratio to find both group sizes, then apply the transfer.'
    );
  }

  // 3. Finding the total from one known group
  if (type === 3) {
    if (s === 'basic') {
      const a = randInt(2, 6);
      const b = randInt(3, 8);
      const unit = randInt(4, 10);
      const known = a * unit;

      return psQ(
        'ratio',
        s,
        `A wildlife park has parrots and finches in the ratio ${a}:${b}. There are ${known} parrots. How many birds are there altogether?`,
        (a + b) * unit,
        'Use the known group to find one ratio part, then find the total number of parts.'
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
        `At a school event, the numbers of students from three houses are in the ratio ${a}:${b}:${c}. The second house has ${known} students. How many students are at the event altogether?`,
        (a + b + c) * unit,
        'Use the known second group to find one ratio part, then multiply by the total number of parts.'
      );
    }

    const a = randInt(2, 4);
    const b = randInt(3, 6);
    const c = randInt(4, 8);
    const unit = randInt(5, 12);
    const sold = randInt(2, Math.min(8, b * unit - 1));
    const remaining = b * unit - sold;

    return psQ(
      'ratio',
      s,
      `A shop originally stocked three types of gift boxes in the ratio ${a}:${b}:${c}. After ${sold} boxes of the second type are sold, ${remaining} of that type remain. How many gift boxes were stocked originally?`,
      (a + b + c) * unit,
      'Reconstruct the original second group, find one ratio part, then calculate the original total.'
    );
  }

  // 4. Scaling a recipe or mixture
  if (type === 4) {
    if (s === 'basic') {
      const originalServings = pick([2, 3, 4, 5, 6]);
      const scale = randInt(2, 4);
      const ingredient = randInt(2, 6);
      const targetServings = originalServings * scale;

      return psQ(
        'ratio',
        s,
        `A soup recipe for ${originalServings} people uses ${ingredient} cups of stock. How many cups of stock are needed for ${targetServings} people?`,
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
        `A pancake recipe for ${originalServings} people uses ${flour} cups of flour and ${milk} cups of milk. The recipe is adjusted for ${targetServings} people. How many cups of flour and milk are needed altogether?`,
        (flour + milk) * scale,
        'Find the serving scale factor, scale both ingredients, then add the new amounts.'
      );
    }

    const concentrateParts = randInt(1, 3);
    const waterParts = randInt(concentrateParts + 2, concentrateParts + 6);
    const cupSize = randInt(2, 5);
    const jugs = randInt(2, 5);
    const oneJug = (concentrateParts + waterParts) * cupSize;

    return psQ(
      'ratio',
      s,
      `Fruit concentrate and water are mixed in the ratio ${concentrateParts}:${waterParts}. One jug contains ${oneJug} cups of drink. How many cups of concentrate are needed to make ${jugs} identical jugs?`,
      concentrateParts * cupSize * jugs,
      'Use the total in one jug to find one ratio part, then scale the concentrate amount by the number of jugs.'
    );
  }

  // 5. Map scales and plans
  if (type === 5) {
    if (s === 'basic') {
      const scale = pick([2, 5, 10, 20, 25, 50]);
      const mapLength = randInt(2, 12);

      return psQ(
        'ratio',
        s,
        `A map uses the scale 1 cm : ${scale} km. Two towns are ${mapLength} cm apart on the map. What is the actual distance between them?`,
        mapLength * scale,
        'Multiply the map distance by the number of kilometres represented by 1 cm.'
      );
    }

    if (s === 'multi') {
      const scale = pick([2, 5, 10, 20, 25]);
      const firstLeg = randInt(2, 8);
      const secondLeg = randInt(2, 8);
      const detour = randInt(1, 4);

      return psQ(
        'ratio',
        s,
        `A map uses the scale 1 cm : ${scale} km. A planned route has map sections of ${firstLeg} cm and ${secondLeg} cm, plus a ${detour} km road detour. What is the total actual distance?`,
        (firstLeg + secondLeg) * scale + detour,
        'Convert the map sections to actual distance, add them, then include the road detour.'
      );
    }

    const scale = pick([5, 10, 20, 25, 50]);
    const originalMapLength = randInt(3, 12);
    const enlargement = pick([2, 3]);
    const actualDistance = originalMapLength * scale;

    return psQ(
      'ratio',
      s,
      `A walking route is ${actualDistance} km long. It is shown on a map with scale 1 cm : ${scale} km. The map is then enlarged by a factor of ${enlargement}. How long is the route on the enlarged map?`,
      originalMapLength * enlargement,
      'First find the route length on the original map, then apply the enlargement factor.'
    );
  }

  // 6. Changing ratios after adding, removing or transferring items
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
        `A craft box contains red and blue beads in the ratio ${redParts}:${blueParts}. After ${added} red beads are added, the two colours have equal numbers. How many blue beads were there originally?`,
        blue,
        'The original difference between the two groups equals the number added to the smaller group.'
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
        `Red and blue tokens are originally in the ratio ${redParts}:${blueParts}. After ${added} red tokens are added, the new ratio is ${newRatio}. How many tokens were there originally altogether?`,
        (redParts + blueParts) * unit,
        'Represent the original amounts using one ratio part, then use the added tokens and new ratio to find that part.'
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
      `Two storage bins contain red and blue blocks in the ratio ${redParts}:${blueParts}. Then ${transferred} blue blocks are moved into the red bin, giving a new ratio of ${newRatio}. How many blocks were there originally altogether?`,
      (redParts + blueParts) * unit,
      'The transfer changes both groups but not the total. Use the change and the two ratios to find one original part.'
    );
  }

  // 7. Linked ratios in a real context
  if (type === 7) {
    if (s === 'basic') {
      const small = randInt(2, 5);
      const medium = randInt(3, 7);
      const large = randInt(4, 9);
      const unit = randInt(3, 8);

      return psQ(
        'ratio',
        s,
        `A bakery packs small, medium and large snack boxes. The ratio of small to medium boxes is ${small}:${medium}, and the ratio of medium to large boxes is ${medium}:${large}. If there are ${medium * unit} medium boxes, how many large boxes are there?`,
        large * unit,
        'The medium amount uses the same number of parts in both ratios, so use it to find one part.'
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
      const unit = randInt(3, 8);
      const middleAmount = commonB * unit;

      return psQ(
        'ratio',
        s,
        `At a camp, the ratio of junior to intermediate students is ${a}:${b}, while the ratio of intermediate to senior students is ${c}:${d}. There are ${middleAmount} intermediate students. How many junior and senior students are there altogether?`,
        (combinedA + combinedC) * unit,
        'Make the intermediate parts equal in both ratios, then use the known intermediate group to find one combined part.'
      );
    }

    const unit = randInt(3, 9);
    const total = (combinedA + commonB + combinedC) * unit;

    return psQ(
      'ratio',
      s,
      `A factory has day, evening and night workers. The ratio of day to evening workers is ${a}:${b}, and the ratio of evening to night workers is ${c}:${d}. There are ${total} workers altogether. How many work the night shift?`,
      combinedC * unit,
      'Combine the two ratios by making the evening parts equal, then use the total to find one combined part.'
    );
  }

  // 8. Best-buy and unit-rate decisions
  if (type === 8) {
    if (s === 'basic') {
      const items = randInt(3, 9);
      const unitCost = randInt(3, 12);
      const totalCost = items * unitCost;

      return psQ(
        'ratio',
        s,
        `${items} identical notebooks cost $${totalCost}. A student needs to know the price of one notebook before comparing shops. What is the unit price?`,
        unitCost,
        'Divide the total cost by the number of notebooks.'
      );
    }

    if (s === 'multi') {
      const knownQuantity = randInt(3, 8);
      const unitCost = randInt(3, 12);
      const targetQuantity = randInt(knownQuantity + 2, knownQuantity + 8);
      const delivery = randInt(2, 8);

      return psQ(
        'ratio',
        s,
        `${knownQuantity} metres of fabric cost $${knownQuantity * unitCost}. At the same unit rate, a customer orders ${targetQuantity} metres and pays a $${delivery} delivery fee. What is the total cost?`,
        targetQuantity * unitCost + delivery,
        'Find the cost per metre, calculate the fabric cost, then add the delivery fee.'
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
      `Pack A contains ${packAItems} drink bottles and costs $${packACost}. Pack B contains ${packBItems} bottles and costs $${packBCost}. A sports club needs ${comparisonQuantity} bottles. How much money can it save by choosing the better-value pack?`,
      (dearerRate - cheaperRate) * comparisonQuantity,
      'Compare the unit prices, then compare the costs for the same total number of bottles.'
    );
  }

  // 9. Mixtures and concentration ratios
  if (type === 9) {
    if (s === 'basic') {
      const syrupParts = randInt(1, 3);
      const waterParts = randInt(3, 7);
      const unit = randInt(2, 5);
      const total = (syrupParts + waterParts) * unit;

      return psQ(
        'ratio',
        s,
        `A drink is made by mixing syrup and water in the ratio ${syrupParts}:${waterParts}. A jug contains ${total} cups of drink. How many cups are syrup?`,
        syrupParts * unit,
        'Add the ratio parts, find one part, then calculate the syrup amount.'
      );
    }

    if (s === 'multi') {
      const paintA = randInt(2, 5);
      const paintB = randInt(3, 7);
      const unit = randInt(2, 5);
      const tins = randInt(2, 4);
      const oneTin = (paintA + paintB) * unit;

      return psQ(
        'ratio',
        s,
        `Blue and white paint are mixed in the ratio ${paintA}:${paintB}. One tin contains ${oneTin} litres of paint. How many litres of white paint are needed for ${tins} identical tins?`,
        paintB * unit * tins,
        'Find the amount of white paint in one tin, then multiply by the number of tins.'
      );
    }

    const juiceParts = randInt(2, 4);
    const waterParts = randInt(4, 7);
    const unit = randInt(3, 6);
    const addedWaterParts = randInt(1, 3);
    const juice = juiceParts * unit;
    const water = waterParts * unit;
    const addedWater = addedWaterParts * unit;
    const newRatio = simplifyRatio(juice, water + addedWater);

    return psQ(
      'ratio',
      s,
      `A container holds juice and water in the ratio ${juiceParts}:${waterParts}. After ${addedWater} litres of water are added, the new ratio of juice to water is ${newRatio}. How many litres were in the container before the water was added?`,
      juice + water,
      'Use the original ratio and the amount of water added to determine one original ratio part.'
    );
  }

  // 10. Scale models and resizing
  if (s === 'basic') {
    const scale = pick([2, 3, 4, 5]);
    const modelLength = randInt(3, 12);

    return psQ(
      'ratio',
      s,
      `A model car is built at a scale of 1:${scale}. The model is ${modelLength} cm long. How long is the real car in centimetres?`,
      modelLength * scale,
      'Multiply the model length by the scale factor.'
    );
  }

  if (s === 'multi') {
    const scale = pick([20, 25, 50, 100]);
    const length = randInt(4, 12);
    const width = randInt(3, 10);

    return psQ(
      'ratio',
      s,
      `A floor plan uses the scale 1 cm : ${scale} cm. A rectangular room measures ${length} cm by ${width} cm on the plan. What is the actual perimeter of the room, in centimetres?`,
      2 * (length + width) * scale,
      'Find the plan perimeter first, then apply the scale factor to the full length.'
    );
  }

  const originalScale = pick([20, 25, 50]);
  const newScale = originalScale * pick([2, 4]);
  const originalDrawingLength = randInt(4, 12);
  const actualLength = originalDrawingLength * originalScale;

  return psQ(
    'ratio',
    s,
    `A wall is shown as ${originalDrawingLength} cm long on a plan with scale 1 cm : ${originalScale} cm. The same wall is redrawn using scale 1 cm : ${newScale} cm. How long should it appear on the new plan?`,
    actualLength / newScale,
    'Find the actual wall length from the first plan, then convert it using the new scale.'
  );
}

function psGenProportion() {
  const s = chooseProblemStructure();
  const type = randInt(1, 6);

  // 1. Fixed price or fixed rate — direct proportion
  if (type === 1) {
    if (s === 'basic') {
      const unitPrice = randInt(3, 12);
      const knownQuantity = randInt(2, 8);
      const targetQuantity = randInt(knownQuantity + 1, knownQuantity + 8);

      return psQ(
        'proportion',
        s,
        `${knownQuantity} identical lunch boxes cost $${knownQuantity * unitPrice}. At the same price per box, how much will ${targetQuantity} boxes cost?`,
        targetQuantity * unitPrice,
        'Find the price of one box, then multiply by the new quantity.'
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
        `${knownQuantity} kg of apples costs $${knownQuantity * unitPrice}. At the same price per kilogram, a customer buys ${targetQuantity} kg and pays $${payment}. How much change should the customer receive?`,
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
      'Use the fixed unit price to find the number originally ordered, then subtract the returned folders.'
    );
  }

  // 2. Constant speed — distance proportional to travelling time
  if (type === 2) {
    if (s === 'basic') {
      const speed = pick([40, 50, 60, 70, 80, 90]);
      const knownTime = randInt(2, 5);
      const targetTime = randInt(knownTime + 1, knownTime + 4);

      return psQ(
        'proportion',
        s,
        `A delivery van travels ${speed * knownTime} km in ${knownTime} hours at a constant speed. How far will it travel in ${targetTime} hours at the same speed?`,
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
        `A train travels ${speed * knownTime} km in ${knownTime} hours at a constant speed. On another journey, it travels for ${firstTime} hours, stops at a station, and then travels for another ${secondTime} hours at the same speed. What total distance does it travel while moving?`,
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
      `A bus travels at a constant speed. After ${elapsedTime} hours, it still has ${remainingDistance} km left in a journey that takes ${totalTime} hours altogether. What is the total length of the journey?`,
      speed * totalTime,
      'Use the remaining distance and remaining time to find the speed, then find the whole journey distance.'
    );
  }

  // 3. Production and machine-hours
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
        'The time is unchanged, so output changes in direct proportion to the number of machines.'
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
    const rejected = randInt(10, 40);
    const totalOutput = rate * (
      firstMachines * firstHours + secondMachines * secondHours
    );

    return psQ(
      'proportion',
      s,
      `${firstMachines} printers operate for ${firstHours} hours. Then ${secondMachines} printers operate for another ${secondHours} hours. Each printer produces ${rate} pages per hour, but ${rejected} pages fail quality checking. How many acceptable pages remain?`,
      totalOutput - rejected,
      'Calculate the output from both stages, add them, then subtract the rejected pages.'
    );
  }

  // 4. Workers and completion time — inverse proportion
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
        `${workers1} workers can plant a park in ${days1} days. Assuming everyone works at the same rate, how many days would ${workers2} workers need?`,
        totalWorkerDays / workers2,
        'For a fixed job, the number of workers multiplied by the number of days stays constant.'
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
        `${workers1} workers are expected to complete a landscaping project in ${plannedDays} days. After ${firstDays} days, the team changes to ${workers2} equally efficient workers. How many more days are needed?`,
        remainingWorkerDays / workers2,
        'Convert the whole project into worker-days, subtract completed work, then divide by the new team size.'
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
      `${workers1} workers could complete a building project in ${plannedDays} days. They work for ${firstDays} days, and the remaining work is then completed in ${secondDays} days by a different-sized team of equally efficient workers. How many workers are in the second team?`,
      workers2,
      'Find the total worker-days, subtract the first stage, then divide the remaining worker-days by the second-stage time.'
    );
  }

  // 5. Supplies, servings and stock planning
  if (type === 5) {
    if (s === 'basic') {
      const people1 = randInt(3, 8);
      const bottles1 = randInt(2, 6);
      const scale = randInt(2, 4);
      const people2 = people1 * scale;

      return psQ(
        'proportion',
        s,
        `A school camp provides ${bottles1} bottles of water for every ${people1} students. At the same rate, how many bottles are needed for ${people2} students?`,
        bottles1 * scale,
        'The number of students and the number of bottles must be scaled by the same factor.'
      );
    }

    if (s === 'multi') {
      const people1 = randInt(4, 8);
      const packs1 = randInt(2, 5);
      const scale = randInt(2, 4);
      const people2 = people1 * scale;
      const sparePacks = randInt(1, 3);

      return psQ(
        'proportion',
        s,
        `A first-aid event uses ${packs1} supply packs for every ${people1} participants. The organisers expect ${people2} participants and want ${sparePacks} extra packs. How many packs should they prepare altogether?`,
        packs1 * scale + sparePacks,
        'Scale the required packs to the new number of participants, then add the spare packs.'
      );
    }

    const studentsPerTray = randInt(4, 8);
    const slicesPerTray = randInt(8, 16);
    const students = studentsPerTray * randInt(3, 6);
    const absent = randInt(2, Math.min(8, students - 1));
    const attending = students - absent;
    const slicesPerStudent = slicesPerTray / studentsPerTray;

    if (!Number.isInteger(slicesPerStudent)) return psGenProportion();

    return psQ(
      'proportion',
      s,
      `A catering plan allows ${slicesPerTray} pizza slices for every ${studentsPerTray} students. Food was prepared for ${students} students, but ${absent} are absent. If the same allowance per student is kept, how many slices are actually needed?`,
      attending * slicesPerStudent,
      'Find the number of slices allowed per student, then multiply by the number attending.'
    );
  }

  // 6. Inverse proportion in travel, storage or resource allocation
  if (s === 'basic') {
    const taps1 = randInt(2, 5);
    const hours1 = randInt(4, 12);
    const totalTapHours = taps1 * hours1;
    const options = [2, 3, 4, 5, 6, 8, 10]
      .filter(value => value !== taps1 && totalTapHours % value === 0);

    if (!options.length) return psGenProportion();

    const taps2 = pick(options);

    return psQ(
      'proportion',
      s,
      `${taps1} identical taps fill a storage tank in ${hours1} hours. If ${taps2} identical taps are used instead, how long will the tank take to fill?`,
      totalTapHours / taps2,
      'For the same tank, the number of taps multiplied by the filling time stays constant.'
    );
  }

  if (s === 'multi') {
    const vehicles1 = randInt(3, 6);
    const trips1 = randInt(6, 12);
    const totalVehicleTrips = vehicles1 * trips1;
    const options = [2, 3, 4, 5, 6, 8, 9, 10, 12]
      .filter(value => value !== vehicles1 && totalVehicleTrips % value === 0);

    if (!options.length) return psGenProportion();

    const vehicles2 = pick(options);
    const loadingDelay = randInt(1, 3);

    return psQ(
      'proportion',
      s,
      `${vehicles1} identical trucks need ${trips1} trips each to move a pile of soil. If ${vehicles2} trucks share the same work equally, how many trips will each truck make, including ${loadingDelay} extra trips required because some soil is moved to a second site?`,
      totalVehicleTrips / vehicles2 + loadingDelay,
      'Find the total number of truck-trips for the original job, divide by the new number of trucks, then include the extra trips.'
    );
  }

  const pumps1 = randInt(3, 6);
  const hours1 = randInt(8, 15);
  const firstHours = randInt(2, hours1 - 3);
  const totalPumpHours = pumps1 * hours1;
  const remainingPumpHours = totalPumpHours - pumps1 * firstHours;
  const finalHours = randInt(2, 6);

  if (remainingPumpHours % finalHours !== 0) return psGenProportion();

  const pumps2 = remainingPumpHours / finalHours;

  if (pumps2 < 2 || pumps2 > 15 || pumps2 === pumps1) {
    return psGenProportion();
  }

  return psQ(
    'proportion',
    s,
    `${pumps1} identical pumps could empty a reservoir in ${hours1} hours. They work for ${firstHours} hours, after which the remaining water must be removed in ${finalHours} hours. How many identical pumps are needed for the second stage?`,
    pumps2,
    'Calculate the total pump-hours, subtract the first stage, then divide the remaining pump-hours by the required time.'
  );
}
