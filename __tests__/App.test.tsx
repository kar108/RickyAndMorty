import {render} from '@testing-library/react-native';
import React from 'react';
import DetailPage from '../src/screens/DetailPage';
import App from '../App';
import Home from '../src/screens/Home';

describe('Renders Home', () => {
  it('when the user see the splash screen for the first time ', async () => {
    await jest.mock('../src/services/characters', () =>
      jest.fn(() => {
        return Promise.resolve({
          res: {
            data: {
              info: {
                count: 826,
                pages: 42,
                next: 'https://rickandmortyapi.com/api/character/?page=2',
                prev: null,
              },
              results: [
                {
                  id: 1,
                  name: 'Rick Sanchez',
                  status: 'Alive',
                  species: 'Human',
                  type: '',
                  gender: 'Male',
                  origin: {
                    name: 'Earth',
                    url: 'https://rickandmortyapi.com/api/location/1',
                  },
                  location: {
                    name: 'Earth',
                    url: 'https://rickandmortyapi.com/api/location/20',
                  },
                  image:
                    'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                  episode: [
                    'https://rickandmortyapi.com/api/episode/1',
                    'https://rickandmortyapi.com/api/episode/2',
                  ],
                  url: 'https://rickandmortyapi.com/api/character/1',
                  created: '2017-11-04T18:48:46.250Z',
                },
              ],
            },
          },
        });
      }),
    );
    render(<Home />);
  });
});
