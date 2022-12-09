import { MapContainer, TileLayer } from 'react-leaflet';
import styles from './index.module.scss';
import 'leaflet/dist/leaflet.css';
import Slider from '@mui/material/Slider';
import theme from './styles/slide_colors';

export default function RadiusMapFilter(props) {
	const { title = '' } = props;
	return (
		<>
			<h6 className={styles.filterTitle}>{title}</h6>
			<MapContainer
				className={styles.mapContainer}
				center={[38.8977, -77.0365]}
				zoom={14}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
			<Slider
				size="medium"
				defaultValue={70}
				aria-label="Small"
				valueLabelDisplay="auto"
				theme={theme}
			/>
		</>
	);
}
