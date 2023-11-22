import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import BarLoader from "react-spinners/BarLoader";
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center pt-10">
          <BarLoader />
        </div>
      ) : (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/"> Gestión de Productos</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
              <Nav.Link as={Link} to="/categorias">Categorias</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand>
            {!isAuthenticated ? (
              <Button variant="primary" onClick={() => loginWithRedirect()}>
                Iniciar sesión
              </Button>
            ) : (
              <>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/profile">{user.email}</Nav.Link>
                <Button
                  variant="danger"
                  onClick={() => logout({ returnTo: "http://localhost:3000/" })}
                >
                  Cerrar sesión
                </Button>
                </Nav>
              </>
            )}
          </Navbar.Brand>
        </Navbar>
      )}
    </>
  );
};

export default NavigationBar;
