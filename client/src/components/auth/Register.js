import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { setAlert } from "../../actions/alert";
import InputGroup from 'react-bootstrap/InputGroup';


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password })
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Container className="auth-page" fluid>
            <Row className="justify-content-center whiz-kit-logo">
                <h1><i className="fas fa-graduation-cap"></i> Whiz-Kit</h1>
            </Row>
            <Row className="justify-content-center">
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group controlId="formBasicName">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">
                                    <i className="fas fa-user"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="name"
                                placeholder="Name"
                                value={name}
                                name="name"
                                size='lg'
                                onChange={e => onChange(e)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

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
                                value={email}
                                name="email"
                                size='lg'
                                onChange={e => onChange(e)}
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
                                value={password}
                                name="password"
                                size='lg'
                                onChange={e => onChange(e)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">
                                    <i className="fas fa-unlock"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                                type="password"
                                placeholder="Re-Enter Password"
                                value={password2}
                                name="password2"
                                size='lg'
                                onChange={e => onChange(e)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Button size="lg" variant="warning" type="submit" block>
                            Register
                    </Button>
                        <Form.Text className="auth-reminder">Already registered? <a href="/">Log in here!</a></Form.Text>
                    </Form.Group>

                </Form>
            </Row>
        </Container>

    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { register, setAlert }
)(Register);