import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  margin-top: 4rem;
  border: none;
  padding: 0.5rem 1rem;
  font-family: 'Gill Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &:disabled {
    color: black;
    opacity: 0.5;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    width: 100%;
    height: 0.25rem;
    background-color: black;
    transform: translateX(-50%);
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 110%;
  }
`;

export const Paragraph = styled.p`
  margin-bottom: 1em;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Link = styled.a`
  position: relative;
  color: black;
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    width: 100%;
    height: 0.25rem;
    background-color: currentColor;
    transform: translateX(-50%);
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 110%;
  }
`;
