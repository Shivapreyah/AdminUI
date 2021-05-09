import {ACTIONS} from './constants';

export const getUserList = async({dispatch}) => {    
    const userList = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", {
      method: 'GET'
    })
    .then((data) => {
      return data.json();;
    });
    dispatch({type: ACTIONS.UPDATE_USERLIST, payload: userList});
};