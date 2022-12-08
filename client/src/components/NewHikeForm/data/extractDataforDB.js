const fs = require('fs');

const rawData = fs.readFileSync('./geoData.json');

const geoData = JSON.parse(rawData);

const dbData = geoData.provinces.map((province) => {
	return {
		province: province.properties.prov_name,
		province_id: province.properties.prov_istat_code_num,
		prov_abbreviation: province.properties.prov_acr,
		region: province.properties.reg_name,
		region_id: province.properties.reg_istat_code_num
	};
});

var stream = fs.createWriteStream('provincesData.json', { flags: 'a' });
dbData.forEach((province) => {
	stream.write(JSON.stringify(province) + ',\n');
});
stream.end();
