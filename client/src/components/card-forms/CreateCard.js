import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Redirect } from "react-router-dom";

const CreateCard = () => {
    const [body, setBody] = useState({
        title: "",
        question: "",
        answer: ""
    });

    function onChange(e) {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    } 

    function onSubmit(e) {
        e.preventDefault();
        // createDeck(body);
        setBody({
            title: "",
            description: "",
            answer: ""
        })
    }

    //redirect if card has been created
    // if (createdDeck) {
    //     return <Redirect to="/dashboard" />
    // }

    return (
      <Fragment>
        <h1>Create card</h1>
        <Form onSubmit={e => onSubmit(e)}> 
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control  
                    placeholder="Title" 
                    name="title"
                    value={body.title}
                    onChange={(e) => onChange(e)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Question</Form.Label>
                <Form.Control 
                    placeholder="Enter Question" 
                    name="question"
                    value={body.question}
                    onChange={(e) => onChange(e)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Answer</Form.Label>
                <Form.Control 
                    placeholder="Enter Answer" 
                    name="answer"
                    value={body.answer}
                    onChange={(e) => onChange(e)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" block>
                Create Card
            </Button>
        </Form>
      </Fragment>
    )
  }

//   CreateCard.propTypes = {
//       createDeck: PropTypes.func.isRequired,
//       createdDeck: PropTypes.bool.isRequired
//   }

  export default connect(null)(CreateCard);