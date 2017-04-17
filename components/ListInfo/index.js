import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: auto;
  margin-left: 1rem;
`;

const Section = styled.span`
  margin-right: 1rem;
`;

export default function ListInfo({ people }) {
  const total = people.length;
  const checked = people.filter(person => person.checked).length;
  const unchecked = total - checked;

  return (
    <Container>
      <Section>
        <strong>Totalt: </strong>
        {total} st
      </Section>

      <Section>
        <strong>Bockade: </strong>
        {checked} st
      </Section>

      <Section>
        <strong>Ej bockade: </strong>
        {unchecked} st
      </Section>
    </Container>
  );
}

ListInfo.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    vip: PropTypes.bool,
    checked: PropTypes.bool,
  })).isRequired,
};
