import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
function MyNavbar() {

    const navigate = useNavigate();
    return (
        <Navbar expand="lg" className="bg-body-transparent fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/main" className='text-white'>Denny-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} className='text-white'>Back</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default MyNavbar;