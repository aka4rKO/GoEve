import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Main } from './src/Route';
import Login from './src/components/Login';
import Interets from './src/components/Interets';

export default class App extends Component {
  componentDidMount(){
    SplashScreen.hide();
  }
  render() {
    return (
        <Main/>
        // <Login/>
        // <Interets />
    );
  }
}