import { combineReducers } from 'redux';
import AccountReducer from './account';
import MapTimeReducer from './mapTime';

const allReducers = combineReducers({
	account: AccountReducer,
	mapTime: MapTimeReducer
});

export default allReducers;
