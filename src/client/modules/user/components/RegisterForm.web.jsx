import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, RenderField, Button, Alert } from '../../common/components/web';

const required = value => (value ? undefined : 'Required');

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength3 = minLength(3);
export const minLength5 = minLength(5);

const validate = values => {
  const errors = {};

  if (values.password && values.passwordConfirmation && values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match';
  }
  return errors;
};

const RegisterForm = ({ handleSubmit, submitting, onSubmit, error }) => {
  return (
    <Form name="register" onSubmit={handleSubmit(onSubmit)}>
      <Field name="username" component={RenderField} type="text" label="Username" validate={[required, minLength3]} />
      <Field name="email" component={RenderField} type="email" label="Email" validate={required} />
      <Field
        name="password"
        component={RenderField}
        type="password"
        label="Password"
        validate={[required, minLength5]}
      />
      <Field
        name="passwordConfirmation"
        component={RenderField}
        type="password"
        label="Password Confirmation"
        validate={[required, minLength5]}
      />
      {error && <Alert color="error">{error}</Alert>}
      <Button color="primary" type="submit" disabled={submitting}>
        Register
      </Button>
    </Form>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  error: PropTypes.string
};

export default reduxForm({
  form: 'register',
  validate
})(RegisterForm);
