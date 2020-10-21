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
        number: 1
      },
      postError: false,
      reqError: false,
      readyToSubmit: false,
      warningText: ''
    };
    this.updateResos = this.props.updateResos;
  }

  updateBody(bodyProp, value) {
    let resBody = this.state.resBody;
    resBody[bodyProp] = value;
    let hasName = resBody.name !== '';
    let isAfterToday = this.isAfterToday(resBody.date);
    let readyToSubmit = hasName && isAfterToday
    this.setState({resBody, readyToSubmit});
  }

  isAfterToday(date) {
    let [_, dateMonth, dateDay] = date.split('-');
    return (+dateMonth - 10 || +dateDay - 21) > 0
  }

  createReso = () => {
    let body = this.state.resBody;
    let [_, month, day] = body.date.split('-');
    body.date = `${month}/${day}`;
    reqs.postNewReso(body)
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
            warningText: 'Nice! We look forward to seeing you!',
            readyToSubmit: false
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
      <div data-testid='ResoForm'>
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
          data-testid='dateForNewReso'
        />
        <input
          type='time'
          min='12:00'
          max='22:00'
          step='900'
          className='newResoTime'
          value={this.state.resBody.time}
          onChange={event => this.updateBody('time', event.target.value)}
          data-testid='timeForNewReso'
        />
        <input
          type='number'
          min='1'
          max='30'
          className='newResoGuests'
          value={this.state.resBody.number}
          onChange={event => this.updateBody('number', event.target.value)}
          data-testid='numberInParty'
        />
        <button
          className='createReso'
          onClick={this.createReso}
          disabled={!this.state.readyToSubmit}
        >Create Reservation</button>
        <h3 className='warning' data-testid='warning'>{this.state.warningText}</h3>
      </div>
    )
  }
}

export default ResoForm;
