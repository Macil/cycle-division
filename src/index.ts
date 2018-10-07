export function divide(dividend: number, divisor: number, base: number = 10) {
  if (divisor === 0) throw new RangeError('Divisor can not be zero');
  const positive = dividend >= 0 === divisor >= 0;
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);

  const whole = Math.floor(dividend / divisor);
  let c = base * (dividend % divisor);
  const digits = [];
  while (c && c < divisor) {
    c *= base;
    digits.push(0);
  }
  const passed: { [ix: string]: number } = Object.create(null);
  while (true) {
    if (c in passed) {
      const fraction = digits.slice(0, passed[c]);
      let cycle = digits.slice(passed[c]);
      if (cycle.length === 1 && cycle[0] === 0) cycle = [];
      return new Quotient(whole, fraction, cycle, positive, base);
    }
    const q = Math.floor(c / divisor);
    const r = c % divisor;
    passed[c] = digits.length;
    digits.push(q);
    c = base * r;
  }
}

export class Quotient {
  readonly sign: number;
  readonly whole: number;
  readonly fraction: number[];
  readonly cycle: number[];
  readonly base: number;
  constructor(
    whole: number,
    fraction: number[],
    cycle: number[],
    positive: boolean = true,
    base: number = 10
  ) {
    this.sign =
      positive || (whole === 0 && fraction.length === 0 && cycle.length === 0)
        ? 1
        : -1;
    this.whole = whole;
    this.fraction = fraction;
    this.cycle = cycle;
    this.base = base;
  }
  toString(): string {
    const sign = this.sign === 1 ? '' : '-';
    if (this.fraction.length === 0 && this.cycle.length === 0) {
      return sign + this.whole;
    }
    if (this.base === 10) {
      return (
        sign +
        this.whole +
        '.' +
        this.fraction.join('') +
        (this.cycle.length === 0 ? '' : `(${this.cycle.join('')})`)
      );
    } else {
      return (
        sign +
        this.whole +
        `.[base:${this.base}]{` +
        this.fraction.join(',') +
        '}' +
        (this.cycle.length === 0 ? '' : `(${this.cycle.join(',')})`)
      );
    }
  }
  equals(other: Quotient): boolean {
    return (
      this.whole === other.whole &&
      this.sign === other.sign &&
      this.base === other.base &&
      arrayEqual(this.fraction, other.fraction) &&
      arrayEqual(this.cycle, other.cycle)
    );
  }
}

function arrayEqual(a1: any[], a2: any[]): boolean {
  const length = a1.length;
  if (length !== a2.length) {
    return false;
  }
  for (let i = 0; i < length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}
