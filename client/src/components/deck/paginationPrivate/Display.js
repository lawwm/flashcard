//Main component
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserPage } from "../../../actions/display";
import Deck from "./Deck";
import Limit from "./Limit";
import Paginate from "./Pagination";

const Display = ({ currentDecks, getUserPage, limit, neighbour, user_id }) => {
  useEffect(() => { //side effect go to page 1
   getUserPage(1, limit, neighbour, user_id);
   console.log(user_id);
  }, []);

  return (
    <div>
      <div>
        {currentDecks.map((deck, index) => 
          <Deck 
            key={index} 
            title={deck.title} 
            description={deck.description} 
            cardCount={deck.cardCount} 
            deckId={deck.creator}
            userId={user_id}
          />
        )}
      </div>
      <div>
        <Paginate />
      </div>
      <div>
        <Limit />
      </div>
    </div>
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