import React, { Component } from 'react';
import styled from 'styled-components';

import { addPerson } from '../../lib/api';

const Container = styled.form`
  display: inline-block;
  width: auto;
  background-color: #d8c0c0;
  font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
  z-index: 5;
`;

const InputWrapper = styled.div`
  display: inline-block;
  margin-right: 1rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.075);
`;

const Label = styled.label`
  margin-right: 0.5rem;
  font-size: 1rem;
`;

const Input = styled.input`
  position: relative;
  margin-right: 0.5rem;
  border: none;
  font-size: 1rem;
  background-color: transparent;

  &:focus {
    outline: none;
    background-color: #d8c0c0;
  }
`;

const ClearButton = styled.button`
  border: none;
  font-size: 1rem;
  background-color: transparent;

  &:focus { outline: none; }
`;

const SubmitButton = styled.button`
  margin-bottom: 5rem;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.075);
  float: right;


  &:focus { outline: none; }
`;

export default class ListAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    addPerson({ name: this.state.name, email: this.state.email })
      .then(() => this.setState(() => ({ name: '', email: '' })))
      .then(() => this.formRef.reset())
      .then(() => this.nameRef.focus());
  }

  onChange = (e) => {
    const { id, value } = e.target;
    this.setState(() => ({ [id]: value }));
  }

  onClear = field => () => this.setState(() => ({ [field]: '' }))

  render() {
    return (
      <Container onSubmit={this.onSubmit} innerRef={(ref) => { this.formRef = ref; }}>
        <InputWrapper>
          <Label htmlFor="name">Namn:</Label>
          <Input
            innerRef={(ref) => { this.nameRef = ref; }}
            id="name"
            type="text"
            value={this.state.name}
            onChange={this.onChange}
          />
          <ClearButton type="button" tabIndex="-1" onClick={this.onClear('name')}>{'✗'}</ClearButton>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="email">Email:</Label>
          <Input
            innerRef={(ref) => { this.emailRef = ref; }}
            id="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <ClearButton type="button" tabIndex="-1" onClick={this.onClear('email')}>{'✗'}</ClearButton>
        </InputWrapper>
        <SubmitButton type="submit" disabled={!this.state.name || !this.state.email}>Lägg till</SubmitButton>
      </Container>
    );
  }
}
