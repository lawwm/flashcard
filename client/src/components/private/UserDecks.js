import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Display from "./paginationPrivate/Display";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { deleteAllUserDeck, deleteAllCreatorDeck } from "../../actions/display";
import Button from 'react-bootstrap/Button';

const UserDeck = ({ user, deckCount, deleteAllUserDeck, deleteAllCreatorDeck }) => {
    return (
      <Fragment>
        <Container className="dashboard-header">
          <Row className="justify-content-center" md={12}>
            <h1><i className="fas fa-user"></i> {user && user.name} : {user && deckCount}</h1>
            <Button 
              variant="warning" 
              onClick={deleteAllUserDeck}>
              Empty profile decks
            </Button>{' '}
            <Button 
              variant="warning" 
              onClick={e => deleteAllCreatorDeck(user._id)}>
              Delete creator decks
            </Button>{' '}
          </Row>
          <Row>
            <Display />
          </Row>
        </Container>
      </Fragment>
    )
}

UserDeck.propTypes = {
    user: PropTypes.object.isRequired,
    deckCount: PropTypes.number.isRequired,
    deleteAllUserDeck: PropTypes.func.isRequired,
    deleteAllCreatorDeck: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    user: state.auth.user,
    deckCount: state.display.totalRecords
  })
  
  export default connect(
    mapStateToProps,
    { deleteAllUserDeck, deleteAllCreatorDeck }
  )(UserDeck);