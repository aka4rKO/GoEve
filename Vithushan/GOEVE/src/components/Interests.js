import React, { Component } from 'react'
import InterestCards from './InterestsCards'
import {
    View,
    StyleSheet,
    FlatList

        } from 'react-native';

export class Interests extends Component {


    // CheckBoxTest(){
       

    //     this.setState({
            // check:!this.state.check,
    //         status:!this.state.status   
            
    //     })
    // }


    // constructor(props){
    //     super(props);
    //     this.state = {
    //         eventType: [],
    //         setState({
    //             val.type.status
    //         })
    //     }
    // }

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
        // {
        //     type: {
        //         id: 5,
        //         name: 'Motor',
        //         url: require('./pics/download.png'),
        //         status: false
        //     }
        // } 
    ]

    //  this.state.eventType.map((val,key) => {
    //      return <InterestCards key={key} keyval={key} val={val}
    //      CheckBoxTest={ ()=> this.setState(key) }
    //  />
//});






    return (

        

        
      

      <InterestCards types={eventType}/>


      
      


    )
  }
}

export default Interests
