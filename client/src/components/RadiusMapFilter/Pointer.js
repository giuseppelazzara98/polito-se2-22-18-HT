import React, { useEffect } from 'react';
import { useMapEvents, Circle } from 'react-leaflet';

export default function Pointer(props)
{
    const { radiusCenter, setRadiusCenter, modifyRangeFilter } = props;

    const map = useMapEvents({
        click: (ev) => {
            const latLng = map.mouseEventToLatLng(ev.originalEvent);
            map.setView([ev.latlng.lat, ev.latlng.lng]);
            setRadiusCenter({ ...radiusCenter, center: [latLng.lat, latLng.lng] });
        }


    });
    useEffect(() => {
        modifyRangeFilter(radiusCenter);
    }, [radiusCenter.center]);

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