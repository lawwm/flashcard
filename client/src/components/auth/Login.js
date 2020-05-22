import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    }

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Container className="auth-page" fluid>
            <Row className="justify-content-center whiz-kit-logo">
                <h1><i className="fas fa-graduation-cap"></i> Whiz-Kit</h1>
            </Row>
            <Row className="justify-content-center">
                <Form onSubmit={e => onSubmit(e)}>

                    <Form.Group controlId="formBasicEmail">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">
                                    <i className="fas fa-envelope-square"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={e => onChange(e)}
                                size="lg"
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">
                                    <i className="fas fa-lock"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={e => onChange(e)}
                                size="lg"
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Button
                            bg="warning"
                            variant="warning"
                            type="submit"
                            size="lg"
                            block
                        >
                            Log In
                    </Button>
                        <Form.Text className="auth-reminder" >Don't have an account? <a href="/Register">Register here!</a></Form.Text>
                    </Form.Group>

                </Form>
            </Row>
        </Container>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);