'use strict';

const express = require('express');
const router = express.Router();
const provinceDao = require('../modules/DbManager').province_dao;

/*** Provinces APIs ***/

//GET /api/provinces
router.get('/provinces', async (req, res) => {
	try {
		const provinces = await provinceDao.getAllProvinces();
		res.status(200).json(provinces);
	} catch (err) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

/*
const executeOrder66 = async () => {
	await provinceDao.dropProvinceTable();
	await provinceDao.newProvinceTable();
	await provinceDao.insertProvincesFromFile();
};
executeOrder66();
*/

module.exports = router;
