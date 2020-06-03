import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {createNewCard, deleteCreatorDeck, addDeckUser, updateDeck} from "../../../actions/display";
import {connect} from "react-redux";
import { Link } from "react-router-dom";


const Deck = ({index, title, description, cardCount, deckId, creatorId, userId, createNewCard, deleteCreatorDeck, addDeckUser, updateDeck}) => {

  //Update card count when card is added
  const [tempCardCount, setTempCardCount] = useState(cardCount);
  
  useEffect(() => {
    setTempCardCount(cardCount);
  }, [cardCount]);

  //Set whether the add card modal is shown or not
  const [addCard, setAddCard] = useState(false);
  const closeAddCard = () => setAddCard(false);
  const showAddCard = () => setAddCard(true);

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
    closeAddCard();
  }

  //Handle whether the delete card modal is shown or not
  const [deleteDeck, setDeleteDeck] = useState(false);
  const closeDeleteDeck = () => setDeleteDeck(false);
  const showDeleteDeck = () => setDeleteDeck(true);

  //handles delete deck
  const deleteDeckAndClose = (e) => {
    e.preventDefault();
    deleteCreatorDeck(deckId);
    closeDeleteDeck();
  }

  //Handles whether the add deck modal is shown or not
  const [addDeck, setAddDeck] = useState(false);
  const closeAddDeck = () => setAddDeck(false);
  const showAddDeck = () => setAddDeck(true);

  //handles add deck
  const addDeckAndClose = (e) => {
    e.preventDefault();
    addDeckUser(deckId);
    closeAddDeck();
  }

  //Handles whether the edit card setup is shown
  const [editDeck, setEditDeck] = useState(false);
  const closeEditDeck = () => setEditDeck(false);
  const showEditDeck = () => setEditDeck(true);

  function changeEditDeck(e) {
    setEditDeckValue({
      ...editDeckValue,
      [e.target.name] : e.target.value
    })
  }

  function submitEditDeck(e) {
    e.preventDefault();
    updateDeck(deckId, editDeckValue, index);
    closeEditDeck();
  }

  const [editDeckValue, setEditDeckValue] = useState({
    title : title,
    description: description
  })

  return (
    <Fragment>
      <Card className="dashboard-deck">
        {(editDeck) ?
          (<Fragment>
            <Form>
              <Card.Header>
                <Form.Group className={"header-deck-edit"}>
                  <Form.Control 
                    type="text" 
                    placeholder={title} 
                    name="title" 
                    value={editDeckValue.title}
                    onChange={e => changeEditDeck(e)}
                    required
                  />
                </Form.Group>
              </Card.Header>
              <Card.Body className={"body-deck-edit"}>
                <Form.Group>
                  <Form.Control 
                    as="textarea" 
                    type="text" 
                    placeholder={description} 
                    name="description" 
                    value={editDeckValue.description}
                    onChange={e => changeEditDeck(e)}
                    required
                  />
                </Form.Group>
                <Button variant="warning" onClick={e => submitEditDeck(e)}>
                  Save Changes
                </Button>{' '}
                <Button variant="secondary" onClick={closeEditDeck}>
                  Close
                </Button>
              </Card.Body>
            </Form>
          </Fragment>)
          : 
          (<Fragment>

            <Card.Header className={"header-deck"}>{title}</Card.Header>
            <Card.Body className={"body-deck"}>
              <Card.Text>
                {description}
              </Card.Text>
              <Dropdown className={"dropdown-setting"}>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                  <i className="fas fa-cog"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/${deckId}`}>View Deck</Dropdown.Item>
                  <Dropdown.Item onClick={showAddDeck}>Add Deck</Dropdown.Item>
                  {(creatorId === userId) && <Dropdown.Item variant="warning" onClick={showAddCard}>Add Card</Dropdown.Item>}
                  {(creatorId === userId) && <Dropdown.Item variant="warning" onClick={showDeleteDeck}>Delete Deck</Dropdown.Item>}
                  {(creatorId === userId) && <Dropdown.Item variant="warning" onClick={showEditDeck}>Edit Deck</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>

            </Card.Body>

          </Fragment>)
        }
         
        <Card.Footer>
          <small className="text-muted">Card count: {tempCardCount}</small>
        </Card.Footer>
      </Card>

{/* Modal for adding card*/}

      <Modal show={addCard} onHide={closeAddCard}>
        <Modal.Header closeButton>
          <Modal.Title>Create Card</Modal.Title>
        </Modal.Header>
        <Form onSubmit={e => submitCardValue(e)}>
        <Modal.Body>
          
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
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddCard}>
            Close
          </Button>
          <Button variant="warning" type="submit">
            Create Card
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>

{/* Modal for deleting card */}
      <Modal show={deleteDeck} onHide={closeDeleteDeck}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete deck?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This cannot be undone</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteDeck}>
            Close
          </Button>
          <Button variant="warning" onClick={e => deleteDeckAndClose(e)}>
            Delete deck
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal for adding deck to user */}
      <Modal show={addDeck} onHide={closeAddDeck}>
        <Modal.Header closeButton>
          <Modal.Title>Add deck to private collection?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={closeAddDeck}>
            Close
          </Button>
          <Button variant="warning" onClick={e => addDeckAndClose(e)}>
            Add deck
          </Button>
        </Modal.Body>
      </Modal>

  
    </Fragment>
  );
};

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cardCount: PropTypes.number.isRequired,
  createNewCard: PropTypes.func.isRequired,
  deleteCreatorDeck: PropTypes.func.isRequired,
  addDeckUser: PropTypes.func.isRequired,
  updateDeck: PropTypes.func.isRequired
};

export default connect(null, {createNewCard, deleteCreatorDeck, addDeckUser, updateDeck})(Deck);
