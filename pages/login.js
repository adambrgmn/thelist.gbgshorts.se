import React, { Component } from 'react';
import Router from 'next/router';
import styled, { keyframes } from 'styled-components';

import { fb } from '../lib/db';

const Container = styled.div`
  width: 400px;
  height: auto;
  margin: 5rem auto;
  font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
`;

const Title = styled.h1`
  margin: 3rem 0;
  font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
  text-transform: uppercase;
  text-align: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  padding-top: 1.75rem;
  background-color: rgba(0, 0, 0, 0.075);
`;

const Label = styled.label`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.75rem;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid ${({ valid, touched }) => {
    if (!valid && touched) return 'red';
    return 'transparent';
  }};
  font-size: 1rem;
  background-color: transparent;

  &:focus { outline: none; }
`;

const anim = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const Button = styled.button`
  position: relative;
  float: right;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  color: ${({ disabled }) => (disabled ? 'transparent' : 'black')};
  background-color: rgba(0, 0, 0, 0.075);

  &::after {
    content: "";
    position: absolute;
    display: ${({ disabled }) => (disabled ? 'block' : 'none')};
    top: 50%;
    left: 50%;
    width: 1rem;
    height: 1rem;
    border: 2px dashed black;
    border-radius: 100%;
    animation: ${anim} 1s linear infinite
  }
`;

const initialState = {
  password: '',
  email: '',
  error: '',
  progress: false,
  emailValid: false,
  emailTouched: false,
  passwordValid: false,
  passwordTouched: false,
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.auth = fb.auth();
    this.unsubscribe = false;
  }

  componentDidMount() {
    this.unsubscribe = this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState(() => ({ ...initialState, progress: true }));
        Router.push({ pathname: '/listan' });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState(() => ({ progress: true }));

    this.auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((err) => {
        this.setState(() => ({ error: err.message, password: '', progress: false }));
      });
  }

  onChange = field => ({ target }) => {
    this.setState(() => ({ [field]: target.value }));
    this.validate(field, target.value);
  };

  onBlur = field => () => this.setState(() => ({ [`${field}Touched`]: true }));

  validate = (field, val) => {
    let valid = false;

    if (field === 'password') {
      valid = val.length > 5;
    }

    if (field === 'email') {
      const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      valid = regExp.test(val);
    }

    this.setState(() => ({ [`${field}Valid`]: valid }));
  };

  render() {
    return (
      <Container>
        <Title>Gbg Shorts 2017 – Logga in</Title>
        <form onSubmit={this.onSubmit}>
          <InputWrapper>
            <Label htmlFor="inputEmail">Email:</Label>
            <Input
              id="inputEmail"
              type="email"
              value={this.state.email}
              onChange={this.onChange('email')}
              onBlur={this.onBlur('email')}
              disabled={this.state.progress}
              valid={this.state.emailValid}
              touched={this.state.emailTouched}
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="inputPassword">Lösenord:</Label>
            <Input
              id="inputPassword"
              type="password"
              value={this.state.password}
              onChange={this.onChange('password')}
              onBlur={this.onBlur('password')}
              disabled={this.state.progress}
              valid={this.state.passwordValid}
              touched={this.state.passwordTouched}
            />
          </InputWrapper>

          <div>
            <Button type="submit" disabled={this.state.progress}>
              Logga in
            </Button>
          </div>
        </form>

        <div>
          <p>{this.state.error}</p>
        </div>
      </Container>
    );
  }
}
