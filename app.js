//React imports
import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Button,
  Keyboard,
  BackHandler
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';


//styles
import styles from './modules/styles';

//Custom Component
import Titlebar from './components/titlebar';
import WordList from './components/wordlist';
import Menu from './components/menu';
import { MenuActions } from './components/menu';

//Store
import { store, actions } from './modules/statemanager';
import { storage, keys } from './modules/storage';

//Screens
import HomeScreen from './components/homescreen';
import LoginScreen from './components/loginscreen';
import RegisterScreen from './components/registerscreen';
import UserScreen from './components/userscreen';
import AdminScreen from './components/adminscreen';

//Dialog/Modals
import WordDetail from './components/worddetailmodal';
import AddWordModal from './components/addwordmodal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    //Grab session from disk storage and add it so violatile 
    storage.fetch(keys.session, (error, result) => {
      session = JSON.parse(result);
      if (result !== null) {
        store.dispatch({
          type: actions.SESSION,
          session: session
        });
      }
    }).catch((error) => {
      console.log('Error fetching session ' + error);
    });

    //Grab user from disk storage and add it so violatile 
    storage.fetch(keys.user, (error, result) => {
      user = JSON.parse(result);
      if (result !== null) {
        store.dispatch({
          type: actions.USER,
          user: user
        });
      }
    }).catch((error) => {
      console.log('Error fetching user ' + error);
    });
  }

  render() {
    return (
      <AppNavigation />
    );
  }
}

//Navigation screens
const AnglishWordbookNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  User: { screen: UserScreen },
  Admin: { screen: AdminScreen }
});

const AppNavigation = () => (
  <AnglishWordbookNavigator />
);

AppRegistry.registerComponent('App', () => App);