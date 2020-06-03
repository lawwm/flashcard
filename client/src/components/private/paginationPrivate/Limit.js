import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {updateLimit, updateNeighbour, getPage} from "../../../actions/display";
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const Limit =({updateLimit, updateNeighbour, limit, neighbour, getPage}) => {
    function updateLimitAndPage(num) {
        updateLimit(num);
        getPage(1, num, neighbour);
    }

    function updateNeighbourAndPage(num) {
        updateNeighbour(num);
        getPage(1, limit, num);
    }

    return (
        <Fragment>
            <ButtonGroup>
                <DropdownButton
                    variant='warning'
                    size="lg"
                    as={ButtonGroup}
                    id="bg-nested-dropdown"
                    title={`Limit: ${limit}`}
                >
                    <Dropdown.Item onClick={() => { updateLimitAndPage(5) }} as="button">5</Dropdown.Item>
                    <Dropdown.Item onClick={() => { updateLimitAndPage(10) }} as="button">10</Dropdown.Item>
                    <Dropdown.Item onClick={() => { updateLimitAndPage(20) }} as="button">20</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                    variant='warning'
                    size="lg"
                    as={ButtonGroup}
                    id="bg-nested-dropdown"
                    title={`Neighbour: ${neighbour}`}
                >
                    <Dropdown.Item onClick={() => { updateNeighbourAndPage(0) }} as="button">0</Dropdown.Item>
                    <Dropdown.Item onClick={() => { updateNeighbourAndPage(1) }} as="button">1</Dropdown.Item>
                    <Dropdown.Item onClick={() => { updateNeighbourAndPage(2) }} as="button">2</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
        </Fragment>
    )};

Limit.propTypes = {
    updateLimit: PropTypes.func.isRequired,
    updateNeighbour: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    neighbour: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  }

const mapStateToProps = (state) => ({
    limit: state.display.limit,
    neighbour: state.display.neighbour
  });

export default connect(
    mapStateToProps,
    {updateLimit, updateNeighbour, getPage}
)(Limit);