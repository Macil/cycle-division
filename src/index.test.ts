import { divide, Quotient } from '.';

test('divide by zero', () => {
  expect(() => divide(3, 0)).toThrowError(RangeError);
});

test('whole results', () => {
  expect(divide(6, 3)).toEqual(new Quotient(2, [], []));
  expect(divide(123, 1)).toEqual(new Quotient(123, [], []));
  expect(divide(0, 8)).toEqual(new Quotient(0, [], []));

  expect(divide(0, -8)).toEqual(new Quotient(0, [], []));
  expect(divide(-6, 3)).toEqual(new Quotient(2, [], [], false));
  expect(divide(6, -3)).toEqual(new Quotient(2, [], [], false));
  expect(divide(-6, -3)).toEqual(new Quotient(2, [], []));
});

test('fractional results', () => {
  expect(divide(1, 2)).toEqual(new Quotient(0, [5], []));
  expect(divide(3, 4)).toEqual(new Quotient(0, [7, 5], []));

  expect(divide(-3, 4)).toEqual(new Quotient(0, [7, 5], [], false));
  expect(divide(3, -4)).toEqual(new Quotient(0, [7, 5], [], false));
  expect(divide(-3, -4)).toEqual(new Quotient(0, [7, 5], []));
});

test('mixed results', () => {
  expect(divide(5, 2)).toEqual(new Quotient(2, [5], []));
  expect(divide(5, 4)).toEqual(new Quotient(1, [2, 5], []));

  expect(divide(-5, 4)).toEqual(new Quotient(1, [2, 5], [], false));
  expect(divide(5, -4)).toEqual(new Quotient(1, [2, 5], [], false));
  expect(divide(-5, -4)).toEqual(new Quotient(1, [2, 5], []));
});

test('repeating results', () => {
  expect(divide(1, 3)).toEqual(new Quotient(0, [], [3]));
  expect(divide(1, 7)).toEqual(new Quotient(0, [], [1, 4, 2, 8, 5, 7]));
  expect(divide(2, 7)).toEqual(new Quotient(0, [], [2, 8, 5, 7, 1, 4]));
  expect(divide(1, 6)).toEqual(new Quotient(0, [1], [6]));

  expect(divide(-1, 7)).toEqual(new Quotient(0, [], [1, 4, 2, 8, 5, 7], false));
  expect(divide(1, -7)).toEqual(new Quotient(0, [], [1, 4, 2, 8, 5, 7], false));
  expect(divide(-1, -7)).toEqual(new Quotient(0, [], [1, 4, 2, 8, 5, 7]));
});

test('mixed with repeating results', () => {
  expect(divide(13, 12)).toEqual(new Quotient(1, [0, 8], [3]));
  expect(divide(8, 7)).toEqual(new Quotient(1, [], [1, 4, 2, 8, 5, 7]));
  expect(divide(7, 6)).toEqual(new Quotient(1, [1], [6]));

  expect(divide(-7, 6)).toEqual(new Quotient(1, [1], [6], false));
  expect(divide(7, -6)).toEqual(new Quotient(1, [1], [6], false));
  expect(divide(-7, -6)).toEqual(new Quotient(1, [1], [6]));
});

test('toString', () => {
  expect(divide(10, 2).toString()).toBe('5');
  expect(divide(2, 10).toString()).toBe('0.2');
  expect(divide(2087, 100).toString()).toBe('20.87');
  expect(divide(1, 3).toString()).toBe('0.(3)');
  expect(divide(1, 7).toString()).toBe('0.(142857)');
  expect(divide(8, 7).toString()).toBe('1.(142857)');
  expect(divide(1, 12).toString()).toBe('0.08(3)');

  expect(divide(0, -2).toString()).toBe('0');
  expect(divide(-10, 2).toString()).toBe('-5');
  expect(divide(2, -10).toString()).toBe('-0.2');
  expect(divide(2087, -100).toString()).toBe('-20.87');
  expect(divide(-1, 12).toString()).toBe('-0.08(3)');

  expect(divide(-1, 8448, 16).toString()).toBe(
    '-0.[base:16]{0,0,0}(7,12,1,15,0)'
  );
});

test('equals', () => {
  expect(new Quotient(1, [], []).equals(new Quotient(1, [], []))).toBe(true);
  expect(new Quotient(1, [2], [3]).equals(new Quotient(1, [2], [3]))).toBe(
    true
  );

  expect(new Quotient(1, [2], [3]).equals(new Quotient(0, [2], [3]))).toBe(
    false
  );
  expect(new Quotient(1, [2], [3]).equals(new Quotient(1, [], [3]))).toBe(
    false
  );
  expect(new Quotient(1, [2], [3]).equals(new Quotient(1, [2], []))).toBe(
    false
  );
  expect(
    new Quotient(1, [2], [3]).equals(new Quotient(1, [2], [3], true, 11))
  ).toBe(false);
  expect(new Quotient(1, [2], [3]).equals(new Quotient(1, [2, 5], [3]))).toBe(
    false
  );
  expect(
    new Quotient(1, [2], [3]).equals(new Quotient(1, [2], [3], false))
  ).toBe(false);

  expect(new Quotient(0, [], []).equals(new Quotient(0, [], [], false))).toBe(
    true
  );
  expect(new Quotient(1, [], []).equals(new Quotient(1, [], [], false))).toBe(
    false
  );
  expect(new Quotient(0, [1], []).equals(new Quotient(0, [1], [], false))).toBe(
    false
  );
  expect(new Quotient(0, [], [1]).equals(new Quotient(0, [], [1], false))).toBe(
    false
  );

  expect(
    new Quotient(0, [], [1], false).equals(new Quotient(0, [], [1], false))
  ).toBe(true);
});
