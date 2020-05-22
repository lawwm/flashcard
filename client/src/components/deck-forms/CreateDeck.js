import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { createDeck } from "../../actions/display";
import { Redirect } from "react-router-dom";

const CreateDeck = ({ createDeck, createdDeck }) => {
    const [body, setBody] = useState({
        title: "",
        description: ""
    });

    function onChange(e) {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    } 

    function onSubmit(e) {
        e.preventDefault();
        createDeck(body);
        setBody({
            title: "",
            description: ""
        })
    }

    //redirect if deck has been created
    if (createdDeck) {
        return <Redirect to="/dashboard" />
    }

    return (
      <Fragment>
        <h1>Create Deck</h1>
        <Form onSubmit={e => onSubmit(e)}> 
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="title" 
                    placeholder="Title" 
                    name="title"
                    value={body.title}
                    onChange={(e) => onChange(e)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    type="description" 
                    placeholder="Enter Description" 
                    name="description"
                    value={body.description}
                    onChange={(e) => onChange(e)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" block>
                Create Deck
            </Button>
        </Form>
      </Fragment>
    )
  }

  CreateDeck.propTypes = {
      createDeck: PropTypes.func.isRequired,
      createdDeck: PropTypes.bool.isRequired
  }

  const mapStateToProps = state => ({
      createdDeck: state.display.createdDeck
  });

  export default connect(mapStateToProps, {createDeck})(CreateDeck);