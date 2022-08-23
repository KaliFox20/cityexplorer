import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      cityLat: 0,
      cityLon: 0,
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

 try{
  let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

  let cityData = await axios.get(url);

  this.setState({
    cityLat: cityData.data[0].lat,
    cityLon: cityData.data[0].lon,
  })


  console.log(cityData.data[0]);
 } catch(error){
  this.setState({
    errorMessage: error.message
  })
 }
}

render (){
  return (
    <div>
      <h1>City Explorer</h1>
      <form onSubmit={this.getCityData}>
        <label> Select of City
          <input type="text" onInput ={this.handleInput} />
        </label>
    <button type='submit'>Explore!</button>
      </form>
    </div>
  )
}

