import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { Button, Paragraph, Link } from '../Shared';

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  top: ${({ show }) => (show ? 0 : '-100vh')};
  left: 0;
  width: 100vw;
  max-width: 37.5rem;
  height: 100vh;
  border-bottom: 0.5rem solid black;
  padding: 2rem;
  font-size: 1.5rem;
  line-height: 1.5;
  background-color: #d8c0c0;
  transition: top 0.3s ease-out;
`;

export default function Modal({
  message,
  error,
  show,
  onCloseClick,
}) {
  return (
    <ModalContainer show={show}>
      <Paragraph>{error || message}</Paragraph>
      <Paragraph>Håll dig uppdaterad på <Link href="https://www.facebook.com/gbgshorts">Facebook</Link> eller <Link href="https://www.instagram.com/gbgshorts/">Instagram</Link>.</Paragraph>
      <Button onClick={onCloseClick}>
        {error ? 'Försök igen' : 'Lägg till fler'}
      </Button>
    </ModalContainer>
  );
}

Modal.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  message: '',
  error: '',
};
