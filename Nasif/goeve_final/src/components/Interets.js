import React, { Component } from 'react';
import InterestsCards from './InterestsCards';
import { Button } from 'react-native-elements';
import { View } from 'native-base';

export default class Interests extends Component {
  render() {

    const eventType = [
      {
        key: 1,
        name: 'Techology',
        url: require('../assets/interests/Science-512.png'),
        status: false,

      },
      {
        key: 2,
        name: 'Dance',
        url: require('../assets/interests/startup.png'),
        status: true
      },
      {
        key: 3,
        name: 'Drama',
        url: require('../assets/interests/download.png'),
        status: false

      },
      {
        key: 4,
        name: 'Fun',
        url: require('../assets/interests/download.png'),
        status: false

      },
      {
        key: 5,
        name: 'Party',
        url: require('../assets/interests/startup.png'),
        status: false
      }
    ]

    return (
        <InterestsCards data={eventType} />
    );
  }
}
