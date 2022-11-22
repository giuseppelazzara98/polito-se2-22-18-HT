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
import { Link,useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useState ,useEffect} from "react";
import Select from 'react-select';
import API from "../../API/api";

export default function SignupForm(props) {
	const [name, setName] = useState("");
	const [surname,setSurname] = useState("");
	const [role, setRole] = useState(1);
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
	const [email, setEmail] = useState("");
	const [validated, setValidated] = useState(false);
	const [err, setErr] = useState(false);
	const navigate = useNavigate();
	const [roles,setRoles]=useState([]);

	useEffect(() => {
		const loadRoles = () => {
			API.getRoles()
				.then((list) => {
					return list.map((item) => {
						return {
							label: item.description,
							value: item.id
						};
					});
				})
				.then((newList) => {
					setRoles(newList);
				});
		};
		loadRoles();
	}, []);

	const signUp = async (hiker) => {
		try {
			const user = await API.register(hiker);
			console.log(user);
			props.setLoggedIn(true);
			props.setUser(user);
			props.setShowWelcomeModal(true);
			setTimeout(() => {
				props.setShowWelcomeModal(false)
			}, 2500);
			return true;
		} catch (err) {
			return false;
		}
	};

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		const hiker = { name,surname,id_role:role, password,email };
		
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			console.log("arrivato");
			signUp(hiker)
				.then((val) => {
					val ? setErr(false) : setErr(true);
					return val;
				})
				.then((val) => {
					if (val) {
						navigate('/');
					}
				});

		}
		if(password===confPassword){
			setValidated(true);
		}
		
	};
	const checkPassword= ()=>{
		return password===confPassword;
	}

  return (
    <Container>
      <Row>
		<Col xs={{ span: 12 }} md={{ span: 4, offset: 4 }}>
          <Form
		  noValidate
		  validated={validated}
		  onSubmit={handleSubmit}
		  >
            <FormGroup className="mb-3">
              <FormLabel className={styles.title}>Name</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="text"
			  placeholder="Name"
			  value={name}
			  onChange={(event) =>setName(event.target.value)}
			  required

			  ></FormControl>
			  <Form.Control.Feedback type="invalid">
				Insert a name
			  </Form.Control.Feedback>
            </FormGroup>
			<FormGroup className="mb-3">
              <FormLabel className={styles.title}>Surname</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="text"
			  placeholder="Surname"
			  value={surname}
			  onChange={(event) =>setSurname(event.target.value)}
			  required>
			  </FormControl>
			  <Form.Control.Feedback type="invalid">
				Insert a username
			  </Form.Control.Feedback>
            </FormGroup>
			<FormGroup className="mb-3">
			<FormLabel className={styles.title}>Role</FormLabel>
				<Select
					className={styles.customSelect}
					classNamePrefix="select"
					name="province"
					isSearchable={true}
					options={roles}
					onChange={(event) => {
						setRole(event.value);
					}}
				/>
            </FormGroup>
			<FormGroup className="mb-3">
              <FormLabel className={styles.title}>Password</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(event) =>setPassword(event.target.value)}
			  required
			  minLength={8}
			  maxLength={30}
			  ></FormControl>
			  <Form.Control.Feedback type="invalid">
				Password must be between 8 and 30 characters long
			  </Form.Control.Feedback>
            </FormGroup>
			<FormGroup className="mb-3">
              <FormLabel className={styles.title}>Confirm Password</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="password"
			  placeholder="Confirm Password"
			  value={confPassword}
			  onChange={(event) =>setConfPassword(event.target.value)}
			  required
			  validated={validated}
			  minLength={8}
			  maxLength={30}
			  isValid={password===confPassword}

			  >
				</FormControl>
			  <Form.Control.Feedback type="invalid">
				The passwords don't match
			  </Form.Control.Feedback>
            </FormGroup>
			<FormGroup className="mb-3">
              <FormLabel className={styles.title}>Email</FormLabel>
              <FormControl
			  className = {styles.formGroup}
			  type="email"
			  placeholder="Email"
			  value={email}
			  onChange={(event) =>setEmail(event.target.value)}
			  required
			  ></FormControl>
			  <Form.Control.Feedback type="invalid">
			  	Please enter a valid email
			  </Form.Control.Feedback>
            </FormGroup>
			<Button className={styles.button} type="submit">Submit</Button>
          </Form>
		  
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
