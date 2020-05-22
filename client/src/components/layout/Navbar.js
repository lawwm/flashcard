import React, { Fragment } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";

//Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const NavbarB = ({ auth: { isAuthenticated, loading }, logout }) => {

    const guestLinks = (
    <Nav >
        <Nav.Link href="/">Login</Nav.Link>
        <Nav.Link href="/Register">Register</Nav.Link>
        <Nav.Link href="#!">About</Nav.Link>
    </Nav>
    );

    const authLinks = (
    <Nav >
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/userdecks">Profile</Nav.Link>
        <Nav.Link href="/createdeck">Create Deck</Nav.Link>
        <Nav.Link href="/">Find Users</Nav.Link>
        <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
    </Nav>
    );


    return (
        <Navbar className="custom-navbar" bg="warning" variant="dark" expand="lg">
            <Navbar.Brand className="nav-logo" href="/">
                <i className="fas fa-graduation-cap"></i>Whiz-Kit
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"> 
                {!loading && (
                    <Fragment>{isAuthenticated 
                        ? <Navbar.Text className="mr-auto">
                            
                          </Navbar.Text>
                        : <Navbar.Text className="mr-auto">
                            The starter pack for straight As
                          </Navbar.Text>}
                    </Fragment>
                )}
                {!loading && (
                    <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

NavbarB.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(NavbarB);