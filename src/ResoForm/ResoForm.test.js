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
});
