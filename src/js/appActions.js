
export const CURRENTCITY = 'html5geolocation'
export const ADDCITY = 'add_city'
export const ADDCITYERROR = 'add_city_error'

export const REMOVECITY = 'remove_city'
export const CLEARALL = 'clear_all'
export const FETCHING = 'fetching'

import { appStore } from './../index'
import { html5geolocation } from './html5geolocation'
// appStore.dispatch({ type: 'SHOW_NOTIFICATION', text: 'You logged in.' })
// setTimeout(() => {
//     appStore.dispatch({ type: CURRENTCITY, currentCity: html5geolocation() })
//   }, 1000)


export const currentCityActionCreator = () => {
    if ("geolocation" in navigator) {
        return (dispatch) => {

            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude
                const long = position.coords.longitude

                var api = 'https://api.openweathermap.org/data/2.5/weather?q='
                var city = `?lat=${Math.round(lat * 1000000) / 1000000}&lon=${Math.round(long * 1000000) / 1000000}`
                var units = '&units=metric'
                var apiKey = '&APPID=4af2ec0eecab8a1ae365d5630e2fb2c2'
                var url = api + city + apiKey + units;
                console.log(url)

                fetch(url)
                .then(response => response.json())
                .then(parsedJSON => {
                    if (parsedJSON.cod == 200) {
                       console.log(parsedJSON.clouds.all) 
                        dispatch({
                            type: CURRENTCITY,
                            currentCity: parsedJSON
                        })

                    }
                // в случае ошибки на сервере - экшенКриейтор ничего не передает в редьюсер
                })
            }, 
            function (error) { 
              if (error.code == error.PERMISSION_DENIED)
                //   console.log("you denied me :-(");
                  dispatch({
                      type: CURRENTCITY,
                      currentCity: {message:'You turned off html5 geolocation tracking on this page. Please turn it on and refresh the page.'}
                  })
            })
            // dispatch({
            //     type: CURRENTCITY,
            //     currentCity: {message:'You turned off html5 geolocation tracking on this page'}
            // })
        }
    }  else {  //  
        console.log('geolocation IS NOT available')
     } 
}

setTimeout(() => {
    appStore.dispatch(currentCityActionCreator())
}, 100)


//     console.log('latitude = ' + lat + ', longitude = ' + long);

// console.log(url)

// return (dispatch) => {

//     return fetch(url)
//         .then(response => response.json())
//         .then(parsedJSON => {
//             if (parsedJSON.cod == 200) {
//                 dispatch({
//                     type: CURRENTCITY,
//                     currentCity: parsedJSON
//                 }
//                     // console.log('your city is '+ parsedJSON.name);
//                     // return parsedJSON.name
//                     // return parsedJSON
//                 )
//             }
//             else {
//                 dispatch({
//                     type: ADDCITYERROR,
//                     city: '',
//                     message: 'There is no such city name. Please, enter another one. ',
//                     isLoading: false
//                 })
//             }
//         })

//         .catch(error => console.log('parsing failed', error))
// }
// }

// }






export const addCityActionCreator = (name) => { // это не обычный экшен-криейтор, а асинхронный (т.е. получает сам dispatch-экшен и в любой момент может вызвать dispatch снова )
    if (name !== undefined) {
        var api = 'https://api.openweathermap.org/data/2.5/weather?q='
        var city = name
        var units = '&units=metric'
        var apiKey = '&APPID=4af2ec0eecab8a1ae365d5630e2fb2c2'

        var url = api + city + apiKey + units;
        // console.log(url)
        return (dispatch) => {
            dispatch({
                type: FETCHING,
                isLoading: true
            })
            return fetch(url)
                .then(response => response.json())
                .then(parsedJSON => {
                    if (parsedJSON.cod == 200) {
                        dispatch({
                            type: ADDCITY,
                            city: parsedJSON,
                            isLoading: false,
                            message: ''
                        })
                    } else {
                        dispatch({
                            type: ADDCITYERROR,
                            city: '',
                            message: 'There is no such city name. Please, enter another one. ',
                            isLoading: false
                        })
                    }
                })
                .catch(error => console.log('parsing failed', error))
        }
    }
}

export const removeCityActionCreator = (name) => {
    return ({
        type: REMOVECITY,
        cityName: name
    })
}
export const clearAllActionCreator = (name) => {
    return ({
        type: CLEARALL
    })
}