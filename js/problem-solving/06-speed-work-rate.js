'use strict';

/* Speed-distance-time and work-rate problem banks.
   Split from DYAAPS.html without changing the original logic. */

function psGenSpeedDistanceTime() {
  const s = chooseProblemStructure();
  const topic = randInt(1, 9);
  const hoursText = value => `${value} ${Number(value) === 1 ? 'hour' : 'hours'}`;

  // 1. Basic distance-speed-time formula: d = st, s = d/t, t = d/s
  if (topic === 1) {
    if (s === 'basic') {
      const speed = pick([40, 50, 60, 70, 80, 90]);
      const time = pick([1, 1.5, 2, 2.5, 3]);
      const distance = speed * time;
      const ask = randInt(1, 3);

      if (ask === 1) {
        return psQ(
          'speedDistanceTime',
          s,
          `A vehicle travels at a constant speed of ${speed} km/h for ${hoursText(time)}. Calculate the distance travelled in kilometres.`,
          distance,
          'Distance = speed × time.'
        );
      }

      if (ask === 2) {
        return psQ(
          'speedDistanceTime',
          s,
          `A vehicle travels ${distance} km in ${hoursText(time)} at a constant speed. Calculate its speed in km/h.`,
          speed,
          'Speed = distance ÷ time.'
        );
      }

      return psQ(
        'speedDistanceTime',
        s,
        `A vehicle travels ${distance} km at a constant speed of ${speed} km/h. Calculate the travel time in hours.`,
        time,
        'Time = distance ÷ speed.'
      );
    }

    if (s === 'multi') {
      const speed = pick([40, 48, 60, 72, 80, 90, 96]);
      const minutes = pick([30, 45, 90, 120, 150]);
      const distance = speed * minutes / 60;

      if (!Number.isInteger(distance) && distance * 2 !== Math.round(distance * 2)) {
        return psGenSpeedDistanceTime();
      }

      return psQ(
        'speedDistanceTime',
        s,
        `A vehicle travels at ${speed} km/h for ${minutes} minutes. Calculate the distance travelled in kilometres.`,
        distance,
        'Convert minutes to hours, then use distance = speed × time.'
      );
    }

    const speed = pick([48, 60, 72, 80, 90, 96]);
    const travelMinutes = pick([75, 90, 105, 120, 135, 150]);
    const stopMinutes = pick([10, 15, 20, 30]);
    const distance = speed * travelMinutes / 60;

    if (!Number.isInteger(distance) && distance * 2 !== Math.round(distance * 2)) {
      return psGenSpeedDistanceTime();
    }

    return psQ(
      'speedDistanceTime',
      s,
      `A coach covers ${distance} km at a constant moving speed of ${speed} km/h. During the journey it stops for ${stopMinutes} minutes. How many minutes pass from departure until arrival?`,
      travelMinutes + stopMinutes,
      'First calculate the moving time using time = distance ÷ speed, then include the stop.'
    );
  }

  // 2. Average speed
  if (topic === 2) {
    if (s === 'basic') {
      const time = pick([2, 3, 4, 5]);
      const average = pick([40, 50, 60, 70, 80]);
      const distance = time * average;

      return psQ(
        'speedDistanceTime',
        s,
        `A cyclist travels a total of ${distance} km in ${hoursText(time)}. Calculate the average speed in km/h.`,
        average,
        'Average speed = total distance ÷ total time.'
      );
    }

    if (s === 'multi') {
      const speed1 = pick([40, 50, 60, 70]);
      const time1 = pick([1, 2, 3]);
      const speed2 = pick([60, 70, 80, 90]);
      const time2 = pick([1, 2, 3]);
      const totalDistance = speed1 * time1 + speed2 * time2;
      const totalTime = time1 + time2;
      const average = totalDistance / totalTime;

      if (!Number.isInteger(average) && average * 2 !== Math.round(average * 2)) {
        return psGenSpeedDistanceTime();
      }

      return psQ(
        'speedDistanceTime',
        s,
        `A driver travels at ${speed1} km/h for ${hoursText(time1)} and at ${speed2} km/h for ${hoursText(time2)}. Calculate the average speed for the whole journey in km/h.`,
        average,
        'Add the two distances and divide by the total travel time. Do not simply average the two speeds.'
      );
    }

    const scenarios = [
      { d1: 120, s1: 60, d2: 120, s2: 80, stop: 30, answer: 60 },
      { d1: 90, s1: 45, d2: 180, s2: 90, stop: 30, answer: 60 },
      { d1: 150, s1: 75, d2: 150, s2: 100, stop: 15, answer: 80 }
    ];
    const item = pick(scenarios);

    return psQ(
      'speedDistanceTime',
      s,
      `A vehicle travels ${item.d1} km at ${item.s1} km/h, stops for ${item.stop} minutes, and then travels ${item.d2} km at ${item.s2} km/h. Calculate the average speed for the entire elapsed journey in km/h.`,
      item.answer,
      'Average speed uses total distance divided by total elapsed time, including the stop.'
    );
  }

  // 3. Journeys completed in stages
  if (topic === 3) {
    if (s === 'basic') {
      const speed1 = pick([30, 40, 50, 60]);
      const time1 = pick([1, 1.5, 2]);
      const speed2 = pick([50, 60, 70, 80]);
      const time2 = pick([1, 1.5, 2]);

      return psQ(
        'speedDistanceTime',
        s,
        `A driver travels at ${speed1} km/h for ${hoursText(time1)} and then at ${speed2} km/h for ${hoursText(time2)}. Calculate the total distance travelled in kilometres.`,
        speed1 * time1 + speed2 * time2,
        'Calculate the distance of each stage, then add the distances.'
      );
    }

    if (s === 'multi') {
      const total = pick([240, 300, 360, 420]);
      const speed1 = pick([40, 50, 60]);
      const time1 = pick([1, 2, 3]);
      const speed2 = pick([60, 70, 80, 90]);
      const time2 = pick([1, 2]);
      const travelled = speed1 * time1 + speed2 * time2;

      if (travelled >= total) return psGenSpeedDistanceTime();

      return psQ(
        'speedDistanceTime',
        s,
        `A journey is ${total} km long. A driver travels at ${speed1} km/h for ${hoursText(time1)} and then at ${speed2} km/h for ${hoursText(time2)}. How many kilometres remain?`,
        total - travelled,
        'Find the distance covered in each stage, add them, then subtract from the total journey.'
      );
    }

    const firstSpeed = pick([40, 50, 60]);
    const firstTime = pick([1, 2]);
    const secondSpeed = pick([60, 70, 80]);
    const secondTime = pick([1, 2]);
    const finalTime = pick([1, 1.5, 2]);
    const requiredSpeed = pick([70, 80, 90, 100]);
    const totalDistance = firstSpeed * firstTime + secondSpeed * secondTime + requiredSpeed * finalTime;

    return psQ(
      'speedDistanceTime',
      s,
      `A journey is ${totalDistance} km long. A driver travels at ${firstSpeed} km/h for ${hoursText(firstTime)} and then at ${secondSpeed} km/h for ${hoursText(secondTime)}. The driver must finish the remaining distance in ${hoursText(finalTime)}. What speed is required for the final stage in km/h?`,
      requiredSpeed,
      'Find the remaining distance, then divide it by the available final-stage time.'
    );
  }

  // 4. Outward and return journeys
  if (topic === 4) {
    if (s === 'basic') {
      const oneWay = pick([60, 80, 100, 120, 150]);
      const speed = pick([40, 50, 60, 75]);
      const totalTime = 2 * oneWay / speed;

      if (!Number.isInteger(totalTime) && totalTime * 2 !== Math.round(totalTime * 2)) {
        return psGenSpeedDistanceTime();
      }

      return psQ(
        'speedDistanceTime',
        s,
        `A car travels ${oneWay} km to a town and returns along the same route at ${speed} km/h in both directions. Calculate the total driving time in hours.`,
        totalTime,
        'The total distance is twice the one-way distance. Divide by the speed.'
      );
    }

    if (s === 'multi') {
      const pairs = [
        [40, 60, 48],
        [50, 75, 60],
        [60, 90, 72],
        [60, 120, 80],
        [80, 120, 96]
      ];
      const [outward, returnSpeed, average] = pick(pairs);
      const oneWay = pick([120, 180, 240, 300]);

      return psQ(
        'speedDistanceTime',
        s,
        `A vehicle travels ${oneWay} km outward at ${outward} km/h and returns over the same distance at ${returnSpeed} km/h. Calculate the average speed for the complete journey in km/h.`,
        average,
        'Use total distance divided by total time. The two equal distances do not make the answer the arithmetic mean of the speeds.'
      );
    }

    const scenarios = [
      { oneWay: 120, outward: 60, average: 72, returnSpeed: 90 },
      { oneWay: 150, outward: 50, average: 60, returnSpeed: 75 },
      { oneWay: 180, outward: 60, average: 80, returnSpeed: 120 },
      { oneWay: 240, outward: 80, average: 96, returnSpeed: 120 }
    ];
    const item = pick(scenarios);

    return psQ(
      'speedDistanceTime',
      s,
      `A vehicle travels ${item.oneWay} km to a destination at ${item.outward} km/h. Its average speed for the complete outward-and-return journey is ${item.average} km/h. What was its speed on the return journey?`,
      item.returnSpeed,
      'Use the average speed to find the total journey time, subtract the outward time, then find the return speed.'
    );
  }

  // 5. Meeting problems
  if (topic === 5) {
    if (s === 'basic') {
      const speed1 = pick([40, 50, 60]);
      const speed2 = pick([50, 60, 70, 80]);
      const meetingTime = pick([1, 2, 3]);
      const separation = (speed1 + speed2) * meetingTime;

      return psQ(
        'speedDistanceTime',
        s,
        `Two vehicles start at the same time from places ${separation} km apart and travel towards each other at ${speed1} km/h and ${speed2} km/h. After how many hours will they meet?`,
        meetingTime,
        'For vehicles moving towards each other, add their speeds.'
      );
    }

    if (s === 'multi') {
      const speed1 = pick([40, 50, 60]);
      const speed2 = pick([50, 60, 70]);
      const meetingTime = pick([1, 2, 3]);
      const separation = (speed1 + speed2) * meetingTime;

      return psQ(
        'speedDistanceTime',
        s,
        `Two towns are ${separation} km apart. A car leaves the first town at ${speed1} km/h while another car leaves the second town at ${speed2} km/h at the same time. How far from the first town will they meet?`,
        speed1 * meetingTime,
        'First find the meeting time using the combined speed, then find the first car’s distance.'
      );
    }

    const speed1 = pick([40, 50, 60]);
    const speed2 = pick([60, 70, 80]);
    const earlyHours = pick([1, 1.5, 2]);
    const afterSecondStarts = pick([1, 2, 3]);
    const separation = speed1 * earlyHours + (speed1 + speed2) * afterSecondStarts;

    return psQ(
      'speedDistanceTime',
      s,
      `Two towns are ${separation} km apart. A car leaves the first town at ${speed1} km/h. ${hoursText(earlyHours)} later, another car leaves the second town at ${speed2} km/h and travels towards the first car. How many hours after the second car starts will they meet?`,
      afterSecondStarts,
      'Subtract the distance already covered by the first car, then divide the remaining separation by the combined speed.'
    );
  }

  // 6. Catch-up problems
  if (topic === 6) {
    if (s === 'basic') {
      const slow = pick([40, 50, 60]);
      const fast = slow + pick([10, 20, 30]);
      const catchTime = pick([1, 2, 3]);
      const headStart = (fast - slow) * catchTime;

      return psQ(
        'speedDistanceTime',
        s,
        `Vehicle A is ${headStart} km ahead and continues at ${slow} km/h. Vehicle B follows the same route at ${fast} km/h. How many hours will Vehicle B take to catch Vehicle A?`,
        catchTime,
        'Catch-up time = head-start distance ÷ relative speed.'
      );
    }

    if (s === 'multi') {
      const slow = pick([40, 50, 60]);
      const headStartHours = pick([0.5, 1, 1.5, 2]);
      const fast = slow + pick([20, 30, 40]);
      const headStartDistance = slow * headStartHours;
      const catchTime = headStartDistance / (fast - slow);

      if (!Number.isInteger(catchTime) && catchTime * 2 !== Math.round(catchTime * 2)) {
        return psGenSpeedDistanceTime();
      }

      return psQ(
        'speedDistanceTime',
        s,
        `A van travels at ${slow} km/h. After it has travelled for ${hoursText(headStartHours)}, a car leaves the same point at ${fast} km/h along the same route. How many hours after the car starts will it catch the van?`,
        catchTime,
        'Find the van’s head-start distance, then divide by the difference in speeds.'
      );
    }

    const slow = pick([40, 50, 60]);
    const fast = slow + pick([20, 30, 40]);
    const headStartMinutes = pick([30, 60, 90]);
    const headStartDistance = slow * headStartMinutes / 60;
    const catchMinutes = headStartDistance / (fast - slow) * 60;

    if (!Number.isInteger(catchMinutes)) return psGenSpeedDistanceTime();

    const startHour = pick([7, 8, 9, 13, 14]);
    const startMinute = pick([0, 15, 30]);
    const totalMinutes = startHour * 60 + startMinute + catchMinutes;

    return psQTime(
      'speedDistanceTime',
      s,
      `A bus travels at ${slow} km/h. A car starts from the same point ${headStartMinutes} minutes later at ${fast} km/h. The car starts at ${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}. At what time will the car catch the bus? Enter the answer as HHMM; a colon is also accepted.`,
      Math.floor(totalMinutes / 60) % 24,
      totalMinutes % 60,
      'Find the bus’s head-start distance and the catch-up time, then add that time to the car’s departure time.'
    );
  }

  // 7. Arriving early or late
  if (topic === 7) {
    if (s === 'basic') {
      const scenarios = [
        { distance: 120, planned: 60, actual: 80, minutes: 30, word: 'early' },
        { distance: 180, planned: 60, actual: 90, minutes: 60, word: 'early' },
        { distance: 120, planned: 80, actual: 60, minutes: 30, word: 'late' },
        { distance: 150, planned: 75, actual: 60, minutes: 30, word: 'late' }
      ];
      const item = pick(scenarios);

      return psQ(
        'speedDistanceTime',
        s,
        `A ${item.distance} km journey was planned at ${item.planned} km/h, but the actual speed was ${item.actual} km/h. How many minutes ${item.word} was the arrival?`,
        item.minutes,
        'Compare the planned travel time with the actual travel time, then convert the difference to minutes.'
      );
    }

    if (s === 'multi') {
      const scenarios = [
        { distance: 120, planned: 60, stop: 20, actual: 80, answer: 10, word: 'early' },
        { distance: 180, planned: 60, stop: 30, actual: 90, answer: 30, word: 'early' },
        { distance: 120, planned: 80, stop: 15, actual: 60, answer: 45, word: 'late' },
        { distance: 150, planned: 75, stop: 20, actual: 60, answer: 50, word: 'late' }
      ];
      const item = pick(scenarios);

      return psQ(
        'speedDistanceTime',
        s,
        `A ${item.distance} km journey was scheduled using a speed of ${item.planned} km/h. The driver actually travelled at ${item.actual} km/h and also stopped for ${item.stop} minutes. How many minutes ${item.word} was the arrival compared with the schedule?`,
        item.answer,
        'Calculate the scheduled time and the actual elapsed time, including the stop, then compare them.'
      );
    }

    const scenarios = [
      { slow: 60, slowLate: 20, fast: 80, fastEarly: 10, distance: 120 },
      { slow: 60, slowLate: 30, fast: 90, fastEarly: 30, distance: 180 },
      { slow: 50, slowLate: 30, fast: 75, fastEarly: 30, distance: 150 },
      { slow: 80, slowLate: 30, fast: 120, fastEarly: 30, distance: 240 }
    ];
    const item = pick(scenarios);

    return psQ(
      'speedDistanceTime',
      s,
      `For the same journey, travelling at ${item.slow} km/h would make a driver ${item.slowLate} minutes late, while travelling at ${item.fast} km/h would make the driver ${item.fastEarly} minutes early. Calculate the journey distance in kilometres.`,
      item.distance,
      'The difference between the two travel times equals the total early-and-late time. Use this to find the distance.'
    );
  }

  // 8. Timetables and clock times
  if (topic === 8) {
    if (s === 'basic') {
      const startHour = pick([7, 8, 9, 10, 13, 14, 15]);
      const startMinute = pick([0, 10, 15, 20, 30, 40, 45]);
      const duration = pick([35, 45, 50, 65, 75, 85, 95]);
      const arrival = startHour * 60 + startMinute + duration;

      return psQTime(
        'speedDistanceTime',
        s,
        `A train departs at ${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')} and the journey takes ${duration} minutes. What is the arrival time? Enter the answer as HHMM; a colon is also accepted.`,
        Math.floor(arrival / 60) % 24,
        arrival % 60,
        'Add the journey duration to the departure time and regroup every 60 minutes as one hour.'
      );
    }

    if (s === 'multi') {
      const startHour = pick([6, 7, 8, 9, 12, 13]);
      const startMinute = pick([0, 10, 15, 20, 30, 40]);
      const leg1 = pick([35, 45, 50, 60, 70]);
      const wait = pick([10, 15, 20, 30]);
      const leg2 = pick([40, 50, 60, 75, 90]);
      const arrival = startHour * 60 + startMinute + leg1 + wait + leg2;

      return psQTime(
        'speedDistanceTime',
        s,
        `A passenger leaves at ${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}, travels for ${leg1} minutes, waits ${wait} minutes for a connection, and then travels for another ${leg2} minutes. What is the final arrival time? Enter the answer as HHMM; a colon is also accepted.`,
        Math.floor(arrival / 60) % 24,
        arrival % 60,
        'Add both travel times and the waiting time to the departure time.'
      );
    }

    const scheduledHour = pick([8, 9, 10, 13, 14, 15]);
    const scheduledMinute = pick([0, 15, 30, 45]);
    const delay = pick([10, 15, 20, 30]);
    const travel = pick([75, 90, 105, 120, 135]);
    const stop = pick([10, 15, 20]);
    const arrival = scheduledHour * 60 + scheduledMinute + delay + travel + stop;

    return psQTime(
      'speedDistanceTime',
      s,
      `A coach is scheduled to leave at ${String(scheduledHour).padStart(2, '0')}:${String(scheduledMinute).padStart(2, '0')}, but departs ${delay} minutes late. The driving time is ${travel} minutes and there is a ${stop}-minute stop. What is the actual arrival time? Enter the answer as HHMM; a colon is also accepted.`,
      Math.floor(arrival / 60) % 24,
      arrival % 60,
      'Begin with the delayed departure time, then add the driving time and the stop.'
    );
  }

  // 9. Converting between distance, speed and time units
  if (s === 'basic') {
    if (chance(0.5)) {
      const kmh = pick([36, 54, 72, 90, 108]);
      return psQ(
        'speedDistanceTime',
        s,
        `Convert ${kmh} km/h to metres per second.`,
        kmh / 3.6,
        'To convert km/h to m/s, divide by 3.6.'
      );
    }

    const ms = pick([5, 10, 15, 20, 25, 30]);
    return psQ(
      'speedDistanceTime',
      s,
      `Convert ${ms} metres per second to km/h.`,
      ms * 3.6,
      'To convert m/s to km/h, multiply by 3.6.'
    );
  }

  if (s === 'multi') {
    const speed = pick([10, 15, 20, 25]);
    const minutes = pick([4, 6, 8, 10, 12]);
    const distanceKm = speed * minutes * 60 / 1000;

    if (!Number.isInteger(distanceKm) && distanceKm * 10 !== Math.round(distanceKm * 10)) {
      return psGenSpeedDistanceTime();
    }

    return psQ(
      'speedDistanceTime',
      s,
      `A runner moves at ${speed} m/s for ${minutes} minutes. Calculate the distance travelled in kilometres.`,
      distanceKm,
      'Convert minutes to seconds, calculate the distance in metres, then convert metres to kilometres.'
    );
  }

  const scenarios = [
    { distanceM: 3000, speedMS: 5, minutes: 10 },
    { distanceM: 6000, speedMS: 10, minutes: 10 },
    { distanceM: 7200, speedMS: 20, minutes: 6 },
    { distanceM: 9000, speedMS: 25, minutes: 6 },
    { distanceM: 10800, speedMS: 30, minutes: 6 }
  ];
  const item = pick(scenarios);

  return psQ(
    'speedDistanceTime',
    s,
    `A vehicle travels ${item.distanceM} metres at a constant speed of ${item.speedMS} m/s. Calculate the travel time in minutes.`,
    item.minutes,
    'Use time = distance ÷ speed to find seconds, then convert seconds to minutes.'
  );
}
function psGenWorkRate() {
  const s = chooseProblemStructure();
  const topic = randInt(1, 7);

  if (s === 'basic') {
    if (topic === 1) {
      const example = pick([
        [2, 3], [3, 4], [4, 3], [5, 2], [6, 2]
      ]);
      const partTime = example[0];
      const denominator = example[1];
      const totalTime = partTime * denominator;

      return psQ(
        'workRate',
        s,
        `A worker completes 1/${denominator} of a job in ${partTime} hours at a constant rate. How many hours would the worker take to complete the whole job alone?`,
        totalTime,
        'If one part takes the given time, multiply by the number of equal parts.'
      );
    }

    if (topic === 2) {
      const example = pick([
        [6, 3, 2],
        [12, 4, 3],
        [12, 6, 4],
        [20, 5, 4],
        [8, 8, 4],
        [18, 9, 6],
        [15, 10, 6]
      ]);
      const a = example[0];
      const b = example[1];
      const together = example[2];
      const context = pick([
        ['Worker A', 'Worker B', 'workers'],
        ['Machine A', 'Machine B', 'machines'],
        ['Printer A', 'Printer B', 'printers']
      ]);

      return psQ(
        'workRate',
        s,
        `${context[0]} can complete a job alone in ${a} hours, and ${context[1]} can complete it alone in ${b} hours. How many hours will the ${context[2]} take when working together?`,
        together,
        'Add their hourly work rates, then take the reciprocal.'
      );
    }

    if (topic === 3) {
      const example = pick([
        [8, 4, 6, 3],
        [12, 4, 6, 4],
        [10, 5, 8, 4],
        [6, 2, 6, 4]
      ]);
      const aTime = example[0];
      const firstHours = example[1];
      const bTime = example[2];
      const answer = example[3];

      return psQ(
        'workRate',
        s,
        `Worker A can complete a task alone in ${aTime} hours. Worker A works alone for ${firstHours} hours and then stops. Worker B, who can complete the whole task alone in ${bTime} hours, finishes the remaining work. How many hours does Worker B work?`,
        answer,
        'Find the fraction completed in the first stage, then use Worker B’s rate on the remainder.'
      );
    }

    if (topic === 4) {
      const example = pick([
        [12, 6, 3, 3],
        [8, 8, 2, 3],
        [10, 10, 4, 3],
        [15, 10, 5, 4]
      ]);
      const aTime = example[0];
      const bTime = example[1];
      const aloneHours = example[2];
      const togetherHours = example[3];

      return psQ(
        'workRate',
        s,
        `Worker A can complete a job alone in ${aTime} hours. Worker B can complete it alone in ${bTime} hours. Worker A works alone for ${aloneHours} hours, and then Worker B joins. How many more hours do they need to finish the job together?`,
        togetherHours,
        'Subtract Worker A’s first-stage work, then divide the remainder by the combined rate.'
      );
    }

    if (topic === 5) {
      const example = pick([
        [10, 25, 8],
        [12, 50, 8],
        [18, 50, 12],
        [16, 100, 8],
        [15, 50, 10]
      ]);
      const originalTime = example[0];
      const increase = example[1];
      const newTime = example[2];

      return psQ(
        'workRate',
        s,
        `At the original working rate, a task takes ${originalTime} hours. The working efficiency increases by ${increase}%. How many hours will the same task take at the new constant rate?`,
        newTime,
        'A higher efficiency means a higher rate, so divide the original time by the rate multiplier.'
      );
    }

    if (topic === 6) {
      const example = pick([
        [4, 12, 6],
        [6, 12, 12],
        [8, 24, 12],
        [6, 18, 9],
        [10, 30, 15]
      ]);
      const inlet = example[0];
      const drain = example[1];
      const answer = example[2];

      return psQ(
        'workRate',
        s,
        `An inlet can fill an empty tank in ${inlet} hours. A drain can empty the full tank in ${drain} hours. If both are opened together while the tank is empty, how many hours will it take to fill the tank?`,
        answer,
        'Subtract the drain rate from the inlet rate, then take the reciprocal.'
      );
    }

    const example = pick([
      [4, 12, 6, 6],
      [6, 12, 8, 8],
      [8, 12, 24, 6],
      [10, 15, 30, 7.5],
      [12, 18, 36, 9]
    ]);
    const inletA = example[0];
    const inletB = example[1];
    const drain = example[2];
    const answer = example[3];

    return psQ(
      'workRate',
      s,
      `Inlet A can fill a tank in ${inletA} hours, Inlet B can fill it in ${inletB} hours, and a drain can empty it in ${drain} hours. If both inlets and the drain are open from the start, how many hours will the empty tank take to fill?`,
      answer,
      'Add the two inlet rates, subtract the drain rate, then take the reciprocal.'
    );
  }

  if (s === 'multi') {
    if (topic === 1) {
      const example = pick([
        [6, 4, 12],
        [8, 6, 24],
        [10, 5, 10],
        [12, 8, 24],
        [15, 10, 30]
      ]);
      const aTime = example[0];
      const together = example[1];
      const bTime = example[2];

      return psQ(
        'workRate',
        s,
        `Worker A can complete a job alone in ${aTime} hours. Workers A and B together can complete it in ${together} hours. How many hours would Worker B take to complete the job alone?`,
        bTime,
        'Subtract Worker A’s rate from the combined rate, then take the reciprocal.'
      );
    }

    if (topic === 2) {
      const example = pick([
        [6, 12, 12, 3],
        [12, 12, 12, 4],
        [10, 15, 30, 5],
        [8, 12, 24, 4],
        [9, 18, 18, 4.5]
      ]);
      const aTime = example[0];
      const bTime = example[1];
      const cTime = example[2];
      const answer = example[3];

      return psQ(
        'workRate',
        s,
        `Workers A, B and C can complete the same job alone in ${aTime}, ${bTime} and ${cTime} hours respectively. How many hours will all three take when working together?`,
        answer,
        'Add all three hourly work rates, then take the reciprocal.'
      );
    }

    if (topic === 3) {
      const example = pick([
        [12, 6, 3, 3, 1],
        [8, 8, 2, 2, 2],
        [10, 10, 2, 3, 2.5],
        [6, 12, 1, 4, 2]
      ]);
      const aTime = example[0];
      const bTime = example[1];
      const aHours = example[2];
      const bHours = example[3];
      const togetherHours = example[4];

      return psQ(
        'workRate',
        s,
        `Worker A can complete a task alone in ${aTime} hours, and Worker B can complete it alone in ${bTime} hours. A works alone for ${aHours} hours, then B works alone for ${bHours} hours. They complete the remaining work together. How many hours do they work together?`,
        togetherHours,
        'Add the work completed in the first two stages, then use the combined rate on the remainder.'
      );
    }

    if (topic === 4) {
      const example = pick([
        [12, 6, 2, 3],
        [8, 8, 2, 4],
        [15, 10, 3, 5],
        [20, 10, 4, 4]
      ]);
      const aTime = example[0];
      const bTime = example[1];
      const togetherHours = example[2];
      const bRemaining = example[3];

      return psQ(
        'workRate',
        s,
        `Workers A and B can complete a job alone in ${aTime} hours and ${bTime} hours respectively. They work together for ${togetherHours} hours, and then Worker A leaves. How many more hours does Worker B need to finish the job?`,
        bRemaining,
        'Find the work completed together, then let Worker B complete the remaining fraction alone.'
      );
    }

    if (topic === 5) {
      const example = pick([
        [12, 3, 50, 6],
        [15, 6, 50, 6],
        [18, 3, 50, 10],
        [16, 4, 100, 6],
        [12, 4, -20, 10]
      ]);
      const originalTime = example[0];
      const firstHours = example[1];
      const change = example[2];
      const remainingTime = example[3];
      const wording = change > 0
        ? `increases by ${change}%`
        : `decreases by ${Math.abs(change)}%`;

      return psQ(
        'workRate',
        s,
        `At the original rate, a worker can complete a task in ${originalTime} hours. The worker works at that rate for ${firstHours} hours. The worker’s efficiency then ${wording} and remains constant. How many additional hours are needed to finish the task?`,
        remainingTime,
        'Find the unfinished fraction, then divide it by the changed hourly rate.'
      );
    }

    if (topic === 6) {
      const example = pick([
        [6, 12, 2, 8],
        [4, 12, 1, 4.5],
        [8, 24, 2, 9],
        [10, 20, 4, 12]
      ]);
      const inlet = example[0];
      const drain = example[1];
      const inletOnlyHours = example[2];
      const answer = example[3];

      return psQ(
        'workRate',
        s,
        `An inlet can fill a tank in ${inlet} hours. It is opened alone for ${inletOnlyHours} hours. A drain that can empty the full tank in ${drain} hours is then opened while the inlet remains open. How many additional hours will the tank take to fill?`,
        answer,
        'Find the amount already filled, then use the net inlet-minus-drain rate.'
      );
    }

    const example = pick([
      [4, 6, 12, 2, 1.5],
      [4, 6, 24, 1, 2],
      [5, 6, 10, 1, 3],
      [6, 8, 12, 1, 4],
      [6, 9, 18, 2, 3]
    ]);
    const inletA = example[0];
    const inletB = example[1];
    const drain = example[2];
    const firstHours = example[3];
    const answer = example[4];

    return psQ(
      'workRate',
      s,
      `Inlet A can fill a tank in ${inletA} hours and is opened alone for ${firstHours} hours. Inlet B can fill the tank in ${inletB} hours, and a drain can empty it in ${drain} hours. Inlet B and the drain are then opened while Inlet A remains open. How many additional hours will the tank take to fill?`,
      answer,
      'Subtract the first-stage amount from one tank, then use the net rate of two inlets minus one drain.'
    );
  }

  if (topic === 1) {
    const example = pick([
      [50, 6, 15],
      [100, 4, 12],
      [25, 8, 18],
      [50, 8, 20]
    ]);
    const fasterPercent = example[0];
    const together = example[1];
    const slowerTime = example[2];

    return psQ(
      'workRate',
      s,
      `Worker A is ${fasterPercent}% more efficient than Worker B. Working together, they complete a job in ${together} hours. How many hours would Worker B take to complete the job alone?`,
      slowerTime,
      'Express Worker A’s rate as a multiple of Worker B’s rate, then use the combined rate.'
    );
  }

  if (topic === 2) {
    const example = pick([
      [6, 4, 12],
      [8, 4, 8],
      [12, 6, 12],
      [10, 5, 10]
    ]);
    const abTogether = example[0];
    const abcTogether = example[1];
    const cAlone = example[2];

    return psQ(
      'workRate',
      s,
      `Workers A and B together can complete a job in ${abTogether} hours. Workers A, B and C together can complete the same job in ${abcTogether} hours. How many hours would Worker C take to complete the job alone?`,
      cAlone,
      'Subtract the A-and-B rate from the three-worker rate, then take the reciprocal.'
    );
  }

  if (topic === 3) {
    const example = pick([
      [12, 6, 2, 2, 2],
      [8, 8, 2, 1, 4],
      [10, 5, 2, 2, 1],
      [12, 12, 3, 3, 3]
    ]);
    const aTime = example[0];
    const bTime = example[1];
    const aAlone = example[2];
    const together = example[3];
    const bFinal = example[4];

    return psQ(
      'workRate',
      s,
      `Worker A can complete a task alone in ${aTime} hours, and Worker B can complete it alone in ${bTime} hours. A works alone for ${aAlone} hours. They then work together for ${together} hours, after which A leaves. How many more hours does B need to finish the task?`,
      bFinal,
      'Track the work completed in each stage, then divide the final remainder by Worker B’s rate.'
    );
  }

  if (topic === 4) {
    const example = pick([
      [12, 6, 12, 2, 2],
      [8, 8, 8, 2, 2],
      [5, 6, 10, 2, 1],
      [18, 9, 18, 3, 3]
    ]);
    const aTime = example[0];
    const bTime = example[1];
    const cTime = example[2];
    const firstStage = example[3];
    const secondStage = example[4];

    return psQ(
      'workRate',
      s,
      `Workers A and B can complete a job alone in ${aTime} hours and ${bTime} hours. They work together for ${firstStage} hours. Worker A then leaves and Worker C, who can complete the job alone in ${cTime} hours, joins Worker B. How many additional hours do Workers B and C need to finish the job?`,
      secondStage,
      'Find the first-stage work, then use the new combined rate after one worker leaves and another joins.'
    );
  }

  if (topic === 5) {
    return psQ(
      'workRate',
      s,
      'At the original rate, a worker can complete a job in 12 hours. The worker works for 3 hours at the original rate, then for 2 hours at 50% of the original efficiency. The efficiency then becomes twice the original efficiency. How many additional hours are needed to finish the job?',
      4,
      'Convert each stage into a fraction of the whole job, then use the final doubled rate on the remainder.'
    );
  }

  if (topic === 6) {
    const example = pick([
      [4, 12, 'one-half', 3],
      [6, 12, 'one-quarter', 9],
      [8, 24, 'one-third', 8],
      [6, 18, 'one-third', 6]
    ]);
    const inlet = example[0];
    const drain = example[1];
    const startingFraction = example[2];
    const answer = example[3];

    return psQ(
      'workRate',
      s,
      `A tank is already ${startingFraction} full. An inlet can fill the empty tank in ${inlet} hours, and a drain can empty the full tank in ${drain} hours. If both are opened together, how many hours will the tank take to become full?`,
      answer,
      'Use only the unfilled fraction, and divide it by the net inlet-minus-drain rate.'
    );
  }

  const example = pick([
    [6, 12, 8, 4, 2],
    [4, 12, 6, 3, 1.5],
    [8, 8, 16, 2, 2.5],
    [12, 12, 12, 4, 4]
  ]);
  const inletA = example[0];
  const inletB = example[1];
  const drain = example[2];
  const allOpenHours = example[3];
  const answer = example[4];

  return psQ(
    'workRate',
    s,
    `Inlet A can fill a tank in ${inletA} hours, Inlet B can fill it in ${inletB} hours, and a drain can empty it in ${drain} hours. All three are opened while the tank is empty. After ${allOpenHours} hours, the drain is closed while both inlets remain open. How many additional hours will the tank take to fill?`,
    answer,
    'Find the amount filled while two inlets and one drain operate, then use the combined rate of the two inlets.'
  );
}
