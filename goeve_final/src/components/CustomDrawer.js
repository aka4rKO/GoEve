import React, { Component } from "react";
import { View, ScrollView, SafeAreaView, Image } from "react-native";
import { Container, Content, Text, Body } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LoginButton } from "react-native-fbsdk";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  getUserDetails() {
    AsyncStorage.getItem("FBAccessUserID")
      .then(value => {
        axios
          .get(`http://35.244.118.239:4000/user/${value}`)
          .then(res => {
            console.log(res.data.user);
            this.setState({ data: res.data.user });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Container>
            <Content>
              <Body>
                <View>
                  <Image
                    square
                    source={{
                      uri: this.state.data.profileImgURL
                    }}
                    style={{
                      width: 80,
                      marginTop: 8,
                      marginLeft: -8,
                      height: 80,
                      alignSelf: "stretch",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 45,
                      overflow: "hidden"
                    }}
                  />
                </View>
                <View
                  style={{
                    alignSelf: "stretch",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {this.state.data.name}
                  </Text>
                  <Text style={{ fontSize: 13 }}>{this.state.data.email}</Text>
                </View>
              </Body>

              {/* Text tag for spacing; Don't remove */}
              <Text> </Text>

              {/* Home Button */}
              <Icon.Button
                color="#000000"
                name="home"
                size={25}
                style={{ backgroundColor: "white" }}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              >
                <Text style={{ color: "#000000" }}>Home</Text>
              </Icon.Button>

              {/* Interests Button */}
              <FontAwesome.Button
                color="#000000"
                name="heart"
                size={20}
                style={{ backgroundColor: "white" }}
                onPress={() => {
                  this.props.navigation.navigate("Interets");
                }}
              >
                <Text style={{ color: "#000000" }}>Interests</Text>
              </FontAwesome.Button>

              {/* Logout Button */}
              <MaterialCommunityIcons.Button
                style={{ backgroundColor: "#4267B2" }}
                onPress={() => {}}
              >
                <LoginButton
                  onLogoutFinished={() => {
                    AsyncStorage.clear(), this.props.navigation.navigate("Login");
                  }}
                />
              </MaterialCommunityIcons.Button>
            </Content>
          </Container>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
