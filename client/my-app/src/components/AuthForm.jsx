import React from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AuthForm = ({ title, onSubmit, isLogin, linkText, linkTo }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      ...(isLogin ? {} : { firstName: '', lastName: '', address: '', phone: '', confirmPassword: '' }),
    },
  });

  return (
    <div className="card-container">
      <Card className="custom-card">
        <Card.Body>
          <h2 className="text-center mb-4">{title}</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('firstName', { required: true })}
                      isInvalid={!!errors.firstname}
                    />
                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('lastName', { required: true })}
                      isInvalid={!!errors.lastname}
                    />
                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            )}
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" {...register('address')} />
              </Form.Group>
            )}
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" {...register('phone')} />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register('email', { required: true })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email?.message || 'Required'}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register('password', { required: true })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('confirmPassword', { required: true })}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
              </Form.Group>
            )}
            <Button variant="custom-btn" type="submit" className="w-100 mb-3">
              {title}
            </Button>
            <a href={linkTo} className="custom-link d-block text-center">
              {linkText}
            </a>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuthForm;