//Pagination component
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import { connect } from "react-redux";
import { getPage } from "../../../actions/display";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const Paginate = ({ getPage, currentPage, totalRecords, totalPages, pageArray, limit, neighbour }) => {

    const handleClick = (page, evt) => {//click shit method
      evt.preventDefault();
      getPage(page, limit, neighbour);
    };
  
    const handleMoveLeft = evt => {//move left method
      evt.preventDefault();
      getPage(currentPage - (1) * 2 - 1, limit, neighbour); //parenthesis is page neighbour return later
    };
  
    const handleMoveRight = evt => {//move right method
      evt.preventDefault();
      getPage(currentPage + (1) * 2 + 1, limit, neighbour);//parenthesis is page neighbour return later
    };
  
    return !totalRecords ? null : totalPages === 1 ? null : (
      <Fragment>
        <Pagination size="lg">
            {pageArray.map((page, index) => {
                if (page === LEFT_PAGE)
                return (
                  <Pagination.Prev key={index} onClick={handleMoveLeft} />
                );
  
              if (page === RIGHT_PAGE)
                return (
                  <Pagination.Next key={index} onClick={handleMoveRight} />
                );
  
              return ( //TODO active state for the button
                <Pagination.Item key={index} onClick={e => handleClick(page, e)} >
                    {page}
                </Pagination.Item>
              );
            })} 
        </Pagination>
    </Fragment>
    );
  };
  
  Paginate.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired,
    pageArray: PropTypes.array.isRequired,
    getPage: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    neighbour: PropTypes.number.isRequired
  };
  
  const mapStateToProps = (state) => ({
      currentPage: state.display.currentPage,
      totalPages: state.display.totalPages,
      totalRecords: state.display.totalRecords,
      pageArray: state.display.pageArray,
      limit: state.display.limit,
      neighbour: state.display.neighbour
  });

  export default connect(
    mapStateToProps,
    { getPage }
  )(Paginate);