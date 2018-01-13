import { combineReducers } from 'redux';

// Reducers
import homeReducer from './reducers/home';

const rootReducer = combineReducers({
  home: homeReducer
});

export default rootReducer;
