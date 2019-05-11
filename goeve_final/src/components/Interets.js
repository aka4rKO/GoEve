import React, { Component } from 'react';
import InterestsCards from './InterestsCards';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { View, Container, Content, Spinner } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


export default class Interests extends Component {

  constructor() {
    super();
    InterestsCard = new InterestsCards();
    this.state = {
      data: [],
      isLoading: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => {
        InterestsCard.submitButton(true)
          , navigation.navigate('Home')
      }} style={{ padding: 10 }}>
        <Text style={{ padding: 10, fontWeight: 'bold', color: '#fff',fontSize: 18 }}>Done</Text>
      </TouchableOpacity>
    ),
  });

  getCategories() {
    axios.get(`http://35.197.184.241:4000/categories/`)
      .then(res => {
        this.setState({ data: res.data.categories, isLoading: true })
          , res.data.categories
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ScrollView>
        <View style={{ flex: 2, backgroundColor: '#f8f8f8' }}>
          <Text style={{ textAlign: "center", fontWeight: 'bold', color: '#000',fontSize: 18, marginTop: 15, marginBottom: 15 }}>Select at least 3 Interests to setup {"\n"} your feed</Text>
          <InterestsCards data={this.state.data} />
        </View>
        </ScrollView>
      );
    }

    return (
      <Container>
        <Content>
          <Spinner color='orange' />
        </Content>
      </Container>
    );
  }
}
