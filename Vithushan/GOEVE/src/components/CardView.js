import React, { Component } from 'react'
import InterestCards from './InterestsCards'
import { View, StyleSheet, FlatList, Text } from 'react-native';
import CardView from 'react-native-cardview';

export class CardViewComp extends Component {

  render() {

    const eventType = [
        {
            type: {
                id: 1,
                name: 'Techology',
                url: require('./pics/Science-512.png'),
                status: false,
            },
        },
        {
            type: {
                id: 2,
                name: 'Dance',
                url: require('./pics/startup.png'),
                status: false
            }
        },
        {
            type: {
                id: 3,
                name: 'Music',
                url: require('./pics/startup.png'),
                status: false
            }
        },
        {
            type: {
                id: 4,
                name: 'Drama',
                url: require('./pics/download.png'),
                status: false
        
            }
        }
    ]

    return (

    //   <InterestCards types={eventType}/>
    // <View>Hello</View>    
    // <Text>Hello</Text>
    <CardView
          cardElevation={5}
          cardMaxElevation={2}
          cornerRadius={5}>
          <Text>
              Card view doo
          </Text>
    </CardView>

    )
  }
}

export default CardViewComp
