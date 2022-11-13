import { Form, Col } from 'react-bootstrap';
import styles from "./index.module.scss";

export default function ExpectedTime(props) {
	return (
		<Form.Group as={Col} md="4">
			<Form.Label className={styles.title}>Expected time</Form.Label>
			<Form.Control
				type="text"
				value={props.expectedTime}
				onChange={(event) => props.setExpectedTime(event.target.value)}
				placeholder="Expected time"
				required={true}
				pattern="((([1-9])|(1[0-2]))m ?)?([1-3]w ?)?([1-6]d ?)?((([1-9])|(1[0-9])|(2[0-3]))h)?"
			/>
			<Form.Text>Maximum values: 12m 3w 6d 23h</Form.Text>
		</Form.Group>
	);
}
