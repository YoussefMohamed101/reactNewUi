import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ title, children, onSubmit }) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>{title}</h2>
          <form onSubmit={onSubmit}>
            {children}
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
