import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import './css/global.css';
import AppContainer from './components/AppContainer/AppContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
);
