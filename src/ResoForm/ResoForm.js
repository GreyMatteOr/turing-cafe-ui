import React, { Component } from 'react';
import './ResoForm.css';
import reqs from '../api-reqs.js';

class ResoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resBody: {
        name: '',
        date: '2020-10-22',
        time: '12:00',
        number: 0
      },
      postError: false,
      reqError: false,
      readyToSubmit: false,
      warningText: ''
    };
    updateResos: this.props.getResos;
  }

  updateBody(bodyProp, value) {
    if(bodyProp === 'date') {
      let [year, month, day] = value.split('-');
      value = `${month}/${day}`;
    }
    let resBody = this.state.resBody;
    update[bodyProp] = value;
    let hasName = update.name !== '';
    let isAfterToday = this.isAfter(update.date);
    let readyToSubmit = hasName && isAfterToday
    this.setState({resBody, readyToSubmit});
  }

  isAfterToday(date) {
    let [dateMonth, dateDay] = date.date.split('/');
    return (+dateMonth - 10 || +dateDay - 22) > 0
  }

  createReso() {
    reqs.postNewReso(this.state.resBody)
    .then(data => {
      if (data === 'error') {
        return this.setState({warningText: 'Hmmm... something went wrong. Give us a call at +1 555-555-555, or refresh and try again.'})
      }
      else {
        this.setState(
          {
            resBody: {
              name: '',
              date: '2020-10-22',
              time: '12:00',
              number: 0
            },
            warningText: 'Nice! We look forward to seeing you!'
          }
        )
        this.updateResos();
      }
    })
    .catch( () => {
      return this.setState({warningText: 'Hmmm... something went wrong. Give us a call at +1 555-555-555, or refresh and try again.'})
    });
  }

  render() {
    return (
      <>
        <h3 className='newResoFormTitle'>Make a Reservation</h3>
        <input
          type='text'
          className='newResoName'
          value={this.state.resBody.name}
          onChange={event => this.updateBody('name', event.target.value)}
          placeholder='What is the name for the reservation?'
        />
        <input
          type='date'
          min='2020-01-01'
          max='2020-12-31'
          className='newResoDate'
          value={this.state.resBody.date}
          onChange={event => this.updateBody('date', event.target.value)}
          placeholder='What date would you like to stop in?'
        />
        <input
          type='time'
          min='12:00'
          max='22:00'
          step='900'
          className='newResoTime'
          value={this.state.resBody.time}
          onChange={event => this.updateBody('time', event.target.value)}
          placeholder='What time will you join us?'
        />
        <input
          type='number'
          min='0'
          max='30'
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
        <h3 className='warning'>{this.state.warningText}</h3>
      </>
    )
  }
}

export default ResoForm;
