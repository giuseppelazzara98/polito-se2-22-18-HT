import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { CiMountain1 } from 'react-icons/ci';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import API from '../../API/api';
import { useMediaQuery }  from "react-responsive";
import { maxBreakpoints } from "../../helpers/configs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightToBracket, faRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';

function NavbarHead(props) {
	const navigate = useNavigate();
	const location = useLocation();
	const isMobile = useMediaQuery({ maxWidth: maxBreakpoints.tabletLandscape });

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
				<div className={styles.buttonsContainer}>
					{location.pathname !== "/" && <NavLink className={`btn ${styles.buttonNavLink}`} to="/">
						{!isMobile && "Home"}
						{isMobile && <FontAwesomeIcon icon={faHouse}/>}
					</NavLink>}
					{props.loggedIn && props.user.role === 'guide' && location.pathname !== "/newHike" && (
						<NavLink className={`btn ${styles.buttonNavLink}`} to="/newHike">
							{!isMobile && "New Hike"}
							{isMobile && <FontAwesomeIcon icon={faPlus}/>}
						</NavLink>
					)}
					{!props.loggedIn && location.pathname !== "/login" && (
						<Button className={styles.button} onClick={() => navigate('/login')}>
							{!isMobile && "Login"}
							{isMobile && <FontAwesomeIcon icon={faRightToBracket}/>}
						</Button>
					)}
					{props.loggedIn && (
						<Button className={styles.button} onClick={handleLogOut}>
							{!isMobile && "Logout"}
							{isMobile && <FontAwesomeIcon icon={faRightFromBracket}/>}
						</Button>
					)}
				</div>
			</Container>
		</Navbar>
	);
}

export default NavbarHead;
