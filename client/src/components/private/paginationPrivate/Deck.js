import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {createNewCard, deleteUserDeck} from "../../../actions/display";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
//deckId is creator's id, user_id is user's id, deckId is decks' Id
const Deck = ({title, description, cardCount, creatorId, deckId, userId, createNewCard, deleteUserDeck}) => {
  


  //I'm too lazy to update map props, set a visual image, getpage will refresh automatically
  const [tempCardCount, setTempCardCount] = useState(cardCount);

  useEffect(() => {
    setTempCardCount(cardCount);
  }, [cardCount]);


  //Set whether the add card modal is shown or not
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handle the form logic
  const [card, setCard] = useState({
    title: "",
    question: "",
    answer: ""
  });

  function changeCardValue(e) {
    setCard({
      ...card,
      [e.target.name] : e.target.value
    })
  }

  function submitCardValue(e) {
    e.preventDefault();
    createNewCard(card, deckId);
    //setTempCardCount(tempCardCount + 1);
    setCard({
      title: "",
      question: "",
      answer: ""
    })
    setTempCardCount(tempCardCount + 1);
    handleClose();
  }

  //Handle whether the delete user card modal is shown or not
  const [deleteDeck, setDeleteDeck] = useState(false);
  const closeDeleteDeck = () => setDeleteDeck(false);
  const showDeleteDeck = () => setDeleteDeck(true);

  //handles delete deck
  const deleteDeckAndClose = (e) => {
    e.preventDefault();
    deleteUserDeck(deckId);
    closeDeleteDeck();
  }

  return (
    <Fragment>
      <Card className="dashboard-deck">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Text>
            {description}
          </Card.Text>

          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              <i className="fas fa-cog"></i> Options
          </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/${deckId}`}>View Deck</Dropdown.Item>
              <Dropdown.Item onClick={showDeleteDeck}>Delete Deck</Dropdown.Item>
              {(creatorId === userId) && <Dropdown.Item variant="warning" onClick={handleShow}>Add Card</Dropdown.Item>}
            </Dropdown.Menu>
          </Dropdown>

        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Card count: {tempCardCount}</small>
        </Card.Footer>
      </Card>

{/* Modal for adding card*/}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>Title: </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Title" 
                name="title" 
                value={card.title}
                onChange={e => changeCardValue(e)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupQuestion">
              <Form.Label>Question: </Form.Label>
              <Form.Control 
                as="textarea" 
                type="text" 
                placeholder="Question" 
                name="question" 
                value={card.question}
                onChange={e => changeCardValue(e)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupAnswer">
              <Form.Label>Answer: </Form.Label>
              <Form.Control 
                as="textarea" 
                type="text" 
                placeholder="Answer" 
                name="answer" 
                value={card.answer}
                onChange={e => changeCardValue(e)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={e => submitCardValue(e)}>
            Create Card
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for deleting card */}
      <Modal show={deleteDeck} onHide={closeDeleteDeck}>
        <Modal.Header closeButton>
          <Modal.Title>Delete deck from profile?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You can reinstall if deck is still available in global collection</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteDeck}>
            Close
          </Button>
          <Button variant="warning" onClick={e => deleteDeckAndClose(e)}>
            Delete deck
          </Button>
        </Modal.Footer>
      </Modal>

    </Fragment>
  );
};

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cardCount: PropTypes.number.isRequired,
  createNewCard: PropTypes.func.isRequired,
  deleteUserDeck: PropTypes.func.isRequired
};

const mapStateToPRops = (state) => {
  
}

export default connect(null, {createNewCard, deleteUserDeck})(Deck);
