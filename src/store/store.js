import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';
import api from './middleware/api';

export default function createStore (){
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api)
    });
}
