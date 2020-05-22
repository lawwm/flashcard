import axios from 'axios';
import { setAlert } from "./alert";
import {
    GET_PAGE,
    PAGINATE_ERROR,
    UPDATE_LIMIT,
    UPDATE_NEIGHBOUR,
    CREATE_DECK,
    CREATE_DECK_FAIL,
    GET_USER_PAGE
} from "./types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {//range helper function
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
  };

function fetchPageNumbers(newPage, pageNeighbours, totalPages) {//return an array model for the pagination
    const totalNumbers = pageNeighbours * 2 + 3; //total numbers in the box
    const totalBlocks = totalNumbers + 2; //total amount of box
    //console.log(newPage);
    if (totalPages > totalBlocks) {
      let pages = [];
      const leftBound = newPage - pageNeighbours; //left end of number block
      const rightBound = newPage + pageNeighbours; //right end of number block
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2; //
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage); //{ 4 5 6 7 8 }
      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1; //if 5, then spilloffset is 1? might be 1 either way

      const leftSpill = startPage > 2; //true if start page more than 2
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
}

//Get page
export const getPage = (nowPage, pageLimit, pageNeighbours) => async dispatch => {

    try {
        const res = await axios.get(`/api/deck?page=${nowPage}&limit=${pageLimit}`);
        const currentDecks = res.data.results;
        const totalRecords = res.data.totalRecords;
        const currentPage = nowPage;
        const totalPages = Math.ceil(totalRecords / pageLimit);
        const pageArray = fetchPageNumbers(currentPage, pageNeighbours, totalPages);
        const payload = {
            currentDecks,
            currentPage,
            totalPages,
            totalRecords,
            pageArray
        }
        dispatch({
            type: GET_PAGE,
            payload: payload
        })
    } catch (err) {
        dispatch({
            type: PAGINATE_ERROR,
            payload: err
        });
    }
}

//update limit
export const updateLimit = (num) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_LIMIT,
      payload: num
    })
  } catch(err) {
    dispatch({
      type: PAGINATE_ERROR,
      payload: err
    });
  }
}

//update neighbour
export const updateNeighbour = (num) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_NEIGHBOUR,
      payload: num
    })
  } catch(err) {
    dispatch({
      type: PAGINATE_ERROR,
      payload: err
    });
  }
}

//Create deck
export const createDeck = (deck) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    };

    const res = await axios.post('/api/deck', deck, config);
    console.log(res.data);
    dispatch({
      type: CREATE_DECK,
      payload: res.data
    })

    dispatch(setAlert("Deck created", 'success'));

  } catch(err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CREATE_DECK_FAIL,
      payload: errors
    })
  }
}

//Get user's deck
export const getUserPage = (nowPage, pageLimit, pageNeighbours, userID) => async dispatch => {

  try {
      const res = await axios.get(`/api/deck/user/${userID}?page=${nowPage}&limit=${pageLimit}`);
      const currentDecks = res.data.decks;
      const totalRecords = res.data.totalRecords;
      const currentPage = nowPage;
      const totalPages = Math.ceil(totalRecords / pageLimit);
      const pageArray = fetchPageNumbers(currentPage, pageNeighbours, totalPages);
      const payload = {
          currentDecks,
          currentPage,
          totalPages,
          totalRecords,
          pageArray
      }
      dispatch({
          type: GET_USER_PAGE,
          payload: payload
      })
  } catch (err) {
      dispatch({
          type: PAGINATE_ERROR,
          payload: err
      });
  }
}