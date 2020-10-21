import '@testing-library/jest-dom';
import ResoForm from './ResoForm.js';
import { screen, render, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import reqs from '../api-reqs.js';

jest.mock('../api-reqs.js');
reqs.postNewReso.mockResolvedValue({});

describe( 'ResoForm', () => {
  let mockUpdate = jest.fn();

  it( 'should display a new Reso Form', () =>{

    render(<ResoForm updateResos={mockUpdate}/>);

    expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What is the name for the reservation?')).toBeInTheDocument();
    expect(screen.getByTestId('dateForNewReso')).toBeInTheDocument();
    expect(screen.getByTestId('timeForNewReso')).toBeInTheDocument();
    expect(screen.getByTestId('numberInParty')).toBeInTheDocument();
    expect(screen.getByText('Create Reservation')).toBeInTheDocument();
    expect(screen.getByTestId('warning')).toBeInTheDocument();
  });

  it( 'should Post and update the screen when appropriate inputs are entered and submited', async () => {

    render(<ResoForm updateResos={mockUpdate}/>);

    userEvent.type(screen.getByPlaceholderText('What is the name for the reservation?'), 'Debugora');
    userEvent.click(screen.getByText('Create Reservation'));

    await waitFor(() => screen.getByTestId('warning') === 'Nice! We look forward to seeing you!');

    expect(reqs.postNewReso).toHaveBeenCalledWith(
      {
        name: "Debugora",
        date: "10/22",
        time: "12:00",
        number: 1
      }
    );
    expect(mockUpdate).toHaveBeenCalled();
  });
});
