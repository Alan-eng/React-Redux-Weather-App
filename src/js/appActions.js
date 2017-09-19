export const ADDCITY = 'add_city'
export const ADDCITYERROR = 'add_city_error'

export const REMOVECITY = 'remove_city'
export const CLEARALL = 'clear_all'
export const FETCHING = 'fetching'


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