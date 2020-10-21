import '@testing-library/jest-dom';
import App from './App.js';
import { screen, render, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import reqs from '../api-reqs.js';

jest.mock('../api-reqs.js');
reqs.deleteReso.mockResolvedValue({});
reqs.getResos.mockResolvedValue(
  [
    {
      name: "Debugora",
      date: "10/22",
      time: "12:00",
      number: 1,
      id: 1
    },
    {
      name: "Debug2",
      date: "10/23",
      time: "13:00",
      number: 2
    }
  ]
)

describe( 'App', () => {

  it( 'should display a Logo, a ResoForm, and a loading message to start', () =>{

    render(<App />);

    expect(screen.getByText('Turing Cafe Reservations')).toBeInTheDocument();
    expect(screen.getByTestId('ResoForm')).toBeInTheDocument();
    expect(screen.getByText('Loading Reservations...')).toBeInTheDocument();
  });

  it( 'should show a `reservationHTML` for each reservation after loading', async () => {

    render(<App />);

    await waitFor(() => screen.queryByText('Loading Reservations...') === null);

    expect(reqs.getResos).toHaveBeenCalled();
    expect(screen.getAllByTestId('Reservation').length).toEqual(2);
  });

  it( 'should be able to delete reservations', async () => {
    render(<App />);

    await waitFor(() => screen.queryByText('Loading Reservations...') === null);

    expect(screen.getAllByTestId('Reservation').length).toEqual(2);

    let deleteButtons = screen.getAllByText('Delete');
    userEvent.click(deleteButtons[0]);

    await waitFor(() => screen.queryByText('Reservation Name: Debugora') === null);

    expect(reqs.deleteReso).toHaveBeenCalledWith(1);
  });
});
