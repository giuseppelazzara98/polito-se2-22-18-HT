import { Form } from 'react-bootstrap';
import styles from './index.module.scss';

export default function Province(props) {
	return (
		<Form.Group>
			<Form.Label className={styles.title}>Province</Form.Label>
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
