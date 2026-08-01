'use strict';

/* Fraction problem bank.
   Split from DYAAPS.html without changing the original logic. */

function psGenFractions() {
  const s = chooseProblemStructure();
  const level = state.year;

  if (s === 'basic') {
    if (level === 7) {
      const type = randInt(1, 3);

      if (type === 1) {
        const [n, d] = pick([[1, 3], [2, 5], [3, 4], [5, 8], [7, 10]]);
        const unit = randInt(4, 18);
        const total = d * unit;

        return psQ(
          'fractions',
          s,
          `A container holds ${total} identical counters. ${n}/${d} of the counters are blue. Calculate the number of blue counters.`,
          n * unit,
          'Divide the total by the denominator, then multiply by the numerator.'
        );
      }

      if (type === 2) {
        const [n, d] = pick([[1, 4], [2, 5], [3, 5], [3, 8], [5, 8]]);
        const unit = randInt(5, 18);
        const part = n * unit;

        return psQ(
          'fractions',
          s,
          `${part} students represent ${n}/${d} of a year group. Calculate the total number of students in the year group.`,
          d * unit,
          'Find the value of one fractional part, then multiply by the denominator.'
        );
      }

      const [a, b, c, d] = pick([
        [2, 3, 3, 5],
        [3, 4, 2, 3],
        [5, 8, 3, 5],
        [7, 10, 2, 3]
      ]);
      const total = lcm(b, d) * randInt(5, 12);
      const first = total * a / b;
      const second = total * c / d;

      return psQ(
        'fractions',
        s,
        `Two classes each contain ${total} students. In Class A, ${a}/${b} of the students travel by bus. In Class B, ${c}/${d} of the students travel by bus. How many more students travel by bus in the class with the larger number?`,
        Math.abs(first - second),
        'Calculate both fractional amounts, then find the difference.'
      );
    }

    if (level === 8) {
      const type = randInt(1, 3);

      if (type === 1) {
        const [n, d] = pick([[2, 3], [3, 5], [5, 6], [7, 8], [4, 7]]);
        const unit = randInt(8, 24);
        const part = n * unit;

        return psQ(
          'fractions',
          s,
          `A delivery of ${part} boxes represents ${n}/${d} of the full order. Calculate the total number of boxes in the full order.`,
          d * unit,
          'Divide the known amount by the numerator, then multiply by the denominator.'
        );
      }

      if (type === 2) {
        const [a, b, c, d] = pick([
          [2, 3, 3, 5],
          [3, 4, 2, 3],
          [5, 6, 3, 4],
          [4, 5, 5, 8]
        ]);
        const total = b * d * randInt(4, 12);
        const answer = total * a / b * c / d;

        return psQ(
          'fractions',
          s,
          `${a}/${b} of the ${total} books in a library section are fiction. Of the fiction books, ${c}/${d} are on loan. Calculate the number of fiction books that are on loan.`,
          answer,
          'Find the first fraction of the total, then find the second fraction of that result.'
        );
      }

      const [a, b, c, d] = pick([
        [1, 3, 1, 4],
        [2, 5, 1, 3],
        [3, 8, 1, 4],
        [1, 4, 2, 5]
      ]);
      const total = lcm(b, d) * randInt(8, 20);
      const allocated = total * a / b + total * c / d;

      return psQ(
        'fractions',
        s,
        `A school allocates ${a}/${b} of a budget to equipment and ${c}/${d} of the same budget to transport. The total budget is $${total}. Calculate the amount that remains for other expenses.`,
        total - allocated,
        'Calculate both allocations as fractions of the original budget, then subtract them from the total.'
      );
    }

    const type = randInt(1, 3);

    if (type === 1) {
      const [a, b, c, d] = pick([
        [3, 4, 5, 6],
        [5, 8, 4, 5],
        [7, 10, 3, 4],
        [4, 5, 7, 8]
      ]);
      const total = b * d * randInt(6, 15);
      const answer = total * a / b * c / d;

      return psQ(
        'fractions',
        s,
        `${a}/${b} of a shipment consists of electronic components. Of those components, ${c}/${d} pass the initial inspection. If the shipment contains ${total} items, calculate the number of electronic components that pass the inspection.`,
        answer,
        'Multiply the two fractions of the original quantity.'
      );
    }

    if (type === 2) {
      const [a, b, c, d] = pick([
        [5, 8, 2, 3],
        [7, 10, 3, 4],
        [4, 5, 5, 6],
        [3, 4, 7, 10]
      ]);
      const totalA = b * randInt(14, 28);
      const totalB = d * randInt(14, 28);
      const amountA = totalA * a / b;
      const amountB = totalB * c / d;

      return psQ(
        'fractions',
        s,
        `Warehouse A dispatches ${a}/${b} of its ${totalA} packages. Warehouse B dispatches ${c}/${d} of its ${totalB} packages. Calculate the difference between the numbers of packages dispatched by the two warehouses.`,
        Math.abs(amountA - amountB),
        'Calculate each fractional quantity separately, then find the difference.'
      );
    }

    const [usedN, usedD] = pick([[3, 8], [5, 12], [7, 16], [5, 9]]);
    const original = usedD * randInt(12, 30);
    const remaining = original * (1 - usedN / usedD);

    return psQ(
      'fractions',
      s,
      `After ${usedN}/${usedD} of a supply was used, ${remaining} units remained. Calculate the original number of units in the supply.`,
      original,
      'The remaining amount represents the complementary fraction of the original total.'
    );
  }

  if (s === 'multi') {
    if (level === 7) {
      const type = randInt(1, 3);

      if (type === 1) {
        const [a, b, c, d] = pick([
          [1, 4, 2, 5],
          [1, 3, 1, 4],
          [3, 10, 1, 5],
          [2, 5, 1, 4]
        ]);
        const total = lcm(b, d) * randInt(8, 20);
        const remaining = total * (1 - a / b - c / d);

        return psQ(
          'fractions',
          s,
          `A warehouse stored ${total} cartons. During the first week, ${a}/${b} of the cartons were dispatched. During the second week, ${c}/${d} of the original number were dispatched. Calculate the number of cartons that remained.`,
          remaining,
          'Calculate both fractions of the original total, then subtract them from the total.'
        );
      }

      if (type === 2) {
        const [a, b, c, d] = pick([
          [1, 3, 1, 4],
          [2, 5, 1, 5],
          [3, 8, 1, 4],
          [1, 4, 2, 5]
        ]);
        const total = lcm(b, d) * randInt(8, 18);
        const first = total * a / b;
        const second = total * c / d;

        return psQ(
          'fractions',
          s,
          `A charity receives ${total} food parcels. It distributes ${a}/${b} of the parcels to Centre A and ${c}/${d} of the original number to Centre B. Calculate the number of parcels not distributed to either centre.`,
          total - first - second,
          'Find both distributed amounts and subtract them from the original total.'
        );
      }

      const [a, b, c, d] = pick([
        [2, 3, 1, 2],
        [3, 4, 2, 3],
        [4, 5, 3, 4],
        [5, 6, 2, 5]
      ]);
      const total = b * d * randInt(5, 12);
      const selected = total * a / b;
      const final = selected * c / d;

      return psQ(
        'fractions',
        s,
        `${a}/${b} of the ${total} students in a school take part in sport. Of those students, ${c}/${d} take part in a team sport. Calculate the number of students who take part in a team sport.`,
        final,
        'Find the fraction of the school that takes part in sport, then find the required fraction of that group.'
      );
    }

    if (level === 8) {
      const type = randInt(1, 3);

      if (type === 1) {
        const [firstN, firstD, secondN, secondD] = pick([
          [1, 3, 1, 2],
          [1, 4, 2, 3],
          [2, 5, 1, 2],
          [3, 8, 2, 5]
        ]);
        const original = firstD * secondD * randInt(6, 18);
        const afterFirst = original * (1 - firstN / firstD);
        const final = afterFirst * (1 - secondN / secondD);

        return psQ(
          'fractions',
          s,
          `A shop sold ${firstN}/${firstD} of its stock in the morning. It then sold ${secondN}/${secondD} of the remaining stock in the afternoon. The shop initially had ${original} items. Calculate the number of items remaining at the end of the day.`,
          final,
          'Calculate the amount remaining after the first sale, then apply the second fraction to that remainder.'
        );
      }

      if (type === 2) {
        const [firstN, firstD, secondN, secondD] = pick([
          [1, 3, 1, 2],
          [1, 4, 2, 3],
          [2, 5, 1, 2],
          [3, 8, 2, 5]
        ]);
        const original = firstD * secondD * randInt(8, 20);
        const final = original * (1 - firstN / firstD) * (1 - secondN / secondD);

        return psQ(
          'fractions',
          s,
          `A water tank loses ${firstN}/${firstD} of its contents through use. It then loses ${secondN}/${secondD} of the remaining water. After these two reductions, ${final} litres remain. Calculate the original amount of water in the tank.`,
          original,
          'Work backwards from the final amount or divide by the two remaining-fraction multipliers.'
        );
      }

      const [firstN, firstD, secondN, secondD] = pick([
        [1, 4, 1, 3],
        [2, 5, 1, 4],
        [3, 8, 2, 5],
        [1, 3, 1, 2]
      ]);
      const total = firstD * secondD * randInt(8, 18);
      const first = total * firstN / firstD;
      const afterFirst = total - first;
      const second = afterFirst * secondN / secondD;

      return psQ(
        'fractions',
        s,
        `A company assigns ${firstN}/${firstD} of its ${total} employees to Project A. It then assigns ${secondN}/${secondD} of the remaining employees to Project B. Calculate the number of employees who are assigned to neither project.`,
        total - first - second,
        'Subtract the first group, then calculate the second group as a fraction of the remainder.'
      );
    }

    const type = randInt(1, 3);

    if (type === 1) {
      const [firstN, firstD, secondN, secondD] = pick([
        [1, 4, 1, 3],
        [2, 5, 1, 2],
        [3, 8, 2, 5],
        [1, 3, 3, 5]
      ]);
      const original = firstD * secondD * randInt(10, 24);
      const afterFirst = original * (1 - firstN / firstD);
      const afterSecond = afterFirst * (1 - secondN / secondD);
      const added = pick([12, 18, 24, 30, 36]);

      return psQ(
        'fractions',
        s,
        `A storage facility dispatches ${firstN}/${firstD} of its stock. It then dispatches ${secondN}/${secondD} of the remaining stock. A further ${added} items are delivered to the facility, leaving ${afterSecond + added} items in stock. Calculate the original number of items.`,
        original,
        'Reverse the final delivery, then reverse each fractional reduction in order.'
      );
    }

    if (type === 2) {
      const [a, b, c, d, e, f] = pick([
        [3, 4, 2, 3, 1, 5],
        [5, 6, 3, 5, 1, 4],
        [7, 8, 4, 7, 1, 3],
        [4, 5, 3, 4, 2, 5]
      ]);
      const total = b * d * f * randInt(3, 8);
      const firstGroup = total * a / b * c / d;
      const secondGroup = total * e / f;

      return psQ(
        'fractions',
        s,
        `${a}/${b} of a company’s ${total} employees work on site. Of the on-site employees, ${c}/${d} work the morning shift. A separate ${e}/${f} of all employees work remotely. Calculate the difference between the number on the morning on-site shift and the number working remotely.`,
        Math.abs(firstGroup - secondGroup),
        'Calculate each group from the original total, then compare the two results.'
      );
    }

    const [firstN, firstD, secondN, secondD] = pick([
      [3, 8, 2, 5],
      [5, 12, 1, 3],
      [7, 16, 2, 5],
      [4, 9, 3, 5]
    ]);
    const total = firstD * secondD * randInt(8, 20);
    const first = total * firstN / firstD;
    const remainingAfterFirst = total - first;
    const second = remainingAfterFirst * secondN / secondD;

    return psQ(
      'fractions',
      s,
      `An organisation allocates ${firstN}/${firstD} of a fund to construction. It then allocates ${secondN}/${secondD} of the remaining fund to equipment. If the total fund is $${total}, calculate the amount left unallocated.`,
      total - first - second,
      'Apply the second fraction to the amount remaining after the first allocation.'
    );
  }

  if (level === 7) {
    const type = randInt(1, 3);

    if (type === 1) {
      const [firstN, firstD, secondN, secondD] = pick([
        [1, 3, 1, 2],
        [1, 4, 2, 3],
        [2, 5, 1, 2]
      ]);
      const original = firstD * secondD * randInt(8, 18);
      const final = original * (1 - firstN / firstD) * (1 - secondN / secondD);

      return psQ(
        'fractions',
        s,
        `A shop sold ${firstN}/${firstD} of its stock in the morning and then sold ${secondN}/${secondD} of the remaining stock in the afternoon. At the end of the day, ${final} items remained. Calculate the number of items in stock at the start of the day.`,
        original,
        'Work backwards from the final amount using the fractions that remained after each sale.'
      );
    }

    if (type === 2) {
      const [a, b, c, d, e, f] = pick([
        [2, 3, 3, 4, 1, 2],
        [3, 4, 2, 3, 2, 5],
        [4, 5, 3, 4, 1, 2]
      ]);
      const total = b * d * f * randInt(3, 8);
      const first = total * a / b * c / d;
      const second = total * e / f;

      return psQ(
        'fractions',
        s,
        `${a}/${b} of the ${total} pupils in a school attend an after-school activity. Of those pupils, ${c}/${d} attend a sports activity. Another ${e}/${f} of all pupils attend music tuition. How many more pupils are in the larger of these two groups?`,
        Math.abs(first - second),
        'Calculate the fraction-of-a-fraction group and the fraction-of-the-whole group, then compare them.'
      );
    }

    const [firstN, firstD, secondN, secondD] = pick([
      [1, 3, 1, 4],
      [2, 5, 1, 3],
      [3, 8, 2, 5]
    ]);
    const total = firstD * secondD * randInt(6, 16);
    const first = total * firstN / firstD;
    const remaining = total - first;
    const second = remaining * secondN / secondD;

    return psQ(
      'fractions',
      s,
      `A community group spends ${firstN}/${firstD} of a grant on venue hire and ${secondN}/${secondD} of the remaining grant on equipment. The grant is worth $${total}. Calculate the amount that remains.`,
      total - first - second,
      'The second fraction is taken from the amount remaining after the first expense.'
    );
  }

  if (level === 8) {
    const type = randInt(1, 3);

    if (type === 1) {
      const [firstN, firstD, secondN, secondD] = pick([
        [1, 4, 1, 3],
        [2, 5, 1, 2],
        [3, 8, 2, 5]
      ]);
      const original = firstD * secondD * randInt(10, 22);
      const afterSecond = original * (1 - firstN / firstD) * (1 - secondN / secondD);
      const added = pick([12, 18, 24, 30]);
      const final = afterSecond + added;

      return psQ(
        'fractions',
        s,
        `A tank initially contains an unknown amount of water. First, ${firstN}/${firstD} of the water is used. Next, ${secondN}/${secondD} of the remaining water is used. After ${added} litres are added, the tank contains ${final} litres. Calculate the original amount of water.`,
        original,
        'Subtract the added water, then reverse the two fractional reductions.'
      );
    }

    if (type === 2) {
      const [a, b, c, d] = pick([
        [3, 5, 2, 3],
        [5, 8, 3, 4],
        [7, 10, 4, 5]
      ]);
      const totalA = b * randInt(18, 35);
      const totalB = d * randInt(18, 35);
      const amountA = totalA * a / b;
      const amountB = totalB * c / d;

      return psQ(
        'fractions',
        s,
        `Factory A completes ${a}/${b} of an order of ${totalA} units. Factory B completes ${c}/${d} of an order of ${totalB} units. Calculate the difference between the numbers of units completed by the two factories.`,
        Math.abs(amountA - amountB),
        'The fractions refer to different totals, so calculate each completed quantity separately.'
      );
    }

    const [firstN, firstD, secondN, secondD] = pick([
      [1, 3, 2, 5],
      [3, 8, 1, 3],
      [2, 5, 3, 8]
    ]);
    const total = firstD * secondD * randInt(10, 24);
    const first = total * firstN / firstD;
    const remaining = total - first;
    const second = remaining * secondN / secondD;
    const left = total - first - second;

    return psQ(
      'fractions',
      s,
      `A research budget is divided as follows: ${firstN}/${firstD} of the total is assigned to staffing, and ${secondN}/${secondD} of the amount remaining is assigned to equipment. The unassigned balance is $${left}. Calculate the original research budget.`,
      total,
      'Express the final balance as a fraction of the original budget, then work backwards.'
    );
  }

  const type = randInt(1, 3);

  if (type === 1) {
    const [firstN, firstD, secondN, secondD] = pick([
      [1, 4, 1, 3],
      [2, 5, 1, 2],
      [3, 8, 2, 5],
      [1, 3, 3, 5]
    ]);
    const original = firstD * secondD * randInt(12, 30);
    const afterSecond = original * (1 - firstN / firstD) * (1 - secondN / secondD);
    const added = pick([18, 24, 30, 36, 42]);
    const final = afterSecond + added;

    return psQ(
      'fractions',
      s,
      `A distribution centre dispatches ${firstN}/${firstD} of its stock. It then dispatches ${secondN}/${secondD} of the remaining stock. A delivery of ${added} items arrives, after which the centre holds ${final} items. Calculate the original stock level.`,
      original,
      'Reverse the delivery, then reverse the two successive fractional changes.'
    );
  }

  if (type === 2) {
    const [a, b, c, d, e, f] = pick([
      [3, 4, 2, 3, 2, 5],
      [5, 6, 3, 5, 1, 3],
      [7, 8, 4, 7, 3, 8],
      [4, 5, 3, 4, 5, 12]
    ]);
    const total = lcm(lcm(b * d, f), 1) * randInt(8, 18);
    const firstGroup = total * a / b * c / d;
    const secondGroup = total * e / f;

    return psQ(
      'fractions',
      s,
      `${a}/${b} of a company’s ${total} employees work in technical roles. Of those employees, ${c}/${d} are assigned to development. Separately, ${e}/${f} of all employees are assigned to customer support. Calculate the difference between the numbers assigned to development and customer support.`,
      Math.abs(firstGroup - secondGroup),
      'One group is a fraction of a fraction, while the other is a fraction of the whole company.'
    );
  }

  const [firstN, firstD, secondN, secondD] = pick([
    [3, 8, 2, 5],
    [5, 12, 1, 3],
    [7, 16, 3, 5],
    [4, 9, 2, 5]
  ]);
  const original = firstD * secondD * randInt(12, 28);
  const firstAllocation = original * firstN / firstD;
  const remaining = original - firstAllocation;
  const secondAllocation = remaining * secondN / secondD;
  const finalBalance = original - firstAllocation - secondAllocation;

  return psQ(
    'fractions',
    s,
    `An investment fund allocates ${firstN}/${firstD} of its capital to Fund A. It then allocates ${secondN}/${secondD} of the remaining capital to Fund B. After both allocations, $${finalBalance} remains unallocated. Calculate the original value of the investment fund.`,
    original,
    'Determine the fraction of the original capital that remains after both allocations, then work backwards.'
  );
}
