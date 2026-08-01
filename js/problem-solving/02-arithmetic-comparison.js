'use strict';

/* Arithmetic and comparison problem banks.
   Split from DYAAPS.html without changing the original logic. */

function psGenArithmetic() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    if (chance(0.5)) {
      const boxes = randInt(4, 12);
      const perBox = randInt(6, 18);
      const used = randInt(8, Math.max(9, boxes * perBox - 12));
      return psQ('arithmetic', s,
        `A school received ${boxes} boxes containing ${perBox} exercise books in each box. After ${used} books were distributed, how many books remained?`,
        boxes * perBox - used,
        'Calculate the total number of books, then subtract the number distributed.');
    }

    const capacity = pick([24, 30, 36, 40, 48]);
    const people = randInt(capacity + 5, capacity * 6 - 1);
    return psQ('arithmetic', s,
      `A minibus can carry ${capacity} passengers. What is the minimum number of minibuses required to transport ${people} passengers?`,
      Math.ceil(people / capacity),
      'Divide the number of passengers by the capacity and round up.');
  }

  if (s === 'multi') {
    if (chance(0.5)) {
      const adult = randInt(8, 18);
      const child = randInt(5, adult - 2);
      const adults = randInt(12, 35);
      const children = randInt(8, 28);
      const hire = pick([80, 120, 150, 200]);
      return psQ('arithmetic', s,
        `A group bought ${adults} adult tickets at $${adult} each and ${children} child tickets at $${child} each. A booking fee of $${hire} was also charged. Calculate the total amount paid.`,
        adults * adult + children * child + hire,
        'Find the two ticket totals and then add the booking fee.');
    }

    const rows = randInt(8, 18);
    const seats = randInt(12, 24);
    const reserved = randInt(15, 45);
    const absent = randInt(8, 25);
    return psQ('arithmetic', s,
      `A theatre has ${rows} rows with ${seats} seats in each row. ${reserved} seats are reserved for staff. On the day, ${absent} of the remaining ticket holders are absent. How many audience members attend?`,
      rows * seats - reserved - absent,
      'Calculate the total capacity, then subtract the reserved seats and absences.');
  }

  if (chance(0.5)) {
    const pack = pick([6, 8, 10, 12]);
    const required = randInt(pack * 5 + 1, pack * 14 - 1);
    const spare = Math.ceil(required / pack) * pack - required;
    return psQ('arithmetic', s,
      `Markers are sold only in packs of ${pack}. A teacher needs at least ${required} markers. After buying the minimum possible number of packs, how many markers will be left unused?`,
      spare,
      'Find the minimum number of complete packs, then subtract the number required.');
  }

  const start = randInt(250, 600);
  const first = randInt(40, 100);
  const second = randInt(30, 90);
  const final = start - first + second;
  return psQ('arithmetic', s,
    `A storage tank initially contained an unknown amount of water. After ${first} litres were used and ${second} litres were added, the tank contained ${final} litres. How many litres were in the tank initially?`,
    start,
    'Reverse the final addition and subtraction.');
}

function psGenComparison() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const a = randInt(45, 160);
    const diff = randInt(12, 55);
    return psQ('comparison', s,
      `A library recorded ${a} visitors on Monday and ${a + diff} visitors on Tuesday. How many more visitors were recorded on Tuesday?`,
      diff,
      'Subtract the smaller number from the larger number.');
  }

  if (s === 'multi') {
    const small = randInt(12, 45);
    const multiple = randInt(2, 5);
    const extra = randInt(4, 16);
    return psQ('comparison', s,
      `Mia collected ${small} cans. Noah collected ${multiple} times as many cans as Mia, and then collected a further ${extra} cans. How many more cans did Noah collect than Mia?`,
      small * multiple + extra - small,
      'Find Noah’s total first, then compare it with Mia’s total.');
  }

  if (chance(0.5)) {
    const small = randInt(12, 45);
    const multiple = randInt(2, 5);
    const total = small * (multiple + 1);
    return psQ('comparison', s,
      `Two containers hold ${total} litres altogether. The larger container holds ${multiple} times as much as the smaller container. How many litres are in the smaller container?`,
      small,
      'Represent the two amounts as one part and several equal parts.');
  }

  const b = randInt(15, 50);
  const diff = randInt(8, 25);
  const total = 2 * b + diff;
  return psQ('comparison', s,
    `Two classes have ${total} students altogether. Class A has ${diff} more students than Class B. How many students are in Class B?`,
    b,
    'Remove the difference from the total, then divide the remainder equally.');
}
