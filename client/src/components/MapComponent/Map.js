import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './index.module.scss';
import ChangeView from './ChangeView';
import { useMemo } from 'react';
import L from 'leaflet';
import ReactDOMServer from "react-dom/server";

export default function Map(props) {
	const { gpxPoints = [], markers = [] } = props;

	const points = useMemo(() => {
		return gpxPoints?.map((point) => [
			point.lat,
			point.lon
		]) || [];
	}, [JSON.stringify(gpxPoints)]);

	const CustomMarker = (props) => {
		const { marker, index } = props;
		return (
			<div className={`${styles.marker} ${marker.startPoint && styles.startPoint} ${marker.endPoint && styles.endPoint}`}>
				{index}
			</div>
		)
	}

	return (
		<MapContainer
			className={styles.mapContainer}
			center={points?.[parseInt(points?.length / 2)] || [markers?.[0]?.latitude, markers?.[0]?.longitude]}
			zoom={13}
			scrollWheelZoom={false}
		>
			<ChangeView
				center={points?.[parseInt(points?.length / 2)] || [markers?.[0]?.latitude, markers?.[0]?.longitude]}
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
			{markers?.map((marker, index) => (
				<Marker key={index} position={[marker.latitude, marker.longitude]} icon={L.divIcon({className: "custom-icon-mine", html: ReactDOMServer.renderToString(<CustomMarker marker={marker} index={index + 1}/>)})} >
					<Popup>
						<div className={styles.popup}>
							<span className={styles.title}>{marker.name}</span>
							<p className={styles.description}>{marker.description}</p>
							{(marker.startPoint || marker.endPoint) && (
								<span className={styles.pointType}>This is a {marker.startPoint ? "starting point" : "end point"}</span>
							)}
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}
