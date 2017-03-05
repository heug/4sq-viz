import fetch from 'isomorphic-fetch';

const url = '/api/test';

export const requestAccount = () => {
	return {
		type: 'REQUEST_ACCOUNT'
	};
};

export const receiveAccount = (data) => {
	return {
		type: 'RECEIVE_ACCOUNT',
		payload: data
	};
};

export const getAccount = () => {
	return (dispatch) => {
		dispatch(requestAccount());
		return fetch(url)
		.then((res) => {
			if (res.status === 400) {
				throw new Error('Bad request');
			}
			return res.json();
		})
		.then((data) => {
			dispatch(receiveAccount(data))
		})
		.catch((err) => {
			console.log('Error fetching account', err);
		});
	};
};
