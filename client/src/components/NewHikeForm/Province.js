import { Form, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';

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
		<Form.Group as={Col} md="6">
			<Form.Label>Province</Form.Label>
			<Select
				className="basic-single"
				classNamePrefix="select"
				defaultValue="1"
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
