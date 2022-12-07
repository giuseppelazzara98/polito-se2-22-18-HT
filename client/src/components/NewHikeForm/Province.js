import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';

export default function Province(props) {
	const { validated, province } = props;
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
			{/* <Select
				placeholder="Select a province"
				className={`${styles.customSelect} ${
					validated && province === '' && styles.invalid
				} ${validated && province !== '' && styles.valid}`}
				classNamePrefix="select"
				defaultValue={props.province}
				name="province"
				isSearchable={true}
				options={provincesList}
				onChange={(event) => {
					props.setProvince(event.value);
				}}
				isDisabled={true}
			/>
			{validated && province === '' && (
				<div className={styles.feedbackContainer}>
					<span className={styles.feedback}>
						Please select a valid province
					</span>
				</div>
			)}*/}

			<Form.Control
				className={styles.customInsert}
				type="text"
				value={
					Object.keys(props.province).length !== 0
						? props.province.prov_name
						: ''
				}
				placeholder=""
				required={true}
				disabled
			/>
			<Form.Control.Feedback type="invalid">
				A province must be provided.
			</Form.Control.Feedback>

			<Form.Text>
				Province will be loaded automatically from GPX file.
			</Form.Text>
		</Form.Group>
	);
}
