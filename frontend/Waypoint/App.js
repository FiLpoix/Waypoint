import React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen/index';
import CitiesScreen from './screens/CitiesScreen/index';
import RegisterScreen from './screens/RegisterScreen/index'
import LoginScreen from './screens/LoginScreen'
import PointDetails from './screens/PointDetails/index';
import FavoriteScreen from './screens/FavoriteScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import RatingScreen from './screens/RatingScreen';
import Categories from './screens/Categories';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Cities" component={CitiesScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="PointDetails" component={PointDetails} options={{headerShown: false}}/>
        <Stack.Screen name="Favorite" component={FavoriteScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Rating" component={RatingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Categories" component={Categories} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
