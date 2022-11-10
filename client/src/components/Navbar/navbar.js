import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {CiMountain1} from 'react-icons/ci';
import Navbar from 'react-bootstrap/Navbar';
import {  useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

function NavbarHead(props) {
  const navigate = useNavigate();
  return (
    <Navbar className={styles.navbarContainer} variant="light">
    <Container fluid>
    <Navbar.Brand  > <CiMountain1 color ='white' size={30} />  <span className='text-white'>HTracker </span></Navbar.Brand>
    <Button className={styles.button} onClick={()=> navigate("/login")}> Login</Button>
    </Container>
  </Navbar>
  );
}

export default NavbarHead;