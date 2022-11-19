import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default function SignupForm() {
	return (
		<Row>
			<Col>
				<div className={styles.goToLoginContainer}>
					<span>Already registered? </span>
					<Link to="/login" className={styles.link}>Log in</Link>
				</div>
			</Col>
		</Row>
	)
}
