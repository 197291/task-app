import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Main from 'Pages/Main';
import store from 'Common/store';

import './App.css';

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
