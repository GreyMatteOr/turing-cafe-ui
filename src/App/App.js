import React, { Component } from 'react';
import ResoForm from '../ResoForm/ResoForm.js';
import './App.css';
import reqs from '../api-reqs.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resos: [],
      isLoading: true,
      fetchError: false,
      reqError: false
    };
  }

  componentDidMount() {
    this.getResos();
  }

  getResos = () => {
    reqs.getResos()
    .then(data => {
      if (data === 'error') this.setState({reqError: true, isLoading: false});
      else this.setState({resos: data, isLoading: false})
    }).catch( () => this.setState({fetchError: true, isLoading: false}));
  }

  makeResos() {
    this.state.resos.sort((a, b) => {
      let [aMonth, aDay] = a.date.split('/');
      let [bMonth, bDay] = b.date.split('/');
      return +aMonth - +bMonth || +aDay - +bDay;
    });
    return this.state.resos.map(reso => this.createResoHTML(reso))
  }

  createResoHTML(reso) {

    return (
      <div className='reservation' key={reso.id} data-testid='Reservation'>
        <h3 className='reso-name'>Reservation Name: {reso.name}</h3>
        <h4 className='reso-time'>On: {`${reso.date} at ${reso.time}`}</h4>
        <h4 className='party-size'>Number in Party: {reso.number}</h4>
      </div>
    )
  }

  render() {
    let isOk = !this.state.isloading && !this.state.fetchError && !this.state.request;
    let resoDisplay;
    if (this.state.isLoading) resoDisplay = <h3>Loading Reservations...</h3>;
    else if (isOk) resoDisplay = this.makeResos();
    else if (this.state.reqError) {
      resoDisplay = <h3>Oops! Something is wrong with your request. Check your information and try again.</h3>
    } else {
      resoDisplay = <h3>Oops! Something went wrong... refresh the page and try again later.</h3>
    }

    return (
      <div className="App">
        <h1 className='app-title'>Turing Cafe Reservations</h1>
        <ResoForm getResos={this.getResos}/>
        <div className='resy-container'>
          {resoDisplay}
        </div>
      </div>
    )
  }
}

export default App;
