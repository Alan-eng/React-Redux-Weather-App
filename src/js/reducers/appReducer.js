import { ADDCITY,ADDCITYERROR,CLEARALL, CURRENTCITY,REMOVECITY, FETCHING } from './../appActions'
import {addCityToLocalStorage, removeCityFromLocalStorage} from './../toLocalStorage'
import {html5geolocation} from './../html5geolocation'


export const appReducer = (state = {
    isLoading: false,
    cities: localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [],
    message: '',
 }
, action) => {

    console.log(action)



    switch (action.type) {

        case FETCHING:
            return {
                isLoading: true,
                cities: [...state.cities],
                message: '',
            }


        case ADDCITY: 
        addCityToLocalStorage (action.city)
            const { cities } = state;
            var isOnTheList = false;
            for (var i = 0; i < cities.length; i++) {
                if (action.city.name.toLocaleLowerCase() === cities[i].name.toLocaleLowerCase()) {
                    isOnTheList = true;
                    break;
                }
            }
            if (isOnTheList ) { // проверяем находится ли наш город в списке
                return {
                    isLoading: false,
                    cities: [...state.cities],
                    message: 'This city is already on the list',
                }
            } else {
                return {
                    isLoading: false,
                    cities: [...state.cities, action.city], 
                    message: '',
                }
            } 
            
            case ADDCITYERROR:
            return {
                isLoading: false,
                cities: [...state.cities],
                message: action.message ,
            }



        case REMOVECITY:
        const newCities = state.cities.filter((element) => { return element.name !== action.cityName })
        localStorage.setItem('cities', JSON.stringify(newCities))

            return {
                cities: newCities,
                message:'' ,
            }

        case CLEARALL:
        localStorage.removeItem('cities')
            return {
                isLoading: false,
                cities: [],
                message: ''
            }

        default:
            return state
    }
  }
