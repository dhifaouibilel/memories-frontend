import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
// import moment from 'moment';


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        post: null,
        loading: false,
        lastFetch: null,
        currentPage:1,
    },
    reducers: {
        postsRecieved: (posts, action) => {
            posts.list = action.payload.data;
            posts.currentPage = action.payload.currentPage;
            posts.numberOfPages = action.payload.numberOfPages;
            posts.loading = false;
            posts.lastFetch = Date.now();
        },
        postsRequested: (posts, action) => {
            posts.loading = true;
        },
        postsRequestFailed: (posts, action) => {
            posts.loading = false;
        },
        postRecieved: (posts, action) => {
            posts.post = action.payload;
            posts.loading = false;
        },
        postAdded: (posts, action) => {
            posts.list.push(action.payload);
        },
        postRemoved: (posts, action) => {
            return {...posts, list: posts.list.filter(mem => mem._id !== action.payload._id)}
        },
        postUpdated: (posts, action) => {
            return {...posts, list: posts.list.map(mem => mem._id === action.payload._id? mem=action.payload: mem)};
        },
    },
})

const {postRecieved, postsRecieved, postsRequested, postsRequestFailed, postAdded, postRemoved, postUpdated} = postsSlice.actions
export default postsSlice.reducer

const url = '/posts';

export const getPost = (id) => apiCallBegan({
    url: `${url}/${id}`,
    onSuccess: postRecieved.type,
    onStart: postsRequested.type,
    onError: postsRequestFailed.type,
})

export const getPosts = (page) => (dispatch, getState) =>{
    // console.log(getState().posts, ' last fetch');
    // const {lastFetch} = getState().posts;
    
    // const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    // if (diffInMinutes < 10) return;

    return dispatch(
        apiCallBegan({
            url: `${url}?page=${page}`,
            onSuccess: postsRecieved.type,
            onStart: postsRequested.type,
            onError: postsRequestFailed.type,
        })
    )
}

export const getPostsBySearch = (searchQuery) => apiCallBegan({
    url: `${url}/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`,
    onSuccess: postsRecieved.type,
    onStart: postsRequested.type,
    onError: postsRequestFailed.type,
})

export const getPostsByCreator = (creatorId) => apiCallBegan({
    url: `${url}/creators/${creatorId}`,
    onSuccess: postsRecieved.type,
    onStart: postsRequested.type,
    onError: postsRequestFailed.type,
})

export const addPost = (post) => apiCallBegan({
    url,
    method: 'post',
    data: post,
    onSuccess: postAdded.type,
})

export const updatePost = (post) => apiCallBegan({
    url: `${url}/${post._id}`,
    method: 'PATCH',
    data: post,
    onSuccess: postUpdated.type,
})

export const likePost = (id) => apiCallBegan({
    url: `${url}/${id}/likePost`,
    method: 'PATCH',
    onSuccess: postUpdated.type,
})

export const deletePost = (id) => apiCallBegan({
    url: `${url}/${id}`,
    method: 'DELETE',
    onSuccess: postRemoved.type,
})

export const addComment = (postId, comment) => apiCallBegan({
    url: `${url}/${postId}/comments`,
    method: 'PATCH',
    data: comment,
    onSuccess: postUpdated.type,
})

export const likeComment = (postId, commentId) => apiCallBegan({
    url: `${url}/${postId}/comments/${commentId}`,
    method: 'PATCH',
    onSuccess: postUpdated.type,
})

export const removeComment = (postId, commentId) => apiCallBegan({
    url: `${url}/${postId}/comments/${commentId}`,
    method: 'DELETE',
    onSuccess: postUpdated.type,
})