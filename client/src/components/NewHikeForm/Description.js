import { Form, Col } from 'react-bootstrap';
import styles from "./index.module.scss";

export default function Description(props) {
	return (
		<Form.Group as={Col}>
			<Form.Label className={styles.title}>Description</Form.Label>
			<Form.Control
				as="textarea"
				rows={5}
				value={props.description}
				onChange={(event) => props.setDescription(event.target.value)}
			/>
		</Form.Group>
	);
}
