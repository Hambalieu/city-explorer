import React from 'react';
import axios from 'axios';
import  {Card, ListGroup }from 'react-bootstrap/';
import './App.css';
import Weather from './Weather.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      showMapandCityInfo: false,
      cityData: {},
      renderError: false,
      errorMessage: '',
      weatherData: [],
      showWeatherData: false
    }
  }

  handleInput = e => this.setState({ searchQuery: e.target.value });


  getCityInfo = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;

      let cityResults = await axios.get(url);
      this.setState({
        cityData: cityResults.data[0],
        showMapandCityInfo: true
      })
      let serverUrl = `${process.env.REACT_APP_SERVER_URL}/weather?searchQuery=${this.state.searchQuery}`;
      let weatherResults = await axios.get(serverUrl);
      this.setState({
        weatherData: weatherResults.data,
        showWeatherData: true
      })

    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`
      })
    }
  };

  render() {
     let weatherToRender = this.state.weatherData.map((day, idx) => (
          <ListGroup.Item key={idx}>
          date: {day.date},High:{day.maxTemp},
          Low:{day.lowTemp},{day.description}
        </ListGroup.Item>
    ));
  
    return (
      <>
      <div>
        <header>
          <h1>City Explorer</h1>
        </header>

        <main>
          <form onSubmit={this.getCityInfo}>
            <label>Pick a City!
              <input type="text" onInput={this.handleInput} />
            </label>
            <button type="submit">Explore!</button>
          </form>

          {
            this.state.showMapandCityInfo &&
            <article>
              {this.state.renderError && <p>{this.state.errorMessage}</p>}

              <Card border="dark" style={{ width: '80%' }} className="mapImg">
                <Card.Img variant='top'
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11`}
                  alt='mapImage' />
                <Card.Body>
                  <h1>{this.state.cityData.display_name}</h1>
                  <p>Lat: {this.state.cityData.lat}, Lon:{this.state.cityData.lon}</p>
                </Card.Body>
                <Card.Footer>
                  <p>LocationIQ API &copy;hjallow </p>
                </Card.Footer>

              </Card>
            </article>}
          <div>
            {
              this.state.showWeatherData &&
              <ListGroup>
                {weatherToRender}
              </ListGroup>
            }
          </div>
        </main>
      </div> 
      </>
    );
  }
}
export default App;

