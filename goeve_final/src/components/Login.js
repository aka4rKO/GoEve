import React, { Component } from 'react';
import { View, ImageBackground, Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoginButton, AccessToken, } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  componentWillMount() {
    AsyncStorage.getItem('FBAccessToken')
      .then((value) => {
        console.log("Token ", value);
        this.setState({ accessToken: value });
      });
  }

  async initUser(token) {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(small)`);
    const userInfo = await response.json();
    console.log("User info ",userInfo);
  }
    // fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log("Answer ",json)
    //     // Some user object has been set up somewhere, build that user here
    //     // user.name = json.name
    //     // user.id = json.id
    //     // user.user_friends = json.friends
    //     // user.email = json.email
    //     // user.username = json.name
    //     // user.loading = false
    //     // user.loggedIn = true
    //     // user.avatar = setAvatar(json.id)
    //   })
    //   .catch(() => {
    //     reject('ERROR GETTING DATA FROM FACEBOOK')
    //   })
  

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.accessToken == null) {
      AsyncStorage.setItem("FirstTime","")
      return (
        <ImageBackground source={require('../assets/login/location_point_with_bg.jpg')} style={{ width: '100%', height: '100%' }}>
          <View style={{ alignItems: 'center', marginVertical: '50%' }}>
            <Image source={require('../assets/login/goeve_logo.png')} style={{ width: 310, height: 100, }} />
          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome.Button
              style={{ backgroundColor: '#4267B2' }}>
              <LoginButton
                readPermissions={['public_profile', 'email']}
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log('login has error: ', result.error)
                  } else if (result.isCancelled) {
                    console.log('login is cancelled.')
                  } else {
                    console.log("Result: ",result);
                    AccessToken.getCurrentAccessToken()
                    .then((data) => {
                      console.log("Data ", data)
                      AsyncStorage.setItem('FBAccessToken', data.accessToken)
                        .then((res) => {
                          console.log("AccessToken " + res)
                          this.setState({ accessToken: data.accessToken });
                        })
                      AsyncStorage.setItem('FBAccessUserID', data.userID)
                        .then((res) => {
                          console.log("ID " + res)
                        })
                      navigate('Home');
                    }).then(()=>{this.initUser()})
                  }
                }}
              />
            </FontAwesome.Button>
            {/* {console.log(this.state.accessToken)} */}
          </View>
        </ImageBackground>
      );
    } else {
      
      // this.initUser(this.state.accessToken)
      return (navigate('Home'));
    }
  }
}

module.exports = Login;