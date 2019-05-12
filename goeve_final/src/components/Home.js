import React, { Component } from "react";
import EventType from "./EventType";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isRated: 'false'
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("IsRated").then(value => {
        console.log("Home ",value)
      this.setState({ isRated: value });
    });
  }

  render() {
    if (this.state.isRated=='true') {
      return (
        <ScrollView style={{ flex: 3 }}>
          <EventType eventType={"top"} title={"Top events"} />
          <EventType eventType={"interests"} title={"Recommended events"} />
          <EventType eventType={"ratings"} title={"Similar rated events"} />
        </ScrollView>
      );
    }
    return (
      <ScrollView style={{ flex: 1 }}>
        <EventType
          eventType={"newUser"}
          title={"Events based on your interests"}
        />
      </ScrollView>
    );
  }
}
