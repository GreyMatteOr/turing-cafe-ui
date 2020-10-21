import React, { Component } from 'react';
import './ResoForm.css';
import reqs from '../api-reqs.js';

class ResoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resBody: {
        name: '',
        date: '',
        time: '',
        number: 0
      },
      postError: false,
      reqError: false
    };
    update: this.props.getResos;
  }

  render() {
    return (
      <>
        <h3 className='newResoFormTitle'>Make a Reservation</h3>
        <input
          className='newResoName'
          value={this.state.resBody.name}
          onChange={event => this.updateBody('name', event.target.value)}
          placeholder='What is the name for the reservation?'
        />
        <input
          className='newResoDate'
          value={this.state.resBody.date}
          onChange={event => this.updateBody('date', event.target.value)}
          placeholder='What date would you like to stop in?'
        />
        <input
          className='newResoTime'
          value={this.state.resBody.time}
          onChange={event => this.updateBody('time', event.target.value)}
          placeholder='What time will you join us?'
        />
        <input
          className='newResoGuests'
          value={this.state.resBody.number}
          onChange={event => this.updateBody('number', event.target.value)}
          placeholder='How many people will be in your party?'
        />
        <button
          className='createReso'
          onClick={this.createReso}
          disabled={!this.state.readyToSubmit}
        >Create Reservation</button>
        <h3 className='warning'>{warningText}</h3>
      </>
    )
  }
}

export default ResoForm;
