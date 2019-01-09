import { combineReducers } from 'redux';

const INITIAL_STATE = {
  text: null
};

const raceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_RACER_TEXT" :
        const text = action.payload;
        const newState = {text};
        return newState;
    default:
        return state
  }
};

export default combineReducers({
  racer: raceReducer,
});