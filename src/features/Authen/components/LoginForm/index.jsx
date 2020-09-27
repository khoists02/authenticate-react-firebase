import React from 'react'
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import { Button, FormGroup, Spinner } from 'reactstrap';
import InputField from 'custom-fields/InputField';
import * as Yup from 'yup';
import './LoginForm.scss';

function LoginForm({ onSubmit, initialValues, error }) {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required.'),
    password: Yup.string().required('Password is required.'),
    // categoryId: Yup.number()
    //   .required('This field is required.')
    //   .nullable(),
    // photo: Yup.string().when('categoryId', {
    //   is: 1,
    //   then: Yup.string().required('This field is required.'),
    //   otherwise: Yup.string().notRequired(),
    // })
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formikProps => {
        // eslint-disable-next-line
        const { values, errors, touched, isSubmitting } = formikProps;
        return (
          <Form className='login-form'>
            <FastField
              name="username"
              component={InputField}

              label="Username"
              placeholder="Username"
            />

            <FastField
              name="password"
              component={InputField}
              type="password"
              label="Password"
              placeholder="Password"
            />

            <FormGroup className='login-form__actions'>
              <Button type="submit" color={'primary'}>
                {isSubmitting && <Spinner size="sm" />}
                Login
              </Button>
            </FormGroup>
            <p className='error'>{error}</p>
          </Form>
        );
      }}
    </Formik>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmit: null
}

export default LoginForm;

