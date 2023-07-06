import {combineReducers} from 'redux';
import postsReducer from './posts';
import authReducer from './auth';
import usersReducer from './users';

export default combineReducers({
    posts: postsReducer,
    auth: authReducer,
    users: usersReducer
})
