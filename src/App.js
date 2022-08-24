import React from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      cityLat: 0,
      cityLon: 0,
      showCityData: false,
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityData = await axios.get(url);

      this.setState({
        cityLat: cityData.data[0].lat,
        cityLon: cityData.data[0].lon,
        showCityData: true,
      })


      console.log(cityData.data[0]);
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        showCityData: false,
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>City Explorer</h1>
        <form onSubmit={this.getCityData}>
          <label> Select a City
            <input type="text" onInput={this.handleInput} />
          </label>
          <Button type='submit' onSubmit={e => this.getCityData(e)} >Explore!</Button>
        </form>
       {this.state.showCityData && <Card>
          <Card.Body>
            <Card.Text>
              <p>{this.state.cityLat}</p>
              <p> {this.state.cityLon}</p>
            </Card.Text>

          </Card.Body>

        </Card>}
      </div>
    )
  }
}

export default App;