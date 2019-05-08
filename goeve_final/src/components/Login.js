import React, { Component } from 'react';
import { View, ImageBackground, Image, AsyncStorage } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoginButton, AccessToken, } from 'react-native-fbsdk';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  componentWillMount(){
    const token = AsyncStorage.getItem('FBAccessToken');
    console.log("Token ",token)
    this.setState({accessToken:token})
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
    const { navigate } = this.props.navigation;
    if(this.state.accessToken==null){
      return (
        <ImageBackground source={require('../assets/login/location_point_with_bg.jpg')} style={{ width: '100%', height: '100%' }}>
          <View style={{ alignItems: 'center', marginVertical: '50%' }}>
            <Image source={require('../assets/login/goeve_logo.png')} style={{ width: 310, height: 100, }} />
          </View>

          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome.Button
              style={{
                backgroundColor: '#4267B2'
              }}>
              <LoginButton
                readPermissions={['public_profile']}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log('login has error: ', result.error)
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.')
                    } else {
                      AccessToken.getCurrentAccessToken().then((data) => {
                        async () => {
                          try {
                            await AsyncStorage.setItem('FBAccessToken', data.accessToken);
                          } catch (error) {
                            console.log(error);
                            // Error saving data
                          }
                        } 
                        this.setState({ accessToken: data.accessToken }),
                        console.log("User id: ",data.userID),
                        console.log("User access token: ",data.accessToken) })
                        .catch(error => {
                          console.log(error)
                          initUser(accessToken)
                      })
                      navigate('Home');
                    }
                  }
                }
              />
            </FontAwesome.Button>
            {/* {console.log(this.state.accessToken)} */}
          </View>
        </ImageBackground>
      );
    }else{
        return(navigate('Home'));
    }
  }
}

module.exports = Login;