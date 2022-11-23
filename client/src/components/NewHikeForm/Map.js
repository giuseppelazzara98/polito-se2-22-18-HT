import { MapContainer, TileLayer, Polyline, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './index.module.scss';
import ChangeView from './ChangeView';
import { useMemo } from 'react';

export default function Map(props) {
	const { gpxPoints } = props;

	const points = useMemo(() => {
		return gpxPoints?.map((point) => [
			point.lat,
			point.lon
		]) || [];
	}, [JSON.stringify(gpxPoints)]);

	return (
		<MapContainer
			className={styles.mapContainer}
			center={points[points.length / 2]}
			zoom={13}
			scrollWheelZoom={false}
		>
			<ChangeView
				center={points[points.length / 2]}
				zoom={13}
			></ChangeView>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Polyline
				pathOptions={{ fillColor: 'red', color: 'red' }}
				positions={points}
			/>
		</MapContainer>
	);
}
