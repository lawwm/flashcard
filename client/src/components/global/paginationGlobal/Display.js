//Main component
import React, {  useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPage } from "../../../actions/display";
import Deck from "./Deck";
import Limit from "./Limit";
import Paginate from "./Pagination";
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';

const Display = ({ currentDecks, getPage, limit, neighbour, user_id }) => {
  useEffect(() => { //side effect go to page 1
   getPage(1, limit, neighbour);
  }, []);

  return (
    <Fragment>
      <Col md={12}>
        <hr />
        <CardColumns>
          {currentDecks.map((deck, index) =>
            <Deck
              key={deck._id}
              index={index}
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