import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Weather from './Weather.js';
import Movies from './Movies.js';

import './App.css';

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
      showWeatherData: false,
      movieData: [],
      showMovieData: false
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

    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`
      })
    }
    this.getWeatherInfo();
    this.getMoviesInfo();

  }

  getWeatherInfo = async () => {

    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${Math.round(this.state.cityData.lat)}&lon=${Math.round(this.state.cityData.lon)}`;
      let weatherResults = await axios.get(url);
      this.setState({
        weatherData: weatherResults.data,
        showWeatherData: true,
        renderError: false
      })
    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`
      })
    }

  }

  getMoviesInfo = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/movies?&location=${this.state.searchQuery}`;
      let movieResults = await axios.get(url);
      this.setState({
        movieData: movieResults.data,
        showMovieData: true,
        renderError: false
      })
    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`
      })
    }

  }

  render() {
    return (
      <>
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

          {this.state.renderError && <p>{this.state.errorMessage}</p>}
          {
            this.state.showMapandCityInfo &&
            <article id='map'>

              <Card border="dark" style={{ width: '60%' }} className="mapImg">
                <Card.Img variant='top'
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11`}
                  alt='mapImage' />
                <Card.Body>
                  <h1>{this.state.cityData.display_name}</h1>
                  <p>Lat: {this.state.cityData.lat}</p>
                  <p>Lon:{this.state.cityData.lon}</p>
                </Card.Body>
                <Card.Footer>
                  <p>LocationIQ API &copy;hjallow </p>
                </Card.Footer>

              </Card>
              <Weather
                getWeatherInfo={this.getWeatherInfo}
                weatherData={this.state.weatherData}
                showWeatherData={this.state.showWeatherData}

              />
              <Movies
                cityData={this.state.cityData}
                movieData={this.state.movieData}
                showMovieData={this.state.showMovieData}
                getMovieInfo={this.getMoviesInfo}
              />
            </article>}
        </main>
      </>
    );
  }
}
export default App;

