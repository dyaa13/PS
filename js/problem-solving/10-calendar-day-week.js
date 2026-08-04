'use strict';

/* Calendar, day-of-week and repeating-schedule problem bank. */

const CALENDAR_DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const CALENDAR_MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];


function calendarOrdinalSuffix(value) {
  const number = Math.abs(Number(value));
  const lastTwo = number % 100;

  if (lastTwo >= 11 && lastTwo <= 13) return 'th';

  const last = number % 10;
  if (last === 1) return 'st';
  if (last === 2) return 'nd';
  if (last === 3) return 'rd';
  return 'th';
}

function calendarMod(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function calendarDayCode(dayIndex) {
  return calendarMod(dayIndex, 7) + 1;
}

function calendarDayName(dayIndex) {
  return CALENDAR_DAY_NAMES[calendarMod(dayIndex, 7)];
}

function calendarWeekdayOfDate(firstDayIndex, dateNumber) {
  return calendarMod(firstDayIndex + dateNumber - 1, 7);
}

function calendarCountWeekday(firstDayIndex, numberOfDays, targetDayIndex) {
  let count = 0;

  for (let date = 1; date <= numberOfDays; date++) {
    if (calendarWeekdayOfDate(firstDayIndex, date) === targetDayIndex) {
      count++;
    }
  }

  return count;
}

function calendarCountSelectedWeekdays(firstDayIndex, numberOfDays, selectedDays) {
  let count = 0;

  for (let date = 1; date <= numberOfDays; date++) {
    if (selectedDays.includes(calendarWeekdayOfDate(firstDayIndex, date))) {
      count++;
    }
  }

  return count;
}

function calendarNthWeekdayDate(firstDayIndex, targetDayIndex, occurrence) {
  const firstOccurrence = 1 + calendarMod(targetDayIndex - firstDayIndex, 7);
  return firstOccurrence + 7 * (occurrence - 1);
}

function calendarLastWeekdayDate(firstDayIndex, numberOfDays, targetDayIndex) {
  const finalDayIndex = calendarWeekdayOfDate(firstDayIndex, numberOfDays);
  return numberOfDays - calendarMod(finalDayIndex - targetDayIndex, 7);
}

function calendarMonthSequence(startMonthIndex, count, leapYear = false) {
  const normalLengths = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const result = [];

  for (let offset = 0; offset < count; offset++) {
    const monthIndex = calendarMod(startMonthIndex + offset, 12);
    result.push({
      monthIndex,
      name: CALENDAR_MONTH_NAMES[monthIndex],
      length: normalLengths[monthIndex]
    });
  }

  return result;
}

function calendarDayList(dayIndexes) {
  return dayIndexes.map(calendarDayName).join(', ');
}

function psGenCalendarDayWeek() {
  const s = chooseProblemStructure();
  const type = randInt(1, 8);

  // 1. Forward and backward weekday shifts
  if (type === 1) {
    if (s === 'basic') {
      const startDay = randInt(0, 6);
      const shift = randInt(2, 20);
      const forward = chance(0.65);
      const answerDay = calendarMod(startDay + (forward ? shift : -shift), 7);

      return psQ(
        'calendarDayWeek',
        s,
        `Today is ${calendarDayName(startDay)}. What day of the week will it be ${shift} days ${forward ? 'later' : 'earlier'}? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
        calendarDayCode(answerDay),
        `Move ${shift} days ${forward ? 'forward' : 'backward'} through a 7-day cycle, then enter the weekday code.`
      );
    }

    if (s === 'multi') {
      const startDay = randInt(0, 6);
      const interval = randInt(3, 12);
      const occurrence = randInt(4, 10);
      const offset = interval * (occurrence - 1);
      const answerDay = calendarMod(startDay + offset, 7);

      return psQ(
        'calendarDayWeek',
        s,
        `A club meets on ${calendarDayName(startDay)} and then meets every ${interval} days. The first meeting is counted as meeting 1. On which day of the week will meeting ${occurrence} occur? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
        calendarDayCode(answerDay),
        `There are ${occurrence - 1} intervals after the first meeting. Find the total number of days moved, then use the 7-day cycle.`
      );
    }

    const startDay = randInt(0, 6);
    const intervalA = randInt(3, 9);
    const intervalB = randInt(4, 11);
    const jointInterval = lcm(intervalA, intervalB);
    const answerDay = calendarMod(startDay + jointInterval, 7);

    return psQ(
      'calendarDayWeek',
      s,
      `Two teams both train on ${calendarDayName(startDay)}. Team A then trains every ${intervalA} days and Team B every ${intervalB} days. On which day of the week will they next train on the same day? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
      calendarDayCode(answerDay),
      'Find the least common multiple of the two training intervals, then move that many days through the weekly cycle.'
    );
  }

  // 2. Weekday of a stated date, including reverse problems
  if (type === 2) {
    if (s === 'basic') {
      const firstDay = randInt(0, 6);
      const monthLength = pick([28, 29, 30, 31]);
      const dateNumber = randInt(2, monthLength);
      const answerDay = calendarWeekdayOfDate(firstDay, dateNumber);

      return psQ(
        'calendarDayWeek',
        s,
        `A ${monthLength}-day month begins on ${calendarDayName(firstDay)}. What day of the week is the ${dateNumber}${calendarOrdinalSuffix(dateNumber)}? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
        calendarDayCode(answerDay),
        `The ${dateNumber}${calendarOrdinalSuffix(dateNumber)} is ${dateNumber - 1} days after the first day of the month.`
      );
    }

    if (s === 'multi') {
      const firstDay = randInt(0, 6);
      const firstLength = pick([28, 29, 30, 31]);
      const secondLength = pick([30, 31]);
      const targetDate = randInt(2, secondLength);
      const answerDay = calendarMod(firstDay + firstLength + targetDate - 1, 7);

      return psQ(
        'calendarDayWeek',
        s,
        `Two consecutive months have ${firstLength} days and ${secondLength} days. The first month begins on ${calendarDayName(firstDay)}. What day of the week is the ${targetDate}${calendarOrdinalSuffix(targetDate)} of the second month? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
        calendarDayCode(answerDay),
        'Move through the whole first month, then move to the required date in the second month.'
      );
    }

    const monthLength = pick([28, 29, 30, 31]);
    const firstDay = randInt(0, 6);
    const knownDate = randInt(8, monthLength);
    const knownDay = calendarWeekdayOfDate(firstDay, knownDate);

    return psQ(
      'calendarDayWeek',
      s,
      `In a ${monthLength}-day month, the ${knownDate}${calendarOrdinalSuffix(knownDate)} is ${calendarDayName(knownDay)}. On which day of the week did the month begin? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
      calendarDayCode(firstDay),
      `Work backwards ${knownDate - 1} days from ${calendarDayName(knownDay)} to find the first day of the month.`
    );
  }

  // 3. Counting particular weekdays in one or more months
  if (type === 3) {
    if (s === 'basic') {
      const firstDay = randInt(0, 6);
      const monthLength = pick([28, 29, 30, 31]);
      const targetDay = randInt(0, 6);
      const answer = calendarCountWeekday(firstDay, monthLength, targetDay);

      return psQ(
        'calendarDayWeek',
        s,
        `A ${monthLength}-day month begins on ${calendarDayName(firstDay)}. How many ${calendarDayName(targetDay)}s are in the month?`,
        answer,
        'Mark the dates that fall on the target weekday, or use complete weeks and the extra days.'
      );
    }

    if (s === 'multi') {
      const firstDay = randInt(0, 6);
      const firstLength = pick([28, 29, 30, 31]);
      const secondLength = pick([30, 31]);
      const targetDay = randInt(0, 6);
      const secondFirstDay = calendarMod(firstDay + firstLength, 7);
      const answer =
        calendarCountWeekday(firstDay, firstLength, targetDay)
        + calendarCountWeekday(secondFirstDay, secondLength, targetDay);

      return psQ(
        'calendarDayWeek',
        s,
        `Two consecutive months have ${firstLength} days and ${secondLength} days. The first month begins on ${calendarDayName(firstDay)}. How many ${calendarDayName(targetDay)}s occur across the two months altogether?`,
        answer,
        'Count the target weekday in the first month, determine the starting weekday of the second month, then count again.'
      );
    }

    const monthLength = pick([29, 30, 31]);
    const firstDay = randInt(0, 6);
    const extraDayCount = monthLength - 28;
    const fiveOccurrenceDays = [];

    for (let offset = 0; offset < extraDayCount; offset++) {
      fiveOccurrenceDays.push(calendarMod(firstDay + offset, 7));
    }

    return psQ(
      'calendarDayWeek',
      s,
      `A ${monthLength}-day month has five occurrences of each of these weekdays: ${calendarDayList(fiveOccurrenceDays)}. On which day of the week does the month begin? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
      calendarDayCode(firstDay),
      `A ${monthLength}-day month contains four complete weeks and ${extraDayCount} extra day${extraDayCount === 1 ? '' : 's'}. The extra weekdays begin with the first day of the month.`
    );
  }

  // 4. First, nth and last occurrences of a weekday
  if (type === 4) {
    if (s === 'basic') {
      const firstDay = randInt(0, 6);
      const targetDay = randInt(0, 6);
      const firstDate = calendarNthWeekdayDate(firstDay, targetDay, 1);

      return psQ(
        'calendarDayWeek',
        s,
        `A month begins on ${calendarDayName(firstDay)}. What is the date of the first ${calendarDayName(targetDay)} in the month?`,
        firstDate,
        'Move forward from the first day of the month until the target weekday is reached.'
      );
    }

    if (s === 'multi') {
      const firstDay = randInt(0, 6);
      const monthLength = pick([30, 31]);
      const targetDay = randInt(0, 6);
      const occurrence = randInt(2, 4);
      const date = calendarNthWeekdayDate(firstDay, targetDay, occurrence);

      if (date > monthLength) return psGenCalendarDayWeek();

      return psQ(
        'calendarDayWeek',
        s,
        `A ${monthLength}-day month begins on ${calendarDayName(firstDay)}. On what date does the ${occurrence}${calendarOrdinalSuffix(occurrence)} ${calendarDayName(targetDay)} occur?`,
        date,
        'Find the date of the first target weekday, then add 7 days for each later occurrence.'
      );
    }

    const firstDay = randInt(0, 6);
    const monthLength = pick([30, 31]);
    const knownDay = randInt(0, 6);
    const knownOccurrence = randInt(2, 3);
    const knownDate = calendarNthWeekdayDate(firstDay, knownDay, knownOccurrence);
    const targetDay = randInt(0, 6);
    const targetOccurrence = randInt(3, 4);
    const targetDate = calendarNthWeekdayDate(firstDay, targetDay, targetOccurrence);

    if (
      knownDate > monthLength
      || targetDate > monthLength
      || (knownDay === targetDay && knownOccurrence === targetOccurrence)
    ) {
      return psGenCalendarDayWeek();
    }

    return psQ(
      'calendarDayWeek',
      s,
      `In a ${monthLength}-day month, the ${knownOccurrence}${calendarOrdinalSuffix(knownOccurrence)} ${calendarDayName(knownDay)} falls on the ${knownDate}${calendarOrdinalSuffix(knownDate)}. On what date does the ${targetOccurrence}${calendarOrdinalSuffix(targetOccurrence)} ${calendarDayName(targetDay)} fall?`,
      targetDate,
      'Use the known weekday occurrence to reconstruct the weekly pattern, then locate the required weekday occurrence.'
    );
  }

  // 5. Work, school and activity schedules
  if (type === 5) {
    if (s === 'basic') {
      const firstDay = randInt(0, 6);
      const monthLength = pick([28, 29, 30, 31]);
      const startWorkDay = randInt(0, 4);
      const workDays = [startWorkDay, calendarMod(startWorkDay + 1, 7)];
      const answer = calendarCountSelectedWeekdays(firstDay, monthLength, workDays);

      return psQ(
        'calendarDayWeek',
        s,
        `A ${monthLength}-day month begins on ${calendarDayName(firstDay)}. A student works every ${calendarDayName(workDays[0])} and ${calendarDayName(workDays[1])}. How many days does the student work during the month?`,
        answer,
        'Count each of the two workdays in the month, then add the counts.'
      );
    }

    if (s === 'multi') {
      const firstDay = randInt(0, 6);
      const startMonthIndex = randInt(0, 9);
      const months = calendarMonthSequence(startMonthIndex, 3, false);
      const workDays = [2, 3, 4]; // Wednesday to Friday
      let runningFirstDay = firstDay;
      let answer = 0;

      months.forEach(month => {
        answer += calendarCountSelectedWeekdays(runningFirstDay, month.length, workDays);
        runningFirstDay = calendarMod(runningFirstDay + month.length, 7);
      });

      return psQ(
        'calendarDayWeek',
        s,
        `${months[0].name} begins on ${calendarDayName(firstDay)} in a non-leap year. A student works every Wednesday, Thursday and Friday during ${months.map(month => month.name).join(', ')}. How many days does the student work altogether?`,
        answer,
        'Count the workdays in each month, carrying the weekday pattern forward from one month to the next.'
      );
    }

    const firstDay = randInt(0, 6);
    const firstLength = pick([30, 31]);
    const secondLength = pick([30, 31]);
    const secondFirstDay = calendarMod(firstDay + firstLength, 7);
    const scheduleA = [0, 2, 4]; // Mon, Wed, Fri
    const scheduleB = [1, 3, 5]; // Tue, Thu, Sat
    const aCount =
      calendarCountSelectedWeekdays(firstDay, firstLength, scheduleA)
      + calendarCountSelectedWeekdays(secondFirstDay, secondLength, scheduleA);
    const bCount =
      calendarCountSelectedWeekdays(firstDay, firstLength, scheduleB)
      + calendarCountSelectedWeekdays(secondFirstDay, secondLength, scheduleB);

    if (aCount === bCount) return psGenCalendarDayWeek();

    return psQ(
      'calendarDayWeek',
      s,
      `Two consecutive months have ${firstLength} and ${secondLength} days, and the first month begins on ${calendarDayName(firstDay)}. Worker A works every Monday, Wednesday and Friday. Worker B works every Tuesday, Thursday and Saturday. How many more days does the worker with the larger total work across the two months?`,
      Math.abs(aCount - bCount),
      'Count each worker’s scheduled days across both months, then compare the totals.'
    );
  }

  // 6. Repeating events and common cycles
  if (type === 6) {
    if (s === 'basic') {
      const interval = randInt(3, 10);
      const span = randInt(35, 90);
      const answer = Math.floor((span - 1) / interval) + 1;

      return psQ(
        'calendarDayWeek',
        s,
        `A maintenance check is completed on day 1 and then every ${interval} days. How many checks are completed during the first ${span} days, including the check on day 1?`,
        answer,
        'Count day 1, then count how many complete intervals fit within the remaining days.'
      );
    }

    if (s === 'multi') {
      const intervalA = randInt(3, 9);
      const intervalB = randInt(4, 12);
      const nextJointDay = lcm(intervalA, intervalB) + 1;

      return psQ(
        'calendarDayWeek',
        s,
        `Two services are both carried out on day 1. Service A repeats every ${intervalA} days and Service B every ${intervalB} days. On which numbered day will both services next occur together?`,
        nextJointDay,
        'Find the least common multiple of the two intervals, then count forward from day 1.'
      );
    }

    const intervalA = randInt(3, 9);
    const intervalB = randInt(4, 12);
    const commonInterval = lcm(intervalA, intervalB);
    const span = commonInterval * randInt(3, 7) + randInt(0, commonInterval - 1) + 1;
    const answer = Math.floor((span - 1) / commonInterval) + 1;

    return psQ(
      'calendarDayWeek',
      s,
      `Two inspections are both completed on day 1. One repeats every ${intervalA} days and the other every ${intervalB} days. During the first ${span} days, how many days include both inspections, including day 1?`,
      answer,
      'Find how often the two cycles coincide, then count how many common-cycle dates fall within the stated period.'
    );
  }

  // 7. February, leap years and movement between months
  if (type === 7) {
    if (s === 'basic') {
      const firstDay = randInt(0, 6);
      const leapYear = chance(0.5);
      const februaryLength = leapYear ? 29 : 28;
      const marchFirstDay = calendarMod(firstDay + februaryLength, 7);

      return psQ(
        'calendarDayWeek',
        s,
        `February begins on ${calendarDayName(firstDay)} in a ${leapYear ? 'leap' : 'non-leap'} year. On which day of the week does 1 March fall? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
        calendarDayCode(marchFirstDay),
        `Move forward through all ${februaryLength} days of February.`
      );
    }

    if (s === 'multi') {
      const januaryFirstDay = randInt(0, 6);
      const leapYear = chance(0.5);
      const februaryLength = leapYear ? 29 : 28;
      const marchDate = randInt(2, 20);
      const answerDay = calendarMod(januaryFirstDay + 31 + februaryLength + marchDate - 1, 7);

      return psQ(
        'calendarDayWeek',
        s,
        `1 January is ${calendarDayName(januaryFirstDay)} in a ${leapYear ? 'leap' : 'non-leap'} year. What day of the week is ${marchDate} March? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
        calendarDayCode(answerDay),
        'Move through January and February, then move to the required date in March.'
      );
    }

    const firstYearDay = randInt(0, 6);
    const leapYear = chance(0.5);
    const yearLength = leapYear ? 366 : 365;
    const nextYearDay = calendarMod(firstYearDay + yearLength, 7);

    return psQ(
      'calendarDayWeek',
      s,
      `A year begins on ${calendarDayName(firstYearDay)} and is a ${leapYear ? 'leap' : 'non-leap'} year. On which day of the week will the next year begin? Use Monday = 1, Tuesday = 2, ..., Sunday = 7.`,
      calendarDayCode(nextYearDay),
      `A ${leapYear ? 'leap' : 'non-leap'} year has ${yearLength} days. Find the remainder when ${yearLength} is divided by 7.`
    );
  }

  // 8. Calendar constraints, exclusions and reverse scheduling
  if (s === 'basic') {
    const firstDay = randInt(0, 6);
    const monthLength = pick([30, 31]);
    const targetDay = randInt(0, 6);
    const lastDate = calendarLastWeekdayDate(firstDay, monthLength, targetDay);

    return psQ(
      'calendarDayWeek',
      s,
      `A ${monthLength}-day month begins on ${calendarDayName(firstDay)}. What is the date of the final ${calendarDayName(targetDay)} in the month?`,
      lastDate,
      'Find the weekday of the final date, then count backwards to the required weekday.'
    );
  }

  if (s === 'multi') {
    const firstDay = randInt(0, 6);
    const monthLength = pick([30, 31]);
    const classDays = [0, 2, 4];
    const classDates = [];

    for (let date = 1; date <= monthLength; date++) {
      if (classDays.includes(calendarWeekdayOfDate(firstDay, date))) {
        classDates.push(date);
      }
    }

    const cancelledCount = randInt(1, Math.min(3, classDates.length - 1));
    const cancelledDates = [...classDates]
      .sort(() => Math.random() - 0.5)
      .slice(0, cancelledCount)
      .sort((a, b) => a - b);
    const answer = classDates.length - cancelledCount;

    return psQ(
      'calendarDayWeek',
      s,
      `A ${monthLength}-day month begins on ${calendarDayName(firstDay)}. A class is normally held every Monday, Wednesday and Friday. Classes on dates ${cancelledDates.join(', ')} are cancelled. How many classes are held during the month?`,
      answer,
      'Count all scheduled weekdays in the month, then subtract the cancelled classes.'
    );
  }

  const firstDay = randInt(0, 6);
  const monthLength = pick([30, 31]);
  const scheduleA = [0, 3]; // Monday, Thursday
  const scheduleB = [1, 4]; // Tuesday, Friday
  const aTotal = calendarCountSelectedWeekdays(firstDay, monthLength, scheduleA);
  const bTotal = calendarCountSelectedWeekdays(firstDay, monthLength, scheduleB);
  const aCancelled = randInt(0, Math.min(2, aTotal - 1));
  const bCancelled = randInt(0, Math.min(2, bTotal - 1));
  const aHeld = aTotal - aCancelled;
  const bHeld = bTotal - bCancelled;

  if (aHeld === bHeld) return psGenCalendarDayWeek();

  return psQ(
    'calendarDayWeek',
    s,
    `A ${monthLength}-day month begins on ${calendarDayName(firstDay)}. Programme A is scheduled every Monday and Thursday, but ${aCancelled} session${aCancelled === 1 ? ' is' : 's are'} cancelled. Programme B is scheduled every Tuesday and Friday, but ${bCancelled} session${bCancelled === 1 ? ' is' : 's are'} cancelled. How many more sessions are held by the programme with the larger final total?`,
    Math.abs(aHeld - bHeld),
    'Count the scheduled sessions for each programme, apply the cancellations, then compare the final totals.'
  );
}
