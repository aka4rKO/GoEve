import React, { Component } from 'react';
import InterestsCards from './InterestsCards';

export default class Interests extends Component {
  render() {

    const eventType = [
      
      {
          key: 1,
          name: 'Techology',
          url: require('./pics/Science-512.png'),
          status: false,
        
      },
      {
          key: 2,
          name: 'Dance',
          url: require('./pics/startup.png'),
          status: true
      },
      {
          key: 3,
          name: 'Drama',
          url: require('./pics/download.png'),
          status: false
  
      },
      {
          key: 4,
          name: 'Fun',
          url: require('./pics/download.png'),
          status: false
  
      },
      {
          key: 5,
          name: 'Party',
          url: require('./pics/startup.png'),
          status: false
  
      }
      
    ]

    return (
      <InterestsCards data={eventType}/>
    );
  }
}
