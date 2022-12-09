import { MapContainer, TileLayer,  Marker } from 'react-leaflet'
import styles from './index.module.scss';
import 'leaflet/dist/leaflet.css';
import Slider from '@mui/material/Slider';
import theme from './styles/slider_colors';
import L from 'leaflet';
import Pointer from './Pointer';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default function RadiusMapFilter (props){
    const {
        title = "",
        name = "",
        value = "",
        setRadiusCenter,
        radiusCenter,
        hikesPoints,
        hikesForDistance,
        modifyRangeFilter,
    } = props;

    function computeMaxDistance(center, points) {
        let maxDistance = 0;
        points.forEach((point) => {
            const distance = getDistanceFromLatLonInKm(
                center[0],
                center[1],
                point.lat,
                point.long
            );
            if (distance > maxDistance) {
                maxDistance = distance;
            }
        });

        return Math.trunc(maxDistance);
    }
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        let distance = 6372795.477598 *
            Math.acos(Math.sin(toRad(lat2)) *
                Math.sin(toRad(lat1)) +
                Math.cos(toRad(lat2)) *
                Math.cos(toRad(lat1)) *
                Math.cos(toRad(lon2 - lon1)));
                return distance;
    }
    function toRad(x) {
        return x * Math.PI / 180;
    }
    return(
        <>
        <h6 className={styles.filterTitle}>{title}</h6>
        <MapContainer
            className={styles.mapContainer}
            center = {
            [radiusCenter.center[0], radiusCenter.center[1]]
            }
            zoom = {7}
            scrollWheelZoom={false}
        >
        <Pointer radiusCenter={radiusCenter} setRadiusCenter={setRadiusCenter} modifyRangeFilter={modifyRangeFilter}/>
        <TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
            {hikesForDistance.map((marker) => (
                <Marker key={marker.key} position={[marker.lat, marker.long]}>
                    
                </Marker>
            ))}
            </MapContainer>
            <Slider
            size="medium"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={0}
            max={computeMaxDistance(
                radiusCenter.center,
                hikesForDistance
            )}
            theme={theme}
            scale={(x) => x * 1}
            onChange={(e, value) => { setRadiusCenter({ ...radiusCenter, radius: value });
            modifyRangeFilter(radiusCenter);
        }
        }
            
            />
            </>
                    )

}
