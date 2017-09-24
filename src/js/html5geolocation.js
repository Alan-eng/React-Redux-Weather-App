
// var x = document.getElementById("demo");
// const latitude = position.coords.latitude
// const longitude = position.coords.longitude;

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

export const html5geolocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude
            const long = position.coords.longitude
            console.log('latitude = '+lat+', longitude = '+long);
            var api = 'https://api.openweathermap.org/data/2.5/weather?q='
            var city = `?lat=${ Math.round(lat * 1000000) / 1000000 }&lon=${Math.round(long * 1000000) / 1000000}`
            var units = '&units=metric'
            var apiKey = '&APPID=4af2ec0eecab8a1ae365d5630e2fb2c2'
            var url = api + city + apiKey + units;
            console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(parsedJSON => {
                    if (parsedJSON.cod == 200) {
                        console.log('your city is '+ parsedJSON.name);
                        return parsedJSON.name
                        // return parsedJSON
                    }
                    else {
                        return ''
                    }
                })

                .catch(error => console.log('parsing failed', error))
        });
    } else {
        /* geolocation IS NOT available */
    }
}

// return (dispatch) => {
//     return fetch(url)
//         .then(response => response.json())
//         .then(parsedJSON => {
//             if (parsedJSON.cod == 200) {
//                 dispatch({
//                     console.log('your city is '+ parsedJSON.name);
//                     return parsedJSON
//                 })
//             } else {
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