import React from 'react';
import axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityData: {}
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let city = e.target.city.value
    this.setState({
      searchQuery: e.target.city.value,
    });
    this.getCityInfo(city);
  }
  
  getCityInfo = async (city) => {
    try {let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${city}&format=json`;

    console.log(url);
    let cityResults = await axios.get(url);

    console.log(cityResults.data[0]);
    this.setState({
      cityData: cityResults.data[0]
    })} catch(error){
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
          <h1>App City Explorer</h1>
        </header>

        <main>
          <form onSubmit={this.handleSubmit}>
            <label>Pick a City!
              <input name="city" type="text" />
            </label>
            <button type="submit">Explore!</button>
          </form>
        </main>
      </>


    );


  }

}

export default App;

