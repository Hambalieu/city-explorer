import React from 'react';
import WeatherDay from "./WeatherDay";
import ListGroup from 'react-bootstrap/ListGroup';


class Weather extends React.Component {
  
  render() {

    let weatherToRender = this.props.weatherData.map((day, idx) =>
     <WeatherDay key={idx} day={day}/>
      )
    return (
      <article>
        {
          this.props.showWeatherData &&
          <ListGroup>
            {weatherToRender}
          </ListGroup>
        }
      </article>
    )

  }

}

export default Weather;
