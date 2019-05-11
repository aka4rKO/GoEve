import React, { Component } from 'react';
import Event from './Event';
import { Text, ScrollView } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Container, Content, Spinner } from 'native-base';

class EventType extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: false,
      isRated: false

    };
  }

  getEvents() {

    AsyncStorage.getItem('IsRated')
      .then((value) => {
        this.setState({ isRated: value })
      })
      .then(() => {
        if (this.state.isRated) {
          AsyncStorage.getItem('FBAccessUserID')
            .then((value) => {
              console.log("ID ", value)
              axios.get(`http://35.186.155.252:4000/event/${this.props.eventType}/${value}`)
                .then(res => {
                  this.setState({ data: res.data, isLoading: true }), res.data
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
        } else {
          AsyncStorage.getItem('FBAccessUserID')
            .then((value) => {
              console.log("ID ", value)
              axios.get(`http://35.186.155.252:4000/user/${this.props.eventType}/${value}`)
                .then(res => {
                  this.setState({ data: res.data, isLoading: true }), res.data
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
        }
      })


  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    // console.disableYellowBox = true;

    if (this.state.isLoading) {
      console.log("Is screen loading: ", this.state.isLoading)
      return (
        <View style={{ backgroundColor: "#f8f8f8" }}>
          <Text style={{ textAlign: "center", fontWeight: 'bold', color: '#ff802b', fontSize: 18, marginTop: 10, marginBottom: 10 }}>{this.props.title}</Text>
          <ScrollView>
            <Event data={this.state.data} />
          </ScrollView>
        </View>
      )
    }
    return (
      <Container>
        <Content>
          <Spinner color='orange' />
        </Content>
      </Container>
    )
  }
}

export default EventType;