import React from 'react';
import LoginForm from '../components/loginForm';
import Header from '../components/header';

export default class Login extends React.Component {

  render() {
    return(
      <div>
        <Header />
        <LoginForm />
      </div>
    );
  }
}