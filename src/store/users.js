import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { login } from './auth';
import moment from 'moment';


const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        usersRecieved: (users, action) => {
            users.list = action.payload;
            users.loading = false;
            users.lastFetch = Date.now();
        },
        usersRequested: (users, action) => {
            users.loading = true;
        },
        usersRequestFailed: (users, action) => {
            users.loading = false;
        },
        userFollowed: (users, action) => {
            users.list.map(user => user._id===action.payload.userToFollow._id? action.payload.userToFollow: user._id===action.payload.currentUser._id? action.payload.currentUser: user)
        },
        notificationMarkedAsViewed: (users, action) => {
            users.list.map(user => user._id===action.payload.updatedUser._id? action.payload.updatedUser: user)
        }
    },
})

const {usersRecieved, usersRequested, usersRequestFailed, userFollowed, notificationMarkedAsViewed} = usersSlice.actions
export default usersSlice.reducer

const url = '/users';

export const getUsers = () => (dispatch, getState) =>{

    // console.log(getState().users, ' last fetch');
    // const {lastFetch} = getState().users;
    
    // const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    // if (diffInMinutes < 10) return;

    return dispatch(
        apiCallBegan({
        url,
        onSuccess: usersRecieved.type,
        onStart: usersRequested.type,
        onError: usersRequestFailed.type,
        })
    )
}

export const updateUser = (user, userId) => apiCallBegan({
    url: `${url}/${userId}`,
    method: 'PATCH',
    data: user,
    onSuccess: login.type,
})

export const followUser = (userId) => apiCallBegan({
    url: `${url}/follow/${userId}`,
    method: 'PATCH',
    onSuccess: userFollowed.type,
})

export const markNotificationAsViewed = (notifId) => apiCallBegan({
    url: `${url}/notif/${notifId}`,
    method: 'PATCH',
    onSuccess: notificationMarkedAsViewed.type,
})