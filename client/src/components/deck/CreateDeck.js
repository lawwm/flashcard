import React, { Fragment, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createDeck } from "../../actions/display";
import { Redirect } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


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
            <Container>
                <Row>
                    <h1>Create Deck</h1>
                </Row>

                <hr/>
                <Form onSubmit={e => onSubmit(e)}>
                    <Row>
                        <Form.Group>
                            <Form.Label>
                                Title: 
                            </Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Title"
                                name="title"
                                value={body.title}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group>
                            <Form.Label>
                                Description:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                type="description"
                                placeholder="Enter Description"
                                name="description"
                                value={body.description}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Button variant="warning" type="submit">
                            Create Deck
                        </Button>
                    </Row>

                    <Row>
                        <Button href="/dashboard" variant="warning" type="submit">
                            Cancel
                        </Button>
                    </Row>

                </Form>
            </Container>
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