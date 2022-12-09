import { OpenStreetMapProvider } from 'leaflet-geosearch';
import AsyncSelect from 'react-select/async';
import styles from './index.module.scss';
import { useState } from 'react';

export default function MapSearch(props) {
	const [options, setOptions] = useState([]);
	const geoSearch = async (value) => {
		const provider = new OpenStreetMapProvider();
		const rawResults = await provider.search({ query: value });
		const options = rawResults.map((result) => {
			return {
				label: result.label,
				value: result.raw.place_id,
				lon: result.x,
				lat: result.y
			};
		});
		return options;
	};

	function handleAddressChange(event) {
		if (event !== null) {
			props.setPoint({
				type: props.point.type,
				id: event.value,
				name: event.label,
				lat: event.lat,
				lon: event.lon
			});
		}
	}
	const promiseOptions = (inputValue) =>
		new Promise((resolve) => {
			setTimeout(() => {
				setOptions(geoSearch(inputValue));
				resolve(options);
			}, 250);
		});

	return (
		<>
			<AsyncSelect
				defaultValue={props.point.id}
				className={`${styles.customSelect} ${
					props.validated &&
					(props.point?.type === '' ||
						Object.keys(props.point).length === 0 ||
						(props.point.type === 'Address/Name of location' &&
							(props.point.lat === '' || props.point.lon === ''))) &&
					styles.invalid
				} ${
					props.validated &&
					Object.keys(props.point).length > 0 &&
					props.point.type === 'Address/Name of location' &&
					(props.point.lat !== '' || props.point.lon !== '') &&
					styles.valid
				}`}
				classNamePrefix="select"
				isClearable={true}
				cacheOptions
				defaultOptions
				loadOptions={promiseOptions}
				onChange={handleAddressChange}
			/>
			{props.validated &&
				(props.point?.type === '' ||
					Object.keys(props.point).length === 0 ||
					(props.point.type === 'Address/Name of location' &&
						(props.point.lat === '' || props.point.lng === ''))) && (
					<div className={styles.feedbackContainer}>
						<span className={styles.feedback}>
							Please select a valid address / name of loacation
						</span>
					</div>
				)}
		</>
	);
}
