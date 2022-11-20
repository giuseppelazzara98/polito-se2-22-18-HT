import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useState } from "react";
import Select from 'react-select';
export default function SignupForm() {
	const [name, setName] = useState("");
	const [surname,setSurname] = useState("");
	const [role, setRole] = useState("");
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
	const [email, setEmail] = useState("");
  return (
    <Container>
      <Row>
		<Col xs={{ span: 12 }} md={{ span: 4, offset: 4 }}>
          <Form>
            <FormGroup className="mb-3">
              <FormLabel>Name</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="text"
			  placeholder="Name"
			  value={name}
			  onChange={(event) =>setName(event.target.value)}
			  required
			  ></FormControl>
			  <Form.Control.Feedback type="invalid">
				Name can't be empty
			  </Form.Control.Feedback>
            </FormGroup>
			<FormGroup className="mb-3">
              <FormLabel>Surname</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="text"
			  placeholder="Surname"
			  value={surname}
			  onChange={(event) =>setSurname(event.target.value)}
			  required>
			  </FormControl>
			  <Form.Control.Feedback type="invalid">
				Surname can't be empty
			  </Form.Control.Feedback>
            </FormGroup>
			<FormGroup className="mb-3">
			<FormLabel>Role</FormLabel>
				<Select></Select>
            </FormGroup>
			<FormGroup className="mb-3">
              <FormLabel>Password</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(event) =>setPassword(event.target.value)}
			  required
			  minLength={8}
			  ></FormControl>
			  <Form.Control.Feedback type="invalid">
				Password must be at least 8 characters long
			  </Form.Control.Feedback>
            </FormGroup>
			<FormGroup className="mb-3">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="password"
			  placeholder="Confirm Password"
			  value={confPassword}
			  onChange={(event) =>setConfPassword(event.target.value)}
			  required
			  minLength={8}
			  >
				</FormControl>
			  <Form.Control.Feedback type="invalid">
				The passwords don't match
			  </Form.Control.Feedback>
            </FormGroup>
			<FormGroup className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="email"
			  placeholder="Email"
			  value={email}
			  onChange={(event) =>setEmail(event.target.value)}
			  required
			  ></FormControl>
			  <Form.Control.Feedback type="invalid">
			  </Form.Control.Feedback>
            </FormGroup>
          </Form>
		  <Button className={styles.button}>Submit</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.goToLoginContainer}>
            <span>Already registered? </span>
            <Link to="/login" className={styles.link}>
              Log in
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
