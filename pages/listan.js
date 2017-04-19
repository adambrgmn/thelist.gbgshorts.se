import React, { Component } from 'react';
import R from 'ramda';
import styled from 'styled-components';
import Router from 'next/router';

import db, { fb } from '../lib/db';

import FilterInput from '../components/FilterInput';
import List from '../components/List';
import ListInfo from '../components/ListInfo';
import ListAdd from '../components/ListAdd';

const Container = styled.div`
  width: 850px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 3rem 0;
  font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
  text-transform: uppercase;
  text-align: center;
`;

const LogOut = styled.button`
  margin-bottom: 5rem;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.075);
  float: right;
`;

export default class Listan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      sortBy: 'checked',
      filterBy: '',
      reverse: false,
    };

    this.peopleRef = db.child('people');
    this.auth = fb.auth();
  }

  componentDidMount() {
    const user = this.auth.currentUser;

    if (!user) {
      Router.push({ pathname: '/login' });
    }

    this.peopleRef.on('child_added', (snap) => {
      const person = {
        ...snap.val(),
        id: snap.key,
      };

      this.setState(prev => ({
        people: [...prev.people, person],
      }));
    });

    this.peopleRef.on('child_changed', (snap) => {
      const newPerson = { ...snap.val(), id: snap.key };
      const index = R.findIndex(R.propEq('id', newPerson.id))(this.state.people);
      const indexLens = R.lensIndex(index);

      this.setState(prev => ({
        people: R.set(indexLens, newPerson, prev.people),
      }));
    });

    this.peopleRef.on('child_removed', (snap) => {
      const id = snap.key;
      const removeWithId = R.complement(R.propEq('id', id));

      this.setState(prev => ({
        people: R.filter(removeWithId, prev.people),
      }));
    });
  }

  componentWillUnmount() {
    this.peopleRef.off();
  }

  onSortClick = (prop) => {
    if (prop === this.state.sortBy) {
      return this.setState(prev => ({ reverse: !prev.reverse }));
    }

    return this.setState(() => ({ sortBy: prop }));
  };


  onCheckClick = person => () => {
    const updates = {};
    updates[`/people/${person.id}/checked`] = !person.checked;
    db.update(updates);
  }

  onRemoveClick = person => (e) => {
    if (e.stopPropagation) e.stopPropagation();
    db.child(`people/${person.id}`).remove();
  }

  onVipClick = person => (e) => {
    if (e.stopPropagation) e.stopPropagation();
    const updates = {};
    updates[`/people/${person.id}/vip`] = !person.vip;
    db.update(updates);
  }


  onFilterChange = ({ target }) => {
    this.setState(() => ({ filterBy: target.value }));
  };

  onClearClick = () => this.setState(() => ({ filterBy: '' }))

  onLogoutClick = () => {
    this.auth.signOut()
      .then(() => Router.push({ pathname: '/login' }));
  }

  render() {
    return (
      <Container>
        <Title>Gbg Shorts 2017 – Listan</Title>
        <FilterInput
          value={this.state.filterBy}
          onChange={this.onFilterChange}
          onClearClick={this.onClearClick}
        >

          <ListInfo people={this.state.people} />
        </FilterInput>
        <List
          people={this.state.people}
          onSortClick={this.onSortClick}
          sortBy={this.state.sortBy}
          filterBy={this.state.filterBy}
          reverse={this.state.reverse}
          onCheckClick={this.onCheckClick}
          onRemoveClick={this.onRemoveClick}
          onVipClick={this.onVipClick}
        />
        <div style={{ marginTop: '5rem' }}>
          <ListAdd />
          <LogOut type="button" onClick={this.onLogoutClick}>Logga ut</LogOut>
        </div>
      </Container>
    );
  }
}
