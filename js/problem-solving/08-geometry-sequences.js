'use strict';

/* Applied geometry, angle, trigonometry, coordinate and sequence problems.
   All generators keep the original public function names and skill keys. */

function psFormatAppliedLine(gradient, intercept) {
  const xTerm = gradient === 1
    ? 'x'
    : gradient === -1
      ? '−x'
      : `${gradient}x`;

  if (intercept === 0) {
    return `y = ${xTerm}`;
  }

  return `y = ${xTerm} ${intercept > 0 ? '+' : '−'} ${Math.abs(intercept)}`;
}

function psGenGeometryMeasurement() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Perimeter
  if (type === 1) {
    if (s === 'basic') {
      const length = randInt(12, 28);
      const width = randInt(7, length - 3);
      const gate = randInt(2, 5);

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular community garden is ${length} m long and ${width} m wide. A ${gate} m-wide entrance will not be fenced. How many metres of fencing are needed?`,
        2 * (length + width) - gate,
        'Find the perimeter, then subtract the width of the entrance.'
      );
    }

    if (s === 'multi') {
      const length = randInt(16, 32);
      const width = randInt(8, length - 4);
      const gate = randInt(2, 5);
      const costPerMetre = randInt(6, 15);
      const fencing = 2 * (length + width) - gate;

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular dog exercise area is ${length} m by ${width} m. A ${gate} m opening is left for a gate. Fencing costs $${costPerMetre} per metre. What is the total fencing cost?`,
        fencing * costPerMetre,
        'Find the fence length after allowing for the gate, then multiply by the cost per metre.'
      );
    }

    const length = pick([18, 22, 26, 30, 34]);
    const width = pick([10, 12, 14, 16, 18]);
    const gate = pick([2, 4]);
    const spacing = 2;
    const fencedLength = 2 * (length + width) - gate;
    const posts = fencedLength / spacing + 1;

    return psQ(
      'geometryMeasurement',
      s,
      `A rectangular garden is ${length} m by ${width} m, with a ${gate} m entrance left open. Fence posts are placed every ${spacing} m along the remaining open fence line, including a post at each end. How many posts are required?`,
      posts,
      'Find the fenced length, divide by the spacing to count intervals, then add one for the first post.'
    );
  }

  // 2. Area
  if (type === 2) {
    if (s === 'basic') {
      const length = randInt(8, 20);
      const width = randInt(5, 14);

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular classroom floor is ${length} m long and ${width} m wide. What is its area in square metres?`,
        length * width,
        'Multiply the length by the width.'
      );
    }

    if (s === 'multi') {
      const wallWidth = randInt(8, 16);
      const wallHeight = randInt(3, 6);
      const triangleHeight = pick([2, 4, 6]);
      const totalArea = wallWidth * wallHeight + wallWidth * triangleHeight / 2;

      return psQ(
        'geometryMeasurement',
        s,
        `The front of a building consists of a ${wallWidth} m by ${wallHeight} m rectangle with a triangular section above it. The triangle has base ${wallWidth} m and height ${triangleHeight} m. What is the total front area?`,
        totalArea,
        'Find the rectangle area and triangle area, then add them.'
      );
    }

    const siteLength = randInt(24, 38);
    const siteWidth = randInt(16, 26);
    const planAUnavailable = randInt(40, 90);
    const planBUnavailable = planAUnavailable + randInt(12, 45);
    const difference = planBUnavailable - planAUnavailable;

    return psQ(
      'geometryMeasurement',
      s,
      `Two plans use the same ${siteLength} m by ${siteWidth} m site. Plan A reserves ${planAUnavailable} m² for paths and storage. Plan B reserves ${planBUnavailable} m². How many more square metres of usable space does Plan A provide?`,
      difference,
      'Both plans start with the same total area, so compare the areas that are unavailable.'
    );
  }

  // 3. Volume
  if (type === 3) {
    if (s === 'basic') {
      const length = randInt(5, 12);
      const width = randInt(3, 9);
      const height = randInt(2, 8);

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular storage box measures ${length} cm by ${width} cm by ${height} cm. What is its volume in cubic centimetres?`,
        length * width * height,
        'Multiply length, width and height.'
      );
    }

    if (s === 'multi') {
      const length = randInt(6, 12);
      const width = randInt(4, 9);
      const height = randInt(3, 8);
      const boxes = randInt(3, 7);

      return psQ(
        'geometryMeasurement',
        s,
        `${boxes} identical supply boxes each measure ${length} cm by ${width} cm by ${height} cm. What is their combined volume?`,
        boxes * length * width * height,
        'Find the volume of one box, then multiply by the number of boxes.'
      );
    }

    const length = pick([12, 15, 18, 20]);
    const width = pick([8, 10, 12]);
    const height = randInt(8, 16);
    const volume = length * width * height;

    return psQ(
      'geometryMeasurement',
      s,
      `A rectangular display tank must hold ${volume} cm³. Its base is ${length} cm by ${width} cm. What minimum inside height is required?`,
      height,
      'Divide the required volume by the base area.'
    );
  }

  // 4. Surface area
  if (type === 4) {
    if (s === 'basic') {
      const side = randInt(4, 12);

      return psQ(
        'geometryMeasurement',
        s,
        `A cube-shaped gift box has side length ${side} cm. What is its total surface area?`,
        6 * side * side,
        'A cube has six equal square faces.'
      );
    }

    if (s === 'multi') {
      const length = randInt(8, 16);
      const width = randInt(5, 10);
      const height = randInt(3, 8);
      const boxes = randInt(2, 5);
      const oneArea = 2 * (length * width + length * height + width * height);

      return psQ(
        'geometryMeasurement',
        s,
        `${boxes} identical closed parcel boxes each measure ${length} cm by ${width} cm by ${height} cm. What total area of cardboard is needed for all outer faces?`,
        boxes * oneArea,
        'Find the surface area of one closed rectangular prism, then multiply by the number of boxes.'
      );
    }

    const aL = pick([12, 15, 18]);
    const aW = pick([6, 8, 10]);
    const aH = pick([4, 5, 6]);
    const bL = aL;
    const bW = aH;
    const bH = aW;
    const closedArea = 2 * (aL * aW + aL * aH + aW * aH);
    const openArea = bL * bW + 2 * bL * bH + 2 * bW * bH;

    return psQ(
      'geometryMeasurement',
      s,
      `Design A is a closed box measuring ${aL} cm by ${aW} cm by ${aH} cm. Design B uses the same three dimensions but has no top; its base is ${bL} cm by ${bW} cm and its height is ${bH} cm. How many square centimetres less material does the design using less cardboard require?`,
      Math.abs(closedArea - openArea),
      'Calculate the material area for both designs, remembering that the open box has no top, then compare.'
    );
  }

  // 5. Composite shapes
  if (type === 5) {
    if (s === 'basic') {
      const rect1L = randInt(8, 16);
      const rect1W = randInt(4, 9);
      const rect2L = randInt(3, 8);
      const rect2W = randInt(2, 6);

      return psQ(
        'geometryMeasurement',
        s,
        `An L-shaped floor is made from two non-overlapping rectangles measuring ${rect1L} m by ${rect1W} m and ${rect2L} m by ${rect2W} m. What is the total floor area?`,
        rect1L * rect1W + rect2L * rect2W,
        'Find the area of each rectangle and add them.'
      );
    }

    if (s === 'multi') {
      const outerL = randInt(18, 30);
      const outerW = randInt(12, 22);
      const cutL = randInt(4, 9);
      const cutW = randInt(3, 8);
      const rate = randInt(3, 8);
      const area = outerL * outerW - cutL * cutW;

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular paved area is ${outerL} m by ${outerW} m, but a ${cutL} m by ${cutW} m garden is cut out from one corner. Paving costs $${rate} per square metre. What is the total paving cost?`,
        area * rate,
        'Subtract the cut-out area from the whole rectangle, then multiply by the cost per square metre.'
      );
    }

    const mainL = randInt(20, 32);
    const mainW = randInt(12, 20);
    const extensionL = randInt(5, 10);
    const extensionW = randInt(4, 8);
    const pondL = randInt(3, 7);
    const pondW = randInt(2, 6);
    const usable = mainL * mainW + extensionL * extensionW - pondL * pondW;

    return psQ(
      'geometryMeasurement',
      s,
      `A recreation area consists of a ${mainL} m by ${mainW} m rectangle and a non-overlapping ${extensionL} m by ${extensionW} m side extension. A ${pondL} m by ${pondW} m pond occupies part of the area. What area remains usable?`,
      usable,
      'Add the two non-overlapping rectangular areas, then subtract the pond area.'
    );
  }

  // 6. Shaded area
  if (type === 6) {
    if (s === 'basic') {
      const outerL = randInt(14, 26);
      const outerW = randInt(10, 20);
      const innerL = randInt(5, outerL - 4);
      const innerW = randInt(4, outerW - 3);

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular poster is ${outerL} cm by ${outerW} cm. A centred unshaded rectangle measuring ${innerL} cm by ${innerW} cm is left blank. What is the shaded area?`,
        outerL * outerW - innerL * innerW,
        'Subtract the unshaded rectangle from the whole poster.'
      );
    }

    if (s === 'multi') {
      const outerL = randInt(18, 30);
      const outerW = randInt(14, 24);
      const border = pick([1, 2, 3]);
      const innerL = outerL - 2 * border;
      const innerW = outerW - 2 * border;
      const rate = randInt(4, 10);
      const shadedArea = outerL * outerW - innerL * innerW;

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular sign is ${outerL} cm by ${outerW} cm. A shaded border ${border} cm wide runs around the inside edge. Shading costs $${rate} per square centimetre. What is the total shading cost?`,
        shadedArea * rate,
        'Find the inner rectangle, subtract its area from the whole sign, then apply the cost.'
      );
    }

    const outerL = randInt(24, 36);
    const outerW = randInt(16, 26);
    const firstL = randInt(5, 10);
    const firstW = randInt(4, 8);
    const secondL = randInt(4, 9);
    const secondW = randInt(3, 7);
    const shaded = outerL * outerW - firstL * firstW - secondL * secondW;

    return psQ(
      'geometryMeasurement',
      s,
      `A ${outerL} cm by ${outerW} cm sheet is painted except for two separate unpainted labels measuring ${firstL} cm by ${firstW} cm and ${secondL} cm by ${secondW} cm. What area is painted?`,
      shaded,
      'Subtract both unpainted areas from the total sheet area.'
    );
  }

  // 7. Missing side length
  if (type === 7) {
    if (s === 'basic') {
      const length = randInt(8, 18);
      const width = randInt(4, 12);
      const area = length * width;

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular noticeboard has area ${area} dm² and length ${length} dm. What is its width?`,
        width,
        'Divide the area by the known length.'
      );
    }

    if (s === 'multi') {
      const length = randInt(14, 28);
      const width = randInt(7, 16);
      const gate = randInt(2, 5);
      const fencing = 2 * (length + width) - gate;

      return psQ(
        'geometryMeasurement',
        s,
        `A rectangular enclosure is ${length} m long. It needs ${fencing} m of fencing after a ${gate} m entrance is left open. What is the enclosure width?`,
        width,
        'Add the entrance back to reconstruct the perimeter, halve it, then subtract the length.'
      );
    }

    const length = pick([12, 15, 18, 20]);
    const width = pick([8, 10, 12]);
    const height = randInt(5, 14);
    const volume = length * width * height;
    const shelf = randInt(1, 3);

    return psQ(
      'geometryMeasurement',
      s,
      `A cabinet has internal volume ${volume} cm³ and a base measuring ${length} cm by ${width} cm. A shelf ${shelf} cm thick is fitted across the top, reducing the usable height. What usable height remains below the shelf?`,
      height - shelf,
      'Use the volume to find the original inside height, then subtract the shelf thickness.'
    );
  }

  // 8. Unit conversion
  if (type === 8) {
    if (s === 'basic') {
      const metres = randInt(2, 12);
      const centimetres = metres * 100;

      return psQ(
        'geometryMeasurement',
        s,
        `A timber board is ${centimetres} cm long. What is its length in metres?`,
        metres,
        'There are 100 centimetres in 1 metre.'
      );
    }

    if (s === 'multi') {
      const lengthM = randInt(4, 12);
      const widthM = randInt(3, 9);
      const lengthCm = lengthM * 100;
      const widthCm = widthM * 100;
      const coverage = pick([4, 6, 8, 10, 12]);
      const area = lengthM * widthM;
      const packs = Math.ceil(area / coverage);

      return psQ(
        'geometryMeasurement',
        s,
        `A floor measures ${lengthCm} cm by ${widthCm} cm. One flooring pack covers ${coverage} m². What is the minimum number of packs required?`,
        packs,
        'Convert both dimensions to metres, find the area in square metres, then round the number of packs up.'
      );
    }

    const length = pick([40, 50, 60, 80]);
    const width = pick([25, 40, 50]);
    const height = pick([20, 25, 30, 40]);
    const capacityLitres = length * width * height / 1000;
    const usedLitres = Math.floor(capacityLitres / 4) * 4 / 2;
    const remaining = capacityLitres - usedLitres;

    return psQ(
      'geometryMeasurement',
      s,
      `A rectangular tank measures ${length} cm by ${width} cm by ${height} cm. It currently contains ${usedLitres} L of water. How many more litres can it hold?`,
      remaining,
      'Find the volume in cubic centimetres, convert using 1000 cm³ = 1 L, then subtract the current amount.'
    );
  }

  // 9. Actual material use
  if (type === 9) {
    if (s === 'basic') {
      const wallLength = randInt(6, 12);
      const wallHeight = randInt(3, 5);
      const coverage = pick([4, 5, 6, 8]);
      const area = wallLength * wallHeight;

      return psQ(
        'geometryMeasurement',
        s,
        `A wall is ${wallLength} m long and ${wallHeight} m high. One tin of paint covers ${coverage} m². What is the minimum number of tins needed?`,
        Math.ceil(area / coverage),
        'Find the wall area, divide by the coverage per tin, and round up.'
      );
    }

    if (s === 'multi') {
      const tileSide = pick([20, 25, 40, 50]);
      const across = randInt(5, 10);
      const along = randInt(6, 12);
      const roomLength = tileSide * along;
      const roomWidth = tileSide * across;
      const sparePercent = pick([10, 20]);
      const tilesPerBox = pick([5, 6, 8, 10]);
      const exactTiles = across * along;
      const requiredTiles = Math.ceil(exactTiles * (100 + sparePercent) / 100);
      const boxes = Math.ceil(requiredTiles / tilesPerBox);

      return psQ(
        'geometryMeasurement',
        s,
        `A floor measuring ${roomLength} cm by ${roomWidth} cm is covered with ${tileSide} cm square tiles. The builder buys ${sparePercent}% extra tiles for breakages. Tiles come in boxes of ${tilesPerBox}. What is the minimum number of boxes needed?`,
        boxes,
        'Find the exact tile count, add the spare percentage, then round up to whole boxes.'
      );
    }

    const area = pick([48, 60, 72, 80, 96, 120]);
    const packACover = pick([4, 5, 6, 8]);
    const packBCover = pick([6, 8, 10, 12]);
    const packACost = randInt(18, 35);
    const packBCost = randInt(24, 48);
    const costA = Math.ceil(area / packACover) * packACost;
    const costB = Math.ceil(area / packBCover) * packBCost;

    if (costA === costB) return psGenGeometryMeasurement();

    return psQ(
      'geometryMeasurement',
      s,
      `A ${area} m² floor can be covered using Pack A, which covers ${packACover} m² and costs $${packACost}, or Pack B, which covers ${packBCover} m² and costs $${packBCost}. Whole packs must be bought. How much money is saved by choosing the cheaper option?`,
      Math.abs(costA - costB),
      'Find the whole number of packs and total cost for each option, then compare.'
    );
  }

  // 10. Packaging and capacity
  if (s === 'basic') {
    const smallL = pick([2, 3, 4, 5]);
    const smallW = pick([2, 3, 4]);
    const smallH = pick([2, 3, 4]);
    const nx = randInt(3, 6);
    const ny = randInt(2, 5);
    const nz = randInt(2, 4);

    return psQ(
      'geometryMeasurement',
      s,
      `A shipping carton measures ${smallL * nx} cm by ${smallW * ny} cm by ${smallH * nz} cm. Small packs measure ${smallL} cm by ${smallW} cm by ${smallH} cm and fit exactly without gaps. How many small packs fit?`,
      nx * ny * nz,
      'Find how many packs fit along each dimension, then multiply the three counts.'
    );
  }

  if (s === 'multi') {
    const bottleVolume = pick([600, 750]);
    const crateLitres = pick([12.5, 15.5, 18.5, 20.5, 24.5]);
    const capacityMl = crateLitres * 1000;
    const bottles = Math.floor(capacityMl / bottleVolume);
    const usedMl = bottles * bottleVolume;
    const remainingMl = capacityMl - usedMl;

    return psQ(
      'geometryMeasurement',
      s,
      `A container has capacity ${crateLitres} L. It is filled with identical ${bottleVolume} mL bottles standing upright. Ignoring the bottle material, what unused capacity remains in millilitres after the maximum whole number of bottles is packed?`,
      remainingMl,
      'Convert litres to millilitres, find the maximum whole number of bottles, then subtract their total volume.'
    );
  }

  const carton = [24, 18, 12];
  const packOptions = [
    [8, 6, 4],
    [9, 6, 4],
    [12, 6, 3],
    [6, 6, 4]
  ];
  const pack = pick(packOptions);
  const orientations = [
    [pack[0], pack[1], pack[2]],
    [pack[0], pack[2], pack[1]],
    [pack[1], pack[0], pack[2]],
    [pack[1], pack[2], pack[0]],
    [pack[2], pack[0], pack[1]],
    [pack[2], pack[1], pack[0]]
  ];
  const counts = orientations.map(dimensions =>
    Math.floor(carton[0] / dimensions[0]) *
    Math.floor(carton[1] / dimensions[1]) *
    Math.floor(carton[2] / dimensions[2])
  );
  const maximum = Math.max(...counts);

  return psQ(
    'geometryMeasurement',
    s,
    `A carton measures ${carton[0]} cm by ${carton[1]} cm by ${carton[2]} cm. Each product pack measures ${pack[0]} cm by ${pack[1]} cm by ${pack[2]} cm and may be turned to any orientation. What is the maximum number of packs that can fit in a simple rectangular arrangement?`,
    maximum,
    'Compare the possible orientations and choose the arrangement with the greatest whole-number fit.'
  );
}

function psGenAngleReasoning() {
  const s = chooseProblemStructure();
  const type = randInt(1, 10);

  // 1. Angles on a straight line
  if (type === 1) {
    if (s === 'basic') {
      const known = randInt(35, 145);

      return psQ(
        'angleReasoning',
        s,
        `A side road meets a straight highway. One angle at the junction is ${known}°. What is the adjacent angle on the straight line?`,
        180 - known,
        'Adjacent angles on a straight line total 180°.'
      );
    }

    if (s === 'multi') {
      const first = randInt(25, 70);
      const second = randInt(30, 85);
      const third = 180 - first - second;
      if (third <= 15) return psGenAngleReasoning();

      return psQ(
        'angleReasoning',
        s,
        `Three adjacent loading-bay lanes meet along the same straight boundary. Two of the angles are ${first}° and ${second}°. What is the third angle?`,
        third,
        'Add the two known adjacent angles, then subtract their total from 180°.'
      );
    }

    const ratio = pick([[1, 2], [1, 3], [2, 3], [2, 7], [3, 7], [4, 5]]);
    const unit = 180 / (ratio[0] + ratio[1]);

    return psQ(
      'angleReasoning',
      s,
      `A divider splits a straight angle into two adjacent angles in the ratio ${ratio[0]}:${ratio[1]}. What is the larger angle?`,
      Math.max(ratio[0], ratio[1]) * unit,
      'The two ratio parts together represent 180°. Find one part, then calculate the larger angle.'
    );
  }

  // 2. Vertically opposite angles
  if (type === 2) {
    if (s === 'basic') {
      const known = randInt(30, 150);

      return psQ(
        'angleReasoning',
        s,
        `Two support bars cross. One angle at the crossing is ${known}°. What is the vertically opposite angle?`,
        known,
        'Vertically opposite angles are equal.'
      );
    }

    if (s === 'multi') {
      const whole = randInt(70, 145);
      const part = randInt(20, whole - 20);

      return psQ(
        'angleReasoning',
        s,
        `Two beams cross, creating a ${whole}° angle. The vertically opposite angle is divided into two smaller angles. One is ${part}°. What is the other smaller angle?`,
        whole - part,
        'First use vertically opposite angles to copy the whole angle, then subtract the known part.'
      );
    }

    const x = randInt(12, 35);
    const firstCoefficient = randInt(2, 4);
    const secondCoefficient = firstCoefficient + randInt(1, 3);
    const firstConstant = randInt(4, 20);
    const angle = firstCoefficient * x + firstConstant;
    const secondConstant = angle - secondCoefficient * x;
    if (angle <= 20 || angle >= 160 || secondConstant === 0) return psGenAngleReasoning();
    const secondExpression = secondConstant > 0
      ? `${secondCoefficient}x + ${secondConstant}`
      : `${secondCoefficient}x − ${Math.abs(secondConstant)}`;

    return psQ(
      'angleReasoning',
      s,
      `At the crossing of two structural braces, one angle is labelled ${firstCoefficient}x + ${firstConstant} degrees and its vertically opposite angle is labelled ${secondExpression} degrees. What is the size of either angle?`,
      angle,
      'Vertically opposite angles are equal. Form an equation, solve for x, then calculate the angle.'
    );
  }

  // 3. Angles around a point
  if (type === 3) {
    if (s === 'basic') {
      const pieces = pick([3, 4, 5, 6, 8, 9, 10, 12]);

      return psQ(
        'angleReasoning',
        s,
        `${pieces} identical paving pieces meet at one point with no gaps. What angle must each piece have at that point?`,
        360 / pieces,
        'Angles around one point total 360°.'
      );
    }

    if (s === 'multi') {
      const first = randInt(45, 110);
      const second = randInt(40, 100);
      const third = randInt(35, 95);
      const missing = 360 - first - second - third;
      if (missing <= 20 || missing >= 170) return psGenAngleReasoning();

      return psQ(
        'angleReasoning',
        s,
        `Four paths meet at a central marker. Three of the angles are ${first}°, ${second}° and ${third}°. What is the fourth angle?`,
        missing,
        'Add the three known angles and subtract their total from 360°.'
      );
    }

    const ratio = pick([[1, 2, 3, 4], [2, 3, 4, 6], [1, 3, 4, 7], [2, 4, 5, 7]]);
    const sum = ratio.reduce((total, value) => total + value, 0);
    const unit = 360 / sum;

    return psQ(
      'angleReasoning',
      s,
      `Four garden sections meet at one point. Their angles are in the ratio ${ratio.join(':')}. What is the largest angle?`,
      Math.max(...ratio) * unit,
      'The ratio represents all 360° around the point. Find one ratio part, then calculate the largest section.'
    );
  }

  // 4. Triangle interior angles
  if (type === 4) {
    if (s === 'basic') {
      const first = randInt(35, 75);
      const second = randInt(35, 75);
      const third = 180 - first - second;
      if (third <= 20) return psGenAngleReasoning();

      return psQ(
        'angleReasoning',
        s,
        `A triangular roof frame has two interior angles of ${first}° and ${second}°. What is the third interior angle?`,
        third,
        'The three interior angles of a triangle total 180°.'
      );
    }

    if (s === 'multi') {
      const smaller = randInt(30, 55);
      const difference = pick([10, 15, 20, 25]);
      const larger = smaller + difference;
      const third = 180 - smaller - larger;
      if (third <= 25) return psGenAngleReasoning();

      return psQ(
        'angleReasoning',
        s,
        `In a triangular display stand, one angle is ${difference}° larger than a second angle. The third angle is ${third}°. What is the larger of the first two angles?`,
        larger,
        'Subtract the known third angle from 180°, then split the remainder into two angles with the stated difference.'
      );
    }

    const first = randInt(25, 35);
    const firstDifference = randInt(8, 16);
    const second = first + firstDifference;
    const third = 180 - first - second;
    const secondDifference = third - second;
    if (secondDifference <= 10) return psGenAngleReasoning();

    return psQ(
      'angleReasoning',
      s,
      `The three angles of a triangular frame follow these rules: the second angle is ${firstDifference}° larger than the first, and the third angle is ${secondDifference}° larger than the second. What is the largest angle?`,
      third,
      'Represent the first angle with a variable, use the two stated differences, and make the three angles total 180°.'
    );
  }

  // 5. Quadrilateral interior angles
  if (type === 5) {
    if (s === 'basic') {
      const first = randInt(70, 115);
      const second = randInt(70, 115);
      const third = randInt(70, 115);
      const fourth = 360 - first - second - third;
      if (fourth <= 30 || fourth >= 160) return psGenAngleReasoning();

      return psQ(
        'angleReasoning',
        s,
        `A four-sided courtyard has three interior angles of ${first}°, ${second}° and ${third}°. What is the fourth interior angle?`,
        fourth,
        'The interior angles of a quadrilateral total 360°.'
      );
    }

    if (s === 'multi') {
      const first = randInt(65, 105);
      const second = randInt(65, 105);
      const equal = (360 - first - second) / 2;
      if (!Number.isInteger(equal) || equal <= 35 || equal >= 145) return psGenAngleReasoning();

      return psQ(
        'angleReasoning',
        s,
        `A kite-shaped frame has two equal interior angles. The other two interior angles are ${first}° and ${second}°. What is the size of each equal angle?`,
        equal,
        'Subtract the two known angles from 360°, then divide the remainder equally.'
      );
    }

    const x = randInt(40, 58);
    const difference = pick([10, 20, 30]);
    const fixed = 360 - (x + (x + difference) + 2 * x);
    if (fixed <= 35 || fixed >= 145) return psGenAngleReasoning();

    return psQ(
      'angleReasoning',
      s,
      `A four-sided display has interior angles described as x°, (x + ${difference})°, 2x° and ${fixed}°. What is its largest interior angle?`,
      Math.max(x, x + difference, 2 * x, fixed),
      'Use the 360° quadrilateral angle sum to solve for x, then compare the four angles.'
    );
  }

  // 6. Polygon interior angles
  if (type === 6) {
    if (s === 'basic') {
      const sides = pick([5, 6, 7, 8, 9, 10, 12]);

      return psQ(
        'angleReasoning',
        s,
        `A ${sides}-sided display frame is divided into triangles from one corner. What is the total of its interior angles?`,
        (sides - 2) * 180,
        'An n-sided polygon has an interior-angle sum of (n − 2) × 180°.'
      );
    }

    if (s === 'multi') {
      const sides = pick([5, 6, 8, 9, 10, 12]);
      const interior = ((sides - 2) * 180) / sides;

      return psQ(
        'angleReasoning',
        s,
        `A regular ${sides}-sided sign uses identical corner joints. What interior angle must each joint form?`,
        interior,
        'Find the total interior-angle sum, then divide equally among the corners.'
      );
    }

    const sides = pick([5, 6, 7, 8, 9, 10, 12]);
    const total = (sides - 2) * 180;

    return psQ(
      'angleReasoning',
      s,
      `The interior angles of a display frame total ${total}°. The frame has at least five sides. How many sides does it have?`,
      sides,
      'Reverse the polygon angle-sum rule: divide by 180°, then add 2.'
    );
  }

  // 7. Angles in parallel lines
  if (type === 7) {
    if (s === 'basic') {
      const angle = randInt(35, 75);

      return psQ(
        'angleReasoning',
        s,
        `Two parallel fence rails are crossed by a support bar. One acute angle is ${angle}°. What is the equal alternate interior angle at the other rail?`,
        angle,
        'Alternate interior angles between parallel lines are equal.'
      );
    }

    if (s === 'multi') {
      const acute = randInt(35, 75);

      return psQ(
        'angleReasoning',
        s,
        `A diagonal brace crosses two parallel beams. It forms an acute angle of ${acute}° with the lower beam. What obtuse angle does it form with the upper beam on the same side of the brace?`,
        180 - acute,
        'Use the equal corresponding angle, then find its supplementary adjacent angle.'
      );
    }

    const first = randInt(30, 70);
    const second = randInt(25, 65);
    const missing = 180 - first - second;
    if (missing <= 20) return psGenAngleReasoning();

    return psQ(
      'angleReasoning',
      s,
      `Two parallel beams are crossed by two braces that meet between them, forming a triangle. One brace makes an angle of ${first}° with the upper beam, and the other makes an angle of ${second}° with the lower beam. Using alternate interior angles, what is the angle where the two braces meet?`,
      missing,
      'Transfer both given angles into the triangle using parallel-line relationships, then use the triangle angle sum.'
    );
  }

  // 8. Exterior angles
  if (type === 8) {
    if (s === 'basic') {
      const interior = randInt(35, 145);

      return psQ(
        'angleReasoning',
        s,
        `At one corner of a triangular sign, the interior angle is ${interior}°. What is the adjacent exterior angle on the extended side?`,
        180 - interior,
        'An interior angle and its adjacent exterior angle form a straight line.'
      );
    }

    if (s === 'multi') {
      const sides = pick([4, 5, 6, 8, 9, 10, 12, 15]);
      const exterior = 360 / sides;

      return psQ(
        'angleReasoning',
        s,
        `Each exterior turning angle of a regular frame is ${exterior}°. How many sides does the frame have?`,
        sides,
        'The exterior angles of a polygon total 360°. Divide 360° by one exterior angle.'
      );
    }

    const known = [randInt(45, 90), randInt(45, 90), randInt(45, 90), randInt(45, 90)];
    const missingExterior = 360 - known.reduce((total, value) => total + value, 0);
    if (missingExterior <= 20 || missingExterior >= 150) return psGenAngleReasoning();

    return psQ(
      'angleReasoning',
      s,
      `A five-sided walking route has exterior turning angles of ${known[0]}°, ${known[1]}°, ${known[2]}°, ${known[3]}° and one unknown angle. What is the interior angle at the corner with the unknown exterior angle?`,
      180 - missingExterior,
      'First use the 360° exterior-angle sum to find the missing exterior angle, then subtract it from 180°.'
    );
  }

  // 9. Isosceles triangles
  if (type === 9) {
    if (s === 'basic') {
      const apex = pick([20, 30, 40, 50, 60, 70, 80]);

      return psQ(
        'angleReasoning',
        s,
        `An isosceles roof truss has a top angle of ${apex}°. What is the size of each equal base angle?`,
        (180 - apex) / 2,
        'Subtract the top angle from 180°, then divide the remainder equally.'
      );
    }

    if (s === 'multi') {
      const base = randInt(40, 75);
      const exterior = 180 - base;
      const apex = 180 - 2 * base;

      return psQ(
        'angleReasoning',
        s,
        `At one base corner of an isosceles triangular frame, the exterior angle is ${exterior}°. What is the angle at the top of the frame?`,
        apex,
        'Find the adjacent base interior angle, copy it to the other base, then subtract both from 180°.'
      );
    }

    const ratio = pick([[2, 1], [4, 1], [5, 2], [7, 4]]);
    const unit = 180 / (2 * ratio[0] + ratio[1]);
    const base = ratio[0] * unit;
    const apex = ratio[1] * unit;

    return psQ(
      'angleReasoning',
      s,
      `In an isosceles triangular support, each base angle and the top angle are in the ratio ${ratio[0]}:${ratio[1]}. What is the top angle?`,
      apex,
      'There are two equal base-angle parts and one top-angle part. Make their total 180°.'
    );
  }

  // 10. Shape division and multi-step angle reasoning
  if (s === 'basic') {
    const a = randInt(35, 70);
    const b = randInt(35, 70);
    const c = randInt(30, 65);
    const d = randInt(30, 65);
    const corner = (180 - a - b) + (180 - c - d);
    if (corner <= 25 || corner >= 170) return psGenAngleReasoning();

    return psQ(
      'angleReasoning',
      s,
      `A diagonal divides a four-sided frame into two triangles. At one shared corner, the two triangle angles combine to form the full corner angle. In the first triangle, the other two angles are ${a}° and ${b}°. In the second triangle, the other two angles are ${c}° and ${d}°. What is the full angle at the shared corner?`,
      corner,
      'Find the missing angle in each triangle, then add the two angles at the shared corner.'
    );
  }

  if (s === 'multi') {
    const first = randInt(35, 70);
    const second = randInt(35, 70);
    const third = 180 - first - second;
    const exterior = 180 - third;

    return psQ(
      'angleReasoning',
      s,
      `A triangular section of a frame has two interior angles of ${first}° and ${second}°. At the third corner, the side is extended to form an exterior angle. What is that exterior angle?`,
      exterior,
      'Find the third interior angle, then subtract it from 180° to obtain the exterior angle.'
    );
  }

  const crossing = randInt(45, 95);
  const second = randInt(30, 70);
  const thirdInterior = 180 - crossing - second;
  if (thirdInterior <= 20) return psGenAngleReasoning();
  const exterior = 180 - thirdInterior;

  return psQ(
    'angleReasoning',
    s,
    `Two support bars cross inside a triangular frame. One angle at the crossing is ${crossing}°. Its vertically opposite angle lies inside the triangle. A second interior angle of the triangle is ${second}°. At the third vertex, the interior angle and an exterior angle form a straight line. What is the exterior angle?`,
    exterior,
    'Use vertically opposite angles, then the triangle angle sum, and finally the straight-line angle rule.'
  );
}
function psGenPythagorasTrig() {
  const s = chooseProblemStructure();
  const type = randInt(1, 7);
  const rightTriples = [
    [3, 4, 5],
    [5, 12, 13],
    [6, 8, 10],
    [8, 15, 17],
    [7, 24, 25],
    [9, 12, 15]
  ];
  const degreeAngles = [20, 25, 30, 35, 40, 45, 50, 55, 60];
  const twoDp = value => roundTo(value, 2);
  const toRadians = degrees => degrees * Math.PI / 180;
  const toDegrees = radians => radians * 180 / Math.PI;

  // 1. Find a missing side in a right triangle
  if (type === 1) {
    if (s === 'basic') {
      const triple = pick(rightTriples);
      const scale = randInt(1, 4);

      if (chance(0.5)) {
        return psQ(
          'pythagorasTrig',
          s,
          `A rectangular safety frame is ${triple[0] * scale} m wide and ${triple[1] * scale} m high. What is the length of its diagonal brace?`,
          triple[2] * scale,
          'Treat the width and height as the perpendicular sides and use Pythagoras.'
        );
      }

      return psQ(
        'pythagorasTrig',
        s,
        `A support cable is ${triple[2] * scale} m long and reaches the top of a vertical post. Its ground anchor is ${triple[0] * scale} m from the post. How high is the post?`,
        triple[1] * scale,
        'The cable is the hypotenuse. Use Pythagoras to find the missing vertical side.'
      );
    }

    if (s === 'multi') {
      const width = randInt(5, 14);
      const height = randInt(6, 16);
      const diagonal = twoDp(Math.sqrt(width ** 2 + height ** 2));
      const costPerMetre = randInt(6, 15);
      const cost = twoDp(diagonal * costPerMetre);

      return psQ(
        'pythagorasTrig',
        s,
        `A rectangular display frame is ${width} m wide and ${height} m high. A diagonal support is fitted from one corner to the opposite corner and costs $${costPerMetre} per metre. What is the cost of the support, to 2 decimal places? You may use a calculator.`,
        cost,
        'Find the diagonal using Pythagoras, multiply by the cost per metre, then round the final cost to 2 decimal places.'
      );
    }

    const cable = randInt(12, 24);
    const height = randInt(5, cable - 3);
    const requiredDistance = twoDp(Math.sqrt(cable ** 2 - height ** 2));
    const availableDistance = requiredDistance + pick([-2.5, -1.5, 1.5, 2.5, 3.5]);

    if (availableDistance <= 0) return psGenPythagorasTrig();

    return psQ(
      'pythagorasTrig',
      s,
      `A ${cable} m support cable must reach a point ${height} m up a pole. The ground anchor may be placed at most ${twoDp(availableDistance)} m from the pole. By how many metres is the available distance greater than or less than the required distance? Enter a positive number if there is spare distance and a negative number if the site is too short. Give your answer to 2 decimal places. You may use a calculator.`,
      twoDp(availableDistance - requiredDistance),
      'Use Pythagoras to find the required horizontal distance, then subtract it from the available distance.'
    );
  }

  // 2. Test whether side lengths form a right triangle
  if (type === 2) {
    if (s === 'basic') {
      const triple = pick(rightTriples);
      const scale = randInt(1, 3);
      const isRight = chance(0.6);
      const longest = isRight
        ? triple[2] * scale
        : triple[2] * scale + pick([1, 2, 3]);

      return psQ(
        'pythagorasTrig',
        s,
        `A triangular frame has side lengths ${triple[0] * scale} m, ${triple[1] * scale} m and ${longest} m. Does it contain a right angle? Enter 1 for Yes or 0 for No.`,
        isRight ? 1 : 0,
        'Square the longest side and compare it with the sum of the squares of the other two sides.'
      );
    }

    if (s === 'multi') {
      const triple = pick(rightTriples);
      const scale = randInt(1, 3);
      const correct = [triple[0] * scale, triple[1] * scale, triple[2] * scale];
      const wrong1 = [correct[0], correct[1], correct[2] + 2];
      const wrong2 = [correct[0] + 1, correct[1], correct[2]];
      const options = [correct, wrong1, wrong2].sort(() => Math.random() - 0.5);
      const correctOption = options.findIndex(option =>
        option[0] ** 2 + option[1] ** 2 === option[2] ** 2
      ) + 1;

      return psQ(
        'pythagorasTrig',
        s,
        `A builder must choose a triangular brace that contains a right angle. Option 1 has side lengths ${options[0].join(', ')} m. Option 2 has side lengths ${options[1].join(', ')} m. Option 3 has side lengths ${options[2].join(', ')} m. Which option should be chosen? Enter 1, 2 or 3.`,
        correctOption,
        'Test each set by comparing the square of its longest side with the sum of the other two squares.'
      );
    }

    const candidateSets = [
      [6, 8, 10],
      [7, 9, 12],
      [9, 12, 15],
      [8, 10, 13]
    ];
    const maximumPerimeter = pick([28, 32, 38, 42]);
    const usableCount = candidateSets.filter(set => {
      const [a, b, c] = set;
      return a ** 2 + b ** 2 === c ** 2
        && a + b + c <= maximumPerimeter;
    }).length;

    return psQ(
      'pythagorasTrig',
      s,
      `A workshop has four triangular frame designs with side lengths 6, 8, 10 m; 7, 9, 12 m; 9, 12, 15 m; and 8, 10, 13 m. A design is usable only if it contains a right angle and its perimeter is no more than ${maximumPerimeter} m. How many designs are usable?`,
      usableCount,
      'First test each design using the converse of Pythagoras, then apply the perimeter limit.'
    );
  }

  // 3. Ladders, ramps and diagonals
  if (type === 3) {
    if (s === 'basic') {
      const triple = pick(rightTriples);
      const scale = randInt(1, 4);
      const context = pick(['ladder', 'ramp', 'diagonal path']);

      if (context === 'ladder') {
        return psQ(
          'pythagorasTrig',
          s,
          `A ladder reaches ${triple[1] * scale} m up a wall and its foot is ${triple[0] * scale} m from the wall. How long is the ladder?`,
          triple[2] * scale,
          'The wall and ground form the perpendicular sides of a right triangle.'
        );
      }

      if (context === 'ramp') {
        return psQ(
          'pythagorasTrig',
          s,
          `A ramp rises ${triple[0] * scale} m over a horizontal distance of ${triple[1] * scale} m. What is the sloping length of the ramp?`,
          triple[2] * scale,
          'Use the rise and horizontal run as the perpendicular sides.'
        );
      }

      return psQ(
        'pythagorasTrig',
        s,
        `A rectangular park is ${triple[0] * scale} m by ${triple[1] * scale} m. How long is the diagonal path between opposite corners?`,
        triple[2] * scale,
        'The diagonal is the hypotenuse of a right triangle.'
      );
    }

    if (s === 'multi') {
      const rise = randInt(2, 7);
      const run = randInt(6, 15);
      const rampLength = twoDp(Math.sqrt(rise ** 2 + run ** 2));
      const width = pick([1.2, 1.5, 1.8, 2]);
      const surfaceArea = twoDp(rampLength * width);

      return psQ(
        'pythagorasTrig',
        s,
        `A loading ramp rises ${rise} m over a horizontal run of ${run} m. The ramp is ${width} m wide. What area of non-slip material is needed, to 2 decimal places? You may use a calculator.`,
        surfaceArea,
        'Find the sloping ramp length using Pythagoras, then multiply by the width.'
      );
    }

    const ladderLength = randInt(8, 16);
    const wallHeight = randInt(4, ladderLength - 2);
    const groundDistance = Math.sqrt(ladderLength ** 2 - wallHeight ** 2);
    const angle = twoDp(toDegrees(Math.atan(wallHeight / groundDistance)));
    const minimumAngle = pick([65, 68, 70, 72, 75]);

    return psQ(
      'pythagorasTrig',
      s,
      `A ${ladderLength} m ladder reaches ${wallHeight} m up a wall. Safety guidance requires the ladder angle with the ground to be at least ${minimumAngle}°. Calculate the actual angle and enter 1 if the ladder meets the rule or 0 if it does not. You may use a calculator.`,
      angle >= minimumAngle ? 1 : 0,
      'Find the ground distance using Pythagoras, then use an inverse trigonometric ratio to find the ladder angle.'
    );
  }

  // 4. Height and horizontal distance
  if (type === 4) {
    if (s === 'basic') {
      const horizontal = randInt(6, 18);
      const sloping = randInt(horizontal + 2, horizontal + 12);
      const height = twoDp(Math.sqrt(sloping ** 2 - horizontal ** 2));

      return psQ(
        'pythagorasTrig',
        s,
        `A guy wire is ${sloping} m long and is anchored ${horizontal} m from the base of a vertical pole. How high up the pole is it attached? Give your answer to 2 decimal places. You may use a calculator.`,
        height,
        'Use the wire as the hypotenuse and find the missing vertical side.'
      );
    }

    if (s === 'multi') {
      const east = randInt(5, 16);
      const north = randInt(5, 16);
      const direct = twoDp(Math.sqrt(east ** 2 + north ** 2));
      const route = east + north;
      const saving = twoDp(route - direct);

      return psQ(
        'pythagorasTrig',
        s,
        `A surveyor walks ${east} km east and then ${north} km north. How many kilometres shorter would a direct return route be than retracing the two legs? Give your answer to 2 decimal places. You may use a calculator.`,
        saving,
        'Find the direct distance with Pythagoras, then compare it with the two-leg route.'
      );
    }

    const cliffHeight = randInt(18, 45);
    const safeCable = randInt(cliffHeight + 5, cliffHeight + 25);
    const requiredHorizontal = twoDp(Math.sqrt(safeCable ** 2 - cliffHeight ** 2));
    const boundary = twoDp(requiredHorizontal + pick([-3, -2, 2, 3, 4]));

    if (boundary <= 0) return psGenPythagorasTrig();

    return psQ(
      'pythagorasTrig',
      s,
      `A safety cable of length ${safeCable} m must reach from the top of a ${cliffHeight} m vertical face to a ground anchor. The site boundary is ${boundary} m from the base. By how many metres does the boundary exceed or fall short of the required horizontal distance? Enter a positive value for spare space or a negative value for a shortage. Give your answer to 2 decimal places. You may use a calculator.`,
      twoDp(boundary - requiredHorizontal),
      'Use Pythagoras to find the required ground distance, then compare it with the boundary.'
    );
  }

  // 5. Angles of elevation and depression
  if (type === 5) {
    if (s === 'basic') {
      const distance = randInt(8, 30);
      const angle = pick([25, 30, 35, 40, 45, 50]);
      const eyeHeight = pick([1.4, 1.5, 1.6, 1.7]);
      const height = twoDp(distance * Math.tan(toRadians(angle)) + eyeHeight);

      return psQ(
        'pythagorasTrig',
        s,
        `A student stands ${distance} m from a tree. The angle of elevation from an eye height of ${eyeHeight} m to the top is ${angle}°. What is the total height of the tree, to 2 decimal places? You may use a calculator.`,
        height,
        'Use tangent to find the height above eye level, then add the eye height.'
      );
    }

    if (s === 'multi') {
      const height = randInt(18, 50);
      const angle = pick([20, 25, 30, 35, 40, 45]);
      const distance = twoDp(height / Math.tan(toRadians(angle)));

      return psQ(
        'pythagorasTrig',
        s,
        `From the top of a ${height} m lighthouse, the angle of depression to a boat is ${angle}°. How far is the boat horizontally from the base of the lighthouse? Give your answer to 2 decimal places. You may use a calculator.`,
        distance,
        'The angle of depression equals the angle of elevation from the boat. Use tangent with the lighthouse height.'
      );
    }

    const towerHeight = randInt(25, 60);
    const nearDistance = randInt(15, 35);
    const farDistance = nearDistance + randInt(8, 25);
    const nearAngle = twoDp(toDegrees(Math.atan(towerHeight / nearDistance)));
    const farAngle = twoDp(toDegrees(Math.atan(towerHeight / farDistance)));

    return psQ(
      'pythagorasTrig',
      s,
      `Two observers stand on the same straight, level line from a ${towerHeight} m tower. One is ${nearDistance} m from the tower and the other is ${farDistance} m away. By how many degrees is the nearer observer's angle of elevation greater than the farther observer's angle? Give your answer to 2 decimal places. You may use a calculator.`,
      nearAngle - farAngle,
      'Find both angles using inverse tangent, subtract them, then round the final difference to 2 decimal places.'
    );
  }

  // 6. Simple trigonometric ratios and inverse trigonometry
  if (type === 6) {
    if (s === 'basic') {
      const angle = pick(degreeAngles);
      const hypotenuse = randInt(8, 24);
      const opposite = twoDp(hypotenuse * Math.sin(toRadians(angle)));

      return psQ(
        'pythagorasTrig',
        s,
        `A support beam is ${hypotenuse} m long and makes an angle of ${angle}° with level ground. What vertical height does it reach? Give your answer to 2 decimal places. You may use a calculator.`,
        opposite,
        'Use sine because the vertical height is opposite the angle and the beam is the hypotenuse.'
      );
    }

    if (s === 'multi') {
      const opposite = randInt(4, 15);
      const adjacent = randInt(6, 22);
      const angle = twoDp(toDegrees(Math.atan(opposite / adjacent)));

      return psQ(
        'pythagorasTrig',
        s,
        `A roof rises ${opposite} m over a horizontal run of ${adjacent} m. What angle does the roof make with the horizontal? Give your answer to 2 decimal places. You may use a calculator.`,
        angle,
        'Use inverse tangent because the rise and horizontal run are known.'
      );
    }

    const angleA = pick([20, 25, 30, 35]);
    const angleB = angleA + pick([5, 10, 15]);
    const run = randInt(8, 20);
    const heightA = twoDp(run * Math.tan(toRadians(angleA)));
    const heightB = twoDp(run * Math.tan(toRadians(angleB)));

    return psQ(
      'pythagorasTrig',
      s,
      `Two ramp designs have the same horizontal run of ${run} m. Design A rises at ${angleA}° and Design B rises at ${angleB}°. How many metres greater is the vertical rise of Design B than Design A? Give your answer to 2 decimal places. You may use a calculator.`,
      twoDp(heightB - heightA),
      'Use tangent to find each vertical rise, then compare the two designs.'
    );
  }

  // 7. Practical measurement and design decisions
  if (s === 'basic') {
    const shadow = randInt(6, 20);
    const angle = pick([25, 30, 35, 40, 45, 50, 55]);
    const height = twoDp(shadow * Math.tan(toRadians(angle)));

    return psQ(
      'pythagorasTrig',
      s,
      `A flagpole casts a ${shadow} m shadow when the angle of elevation of the sun is ${angle}°. Estimate the height of the flagpole to 2 decimal places. You may use a calculator.`,
      height,
      'Use tangent with the shadow as the adjacent side and the flagpole height as the opposite side.'
    );
  }

  if (s === 'multi') {
    const distance = randInt(10, 35);
    const angle = pick([25, 30, 35, 40, 45, 50]);
    const instrumentHeight = pick([1.2, 1.4, 1.5, 1.6]);
    const buildingHeight = twoDp(distance * Math.tan(toRadians(angle)) + instrumentHeight);
    const clearance = twoDp(buildingHeight + pick([1.5, 2, 2.5, 3]));

    return psQ(
      'pythagorasTrig',
      s,
      `A survey instrument ${instrumentHeight} m above the ground is placed ${distance} m from a building. The angle of elevation to the roof is ${angle}°. A crane must clear the roof by ${twoDp(clearance - buildingHeight)} m. What minimum crane height is required, to 2 decimal places? You may use a calculator.`,
      clearance,
      'Use tangent to find the height above the instrument, add the instrument height, then add the required clearance.'
    );
  }

  const run = randInt(8, 16);
  const designAAngle = pick([6, 7, 8, 9, 10]);
  const designBAngle = designAAngle + pick([2, 3, 4]);
  const maximumAngle = pick([8, 9, 10, 11, 12]);
  const riseA = twoDp(run * Math.tan(toRadians(designAAngle)));
  const riseB = twoDp(run * Math.tan(toRadians(designBAngle)));
  const minimumRise = twoDp((riseA + riseB) / 2);
  const validA = designAAngle <= maximumAngle && riseA >= minimumRise;
  const validB = designBAngle <= maximumAngle && riseB >= minimumRise;
  const validCount = Number(validA) + Number(validB);

  return psQ(
    'pythagorasTrig',
    s,
    `Two access-ramp designs each have a horizontal run of ${run} m. Design A has an angle of ${designAAngle}° and Design B has an angle of ${designBAngle}°. A design is acceptable only if its angle is no more than ${maximumAngle}° and its vertical rise is at least ${minimumRise} m. How many designs are acceptable? You may use a calculator.`,
    validCount,
    'Use tangent to calculate each rise, then apply both the maximum-angle and minimum-rise conditions.'
  );
}

function psGenCoordinatesLines() {
  const s = chooseProblemStructure();
  const type = randInt(1, 6);

  // 1. Meeting points and midpoints on a map
  if (type === 1) {
    const x1 = randInt(-8, 2);
    const y1 = randInt(-8, 2);
    const x2 = x1 + 2 * randInt(2, 6);
    const y2 = y1 + 2 * randInt(2, 6);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    if (s === 'basic') {
      return psQ(
        'coordinatesLines',
        s,
        `On a town map, two schools are at (${x1}, ${y1}) and (${x2}, ${y2}). A shared bus stop is placed halfway between them. What is the x-coordinate of the bus stop?`,
        midX,
        'Average the two x-coordinates.'
      );
    }

    if (s === 'multi') {
      const shift = randInt(2, 6);

      return psQ(
        'coordinatesLines',
        s,
        `Two emergency stations are at (${x1}, ${y1}) and (${x2}, ${y2}). A supply point is first placed halfway between them, then moved ${shift} units east. What is its final x-coordinate?`,
        midX + shift,
        'Find the midpoint x-coordinate, then add the eastward movement.'
      );
    }

    const shiftX = randInt(-5, 5);
    const shiftY = randInt(-5, 5);

    return psQ(
      'coordinatesLines',
      s,
      `A meeting point is halfway between locations (${x1}, ${y1}) and (${x2}, ${y2}). The entire map is then translated by (${shiftX}, ${shiftY}). What is the new y-coordinate of the meeting point?`,
      midY + shiftY,
      'Find the midpoint y-coordinate, then apply the vertical part of the translation.'
    );
  }

  // 2. Gradients of roads, ramps and tracks
  if (type === 2) {
    const gradient = pick([-4, -3, -2, 2, 3, 4]);
    const x1 = randInt(-4, 4);
    const y1 = randInt(-6, 6);
    const dx = pick([1, 2, 3]);
    const x2 = x1 + dx;
    const y2 = y1 + gradient * dx;

    if (s === 'basic') {
      return psQ(
        'coordinatesLines',
        s,
        `On a site plan, a straight access road passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is the road's gradient?`,
        gradient,
        'Divide the change in vertical coordinate by the change in horizontal coordinate.'
      );
    }

    if (s === 'multi') {
      const extraRun = randInt(2, 5);

      return psQ(
        'coordinatesLines',
        s,
        `A straight ramp passes through (${x1}, ${y1}) and (${x2}, ${y2}). If the same gradient continues for another ${extraRun} horizontal units, how much additional vertical change will occur?`,
        gradient * extraRun,
        'Find the gradient, then multiply it by the additional horizontal run.'
      );
    }

    const limit = Math.abs(gradient) + randInt(1, 3);

    return psQ(
      'coordinatesLines',
      s,
      `A planned road passes through (${x1}, ${y1}) and (${x2}, ${y2}). The design limit allows a gradient magnitude of at most ${limit}. By how much is the road's gradient magnitude below the limit?`,
      limit - Math.abs(gradient),
      'Calculate the gradient magnitude, then compare it with the permitted limit.'
    );
  }

  // 3. Intersections of routes
  if (type === 3) {
    const m1 = pick([1, 2, 3, 4]);
    const m2 = pick([-1, -2, -3]);
    const x = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
    const c1 = randInt(-6, 8);
    const y = m1 * x + c1;
    const c2 = y - m2 * x;

    if (s === 'basic') {
      return psQ(
        'coordinatesLines',
        s,
        `Two delivery routes on a coordinate map follow ${psFormatAppliedLine(m1, c1)} and ${psFormatAppliedLine(m2, c2)}. At what x-coordinate do the routes meet?`,
        x,
        'At the meeting point, both route equations have the same y-value.'
      );
    }

    if (s === 'multi') {
      const eastShift = randInt(1, 5);

      return psQ(
        'coordinatesLines',
        s,
        `Two service routes meet where ${psFormatAppliedLine(m1, c1)} and ${psFormatAppliedLine(m2, c2)}. A depot is built ${eastShift} units east of that meeting point. What is the depot's x-coordinate?`,
        x + eastShift,
        'Find the route intersection x-coordinate, then add the eastward shift.'
      );
    }

    const costPerUnit = randInt(3, 8);

    return psQ(
      'coordinatesLines',
      s,
      `Two planned pipelines meet where ${psFormatAppliedLine(m1, c1)} and ${psFormatAppliedLine(m2, c2)}. Surveying from x = 0 to the meeting x-coordinate costs $${costPerUnit} per horizontal unit. What is the total surveying cost?`,
      Math.abs(x) * costPerUnit,
      'Find the intersection x-coordinate, use its distance from zero, then multiply by the cost per unit.'
    );
  }

  // 4. Fixed-fee models represented by lines
  if (type === 4) {
    const rateA = randInt(2, 6);
    const rateB = randInt(rateA + 1, rateA + 5);
    const breakEvenTrips = randInt(4, 12);
    const fixedA = randInt(15, 45);
    const fixedB = fixedA + (rateB - rateA) * breakEvenTrips;

    if (s === 'basic') {
      return psQ(
        'coordinatesLines',
        s,
        `Delivery Plan A costs $${fixedA} plus $${rateA} per trip. Plan B costs $${fixedB} plus $${rateB} per trip. After how many trips are the total costs equal?`,
        breakEvenTrips,
        'Set the two linear cost expressions equal and solve for the number of trips.'
      );
    }

    if (s === 'multi') {
      const extraTrips = randInt(1, 5);
      const trips = breakEvenTrips + extraTrips;
      const saving = (fixedB + rateB * trips) - (fixedA + rateA * trips);

      return psQ(
        'coordinatesLines',
        s,
        `Plan A costs $${fixedA} plus $${rateA} per trip. Plan B costs $${fixedB} plus $${rateB} per trip. At ${trips} trips, how much cheaper is the less expensive plan?`,
        Math.abs(saving),
        'Calculate both plan costs at the stated number of trips, then compare them.'
      );
    }

    const trips = breakEvenTrips + randInt(2, 6);
    const totalA = fixedA + rateA * trips;
    const totalB = fixedB + rateB * trips;

    return psQ(
      'coordinatesLines',
      s,
      `Two courier costs are represented by C = ${fixedA} + ${rateA}n and C = ${fixedB} + ${rateB}n, where n is the number of deliveries. For ${trips} deliveries, what is the difference between the two costs?`,
      Math.abs(totalA - totalB),
      'Evaluate both linear models for the same delivery number and compare.'
    );
  }

  // 5. Parallel and perpendicular routes
  if (type === 5) {
    const gradient = pick([-4, -3, -2, -1, 1, 2, 3, 4]);

    if (s === 'basic') {
      return psQ(
        'coordinatesLines',
        s,
        `A new cycle path must be parallel to a road with gradient ${gradient}. What gradient must the cycle path have?`,
        gradient,
        'Parallel lines have equal gradients.'
      );
    }

    if (s === 'multi') {
      const x = randInt(-5, 6);
      const y = randInt(-8, 8);
      const c = y - gradient * x;

      return psQ(
        'coordinatesLines',
        s,
        `A pipeline must be parallel to a route of gradient ${gradient} and pass through (${x}, ${y}). In the model ${psFormatAppliedLine(gradient, 0)} + c, what is c?`,
        c,
        'Substitute the point into the line equation and solve for the intercept.'
      );
    }

    const x = randInt(-4, 5);
    const y = randInt(-6, 8);
    const c = y - gradient * x;
    const targetX = x + randInt(2, 6);

    return psQ(
      'coordinatesLines',
      s,
      `A straight service road has gradient ${gradient} and passes through (${x}, ${y}). If it continues to x = ${targetX}, what will its y-coordinate be?`,
      gradient * targetX + c,
      'Use the known point to find the line equation, then substitute the new x-coordinate.'
    );
  }

  // 6. Coordinate movement and planning
  if (s === 'basic') {
    const x = randInt(-8, 8);
    const y = randInt(-8, 8);
    const east = randInt(2, 7);

    return psQ(
      'coordinatesLines',
      s,
      `A survey marker at (${x}, ${y}) is moved ${east} units east. What is its new x-coordinate?`,
      x + east,
      'Moving east increases the x-coordinate.'
    );
  }

  if (s === 'multi') {
    const x = randInt(-8, 8);
    const y = randInt(-8, 8);
    const east = randInt(2, 7);
    const north = randInt(2, 7);

    return psQ(
      'coordinatesLines',
      s,
      `A mobile clinic starts at (${x}, ${y}), moves ${east} units east and then ${north} units north. What is its final y-coordinate?`,
      y + north,
      'Only the northward movement changes the y-coordinate.'
    );
  }

  const startX = randInt(-8, 0);
  const startY = randInt(-8, 0);
  const endX = startX + randInt(5, 12);
  const endY = startY + randInt(5, 12);
  const midpointX = (startX + endX) / 2;
  const moveWest = randInt(1, 4);

  return psQ(
    'coordinatesLines',
    s,
    `A temporary depot is placed halfway between (${startX}, ${startY}) and (${endX}, ${endY}), then shifted ${moveWest} units west. What is its final x-coordinate?`,
    midpointX - moveWest,
    'Find the midpoint x-coordinate, then subtract the westward movement.'
  );
}

function psGenSequences() {
  const s = chooseProblemStructure();
  const type = randInt(1, 7);

  // 1. Theatre and stadium seating
  if (type === 1) {
    if (s === 'basic') {
      const first = randInt(12, 25);
      const increase = randInt(2, 6);

      return psQ(
        'sequences',
        s,
        `A small theatre has ${first} seats in the first row. Each new row has ${increase} more seats than the row before it. How many seats are in the fourth row?`,
        first + 3 * increase,
        'Increase the seat count by the same amount for each new row.'
      );
    }

    if (s === 'multi') {
      const first = randInt(12, 24);
      const increase = randInt(2, 6);
      const row = randInt(8, 20);

      return psQ(
        'sequences',
        s,
        `A stadium section has ${first} seats in Row 1, and each later row has ${increase} more seats than the previous row. How many seats are in Row ${row}?`,
        first + (row - 1) * increase,
        'Use the first-row count plus one increase for every row after Row 1.'
      );
    }

    const first = randInt(12, 24);
    const increase = randInt(2, 6);
    const targetRow = randInt(8, 20);
    const targetSeats = first + (targetRow - 1) * increase;

    return psQ(
      'sequences',
      s,
      `A stadium section begins with ${first} seats in Row 1 and increases by ${increase} seats per row. Which row contains ${targetSeats} seats?`,
      targetRow,
      'Work backwards from the target number of seats to determine how many increases have occurred.'
    );
  }

  // 2. Tile and block patterns
  if (type === 2) {
    if (s === 'basic') {
      const start = randInt(4, 10);
      const add = randInt(2, 6);

      return psQ(
        'sequences',
        s,
        `A border design uses ${start} tiles in Stage 1 and ${add} additional tiles in every new stage. How many tiles are needed for Stage 5?`,
        start + 4 * add,
        'Stage 5 contains four increases after Stage 1.'
      );
    }

    if (s === 'multi') {
      const start = randInt(4, 10);
      const add = randInt(2, 6);
      const stage = randInt(8, 20);
      const price = randInt(2, 6);
      const tiles = start + (stage - 1) * add;

      return psQ(
        'sequences',
        s,
        `A display pattern uses ${start} tiles in Stage 1 and ${add} more tiles in each later stage. Tiles cost $${price} each. What is the tile cost for Stage ${stage}?`,
        tiles * price,
        'Find the number of tiles in the required stage, then multiply by the cost per tile.'
      );
    }

    const start = randInt(4, 10);
    const add = randInt(2, 6);
    const stage = randInt(8, 20);
    const tiles = start + (stage - 1) * add;
    const available = tiles + randInt(5, 20);

    return psQ(
      'sequences',
      s,
      `A stage pattern starts with ${start} tiles and grows by ${add} tiles each stage. A builder has ${available} tiles. After completing Stage ${stage}, how many tiles remain?`,
      available - tiles,
      'Calculate the tiles required for the stated stage, then subtract from the available amount.'
    );
  }

  // 3. Weekly savings or fundraising
  if (type === 3) {
    if (s === 'basic') {
      const first = randInt(5, 15);
      const increase = randInt(2, 8);

      return psQ(
        'sequences',
        s,
        `A student saves $${first} in Week 1 and increases the weekly saving by $${increase} each week. How much is saved in Week 4?`,
        first + 3 * increase,
        'Add the weekly increase three times after Week 1.'
      );
    }

    if (s === 'multi') {
      const first = randInt(5, 15);
      const increase = randInt(2, 8);
      const week = randInt(8, 18);

      return psQ(
        'sequences',
        s,
        `A fundraiser collects $${first} in Week 1, and the weekly amount increases by $${increase}. How much is collected in Week ${week}?`,
        first + (week - 1) * increase,
        'Use one weekly increase for each week after the first.'
      );
    }

    const first = randInt(5, 15);
    const increase = randInt(2, 8);
    const targetWeek = randInt(8, 18);
    const target = first + (targetWeek - 1) * increase;

    return psQ(
      'sequences',
      s,
      `A club raises $${first} in Week 1 and increases the weekly amount by $${increase}. In which week will the weekly amount first reach $${target}?`,
      targetWeek,
      'Determine how many equal weekly increases are needed to reach the target.'
    );
  }

  // 4. Stacked objects
  if (type === 4) {
    if (s === 'basic') {
      const firstHeight = randInt(8, 18);
      const extraHeight = randInt(2, 6);

      return psQ(
        'sequences',
        s,
        `One stacked display stand is ${firstHeight} cm high. Each additional stand adds ${extraHeight} cm because the stands overlap. How high is a stack of 5 stands?`,
        firstHeight + 4 * extraHeight,
        'The first stand gives the starting height; four more stands add the overlap height.'
      );
    }

    if (s === 'multi') {
      const firstHeight = randInt(8, 18);
      const extraHeight = randInt(2, 6);
      const count = randInt(8, 20);

      return psQ(
        'sequences',
        s,
        `A stack of nested trays is ${firstHeight} cm high with one tray. Each additional tray adds ${extraHeight} cm. What is the height of ${count} trays?`,
        firstHeight + (count - 1) * extraHeight,
        'Start with one tray and add the extra height for every additional tray.'
      );
    }

    const firstHeight = randInt(8, 18);
    const extraHeight = randInt(2, 6);
    const count = randInt(8, 20);
    const height = firstHeight + (count - 1) * extraHeight;

    return psQ(
      'sequences',
      s,
      `A nested-tray stack is ${firstHeight} cm high for one tray, and every extra tray adds ${extraHeight} cm. How many trays are in a stack measuring ${height} cm?`,
      count,
      'Subtract the first-tray height, divide by the extra height, then add one tray.'
    );
  }

  // 5. Fence and post patterns
  if (type === 5) {
    if (s === 'basic') {
      const first = randInt(4, 8);
      const extra = randInt(2, 5);

      return psQ(
        'sequences',
        s,
        `A row of connected garden panels uses ${first} posts for one section. Each extra section needs ${extra} more posts. How many posts are needed for 4 sections?`,
        first + 3 * extra,
        'After the first section, add the same number of posts for each extra section.'
      );
    }

    if (s === 'multi') {
      const first = randInt(4, 8);
      const extra = randInt(2, 5);
      const sections = randInt(8, 20);
      const cost = randInt(3, 9);
      const posts = first + (sections - 1) * extra;

      return psQ(
        'sequences',
        s,
        `A connected fence uses ${first} posts for the first section and ${extra} additional posts for each extra section. Posts cost $${cost} each. What is the post cost for ${sections} sections?`,
        posts * cost,
        'Find the number of posts for the required sections, then multiply by the cost per post.'
      );
    }

    const first = randInt(4, 8);
    const extra = randInt(2, 5);
    const targetSections = randInt(8, 20);
    const targetPosts = first + (targetSections - 1) * extra;

    return psQ(
      'sequences',
      s,
      `A connected fence uses ${first} posts for one section and ${extra} more posts for every additional section. How many sections can be built using exactly ${targetPosts} posts?`,
      targetSections,
      'Work backwards from the total posts to find the number of additional sections.'
    );
  }

  // 6. Production growth
  if (type === 6) {
    if (s === 'basic') {
      const first = randInt(20, 50);
      const increase = randInt(5, 15);

      return psQ(
        'sequences',
        s,
        `A workshop produces ${first} units on Day 1 and ${increase} more units each day. How many units are produced on Day 5?`,
        first + 4 * increase,
        'Day 5 is four equal increases after Day 1.'
      );
    }

    if (s === 'multi') {
      const first = randInt(20, 50);
      const increase = randInt(5, 15);
      const day = randInt(8, 18);
      const rejected = randInt(2, 10);
      const produced = first + (day - 1) * increase;

      return psQ(
        'sequences',
        s,
        `A workshop produces ${first} units on Day 1 and ${increase} more each day. On Day ${day}, ${rejected} units fail inspection. How many acceptable units remain that day?`,
        produced - rejected,
        'Find that day’s production, then subtract the rejected units.'
      );
    }

    const first = randInt(20, 50);
    const increase = randInt(5, 15);
    const targetDay = randInt(8, 18);
    const target = first + (targetDay - 1) * increase;

    return psQ(
      'sequences',
      s,
      `A workshop starts at ${first} units per day and increases daily production by ${increase} units. On which day will daily production reach ${target} units?`,
      targetDay,
      'Find how many equal daily increases are needed to reach the target.'
    );
  }

  // 7. Capacity and first-exceed problems
  if (s === 'basic') {
    const first = randInt(6, 14);
    const increase = randInt(2, 6);

    return psQ(
      'sequences',
      s,
      `A staircase display uses ${first} lights on its first step and ${increase} more lights on each higher step. How many lights are on Step 6?`,
      first + 5 * increase,
      'Step 6 is five increases after Step 1.'
    );
  }

  if (s === 'multi') {
    const first = randInt(6, 14);
    const increase = randInt(2, 6);
    const step = randInt(8, 18);
    const lights = first + (step - 1) * increase;
    const spare = randInt(3, 15);

    return psQ(
      'sequences',
      s,
      `A staircase display uses ${first} lights on Step 1 and ${increase} more lights on each higher step. A box contains ${lights + spare} lights. After preparing Step ${step}, how many lights remain?`,
      spare,
      'Find the lights needed on the required step, then subtract from the box total.'
    );
  }

  const first = randInt(6, 14);
  const increase = randInt(2, 6);
  const exceedStep = randInt(8, 18);
  const previous = first + (exceedStep - 2) * increase;
  const capacity = previous + randInt(0, increase - 1);

  return psQ(
    'sequences',
    s,
    `A display uses ${first} lights on Step 1 and ${increase} more lights on each higher step. The controller can power at most ${capacity} lights on one step. What is the first step that exceeds the controller's capacity?`,
    exceedStep,
    'Find the first term in the pattern that is greater than the capacity.'
  );
}
