import React from 'react';

import image from '../images/expand-vertical.svg';
import cloudy from '../images/animated/cloudy.svg';
import cloudyDay1 from '../images/animated/cloudy-day-1.svg';
import cloudyDay2 from '../images/animated/cloudy-day-2.svg';
import cloudyDay3 from '../images/animated/cloudy-day-3.svg';
import day from '../images/animated/day.svg';
import cloudyNight1 from '../images/animated/cloudy-night-1.svg';
import cloudyNight2 from '../images/animated/cloudy-night-2.svg';
import cloudyNight3 from '../images/animated/cloudy-night-3.svg';
import night from '../images/animated/night.svg';
import rainy2 from '../images/animated/rainy-2.svg';
import rainy3 from '../images/animated/rainy-3.svg';
import rainy4 from '../images/animated/rainy-4.svg';
import rainy5 from '../images/animated/rainy-5.svg';
import rainy6 from '../images/animated/rainy-6.svg';
import snowy4 from '../images/animated/snowy-4.svg';
import snowy5 from '../images/animated/snowy-5.svg';
import snowy6 from '../images/animated/snowy-6.svg';

import thunder from '../images/animated/thunder.svg';
// import Collapsible from './Collapsible';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addCityActionCreator, removeCityActionCreator, clearAllActionCreator, currentCityActionCreator} from './appActions'




class App extends React.Component {

    constructor(props) {
        super(props) // этот метод нам нужен, чтобы получить доступ к props
        this.state = {
            isExpanded: false, // стейт нам нужен, чтобы менять состояние компонента при клике на него (добавлять ему класс)
            // height: 50
        }
    }

    handleToggle(e) {
        e.preventDefault(); // т.к. если это ссылка мы не хотим прыгать на верх страницы
        // console.log(this.refs.inner.clientHeight)
        this.setState({
            isExpanded: !this.state.isExpanded,
            height: this.refs.inner.clientHeight //устанавливаем в state высоту полученную по ссылке ref от нашего элемента
        })
    }

    addCity(e) {
        e.preventDefault();
        const newCity = this.newCity.value;
        newCity !== '' && this.props.addCity(newCity) //вызываем функцию, которая диспатчит экшен, созданный нашим экшен-крейтором из переданного ему значения newCity
        this.addForm.reset()
    }

    dayOrNight() {

    }

    chooseIcon(cloudiness, sunriseUnix, sunsetUnix, raininess) {

        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var sunriseUTC = new Date(sunriseUnix * 1000);
        var sunsetUTC = new Date(sunsetUnix * 1000);
        // Hours part from the timestamp
        var sunriseUTChours = sunriseUTC.getHours();
        var sunsetUTChours = sunsetUTC.getHours();

        var currentUTChours = new Date().getUTCHours()

        // console.log('sunriseUTChours = ' + sunriseUTChours + ' ; sunsetUTChours = ' + sunsetUTChours + ' ; currentUTChours = ' + currentUTChours)
        // console.log(raininess)
        let isDay = () => {
            if (sunriseUTChours < currentUTChours && currentUTChours < sunsetUTChours) { return true }
            else return false
        }
        switch (raininess) {
            case 'shower rain':
                return <img src={rainy6} />
            case 'light intensity shower rain':
                return <img src={rainy5} />
            case 'moderate rain':
                return <img src={rainy2} />
            case 'light rain':
                return <img src={rainy4} />
            case 'light snow':
                return <img src={snowy4} />
            case 'light shower snow':
                return <img src={snowy5} />
        }
        if (isDay()) {
            if (cloudiness < 10) {
                return <img src={day} />
            }
            if (10 <= cloudiness && cloudiness < 30) {
                return <img src={cloudyDay1} />
            }
            if (30 <= cloudiness && cloudiness < 50) {
                return <img src={cloudyDay2} />
            }
            if (50 <= cloudiness && cloudiness < 70) {
                return <img src={cloudyDay3} />
            }
            if (cloudiness > 70) {
                return <img src={cloudy} />
            }
        } else {
            if (cloudiness < 10) {
                return <img src={night} />
            }
            if (10 <= cloudiness && cloudiness < 30) {
                return <img src={cloudyNight1} />
            }
            if (30 <= cloudiness && cloudiness < 50) {
                return <img src={cloudyNight2} />
            }
            if (50 <= cloudiness && cloudiness < 70) {
                return <img src={cloudyNight3} />
            }
            if (cloudiness > 70) {
                return <img src={cloudy} />
            }
        }




    }
    setMainIcon() {
        const iconArray = [thunder, snowy6, rainy2, cloudyNight3, rainy6]
        this.setState(() => ({
            mainIcon: iconArray[Math.floor(Math.random() * iconArray.length)]

        }))
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setMainIcon(), 2000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { isLoading, cities, message, currentCity } = this.props;
        return (
            <div>
                <header style={{ margin: 0 }}>
                    <h1 style={{ margin: 0 }}>React-Redux Weather App</h1>
                </header>

                <form ref={(e) => { this.addForm = e }} className="form-inline" onSubmit={(e) => { this.addCity(e) }}>
                    <img style={{ height: 300, margin: 0 }} src={this.state.mainIcon} />
                    <div style={{ display: "flex", marginBottom: 20 }}>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="newCityInput">Add City</label>
                            <input ref={(input) => { this.newCity = input }} type="text" placeholder="Moscow" className="form-control" id="newCityInput" />
                        </div>
                        <button type="submit" className="btn btn-info">Add City</button>
                    </div>
                </form>

                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    {currentCity.name !== undefined ? <p style={{ backgroundColor: '#F5F5F5', margin: 0, padding: 12 }} className='text-center'>
                       Your current html5 geolocation is: {this.chooseIcon(currentCity.clouds.all, currentCity.sys.sunrise, currentCity.sys.sunset, currentCity.weather[0].description)} {currentCity.name} <span style={{ color: '#bfbfbf', fontSize: '0.7' + 'em' }}>  [lat: {currentCity.coord.lat}, lon: {currentCity.coord.lon}]</span>
                        <br />
                        {/* Temperature from {currentCity.main.temp_min}°С to {currentCity.main.temp_max}°С, {currentCity.weather[0].description}, humidity {currentCity.main.humidity} % `} */}
                    </p> :
                    <p style={{ backgroundColor: '#F5F5F5', margin: 0, padding: 12 }} className='text-center'>
                       {currentCity.message} 
                       {/* <button onClick={() => this.props.html5geolocation()} type="button" className="btn btn-default btn-sm">Try again</button> */}
                        </p>
                    }

                    <div className="panel-group">
                        {cities.length !== 0 ? '' : <p style= {{margin: 10}} className="message text-danger">There is no city in your list, please add some</p>}
                        {message !== '' && <p style= {{margin: 10}} className="message text-danger">{message}</p>}
                        {
                            this.props.cities.length !== 0 &&
                            <table className="table table-hover  table-responsive">
                                <tbody>
                                    <tr>
                                        <th ></th>
                                        <th>City name</th>
                                        <th>temperature</th>
                                        <th>wind speed</th>
                                        <th>clouds</th>
                                        <th>pressure</th>
                                        <th></th>
                                    </tr>
                                </tbody >

                                {
                                    cities.length > 0 ? this.props.cities.map(everyCity => { // тут мы либо рендерим наш компонент либо нет
                                        var { isExpanded, height } = this.state;
                                        const currentHeight = isExpanded ? 70 : 0;
                                        const currentPadding = isExpanded ? 10 : 0;
                                        const { name, weather, wind, main, clouds, sys, coord } = everyCity;
                                        return <tbody key={name} className={`panel ${this.state.isExpanded ? 'is-expanded' : ''} `}  >
                                            <tr className="panel-heading" >
                                                <td onClick={(e) => this.handleToggle(e)}>{this.chooseIcon(clouds.all, sys.sunrise, sys.sunset, weather[0].description)}</td>
                                                {/* <td>{weather[0].description}</td> */}
                                                <td onClick={(e) => this.handleToggle(e)}>{name}</td>
                                                <td onClick={(e) => this.handleToggle(e)}>{main.temp} °С</td>
                                                <td onClick={(e) => this.handleToggle(e)}>{wind.speed} m/s</td>
                                                <td onClick={(e) => this.handleToggle(e)}>{clouds.all} %</td>
                                                <td onClick={(e) => this.handleToggle(e)}>{main.pressure} hpa</td>
                                                <td className="text-right">
                                                    <button onClick={(e) => this.props.removeCity(name)} type="button" className="btn btn-default btn-sm">Remove</button>
                                                </td>
                                            </tr>
                                            <tr >
                                                <td style={{ height: 0 + 'px',padding: 0, margin: 0}}></td>
                                                <td colSpan="7" style={{ height: 0 + 'px',padding: 0, margin: 0}}>
                                                    <div className="panel-collapse" style={{ height: currentHeight + 'px', padding: currentPadding,  color: '#aaaaaa', fontSize: '0.9' + 'em' }} ref="inner" >
                                                        {/* <div ref="inner"> */}
                                                         Geo coords [lat: {coord.lat}, lon: {coord.lon}] <br />
                                                        Temperature from {main.temp_min}°С to {main.temp_max}°С, {weather[0].description}, humidity {main.humidity} %
                                                    {/* </div> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody >
                                    })
                                        : null
                                }

                                <tfoot>
                                    <tr>
                                        <td colSpan="7" className="text-right">
                                            <button onClick={(e) => this.props.clearAll()} className="btn btn-default btn-sm">Clear all</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        }
                    </div>
                    <div className="loader">
                        <div className="icon"></div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    isLoading: PropTypes.bool,
    cities: PropTypes.array,
    message: PropTypes.string,
}

const mapStateToProps = (state) => { // этот метод будет автоматически получать Store State
    return {
        cities: state.citiesTable.cities,
        message: state.citiesTable.message,
        isLoading: state.citiesTable.isLoading,

        currentCity: state.currentCityCityCity.currentCity,
    }
}

const mapDispatchToProps = (dispatch) => { // этот метод будет автоматически получать Store State
    return {
        addCity: name => dispatch(addCityActionCreator(name)),
        removeCity: name => dispatch(removeCityActionCreator(name)),
        clearAll: name => dispatch(clearAllActionCreator(name)),
        html5geolocation: name => dispatch(currentCityActionCreator(name)),
        
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App) // берет StoreState и инжектит связанные параметры в компонент App

export default AppContainer;