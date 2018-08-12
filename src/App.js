import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'
import reducers from './reducers'
import Router from './Router'

class App extends Component {
  componentWillMount () {
    const config = {
      apiKey: 'AIzaSyBUssBEK5JZkSEWwm-DLfwk-eDho3fM6vQ',
      authDomain: 'pictionary-add99.firebaseapp.com',
      databaseURL: 'https://pictionary-add99.firebaseio.com',
      projectId: 'pictionary-add99',
      storageBucket: 'pictionary-add99.appspot.com',
      messagingSenderId: '1056790261509'
    }
    firebase.initializeApp(config)
  }
  render () {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    )
  }
}

export default App
