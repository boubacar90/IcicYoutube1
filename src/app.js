import React, { Component } from 'react';
import { View, Platform, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from './reducers';
import Router from './Router';
import { Text } from 'react-native';

class App extends Component {
  componentWillMount() {

  }
  render() {
    const store = createStore(
      reducers,
      {},
      compose(
        autoRehydrate(),
        applyMiddleware(ReduxThunk)
      )
    )
    persistStore(store, {storage: AsyncStorage}).purge()

    return(
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

const customTextProps = {
  style: {
    fontSize: 30,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
    color: 'black'
  }
};

export default App;
