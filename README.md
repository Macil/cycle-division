# cycle-division

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Macil/cycle-division/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/cycle-division.svg?style=flat)](https://www.npmjs.com/package/cycle-division) [![CircleCI Status](https://circleci.com/gh/Macil/cycle-division.svg?style=shield)](https://circleci.com/gh/Macil/cycle-division) [![Greenkeeper badge](https://badges.greenkeeper.io/Macil/cycle-division.svg)](https://greenkeeper.io/)

This is a Javascript module which implements division with repeating decimal detection.
This allows you to divide two numbers and extract the integer, fractional, and repeating
decimal parts of the result.

This module was inspired by https://softwareengineering.stackexchange.com/q/192070/73290
and the implementation at http://codepad.org/hKboFPd2.

## Usage

```
import {divide} from 'cycle-division';
const q = divide(438, 35);

console.log(q.toString());
// 12.5(142857)

console.log(q);
// Quotient {
//   sign: 1,
//   whole: 12,
//   fraction: [ 5 ],
//   cycle: [ 1, 4, 2, 8, 5, 7 ],
//   base: 10 }
```

The examples here use the import statement, which is supported by TypeScript
and Babel. If you're using Node.js or a bundler that only supports CommonJS
modules, then you can replace the import statements with `require` calls:

    const {divide} = require('cycle-division');

## API

### divide(dividend, divisor, base?)

This function returns a Quotient object. The `base` parameter is argument and defaults to 10.

### Quotient

Quotient objects have the following properties:

- `sign`: 1 if the result is positive or zero, -1 if the result is negative.
- `whole`: The integer part of the result.
- `fraction`: An array containing the series of digits that come after the radix
  point in the result but before the.repeating part if any.
- `cycle`: An array containing the repeating part of the fraction, the repetend.
- `base`: The base of the digits in the fraction and cycle.

Quotient objects have the following methods:

- `toString()`: Stringifies the Quotient object. If the quotient contains no cycle,
  then the result will be a standard number string (ie. "5" or "12.34"). If a cycle
  is present, then the cycle will be wrapped with parenthesis (ie. "12.3(56)" or "0.(3)").
- `equals(other)`: The `other` parameter must be a Quotient object. The method
  returns true if both objects' properties are equal.

## Types

[TypeScript](https://www.typescriptlang.org/) type definitions for this module are included!
The type definitions won't require any configuration to use.
