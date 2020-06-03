import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Card = ({ title, question, answer }) => {
    const [cardFace, setCardFace] = useState("thecard");

    function showQuestion() {
        setCardFace("thecard");
    }

    function showAnswer() {
        setCardFace("thecard rotate-card");
    }

    return (
        <div className="maincontainer">
          <div className={cardFace}>

            <div className="thefront">
                <h1>{title}</h1>
                <p>{question}</p>
                <button onClick={showAnswer}>Answer</button>
            </div>

            <div className="theback">
                <p>{answer}</p>
                <button onClick={showQuestion}>Question</button>
            </div>

          </div>
        </div>
    );
}

export default connect(null)(Card);