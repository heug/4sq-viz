const AccountReducer = (
	state = {
		isFetching: false,
		data: null;
	}, action
) => {
	if (action.type === 'REQUEST_ACCOUNT') {
		return Object.assign({}, state, {
			isFetching: true,
		});
	} else if (action.type === 'RECEIVE_ACCOUNT') {
		return Object.assign({}, state, {
			isFetching: false,
			data: action.payload
		});
	} else {
		return state;
	}
};

export default AccountReducer;
