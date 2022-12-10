import { useMapEvents, Marker, Popup } from 'react-leaflet';
import pointInPolygon from 'point-in-polygon';
import geoData from './data/geoData.json';

export default function NewMarker(props) {
	const { point, setPoint } = props;
	const map = useMapEvents({
		click: (ev) => {
			const latLng = map.mouseEventToLatLng(ev.originalEvent);
			if (latLng?.lat && latLng?.lng) {
				getProvince([latLng?.lat, latLng?.lng]).then(province => {
					setPoint({
						province,
						coordinates: [latLng?.lat, latLng?.lng]
					});
				})
			}
		}
	});

	const getProvince = (point) => {
		return new Promise((resolve, reject) => {
			let provinceResult = "";
			geoData.provinces.forEach( (province) => {
				if (point?.length === 2) {
					if (
						province.type === 'Polygon' &&
						pointInPolygon(point, province.coordinates)
					) {
						//The data is in the province object
						// console.log('The point is in: ' + province.properties.prov_name);
						provinceResult = province.properties.prov_name;
					} else if (province.type === 'MultiPolygon') {
						let found = false;
						for (let i = 0; i < province.coordinates.length && !found; i++) {
							if (pointInPolygon(point, province.coordinates[i])) {
								found = true;
								//The data is in the province object
								// console.log('The point is in: ' + province.properties.prov_name);
								provinceResult = province.properties.prov_name;
							}
						}
					} 
				}
			});
			resolve(provinceResult);
		});
	}

	return (
		point?.coordinates?.length === 2 && (
			<Marker position={point.coordinates}>
				<Popup>{`${point.province} [${point.coordinates[0]}, ${point.coordinates[1]}]`}</Popup>
			</Marker>
		)
	);
}
