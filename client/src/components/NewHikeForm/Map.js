import { MapContainer, TileLayer, Polyline, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './index.module.scss';
import ChangeView from './ChangeView';

export default function Map(props) {
	const generatePoints = () => {
		const points = props.gpxData.tracks[0].points.map((point) => [
			point.lat,
			point.lon
		]);
		return points;
	};

	return (
		<MapContainer
			className={styles.mapContainer}
			center={generatePoints()[generatePoints.length / 2]}
			zoom={13}
			scrollWheelZoom={false}
		>
			<ChangeView
				center={generatePoints()[generatePoints.length / 2]}
				zoom={13}
			></ChangeView>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Polyline
				pathOptions={{ fillColor: 'red', color: 'red' }}
				positions={generatePoints()}
			/>
		</MapContainer>
	);
}
