import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  top: 0rem;
  width: 100%;
  border-bottom: 1px solid #eceeef;
  padding: 1rem 0;
  background-color: #d8c0c0;
  font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
  z-index: 5;
`;

const InputWrapper = styled.div`
  display: inline-block;
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

export default function FilterInput({ value, onChange, onClearClick, children }) {
  return (
    <Container>
      <InputWrapper>
        <Label htmlFor="filterInput">Sök:</Label>
        <Input id="filterInput" type="text" value={value} onChange={onChange} />
        <ClearButton onClick={onClearClick}>{'✗'}</ClearButton>
      </InputWrapper>
      {children}
    </Container>
  );
}

FilterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
