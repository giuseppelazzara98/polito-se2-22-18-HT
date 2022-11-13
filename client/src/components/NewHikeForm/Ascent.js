import { Form, Col } from 'react-bootstrap';
import styles from "./index.module.scss";


export default function Ascent(props) {
	return (
		<Form.Group as={Col} md="4">
			<Form.Label className={styles.title}>Ascent</Form.Label>
			<Form.Control
				className={styles.customInsert}
				type="number"
				value={props.ascent}
				onChange={(event) => props.setAscent(event.target.value)}
				placeholder="0"
				required={true}
				min={0}
				max={100}
			/>
			<Form.Text>Ascent in percentage.</Form.Text>
		</Form.Group>
	);
}
