import { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import pointInPolygon from 'point-in-polygon';
import geoData from './data/geoData.json';

export default function NewMarker() {
	const [point, setPoint] = useState([44.58665046840906, 7.382619129493833]); //Torino
	const map = useMapEvents({
		click: (ev) => {
			const latLng = map.mouseEventToLatLng(ev.originalEvent);
			setPoint([latLng.lat, latLng.lng]);
		}
	});

	geoData.provinces.forEach((province) => {
		if (
			province.type === 'Polygon' &&
			pointInPolygon(point, province.coordinates)
		) {
			//The data is in the province object
			console.log('The point is in: ' + province.properties.prov_name);
		} else if (province.type === 'MultiPolygon') {
			let found = false;
			for (let i = 0; i < province.coordinates.length && !found; i++) {
				if (pointInPolygon(point, province.coordinates[i])) {
					found = true;
					//The data is in the province object
					console.log('The point is in: ' + province.properties.prov_name);
				}
			}
		}
	});

	return (
		point.length > 0 && (
			<Marker position={point}>
				<Popup>{`[${point[0]}, ${point[1]}]`}</Popup>
			</Marker>
		)
	);
}
