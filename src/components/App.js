import React, { Component } from 'react';
import rootReducer from '../reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import DublinTransit from '../components/DublinTransit'

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <DublinTransit />
      </Provider>
    );
  }
};