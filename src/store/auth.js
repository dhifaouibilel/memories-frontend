import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
const tokenKey ='profile'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        errorMessage: null,
        token: '',
        profile: {}
    },
    reducers: {
        login: (auth, action) => {
            localStorage.setItem(tokenKey, JSON.stringify({...action?.payload}))
            auth.token = action.payload.token;
            auth.profile = action.payload.result;
            auth.errorMessage = null;
        },
        logout: (auth, action) => {
            localStorage.removeItem(tokenKey)
            auth.token = null;
            auth.profile = {};
        },
        authFailure: (auth, action) => {
            auth.errorMessage = action.payload
        }
    },
})

export const {login, logout, authFailure} = authSlice.actions
export default authSlice.reducer

export const signin = (formData) => apiCallBegan({
    url: 'users/signin',
    method: 'POST',
    data: formData,
    onSuccess: login.type,
    onError: authFailure.type
})

export const signup = (formData) => apiCallBegan({
    url: 'users/signup',
    method: 'POST',
    data: formData,
    onSuccess: login.type,
    onError: authFailure.type
})

export const signupWithGoogle = (user) => apiCallBegan({
    url: 'users/signupWithGoogle',
    method: 'POST',
    data: user,
    onSuccess: login.type,
})
