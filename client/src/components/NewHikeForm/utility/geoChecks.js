import geoData from '../data/geoData.json';
import pointInPolygon from 'point-in-polygon';

const getProvince = (point) => {
	let result;
	geoData.provinces.forEach((province) => {
		if (
			province.type === 'Polygon' &&
			pointInPolygon(point, province.coordinates)
		) {
			result = province.properties;
		} else if (province.type === 'MultiPolygon') {
			let found = false;
			for (let i = 0; i < province.coordinates.length && !found; i++) {
				if (pointInPolygon(point, province.coordinates[i])) {
					found = true;
					result = province.properties;
				}
			}
		}
	});
	return result;
};

const point = { getProvince };
export default point;
