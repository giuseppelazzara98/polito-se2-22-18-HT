const fs = require('fs');

const rawOldData = fs.readFileSync('./OldProvincesData.json');
const rawNewData = fs.readFileSync('./provincesData.json');

const oldData = JSON.parse(rawOldData);
const newData = JSON.parse(rawNewData);

let found = false;
let data = [];
let province = {};

for (let i = 0; i < newData.length; i++) {
	for (let j = 0; j < oldData.length && !found; j++) {
		if (oldData[j].abbreviation === newData[i].prov_abbreviation) {
			found = true;
			province = { ...newData[i], oldProvinceId: oldData[j].id_province };
			data.push(province);
		}
	}
	if (!found) {
		province = { ...newData[i], oldProvinceId: null };
		data.push(province);
	}
	found = false;
}

fs.writeFileSync('./finalProvinceData.json', JSON.stringify(data), 'utf-8');
