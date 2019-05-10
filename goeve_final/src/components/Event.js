import React, { Component } from 'react';
import { View, Linking } from "react-native";
import { Content, Card, CardItem, Body, Text, Container, Spinner } from 'native-base';
import { Rating } from 'react-native-ratings';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Event extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: false,
            index: Number
        }
    }

    componentDidMount(){
            console.log("Loading Home subs ",this.props.eventItem);
            this.setState({data:this.props.eventItem,isLoading:true,index:this.props.indexItem});
        }

    render() {
        if (this.state.isLoading) {
            console.log("Is loading ",this.state.isLoading)
            return (
                    <Content key={`event${this.state.index}`}>
                        <Card>
                            <CardItem>
                            <Body style={{ flex: 1, flexDirection: 'row' }}>
                            <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text numberOfLines={2} style={{ fontSize: 20, fontWeight: 'bold', width: '90%' }} onPress={() => Linking.openURL(this.state.data.url)}>
                                {this.state.data.title}
                                </Text>
                            <Entypo.Button name="cross" color='red' size={20} style={{backgroundColor: 'white', height: 60, alignSelf: 'flex-end'}}/>
                            
                            </View>
                                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }} onPress={() => Linking.openURL(this.state.data.url)}>
                                {this.state.data.date}
                                </Text>
                            <Text style={{ fontSize: 15 }} onPress={() => Linking.openURL(this.state.data.url)}>
                                {this.state.data.time}
                            </Text>
                            <Text style={{ fontSize: 13 }} onPress={() => Linking.openURL(this.state.data.url)}>
                                {this.state.data.price}
                            </Text>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Rating type='star' startingValue={0} minValue={0} ratingCount={5} imageSize={20}
                                onFinishRating={(rating) => { 
                                        AsyncStorage.setItem('IsRated',true);
                                        AsyncStorage.getItem('FBAccessUserID')
                                        .then((value)=>{
                                            axios.get(`http://35.186.155.252:4000/user/ratings`,
                                            {
                                                "event_id":this.state.data.event_id,
                                                "user_id":value,
                                                "rating":rating
                                            })
                                        console.log(this.state.data.event_id, rating) 
                                        })
                                        }} />
                            </View>
                            <View>
                            </View>
                            </View>
                            </Body>
                            </CardItem>
                        </Card>
                    </Content>
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

export default Event;