import React, { Component } from "react";
import { View, Linking, FlatList } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Container,
  Spinner
} from "native-base";
import { Rating } from "react-native-ratings";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 1;

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data, isLoading: true });
  }

  deleteItemById = index => {
    const filteredData = this.state.data.filter(
      item => item.event_id !== index
    );
    this.setState({ data: filteredData });
    AsyncStorage.getItem("FBAccessUserID").then(value => {
      axios
        .get(`http://35.189.6.233:4000/user/ratings`, {
          event_id: item.event_id,
          user_id: value,
          rating: 1
        })
        .then(res => {
          console.log("Rating results: ", res);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return (
        <Content>
          <Card>
            <CardItem>
              <Body style={{ flex: 1, flexDirection: "row" }}>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      numberOfLines={2}
                      style={{ fontSize: 20, fontWeight: "bold", width: "90%" }}
                      onPress={() => Linking.openURL(item.url)}
                    >
                      {item.title}
                    </Text>
                    <Entypo.Button
                      name="cross"
                      color="red"
                      size={20}
                      style={{
                        backgroundColor: "white",
                        height: 60,
                        alignSelf: "flex-end"
                      }}
                      onPress={() => this.deleteItemById(item.event_id)}
                    />
                  </View>
                  <Text
                    style={{ color: "red", fontSize: 15, fontWeight: "bold" }}
                    onPress={() => Linking.openURL(item.url)}
                  >
                    {item.date}
                  </Text>
                  <Text
                    style={{ fontSize: 15 }}
                    onPress={() => Linking.openURL(item.url)}
                  >
                    {item.time}
                  </Text>
                  <Text
                    style={{ fontSize: 13 }}
                    onPress={() => Linking.openURL(item.url)}
                  >
                    {item.price}
                  </Text>
                  <View style={{ alignItems: "flex-start" }}>
                    <Rating
                      type="star"
                      startingValue={0}
                      minValue={0}
                      ratingCount={5}
                      imageSize={20}
                      onFinishRating={rating => {
                        AsyncStorage.setItem("IsRated", "true");
                        AsyncStorage.getItem("FBAccessUserID").then(value => {
                          axios
                            .get(`http://35.189.6.233:4000/user/ratings`, {
                              event_id: item.event_id,
                              user_id: value,
                              rating: rating
                            })
                            .then(res => {
                              console.log("Rating results: ", res);
                            })
                            .catch(error => {
                              console.log(error);
                            });
                        });
                      }}
                    />
                  </View>
                  <View />
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>
      );
    }

    return (
      <Content>
        <Card>
          <CardItem>
            <Body style={{ flex: 1, flexDirection: "row" }}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    numberOfLines={2}
                    style={{ fontSize: 18, fontWeight: "bold", width: "90%" }}
                    onPress={() => Linking.openURL(item.url)}
                  >
                    {item.title}
                  </Text>
                  <Entypo.Button
                    name="cross"
                    color="red"
                    size={20}
                    style={{
                      backgroundColor: "white",
                      height: 60,
                      alignSelf: "flex-end"
                    }}
                    onPress={() => this.deleteItemById(item.event_id)}
                  />
                </View>
                <Text
                  style={{ color: "red", fontSize: 15, fontWeight: "bold" }}
                  onPress={() => Linking.openURL(item.url)}
                >
                  {item.date}
                </Text>
                <Text
                  style={{ fontSize: 15 }}
                  onPress={() => Linking.openURL(item.url)}
                >
                  {item.time}
                </Text>
                <Text
                  style={{ fontSize: 13 }}
                  onPress={() => Linking.openURL(item.url)}
                >
                  {item.price}
                </Text>
                <Text> </Text>
                <View style={{ alignItems: "flex-start" }}>
                  <Rating
                    type="star"
                    startingValue={0}
                    minValue={0}
                    ratingCount={5}
                    imageSize={20}
                    onFinishRating={rating => {
                      AsyncStorage.setItem("IsRated", "true");
                      AsyncStorage.getItem("FBAccessUserID").then(value => {
                        axios
                          .post(`http://35.189.6.233:4000/user/ratings`, {
                            event_id: item.event_id,
                            user_id: value,
                            rating: rating
                          })
                          .then(res => {
                            console.log(res);
                          })
                          .catch(error => {
                            console.log(error);
                          });

                        console.log(item.event_id, rating);
                        console.log(
                          "Is event id number? ",
                          isNaN(item.event_id)
                        );
                        console.log("Is user id number? ", isNaN(item.user_id));
                        console.log("Is rating id number? ", isNaN(rating));
                        console.log(item.event_id, rating);
                      });
                    }}
                  />
                </View>
                <View />
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <FlatList
          data={formatData(this.state.data, numColumns)}
          renderItem={this.renderItem}
          numColumns={numColumns}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }

    return (
      <Container>
        <Content>
          <Spinner color="orange" />
        </Content>
      </Container>
    );
  }
}

export default Event;
