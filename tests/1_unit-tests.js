const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.2L'), 3.2);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
    assert.isNaN(convertHandler.getNum('3/2/3L'));
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    inputUnits.forEach(unit => {
      assert.equal(convertHandler.getUnit(`32${unit}`), unit);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.isNull(convertHandler.getUnit('32gallon'));
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const inputOutputMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    Object.keys(inputOutputMap).forEach(unit => {
      assert.equal(convertHandler.getReturnUnit(unit), inputOutputMap[unit]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const unitSpellingMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    Object.keys(unitSpellingMap).forEach(unit => {
      assert.equal(convertHandler.spellOutUnit(unit), unitSpellingMap[unit]);
    });
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
  });

  test('convertHandler should correctly convert L to gal', function() {
    const expected = 1 / 3.78541;
    const roundedExpected = Math.round(expected * 1e5) / 1e5;
    assert.equal(convertHandler.convert(1, 'L'), roundedExpected);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
  });

  test('convertHandler should correctly convert km to mi', function() {
    const expected = 1 / 1.60934;
    const roundedExpected = Math.round(expected * 1e5) / 1e5;
    assert.equal(convertHandler.convert(1, 'km'), roundedExpected);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    const expected = 1 / 0.453592;
    const roundedExpected = Math.round(expected * 1e5) / 1e5;
    assert.equal(convertHandler.convert(1, 'kg'), roundedExpected);
  });

});