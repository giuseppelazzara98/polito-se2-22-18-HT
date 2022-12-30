import { Row, Col, Form } from 'react-bootstrap';
import styles from './index.module.scss';

export default function FileInput(props) {
  const {
    title,
    required = false,
    accept,
    onChange = () => {},
    description,
    errorText,
  } = props;

	return (
		<>
			<Row className="mb-3">
				<Col>
					<Form.Group>
						{title && (
              <Form.Label className={styles.title}>
                {title}
              </Form.Label>
            )}
						<Form.Control
							type="file"
							onChange={(event) => {
                console.log("event", event)
								onChange(event.target.files[0]);
							}}
							required={required}
							accept={accept}
						/>
						{description && (
              <Form.Text>{description}</Form.Text>
            )}
						{errorText && (
              <Form.Control.Feedback type="invalid">
                {errorText}
              </Form.Control.Feedback>
            )}
					</Form.Group>
				</Col>
			</Row>
		</>
	);
}
