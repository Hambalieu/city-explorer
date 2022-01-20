import React from 'react'
import Card from 'react-bootstrap/Card'

class Weather extends React.Component {
  
  render() {
    return (
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Weather Forecast:</Card.Title>
            <Card.Text>
              <p>Day: {this.props.date}</p>
              <p>Forecast: {this.props.description}</p>
              <p>High of: {this.props.maxTemp}</p>
              <p>Low of: {this.props.lowTemp}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Weather;
