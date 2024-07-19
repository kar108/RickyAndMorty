import {render} from '@testing-library/react-native';
import React from 'react';
import DetailPage from '../src/screens/DetailPage';
import App from '../App';
import Home from '../src/screens/Home';

describe('Renders Home', () => {


  it('when the user see the splash screen for the first time ', async () => {
    render(<DetailPage />);
  });
});
