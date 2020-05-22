import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

const Deck = props => {
  const { title = "", description = "", cardCount = "", creatorId = "", deckId = "", userId = "" } = props ;//|| {};

  function createCard() {
    console.log(deckId);
  }

  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="warning">View Deck</Button>{' '}
        {(creatorId === userId) && <Button onClick={createCard} variant="warning">Add Card</Button>}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Card count: {cardCount}</small>
      </Card.Footer>
    </Card>
  );
};

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cardCount: PropTypes.number.isRequired
};

export default Deck;
