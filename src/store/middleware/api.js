import axios from 'axios';
import * as actions from '../api';

axios.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

// axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action)
    // API call then handle the resolved and reject cases for making api calls.
    const { url, method, data, onStart, onSuccess, onError } = action.payload;
    if (onStart) dispatch({type: onStart})
    next(action); // 
    try {
        // if(onSuccess&&(!onError)) dispatch({type: onSuccess, payload: data})
        const response = await axios.request({
            baseURL: 'http://localhost:5000/',
            url,
            method,
            data,
        });
        // General 
        dispatch(actions.apiCallSuccess(response.data))
        if(onSuccess) dispatch({type: onSuccess, payload: response.data})        // Specific
        return response.data;
    } catch (error) {
        // General 
        dispatch(actions.apiCallFailed(error.message))
        if(onError) dispatch({type: onError, payload: error.response.data})
    }
}

export default api