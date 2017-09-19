import React from 'react';
import image from '../images/expand-vertical.svg';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addCityActionCreator, removeCityActionCreator, clearAllActionCreator } from './appActions'



class App extends React.Component {

    addCity(e) {
        e.preventDefault();
        const newCity = this.newCity.value;
        newCity !== '' && this.props.addCity(newCity) //вызываем функцию, которая диспатчит экшен, созданный нашим экшен-крейтором из переданного ему значения newCity
        this.addForm.reset()
    }

    
    render() {
        const { isLoading, cities, message } = this.props;
        return (
            <div>
                <header>
                    <h1>React-Redux Weather App</h1>
                </header>

                <form ref={(e) => { this.addForm = e }} className="form-inline" onSubmit={(e) => { this.addCity(e) }}>
                <img src={image}/>

                    <div style={{ display: "flex", marginBottom: 20}}>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="newCityInput">Add City</label>
                            <input ref={(input) => { this.newCity = input }} type="text" placeholder="Moscow" className="form-control" id="newCityInput" />
                        </div>
                        <button type="submit" className="btn btn-info">Add City</button>
                    </div>
                </form>

                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    <div className="panel-group">
                        {cities.length !== 0 ? '' : <p className="message text-danger">There is no city in your list, please add some</p>}
                        {message !== '' && <p className="message text-danger">{message}</p>}
                        {
                            this.props.cities.length !== 0 &&
                            <table className="table table-hover">
                                {/*<caption>Cities list</caption>*/}
                                <tbody>
                                    <tr>
                                        <th>City name</th>
                                        <th>temperature</th>
                                        <th>wind speed</th>
                                        <th>clouds</th>
                                        <th>pressure</th>
                                        <th></th>
                                    </tr>
                                    {
                                        cities.length > 0 ? cities.map(everyCity => { // тут мы либо рендерим наш компонент либо нет
                                            const { name, weather, wind, main, clouds } = everyCity;
                                            return <tr key={name}>
                                                <td>{name}</td>
                                                <td>{main.temp} °С</td>
                                                <td>{wind.speed} m/s</td>
                                                <td>{clouds.all} %</td>
                                                <td>{main.pressure} hpa</td>
                                                <td className="text-right">
                                                    <button onClick={(e) => this.props.removeCity(name)} type="button" className="btn btn-default btn-sm">Remove</button>
                                                </td>
                                            </tr>
                                        })
                                            : null
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="6" className="text-right">
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

const mapStateToProps = (ololo) => { // этот метод будет автоматически получать Store State
    return {
        cities: ololo.cities,
        message: ololo.message,
        isLoading: ololo.isLoading
    }
}

const mapDispatchToProps = (dispatch) => { // этот метод будет автоматически получать Store State
    return{
        addCity: name => dispatch(addCityActionCreator(name)),
        removeCity: name => dispatch(removeCityActionCreator(name)),
        clearAll: name => dispatch(clearAllActionCreator(name))
    }
}

const AppContainer = connect (mapStateToProps, mapDispatchToProps)(App) // берет StoreState и инжектит связанные параметры в компонент App




// class AppContainer extends React.Component {
//     // componentWillMount(){ //используем лайф-сайкл метод, чтобы отправить первый экшен в наш стор, который инициализирует
//     //     appStore.dispatch({type: 'initial_state' })

//     // }

//     addCity (name) {
//         // appStore.dispatch({type: 'add_city', payload: {name: nmae}})
//         appStore.dispatch(addCityActionCreator(name))
//     }

//     removeCity (name) {
//         appStore.dispatch(removeCityActionCreator(name))
//     }


//     render() {
//         const storeState = appStore.getState();
//         return (
//             <App 
//             cities={storeState.cities} 
//             addCity={this.addCity}
//             removeCity={this.removeCity}
//             />
//         )
//     }
// }

export default AppContainer;