{
  /* 
   * Author : M. Nasif Nuha
   * Date : 16/04/2019
   * Description : Home view 
   */
}
import React, { Component } from 'react';
import HomeSub from './HomeSub';
import { StatusBar } from 'react-native';



class Home extends Component {

  render(){
    const events = [
      {
        event :{
          id: 1,
          url: 'http://betacrash.com/wp-content/uploads/2018/05/io-social-banner.png',
          title: 'Google I/O',
          month: 'JAN',
          day: '28',
          time: '08:00 AM',
          price: 'LKR 1000'
        },
      },
      {
        event :{
          id: 2,
        url: 'http://betacrash.com/wp-content/uploads/2018/05/io-social-banner.png',
        title: 'Cloud Next',
        month: 'FEB',
        day: '2',
        time: '09:00 AM',
        price: 'LKR 700'
        },
      },
      {
        event :{
          id: 3,
        url: 'http://betacrash.com/wp-content/uploads/2018/05/io-social-banner.png',
        title: 'Jam google',
        month: 'MAR',
        day: '22',
        time: '04:00 PM',
        price: 'LKR 1500'
        },
      },
      {
        event :{
          id: 4,
        url: 'http://betacrash.com/wp-content/uploads/2018/05/io-social-banner.png',
        title: 'Code Challenge',
        month: 'MAY',
        day: '3',
        time: '04:00 PM',
        price: 'LKR 1800'
        },
      },
      {
        event :{
          id: 5,
        url: 'http://betacrash.com/wp-content/uploads/2018/05/io-social-banner.png',
        title: 'Machine Learning',
        month: 'APRIL',
        day: '14',
        time: '01:30 PM',
        price: 'Free'
        },
      },
      {
        event :{
          id: 6,
        url: 'http://betacrash.com/wp-content/uploads/2018/05/io-social-banner.png',
        title: 'Docker',
        month: 'NOV',
        day: '14',
        time: '04:00 PM',
        price: 'Free'
        },
      },
      {
        event :{
          id: 7,
        url: 'http://betacrash.com/wp-content/uploads/2018/05/io-social-banner.png',
        title: 'Java',
        month: 'JUN',
        day: '14',
        time: '08:00 AM',
        price: 'LKR 800'
        },
      },
    ]

    return (
      
      <HomeSub eventsPush={events}/>
    )
  }
}

export default Home;