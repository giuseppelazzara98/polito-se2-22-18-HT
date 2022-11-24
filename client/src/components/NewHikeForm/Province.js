import { Form, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';

export default function Province(props) {
	const [provincesList, setProvincesList] = useState([]);

	useEffect(() => {
		const loadProvinces = () => {
			API.getProvinces()
				.then((list) => {
					return list.map((item) => {
						return {
							label: item.name,
							value: item.id_province
						};
					});
				})
				.then((newList) => {
					setProvincesList(newList);
				});
		};
		loadProvinces();
	}, []);

	return (
		<Form.Group>
			<Form.Label className={styles.title}>Province</Form.Label>
			<Select
				className={styles.customSelect}
				classNamePrefix="select"
				defaultValue={props.province}
				name="province"
				isSearchable={true}
				options={provincesList}
				onChange={(event) => {
					props.setProvince(event.value);
				}}
			/>
		</Form.Group>
	);
}
