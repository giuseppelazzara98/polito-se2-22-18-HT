import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { CiMountain1 } from 'react-icons/ci';
import { Navbar } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import API from '../../API/api';

function NavbarHead(props) {
	const navigate = useNavigate();
	const location = useLocation();
	
	const handleLogOut = async () => {
		await API.logOut();
		props.setLoggedIn(false);
		props.setUser({});
		navigate('/');
	};

	return (
		<Navbar className={styles.navbarContainer} variant="light">
			<Container fluid>
				<Navbar.Brand>
					{' '}
					<CiMountain1 color="white" size={30} />{' '}
					<span className="text-white">HTracker </span>
				</Navbar.Brand>
				
				
				{props.loggedIn && props.user.role === 'guide' && (
					<Button className={styles.button} onClick={() => navigate('/newHike')}>
					New Hike
				</Button>
				)}
				{!props.loggedIn && (
					<Button className={styles.button} onClick={() => navigate('/login')}>
						Login
					</Button>
				)}
				{props.loggedIn && (
					<>
					<Button className={styles.button} onClick = {() => navigate('/')}>Home</Button>
					<Button className={styles.button} onClick={handleLogOut}>
						Logout
					</Button>
					</>
				)}
			</Container>
		</Navbar>
	);
}

export default NavbarHead;
