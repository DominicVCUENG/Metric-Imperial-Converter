class ConvertHandler {
  
  getNum(input) {
    let result;
    const regex = /^(\d*\.?\d+|\d+\.\d*)(\/\d*\.?\d+|\d+\.\d*)?/;
    const numMatch = input.match(regex);
	
	if (input.split('/').length - 1 > 1) {
		return NaN;
	}

    if (numMatch) {
      if (numMatch[2]) {
        result = parseFloat(numMatch[1]) / parseFloat(numMatch[2].slice(1));
      } else {
        result = parseFloat(numMatch[1]);
      }
    } else {
      result = 1; // default to 1 if no numerical value is provided
    }

    return result;
  }
  
  getUnit(input) {
	const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const regex = /[a-zA-Z]+$/;
    const unitMatch = input.match(regex);
    if (unitMatch && units.includes(unitMatch[0])) {
      return unitMatch[0];
    }
    return null;
  }
  
  getReturnUnit(initUnit) {
    const units = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return units[initUnit];
  }

  spellOutUnit(unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return unitNames[unit];
  }
  
  convert(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };

    let result = initNum * conversionRates[initUnit];
    
    result = Math.round(result * 1e5) / 1e5;
    
    return result;
  }
  
  getString(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  }
}

module.exports = ConvertHandler;
