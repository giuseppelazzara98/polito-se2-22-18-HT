import { Form, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from "./index.module.scss";


export default function EndPoint(props) {
	const [points, setPoints] = useState([]);

	useEffect(() => {
		const loadPoints = () => {
			API.getPointsByProvinceId(props.province)
				.then((list) => {
					return list.map((item) => {
						return {
							label: item.name,
							value: item.id_place
						};
					});
				})
				.then((newList) => {
					setPoints(newList);
				});
		};
		if (props.province !== '') {
			loadPoints();
		}
	}, [props.province]);
	return (
		<Form.Group as={Col} md="6">
			<Form.Label className={styles.title}>End point</Form.Label>
			<Select
				className={styles.customSelect}
				classNamePrefix="select"
				defaultValue={props.endPoint}
				name="endPoint"
				isSearchable={true}
				options={points}
				onChange={(event) => {
					props.setEndPoint(event.value);
				}}
			/>
		</Form.Group>
	);
}
