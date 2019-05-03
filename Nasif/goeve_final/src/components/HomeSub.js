{
    /* 
     * Author : M. Nasif Nuha
     * Date : 16/04/2019
     * Description : Logic to handle data passed from 'Home.js' 
     */
}

import React, { Component } from 'react';
import { View, ScrollView, Linking } from "react-native";
import { Content, Card, CardItem, Body, Text, Button, Right } from 'native-base';
import { Rating } from 'react-native-ratings';
import axios from 'axios';

class HomeSub extends Component {

    state = {
        persons: [],
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                console.log(res.data[0].name);
                this.setState({ persons: res.data });
            })
    }

    render() {

        const { eventsPush } = this.props;
        let eventList = [];

        eventsPush.forEach((eventData, i) => {
            const eventArray = (
                <Content key={`event${i}`}>
                    <Card>
                        <CardItem>
                            <Body style={{ flex: 1, flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }} onPress={() => Linking.openURL(eventData.event.url)}>
                                        {eventData.event.title}
                                    </Text>
                                    <Text style={{ color: 'red', fontSize: 13, fontWeight: 'bold' }} onPress={() => Linking.openURL(eventData.event.url)}>
                                        {eventData.event.month}
                                        <Text>
                                            {'\t'}{eventData.event.day}
                                        </Text>
                                    </Text>
                                    <Text style={{ fontSize: 13 }} onPress={() => Linking.openURL(eventData.event.url)}>
                                        {eventData.event.time}
                                    </Text>
                                    <Text style={{ fontSize: 13 }} onPress={() => Linking.openURL(eventData.event.url)}>
                                        {eventData.event.price}
                                    </Text>
                                    <View>
                                        <Text onPress={() => Linking.openURL(eventData.event.url)}> </Text>
                                        <Rating
                                            type='star'
                                            startingValue={0}
                                            minValue={0}
                                            ratingCount={5}
                                            imageSize={20}
                                            onFinishRating={(rating) => { console.log(eventData.event.id, rating) }}
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
            eventList.push(eventArray)
        });

        if (eventList.length > 0) {
            return (
                <ScrollView>
                    {eventList}
                </ScrollView>
            )
        }
        return (
            <Text>Empty</Text>
        )
    }
}

export default HomeSub;