import React from "react";
import { Card, Col } from "react-bootstrap";


class MovieDay extends React.Component {

  render() {
    return (
    
      <Col>
      <Card border style={{ width: '70%' }}>
        <Card.Title>{this.props.movie.title} </Card.Title>
        <Card.Img
          src={this.props.movie.image_url}
          alt={this.props.movie.overview}>
        </Card.Img>
        <Card.Text>{this.props.movie.overview}</Card.Text>
      </Card>
      
      </Col>
    
    )
  }
}
export default MovieDay;
