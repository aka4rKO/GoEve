import React, { Component } from "react";
import { View, ImageBackground, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LoginButton, AccessToken } from "react-native-fbsdk";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      userId: Number,
      isSelectedTags: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("FBAccessUserID").then(value => {
      console.log("Past user id ", value);
      if (value != null) {
        this.setState({ userId: value });
        axios.get(`http://35.189.6.233:4000/user/${value}`).then(res => {
          console.log(" Check Tags for user id", res.data.user);
          if (res.data.user.tags == null) {
            this.setState({ isSelectedTags: false });
          } else {
            AsyncStorage.setItem('userTags',res.data.user.tags);
            this.setState({ isSelectedTags: true });
          }
        });
      }
    });
  }

  componentWillMount() {
    AsyncStorage.getItem("FBAccessToken")
      .then(value => {
        console.log("Past token ", value);
        if (value != null) {
          this.setState({ accessToken: value });
        }
      })
      .then(() => {
        AsyncStorage.getItem("FBAccessUserID").then(value => {
          console.log("Past user id willMount ", value);
          if (value != null) {
            this.setState({ userId: value });
          }
        });
      });
  }

  checkTags = navigate => {
    const uId = this.state.isSelectedTags;
    console.log("Selected ",uId);

    if (this.state.isSelectedTags == false) {
      AsyncStorage.setItem("IsRated", 'false');
      navigate("Interets");
    } else if (this.state.isSelectedTags == true) {
      AsyncStorage.setItem("IsRated", 'true');
      navigate("Home");
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.accessToken == null) {
      return (
        <ImageBackground
          source={require("../assets/login/location_point_with_bg.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ alignItems: "center", marginVertical: "50%" }}>
            <Image
              source={require("../assets/login/goeve_logo.png")}
              style={{ width: 310, height: 100 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FontAwesome.Button style={{ backgroundColor: "#4267B2" }}>
              <LoginButton
                readPermissions={["public_profile", "email"]}
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log("Error occured while login: ", result.error);
                  } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                  } else {
                    console.log("Login Result: ", result);
                    AccessToken.getCurrentAccessToken().then(data => {

                      AsyncStorage.setItem("FBAccessUserID", data.userID).then(
                        res => {
                          console.log("User Id added ", res);
                          AsyncStorage.setItem(
                            "FBAccessToken",
                            data.accessToken
                          ).then(value => {
                            console.log("User token added ", value);
                            this.setState(
                              { accessToken: data.accessToken },
                              () => {
                                axios
                                  .post(`http://35.189.6.233:4000/user/`, {
                                    accessToken: data.accessToken
                                  })
                                  .then(res => {
                                    console.log(
                                      "User create request response ",
                                      res.status
                                    );
                                    if (res.status == 201) {
                                      AsyncStorage.setItem("IsRated", 'false');
                                      navigate("Interets");
                                    } else if (res.status == 202) {
                                      AsyncStorage.setItem("IsRated", 'true');
                                      navigate("Home");
                                    }
                                  });
                              }
                            );
                          });
                        }
                      );
                    });
                  }
                }}
              />
            </FontAwesome.Button>
          </View>
        </ImageBackground>
      );
    } else {
      return <>{this.checkTags(navigate)}</>;
    }
  }
}

module.exports = Login;
