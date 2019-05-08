import React, { Component } from 'react';
import InterestsCards from './InterestsCards';
import { Text,View } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

export default class Interests extends Component {
  constructor() {
    super();
    this.state = { 
      data: [],
      isLoading: false
    };
  }

  getCategories(){
    axios.get(`http://35.186.155.252:4000/categories/`)
      .then(res => {
      this.setState({ data: res.data.categories,isLoading:true })
      ,res.data.categories})
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
        <Text>Work========</Text>
        <InterestsCards data={this.state.data} />
        </View>
    );
    }
    return (
			<Text>Loading</Text>
		)
  }
}
