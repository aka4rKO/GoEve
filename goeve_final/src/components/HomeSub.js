import React, { Component } from 'react';
import { View, ScrollView, Linking } from "react-native";
import { Content, Card, CardItem, Body, Text, Button, Right } from 'native-base';
import { Rating } from 'react-native-ratings';
import axios from 'axios';

class HomeSub extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
            isLoading: false,
            eventList:[]
        }
    }

        componentDidMount(){
            this.setState({data:this.props.eventsPush,isLoading:true})
            let arrayy = []

            this.props.eventsPush.forEach((eventData, i) => {
                const eventArray = (
                    <Content key={`event${i}`}>
                        <Card style={{width:'30%'}}>
                            <CardItem>
                                <Body style={{ flex: 1, flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }} onPress={() => Linking.openURL(eventData.event.url)}>
                                            {eventData.title}
                                        </Text>
                                        <Text style={{ color: 'red', fontSize: 13, fontWeight: 'bold' }} onPress={() => Linking.openURL(eventData.url)}>
                                            {eventData.month}
                                            <Text>
                                                {'\t'}{}
                                            </Text>
                                        </Text>
                                        <Text style={{ fontSize: 13 }} onPress={() => Linking.openURL(eventData.event.url)}>
                                            {eventData.time}
                                        </Text>
                                        <Text style={{ fontSize: 13 }} onPress={() => Linking.openURL(eventData.event.url)}>
                                            {eventData.price}
                                        </Text>
                                        <View>
                                            <Text onPress={() => Linking.openURL(eventData.url)}> </Text>
                                            <Rating
                                                type='star'
                                                startingValue={0}
                                                minValue={0}
                                                ratingCount={5}
                                                imageSize={20}
                                                onFinishRating={(rating) => { console.log(eventData.event_id, rating) }}
                                            />
                                            <View></View>
                                        </View>
                                    </View>
                                    <Right>
                                        <Button transparent warning button>
                                            <Text uppercase={false} style={{ fontSize: 10, fontWeight: 'bold' }}>Not Interested</Text>
                                        </Button>
                                    </Right>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                )
                arrayy.push(eventArray)
            });
            console.log(arrayy)
            this.setState({eventList:arrayy})
        }
    
    render() {
        console.log(this.state.eventList.length)
        if (this.state.isLoading && (this.state.eventList.length > 0)) {
            let asdas =this.state.eventList;
            return (
                <ScrollView>
                    {asdas}
                </ScrollView>
            )
        }
        return (
            <Text>Loading</Text>
        )
    }
}

export default HomeSub;