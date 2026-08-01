'use strict';

/* Base Year 8 question generators.
   Split from DYAAPS.html without changing the original logic. */

/* ===== YEAR 8 QUESTION GENERATORS ===== */

function y8GenRational(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(-20,20),b=randInt(-20,20);return q('rational',`${a} + (${b}) = ?`,a+b,'Add signed numbers using the number line or sign rules.')}
  if(t===2){const a=randInt(-18,22),b=randInt(-18,22);return q('rational',`${a} − (${b}) = ?`,a-b,'Subtracting a negative is the same as adding.')}
  if(t===3){const a=randInt(-12,-2),b=randInt(2,12);return q('rational',`${a} × ${b} = ?`,a*b,'A negative times a positive is negative.')}
  if(t===4){const d=randInt(2,10),ans=randInt(-12,12);return q('rational',`${d*ans} ÷ ${d} = ?`,ans,'Use multiplication facts and the sign of the dividend.')}
  if(t===5){const [a,b,c,d]=pick([[-1,2,3,4],[-3,4,1,2],[-2,3,5,6],[-5,6,1,3]]);return qFrac('rational',`${a}/${b} + ${c}/${d} = ?`,a/b+c/d,'Use a common denominator and keep the signs.')}
  if(t===6){const a=-randInt(12,65)/10,b=randInt(8,75)/10;return q('rational',`${fmt(a)} + ${fmt(b)} = ?`,roundTo(a+b),'Line up decimal places and compare the signs.')}
  if(t===7){const a=randInt(-12,12),b=randInt(-10,10),c=randInt(-8,8);return q('rational',`${a} − (${b} − (${c})) = ?`,a-(b-c),'Work from the innermost brackets.')}
  const [a,b,c,d]=pick([[-3,4,-2,3],[-5,8,-6,10],[-7,10,-3,4],[-1,2,-45,100]]);const v1=a/b,v2=c/d;return q('rational',`Which is greater? Enter 1 for ${a}/${b}, or 2 for ${c}/${d}.`,v1>v2?1:2,'Convert both values to decimals or use a common denominator.')}


function y8GenOrder(){const L=state.level,t=L==='starter'?randInt(1,3):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(8,35),b=randInt(2,9),c=randInt(2,9);return q('order',`${a} + ${b} × ${c} = ?`,a+b*c,'Multiply before adding.')}
  if(t===2){const a=randInt(2,9),b=randInt(8,20),c=randInt(2,7);return q('order',`${a} × (${b} − ${c}) = ?`,a*(b-c),'Brackets first.')}
  if(t===3){const a=randInt(2,9),b=randInt(2,8),c=randInt(2,8);return q('order',`${a}² + ${b} × ${c} = ?`,a*a+b*c,'Powers first, then multiplication.')}
  if(t===4){const a=randInt(-10,12),b=randInt(2,8),c=randInt(-6,7);return q('order',`${a} − ${b} × (${c}) = ?`,a-b*c,'Multiply first, including the sign.')}
  if(t===5){const d=pick([2,3,4,5]),k=randInt(5,15),a=randInt(2,d*k-2),b=d*k-a,c=randInt(2,10);return q('order',`(${a} + ${b}) ÷ ${d} + ${c} = ?`,k+c,'Brackets, division, then addition.')}
  if(t===6){const a=randInt(18,45),b=randInt(2,7),c=randInt(4,12),d=randInt(1,c-1);return q('order',`${a} − ${b} × (${c} − ${d}) = ?`,a-b*(c-d),'Brackets before multiplication.')}
  if(t===7){const a=randInt(3,8),b=randInt(2,6),c=randInt(3,9),d=randInt(1,4);return q('order',`${a}² − ${b} × (${c} − ${d}) = ?`,a*a-b*(c-d),'Powers and brackets come first.')}
  const a=randInt(2,6),b=randInt(3,8),c=randInt(1,5),d=pick([2,4]);const top=(a+b)*(c+d);return q('order',`(${a} + ${b}) × (${c} + ${d}) ÷ ${d} = ?`,top/d,'Evaluate both brackets, then work left to right.')}


function y8GenPowers(){const L=state.level,t=L==='starter'?randInt(1,3):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const n=randInt(3,18);return q('powers',`${n}² = ?`,n*n,'Square the number.')}
  if(t===2){const n=pick([8,27,64,125,216,343]);return q('powers',`Cube root of ${n} = ?`,Math.round(Math.cbrt(n)),'Find the number whose cube gives the value.')}
  if(t===3){const b=pick([2,3,5]),a=randInt(1,4),c=randInt(1,4);return q('powers',`${b}^${a} × ${b}^${c} = ${b}^?`,a+c,'Same base: add the exponents.')}
  if(t===4){const b=pick([2,3,5,7]),a=randInt(4,8),c=randInt(1,a-1);return q('powers',`${b}^${a} ÷ ${b}^${c} = ${b}^?`,a-c,'Same base: subtract the exponents.')}
  if(t===5){const b=pick([2,3,4,5]),a=randInt(2,4),c=randInt(2,3);return q('powers',`(${b}^${a})^${c} = ${b}^?`,a*c,'A power raised to a power multiplies exponents.')}
  if(t===6){const b=randInt(2,20);return q('powers',`${b}^0 = ?`,1,'Any non-zero number to the power zero equals 1.')}
  if(t===7){const coefficient=pick([1.2,2.5,3.6,4.2,5.8,7.5]),exp=randInt(2,5);return q('powers',`${fmt(coefficient)} × 10^${exp} = ?`,coefficient*10**exp,'Move the decimal point to the right by the exponent.')}
  const a=pick([4,6,8]),b=pick([2,4]),m=randInt(3,5),n=randInt(1,m-1);return q('powers',`(${a} × 10^${m}) ÷ (${b} × 10^${n}) = ?`,a/b*10**(m-n),'Divide coefficients and subtract powers of 10.')}


function y8GenFactors(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=pick([24,36,42,48,54,60,72]),b=pick([30,40,45,56,60,72,84]);return q('factors',`HCF of ${a} and ${b} = ?`,gcd(a,b),'Use common prime factors or factor lists.')}
  if(t===2){const a=pick([6,8,9,10,12,15,18]),b=pick([8,10,12,14,15,18,20]);return q('factors',`LCM of ${a} and ${b} = ?`,lcm(a,b),'Use the highest required powers of each prime.')}
  if(t===3){const e2=randInt(1,5),e3=randInt(1,3),n=2**e2*3**e3;return q('factors',`In the prime factorisation of ${n}, the exponent of 2 is ?`,e2,'Repeatedly divide by 2.')}
  if(t===4){const n=pick([66,78,84,90,98,102,114,126]);return q('factors',`Smallest prime factor of ${n} = ?`,primeFactors(n)[0],'Test 2, 3, 5 and 7 in order.')}
  if(t===5){const n=pick([24,30,36,40,48,54,60,72]);return q('factors',`How many positive factors does ${n} have?`,countFactors(n),'Use factor pairs or prime exponents.')}
  if(t===6){const n=pick([12,18,20,24,45,50,72,75]);return q('factors',`Smallest integer that makes ${n} × □ a perfect square = ?`,squareMultiplier(n),'Every prime exponent must become even.')}
  if(t===7){const n=pick([60,72,84,90,120,126,150]);return q('factors',`How many distinct prime factors does ${n} have?`,new Set(primeFactors(n)).size,'Count each different prime once.')}
  const a=pick([72,96,108,120]),b=pick([84,126,144,180]);return q('factors',`HCF of ${a} and ${b} = ?`,gcd(a,b),'Compare prime factors and use the smaller exponents.')}


function y8GenFractions(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const [a,b,c,d]=pick([[3,4,5,12],[5,6,1,4],[7,10,3,5],[2,3,5,8]]);return qFrac('fractions',`${a}/${b} + ${c}/${d} = ?`,a/b+c/d,'Find a common denominator.')}
  if(t===2){const [a,b,c,d]=pick([[5,6,3,8],[7,8,5,12],[9,10,2,5],[11,12,1,3]]);return qFrac('fractions',`${a}/${b} − ${c}/${d} = ?`,a/b-c/d,'Use a common denominator before subtracting.')}
  if(t===3){const [a,b,c,d]=pick([[2,3,9,10],[5,6,3,5],[7,8,4,7],[3,4,10,9]]);return qFrac('fractions',`${a}/${b} × ${c}/${d} = ?`,a/b*c/d,'Cancel common factors before multiplying.')}
  if(t===4){const [a,b,c,d]=pick([[3,4,1,2],[5,8,1,4],[7,10,7,20],[2,3,4,9]]);return qFrac('fractions',`${a}/${b} ÷ ${c}/${d} = ?`,(a/b)/(c/d),'Multiply by the reciprocal.')}
  if(t===5){const whole=randInt(1,3),[a,b,c,d]=pick([[1,2,3,4],[2,3,5,6],[3,5,7,10]]);return qFrac('fractions',`${whole} ${a}/${b} + ${c}/${d} = ?`,whole+a/b+c/d,'Convert the mixed number or add whole and fractional parts.')}
  if(t===6){const [a,b,c,d]=pick([[-3,4,5,6],[-5,8,1,2],[-2,3,7,12]]);return qFrac('fractions',`${a}/${b} + ${c}/${d} = ?`,a/b+c/d,'Use a common denominator and keep the negative sign.')}
  if(t===7){const [a,b,c,d]=pick([[3,4,2,5],[5,6,3,7],[7,8,4,9]]);return qFrac('fractions',`${a}/${b} of ${c}/${d} = ?`,a/b*c/d,'“Of” means multiply.')}
  const [a,b,c,d,e,f]=pick([[1,2,3,4,2,3],[2,3,5,6,3,5],[3,4,1,2,5,6]]);return qFrac('fractions',`${a}/${b} + ${c}/${d} × ${e}/${f} = ?`,a/b+c/d*e/f,'Multiply before adding.')}


function y8GenDecimals(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(125,875)/100,b=randInt(25,325)/100;return q('decimals',`${fmt(a)} + ${fmt(b)} = ?`,roundTo(a+b),'Align decimal places.')}
  if(t===2){const a=randInt(500,999)/100,b=randInt(25,Math.floor(a*100)-25)/100;return q('decimals',`${fmt(a)} − ${fmt(b)} = ?`,roundTo(a-b),'Align decimal places and subtract.')}
  if(t===3){const a=randInt(12,85)/10,b=pick([0.2,0.5,1.5,2.5]);return q('decimals',`${fmt(a)} × ${fmt(b)} = ?`,roundTo(a*b),'Use place value or a related fraction.')}
  if(t===4){const divisor=pick([0.2,0.4,0.5,0.7]),ans=randInt(2,15),dividend=roundTo(divisor*ans);return q('decimals',`${fmt(dividend)} ÷ ${fmt(divisor)} = ?`,ans,'Scale both numbers to remove the decimal divisor.')}
  if(t===5){const n=randInt(10001,99999)/10000,dp=pick([1,2,3]);return q('decimals',`Round ${fmt(n)} to ${dp} decimal place${dp===1?'':'s'}`,roundTo(n,dp),'Look at the next digit.')}
  if(t===6){const n=pick([0.07846,0.004372,12.846,384.72,6.995]),sig=pick([2,3]);return q('decimals',`Round ${fmt(n)} to ${sig} significant figures`,roundSig(n,sig),'Start counting from the first non-zero digit.')}
  if(t===7){const a=randInt(145,255)/10,b=randInt(26,44)/10;return q('decimals',`Estimate ${fmt(a)} × ${fmt(b)} by rounding both to whole numbers`,Math.round(a)*Math.round(b),'Round each factor first.')}
  const a=pick([3.6,4.8,7.2,8.4,9.6]),b=pick([0.2,0.4,0.6,0.8]);return q('decimals',`${fmt(a)} ÷ ${fmt(b)} = ?`,roundTo(a/b),'Multiply both numbers by 10, then divide.')}


function y8GenPercentages(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const p=pick([10,15,20,25,30,35,40,60,75]),base=pick([40,60,80,100,120,160,200,240,300]);return q('percentages',`${p}% of ${base} = ?`,base*p/100,'Build the percentage from 10%, 5%, 25% or 50%.')}
  if(t===2){const price=pick([60,80,120,160,200,240]),p=pick([10,15,20,25,30]);return q('percentages',`original price $${price} after ${p}% off = $?`,roundTo(price*(1-p/100)),'Find the discount, then subtract it.')}
  if(t===3){const n=pick([40,60,80,120,160,200]),p=pick([10,15,20,25]);const up=chance(.5);return q('percentages',`${up?'Increase':'Decrease'} ${n} by ${p}%`,roundTo(n*(up?1+p/100:1-p/100)),'Find the percentage change, then add or subtract.')}
  if(t===4){const old=pick([40,50,80,100,120]),p=pick([10,15,20,25,30]);const neu=roundTo(old*(1+p/100));return q('percentages',`${old} increases to ${fmt(neu)}. Percentage increase = ?%`,p,'Change ÷ original × 100.')}
  if(t===5){const original=pick([40,50,60,80,100,120]),p=pick([10,20,25,50]),final=roundTo(original*(1+p/100));return q('percentages',`A number increases by ${p}% to ${fmt(final)}. Original number = ?`,original,'Divide by the multiplier 1 + percentage.')}
  if(t===6){const original=pick([60,80,100,120,160,200]),p=pick([10,20,25]),sale=roundTo(original*(1-p/100));return q('percentages',`After a ${p}% discount, a price is $${fmt(sale)}. Original price = $?`,original,'Divide the sale price by the remaining percentage.')}
  if(t===7){const cost=pick([40,50,60,80,100]),p=pick([10,20,25,30]);return q('percentages',`An item costs $${cost} and is sold for ${p}% profit. Selling price = $?`,cost*(1+p/100),'Profit is a percentage of the cost price.')}
  const d=pick([0.125,0.24,0.375,0.48,0.625,0.72,0.875]);return q('percentages',`${fmt(d)} = ?%`,d*100,'Multiply the decimal by 100.')}


function y8GenRatio(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(2,9),b=randInt(2,10),k=randInt(2,8);return qRatio('ratio',`Simplify ${a*k}:${b*k}`,simplifyRatio(a,b),'Divide both parts by their HCF.')}
  if(t===2){const a=randInt(2,8),b=randInt(3,10),k=randInt(2,7);return q('ratio',`${a}:${b} = ${a*k}:?`,b*k,'Multiply both parts by the same scale factor.')}
  if(t===3){const a=randInt(2,6),b=randInt(3,8),one=randInt(4,12),total=(a+b)*one;return q('ratio',`Share $${total} in the ratio ${a}:${b}. Smaller share = $?`,Math.min(a,b)*one,'Find one ratio part first.')}
  if(t===4){const items=randInt(3,9),unit=randInt(4,15),cost=items*unit;return q('ratio',`${items} items cost $${cost}. Cost per item = $?`,unit,'Divide total cost by the number of items.')}
  if(t===5){const a=randInt(3,8),b=randInt(4,10),k=randInt(2,7);return q('ratio',`${a} workers complete ${b} units. At the same rate, ${a*k} workers complete ? units.`,b*k,'Use direct proportion.')}
  if(t===6){const speed=pick([45,50,60,70,80,90]),time=pick([1.5,2,2.5,3]);return q('ratio',`${speed} km/h for ${time} h = ? km`,speed*time,'Distance = speed × time.')}
  if(t===7){const a=randInt(2,6),b=randInt(3,9),red=a*randInt(4,10);return q('ratio',`Red:Blue = ${a}:${b}. If red = ${red}, blue = ?`,red/a*b,'Find the scale factor.')}
  const scale=pick([2,5,10,20]),cm=randInt(3,12);return q('ratio',`Map scale: 1 cm represents ${scale} km. ${cm} cm represents ? km`,scale*cm,'Multiply the map length by the scale rate.')}


function y8GenAlgebra(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const x=randInt(-6,12),a=randInt(2,8),b=randInt(-12,14);return q('algebra',`If x=${x}, find ${a}x ${b>=0?'+':'−'} ${Math.abs(b)}.`,a*x+b,'Substitute the value of x.')}
  if(t===2){const a=randInt(2,9),b=randInt(2,9),c=randInt(1,Math.min(a+b-1,7));return q('algebra',`Coefficient of x after simplifying ${a}x + ${b}x − ${c}x = ?`,a+b-c,'Combine like terms.')}
  if(t===3){const a=randInt(2,7),b=randInt(2,9);return q('algebra',`Coefficient of x after expanding ${a}(2x − ${b}) = ?`,2*a,'Multiply every term inside the bracket.')}
  if(t===4){const a=randInt(2,7),b=randInt(2,9),c=randInt(-8,8);return q('algebra',`Constant term after expanding ${a}(x − ${b}) ${c>=0?'+':'−'} ${Math.abs(c)} = ?`,-a*b+c,'Expand the bracket, then combine constants.')}
  if(t===5){const a=pick([4,6,8,10,12]),b=pick([6,9,12,15,18]);return q('algebra',`Greatest numerical factor of ${a}x + ${b} = ?`,gcd(a,b),'Find the HCF of the coefficients.')}
  if(t===6){const x=randInt(-4,8),y=randInt(-5,7),a=randInt(2,5),b=randInt(2,5);return q('algebra',`If x=${x}, y=${y}, find ${a}x² − ${b}y.`,a*x*x-b*y,'Square x before multiplying.')}
  if(t===7){const x=randInt(2,10),a=randInt(2,6),b=a*randInt(1,5);return q('algebra',`If x=${x}, find (${a}x + ${b}) ÷ ${a}.`,(a*x+b)/a,'Substitute first, then divide.')}
  const x=randInt(-5,8),a=randInt(2,6),b=randInt(1,6),c=randInt(-8,8);return q('algebra',`If x=${x}, find ${a}(x − ${b}) ${c>=0?'+':'−'} ${Math.abs(c)}.`,a*(x-b)+c,'Expand or evaluate the bracket first.')}


function y8GenEquations() {
  const L = state.level;
  const t = L === 'starter'
    ? randInt(1, 4)
    : L === 'core'
      ? randInt(1, 6)
      : randInt(1, 8);
  const x = randInt(L === 'challenge' ? -8 : 1, 15);

  if (t === 1) {
    const a = randInt(2, 8);
    const b = randInt(2, 15);
    return q('equations', `${a}x + ${b} = ${a * x + b}Then x = ?`, x, 'Undo addition, then divide.');
  }

  if (t === 2) {
    const a = randInt(3, 9);
    const b = randInt(2, 14);
    return q('equations', `${a}x − ${b} = ${a * x - b}Then x = ?`, x, 'Undo subtraction, then divide.');
  }

  if (t === 3) {
    const a = randInt(2, 6);
    const b = randInt(1, 8);
    return q('equations', `${a}(x − ${b}) = ${a * (x - b)}Then x = ?`, x, 'Divide first, then add.');
  }

  if (t === 4) {
    const divisor = randInt(2, 7);
    const quotient = randInt(L === 'challenge' ? -8 : 1, 15);
    const b = randInt(1, 10);
    const dividend = divisor * quotient;
    return q(
      'equations',
      `x ÷ ${divisor} + ${b} = ${quotient + b}Then x = ?`,
      dividend,
      'Subtract, then multiply by the divisor.'
    );
  }

  if (t === 5) {
    const a = randInt(3, 8);
    const c = randInt(1, a - 1);
    const b = randInt(1, 12);
    const d = a * x + b - c * x;
    return q('equations', `${a}x + ${b} = ${c}x + ${d}Then x = ?`, x, 'Collect x terms on one side and constants on the other.');
  }

  if (t === 6) {
    const a = pick([0.5, 1.5, 2.5]);
    const b = randInt(2, 12);
    const rhs = a * x + b;
    return q('equations', `${fmt(a)}x + ${b} = ${fmt(rhs)}Then x = ?`, x, 'Undo the constant, then divide by the decimal coefficient.');
  }

  if (t === 7) {
    const a = randInt(2, 6);
    const b = randInt(1, 7);
    const c = randInt(1, 7);
    const rhs = a * (x - b) + c;
    return q('equations', `${a}(x − ${b}) + ${c} = ${rhs}Then x = ?`, x, 'Undo the outside constant, divide, then add.');
  }

  const a = randInt(2, 6);
  const b = randInt(1, 10);
  const c = randInt(1, a - 1);
  const d = a * x - b - c * x;
  return q('equations', `${a}x − ${b} = ${c}x + ${d}Then x = ?`, x, 'Move x terms together, then solve.');
}

function y8GenInequalities(){const L=state.level,t=L==='starter'?randInt(1,3):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(2,12),boundary=randInt(-5,15);return q('inequalities',`x + ${a} > ${boundary+a}. Boundary value = ?`,boundary,'Subtract the constant from both sides.')}
  if(t===2){const a=randInt(2,8),limit=randInt(2,12);return q('inequalities',`${a}x ≤ ${a*limit}. Greatest integer solution = ?`,limit,'Divide by the positive coefficient.')}
  if(t===3){const limit=randInt(-8,4),a=randInt(2,6);return q('inequalities',`-${a}x < ${-a*limit}. Smallest integer solution = ?`,limit+1,'Dividing by a negative reverses the inequality.')}
  if(t===4){const boundary=randInt(2,7);return q('inequalities',`How many integers from 0 to 10 satisfy x ≥ ${boundary}?`,11-boundary,'Count the integers including the boundary.')}
  if(t===5){const a=randInt(2,6),b=randInt(-8,8),x=randInt(-5,10),rhs=a*randInt(-3,8)+b;const yes=a*x+b>=rhs;return q('inequalities',`Does x=${x} satisfy ${a}x ${b>=0?'+':'−'} ${Math.abs(b)} ≥ ${rhs}? Enter 1 for Yes, 0 for No.`,yes?1:0,'Substitute the value and compare both sides.')}
  if(t===6){const a=randInt(2,6),boundary=randInt(-4,10),b=randInt(1,12);return q('inequalities',`${a}x + ${b} < ${a*boundary+b}. Boundary value = ?`,boundary,'Subtract the constant and divide by the positive coefficient.')}
  if(t===7){const low=randInt(-6,0),high=randInt(2,8);return q('inequalities',`How many integers satisfy ${low} ≤ x < ${high}?`,high-low,'List the integers from the lower bound up to one less than the upper bound.')}
  const a=randInt(2,6),boundary=randInt(-8,5);return q('inequalities',`-${a}x ≥ ${-a*boundary}. Greatest integer solution = ?`,boundary,'Reverse the sign when dividing by the negative coefficient.')}


function y8GenSequences(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(-10,20),d=randInt(2,10);return q('sequences',`${a}, ${a+d}, ${a+2*d}, ${a+3*d}, ... next = ?`,a+4*d,'Add the common difference.')}
  if(t===2){const a=randInt(1,10),d=randInt(2,9),n=randInt(6,15);return q('sequences',`Sequence starts ${a} and increases by ${d}. Term ${n} = ?`,a+(n-1)*d,'Use first term + (n−1) × difference.')}
  if(t===3){const a=randInt(1,8),d=randInt(2,8),n=randInt(5,12),term=a+(n-1)*d;return q('sequences',`In ${a}, ${a+d}, ${a+2*d}, ... which term equals ${term}?`,n,'Solve a + (n−1)d = the given term.')}
  if(t===4){const a=randInt(1,5),r=pick([2,3,-2]);return q('sequences',`${a}, ${a*r}, ${a*r*r}, ${a*r*r*r}, ... next = ?`,a*r**4,'Multiply by the common ratio.')}
  if(t===5){const n=randInt(4,12),a=randInt(2,7),b=randInt(-6,9);return q('sequences',`Tₙ = ${a}n ${b>=0?'+':'−'} ${Math.abs(b)}. T${n} = ?`,a*n+b,'Substitute the term number.')}
  if(t===6){const a=randInt(-12,5),d=randInt(3,9);return q('sequences',`${a}, ${a+d}, □, ${a+3*d}. Missing term = ?`,a+2*d,'The difference stays constant.')}
  if(t===7){return q('sequences','2, 6, 12, 20, ... next = ?',30,'First differences increase by 2.')}
  const a=randInt(1,4),b=randInt(0,5),n=randInt(4,9);return q('sequences',`Tₙ = ${a}n² ${b?`+ ${b}`:''}. T${n} = ?`,a*n*n+b,'Square n first, then multiply and add.')}


function y8GenCoordinates(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const x=pick([-6,-5,-4,-3,3,4,5,6]),y=pick([-7,-5,-3,3,5,7]);const quadrant=x>0&&y>0?1:x<0&&y>0?2:x<0&&y<0?3:4;return q('coordinates',`Point (${x}, ${y}) is in which quadrant? Enter 1, 2, 3 or 4.`,quadrant,'Use the signs of x and y.')}
  if(t===2){const horizontal=chance(.5),a=randInt(-8,4),b=randInt(a+2,10),fixed=randInt(-6,6);return q('coordinates',horizontal?`Distance between (${a}, ${fixed}) and (${b}, ${fixed}) = ?`:`Distance between (${fixed}, ${a}) and (${fixed}, ${b}) = ?`,b-a,'Subtract the matching coordinates.')}
  if(t===3){const x1=randInt(-8,4),x2=x1+2*randInt(1,6),y1=randInt(-8,4),y2=y1+2*randInt(1,6);const askX=chance(.5);return q('coordinates',`Midpoint of (${x1}, ${y1}) and (${x2}, ${y2}). ${askX?'x':'y'}-coordinate = ?`,askX?(x1+x2)/2:(y1+y2)/2,'Average the matching coordinates.')}
  if(t===4){const m=pick([-3,-2,-1,1,2,3,4]),x1=randInt(-4,4),y1=randInt(-5,5),dx=pick([1,2,3]),x2=x1+dx,y2=y1+m*dx;return q('coordinates',`Slope through (${x1}, ${y1}) and (${x2}, ${y2}) = ?`,m,'Slope = change in y ÷ change in x.')}
  if(t===5){const m=pick([-4,-3,-2,2,3,4]),c=randInt(-8,8),x=randInt(-5,7);return q('coordinates',`For y = ${m}x ${c>=0?'+':'−'} ${Math.abs(c)}, find y when x=${x}.`,m*x+c,'Substitute the x-coordinate.')}
  if(t===6){const m=pick([-5,-3,-2,2,3,5]),c=randInt(-12,12);return q('coordinates',`y = ${m}x ${c>=0?'+':'−'} ${Math.abs(c)}. y-intercept = ?`,c,'The y-intercept is the constant term.')}
  if(t===7){const m=pick([2,3,4,5]),c=randInt(-8,8),x=randInt(-4,8),y=m*x+c;return q('coordinates',`On y = ${m}x ${c>=0?'+':'−'} ${Math.abs(c)}, y=${y}Then x = ?`,x,'Subtract the intercept, then divide by the slope.')}
  const x=randInt(-8,8),y=randInt(-8,8),dx=randInt(-5,5),dy=randInt(-5,5),askX=chance(.5);return q('coordinates',`Translate (${x}, ${y}) by (${dx}, ${dy}). New ${askX?'x':'y'}-coordinate = ?`,askX?x+dx:y+dy,'Add the translation vector to the point.')}


function y8GenGeometry(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const a=randInt(25,85),b=randInt(25,Math.min(95,170-a));return q('geometry',`Triangle angles are ${a}° and ${b}°. Third angle = ?°`,180-a-b,'Angles in a triangle total 180°.')}
  if(t===2){const sides=pick([5,6,7,8,9,10]);return q('geometry',`Interior angle sum of a ${sides}-sided polygon = ?°`,(sides-2)*180,'Use (n−2) × 180°.')}
  if(t===3){const b=randInt(5,20),h=randInt(4,16),kind=chance(.5);return q('geometry',`${kind?'Parallelogram':'Triangle'} base ${b} cm, height ${h} cm. Area = ? cm²`,kind?b*h:b*h/2,kind?'Area = base × height.':'Area = 1/2 × base × height.')}
  if(t===4){const l=randInt(3,12),w=randInt(3,10),h=randInt(2,8);return q('geometry',`Cuboid ${l} cm × ${w} cm × ${h} cm. Volume = ? cm³`,l*w*h,'Volume = length × width × height.')}
  if(t===5){const triple=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25]]);return q('geometry',`Right triangle legs ${triple[0]} cm and ${triple[1]} cm. Hypotenuse = ? cm`,triple[2],'Use a² + b² = c².')}
  if(t===6){const r=pick([2,3,4,5,10]);return q('geometry',`Circle radius ${r} cm. Circumference = ?π cm. Enter the coefficient of π.`,2*r,'Circumference = 2πr, so enter 2r.')}
  if(t===7){const r=pick([2,3,4,5,10]);return q('geometry',`Circle radius ${r} cm. Area = ?π cm². Enter the coefficient of π.`,r*r,'Area = πr², so enter r².')}
  const area=randInt(12,60),scale=pick([2,3,4]);return q('geometry',`A shape has area ${area} cm² and is enlarged by scale factor ${scale}. New area = ? cm²`,area*scale*scale,'Area is multiplied by the square of the scale factor.')}


function y8GenStatistics(){const L=state.level,t=L==='starter'?randInt(1,4):L==='core'?randInt(1,6):randInt(1,8);
  if(t===1){const values=[randInt(3,12),randInt(3,12),randInt(3,12),randInt(3,12),randInt(3,12)];const sum=values.reduce((a,b)=>a+b,0),rem=sum%5;if(rem)values[4]+=5-rem;return q('statistics',`Mean of ${values.join(', ')} = ?`,values.reduce((a,b)=>a+b,0)/5,'Add the values and divide by 5.')}
  if(t===2){const values=[randInt(1,15),randInt(1,15),randInt(1,15),randInt(1,15),randInt(1,15)];return q('statistics',`Median of ${values.join(', ')} = ?`,median(values),'Order the values and choose the middle one.')}
  if(t===3){const mode=randInt(3,12),others=[mode+1,mode+2,mode+4];const values=[mode,mode,...others];return q('statistics',`Mode of ${values.join(', ')} = ?`,mode,'Find the value that appears most often.')}
  if(t===4){const low=randInt(1,10),high=randInt(low+5,25),values=[low,randInt(low,high),randInt(low,high),randInt(low,high),high];return q('statistics',`Range of ${values.join(', ')} = ?`,high-low,'Range = maximum − minimum.')}
  if(t===5){const count=pick([4,5,6]),mean=randInt(6,15);let known,missing;do{known=Array.from({length:count-1},()=>randInt(2,18));missing=mean*count-known.reduce((a,b)=>a+b,0)}while(missing<0||missing>25);return q('statistics',`${count} numbers have mean ${mean}. Known values: ${known.join(', ')}. Missing value = ?`,missing,'Total = mean × number of values.')}
  if(t===6){const red=randInt(2,8),blue=randInt(2,8);return qFrac('statistics',`Bag: ${red} red and ${blue} blue. P(red) = ?`,red/(red+blue),'Probability = favourable outcomes ÷ total outcomes.')}
  if(t===7){const p=pick([0.15,0.25,0.35,0.4,0.65,0.8]);return q('statistics',`P(event) = ${p}. P(not event) = ?`,1-p,'Complementary probabilities add to 1.')}
  return qFrac('statistics','A fair coin is tossed twice. P(two heads) = ?',1/4,'There are four equally likely outcomes: HH, HT, TH, TT.')}
