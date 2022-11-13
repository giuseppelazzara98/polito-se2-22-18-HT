import { Form, Col } from 'react-bootstrap';
import styles from "./index.module.scss";

export default function Title(props) {
	return (
		<Form.Group as={Col} md={6} >
			<Form.Label className={styles.title}>Title</Form.Label>
			<Form.Control
				className={styles.customInsert}
				type="text"
				placeholder="Hike name"
				value={props.title}
				onChange={(event) => props.setTitle(event.target.value)}
				required
				minLength={4}
				maxLength={30}
			/>
		</Form.Group>
	);
}
