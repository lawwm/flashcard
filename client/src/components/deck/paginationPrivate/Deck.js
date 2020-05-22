import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

const Deck = props => {
  const { title = "", description = "", cardCount = "", deckId = "", userId = "" } = props ;//|| {};

  return (
    <Card>
    <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {description}
        </Card.Text>
        <Button variant="primary">View Deck</Button>{' '}
        {(userId === deckId) && <Button variant="primary">Add Card</Button>}
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
