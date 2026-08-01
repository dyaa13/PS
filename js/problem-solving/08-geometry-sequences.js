'use strict';

/* Geometry, angles, trigonometry, coordinates and sequences.
   Split from DYAAPS.html without changing the original logic. */

function psGenGeometryMeasurement() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    if (chance(0.5)) {
      const l = randInt(8, 24);
      const w = randInt(5, l - 2);
      return psQ('geometryMeasurement', s,
        `A rectangular field is ${l} metres long and ${w} metres wide. Calculate its area in square metres.`,
        l * w,
        'Area equals length multiplied by width.');
    }

    const l = randInt(5, 12);
    const w = randInt(4, 10);
    const h = randInt(3, 8);
    return psQ('geometryMeasurement', s,
      `A rectangular prism measures ${l} cm by ${w} cm by ${h} cm. Calculate its volume in cubic centimetres.`,
      l * w * h,
      'Volume equals length multiplied by width multiplied by height.');
  }

  if (s === 'multi') {
    const l = randInt(12, 30);
    const w = randInt(6, l - 3);
    const perimeter = 2 * (l + w);
    return psQ('geometryMeasurement', s,
      `A rectangle has a perimeter of ${perimeter} cm and a length of ${l} cm. Calculate its area.`,
      l * w,
      'Use the perimeter to find the width, then calculate the area.');
  }

  if (chance(0.5)) {
    const outerL = randInt(18, 30);
    const outerW = randInt(12, 22);
    const cutL = randInt(4, 8);
    const cutW = randInt(3, 7);
    return psQ('geometryMeasurement', s,
      `A rectangular sheet measures ${outerL} cm by ${outerW} cm. A rectangular piece measuring ${cutL} cm by ${cutW} cm is removed from one corner. Calculate the remaining area.`,
      outerL * outerW - cutL * cutW,
      'Subtract the area of the removed rectangle from the area of the full sheet.');
  }

  const volume = pick([720, 960, 1200, 1440, 1800]);
  const l = pick([10, 12, 15, 20]);
  const w = pick([6, 8, 10, 12]);
  const h = volume / (l * w);
  if (!Number.isInteger(h)) return psGenGeometryMeasurement();
  return psQ('geometryMeasurement', s,
    `A rectangular tank has a volume of ${volume} cm³. Its length is ${l} cm and its width is ${w} cm. Calculate its height.`,
    h,
    'Divide the volume by the product of the length and width.');
}

function psGenAngleReasoning() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const a = randInt(35, 75);
    const b = randInt(35, 80);
    return psQ('angleReasoning', s,
      `Two angles in a triangle measure ${a}° and ${b}°. Calculate the third angle.`,
      180 - a - b,
      'The interior angles of a triangle sum to 180°.');
  }

  if (s === 'multi') {
    if (chance(0.5)) {
      const sides = pick([5, 6, 8, 9, 10, 12, 15, 18]);
      const equal = ((sides - 2) * 180) / sides;
      const context = pick(['regular polygon', 'regular floor tile', 'regular decorative frame']);
      return psQ('angleReasoning', s,
        `A ${context} has ${sides} sides. Calculate the size of each interior angle.`,
        equal,
        'Find the interior-angle sum and divide by the number of equal angles.');
    }

    const sides = randInt(5, 18);
    return psQ('angleReasoning', s,
      `Calculate the sum of the interior angles of a polygon with ${sides} sides.`,
      (sides - 2) * 180,
      'Divide the polygon into triangles from one vertex.');
  }

  if (chance(0.5)) {
    const base = randInt(35, 75);
    return psQ('angleReasoning', s,
      `An isosceles triangle has two equal base angles. Its exterior angle at the third vertex is ${2 * base}°. Calculate the size of each base angle.`,
      base,
      'An exterior angle equals the sum of the two opposite interior angles.');
  }

  const n = pick([5, 6, 8, 9, 10, 12]);
  return psQ('angleReasoning', s,
    `The exterior angles of a regular polygon are equal, and each exterior angle measures ${360 / n}°. Determine the number of sides of the polygon.`,
    n,
    'The exterior angles of any polygon sum to 360°.');
}

function psGenPythagorasTrig() {
  const s = chooseProblemStructure();
  const triple = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25]]);

  if (s === 'basic') {
    const scale = randInt(1, 6);
    const unit = pick(['cm', 'm', 'mm']);
    const context = pick([
      'A right-angled triangle',
      'A triangular support',
      'A right-angled frame',
      'A triangular section'
    ]);
    return psQ('pythagorasTrig', s,
      `${context} has perpendicular sides of ${triple[0] * scale} ${unit} and ${triple[1] * scale} ${unit}. Calculate the length of the hypotenuse.`,
      triple[2] * scale,
      'Apply the Pythagorean theorem.');
  }

  if (s === 'multi') {
    const scale = randInt(2, 4);
    return psQ('pythagorasTrig', s,
      `A rectangular park measures ${triple[0] * scale} m by ${triple[1] * scale} m. A straight path runs from one corner to the opposite corner. Calculate the length of the path.`,
      triple[2] * scale,
      'The diagonal is the hypotenuse of a right-angled triangle.');
  }

  if (chance(0.5)) {
    const height = pick([6, 8, 10, 12, 15]);
    return psQ('pythagorasTrig', s,
      `A support cable makes an angle of 45° with level ground and reaches the top of a vertical pole. The horizontal distance from the pole to the cable anchor is ${height} m. Calculate the height of the pole.`,
      height,
      'For a 45° right triangle, the opposite and adjacent sides are equal.');
  }

  const hyp = triple[2];
  const leg = chance(0.5) ? triple[0] : triple[1];
  const other = leg === triple[0] ? triple[1] : triple[0];
  return psQ('pythagorasTrig', s,
    `A ladder is ${hyp} m long and reaches a point ${other} m above level ground on a vertical wall. Calculate the horizontal distance from the foot of the ladder to the wall.`,
    leg,
    'Subtract the square of the vertical height from the square of the ladder length.');
}

function psGenCoordinatesLines() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const x1 = randInt(-8, 2);
    const y1 = randInt(-8, 2);
    const x2 = x1 + 2 * randInt(2, 6);
    const y2 = y1 + 2 * randInt(2, 6);
    return psQ('coordinatesLines', s,
      `The endpoints of a line segment are (${x1}, ${y1}) and (${x2}, ${y2}). Calculate the x-coordinate of the midpoint.`,
      (x1 + x2) / 2,
      'Average the two x-coordinates.');
  }

  if (s === 'multi') {
    const m = pick([-4, -3, -2, 2, 3, 4]);
    const x1 = randInt(-4, 4);
    const y1 = randInt(-6, 6);
    const dx = pick([1, 2, 3]);
    const x2 = x1 + dx;
    const y2 = y1 + m * dx;
    return psQ('coordinatesLines', s,
      `A straight line passes through (${x1}, ${y1}) and (${x2}, ${y2}). Calculate its gradient.`,
      m,
      'Divide the change in y by the change in x.');
  }

  const m1 = pick([1, 2, 3, 4]);
  const m2 = pick([-1, -2, -3]);
  const x = randInt(-4, 6);
  const c1 = randInt(-6, 8);
  const y = m1 * x + c1;
  const c2 = y - m2 * x;
  return psQ('coordinatesLines', s,
    `The lines y = ${m1}x ${c1 >= 0 ? '+' : '−'} ${Math.abs(c1)} and y = ${m2}x ${c2 >= 0 ? '+' : '−'} ${Math.abs(c2)} intersect at one point. Calculate the x-coordinate of the point of intersection.`,
    x,
    'Set the two expressions for y equal and solve for x.');
}

function psGenSequences() {
  const s = chooseProblemStructure();

  if (s === 'basic') {
    const first = randInt(2, 15);
    const d = randInt(3, 10);
    return psQ('sequences', s,
      `The sequence begins ${first}, ${first + d}, ${first + 2 * d}, ${first + 3 * d}, ... . Calculate the next term.`,
      first + 4 * d,
      'Add the constant difference.');
  }

  if (s === 'multi') {
    const first = randInt(2, 12);
    const d = randInt(3, 9);
    const n = randInt(10, 25);
    return psQ('sequences', s,
      `An arithmetic sequence has first term ${first} and common difference ${d}. Calculate the ${n}th term.`,
      first + (n - 1) * d,
      'Use first term + (term number − 1) × common difference.');
  }

  if (chance(0.5)) {
    const first = randInt(2, 12);
    const d = randInt(3, 9);
    const n = randInt(8, 20);
    const term = first + (n - 1) * d;
    return psQ('sequences', s,
      `An arithmetic sequence begins ${first}, ${first + d}, ${first + 2 * d}, ... . Which term of the sequence is equal to ${term}?`,
      n,
      'Set the nth-term expression equal to the given value.');
  }

  const n = randInt(8, 20);
  return psQ('sequences', s,
    `A pattern contains 4 tiles in Figure 1, 7 tiles in Figure 2, and 10 tiles in Figure 3. The pattern continues in the same way. How many tiles are required for Figure ${n}?`,
    3 * n + 1,
    'Identify the constant increase and form a rule for the figure number.');
}
