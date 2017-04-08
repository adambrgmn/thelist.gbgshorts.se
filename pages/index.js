import React, { Component } from 'react';
import styled from 'styled-components';

import { addPerson } from '../lib/api';

import { Button } from '../components/Shared';
import Modal from '../components/Modal';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 37.5rem;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Gill Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.3em;
  letter-spacing: 0.05em;
`;

const Input = styled.input`
  width: 100%;
  max-width: 25rem;
  height: 3.25rem;
  border: none;
  padding: 0 0.5rem;
  font-family: 'Gill Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const InputBorder = styled.span`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: calc(100% - 0.25rem);
    left: 0;
    width: 100%;
    height: 0.25rem;
    background-color: black;
  }
`;

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isValid: false,
      showModal: false,
      message: '',
      error: '',
    };
  }

  checkValid = () => {
    const { name, email } = this.state;
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const nameValid = name.length > 0;
    const emailValid = emailRegEx.test(email);

    return this.setState(() => ({ isValid: nameValid && emailValid }));
  }

  onChange = ({ target }) => {
    this.setState(() => ({
      [target.id]: target.value,
    }), this.checkValid);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email } = this.state;

    addPerson({ name, email })
      .then(() => {
        const firstName = name.split(' ')[0];
        const message = `Kul att du vill komma ${firstName}. Du får mail med mer info när det hela närmar sig!`;
        this.setState(() => ({ showModal: true, message }));
      })
      .catch((err) => {
        this.setState(() => ({ showModal: true, error: err.message }));
      });
  }

  onCloseClick = () => {
    this.setState(() => ({
      name: '',
      email: '',
      isValid: false,
      showModal: false,
      message: '',
      error: '',
    }));
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.onSubmit}>
          <span>Kul att du vill komma till Gbg Shorts 22 april! Vi behöver ditt </span>
          <label htmlFor="name">
            namn
            <InputBorder>
              <Input
                type="text"
                id="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </InputBorder>
          </label>
          <span> och din </span>
          <label htmlFor="email">
            email
            <InputBorder>
              <Input
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </InputBorder>
          </label>
          <Button
            type="submit"
            onClick={this.onSubmit}
            disabled={!this.state.isValid}
          >
            Skriv upp mig
          </Button>
        </form>
        <Modal
          message={this.state.message}
          error={this.state.error}
          show={this.state.showModal}
          onCloseClick={this.onCloseClick}
        />
      </Container>
    );
  }
}
