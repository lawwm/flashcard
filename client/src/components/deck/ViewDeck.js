import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {viewDeck} from "../../actions/deck.js";
import Card from "./Card";

import Swiper from "swiper";
// import 'swiper/css/swiper.min.css';


const ViewDeck = ({ match, viewDeck, title, description, currentCards, history, location }) => {

    useEffect(() => {
        viewDeck(match.params.id);
    }, [match.params.id]);

    useEffect(() => {
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            //Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              }
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            }
            
          });
    })
    console.log(history);
    console.log(location);
    console.log(match);
    return (
        <Fragment>
            <Container>
                <h1>{title}</h1>
                <h3>{description}</h3>
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    {currentCards.map((card) => 
                        <div className="swiper-slide" key={(card._id).toString()}>
                            <Card
                                title={card.title}
                                question={card.question}
                                answer={card.answer}
                            />
                        </div>
                    )}
                  </div>
                  
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-scrollbar"></div>
                </div>
            </Container>
        </Fragment>
    )
}

ViewDeck.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currentCards: PropTypes.array.isRequired,
    viewDeck: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    title: state.deck.title,
    description: state.deck.description,
    currentCards: state.deck.currentCards,
})


export default connect(mapStateToProps, {viewDeck})(ViewDeck);