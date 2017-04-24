const MapTimeReducer = (state = {
	isFetching: false,
	checkIns: null
}, action) => {
	if (action.type === 'REQUEST_MAPTIME') {
		return Object.assign({}, state, {
			isFetching: true,
		});
	} else if (action.type === 'RECEIVE_MAPTIME') {
		return Object.assign({}, state, {
			isFetching: false,
			checkIns: action.payload
		});
	} else {
		return state;
	}
};

export default MapTimeReducer;
