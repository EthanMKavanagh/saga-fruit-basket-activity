import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_FRUIT', fetchFruitSaga);
    yield takeEvery('CREATE_FRUIT', createFruitSaga);
    yield takeEvery('DELETE_FRUIT', deleteFruitSaga);
}

function* deleteFruitSaga(action) {
    yield axios({
        method: 'DELETE',
        url: `/fruit/${action.payload}`
    });

    yield put({
        type: 'FETCH_FRUIT'
    });
}

function* fetchFruitSaga(action) {
    let response = yield axios({
        method: 'GET',
        url: '/fruit'
    });

    yield put({
        type: 'SET_BASKET',
        payload: response.data
    });
}

function* createFruitSaga(action) {
    yield axios({
        method: 'POST',
        url: '/fruit',
        data: action.payload
    });

    yield put({
        type: 'FETCH_FRUIT'
    });
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// This function (our reducer) will be called when an 
// action is dipatched. state = ['Apple'] sets the default 
// value of the array.
const basketReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BASKET':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        basketReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
