import React from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../../common/form';
import Joi from 'joi-browser';
import './registerForm.css';
import { register } from './../../../services/userService';

class RegisterForm extends Form {
  state = {
    data: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      rePassword: '',
      discover: '',
      isAdmin: false
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    firstname: Joi.string().required().label('First Name'),
    lastname: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
    rePassword: Joi.ref('password'),
    discover: Joi.string().label('How you did you hear about Shalom Ministry').allow(''),
    isAdmin: Joi.boolean()
  };

  doSubmit = async () => {
    try {
      await register(this.state.data);
      
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="signup">
        <div className="content">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderCustomInput('firstname', 'First Name')}
            {this.renderCustomInput('lastname', 'Last Name')}
            {this.renderCustomInput('email', 'Email', 'email')}
            {this.renderCustomInput('password', 'Password', 'password')}
            {this.renderCustomInput('rePassword', 'Re-Password', 'password')}
            <hr></hr>
            {this.renderCustomInput(
              'discover',
              'How you did you hear about Shalom Ministry',
              'textarea'
            )}
            <div className="formlinks">
              <NavLink to="/admin-form">Admin</NavLink>
              <NavLink to="/login">Signin</NavLink>
            </div>
            {this.renderButton('Register')}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
