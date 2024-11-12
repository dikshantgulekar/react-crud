
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function  Menu() {

    return(
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">CRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">REGISTER</Link>
            <Link className="nav-link" to="/login">LOGIN</Link>
            <Link className="nav-link" to="/show-users">SHOW USERS</Link>

     
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Menu;

