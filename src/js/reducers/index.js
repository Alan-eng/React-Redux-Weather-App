import { combineReducers } from 'redux';
import { appReducer } from './appReducer'
import { geolocationReducer } from './geolocation'

export default combineReducers ({ citiesTable: appReducer, currentCityCityCity: geolocationReducer })