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
  const type = randInt(1, 6);

  // 1. Roof and frame angles
  if (type === 1) {
    if (s === 'basic') {
      const left = randInt(35, 70);
      const right = randInt(35, 70);

      return psQ(
        'angleReasoning',
        s,
        `A triangular roof frame has base angles of ${left}° and ${right}°. What angle must be cut at the top joint?`,
        180 - left - right,
        'The three interior angles of the triangular frame total 180°.'
      );
    }

    if (s === 'multi') {
      const base = randInt(35, 70);
      const top = 180 - 2 * base;

      return psQ(
        'angleReasoning',
        s,
        `An isosceles roof truss has two equal base angles. The angle at the top is ${top}°. What is the size of each base angle?`,
        base,
        'Subtract the top angle from 180°, then divide the remaining angle equally.'
      );
    }

    const base = randInt(35, 70);
    const exterior = 2 * base;

    return psQ(
      'angleReasoning',
      s,
      `At the top joint of an isosceles roof frame, an exterior angle measures ${exterior}°. The two base angles are equal. What is the size of each base angle?`,
      base,
      'The exterior angle equals the sum of the two opposite interior angles.'
    );
  }

  // 2. Roads and straight lines
  if (type === 2) {
    if (s === 'basic') {
      const branch = randInt(35, 145);

      return psQ(
        'angleReasoning',
        s,
        `A side road meets a straight highway. One angle at the junction is ${branch}°. What is the adjacent angle on the straight line?`,
        180 - branch,
        'Adjacent angles on a straight line total 180°.'
      );
    }

    if (s === 'multi') {
      const useEvenAngles = chance(0.5);
      const angleSet = useEvenAngles
        ? [30, 40, 50, 60, 70, 80]
        : [35, 45, 55, 65, 75];
      const first = pick(angleSet);
      const second = pick(angleSet.filter(value => value !== first || angleSet.length === 1));
      const third = 180 - first - second;
      if (third <= 0) return psGenAngleReasoning();

      return psQ(
        'angleReasoning',
        s,
        `Three roads form a triangular traffic island. Two interior angles are ${first}° and ${second}°. The third corner is divided into two equal turning angles. What is each turning angle?`,
        third / 2,
        'Find the third triangle angle, then divide it into two equal parts.'
      );
    }

    const inside = randInt(40, 80);
    const exterior = 180 - inside;
    const secondInside = randInt(25, 70);
    const missing = exterior - secondInside;
    if (missing <= 0) return psGenAngleReasoning();

    return psQ(
      'angleReasoning',
      s,
      `At a triangular road junction, one exterior angle is ${exterior}°. One of the two opposite interior angles is ${secondInside}°. What is the other opposite interior angle?`,
      missing,
      'An exterior angle equals the sum of the two opposite interior angles.'
    );
  }

  // 3. Regular signs and frames
  if (type === 3) {
    if (s === 'basic') {
      const sides = pick([4, 5, 6, 8, 9, 10, 12]);
      const exterior = 360 / sides;

      return psQ(
        'angleReasoning',
        s,
        `A regular ${sides}-sided sign is made from equal panels. What is the turning angle between one side and the next?`,
        exterior,
        'The equal exterior angles of a regular polygon total 360°.'
      );
    }

    if (s === 'multi') {
      const sides = pick([5, 6, 8, 9, 10, 12]);
      const interior = ((sides - 2) * 180) / sides;

      return psQ(
        'angleReasoning',
        s,
        `A regular ${sides}-sided decorative frame uses identical corner joints. What interior angle must each joint form?`,
        interior,
        'Find the polygon interior-angle sum, then divide equally among the corners.'
      );
    }

    const sides = pick([5, 6, 8, 9, 10, 12, 15]);
    const exterior = 360 / sides;

    return psQ(
      'angleReasoning',
      s,
      `A designer knows that each exterior turn of a regular display frame is ${exterior}°. How many sides does the frame have?`,
      sides,
      'Divide 360° by one exterior angle.'
    );
  }

  // 4. Tiles around a point
  if (type === 4) {
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
      const equalPieces = pick([3, 4, 5, 6]);
      const equalAngle = pick([30, 40, 45, 50, 60]);
      const used = equalPieces * equalAngle;
      if (used >= 360) return psGenAngleReasoning();

      return psQ(
        'angleReasoning',
        s,
        `${equalPieces} identical tiles, each with angle ${equalAngle}°, meet at a point. One final tile fills the remaining gap. What angle is needed on the final tile?`,
        360 - used,
        'Subtract the total angle already used from 360°.'
      );
    }

    const smallAngle = pick([30, 40, 45, 60]);
    const largeAngle = pick([90, 120, 135]);
    const smallCount = randInt(2, 5);
    const remaining = 360 - smallCount * smallAngle;
    if (remaining <= 0 || remaining % largeAngle !== 0) return psGenAngleReasoning();

    return psQ(
      'angleReasoning',
      s,
      `${smallCount} small tiles, each with angle ${smallAngle}°, are placed around a point. The remaining space is filled with identical tiles having angle ${largeAngle}°. How many of the larger tiles are needed?`,
      remaining / largeAngle,
      'Subtract the angles used by the small tiles, then divide the remaining angle by the larger tile angle.'
    );
  }

  // 5. Parallel structures
  if (type === 5) {
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
      const obtuse = 180 - acute;

      return psQ(
        'angleReasoning',
        s,
        `A diagonal brace crosses two parallel beams. It forms an acute angle of ${acute}° with the lower beam. What obtuse angle does it form with the upper beam on the same side?`,
        obtuse,
        'The acute corresponding angle is equal, and the adjacent obtuse angle is supplementary.'
      );
    }

    const first = randInt(30, 70);
    const second = randInt(20, 60);
    const missing = 180 - first - second;

    return psQ(
      'angleReasoning',
      s,
      `A zigzag support crosses two parallel beams and forms two known angles of ${first}° and ${second}° inside a triangular section. What is the remaining angle in that section?`,
      missing,
      'Use parallel-line angle relationships to place the known angles in one triangle, then use the triangle angle sum.'
    );
  }

  // 6. Choosing a feasible design
  if (s === 'basic') {
    const equal = randInt(35, 75);
    const third = 180 - 2 * equal;

    return psQ(
      'angleReasoning',
      s,
      `A symmetric triangular bracket has two equal angles of ${equal}°. What is the angle between the two equal sides?`,
      third,
      'Subtract the two equal angles from 180°.'
    );
  }

  if (s === 'multi') {
    const sides = pick([5, 6, 8, 9, 10, 12]);
    const diagonalsFromOneVertex = sides - 3;

    return psQ(
      'angleReasoning',
      s,
      `A designer divides a ${sides}-sided window frame into triangles by drawing supports from one corner to every non-adjacent corner. How many supports are drawn from that corner?`,
      diagonalsFromOneVertex,
      'From one vertex, connections cannot be made to itself or its two adjacent vertices.'
    );
  }

  const sides = pick([5, 6, 8, 9, 10, 12]);
  const total = (sides - 2) * 180;
  const knownAngle = total / sides;

  return psQ(
    'angleReasoning',
    s,
    `A regular ${sides}-sided frame is assembled from identical corner pieces. The total of all interior angles is ${total}°. What angle must each corner piece provide?`,
    knownAngle,
    'Because the frame is regular, divide the total interior angle sum equally among all corners.'
  );
}

function psGenPythagorasTrig() {
  const s = chooseProblemStructure();
  const type = randInt(1, 6);
  const triple = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15]]);

  // 1. Ladders and access
  if (type === 1) {
    if (s === 'basic') {
      const scale = randInt(1, 4);

      return psQ(
        'pythagorasTrig',
        s,
        `A ladder reaches ${triple[1] * scale} m up a wall. Its foot is ${triple[0] * scale} m from the wall. How long is the ladder?`,
        triple[2] * scale,
        'The wall and ground form the perpendicular sides of a right triangle.'
      );
    }

    if (s === 'multi') {
      const scale = randInt(1, 4);
      const ladder = triple[2] * scale;
      const height = triple[1] * scale;
      const extra = randInt(1, 4);

      return psQ(
        'pythagorasTrig',
        s,
        `A ${ladder} m ladder reaches ${height} m up a wall. Safety rules require the foot to be moved ${extra} m farther from the wall than its current distance. What will the new horizontal distance from the wall be?`,
        triple[0] * scale + extra,
        'Use Pythagoras to find the current horizontal distance, then add the required movement.'
      );
    }

    const scale = randInt(1, 4);
    const ladder = triple[2] * scale;
    const height = triple[1] * scale;
    const currentDistance = triple[0] * scale;
    const maximumDistance = currentDistance + randInt(1, 4);

    return psQ(
      'pythagorasTrig',
      s,
      `A ${ladder} m ladder reaches a window ${height} m above the ground. The safety zone allows the foot of the ladder to be at most ${maximumDistance} m from the wall. How many metres of spare horizontal space remain beyond the required ladder position?`,
      maximumDistance - currentDistance,
      'Find the required horizontal distance using Pythagoras, then compare it with the allowed space.'
    );
  }

  // 2. Shortcuts across rectangles
  if (type === 2) {
    if (s === 'basic') {
      const scale = randInt(1, 5);

      return psQ(
        'pythagorasTrig',
        s,
        `A rectangular park is ${triple[0] * scale} m by ${triple[1] * scale} m. How long is a straight path from one corner to the opposite corner?`,
        triple[2] * scale,
        'The diagonal is the hypotenuse of a right triangle.'
      );
    }

    if (s === 'multi') {
      const scale = randInt(1, 4);
      const around = (triple[0] + triple[1]) * scale;
      const diagonal = triple[2] * scale;

      return psQ(
        'pythagorasTrig',
        s,
        `To cross a rectangular field measuring ${triple[0] * scale} m by ${triple[1] * scale} m, a person can walk along two sides or take a diagonal path. How many metres shorter is the diagonal route?`,
        around - diagonal,
        'Find the two-side route and the diagonal, then compare them.'
      );
    }

    const scale = randInt(1, 4);
    const diagonal = triple[2] * scale;
    const costPerMetre = randInt(5, 12);
    const budget = diagonal * costPerMetre + randInt(20, 80);

    return psQ(
      'pythagorasTrig',
      s,
      `A cable is laid diagonally across a ${triple[0] * scale} m by ${triple[1] * scale} m rectangular site. Cable costs $${costPerMetre} per metre and the budget is $${budget}. How much money remains after buying the required cable?`,
      budget - diagonal * costPerMetre,
      'Find the diagonal cable length, calculate its cost, then subtract from the budget.'
    );
  }

  // 3. Support cables and poles
  if (type === 3) {
    if (s === 'basic') {
      const scale = randInt(1, 4);

      return psQ(
        'pythagorasTrig',
        s,
        `A support cable is ${triple[2] * scale} m long and is anchored ${triple[0] * scale} m from the base of a vertical pole. How high up the pole is the cable attached?`,
        triple[1] * scale,
        'Use the cable as the hypotenuse and subtract the square of the ground distance.'
      );
    }

    if (s === 'multi') {
      const height = pick([5, 6, 8, 10, 12, 15]);
      const cables = randInt(2, 5);

      return psQ(
        'pythagorasTrig',
        s,
        `Each of ${cables} identical support cables is anchored ${height} m from a pole and attached ${height} m above the ground, forming a 45° angle with the ground. What is the total horizontal ground distance from all anchors to their poles?`,
        cables * height,
        'In a 45° right triangle, the horizontal and vertical distances are equal.'
      );
    }

    const height = pick([6, 8, 10, 12, 15]);
    const groundDistance = height;
    const boundary = groundDistance + randInt(2, 6);

    return psQ(
      'pythagorasTrig',
      s,
      `A cable attached to the top of a ${height} m pole makes a 45° angle with level ground. The site boundary is ${boundary} m from the pole. How many metres inside the boundary should the anchor be placed?`,
      boundary - groundDistance,
      'A 45° cable gives equal vertical and horizontal distances, then compare with the boundary distance.'
    );
  }

  // 4. Ramps and slopes using Pythagorean triples
  if (type === 4) {
    const rampTriple = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]);

    if (s === 'basic') {
      const scale = randInt(1, 3);

      return psQ(
        'pythagorasTrig',
        s,
        `A loading ramp rises ${rampTriple[0] * scale} m over a horizontal distance of ${rampTriple[1] * scale} m. What is the ramp length?`,
        rampTriple[2] * scale,
        'The rise and horizontal run are perpendicular sides of a right triangle.'
      );
    }

    if (s === 'multi') {
      const scale = randInt(1, 3);
      const rampLength = rampTriple[2] * scale;
      const width = randInt(2, 5);

      return psQ(
        'pythagorasTrig',
        s,
        `A ramp rises ${rampTriple[0] * scale} m over a horizontal run of ${rampTriple[1] * scale} m. The ramp is ${width} m wide. What rectangular surface area must be covered with non-slip material?`,
        rampLength * width,
        'Find the sloping ramp length using Pythagoras, then multiply by the ramp width.'
      );
    }

    const scale = randInt(1, 3);
    const rampLength = rampTriple[2] * scale;
    const maximumLength = rampLength + randInt(1, 5);

    return psQ(
      'pythagorasTrig',
      s,
      `A ramp must rise ${rampTriple[0] * scale} m across a horizontal run of ${rampTriple[1] * scale} m. The available ramp panel is ${maximumLength} m long. How much panel length will remain unused?`,
      maximumLength - rampLength,
      'Calculate the required sloping length, then subtract it from the available panel length.'
    );
  }

  // 5. Navigation on a grid
  if (type === 5) {
    if (s === 'basic') {
      const scale = randInt(1, 5);

      return psQ(
        'pythagorasTrig',
        s,
        `A rescue team travels ${triple[0] * scale} km east and ${triple[1] * scale} km north. How far is it in a straight line from its starting point?`,
        triple[2] * scale,
        'The east and north distances form perpendicular sides.'
      );
    }

    if (s === 'multi') {
      const scale = randInt(1, 4);
      const direct = triple[2] * scale;
      const travelled = (triple[0] + triple[1]) * scale;

      return psQ(
        'pythagorasTrig',
        s,
        `A surveyor walks ${triple[0] * scale} km east and then ${triple[1] * scale} km north. How many kilometres longer is this route than the straight-line distance back to the start?`,
        travelled - direct,
        'Compare the two-leg route with the Pythagorean straight-line distance.'
      );
    }

    const scale = randInt(1, 4);
    const direct = triple[2] * scale;
    const fuelPerKm = randInt(2, 6);
    const fuelAvailable = direct * fuelPerKm + randInt(5, 25);

    return psQ(
      'pythagorasTrig',
      s,
      `A drone is ${triple[0] * scale} km east and ${triple[1] * scale} km north of its base. It uses ${fuelPerKm} units of battery per kilometre on a direct return flight and has ${fuelAvailable} units remaining. How many battery units will remain after it returns?`,
      fuelAvailable - direct * fuelPerKm,
      'Find the direct return distance, calculate battery use, then subtract from the remaining battery.'
    );
  }

  // 6. Choosing whether a diagonal item fits
  const openingTriple = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]);
  const openingScale = pick([10, 20, 30]);

  if (s === 'basic') {
    const diagonal = openingTriple[2] * openingScale;

    return psQ(
      'pythagorasTrig',
      s,
      `A rectangular opening is ${openingTriple[0] * openingScale} cm wide and ${openingTriple[1] * openingScale} cm high. What is the longest straight pole that can fit exactly from one corner to the opposite corner, in centimetres?`,
      diagonal,
      'The longest corner-to-corner distance is the rectangle diagonal.'
    );
  }

  if (s === 'multi') {
    const diagonal = openingTriple[2] * openingScale;
    const pole = diagonal + pick([10, 20, 30, 40]);

    return psQ(
      'pythagorasTrig',
      s,
      `A rectangular opening is ${openingTriple[0] * openingScale} cm by ${openingTriple[1] * openingScale} cm. A straight pole is ${pole} cm long. By how many centimetres is the pole longer than the opening's diagonal?`,
      pole - diagonal,
      'Find the opening diagonal, then compare it with the pole length.'
    );
  }

  const diagonal = openingTriple[2] * openingScale;
  const poleA = diagonal - pick([10, 20]);
  const poleB = diagonal + pick([10, 20, 30, 40]);

  return psQ(
    'pythagorasTrig',
    s,
    `A rectangular opening is ${openingTriple[0] * openingScale} cm by ${openingTriple[1] * openingScale} cm. Pole A is ${poleA} cm long and Pole B is ${poleB} cm long. How many centimetres longer than the maximum fitting length is Pole B?`,
    poleB - diagonal,
    'Calculate the diagonal, which is the maximum fitting length, then compare Pole B with it.'
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
