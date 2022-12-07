import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geoData from './data/geoData.json';
import L from 'leaflet';
import NewMarker from './NewMarker';
import styles from './index.module.scss';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default function Map(props) {
	const {point, setPoint} = props;
	return (
		<MapContainer
			className={styles.map}
			center={[45.0703, 7.6869]}
			zoom={9}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<NewMarker point={point} setPoint={setPoint}/> {/* This is the marker component */}
			{/* This is used to draw the provinces */}
			{geoData.provinces.map((province) => {
				return (
					<Polygon
						key={province.properties.prov_istat_code_num}
						pathOptions={{ color: 'red', fillColor: 'red' }}
						positions={province.coordinates}
					/>
				);
			})}
		</MapContainer>
	);
}
