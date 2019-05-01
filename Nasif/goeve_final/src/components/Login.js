import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from "react-native";
import { Container, Header, Content, Card, CardItem, Body, Text, Thumbnail, Button, Right, StyleProvider } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

export default class Login extends Component {

    // async loginFacebook() {
    //     try {
    //         let result = await LoginManager.logInWithReadPermissions(['public_profile'])
    //         if(result.isCancelled){
    //             alert('Login was cancelled')
    //         } else {
    //             alert('Login was successfull with permission'+ result.grantedPermissions.toString())
    //         }
    //     } catch (error) {
    //         alert('Login failed with error'+error)
    //     }
    // }

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

    constructor(props) {
        super(props);
        this.state = { accessToken: null }
      }

    render() {
        return (
            // <View>
            //     <FontAwesome.Button name="facebook" onPress={this.loginFacebook}>
            //         <Text>Login with Facebook</Text>
            //     </FontAwesome.Button>
            // </View>
            <View>
        <LoginButton

          readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('login has error: ', result.error)
              } else if (result.isCancelled) {
                console.log('login is cancelled.')
              } else {
                AccessToken.getCurrentAccessToken() .then((data) => { this.setState({ accessToken: data.accessToken }) }) .catch(error => { console.log(error) 
                  initUser(accessToken)
                })               
                
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")} />
          {console.log(this.state.accessToken)}
          <Text>{this.state.accessToken}</Text>
      </View>
        );
    }
}

module.exports = Login;