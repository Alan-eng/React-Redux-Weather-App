export const addCityToLocalStorage = (value) => {
    let isInLocalStorage = false;
    const existingCitites = JSON.parse(localStorage.getItem('cities')) || new Array() //массив или null
    for (let i = 0; i < existingCitites.length; i++) {
        if (value.name === existingCitites[i].name) {
            isInLocalStorage = true;
            break;
        }
    }

    if (!isInLocalStorage) {
        let newCities = [...existingCitites, value]
        localStorage.setItem('cities', JSON.stringify(newCities))
        localStorage.setItem('citiesDate', Date.now())
    }
}

export const removeCityFromLocalStorage = (value) => {
    const existingCitites = JSON.parse(localStorage.getItem('cities')) || new Array() //массив или null
    const newCities = existingCitites.filter((element) => { return element.name !== value.name })
    localStorage.setItem('cities', JSON.stringify(newCities))
    localStorage.setItem('citiesDate', Date.now())
}
