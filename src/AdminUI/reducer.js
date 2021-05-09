import {ACTIONS} from './constants';

export const reducer = (state, action) => {
	switch(action.type) {
		case ACTIONS.UPDATE_USERLIST: 
			return {...state, userList: action.payload};
		default:
			return {...state};
	}
}