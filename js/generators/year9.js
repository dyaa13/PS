'use strict';

/* Year 9 question generators and focused rapid-fire additions.
   Split from DYAAPS.html without changing the original logic. */

/* ===== YEAR 9 QUESTION GENERATORS ===== */

function y9GenRational(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const [a,b,c,d]=pick([[-3,4,1,2],[-5,6,1,3],[-7,8,3,4],[-2,5,7,10]]);return qFrac('rational',`${a}/${b} + ${c}/${d} = ?`,a/b+c/d,'Use a common denominator and keep the signs.')}
  if(t===2){const a=-randInt(12,65)/10,b=randInt(8,75)/10;return q('rational',`${fmt(a)} − (${fmt(-b)}) = ?`,roundTo(a+b),'Subtracting a negative is addition.')}
  if(t===3){const a=randInt(-18,18),b=randInt(-18,18);return q('rational',`|${a}| + (${b}) = ?`,Math.abs(a)+b,'Absolute value is distance from zero.')}
  if(t===4){const d=randInt(2,10),ans=randInt(-15,15);return q('rational',`${d*ans} ÷ ${d} = ?`,ans,'Use the sign rules for division.')}
  if(t===5){const [a,b]=pick([[-3,5],[-4,7],[-5,8],[-7,9]]);return qFrac('rational',`Reciprocal of ${a}/${b} = ?`,b/a,'Swap numerator and denominator, keeping the sign.')}
  if(t===6){const [a,b,c,d]=pick([[-3,4,-2,5],[-5,6,3,4],[-7,10,-1,2]]);return qFrac('rational',`${a}/${b} ÷ ${c}/${d} = ?`,(a/b)/(c/d),'Multiply by the reciprocal.')}
  if(t===7){const a=randInt(-12,12),b=randInt(-10,10),c=randInt(-8,8);return q('rational',`${a} − (${b} − (${c})) = ?`,a-(b-c),'Work from the innermost brackets.')}
  const [a,b,c,d]=pick([[-3,4,-2,3],[-5,8,-6,10],[-7,10,-3,4],[-1,2,-45,100]]);return q('rational',`Which is greater? Enter 1 for ${a}/${b}, or 2 for ${c}/${d}.`,a/b>c/d?1:2,'Compare using decimals or a common denominator.')}


function y9GenOrder(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(2,8),b=randInt(2,7),c=randInt(1,6);return q('order',`${a}² − ${b} × (${c} − ${c+3}) = ?`,a*a-b*(c-(c+3)),'Powers and brackets before multiplication.')}
  if(t===2){const a=randInt(2,7),b=randInt(3,9),c=randInt(1,5);return q('order',`${a} × [${b} − (${c} − ${c+2})] = ?`,a*(b-(c-(c+2))),'Work from the inner brackets outward.')}
  if(t===3){const a=randInt(2,6),b=randInt(2,6),c=randInt(2,8);return q('order',`-${a}² + ${b} × ${c} = ?`,-a*a+b*c,'Without brackets, the square applies before the negative sign.')}
  if(t===4){const a=randInt(2,6),b=randInt(2,6),c=randInt(2,8);return q('order',`(-${a})² + ${b} × ${c} = ?`,a*a+b*c,'The brackets make the negative number the base.')}
  if(t===5){const d=pick([2,3,4,5]),k=randInt(4,14),a=randInt(2,d*k-2),b=d*k-a,c=randInt(-8,10);return q('order',`(${a} + ${b}) ÷ ${d} + (${c}) = ?`,k+c,'Brackets, division, then addition.')}
  if(t===6){const [a,b,c,d]=pick([[3,4,1,2],[5,6,1,3],[7,8,1,4]]);return qFrac('order',`${a}/${b} + ${c}/${d} × 2 = ?`,a/b+c/d*2,'Multiply before adding.')}
  if(t===7){const a=randInt(2,7),b=randInt(2,6),c=randInt(2,6),d=randInt(1,4);return q('order',`${a}³ ÷ ${a} + ${b} × (${c} − ${d}) = ?`,a*a+b*(c-d),'Powers first, then division and multiplication.')}
  const a=randInt(-6,6),b=randInt(2,5),c=randInt(-5,5),d=randInt(1,4);return q('order',`${a} − ${b} × [${c} − (${d})] = ?`,a-b*(c-d),'Evaluate brackets before multiplying.')}


function y9GenIndices(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const b=pick([2,3,5,7]),a=randInt(2,6),c=randInt(1,5);return q('indices',`${b}^${a} × ${b}^${c} = ${b}^?`,a+c,'Same base: add exponents.')}
  if(t===2){const b=pick([2,3,5,7]),a=randInt(5,10),c=randInt(1,a-1);return q('indices',`${b}^${a} ÷ ${b}^${c} = ${b}^?`,a-c,'Same base: subtract exponents.')}
  if(t===3){const b=pick([2,3,4,5]),a=randInt(2,4),c=randInt(2,4);return q('indices',`(${b}^${a})^${c} = ${b}^?`,a*c,'Multiply the exponents.')}
  if(t===4){const b=randInt(2,20);return q('indices',`${b}^0 = ?`,1,'Any non-zero number to power zero equals 1.')}
  if(t===5){const b=pick([2,3,4,5,10]),p=randInt(1,3);return qFrac('indices',`${b}^-${p} = ?`,1/(b**p),'A negative exponent gives the reciprocal.')}
  if(t===6){const coefficient=pick([1.2,2.5,3.6,4.2,5.8,7.5]),exp=randInt(3,6);return q('indices',`${fmt(coefficient)} × 10^${exp} = ?`,coefficient*10**exp,'Move the decimal point right by the exponent.')}
  if(t===7){const a=pick([2,3,4,6,8]),b=pick([2,4]),m=randInt(3,6),n=randInt(1,m-1);return q('indices',`(${a} × 10^${m}) ÷ (${b} × 10^${n}) = ?`,a/b*10**(m-n),'Divide coefficients and subtract exponents.')}
  const a=pick([2,3,4,5]),b=pick([2,4,5]),m=randInt(2,5),n=randInt(1,4);return q('indices',`(${a} × 10^${m})(${b} × 10^${n}) = ?`,a*b*10**(m+n),'Multiply coefficients and add exponents.')}


function y9GenSimplify(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(2,9),b=randInt(1,8),c=randInt(1,7);return q('simplify',`Coefficient of x in ${a}x + ${b}x − ${c}x is ?`,a+b-c,'Combine like terms.')}
  if(t===2){const a=randInt(2,8),b=randInt(1,7),c=randInt(1,6);return q('simplify',`Coefficient of y in ${a}x + ${b}y + 3x − ${c}y is ?`,b-c,'Only combine y-terms with y-terms.')}
  if(t===3){const x=randInt(-5,6),a=randInt(2,6),b=randInt(-8,8);return q('simplify',`If x=${x}, find ${a}x ${b>=0?'+':'−'} ${Math.abs(b)}.`,a*x+b,'Substitute the value of x.')}
  if(t===4){const k=randInt(2,9),m=randInt(2,7);return q('simplify',`Coefficient of x after simplifying ${k*m}x ÷ ${m} is ?`,k,'Divide the coefficient.')}
  if(t===5){const a=randInt(-8,-2),b=randInt(2,9),c=randInt(-6,6);return q('simplify',`Coefficient of a in ${a}a + ${b}a ${c>=0?'+':'−'} ${Math.abs(c)} is ?`,a+b,'Add the signed coefficients.')}
  if(t===6){const a=randInt(2,7),b=randInt(-8,8),c=randInt(-9,9),d=randInt(-8,8);return q('simplify',`Constant term in ${a}x ${b>=0?'+':'−'} ${Math.abs(b)} ${c>=0?'+':'−'} ${Math.abs(c)}x ${d>=0?'+':'−'} ${Math.abs(d)} is ?`,b+d,'Combine only the constant terms.')}
  if(t===7){const x=randInt(-4,5);return q('simplify',`If x=${x}, find 3x² − 4x + 1.`,3*x*x-4*x+1,'Square x before multiplying.')}
  const a=randInt(2,8),b=randInt(2,8),c=randInt(2,8);return q('simplify',`Coefficient of x after simplifying (${a*b}x + ${a*c}x) ÷ ${a} is ?`,b+c,'Factor or divide each term by the common factor.')}


function y9GenExpand(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(2,7),b=randInt(2,8),c=randInt(1,7);return q('expand',`Coefficient of x in ${a}(${b}x − ${c}) is ?`,a*b,'Multiply every term inside the bracket.')}
  if(t===2){const a=randInt(1,8),b=randInt(1,8);return q('expand',`Constant term in (x + ${a})(x + ${b}) is ?`,a*b,'Multiply the two constant terms.')}
  if(t===3){const a=randInt(1,8),b=randInt(1,8);return q('expand',`Coefficient of x in (x + ${a})(x + ${b}) is ?`,a+b,'The middle terms add to (a+b)x.')}
  if(t===4){const g=randInt(2,9),a=randInt(2,8),b=randInt(2,9);return q('expand',`Greatest common factor of ${g*a}x and ${g*b} is ?`,g*gcd(a,b),'Find the greatest numerical factor common to both terms.')}
  if(t===5){const a=randInt(2,7),b=randInt(a+1,9);return q('expand',`x² + ${a+b}x + ${a*b} = (x + ${a})(x + □). Find □.`,b,'Find two numbers with the required sum and product.')}
  if(t===6){const a=pick([3,4,5,6,7,8,9]);return q('expand',`Positive root of x² − ${a*a} = 0 is ?`,a,'Use the difference of two squares.')}
  if(t===7){const a=randInt(2,7),b=randInt(2,8);return q('expand',`Coefficient of x² in ${a}x(${b}x − 3) is ?`,a*b,'Multiply the x-terms.')}
  const a=randInt(1,7),b=randInt(1,7),c=randInt(1,6);return q('expand',`Constant term in (${c}x − ${a})(x + ${b}) is ?`,-a*b,'Multiply the constant terms, including the sign.')}


function y9GenLinear() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const x = randInt(-8, 12);
    const a = randInt(2, 8);
    const b = randInt(-10, 10);
    return q('linear', `${a}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${a * x + b}. Find x.`, x, 'Undo the constant, then divide by the coefficient.');
  }

  if (t === 2) {
    const x = randInt(-6, 10);
    const a = randInt(3, 8);
    const b = randInt(1, 7);
    const c = randInt(1, a - 1);
    const rhs = (a - c) * x + b;
    return q('linear', `${a}x + ${b} = ${c}x ${rhs >= 0 ? '+' : '−'} ${Math.abs(rhs)}. Find x.`, x, 'Collect x-terms on one side.');
  }

  if (t === 3) {
    const x = randInt(-5, 10);
    const a = randInt(2, 6);
    const b = randInt(-6, 6);
    const rhs = a * (x + b);
    return q('linear', `${a}(x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}) = ${rhs}. Find x.`, x, 'Divide first, then undo the bracket constant.');
  }

  if (t === 4) {
    const divisor = pick([2, 3, 4, 5, 6, 8, 10]);
    const quotient = randInt(L === 'challenge' ? -8 : 1, 15);
    const c = randInt(-6, 8);
    const x = divisor * quotient;
    const rhs = quotient + c;
    return q(
      'linear',
      `x/${divisor} ${c >= 0 ? '+' : '−'} ${Math.abs(c)} = ${rhs}. Find x.`,
      x,
      'Undo the constant, then multiply by the denominator.'
    );
  }

  if (t === 5) {
    const x = pick([5, 10, 15, 20, 25, 30]);
    const coefficient = pick([0.2, 0.4, 0.5, 0.6, 0.8]);
    return q('linear', `${fmt(coefficient)}x = ${fmt(coefficient * x)}. Find x.`, x, 'Divide by the decimal coefficient.');
  }

  if (t === 6) {
    const x = randInt(-5, 8);
    const a = randInt(2, 6);
    const b = randInt(-5, 5);
    const c = randInt(1, a - 1);
    const d = a * (x + b) - c * x;
    return q('linear', `${a}(x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}) = ${c}x ${d >= 0 ? '+' : '−'} ${Math.abs(d)}. Find x.`, x, 'Expand, then collect like terms.');
  }

  if (t === 7) {
    const x = randInt(2, 12);
    const a = randInt(2, 6);
    const b = randInt(1, 8);
    return q('linear', `A number multiplied by ${a}, then increased by ${b}, gives ${a * x + b}. Find the number.`, x, 'Write ax+b=result.');
  }

  const x = randInt(-6, 10);
  const a = randInt(2, 7);
  const b = randInt(-8, 8);
  const c = randInt(1, a - 1);
  const d = randInt(-6, 8);
  const rightConstant = (a - c) * x + b;
  return q(
    'linear',
    `${a}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${c}x ${rightConstant >= 0 ? '+' : '−'} ${Math.abs(rightConstant)}. Find x.`,
    x,
    'Move x-terms together and constants together.'
  );
}

function y9GenInequalities(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const b=randInt(-8,10),boundary=randInt(-5,15),rhs=boundary+b;return q('inequalities',`x ${b>=0?'+':'−'} ${Math.abs(b)} > ${rhs}. Boundary value = ?`,boundary,'Solve as an equation to find the boundary.')}
  if(t===2){const a=randInt(2,7),boundary=randInt(-5,12);return q('inequalities',`${a}x ≤ ${a*boundary}. Greatest integer solution = ?`,boundary,'Divide by the positive coefficient.')}
  if(t===3){const a=randInt(2,6),boundary=randInt(-4,10),b=randInt(-8,8),rhs=a*boundary+b;return q('inequalities',`${a}x ${b>=0?'+':'−'} ${Math.abs(b)} ≥ ${rhs}. Smallest integer solution = ?`,boundary,'Solve for x; equality includes the boundary.')}
  if(t===4){const a=-randInt(2,6),boundary=randInt(-5,10);return q('inequalities',`${a}x < ${a*boundary}. Smallest integer solution = ?`,boundary+1,'Dividing by a negative reverses the sign, giving x greater than the boundary.')}
  if(t===5){const boundary=randInt(-4,10),a=randInt(3,8),c=randInt(1,a-1),b=randInt(-8,8),d=(a-c)*boundary+b;return q('inequalities',`${a}x ${b>=0?'+':'−'} ${Math.abs(b)} ≤ ${c}x ${d>=0?'+':'−'} ${Math.abs(d)}. Greatest integer solution = ?`,boundary,'Collect x-terms, then solve the inequality.')}
  if(t===6){const boundary=randInt(-5,8),test=randInt(-7,10),b=randInt(-5,5),rhs=boundary+b;const ok=test+b>rhs;return q('inequalities',`Does x=${test} satisfy x ${b>=0?'+':'−'} ${Math.abs(b)} > ${rhs}? Enter 1 for yes, 0 for no.`,ok?1:0,'Substitute the value and compare both sides.')}
  if(t===7){const a=-randInt(2,5),b=randInt(-6,6),boundary=randInt(-4,8),rhs=a*boundary+b;return q('inequalities',`${a}x ${b>=0?'+':'−'} ${Math.abs(b)} ≥ ${rhs}. Boundary value = ?`,boundary,'Solve the matching equation; reverse the sign after dividing by a negative.')}
  const low=randInt(-8,2),high=randInt(low+3,10);return q('inequalities',`How many integers satisfy ${low} < x < ${high}?`,high-low-1,'Count the integers strictly between the endpoints.')}


function y9GenSimultaneous(){const L=state.level,t=L==='starter'?randInt(1,3):L==='core'?randInt(1,6):randInt(1,8);
  const x=randInt(-5,10),y=randInt(-5,10);
  if(t===1){return q('simultaneous',`x + y = ${x+y}, x − y = ${x-y}. Find x.`,x,'Add the equations to eliminate y.')}
  if(t===2){return q('simultaneous',`x + y = ${x+y}, x − y = ${x-y}. Find y.`,y,'Subtract or use the sum and difference.')}
  if(t===3){const a=randInt(2,5);return q('simultaneous',`${a}x + y = ${a*x+y}, and y = ${y}. Find x.`,x,'Substitute the known value of y.')}
  if(t===4){return q('simultaneous',`2x + y = ${2*x+y}, x + y = ${x+y}. Find x.`,x,'Subtract the second equation from the first.')}
  if(t===5){return q('simultaneous',`x + 2y = ${x+2*y}, x + y = ${x+y}. Find y.`,y,'Subtract the second equation from the first.')}
  if(t===6){const a=randInt(2,4),b=randInt(2,4);return q('simultaneous',`${a}x + y = ${a*x+y}, x − y = ${x-y}. Find x.`,x,'Add a suitable multiple or substitute y=x−(x−y).')}
  if(t===7){const sum=x+y,diff=x-y;return q('simultaneous',`Two numbers have sum ${sum} and difference ${diff}. Find the larger number.`,Math.max(x,y),'The larger number is (sum + positive difference) ÷ 2.')}
  const a=randInt(2,5),b=randInt(2,5);return q('simultaneous',`${a}x + ${b}y = ${a*x+b*y}, and y=${y}. Find x.`,x,'Substitute y, then solve the linear equation.')}


function y9GenSequences(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(-10,10),d=randInt(2,9);return q('sequences',`${a}, ${a+d}, ${a+2*d}, ${a+3*d}, ... next = ?`,a+4*d,'Add the common difference.')}
  if(t===2){const a=randInt(-5,10),d=randInt(2,9),n=randInt(6,18);return q('sequences',`Sequence starts ${a}, difference ${d}. Term ${n} = ?`,a+(n-1)*d,'Use a+(n−1)d.')}
  if(t===3){const a=randInt(1,8),d=randInt(2,8),n=randInt(5,14),term=a+(n-1)*d;return q('sequences',`In ${a}, ${a+d}, ${a+2*d}, ... which term equals ${term}?`,n,'Solve a+(n−1)d=term.')}
  if(t===4){const a=randInt(1,5),r=pick([2,3,-2]);return q('sequences',`${a}, ${a*r}, ${a*r*r}, ${a*r*r*r}, ... next = ?`,a*r**4,'Multiply by the common ratio.')}
  if(t===5){const n=randInt(5,15),a=randInt(2,8),b=randInt(-9,9);return q('sequences',`Tₙ = ${a}n ${b>=0?'+':'−'} ${Math.abs(b)}. T${n} = ?`,a*n+b,'Substitute the term number.')}
  if(t===6){const a=randInt(-10,5),d=randInt(3,9);return q('sequences',`${a}, ${a+d}, □, ${a+3*d}. Missing term = ?`,a+2*d,'The difference stays constant.')}
  if(t===7){const n=randInt(5,10);return q('sequences',`2, 6, 12, 20, 30, ... term ${n} = ?`,n*(n+1),'The nth term is n(n+1).')}
  const a=randInt(1,4),b=randInt(-5,5),n=randInt(4,10);return q('sequences',`Tₙ = ${a}n² ${b>=0?'+':'−'} ${Math.abs(b)}. T${n} = ?`,a*n*n+b,'Square n first, then multiply and add.')}


function y9GenPercentages(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const price=pick([80,120,160,200,240,300]),p=pick([10,15,20,25,30]);return q('percentages',`$${price} increased by ${p}% = $?`,roundTo(price*(1+p/100)),'Find the increase, then add it.')}
  if(t===2){const price=pick([80,120,160,200,240,300]),p=pick([10,15,20,25,30]);return q('percentages',`original price $${price} after ${p}% off = $?`,roundTo(price*(1-p/100)),'Find the discount, then subtract it.')}
  if(t===3){const original=pick([40,60,80,100,120,160,200]),p=pick([10,20,25,50]);const final=roundTo(original*(1+p/100));return q('percentages',`A value increases by ${p}% to ${fmt(final)}. Original value = ?`,original,'Divide by the multiplier 1+p/100.')}
  if(t===4){const old=pick([40,50,60,80,100,120]),p=pick([10,20,25,50]);const now=old*(1+p/100);return q('percentages',`A value rises from ${old} to ${fmt(now)}. Percentage increase = ?`,p,'Increase ÷ original × 100.')}
  if(t===5){const a=randInt(2,6),b=randInt(3,8),unit=randInt(3,12),total=(a+b)*unit;return q('percentages',`Divide ${total} in the ratio ${a}:${b}. Smaller share = ?`,Math.min(a,b)*unit,'Find one part, then multiply by the smaller ratio number.')}
  if(t===6){const x1=randInt(2,8),k=randInt(2,9),x2=randInt(3,12);return q('percentages',`y ∝ x. When x=${x1}, y=${x1*k}. Find y when x=${x2}.`,x2*k,'Find the constant of proportionality.')}
  if(t===7){const x1=randInt(2,8),k=pick([24,36,48,60,72]),y1=k/x1,x2=pick([2,3,4,6,8]);return q('percentages',`y ∝ 1/x. When x=${x1}, y=${fmt(y1)}. Find y when x=${x2}.`,k/x2,'For inverse proportion, xy is constant.')}
  const price=pick([100,200,400]),up=pick([10,20,25]),down=pick([10,20]);return q('percentages',`$${price} increases by ${up}%, then decreases by ${down}%. Final amount = $?`,roundTo(price*(1+up/100)*(1-down/100)),'Apply each percentage multiplier in order.')}


function y9GenCoordinates(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const m=pick([-4,-3,-2,-1,1,2,3,4]),x1=randInt(-4,4),y1=randInt(-5,5),dx=pick([1,2,3]),x2=x1+dx,y2=y1+m*dx;return q('coordinates',`Slope through (${x1}, ${y1}) and (${x2}, ${y2}) = ?`,m,'Slope = change in y ÷ change in x.')}
  if(t===2){const m=pick([-4,-3,-2,2,3,4]),c=randInt(-8,8),x=randInt(-5,7);return q('coordinates',`For y = ${m}x ${c>=0?'+':'−'} ${Math.abs(c)}, find y when x=${x}.`,m*x+c,'Substitute x.')}
  if(t===3){const m=pick([-5,-3,-2,2,3,5]),c=randInt(-10,10),x=randInt(-5,8),y=m*x+c;return q('coordinates',`On y = ${m}x ${c>=0?'+':'−'} ${Math.abs(c)}, y=${y}. Find x.`,x,'Subtract the intercept, then divide by the slope.')}
  if(t===4){const x1=randInt(-8,4),x2=x1+2*randInt(1,6),y1=randInt(-8,4),y2=y1+2*randInt(1,6);const askX=chance(.5);return q('coordinates',`Midpoint of (${x1}, ${y1}) and (${x2}, ${y2}). ${askX?'x':'y'}-coordinate = ?`,askX?(x1+x2)/2:(y1+y2)/2,'Average matching coordinates.')}
  if(t===5){const m=pick([-5,-3,-2,2,3,5]);return q('coordinates',`A line is parallel to y=${m}x+7. Its slope = ?`,m,'Parallel lines have equal slopes.')}
  if(t===6){const m=pick([-4,-3,-2,2,3,4]),x=randInt(-4,5),y=randInt(-8,8);return q('coordinates',`A line y=${m}x+c passes through (${x}, ${y}). Find c.`,y-m*x,'Use c=y−mx.')}
  if(t===7){const x=randInt(-8,8),y=randInt(-8,8);const askX=chance(.5);return q('coordinates',`Reflect (${x}, ${y}) in the y-axis. New ${askX?'x':'y'}-coordinate = ?`,askX?-x:y,'Reflection in the y-axis changes the sign of x.')}
  const horizontal=chance(.5),a=randInt(-8,4),b=randInt(a+2,12),fixed=randInt(-6,6);return q('coordinates',horizontal?`Distance between (${a}, ${fixed}) and (${b}, ${fixed}) = ?`:`Distance between (${fixed}, ${a}) and (${fixed}, ${b}) = ?`,b-a,'Subtract the changing coordinates.')}


function y9GenQuadratics(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(1,8),b=randInt(1,8);return q('quadratics',`Coefficient of x in (x + ${a})(x + ${b}) is ?`,a+b,'Add the two constants.')}
  if(t===2){const a=randInt(1,8),b=randInt(1,8);return q('quadratics',`Constant term in (x + ${a})(x + ${b}) is ?`,a*b,'Multiply the constants.')}
  if(t===3){const a=randInt(1,7),b=randInt(a+1,9);return q('quadratics',`Smaller root of x² − ${a+b}x + ${a*b} = 0 is ?`,a,'Factor as (x−a)(x−b).')}
  if(t===4){const a=randInt(1,7),b=randInt(a+1,9);return q('quadratics',`Larger root of x² + ${a+b}x + ${a*b} = 0 is ?`,-a,'The roots are −a and −b; −a is larger when a<b.')}
  if(t===5){const x=randInt(-5,6),a=randInt(-5,5),b=randInt(-8,8);return q('quadratics',`For y=x² ${a>=0?'+':'−'} ${Math.abs(a)}x ${b>=0?'+':'−'} ${Math.abs(b)}, find y when x=${x}.`,x*x+a*x+b,'Substitute x and square first.')}
  if(t===6){const a=randInt(1,7),b=randInt(1,7);return q('quadratics',`For roots ${a} and ${b}, their sum = ?`,a+b,'For (x−a)(x−b), the roots sum to a+b.')}
  if(t===7){const a=randInt(2,8);return q('quadratics',`Coefficient of x in (x + ${a})² is ?`,2*a,'Use (x+a)²=x²+2ax+a².')}
  const a=pick([3,4,5,6,7,8,9]);return q('quadratics',`Positive solution of x² = ${a*a} is ?`,a,'Take the positive square root.')}


function y9GenGeometry(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const n=pick([5,6,8,9,10,12]);return q('geometry',`Each exterior angle of a regular ${n}-gon = ?°`,360/n,'Exterior angles total 360°.')}
  if(t===2){const n=pick([5,6,8,9,10,12]);return q('geometry',`Each interior angle of a regular ${n}-gon = ?°`,180-360/n,'Interior and exterior angles sum to 180°.')}
  if(t===3){const a=randInt(25,85),b=randInt(25,Math.min(95,170-a));return q('geometry',`Triangle angles are ${a}° and ${b}°. Third angle = ?°`,180-a-b,'Angles in a triangle total 180°.')}
  if(t===4){const x=randInt(-8,8),y=randInt(-8,8),askX=chance(.5);return q('geometry',`Reflect (${x}, ${y}) in the x-axis. New ${askX?'x':'y'}-coordinate = ?`,askX?x:-y,'Reflection in the x-axis changes the sign of y.')}
  if(t===5){const side=randInt(3,15),scale=pick([2,3,4]);return q('geometry',`A side ${side} cm is enlarged by scale factor ${scale}. New length = ? cm`,side*scale,'Multiply lengths by the scale factor.')}
  if(t===6){const area=randInt(8,60),scale=pick([2,3,4]);return q('geometry',`Area ${area} cm² enlarged by scale factor ${scale}. New area = ? cm²`,area*scale*scale,'Areas scale by the square of the factor.')}
  if(t===7){const small=randInt(3,12),large=small*pick([2,3,4]),other=randInt(2,10);return q('geometry',`Similar shapes: ${small} cm corresponds to ${large} cm. A ${other} cm side becomes ? cm`,other*large/small,'Use the same scale factor for corresponding lengths.')}
  const x=randInt(-8,8),y=randInt(-8,8),askX=chance(.5);return q('geometry',`Rotate (${x}, ${y}) 180° about the origin. New ${askX?'x':'y'}-coordinate = ?`,askX?-x:-y,'A 180° rotation maps (x,y) to (−x,−y).')}


function y9GenTrig(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25]]);return q('trig',`Right triangle legs ${tr[0]} and ${tr[1]}. Hypotenuse = ?`,tr[2],'Use a²+b²=c².')}
  if(t===2){const tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25]]);return q('trig',`Right triangle hypotenuse ${tr[2]}, one leg ${tr[0]}. Other leg = ?`,tr[1],'Use c²−a²=b².')}
  if(t===3){const tr=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);return qFrac('trig',`Opposite=${tr[0]}, hypotenuse=${tr[2]}. sin θ = ?`,tr[0]/tr[2],'sin=opposite/hypotenuse.')}
  if(t===4){const tr=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);return qFrac('trig',`Adjacent=${tr[1]}, hypotenuse=${tr[2]}. cos θ = ?`,tr[1]/tr[2],'cos=adjacent/hypotenuse.')}
  if(t===5){const tr=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);return qFrac('trig',`Opposite=${tr[0]}, adjacent=${tr[1]}. tan θ = ?`,tr[0]/tr[1],'tan=opposite/adjacent.')}
  if(t===6){const r=pick([2,3,4,5,10]);return q('trig',`Circle radius ${r} cm. Area = ?π cm². Enter the coefficient of π.`,r*r,'Area = πr², so enter r².')}
  if(t===7){const r=pick([2,3,4,5]),h=pick([3,5,10]);return q('trig',`Cylinder radius ${r} cm, height ${h} cm. Volume = ?π cm³. Enter the coefficient of π.`,r*r*h,'Volume = πr²h, so enter r²h.')}
  const l=randInt(3,10),w=randInt(2,8),h=randInt(2,7);return q('trig',`Cuboid ${l}×${w}×${h} cm. Volume = ? cm³`,l*w*h,'Multiply length, width and height.')}


function y9GenStatistics(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const values=[randInt(3,15),randInt(3,15),randInt(3,15),randInt(3,15),randInt(3,15)];const rem=values.reduce((a,b)=>a+b,0)%5;if(rem)values[4]+=5-rem;return q('statistics',`Mean of ${values.join(', ')} = ?`,values.reduce((a,b)=>a+b,0)/5,'Add the values and divide by 5.')}
  if(t===2){const values=Array.from({length:7},()=>randInt(1,20));return q('statistics',`Median of ${values.join(', ')} = ?`,median(values),'Order the values and select the middle one.')}
  if(t===3){const low=randInt(1,10),q1=randInt(low+1,15),q3=randInt(q1+3,22),high=randInt(q3+1,28);const values=[low,q1,q1+1,randInt(q1+1,q3-1),q3-1,q3,high].sort((a,b)=>a-b);return q('statistics',`For ordered data ${values.join(', ')}, IQR = ?`,values[5]-values[1],'IQR=upper quartile−lower quartile.')}
  if(t===4){const count=pick([4,5,6]),mean=randInt(6,18);let known,missing;do{known=Array.from({length:count-1},()=>randInt(2,22));missing=mean*count-known.reduce((a,b)=>a+b,0)}while(missing<0||missing>30);return q('statistics',`${count} numbers have mean ${mean}. Known: ${known.join(', ')}. Missing value = ?`,missing,'Total=mean×number of values.')}
  if(t===5){const red=randInt(2,8),blue=randInt(2,8),green=randInt(1,6);return qFrac('statistics',`Bag: ${red} red, ${blue} blue, ${green} green. P(blue) = ?`,blue/(red+blue+green),'Favourable outcomes ÷ total outcomes.')}
  if(t===6){const p=pick([0.12,0.25,0.35,0.4,0.65,0.8]);return q('statistics',`P(event)=${p}. P(not event)=?`,1-p,'Complementary probabilities add to 1.')}
  if(t===7){return qFrac('statistics','A fair coin is tossed twice. P(at least one head) = ?',3/4,'Use 1−P(no heads).')}
  const trials=pick([50,100,200]),success=pick([10,15,20,25,30,40]);const future=pick([100,200,500]);return q('statistics',`${success} successes in ${trials} trials. Expected successes in ${future} trials = ?`,success/trials*future,'Use the experimental proportion.')}



/* ===== YEAR 9 FOCUSED RAPID-FIRE ADDITIONS ===== */

function y9GenSimultaneousRapid() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  const min = L === 'starter' ? 1 : -6;
  const x = randInt(min, 10);
  const y = randInt(min, 10);

  if (t === 1) {
    return q(
      'simultaneousRapid',
      `x + y = ${x + y}, x − y = ${x - y}. Find x.`,
      x,
      'Add the equations to eliminate y.'
    );
  }

  if (t === 2) {
    return q(
      'simultaneousRapid',
      `x + y = ${x + y}, x − y = ${x - y}. Find y.`,
      y,
      'Subtract the second equation from the first, or use the sum and difference.'
    );
  }

  if (t === 3) {
    return q(
      'simultaneousRapid',
      `2x + y = ${2 * x + y}, x + y = ${x + y}. Find x.`,
      x,
      'Subtract the second equation from the first.'
    );
  }

  if (t === 4) {
    return q(
      'simultaneousRapid',
      `x + 2y = ${x + 2 * y}, x + y = ${x + y}. Find y.`,
      y,
      'Subtract the second equation from the first.'
    );
  }

  if (t === 5) {
    return q(
      'simultaneousRapid',
      `3x + y = ${3 * x + y}, x + y = ${x + y}. Find x.`,
      x,
      'Subtract the second equation; the result is 2x.'
    );
  }

  if (t === 6) {
    return q(
      'simultaneousRapid',
      `2x + 3y = ${2 * x + 3 * y}, 2x + y = ${2 * x + y}. Find y.`,
      y,
      'Subtract the second equation; the result is 2y.'
    );
  }

  if (t === 7) {
    return q(
      'simultaneousRapid',
      `x + y = ${x + y}, 2x − y = ${2 * x - y}. Find x.`,
      x,
      'Add the equations; the result is 3x.'
    );
  }

  return q(
    'simultaneousRapid',
    `3x + 2y = ${3 * x + 2 * y}, x + 2y = ${x + 2 * y}. Find x.`,
    x,
    'Subtract the second equation; the result is 2x.'
  );
}

function y9GenQuadraticEquations() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const n = randInt(2, L === 'challenge' ? 15 : 12);
    return q(
      'quadraticEquations',
      `x² = ${n * n}. Find the positive solution.`,
      n,
      'Take the positive square root.'
    );
  }

  if (t === 2) {
    const n = randInt(2, L === 'challenge' ? 15 : 12);
    return q(
      'quadraticEquations',
      `x² = ${n * n}. Find the negative solution.`,
      -n,
      'The two solutions are positive and negative square roots.'
    );
  }

  if (t === 3) {
    const a = randInt(2, 12);
    return q(
      'quadraticEquations',
      `x(x − ${a}) = 0. Find the non-zero solution.`,
      a,
      'Use the zero-product rule.'
    );
  }

  if (t === 4) {
    const a = randInt(2, 12);
    return q(
      'quadraticEquations',
      `x(x + ${a}) = 0. Find the non-zero solution.`,
      -a,
      'Use the zero-product rule.'
    );
  }

  if (t === 5) {
    const a = randInt(1, 7);
    const k = randInt(2, 7);
    return q(
      'quadraticEquations',
      `(x − (${a}))² = ${k * k}. Find the larger solution.`,
      a + k,
      'Take both square roots, then choose the larger value.'
    );
  }

  if (t === 6) {
    const a = randInt(1, 7);
    const k = randInt(2, 7);
    return q(
      'quadraticEquations',
      `(x + ${a})² = ${k * k}. Find the smaller solution.`,
      -a - k,
      'Take both square roots, then choose the smaller value.'
    );
  }

  if (t === 7) {
    const coefficient = randInt(2, 6);
    const n = randInt(2, 10);
    return q(
      'quadraticEquations',
      `${coefficient}x² = ${coefficient * n * n}. Find the positive solution.`,
      n,
      'Divide by the coefficient, then take the positive square root.'
    );
  }

  const b = randInt(2, 12);
  return q(
    'quadraticEquations',
    `x² + ${b}x = 0. Find the non-zero solution.`,
    -b,
    'Factor out x: x(x + b) = 0.'
  );
}

function y9GenQuadraticFactorisation() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const a = randInt(1, 8);
    const b = randInt(1, 9);
    return q(
      'quadraticFactorisation',
      `x² + ${a + b}x + ${a * b} = (x + ${a})(x + □). Find □.`,
      b,
      'The two numbers add to the x-coefficient and multiply to the constant.'
    );
  }

  if (t === 2) {
    const a = randInt(1, 8);
    const b = randInt(1, 9);
    return q(
      'quadraticFactorisation',
      `x² − ${a + b}x + ${a * b} = (x − ${a})(x − □). Find □.`,
      b,
      'The two positive numbers add to the middle coefficient.'
    );
  }

  if (t === 3) {
    const a = randInt(1, 8);
    const b = randInt(1, 9);
    const middle = b - a;
    return q(
      'quadraticFactorisation',
      `x² ${middle >= 0 ? '+' : '−'} ${Math.abs(middle)}x − ${a * b} = (x − ${a})(x + □). Find □.`,
      b,
      'The constants have opposite signs because their product is negative.'
    );
  }

  if (t === 4) {
    const a = randInt(2, 14);
    return q(
      'quadraticFactorisation',
      `x² − ${a * a} = (x − ${a})(x + □). Find □.`,
      a,
      'Use the difference of two squares.'
    );
  }

  if (t === 5) {
    const a = randInt(1, 5);
    const b = randInt(1, 8);
    return q(
      'quadraticFactorisation',
      `2x² + ${2 * b + a}x + ${a * b} = (2x + ${a})(x + □). Find □.`,
      b,
      'Expand the factors mentally and match the constant term.'
    );
  }

  if (t === 6) {
    const a = randInt(1, 5);
    const b = randInt(1, 8);
    const middle = 3 * b - a;
    return q(
      'quadraticFactorisation',
      `3x² ${middle >= 0 ? '+' : '−'} ${Math.abs(middle)}x − ${a * b} = (3x − ${a})(x + □). Find □.`,
      b,
      'Match the product and the two middle terms.'
    );
  }

  if (t === 7) {
    const a = randInt(2, 10);
    const b = randInt(1, 9);
    return q(
      'quadraticFactorisation',
      `x² + ${a - b}x − ${a * b} = (x + ${a})(x − □). Find □.`,
      b,
      'The constants must multiply to the negative constant term.'
    );
  }

  const a = randInt(2, 14);
  return q(
    'quadraticFactorisation',
    `x² − ${a * a} = (x − □)(x + ${a}). Find □.`,
    a,
    'A difference of squares has matching positive and negative factors.'
  );
}

function y9GenNegativeIndices() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const b = randInt(2, 12);
    return qFrac(
      'negativeIndices',
      `${b}^-1 = ?`,
      1 / b,
      'A power of −1 means take the reciprocal.'
    );
  }

  if (t === 2) {
    const b = randInt(2, 10);
    return qFrac(
      'negativeIndices',
      `${b}^-2 = ?`,
      1 / (b * b),
      'Move the power to the denominator and make the exponent positive.'
    );
  }

  if (t === 3) {
    const p = randInt(1, 5);
    return q(
      'negativeIndices',
      `10^-${p} = ?`,
      10 ** (-p),
      'Move the decimal point left by the exponent.'
    );
  }

  if (t === 4) {
    const b = pick([2, 3, 5, 7]);
    const low = randInt(1, 4);
    const high = randInt(low + 1, low + 5);
    return q(
      'negativeIndices',
      `${b}^${low} ÷ ${b}^${high} = ${b}^?`,
      low - high,
      'Subtract the exponents.'
    );
  }

  if (t === 5) {
    const b = pick([2, 3, 5]);
    const a = randInt(3, 7);
    const c = randInt(1, a - 1);
    return q(
      'negativeIndices',
      `${b}^-${a} × ${b}^${c} = ${b}^?`,
      c - a,
      'Add the signed exponents.'
    );
  }

  if (t === 6) {
    const b = pick([2, 3, 5]);
    const a = randInt(1, 4);
    const c = randInt(2, 4);
    return q(
      'negativeIndices',
      `(${b}^-${a})^${c} = ${b}^?`,
      -a * c,
      'Multiply the exponents.'
    );
  }

  if (t === 7) {
    const b = pick([2, 3, 5, 10]);
    const p = randInt(1, 5);
    return q(
      'negativeIndices',
      `1/${b}^${p} = ${b}^?`,
      -p,
      'A reciprocal can be written using a negative exponent.'
    );
  }

  const b = randInt(2, 6);
  const p = randInt(1, 4);
  return q(
    'negativeIndices',
    `(1/${b})^-${p} = ?`,
    b ** p,
    'A negative exponent reverses the fraction.'
  );
}

function y9GenScientificNotation() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const m = randInt(1, 4);
    const n = randInt(1, 4);
    return q(
      'scientificNotation',
      `(${a} × 10^${m}) × (${b} × 10^${n}) = ?`,
      a * b * 10 ** (m + n),
      'Multiply the coefficients and add the powers of 10.'
    );
  }

  if (t === 2) {
    const b = randInt(2, 6);
    const quotient = randInt(2, 8);
    const a = b * quotient;
    const n = randInt(1, 3);
    const m = randInt(n + 1, n + 5);
    return q(
      'scientificNotation',
      `(${a} × 10^${m}) ÷ (${b} × 10^${n}) = ?`,
      quotient * 10 ** (m - n),
      'Divide the coefficients and subtract the powers of 10.'
    );
  }

  if (t === 3) {
    const a = randInt(4, 9);
    const b = randInt(3, 9);
    const coefficient = a * b / 10;
    return q(
      'scientificNotation',
      `(${a} × 10^3) × (${b} × 10^2) = ${fmt(coefficient)} × 10^?. Find the exponent.`,
      6,
      'The coefficient product is at least 10, so normalising adds 1 to the exponent.'
    );
  }

  if (t === 4) {
    const a = randInt(4, 9);
    const b = randInt(3, 9);
    const product = a * b;
    return q(
      'scientificNotation',
      `Write (${a} × 10^2)(${b} × 10^3) in standard form. Coefficient = ?`,
      product / 10,
      'Multiply the coefficients, then move one place to make the coefficient between 1 and 10.'
    );
  }

  if (t === 5) {
    const [numerator, denominator] = pick([
      [2, 4],
      [2, 5],
      [3, 5],
      [3, 6],
      [4, 5],
      [4, 8]
    ]);
    const coefficient = 10 * numerator / denominator;
    return q(
      'scientificNotation',
      `Write (${numerator} × 10^6) ÷ (${denominator} × 10^2) in standard form. Coefficient = ?`,
      coefficient,
      'The first coefficient is below 1, so multiply it by 10 and reduce the exponent by 1.'
    );
  }

  if (t === 6) {
    const [numerator, denominator] = pick([
      [2, 4],
      [2, 5],
      [3, 5],
      [3, 6],
      [4, 5],
      [4, 8]
    ]);
    const m = randInt(4, 7);
    const n = randInt(1, 3);
    return q(
      'scientificNotation',
      `(${numerator} × 10^${m}) ÷ (${denominator} × 10^${n}) = ${fmt(10 * numerator / denominator)} × 10^?. Find the exponent.`,
      m - n - 1,
      'Subtract exponents, then normalise the coefficient.'
    );
  }

  if (t === 7) {
    const a = randInt(2, 8);
    const b = randInt(2, 8);
    const m = randInt(1, 4);
    const n = randInt(1, 4);
    return q(
      'scientificNotation',
      `(${a} × 10^-${m}) × (${b} × 10^-${n}) = ?`,
      a * b * 10 ** (-(m + n)),
      'Multiply coefficients and add the negative exponents.'
    );
  }

  const denominator = randInt(2, 6);
  const quotient = randInt(2, 8);
  const numerator = denominator * quotient;
  const m = randInt(1, 4);
  const n = randInt(m + 1, m + 4);
  return q(
    'scientificNotation',
    `(${numerator} × 10^-${m}) ÷ (${denominator} × 10^${n}) = ?`,
    quotient * 10 ** (-m - n),
    'Divide coefficients and subtract the exponent in the denominator.'
  );
}

function y9GenProportion() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const k = randInt(2, 12);
    const x1 = randInt(2, 8);
    const x2 = randInt(3, 14);
    return q(
      'proportion',
      `y ∝ x. When x=${x1}, y=${k * x1}. Find y when x=${x2}.`,
      k * x2,
      'Find the constant of proportionality, then multiply by the new x-value.'
    );
  }

  if (t === 2) {
    const k = randInt(2, 12);
    const x = randInt(3, 14);
    return q(
      'proportion',
      `y = ${k}x. Find x when y=${k * x}.`,
      x,
      'For direct proportion, divide y by the constant.'
    );
  }

  if (t === 3) {
    const k = randInt(2, 12);
    const x = randInt(2, 12);
    return q(
      'proportion',
      `y ∝ x. When x=${x}, y=${k * x}. Constant k = ?`,
      k,
      'For y=kx, calculate y ÷ x.'
    );
  }

  if (t === 4) {
    const x1 = pick([2, 3, 4, 6, 8, 9, 12]);
    const x2 = pick([2, 3, 4, 6, 8, 9, 12]);
    const constant = lcm(x1, x2) * randInt(2, 8);
    return q(
      'proportion',
      `y ∝ 1/x. When x=${x1}, y=${constant / x1}. Find y when x=${x2}.`,
      constant / x2,
      'For inverse proportion, xy is constant.'
    );
  }

  if (t === 5) {
    const x = pick([2, 3, 4, 5, 6, 8, 10, 12]);
    const y = randInt(2, 12);
    const constant = x * y;
    return q(
      'proportion',
      `y ∝ 1/x and xy=${constant}. Find x when y=${y}.`,
      x,
      'Use x = constant ÷ y.'
    );
  }

  if (t === 6) {
    const items = randInt(3, 9);
    const unitCost = randInt(4, 15);
    const newItems = randInt(4, 14);
    return q(
      'proportion',
      `${items} identical items cost $${items * unitCost}. What do ${newItems} items cost?`,
      newItems * unitCost,
      'This is direct proportion: find the unit cost first.'
    );
  }

  if (t === 7) {
    const workers1 = pick([2, 3, 4, 5, 6, 8]);
    const workers2 = pick([2, 3, 4, 5, 6, 8]);
    const constant = lcm(workers1, workers2) * randInt(2, 6);
    return q(
      'proportion',
      `${workers1} workers take ${constant / workers1} days. At the same rate, ${workers2} workers take ? days.`,
      constant / workers2,
      'Workers and time are inversely proportional.'
    );
  }

  const scale = randInt(2, 12);
  const drawing = randInt(3, 15);
  return q(
    'proportion',
    `A drawing uses scale 1:${scale}. A length of ${drawing} cm represents ? cm.`,
    drawing * scale,
    'Multiply the drawing length by the scale factor.'
  );
}

function y9GenParallelSlopes() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const m = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
    const c = randInt(-12, 12);
    return q(
      'parallelSlopes',
      `A line is parallel to y=${m}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}. Its slope = ?`,
      m,
      'Parallel lines have equal slopes.'
    );
  }

  if (t === 2) {
    const m = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    const x1 = randInt(-5, 3);
    const y1 = randInt(-8, 8);
    const dx = randInt(1, 4);
    const x2 = x1 + dx;
    const y2 = y1 + m * dx;
    return q(
      'parallelSlopes',
      `A line is parallel to the line through (${x1}, ${y1}) and (${x2}, ${y2}). Its slope = ?`,
      m,
      'Find the slope using change in y ÷ change in x.'
    );
  }

  if (t === 3) {
    const m = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    const factor = randInt(2, 6);
    const constant = randInt(-10, 10) * factor;
    return q(
      'parallelSlopes',
      `A line is parallel to ${factor}y = ${factor * m}x ${constant >= 0 ? '+' : '−'} ${Math.abs(constant)}. Its slope = ?`,
      m,
      'Divide the whole equation by the coefficient of y.'
    );
  }

  if (t === 4) {
    const m = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
    const c = randInt(-12, 12);
    return q(
      'parallelSlopes',
      `A line is parallel to ${m}x − y = ${c}. Its slope = ?`,
      m,
      'Rearrange to y=mx−c.'
    );
  }

  if (t === 5) {
    const denominator = randInt(2, 6);
    const m = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    const a = -m * denominator;
    const c = randInt(-15, 15);
    return q(
      'parallelSlopes',
      `A line is parallel to ${a}x + ${denominator}y = ${c}. Its slope = ?`,
      m,
      'For ax+by=c, slope = −a/b.'
    );
  }

  if (t === 6) {
    const m = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    const x1 = randInt(-5, 4);
    const y1 = randInt(-8, 8);
    const dx = randInt(1, 5);
    return q(
      'parallelSlopes',
      `The segment from (${x1}, ${y1}) to (${x1 + dx}, y) is parallel to a line of slope ${m}. Find y.`,
      y1 + m * dx,
      'Use rise = slope × run.'
    );
  }

  if (t === 7) {
    const m = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    const a = randInt(-6, 6);
    const b = randInt(-8, 8);
    return q(
      'parallelSlopes',
      `The line y − (${b}) = ${m}(x − (${a})) is parallel to another line. Its slope = ?`,
      m,
      'Point-slope form shows the slope directly.'
    );
  }

  const m = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
  const c1 = randInt(-10, 10);
  const c2 = c1 + randInt(1, 8);
  return q(
    'parallelSlopes',
    `Are y=${m}x ${c1 >= 0 ? '+' : '−'} ${Math.abs(c1)} and y=${m}x ${c2 >= 0 ? '+' : '−'} ${Math.abs(c2)} parallel? Enter 1 for Yes, 0 for No.`,
    1,
    'Distinct lines with the same slope are parallel.'
  );
}

function y9GenTransformations() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  const x = randInt(-9, 9);
  const y = randInt(-9, 9);

  if (t === 1) {
    const dx = randInt(-7, 7);
    const dy = randInt(-7, 7);
    return q(
      'transformations',
      `Translate (${x}, ${y}) by (${dx}, ${dy}). New x-coordinate = ?`,
      x + dx,
      'Add the horizontal part of the translation vector.'
    );
  }

  if (t === 2) {
    const dx = randInt(-7, 7);
    const dy = randInt(-7, 7);
    return q(
      'transformations',
      `Translate (${x}, ${y}) by (${dx}, ${dy}). New y-coordinate = ?`,
      y + dy,
      'Add the vertical part of the translation vector.'
    );
  }

  if (t === 3) {
    return q(
      'transformations',
      `Reflect (${x}, ${y}) in the x-axis. New y-coordinate = ?`,
      -y,
      'Reflection in the x-axis changes the sign of y.'
    );
  }

  if (t === 4) {
    return q(
      'transformations',
      `Reflect (${x}, ${y}) in the y-axis. New x-coordinate = ?`,
      -x,
      'Reflection in the y-axis changes the sign of x.'
    );
  }

  if (t === 5) {
    const askX = chance(0.5);
    return q(
      'transformations',
      `Reflect (${x}, ${y}) in the line y=x. New ${askX ? 'x' : 'y'}-coordinate = ?`,
      askX ? y : x,
      'Reflection in y=x swaps the coordinates.'
    );
  }

  if (t === 6) {
    const askX = chance(0.5);
    return q(
      'transformations',
      `Rotate (${x}, ${y}) 180° about the origin. New ${askX ? 'x' : 'y'}-coordinate = ?`,
      askX ? -x : -y,
      'A 180° rotation maps (x,y) to (−x,−y).'
    );
  }

  if (t === 7) {
    const askX = chance(0.5);
    return q(
      'transformations',
      `Rotate (${x}, ${y}) 90° anticlockwise about the origin. New ${askX ? 'x' : 'y'}-coordinate = ?`,
      askX ? -y : x,
      'A 90° anticlockwise rotation maps (x,y) to (−y,x).'
    );
  }

  const askX = chance(0.5);
  return q(
    'transformations',
    `Rotate (${x}, ${y}) 90° clockwise about the origin. New ${askX ? 'x' : 'y'}-coordinate = ?`,
    askX ? y : -x,
    'A 90° clockwise rotation maps (x,y) to (y,−x).'
  );
}

function y9GenSimilarity() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const scale = randInt(2, 6);
    const small = randInt(3, 15);
    return q(
      'similarity',
      `Similar shapes have scale factor ${scale} from small to large. A ${small} cm side becomes ? cm.`,
      small * scale,
      'Multiply corresponding lengths by the scale factor.'
    );
  }

  if (t === 2) {
    const scale = randInt(2, 6);
    const small = randInt(3, 15);
    return q(
      'similarity',
      `A large similar shape has a side ${small * scale} cm. Scale factor small→large is ${scale}. Small side = ? cm.`,
      small,
      'Divide by the scale factor.'
    );
  }

  if (t === 3) {
    const scale = randInt(2, 7);
    const small = randInt(2, 12);
    return q(
      'similarity',
      `${small} cm corresponds to ${small * scale} cm in a similar shape. Scale factor = ?`,
      scale,
      'Divide the new length by the original length.'
    );
  }

  if (t === 4) {
    const scale = randInt(2, 6);
    const a = randInt(3, 12);
    const b = randInt(2, 14);
    return q(
      'similarity',
      `In similar shapes, ${a} cm corresponds to ${a * scale} cm. A ${b} cm side corresponds to ? cm.`,
      b * scale,
      'Use the same scale factor for all corresponding lengths.'
    );
  }

  if (t === 5) {
    const scale = randInt(2, 6);
    const smallA = randInt(3, 12);
    const smallB = randInt(2, 14);
    return q(
      'similarity',
      `A small side ${smallA} cm corresponds to ${smallA * scale} cm. A large side is ${smallB * scale} cm. Its matching small side = ? cm.`,
      smallB,
      'Divide the large length by the scale factor.'
    );
  }

  if (t === 6) {
    const model = randInt(2, 12);
    const scale = randInt(5, 30);
    return q(
      'similarity',
      `A model uses scale 1:${scale}. A model length of ${model} cm represents ? cm.`,
      model * scale,
      'Multiply by the scale factor.'
    );
  }

  if (t === 7) {
    const original = randInt(4, 18);
    const numerator = pick([3, 4, 5]);
    const denominator = pick([2, 4]);
    const scale = numerator / denominator;
    return q(
      'similarity',
      `A photo is enlarged by scale factor ${fmt(scale)}. A side of ${original * denominator} cm becomes ? cm.`,
      original * denominator * scale,
      'Multiply the original length by the decimal scale factor.'
    );
  }

  const ratioSmall = randInt(2, 8);
  const ratioLarge = ratioSmall * randInt(2, 6);
  const otherSmall = randInt(3, 15);
  return q(
    'similarity',
    `Corresponding lengths are ${ratioSmall}:${ratioLarge}. If another small length is ${otherSmall}, the matching large length is ?`,
    otherSmall * ratioLarge / ratioSmall,
    'Use the ratio of corresponding lengths.'
  );
}

function y9GenPythagorasInverse() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  const triples = [
    [3, 4, 5],
    [5, 12, 13],
    [6, 8, 10],
    [8, 15, 17],
    [7, 24, 25],
    [9, 12, 15],
    [10, 24, 26],
    [12, 16, 20]
  ];
  const tr = pick(triples);

  if (t === 1) {
    return q(
      'pythagorasInverse',
      `Right triangle legs ${tr[0]} cm and ${tr[1]} cm. Hypotenuse = ? cm`,
      tr[2],
      'Use a²+b²=c².'
    );
  }

  if (t === 2) {
    return q(
      'pythagorasInverse',
      `Right triangle hypotenuse ${tr[2]} cm and one leg ${tr[0]} cm. Other leg = ? cm`,
      tr[1],
      'Use c²−a²=b².'
    );
  }

  if (t === 3) {
    return q(
      'pythagorasInverse',
      `Do sides ${tr[0]}, ${tr[1]}, ${tr[2]} form a right triangle? Enter 1 for Yes, 0 for No.`,
      1,
      'Check whether the two smaller squares add to the largest square.'
    );
  }

  if (t === 4) {
    const changed = tr[2] + pick([-2, -1, 1, 2]);
    return q(
      'pythagorasInverse',
      `Do sides ${tr[0]}, ${tr[1]}, ${changed} form a right triangle? Enter 1 for Yes, 0 for No.`,
      0,
      'Check a²+b² against c².'
    );
  }

  if (t === 5) {
    const scale = randInt(2, 5);
    return q(
      'pythagorasInverse',
      `A right triangle has hypotenuse ${tr[2] * scale} and one leg ${tr[1] * scale}. Other leg = ?`,
      tr[0] * scale,
      'Recognise the scaled Pythagorean triple.'
    );
  }

  if (t === 6) {
    const scale = randInt(2, 5);
    return q(
      'pythagorasInverse',
      `Do sides ${tr[0] * scale}, ${tr[1] * scale}, ${tr[2] * scale} form a right triangle? Enter 1 for Yes, 0 for No.`,
      1,
      'Scaling all three sides preserves the right angle.'
    );
  }

  if (t === 7) {
    const a = randInt(4, 12);
    const b = randInt(4, 12);
    const c = Math.max(a, b) + randInt(2, 7);
    const isRight = a * a + b * b === c * c;
    return q(
      'pythagorasInverse',
      `Do sides ${a}, ${b}, ${c} form a right triangle? Enter 1 for Yes, 0 for No.`,
      isRight ? 1 : 0,
      'Use the largest side as c and test a²+b²=c².'
    );
  }

  const scale = randInt(2, 6);
  return q(
    'pythagorasInverse',
    `A right triangle has legs ${tr[0] * scale} and ${tr[1] * scale}. Find the hypotenuse.`,
    tr[2] * scale,
    'Recognise the scaled Pythagorean triple.'
  );
}

function y9GenTrigRatios() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  const tr = pick([
    [3, 4, 5],
    [5, 12, 13],
    [8, 15, 17],
    [7, 24, 25]
  ]);

  if (t === 1) {
    return qFrac(
      'trigRatios',
      `Opposite=${tr[0]}, hypotenuse=${tr[2]}. sin θ = ?`,
      tr[0] / tr[2],
      'sin θ = opposite ÷ hypotenuse.'
    );
  }

  if (t === 2) {
    return qFrac(
      'trigRatios',
      `Adjacent=${tr[1]}, hypotenuse=${tr[2]}. cos θ = ?`,
      tr[1] / tr[2],
      'cos θ = adjacent ÷ hypotenuse.'
    );
  }

  if (t === 3) {
    return qFrac(
      'trigRatios',
      `Opposite=${tr[0]}, adjacent=${tr[1]}. tan θ = ?`,
      tr[0] / tr[1],
      'tan θ = opposite ÷ adjacent.'
    );
  }

  if (t === 4) {
    const scale = randInt(2, 8);
    return q(
      'trigRatios',
      `sin θ = ${tr[0]}/${tr[2]} and hypotenuse=${tr[2] * scale}. Opposite side = ?`,
      tr[0] * scale,
      'Use opposite = sin θ × hypotenuse.'
    );
  }

  if (t === 5) {
    const scale = randInt(2, 8);
    return q(
      'trigRatios',
      `cos θ = ${tr[1]}/${tr[2]} and hypotenuse=${tr[2] * scale}. Adjacent side = ?`,
      tr[1] * scale,
      'Use adjacent = cos θ × hypotenuse.'
    );
  }

  if (t === 6) {
    const scale = randInt(2, 8);
    return q(
      'trigRatios',
      `tan θ = ${tr[0]}/${tr[1]} and adjacent=${tr[1] * scale}. Opposite side = ?`,
      tr[0] * scale,
      'Use opposite = tan θ × adjacent.'
    );
  }

  if (t === 7) {
    const scale = randInt(2, 8);
    return q(
      'trigRatios',
      `sin θ = ${tr[0]}/${tr[2]} and opposite=${tr[0] * scale}. Hypotenuse = ?`,
      tr[2] * scale,
      'Divide the opposite side by the sine ratio.'
    );
  }

  const scale = randInt(2, 8);
  return q(
    'trigRatios',
    `tan θ = ${tr[0]}/${tr[1]} and opposite=${tr[0] * scale}. Adjacent side = ?`,
    tr[1] * scale,
    'Use adjacent = opposite ÷ tan θ.'
  );
}

function y9GenCylinderVolume() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const r = randInt(2, 7);
    const h = randInt(3, 12);
    return q(
      'cylinderVolume',
      `Cylinder radius ${r} cm, height ${h} cm. Volume = ?π cm³. Enter the coefficient of π.`,
      r * r * h,
      'Volume = πr²h, so enter r²h.'
    );
  }

  if (t === 2) {
    const r = randInt(2, 7);
    const h = randInt(3, 12);
    return q(
      'cylinderVolume',
      `Cylinder diameter ${2 * r} cm, height ${h} cm. Volume = ?π cm³. Enter the coefficient of π.`,
      r * r * h,
      'Find the radius, then enter r²h.'
    );
  }

  if (t === 3) {
    const r = randInt(2, 6);
    const h = randInt(3, 12);
    const volumeCoefficient = r * r * h;
    return q(
      'cylinderVolume',
      `A cylinder has volume ${volumeCoefficient}π cm³ and radius ${r} cm. Height = ? cm`,
      h,
      'Divide the coefficient of π by r².'
    );
  }

  if (t === 4) {
    const r = randInt(2, 7);
    const h = randInt(2, 10);
    const volumeCoefficient = r * r * h;
    return q(
      'cylinderVolume',
      `A cylinder has volume ${volumeCoefficient}π cm³ and height ${h} cm. Radius = ? cm`,
      r,
      'Divide the coefficient of π by h, then take the square root.'
    );
  }

  if (t === 5) {
    const r = pick([7, 14, 21]);
    const h = randInt(2, 10);
    return q(
      'cylinderVolume',
      `Cylinder radius ${r} cm, height ${h} cm. Volume = ?π cm³. Enter the coefficient of π.`,
      r * r * h,
      'Enter r²h as the coefficient of π.'
    );
  }

  if (t === 6) {
    const r = randInt(2, 6);
    const h = randInt(3, 10);
    return q(
      'cylinderVolume',
      `A cylinder's radius doubles from ${r} cm to ${2 * r} cm while height stays ${h} cm. Volume is multiplied by ?`,
      4,
      'Volume depends on r², so doubling r multiplies volume by 4.'
    );
  }

  if (t === 7) {
    const r = randInt(2, 6);
    const h = randInt(3, 10);
    const factor = randInt(2, 5);
    return q(
      'cylinderVolume',
      `A cylinder's height changes from ${h} cm to ${h * factor} cm with the same radius. Volume is multiplied by ?`,
      factor,
      'Volume is directly proportional to height.'
    );
  }

  const r = randInt(2, 8);
  const h = randInt(2, 10);
  return q(
    'cylinderVolume',
    `Cylinder radius ${r} cm, height ${h} cm. Volume = ?π cm³. Enter the coefficient of π.`,
    r * r * h,
    'Square the radius and multiply by the height.'
  );
}

function y9GenSurfaceArea() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const s = randInt(2, 12);
    return q(
      'surfaceArea',
      `Cube side ${s} cm. Surface area = ? cm²`,
      6 * s * s,
      'A cube has 6 square faces.'
    );
  }

  if (t === 2) {
    const l = randInt(3, 12);
    const w = randInt(2, 10);
    const h = randInt(2, 8);
    return q(
      'surfaceArea',
      `Cuboid ${l} cm × ${w} cm × ${h} cm. Surface area = ? cm²`,
      2 * (l * w + l * h + w * h),
      'Surface area = 2(lw+lh+wh).'
    );
  }

  if (t === 3) {
    const s = randInt(2, 12);
    return q(
      'surfaceArea',
      `A cube has surface area ${6 * s * s} cm². Side length = ? cm`,
      s,
      'Divide by 6, then take the square root.'
    );
  }

  if (t === 4) {
    const r = randInt(2, 7);
    const h = randInt(3, 12);
    return q(
      'surfaceArea',
      `Cylinder radius ${r} cm, height ${h} cm. Curved surface area = ?π cm². Enter the coefficient of π.`,
      2 * r * h,
      'Curved surface area = 2πrh, so enter 2rh.'
    );
  }

  if (t === 5) {
    const r = randInt(2, 7);
    const h = randInt(3, 12);
    return q(
      'surfaceArea',
      `Closed cylinder radius ${r} cm, height ${h} cm. Total surface area = ?π cm². Enter the coefficient of π.`,
      2 * r * (r + h),
      'Total surface area = 2πr(r+h), so enter 2r(r+h).'
    );
  }

  if (t === 6) {
    const r = randInt(2, 7);
    const h = randInt(3, 12);
    return q(
      'surfaceArea',
      `Closed cylinder diameter ${2 * r} cm, height ${h} cm. Total surface area = ?π cm². Enter the coefficient of π.`,
      2 * r * (r + h),
      'Convert diameter to radius, then enter 2r(r+h).'
    );
  }

  if (t === 7) {
    const l = randInt(4, 12);
    const w = randInt(3, 10);
    const h = randInt(2, 8);
    return q(
      'surfaceArea',
      `Open-top cuboid ${l}×${w}×${h} cm. Surface area = ? cm²`,
      l * w + 2 * l * h + 2 * w * h,
      'Include the base and four side faces, but not the top.'
    );
  }

  const s = randInt(3, 10);
  const h = randInt(3, 12);
  return q(
    'surfaceArea',
    `Square-based prism base side ${s} cm, height ${h} cm. Surface area = ? cm²`,
    2 * s * s + 4 * s * h,
    'Add two square bases and four rectangular side faces.'
  );
}

function y9GenCompoundProbability() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const tosses = randInt(2, 5);
    return qFrac(
      'compoundProbability',
      `A fair coin is tossed ${tosses} times. P(all heads) = ?`,
      1 / (2 ** tosses),
      'Multiply 1/2 for each independent toss.'
    );
  }

  if (t === 2) {
    const tosses = randInt(2, 5);
    return qFrac(
      'compoundProbability',
      `A fair coin is tossed ${tosses} times. P(no heads) = ?`,
      1 / (2 ** tosses),
      'No heads means every toss is tails.'
    );
  }

  if (t === 3) {
    const favourable = pick([2, 3]);
    const single = favourable === 2 ? 3 / 6 : 2 / 6;
    return qFrac(
      'compoundProbability',
      `A fair dice is rolled twice. P(both rolls are ${favourable === 2 ? 'even' : 'multiples of 3'}) = ?`,
      single * single,
      'Multiply the probability for the two independent rolls.'
    );
  }

  if (t === 4) {
    const d1 = pick([4, 5, 6, 8, 10]);
    const d2 = pick([4, 5, 6, 8, 10]);
    const n1 = randInt(1, d1 - 1);
    const n2 = randInt(1, d2 - 1);
    return qFrac(
      'compoundProbability',
      `Independent events have P(A)=${n1}/${d1} and P(B)=${n2}/${d2}. P(A and B) = ?`,
      (n1 / d1) * (n2 / d2),
      'For independent events, multiply the probabilities.'
    );
  }

  if (t === 5) {
    const red = randInt(2, 8);
    const blue = randInt(2, 8);
    const total = red + blue;
    return qFrac(
      'compoundProbability',
      `Bag: ${red} red, ${blue} blue. With replacement, P(red then blue) = ?`,
      (red / total) * (blue / total),
      'Replacement keeps the total unchanged.'
    );
  }

  if (t === 6) {
    const red = randInt(3, 9);
    const blue = randInt(2, 8);
    const total = red + blue;
    return qFrac(
      'compoundProbability',
      `Bag: ${red} red, ${blue} blue. Without replacement, P(red then red) = ?`,
      (red / total) * ((red - 1) / (total - 1)),
      'After one red is removed, both the red count and total decrease by 1.'
    );
  }

  if (t === 7) {
    const red = randInt(2, 8);
    const blue = randInt(2, 8);
    const total = red + blue;
    return qFrac(
      'compoundProbability',
      `Bag: ${red} red, ${blue} blue. Without replacement, P(red then blue) = ?`,
      (red / total) * (blue / (total - 1)),
      'The total decreases after the first draw.'
    );
  }

  const denominator = pick([2, 3, 4, 5]);
  const p = 1 / denominator;
  return qFrac(
    'compoundProbability',
    `An independent event has probability 1/${denominator}. It is tried twice. P(at least one success) = ?`,
    1 - (1 - p) ** 2,
    'Use 1 − P(no successes).'
  );
}

function y9GenStatisticsData() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);

  if (t === 1) {
    const q1 = randInt(3, 12);
    const medianValue = q1 + randInt(3, 8);
    const q3 = medianValue + randInt(3, 8);
    const values = [
      q1 - randInt(1, 3),
      q1,
      q1 + randInt(1, 2),
      medianValue,
      q3 - randInt(1, 2),
      q3,
      q3 + randInt(1, 3)
    ].sort((a, b) => a - b);
    return q(
      'statisticsData',
      `For ordered data ${values.join(', ')}, IQR = ?`,
      values[5] - values[1],
      'For 7 values, Q1 is the second value and Q3 is the sixth value.'
    );
  }

  if (t === 2) {
    const count = pick([4, 5, 6, 7]);
    const meanValue = randInt(6, 20);
    let known;
    let missing;
    do {
      known = Array.from({ length: count - 1 }, () => randInt(2, 24));
      missing = meanValue * count - known.reduce((sum, value) => sum + value, 0);
    } while (missing < 0 || missing > 30);

    return q(
      'statisticsData',
      `${count} numbers have mean ${meanValue}. Known values: ${known.join(', ')}. Missing value = ?`,
      missing,
      'Total = mean × number of values, then subtract the known values.'
    );
  }

  if (t === 3) {
    const left1 = randInt(1, 8);
    const left2 = left1 + randInt(1, 4);
    const medianValue = left2 + randInt(1, 5);
    const right1 = medianValue + randInt(1, 4);
    const right2 = right1 + randInt(1, 4);
    return q(
      'statisticsData',
      `Ordered data: ${left1}, ${left2}, □, ${right1}, ${right2}. Median = ${medianValue}. Missing value = ?`,
      medianValue,
      'With 5 ordered values, the third value is the median.'
    );
  }

  if (t === 4) {
    const minimum = randInt(1, 12);
    const range = randInt(6, 20);
    return q(
      'statisticsData',
      `A data set has minimum ${minimum} and range ${range}. Maximum = ?`,
      minimum + range,
      'Maximum = minimum + range.'
    );
  }

  if (t === 5) {
    const q1 = randInt(3, 12);
    const values = [
      q1 - randInt(1, 3),
      '□',
      q1 + randInt(1, 3),
      q1 + randInt(4, 7),
      q1 + randInt(8, 11),
      q1 + randInt(12, 15),
      q1 + randInt(16, 20)
    ];
    return q(
      'statisticsData',
      `Ordered data: ${values.join(', ')}. Q1=${q1}. Missing value = ?`,
      q1,
      'For 7 ordered values, Q1 is the second value.'
    );
  }

  if (t === 6) {
    const q3 = randInt(12, 24);
    const values = [
      q3 - randInt(16, 20),
      q3 - randInt(12, 15),
      q3 - randInt(8, 11),
      q3 - randInt(4, 7),
      q3 - randInt(1, 3),
      '□',
      q3 + randInt(1, 3)
    ];
    return q(
      'statisticsData',
      `Ordered data: ${values.join(', ')}. Q3=${q3}. Missing value = ?`,
      q3,
      'For 7 ordered values, Q3 is the sixth value.'
    );
  }

  if (t === 7) {
    const count = 8;
    const meanValue = randInt(8, 22);
    let known;
    let missing;
    do {
      known = Array.from({ length: count - 1 }, () => randInt(3, 25));
      missing = meanValue * count - known.reduce((sum, value) => sum + value, 0);
    } while (missing < 0 || missing > 35);

    return q(
      'statisticsData',
      `Eight numbers have mean ${meanValue}. Seven are ${known.join(', ')}. Missing value = ?`,
      missing,
      'Find the total of all eight numbers, then subtract the seven known values.'
    );
  }

  const start = randInt(1, 8);
  const gaps = Array.from({ length: 7 }, () => randInt(1, 4));
  const values = [start];
  gaps.forEach(gap => values.push(values[values.length - 1] + gap));
  const q1 = (values[1] + values[2]) / 2;
  const q3 = (values[5] + values[6]) / 2;
  return q(
    'statisticsData',
    `For ordered data ${values.join(', ')}, IQR = ?`,
    q3 - q1,
    'For 8 values, Q1 and Q3 are the medians of the lower and upper four values.'
  );
}
