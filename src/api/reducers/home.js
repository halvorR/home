/**
* HOME
*/

import axios from "../axios"
import store from "../store"
import errorHandler from "../error-handler.js"


// Action types
export const HOME_START = "HOME_START";
export const HOME_SUCCESS = "HOME_SUCCESS";
export const HOME_ERROR = "HOME_ERROR";



// Initial state
const initialState = {

  home: {
    hei: 'hei',
    hadet: 'hadet',
    loading: false,
    data: null,
    error: null
  }

};


// Reducer
export default (state = initialState, action) => {
    switch (action.type) {

        case HOME_START: {
            return {
                ...state,
                home: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        }
        case HOME_SUCCESS: {
            return {
                ...state,
                home: {
                    loading: false,
                    data: action.payload
                }
            };
        }
        case HOME_ERROR: {
            return {
                ...state,
                home: {
                    loading: false,
                    error: action.payload
                }
            };
        }

        default: return state;
    }
};





/**
 * Get list of poll types
 * @returns {Promise.<TResult>}
 */
export function getHome(){

    store.dispatch({
      type: HOME_START
    });

    return axios.get(`/posts`).then(response => {
        store.dispatch({
            type: HOME_SUCCESS,
            payload: response.data
        });
    }).catch(error => {
        errorHandler(error);
        store.dispatch({
            type: HOME_ERROR,
            payload: error.response ? error.response.data : error
        });
    })
}
