import 'react-native-gesture-handler';
//
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import Root from './app/routes';
import { Provider } from 'react-redux';
import { store } from './app/ReduxStore';
import AppContext from './app/context';
import { formDataGenerator } from './app/utils';
import { fetchPostAuthData } from './app/API';


export default function App() {

  return (
    <Provider store={store}>
      <AppContext>
        <Root />
      </AppContext>
    </Provider>

  );
}