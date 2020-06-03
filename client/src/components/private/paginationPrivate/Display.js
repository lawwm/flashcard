//Main component
import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserPage } from "../../../actions/display";
import Deck from "./Deck";
import Limit from "./Limit";
import Paginate from "./Pagination";

import Col from 'react-bootstrap/Col';
import CardColumns from 'react-bootstrap/CardColumns';

const Display = ({ currentDecks, getUserPage, limit, neighbour, user_id }) => {
  useEffect(() => { //side effect go to page 1
   getUserPage(1, limit, neighbour, user_id);
  }, []);

  return (
    <Fragment>
      <Col md={12}>
        <hr />
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
        <hr />
      </Col>
      <Col className="justify-content-center margin-page" lg={{ span: 7, offset: 1 }}>
        <Paginate />
      </Col>
      <Col className="margin-page" lg={4}>
        <Limit />
      </Col>
    </Fragment>
  );
};

Display.propTypes = {
  currentDecks: PropTypes.array.isRequired,
  getUserPage: PropTypes.func.isRequired,
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
  { getUserPage }
)(Display);