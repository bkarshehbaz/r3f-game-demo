/* eslint-disable */
import {
    SET_CURRENT_USER,
    USER_LOADING,
    GET_DIAMOND_AND_HEART,
    GET_ALL_USERS_SCORE,
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    diamonds: 0,
    hearts: 0,
    score: 0,
    allUsersScore: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_DIAMOND_AND_HEART:
            return {
                ...state,
                diamonds: action.payload.diamonds,
                hearts: action.payload.hearts,
                score: action.payload.score,
            };
        case GET_ALL_USERS_SCORE:
            return {
                ...state,
                allUsersScore: action.payload,
            };
        default:
            return state;
    }
}
