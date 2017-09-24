import css from './scss/app.scss';
import { createStore, applyMiddleware } from 'redux'
// import appReducer from './js/appReducer'
import indexReducer from './js/reducers'
import { Provider } from 'react-redux' //компонент , который получает Store в качестве props и делает его незаметно доступным всем компонентам в нашемм App
import React from 'react';
import ReactDom from 'react-dom';
// import App from './js/App';
import AppContainer from './js/App';
import thunk from 'redux-thunk'

// import { ADDCITY,ADDCITYERROR,CLEARALL, CURRENTCITY,REMOVECITY, FETCHING } from './js/appActions'

export const appStore = createStore(indexReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

ReactDom.render(
    //Делает наш Store доступным всем компонентам приложения
    <Provider store={appStore}> 
        <AppContainer />
    </Provider>,
    document.getElementById('root'));