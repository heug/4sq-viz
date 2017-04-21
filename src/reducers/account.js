const AccountReducer = (state = {
	isFetching: false,
	account: null
}, action) => {
	if (action.type === 'REQUEST_ACCOUNT') {
		return Object.assign({}, state, {
			isFetching: true,
		});
	} else if (action.type === 'RECEIVE_ACCOUNT') {
		return Object.assign({}, state, {
			isFetching: false,
			account: action.payload
		});
	} else {
		return state;
	}
};

export default AccountReducer;
