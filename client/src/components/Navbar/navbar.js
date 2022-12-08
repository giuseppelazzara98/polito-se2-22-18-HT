import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { CiMountain1 } from 'react-icons/ci';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import API from '../../API/api';
import { useMediaQuery } from 'react-responsive';
import { maxBreakpoints } from '../../helpers/configs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightToBracket, faUserPlus, faHouse } from '@fortawesome/free-solid-svg-icons';
import UserMenu from './UserMenu';

function NavbarHead(props) {
	const {
		setShowLogoutModal,
	} = props;
	const navigate = useNavigate();
	const location = useLocation();
	const isMobile = useMediaQuery({ maxWidth: maxBreakpoints.tabletLandscape });

	const handleLogOut = async () => {
		await API.logOut();
		props.setLoggedIn(false);
		props.setUser({});
		navigate('/');
		setShowLogoutModal(true);
		setTimeout(() => setShowLogoutModal(false), 2500);
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
					{location.pathname !== '/' && (
						<NavLink className={`btn ${styles.buttonNavLink}`} to="/">
							{!isMobile && 'Home'}
							{isMobile && <FontAwesomeIcon icon={faHouse} />}
						</NavLink>
					)}
					{!props.loggedIn && location.pathname !== '/signup' && (
						<Button
							className={styles.button}
							onClick={() => navigate('/signup')}
						>
							{!isMobile && 'Signup'}
							{isMobile && <FontAwesomeIcon icon={faUserPlus} />}
						</Button>
					)}
					{!props.loggedIn && location.pathname !== '/login' && (
						<Button
							className={styles.button}
							onClick={() => navigate('/login')}
						>
							{!isMobile && 'Login'}
							{isMobile && <FontAwesomeIcon icon={faRightToBracket} />}
						</Button>
					)}
					{props.loggedIn && (
						<UserMenu user={props.user} handleLogOut={handleLogOut}/>
					)}
				</div>
			</Container>
		</Navbar>
	);
}

export default NavbarHead;
