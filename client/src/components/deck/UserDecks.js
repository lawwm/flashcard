import React, {Fragment} from "react";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Display from "./paginationPrivate/Display";

const UserDeck = ({ user }) => {
    return (
        <Fragment>
            <Jumbotron>
            <h1>User: {user && user.name} </h1>
            <p>
              Total number of decks within {user && user.name}'s collection: { user && user.deckCount }
            </p>
            <p>
              <Button href="/dashboard" variant="primary">View Global Deck</Button>{' '}
              <Button href="/createdeck" variant="primary">Create Deck</Button>
            </p>
            </Jumbotron>
            <Display />
        </Fragment>
    )
}

UserDeck.propTypes = {
    user: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    user: state.auth.user
  })
  
  export default connect(
    mapStateToProps,
  )(UserDeck);