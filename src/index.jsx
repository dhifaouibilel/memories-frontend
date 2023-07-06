import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/store'
import { ThemeContextProvider } from './components/context/colorModeContext';
import {createRoot} from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CssBaseline from '@mui/material/CssBaseline';

import './index.css';
import App from './App';
const store = createStore();



const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ThemeContextProvider>
        <CssBaseline />
                <App />
        </ThemeContextProvider>
        </GoogleOAuthProvider>
    </Provider>
);


// import reducers from './reducers';
// const store = createStore(reducers, compose(applyMiddleware(thunk)))
// import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';