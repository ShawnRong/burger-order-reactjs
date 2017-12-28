import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import bugerBuilderReducer from './store/reducers/burgerBuilder'
import './css/index.css'

// const reducer = combineReducers({
//   bugerBuilderReducer
// })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  bugerBuilderReducer,
  composeEnhancers(applyMiddleware(thunk))
)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('app'))