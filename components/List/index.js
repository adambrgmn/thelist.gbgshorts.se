import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import format from 'date-fns/format';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TheadButton,
  ButtonMark,
  TableActionButton,
} from '../Table';

function createRegExp(str) {
  return new RegExp(str, 'gi');
}

export default function List({
  people,
  sortBy,
  filterBy,
  onSortClick,
  reverse,
  onCheckClick,
  onVipClick,
  onRemoveClick,
}) {
  function ListItem(person) {
    return (
      <Tr
        key={person.id}
        checked={person.checked}
        onClick={onCheckClick(person)}
      >
        <Th scope="row" center>{person.checked ? '✓' : ' '}</Th>
        <Td>{person.name}</Td>
        <Td>{person.email}</Td>
        <Td center><TableActionButton onClick={onVipClick(person)}>{person.vip ? '✓' : ' '}</TableActionButton></Td>
        <Td>{format(person.date, 'YYYY-MM-DD HH:mm')}</Td>
        <Td center><TableActionButton onClick={onRemoveClick(person)}>✗</TableActionButton></Td>
      </Tr>
    );
  }

  const regExp = createRegExp(filterBy);
  const nameContains = R.compose(R.test(regExp), R.prop('name'));
  const mailContains = R.compose(R.test(regExp), R.prop('email'));

  const sortedArray = R.compose(
    R.map(ListItem),
    arr => (reverse ? R.reverse(arr) : arr),
    R.sortBy(R.prop(sortBy)),
    R.filter(person => (!filterBy ? true : R.anyPass([nameContains, mailContains])(person))),
  );

  const headValues = [
    { id: 'checked', title: '✓ / ✗' },
    { id: 'name', title: 'Namn' },
    { id: 'email', title: 'Email' },
    { id: 'vip', title: 'VIP' },
    { id: 'date', title: 'Datum' },
    { id: 'remove', title: 'Ta bort' },
  ];

  return (
    <Table>
      <Thead>
        <Tr>
          {headValues.map((field, i) => (
            <Th key={field.id} center={i === 0}>
              <TheadButton onClick={() => onSortClick(field.id)} center={i === 0}>
                <ButtonMark active={sortBy === field.id}>{field.title}</ButtonMark>
              </TheadButton>
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {sortedArray(people)}
      </Tbody>
    </Table>
  );
}

List.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    vip: PropTypes.bool,
    checked: PropTypes.bool,
  })).isRequired,
  sortBy: PropTypes.string,
  filterBy: PropTypes.string,
  onSortClick: PropTypes.func.isRequired,
  reverse: PropTypes.bool,
  onCheckClick: PropTypes.func.isRequired,
  onVipClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

List.defaultProps = {
  sortBy: 'name',
  filterBy: '',
  reverse: false,
};
