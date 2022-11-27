import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';

export default function Province(props) {
	const {
		validated,
		province
	} = props;
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
				placeholder="Select a province"
				className={`${styles.customSelect} ${validated && province === "" && styles.invalid} ${validated && province !== "" && styles.valid}`}
				classNamePrefix="select"
				defaultValue={props.province}
				name="province"
				isSearchable={true}
				options={provincesList}
				onChange={(event) => {
					props.setProvince(event.value);
				}}
			/>
			{validated && province === "" && (
				<div className={styles.feedbackContainer}>
					<span className={styles.feedback}>
						Please select a valid province
					</span>
				</div>
			)}
		</Form.Group>
	);
}
