//Pagination component
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Pagination from 'react-bootstrap/Pagination';
import { connect } from "react-redux";
import { getUserPage } from "../../../actions/display";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const Paginate = ({ getUserPage, currentPage, totalRecords, totalPages, pageArray, limit, neighbour, user_id }) => {

    const handleClick = (page, evt) => {//click shit method
      evt.preventDefault();
      getUserPage(page, limit, neighbour, user_id);
    };
  
    const handleMoveLeft = evt => {//move left method
      evt.preventDefault();
      getUserPage(currentPage - (1) * 2 - 1, limit, neighbour, user_id); //parenthesis is page neighbour return later
    };
  
    const handleMoveRight = evt => {//move right method
      evt.preventDefault();
      getUserPage(currentPage + (1) * 2 + 1, limit, neighbour, user_id);//parenthesis is page neighbour return later
    };
  
    return !totalRecords ? null : totalPages === 1 ? null : (
      <Fragment>
        <Pagination size="lg">
            {pageArray.map((page, index) => {
                if (page === LEFT_PAGE)
                return (
                  <Pagination.Prev 
                  className="page-set" 
                  key={index} 
                  onClick={handleMoveLeft} />
                );
  
              if (page === RIGHT_PAGE)
                return (
                  <Pagination.Next 
                  className="page-set" 
                  key={index} 
                  onClick={handleMoveRight} />
                );
  
              return ( //TODO active state for the button
                <Pagination.Item 
                  className="page-set" 
                  key={index} 
                  onClick={e => handleClick(page, e)}
                  active ={page==currentPage}	 
                >
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
    getUserPage: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    neighbour: PropTypes.number.isRequired,
    user_id: PropTypes.string.isRequired
  };
  
  const mapStateToProps = (state) => ({
      currentPage: state.display.currentPage,
      totalPages: state.display.totalPages,
      totalRecords: state.display.totalRecords,
      pageArray: state.display.pageArray,
      limit: state.display.limit,
      neighbour: state.display.neighbour,
      user_id: state.auth.user._id
  });

  export default connect(
    mapStateToProps,
    { getUserPage }
  )(Paginate);