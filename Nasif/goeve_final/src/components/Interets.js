import React, { Component } from 'react';
import InterestsCards from './InterestsCards';
import { Button } from 'react-native-elements';
import { View } from 'native-base';
import axios from 'axios';

export default class Interests extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  componentDidMount() {
    fetch(`http://35.186.155.252:4000/categories/`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

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
        <InterestsCards data={this.state.data} />
    );
  }
}
