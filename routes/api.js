'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

	let convertHandler = new ConvertHandler();

	app.get('/api/convert', (req, res) => {
		const input = req.query.input;

		const initNum = convertHandler.getNum(input);
		const initUnit = convertHandler.getUnit(input);

		if (!initNum && !initUnit) {
			return res.send('invalid number and unit');
		}

		if (!initNum) {
			return res.send('invalid number');
		}

		if (!initUnit) {
			return res.send('invalid unit');
		}

		const returnNum = convertHandler.convert(initNum, initUnit);
		const returnUnit = convertHandler.getReturnUnit(initUnit);
		const responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

		res.json({
			initNum,
			initUnit,
			returnNum,
			returnUnit,
			string: responseString,
		});
	});
};
