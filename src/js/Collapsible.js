import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {

    constructor(props) {
        super(props) // этот метод нам нужен, чтобы получить доступ к props
        this.state = {
            isExpanded: false // стейт нам нужен, чтобы менять состояние компонента при клике на него (добавлять ему класс)
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

    render() {
        const { cities } = this.props; //деконструирование переменных
        console.log(cities)
        var { isExpanded, height } = this.state;
        const currentHeight = isExpanded ? height : 0;
        // const { name, weather, wind, main, clouds, sys } = this.props;
        {
            cities.length > 0 ? cities.map(everyCity => { // тут мы либо рендерим наш компонент либо нет
                // const { name, weather, wind, main, clouds, sys } = everyCity;
                console.log('должна рендериться куча хуев')
                return <div>Куча хуев</div>
                
            })
            : null
        }
        

    }
}
//

Collapsible.PropTypes = {
    title: PropTypes.string
}

export default Collapsible;



// return   */}