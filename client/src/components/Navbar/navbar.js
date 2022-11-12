import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { CiMountain1 } from 'react-icons/ci';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavbarHead(props) {
	const navigate = useNavigate();
	return (
		<Navbar bg="light" variant="light">
			<Container fluid>
				<Navbar.Brand>
					{' '}
					<CiMountain1 size={30}> </CiMountain1>HTracker
				</Navbar.Brand>
				{!props.loggedIn && (
					<Button variant="secondary" onClick={() => navigate('/login')}>
						{' '}
						Login
					</Button>
				)}
			</Container>
		</Navbar>
	);
}

export default NavbarHead;
