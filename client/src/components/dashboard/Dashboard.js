import React, { Fragment, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import {loadUser} from "../../actions/auth";
import Display from "./paginationGlobal/Display";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Dashboard =  ({ loading, user, deckCount }) => {

  return (
    <Fragment>
    <Container className="dashboard-header">
      <Row className="justify-content-center">
          <h1>
            <i class="fas fa-globe-asia"></i> Global: {user && deckCount}
          </h1>
      </Row>
      <Row>
      <Display />
      </Row>
    </Container>

    </Fragment>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  deckCount: state.display.totalRecords
})

export default connect(
  mapStateToProps,
)(Dashboard);