import React, {useState, useEffect, useReducer, Fragment} from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import {initialState, ITEM_COUNT_PER_PAGE, FIRST_PAGE, LAST_PAGE, PREVIOUS, NEXT, ACTIONS} from './constants';
import {getUserList} from './action';
import {reducer} from './reducer';
import {isNextButtonDisabled, isPrevButtonDisabled, getStartIndex} from './utils';
import { GlobalLayout, StyledTable, StyledHeader, StyledTD, StyledDiv, StyledButton, StyledFooterDiv, StyledActionDiv, StyledEditDiv, StyledTextbox, StyledRow, StyledSave,
					SearchText, SearchDiv} from './styles.js';
import  Pagination from './components/Pagination';
import './styles.css';

const AdminUI = () => {
	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [headerChkBoxChecked, setHeaderChkBoxChecked] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [state, dispatch] = useReducer(reducer, initialState);
	const {userList = []} = state;
	let nextDisabled = isNextButtonDisabled(currentPage, totalPages);
	let prevDisabled = isPrevButtonDisabled(currentPage, totalPages);

	const getUpdatedList = (page) => {
		switch(page) {
			case FIRST_PAGE: {
				setUsers(userList.slice(0, ITEM_COUNT_PER_PAGE));
				setCurrentPage(1);
				return;
			}
			case LAST_PAGE: {
				const startIdx = getStartIndex(ITEM_COUNT_PER_PAGE, totalPages);
				setUsers(userList.slice(startIdx, (startIdx + ITEM_COUNT_PER_PAGE)));
				setCurrentPage(totalPages);
				return;
			}
			case PREVIOUS: {
				const startIdx = getStartIndex(ITEM_COUNT_PER_PAGE, currentPage-1);
				setUsers(userList.slice(startIdx, (startIdx + ITEM_COUNT_PER_PAGE)));
				setCurrentPage(currentPage - 1);
				return;
			}
			case NEXT: {
				const startIdx = getStartIndex(ITEM_COUNT_PER_PAGE, currentPage + 1);
				setUsers(userList.slice(startIdx, (startIdx + ITEM_COUNT_PER_PAGE)));
				setCurrentPage(currentPage + 1);
				return;
			}
			default: {
				const startIdx = getStartIndex(ITEM_COUNT_PER_PAGE, page);
				setUsers(userList.slice(startIdx, (startIdx + ITEM_COUNT_PER_PAGE)));
				setCurrentPage(parseInt(page, 10));
				return;
			}
		}
	};

	const getSelectedUsers = (evt) => {
		const selectedUserIdx = userList.findIndex(user => user.id === evt.target.id);
		const selectedUser = userList.find(user => user.id === evt.target.id);
		if (evt.target.checked) {
			selectedUser.checked = true;
			userList.splice(selectedUserIdx, 1, selectedUser);
			setSelectedUsers([...selectedUsers, selectedUser])
		} else {
			const updatedSelectedUsers = selectedUsers.filter(user => user.id !== evt.target.id);
			selectedUser.checked = false;
			userList.splice(selectedUserIdx, 1, selectedUser);
			setSelectedUsers(updatedSelectedUsers);
		}
	};

	const deleteSelectedUsers = () => {
		const clonedUserList = _.cloneDeep(userList);
		selectedUsers.forEach(selUser => {
			const toBeDeletedUserIdx = clonedUserList.findIndex(user=> user.id === selUser.id);
			if (toBeDeletedUserIdx > -1) {
				clonedUserList.splice(toBeDeletedUserIdx, 1);
			}
		});
		dispatch({
				type: ACTIONS.UPDATE_USERLIST,
				payload: clonedUserList
		});
		setSelectedUsers([]);
	};

	const onEditUser = (evt) => {
		const clonedUserList = _.cloneDeep(userList);
		const toEditUser = clonedUserList.find(user=> user.id === evt.currentTarget.id);
		const toEditUserIdx = clonedUserList.findIndex(user=> user.id === evt.currentTarget.id);
		toEditUser.editable = toEditUser.editable ? false : true;
		toEditUser.edited = undefined;
		toEditUser.editedName = toEditUser.name;
		toEditUser.editedMail = toEditUser.email;
		toEditUser.editedRole = toEditUser.role;
		clonedUserList.splice(toEditUserIdx, 1, toEditUser);
		dispatch({
			type: ACTIONS.UPDATE_USERLIST,
			payload: clonedUserList
		});
	};

	const onDeleteUser = (evt) => {
		const clonedUserList = _.cloneDeep(userList);
		const updateSelectedUser = selectedUsers.filter(user => user.id !== evt.currentTarget.id);
		const toDeleteUser = clonedUserList.findIndex(user => user.id === evt.currentTarget.id);
		setSelectedUsers(updateSelectedUser);
		if (toDeleteUser > -1) {
			clonedUserList.splice(toDeleteUser, 1);
		}
		dispatch({
			type: ACTIONS.UPDATE_USERLIST,
			payload: clonedUserList
		});
	};

	const selectAllUsers = (evt) => {
		users.forEach(user => {
			const selectedUserIdx = userList.findIndex(listUser => listUser.id === user.id);
			if (evt.target.checked) {
				user.checked = true;
				userList.splice(selectedUserIdx, 1, user);
			} else {
				user.checked = false;
				userList.splice(selectedUserIdx, 1, user);
			}
		});
		const updatedSelectedUsers = userList.filter(user => user.checked);
		setSelectedUsers(updatedSelectedUsers);
	};

	const changeUserValue = (evt) => {
		const clonedUserList = _.cloneDeep(userList);
		const changedUser = clonedUserList.find(listUser => listUser.id === evt.target.id);
		const changedUserIdx = clonedUserList.findIndex(listUser => listUser.id === evt.target.id);
		if (evt.target.name === "ROLE") {
			changedUser.editedRole = evt.target.value;
		} else if (evt.target.name === 'NAME') {
			changedUser.editedName = evt.target.value;
		} else if (evt.target.name === 'MAIL') {
			changedUser.editedMail = evt.target.value;
		}
		changedUser.edited = true;
		clonedUserList.splice(changedUserIdx, 1, changedUser);
		dispatch({
				type: ACTIONS.UPDATE_USERLIST,
				payload: clonedUserList
		});
	};

	const onSaveUser = (evt) => {
		const clonedUserList = _.cloneDeep(userList);
		const changedUser = clonedUserList.find(listUser => listUser.id === evt.currentTarget.id);
		const changedUserIdx = clonedUserList.findIndex(listUser => listUser.id === evt.currentTarget.id);
		changedUser.name = changedUser.editedName;
		changedUser.email = changedUser.editedMail;
		changedUser.role = changedUser.editedRole;
		changedUser.editable = undefined;
		changedUser.edited = undefined;
		clonedUserList.splice(changedUserIdx, 1, changedUser);
		dispatch({
				type: ACTIONS.UPDATE_USERLIST,
				payload: clonedUserList
		});
	};

	const searchUsers = (evt) => {
		const searchExp = evt.target ?evt.target.value : evt;
		setSearchText(searchExp);
		if (searchExp) {
			const searchedUsers = userList.filter(listUser => listUser.name.indexOf(searchExp) > -1 || listUser.email.indexOf(searchExp) > -1 || listUser.role.indexOf(searchExp) > -1);
			setUsers(searchedUsers);
			setCurrentPage(1);
			setTotalPages(searchedUsers.length > 0 ? Math.ceil(searchedUsers.length/ITEM_COUNT_PER_PAGE) : 1);
		} else {
			const startIdx = getStartIndex(ITEM_COUNT_PER_PAGE, currentPage);
			setUsers(userList.slice(startIdx, startIdx + ITEM_COUNT_PER_PAGE));
			setTotalPages(Math.ceil(userList.length/ITEM_COUNT_PER_PAGE));
			setCurrentPage(1);
		}
	};

	useEffect(() => {
		if (users.length > 0) {
			const checkedUsers = users.filter(user=> user.checked);
			setHeaderChkBoxChecked(checkedUsers.length === users.length);
		}  else {
			setHeaderChkBoxChecked(false);
		}
	},[users, selectedUsers]);

	useEffect(() => {
		getUserList({dispatch});
	}, []);

	useEffect(() => {
		if (userList && userList.length > 0) {
			if (!searchText) {
				const startIdx = getStartIndex(ITEM_COUNT_PER_PAGE, currentPage);
				if (startIdx > userList.length-1) {
					const newStartIdx = getStartIndex(ITEM_COUNT_PER_PAGE, 1);
					setUsers(userList.slice(newStartIdx, newStartIdx + ITEM_COUNT_PER_PAGE));
					setTotalPages(Math.ceil(userList.length/ITEM_COUNT_PER_PAGE));
					setCurrentPage(1);
				} else {
					setUsers(userList.slice(startIdx, startIdx + ITEM_COUNT_PER_PAGE));
					setTotalPages(Math.ceil(userList.length/ITEM_COUNT_PER_PAGE));
				}
			} else {
				searchUsers(searchText);
			}

		}
	}, [userList]);//eslint-disable-line

	return (
		<GlobalLayout>
			<Fragment>
				<StyledDiv>
					<SearchDiv>
						<SearchText type="text" id="seachUsers" onChange={searchUsers} placeholder="Search Users" value={searchText}/>
				</SearchDiv>
				<StyledTable>
					<thead>
						<tr>
							<StyledHeader>
								<label className="container header">
									<input type="checkbox" onClick={selectAllUsers} checked={headerChkBoxChecked}/>
									<span className="checkmark"></span>
								</label>
							</StyledHeader>
							<StyledHeader>Name</StyledHeader>
							<StyledHeader>Email</StyledHeader>
							<StyledHeader>Role</StyledHeader>
							<StyledHeader>Actions</StyledHeader>
						</tr>
					</thead>
					<tbody>
						{users.map(user=>
							<Fragment  key={user.id}>
								<tr>
									<StyledTD>
										<label className="container">
											<input type="checkbox" id={user.id} onClick={getSelectedUsers} checked={user.checked}/>
											<span className="checkmark"></span>
										</label>
									</StyledTD>
									<StyledTD>{user.name}</StyledTD>
									<StyledTD>{user.email}</StyledTD>
									<StyledTD>{user.role}</StyledTD>
									<StyledTD>
										<a href="#" onClick={onEditUser} id={user.id}><FontAwesomeIcon icon={faEdit} style={{ color: 'white' }}/></a>{/*eslint-disable-line*/}
										<StyledActionDiv/>
										<a href="#" onClick={onDeleteUser} id={user.id}><FontAwesomeIcon icon={faTrash} style={{ color: '#b30000' }} /></a>{/*eslint-disable-line*/}
									</StyledTD>
								</tr>
								{user.editable &&
									<StyledRow>
										<StyledTD></StyledTD>
										<StyledTD>
											<StyledEditDiv display={user.editable}>
												<div colspan="2">
													Name
												</div>
												<div colspan="2">
													<StyledTextbox type="textbox" id={user.id} value={user.editedName} name="NAME" onChange={changeUserValue} />
												</div>
											</StyledEditDiv>
										</StyledTD>
										<StyledTD>
											<StyledEditDiv>
												<div colspan="2">
													Email
												</div>
												<div colspan="2">
													<StyledTextbox type="textbox" id={user.id} value={user.editedMail} name="MAIL" onChange={changeUserValue} />
												</div>
											</StyledEditDiv>
										</StyledTD>
										<StyledTD>
											<StyledEditDiv>
												<div colspan="2">
													Role
												</div>
												<div colspan="2">
													<StyledTextbox type="textbox" id={user.id} value={user.editedRole} name="ROLE" onChange={changeUserValue} />
												</div>
											</StyledEditDiv>
										</StyledTD>
										<StyledTD>
											<StyledActionDiv padding="10px"/>
											<StyledSave disabled={!(user.edited && user.editedRole && user.editedName && user.editedMail)} onClick={onSaveUser} id={user.id}>Save</StyledSave>
										</StyledTD>
									</StyledRow>
								}
							</Fragment>
						)}
					</tbody>
				</StyledTable>
			</StyledDiv>
			<StyledFooterDiv>
				<StyledButton type="button" disabled={selectedUsers.length === 0} onClick={deleteSelectedUsers}>{`Delete Selected (${selectedUsers.length} Users)`}</StyledButton>
				<Pagination totalPages={totalPages} currentPage={currentPage} getUpdatedList={getUpdatedList} nextDisabled={nextDisabled} prevDisabled={prevDisabled}/>
			</StyledFooterDiv>
			</Fragment>
		</GlobalLayout>
	);
}
export default AdminUI;
