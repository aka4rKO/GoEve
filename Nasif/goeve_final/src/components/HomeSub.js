{
    /* 
     * Author : M. Nasif Nuha
     * Date : 16/04/2019
     * Description : Logic to handle data passed from 'Home.js' 
     */
}

import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from "react-native";
import { Container, Header, Content, Card, CardItem, Body, Text, Thumbnail, Button, Right, StyleProvider } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';

class HomeSub extends Component {
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
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        {eventData.event.title}
                                    </Text>
                                    <Text style={{ color: 'red', fontSize: 13, fontWeight: 'bold' }}>
                                        {eventData.event.month}
                                        <Text>
                                            {'\t'}{eventData.event.day}
                                        </Text>
                                    </Text>
                                    <Text style={{ fontSize: 13 }}>
                                        {eventData.event.time}
                                    </Text>
                                    <Text style={{ fontSize: 13 }}>
                                        {eventData.event.price}
                                    </Text>
                                    <View>
                                        <Text> </Text>
                                    <Rating
                                        type='star'
                                        startingValue={0}
                                        minValue={0}
                                        // showRating
                                        ratingCount={5}
                                        imageSize={20}
                                        onFinishRating={this.ratingCompleted}
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