import { CURRENTCITY } from './../appActions'

export const geolocationReducer = (state = {
    currentCity: {
         "coord": {
            "lon": 25.67,
            "lat": 60.39
            },
            "weather": [
            {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
            }
            ],
            "base": "stations",
            "main": {
            "temp": 14,
            "pressure": 1027,
            "humidity": 76,
            "temp_min": 14,
            "temp_max": 14
            },
            "visibility": 10000,
            "wind": {
            "speed": 5.7,
            "deg": 60
            },
            "clouds": {
            "all": 75
            },
            "dt": 1506000000,
            "sys": {
            "type": 1,
            "id": 5019,
            "message": 0.0025,
            "country": "FI",
            "sunrise": 1505966430,
            "sunset": 1506010705
            },
            "id": 660561,
            "name": undefined,
            "cod": 200
            
    }
}, action) => {
    if (action.type === CURRENTCITY) {
        return {
            currentCity:action.currentCity,
        }
    } else {
        return state
    }
    // return state
}