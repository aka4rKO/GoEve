{
  /* 
   * Author : M. Nasif Nuha
   * Date : 16/04/2019
   * Description : Home view 
   */
}
import React, { Component } from 'react';
import HomeSub from './HomeSub';



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

<<<<<<< HEAD
=======
    render(){
            
        return this.state.events.map((event) => (
          <Container key={event.id}>
          <Content>
            <Card>
              <CardItem>
                <Body>
                  {/* <Thumbnail style={{width:375, height:150, borderRadius : 10}} source={{uri: event.url}}/> */}               
                  <Text style={{fontSize:20, fontWeight: 'bold'}}>                    
                     {event.title}
                  </Text>
                  <Text style={{color:'red', fontSize:13, fontWeight: 'bold'}}>
                    {event.month} 
                    <Text>
                    {'\t'}{event.day}
                    </Text>
                  </Text>
                  <Text style={{fontSize:13}}>
                    {event.time}
                  </Text>
                  <Text style={{fontSize:13}}>
                    {event.price}
                  </Text>
                </Body>
                <Button transparent warning  button onPress={this.onNotInterested.bind(this, event.id)}>
                  <Text uppercase={false} style={{fontSize:10, fontWeight: 'bold'}}>Not Interested</Text>
                </Button> 
              </CardItem>
            </Card>
          </Content>
        </Container>
        )
        // (
        //   <Container>
        //   <Content >
        //     <Card >
        //       <CardItem>
        //         <Thumbnail style={{flex:1, height:150, borderRadius : 10}} source={{uri: 'http://betacrash.com/wp-content/uploads/2018/05/io-social-banner.png'}}/>
        //       </CardItem>
        //       <CardItem button onPress={() => alert("This is Card Body")}>
        //         <Body>
        //           <Text>
        //              Hi
        //           </Text>
        //         </Body>
        //       </CardItem>
        //     </Card>
        //   </Content>
        // </Container>
        );
    }
>>>>>>> c9a0c8b52c851efa6e64d540bdbf7c5af1b2bbd4
  }
}

export default Home;