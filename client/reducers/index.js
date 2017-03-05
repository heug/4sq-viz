import { combineReducers } from 'redux';
import AccountReducer from './account'

const allReducers = combineReducers({
	account: AccountReducer
});

export default allReducers;
