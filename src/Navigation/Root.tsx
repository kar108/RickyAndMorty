import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import DetailPage from '../screens/DetailPage';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        animationEnabled: false,
        headerShown: false,
      }}>
      <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={DetailPage} />
      </>
    </Stack.Navigator>
  );
}
