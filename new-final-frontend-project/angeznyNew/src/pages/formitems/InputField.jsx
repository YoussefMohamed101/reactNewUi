import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ label, type, value, onChange, required }) => {
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default InputField;
