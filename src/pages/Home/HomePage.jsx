import React from "react";
import {  Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { user } = useAuth0();

  return (
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h1>Bienvenido a Mi App</h1>
          <p>
            Esta es una aplicación de demostración para implementar
            autenticación y autorización con React y Auth0.
          </p>
          <p>
            {user && (
              <div> {user.name} ({user.email}) </div>             
            )}
          </p>
        </Col>
      </Row>
  );
};

export default HomePage;
