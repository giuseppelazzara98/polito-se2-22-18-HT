import React from 'react';
import { useMapEvents, Circle } from 'react-leaflet';

export default function Pointer(props)
{
    const { radiusCenter, setRadiusCenter } = props;
    const map = useMapEvents({
        click: (ev) => {
            const latLng = map.mouseEventToLatLng(ev.originalEvent);
            setRadiusCenter({ ...radiusCenter, center: [latLng.lat, latLng.lng] });
            console.log(radiusCenter.radius);
            map.setView([latLng.lat, latLng.lng]);
        }


    });
    return (
        <Circle
                center = {
                radiusCenter.center
                }
                radius = {radiusCenter.radius}
                pathOptions={{ fillColor: '#436529', color: '#436529' }}
            />
    )
}