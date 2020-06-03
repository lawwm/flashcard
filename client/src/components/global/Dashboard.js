import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Display from "./paginationGlobal/Display";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Dashboard =  ({ loading, user, deckCount }) => {

  return (
    <Fragment>
      <Container className="dashboard-header">
        <Row className="justify-content-center" md={12}>
          <h1>
            <i className="fas fa-globe-asia"></i> Global: {user && deckCount}
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