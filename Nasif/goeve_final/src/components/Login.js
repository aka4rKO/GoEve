import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { Container, Header, Content, Card, CardItem, Body, Text, Thumbnail, Right, StyleProvider, Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {createStackNavigator} from 'react-navigation';
import Home from './Home';


import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

// const navigator = createStackNavigator({

// })

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { accessToken: null };
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  handleFacebookLogin() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result, error) {
        if (error) {
          console.log('login has error: ', result.error)
        }
        else if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          // console.log('Login success with permissions: ' + result.grantedPermissions.toString())
          AccessToken.getCurrentAccessToken().then((data) => {
            this.setState({ accessToken: data.accessToken })
            navigate('Home');
          }).catch(error => {
            console.log(error)
            initUser(accessToken)
          })
          // this.props.navigator.push
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )

    // onLoginFinished={
    //   (error, result) => {
    //     if (error) {
    //       console.log('login has error: ', result.error)
    //     } else if (result.isCancelled) {
    //       console.log('login is cancelled.')
    //     } else {
    //       AccessToken.getCurrentAccessToken().then((data) => { this.setState({ accessToken: data.accessToken }) }).catch(error => {
    //         console.log(error)
    //         initUser(accessToken)
    //       })

    //     }
    //   }
    // }
  }

  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        // Some user object has been set up somewhere, build that user here
        user.name = json.name
        user.id = json.id
        user.user_friends = json.friends
        user.email = json.email
        user.username = json.name
        user.loading = false
        user.loggedIn = true
        user.avatar = setAvatar(json.id)
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK')
      })
  }

  

  render() {
    return (
      // require('../assets/login/location_point.png')
      <ImageBackground source={require('../assets/login/orange_bj.png')} style={{ width: '100%', height: '100%' }}>

        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <FontAwesome.Button name="facebook-official" size={30}
            onPress={this.handleFacebookLogin} color="#fff"
            style={{ backgroundColor: '#4267B2', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Login with Facebook</Text>
          </FontAwesome.Button>
          {/* <LoginButton

          readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('login has error: ', result.error)
              } else if (result.isCancelled) {
                console.log('login is cancelled.')
              } else {
                AccessToken.getCurrentAccessToken().then((data) => { this.setState({ accessToken: data.accessToken }) }).catch(error => {
                  console.log(error)
                  initUser(accessToken)
                })

              }
            }
          }
          onLogoutFinished={() => alert("User logged out")} /> */}
          {console.log(this.state.accessToken)}
          <Text>{this.state.accessToken}</Text>
        </View>
      </ImageBackground>
    );
  }
}

module.exports = Login;