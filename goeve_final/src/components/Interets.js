import React, { Component } from 'react';
import InterestsCards from './InterestsCards';
import { Text,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { View, Container, Content, Spinner } from 'native-base';


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
        ,navigation.navigate('Home')}} style={{padding:10}}>
          <Text>Done</Text>
      </TouchableOpacity>
  ),
  });

  getCategories(){
    axios.get(`http://35.186.155.252:4000/categories/`)
      .then(res => {
      this.setState({ data: res.data.categories,isLoading:true })
      ,res.data.categories
      })
      .catch(function (error) {
				console.log(error);
			});
  }
  
  componentDidMount(){
    this.getCategories();
  }

  render() {
		if(this.state.isLoading){    
      return (
        <View style={{flex:2}}>
          <Text style={{textAlign:"center"}}>Select at least 3</Text>
          <InterestsCards data={this.state.data} />
        </View>
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
