//useNavigation mock
jest.mock('@react-navigation/native', () => {
    const { useEffect } = require('react');
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useIsFocused: jest.fn(() => true),
      useFocusEffect: useEffect,
      useNavigation: () => ({
        setOptions: jest.fn(() => ({
          headerLeft: jest.fn()
        })),
        navigate: jest.fn(),
        goBack: jest.fn(),
        pop: jest.fn(),
        dispatch: jest.fn(),
        getParent: jest.fn(), // Mock getParent function
      }),
    };
  });