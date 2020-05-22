//Main component
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPage } from "../../../actions/display";
import Deck from "./Deck";
import Limit from "./Limit";
import Paginate from "./Pagination";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Display = ({ currentDecks, getPage, limit, neighbour, user_id }) => {
  useEffect(() => { //side effect go to page 1
   getPage(1, limit, neighbour);
  }, []);

  return (
    <Fragment>
      <Col md={{span: 4, offset: 1}}>
        <Paginate />
      </Col>
      <Col  md={{span: 4, offset: 3}}>
        <Limit />
      </Col>
      
      <Col md={12}>
        <CardColumns>
        {currentDecks.map((deck, index) =>
          <Deck
            key={index}
            title={deck.title}
            description={deck.description}
            cardCount={deck.cardCount}
            deckId={deck._id}
            creatorId={deck.creator}
            userId={user_id}
          />
        )}
      </CardColumns>
      </Col>
      
    </Fragment>

    
  );
};

Display.propTypes = {
  currentDecks: PropTypes.array.isRequired,
  getPage: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  neighbour: PropTypes.number.isRequired,
  user_id: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  currentDecks: state.display.currentDecks,
  limit: state.display.limit,
  neighbour: state.display.neighbour,
  user_id: state.auth.user._id
});

export default connect(
  mapStateToProps,
  { getPage }
)(Display);