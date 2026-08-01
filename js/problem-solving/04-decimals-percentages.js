'use strict';

/* Decimals, money and percentage problem banks.
   Split from DYAAPS.html without changing the original logic. */

function psGenDecimalsMoney() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const quantity = pick([1.5, 2.5, 3.2, 4.5, 6.4]);
    const rate = pick([2.5, 3.75, 4.2, 5.5, 6.25]);
    return psQ('decimalsMoney', s,
      `Apples cost $${fmt(rate)} per kilogram. Calculate the cost of ${fmt(quantity)} kilograms of apples.`,
      round2(quantity * rate),
      'Multiply the mass by the price per kilogram.');
  }

  if (s === 'multi') {
    const itemA = pick([3.5, 4.25, 5.75, 6.4]);
    const itemB = pick([2.2, 3.6, 4.5, 5.25]);
    const countA = randInt(2, 5);
    const countB = randInt(2, 4);
    const total = round2(itemA * countA + itemB * countB);
    const paid = Math.ceil(total / 10) * 10;
    return psQ('decimalsMoney', s,
      `A customer buys ${countA} notebooks at $${fmt(itemA)} each and ${countB} pens at $${fmt(itemB)} each. The customer pays with $${paid}. Calculate the change received.`,
      round2(paid - total),
      'Calculate the total cost and subtract it from the amount paid.');
  }

  const planA = pick([12, 15, 18, 20]);
  const rateA = pick([0.18, 0.22, 0.25, 0.3]);
  const planB = planA + pick([6, 8, 10]);
  const rateB = round2(rateA - pick([0.08, 0.1, 0.12]));
  const usage = pick([80, 100, 120, 150]);
  const costA = round2(planA + rateA * usage);
  const costB = round2(planB + rateB * usage);
  return psQ('decimalsMoney', s,
    `Plan A charges a fixed fee of $${planA} plus $${fmt(rateA)} per unit used. Plan B charges a fixed fee of $${planB} plus $${fmt(rateB)} per unit. For ${usage} units of use, how much cheaper is the less expensive plan?`,
    round2(Math.abs(costA - costB)),
    'Calculate the total cost of each plan, then find the difference.');
}

function psGenPercentages() {
  const s = chooseProblemStructure();
  const level = Number(state.year);

  const makeQuestion = (percentageType, text, answer, hint) => ({
    ...psQ('percentages', s, text, round2(answer), hint),
    percentageType
  });

  const basesByLevel = {
    7: [80, 100, 120, 160, 200, 240, 300, 400],
    8: [120, 160, 200, 240, 300, 320, 400, 480, 600, 800],
    9: [160, 200, 240, 300, 320, 400, 480, 600, 640, 800, 960, 1200]
  };

  const easyRates = [10, 20, 25, 30, 40, 50];
  const easyComparisonRates = [5, 10, 20, 25, 30, 40, 50, 60, 75];
  const easyTaxRates = [5, 10, 20];
  const easySuccessiveRates = [10, 20, 25];

  const isWhole = value => Math.abs(value - Math.round(value)) < 1e-8;

  const pickWholeBase = (rates, directions = [], candidates = basesByLevel[level]) => {
    const valid = candidates.filter(base => {
      let value = base;

      for (let i = 0; i < rates.length; i++) {
        const rate = rates[i];
        const direction = directions[i] || 'part';

        if (direction === 'increase') {
          value *= 1 + rate / 100;
        } else if (direction === 'decrease') {
          value *= 1 - rate / 100;
        } else {
          value *= rate / 100;
        }

        if (!isWhole(value)) return false;
      }

      return true;
    });

    return pick(valid.length ? valid : candidates);
  };

  if (s === 'basic') {
    const type = randInt(1, 6);

    if (type === 1) {
      const p = pick(level === 7
        ? [10, 20, 25, 40, 50, 75]
        : easyComparisonRates);
      const base = pickWholeBase([p]);

      return makeQuestion(
        'percentage_of_amount',
        `A school has ${base} students. ${p}% of the students take part in a sports programme. Calculate the number of students who take part.`,
        base * p / 100,
        'Calculate the stated percentage of the total number of students.'
      );
    }

    if (type === 2) {
      const p = pick(level === 7
        ? [10, 20, 25, 30, 40, 50, 60, 75]
        : easyComparisonRates);
      const total = pickWholeBase([p]);
      const part = total * p / 100;

      return makeQuestion(
        'find_percentage',
        `A warehouse inspected ${total} items and found that ${part} items were defective. Calculate the percentage of the items that were defective.`,
        p,
        'Divide the defective number by the total number, then multiply by 100.'
      );
    }

    if (type === 3) {
      const p = pick(easyRates);
      const increase = chance(0.5);
      const original = pickWholeBase(
        [p],
        [increase ? 'increase' : 'decrease']
      );

      return makeQuestion(
        'percentage_change',
        `A quantity of ${original} is ${increase ? 'increased' : 'decreased'} by ${p}%. Calculate the new quantity.`,
        original * (increase ? 1 + p / 100 : 1 - p / 100),
        `Calculate ${p}% of the original quantity, then ${increase ? 'add' : 'subtract'} it.`
      );
    }

    if (type === 4) {
      const discount = pick(easyRates);
      const markedPrice = pickWholeBase([discount], ['decrease']);

      return makeQuestion(
        'discount',
        `An item has a marked price of $${markedPrice}. A discount of ${discount}% is applied. Calculate the sale price.`,
        markedPrice * (1 - discount / 100),
        'Calculate the discount and subtract it from the marked price.'
      );
    }

    if (type === 5) {
      const taxRate = pick(easyTaxRates);
      const priceBeforeTax = pickWholeBase([taxRate]);
      const askTax = chance(0.5);

      return makeQuestion(
        'tax',
        askTax
          ? `The price of a service before tax is $${priceBeforeTax}. Tax is charged at ${taxRate}%. Calculate the amount of tax.`
          : `The price of a service before tax is $${priceBeforeTax}. Tax is charged at ${taxRate}%. Calculate the total price including tax.`,
        askTax
          ? priceBeforeTax * taxRate / 100
          : priceBeforeTax * (1 + taxRate / 100),
        askTax
          ? 'Calculate the stated percentage of the price before tax.'
          : 'Calculate the tax and add it to the price before tax.'
      );
    }

    const rate = pick(easyRates);
    const profit = chance(0.6);
    const costPrice = pickWholeBase(
      [rate],
      [profit ? 'increase' : 'decrease']
    );
    const askAmount = chance(0.5);

    return makeQuestion(
      'profit_loss',
      askAmount
        ? `An item has a cost price of $${costPrice}. It is sold at a ${rate}% ${profit ? 'profit' : 'loss'}, calculated as a percentage of the cost price. Calculate the ${profit ? 'profit' : 'loss'} amount.`
        : `An item has a cost price of $${costPrice}. It is sold at a ${rate}% ${profit ? 'profit' : 'loss'}, calculated as a percentage of the cost price. Calculate the selling price.`,
      askAmount
        ? costPrice * rate / 100
        : costPrice * (profit ? 1 + rate / 100 : 1 - rate / 100),
      askAmount
        ? `Calculate ${rate}% of the cost price.`
        : `Calculate the ${profit ? 'profit' : 'loss'} amount, then ${profit ? 'add' : 'subtract'} it.`
    );
  }

  if (s === 'multi') {
    const type = randInt(1, 6);

    if (type === 1) {
      const discount = pick([10, 20, 25, 30, 40]);
      const taxRate = pick([10, 20]);
      const markedPrice = pickWholeBase(
        [discount, taxRate],
        ['decrease', 'increase']
      );

      return makeQuestion(
        'discount',
        `An item has a marked price of $${markedPrice}. A discount of ${discount}% is applied. Tax of ${taxRate}% is then added to the discounted price. Calculate the final price.`,
        markedPrice * (1 - discount / 100) * (1 + taxRate / 100),
        'Calculate the discounted price first, then add the tax.'
      );
    }

    if (type === 2) {
      const unitPrice = level === 7
        ? pick([20, 30, 40, 50, 60])
        : level === 8
          ? pick([40, 50, 60, 80, 100])
          : pick([60, 80, 100, 120, 150]);
      const quantity = level === 7
        ? randInt(2, 5)
        : level === 8
          ? randInt(3, 7)
          : randInt(4, 9);
      const taxRate = pick([10, 20]);
      const delivery = level === 7
        ? pick([5, 10, 15, 20])
        : level === 8
          ? pick([10, 15, 20, 25])
          : pick([15, 20, 25, 30, 40]);
      const subtotal = unitPrice * quantity;

      return makeQuestion(
        'tax',
        `A customer purchases ${quantity} identical items at $${unitPrice} each. Tax of ${taxRate}% is applied to the item subtotal, and a delivery charge of $${delivery} is then added. Calculate the final amount paid.`,
        subtotal * (1 + taxRate / 100) + delivery,
        'Calculate the item subtotal, add the tax, and then add the delivery charge.'
      );
    }

    if (type === 3) {
      const costPrice = level === 7
        ? pick([60, 80, 100, 120, 160])
        : level === 8
          ? pick([80, 120, 160, 200, 240])
          : pick([120, 160, 200, 240, 320, 400]);
      const additionalCost = level === 7
        ? pick([20, 40, 60])
        : level === 8
          ? pick([20, 40, 60, 80])
          : pick([40, 60, 80, 100]);
      const profitRate = pick([10, 20, 25, 40, 50]);
      const totalCost = costPrice + additionalCost;

      return makeQuestion(
        'profit_loss',
        `A retailer buys an item for $${costPrice} and pays an additional handling cost of $${additionalCost}. The item is sold at a profit of ${profitRate}% on the total cost. Calculate the selling price.`,
        totalCost * (1 + profitRate / 100),
        'Add the costs first, then calculate and add the profit.'
      );
    }

    if (type === 4) {
      const firstRate = pick([20, 25, 30, 40, 50]);
      const secondRate = pick([10, 20, 25, 30]);
      const total = pickWholeBase(
        [firstRate],
        ['part'],
        level === 7
          ? [200, 300, 400, 500, 600, 800]
          : level === 8
            ? [400, 600, 800, 1000, 1200]
            : [600, 800, 1000, 1200, 1600, 2000]
      );
      const firstNumber = total * firstRate / 100;
      const secondNumber = total * secondRate / 100;

      return makeQuestion(
        'find_percentage',
        `In a survey of ${total} people, ${firstNumber} selected Option A and ${secondNumber} selected Option B. Calculate the percentage of the people who selected either Option A or Option B.`,
        firstRate + secondRate,
        'Add the two groups, divide by the total number surveyed, and multiply by 100.'
      );
    }

    if (type === 5) {
      const decrease = pick([10, 20, 25, 30, 40]);
      const original = pickWholeBase([decrease], ['decrease']);
      const fixedIncrease = level === 7
        ? pick([10, 20, 30, 40])
        : level === 8
          ? pick([20, 30, 40, 50, 60])
          : pick([30, 40, 50, 60, 80]);

      return makeQuestion(
        'percentage_change',
        `A stock level of ${original} units is reduced by ${decrease}%. A delivery of ${fixedIncrease} units is then received. Calculate the final stock level.`,
        original * (1 - decrease / 100) + fixedIncrease,
        'Calculate the reduced stock level first, then add the delivery.'
      );
    }

    const firstChange = pick(easySuccessiveRates);
    const secondChange = pick(easySuccessiveRates);
    const firstIncrease = chance(0.5);
    const secondIncrease = chance(0.5);
    const original = pickWholeBase(
      [firstChange, secondChange],
      [
        firstIncrease ? 'increase' : 'decrease',
        secondIncrease ? 'increase' : 'decrease'
      ]
    );

    return makeQuestion(
      'successive_change',
      `A quantity of ${original} is first ${firstIncrease ? 'increased' : 'decreased'} by ${firstChange}% and is then ${secondIncrease ? 'increased' : 'decreased'} by ${secondChange}%. Calculate the final quantity.`,
      original
        * (firstIncrease ? 1 + firstChange / 100 : 1 - firstChange / 100)
        * (secondIncrease ? 1 + secondChange / 100 : 1 - secondChange / 100),
      'Apply the two percentage changes in the stated order.'
    );
  }

  const type = randInt(1, 6);

  if (type === 1) {
    const rate = pick([10, 20, 25, 40, 50]);
    const increase = chance(0.5);
    const original = pickWholeBase(
      [rate],
      [increase ? 'increase' : 'decrease']
    );
    const finalValue = original * (increase ? 1 + rate / 100 : 1 - rate / 100);

    return makeQuestion(
      'reverse_percentage',
      `After a ${rate}% ${increase ? 'increase' : 'decrease'}, a quantity is ${finalValue}. Calculate the original quantity.`,
      original,
      `Divide the final quantity by the ${increase ? 'increase' : 'decrease'} multiplier.`
    );
  }

  if (type === 2) {
    const discount = pick([10, 20, 25, 40, 50]);
    const originalPrice = pickWholeBase([discount], ['decrease']);
    const salePrice = originalPrice * (1 - discount / 100);

    return makeQuestion(
      'reverse_percentage',
      `After a discount of ${discount}%, an item is sold for $${salePrice}. Calculate the original marked price.`,
      originalPrice,
      'Divide the sale price by the percentage of the marked price that remains.'
    );
  }

  if (type === 3) {
    const taxRate = pick([10, 20]);
    const priceBeforeTax = pickWholeBase([taxRate], ['increase']);
    const priceIncludingTax = priceBeforeTax * (1 + taxRate / 100);

    return makeQuestion(
      'reverse_percentage',
      `The price of an item including ${taxRate}% tax is $${priceIncludingTax}. Calculate the price before tax.`,
      priceBeforeTax,
      'Divide the tax-inclusive price by the tax multiplier.'
    );
  }

  if (type === 4) {
    const rate = pick([10, 20, 25, 40, 50]);
    const profit = chance(0.65);
    const costPrice = pickWholeBase(
      [rate],
      [profit ? 'increase' : 'decrease']
    );
    const sellingPrice = costPrice * (profit ? 1 + rate / 100 : 1 - rate / 100);

    return makeQuestion(
      'profit_loss',
      `An item is sold for $${sellingPrice}, producing a ${rate}% ${profit ? 'profit' : 'loss'} based on the cost price. Calculate the cost price.`,
      costPrice,
      `Divide the selling price by the ${profit ? 'profit' : 'loss'} multiplier.`
    );
  }

  if (type === 5) {
    const firstRate = pick(easySuccessiveRates);
    const secondRate = pick(easySuccessiveRates);
    const firstIncrease = chance(0.5);
    const secondIncrease = chance(0.5);
    const original = pickWholeBase(
      [firstRate, secondRate],
      [
        firstIncrease ? 'increase' : 'decrease',
        secondIncrease ? 'increase' : 'decrease'
      ]
    );
    const finalValue = original
      * (firstIncrease ? 1 + firstRate / 100 : 1 - firstRate / 100)
      * (secondIncrease ? 1 + secondRate / 100 : 1 - secondRate / 100);

    return makeQuestion(
      'successive_change',
      `A quantity is first ${firstIncrease ? 'increased' : 'decreased'} by ${firstRate}% and is then ${secondIncrease ? 'increased' : 'decreased'} by ${secondRate}%. The final quantity is ${finalValue}. Calculate the original quantity.`,
      original,
      'Reverse the second percentage change first, then reverse the first change.'
    );
  }

  const finalScenarios = [
    { markup: 25, discount: 20, taxRate: 10, bases: [80, 100, 120, 160, 200, 240, 300, 400] },
    { markup: 20, discount: 25, taxRate: 20, bases: [100, 200, 300, 400, 500, 600, 800] },
    { markup: 50, discount: 20, taxRate: 10, bases: [100, 200, 300, 400, 500, 600] },
    { markup: 40, discount: 25, taxRate: 20, bases: [100, 200, 300, 400, 500, 600] },
    { markup: 25, discount: 20, taxRate: 20, bases: [80, 100, 120, 160, 200, 240, 300, 400] },
    { markup: 20, discount: 50, taxRate: 20, bases: [100, 200, 300, 400, 500, 600, 800] }
  ];
  const scenario = pick(finalScenarios);
  const { markup, discount, taxRate } = scenario;
  const costPrice = pick(scenario.bases);
  const markedPrice = costPrice * (1 + markup / 100);
  const discountedPrice = markedPrice * (1 - discount / 100);
  const finalPrice = discountedPrice * (1 + taxRate / 100);

  return makeQuestion(
    'successive_change',
    `A retailer marks an item up by ${markup}% above its cost price. A discount of ${discount}% is then applied to the marked price, followed by tax at ${taxRate}%. The cost price is $${costPrice}. Calculate the final price including tax.`,
    finalPrice,
    'Calculate the marked price, then the discounted price, and finally add the tax.'
  );
}
