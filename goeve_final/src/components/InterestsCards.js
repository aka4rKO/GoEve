import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, ImageBackground } from 'react-native';
import CircleCheckBox from 'react-native-circle-checkbox';
import CardView from 'react-native-cardview';
import { View, Container, Content, Spinner } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }
    return data;
};

const numColumns = 2;

export default class InterestsCards extends Component {

    static pramsCat = "";

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            selectedList: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitButton = this.submitButton.bind(this);
    }

    submitButton = (Submit) => {
        if (Submit) {
            let id = -1;
            AsyncStorage.getItem('FBAccessUserID')
                .then((value) => {
                    console.log("Token ", value);
                    id = value;
                    axios.patch(`http://35.186.155.252:4000/user/${id}`, [
                        { "propName": "tags", "value": pramsCat }
                    ]).then((res) => {
                        console.log("Doneee value", pramsCat);
                        console.log("Res ", res);
                    })
                });


        } else {
            console.log("Count of selected items: ", this.state.selectedList)
            this.state.selectedList.map((item, index) => {
                if (index == 0) {
                    pramsCat = item.category;
                } else {
                    pramsCat = pramsCat + "|" + item.category
                }
            })
            console.log(pramsCat);
        }

    }


    handleChange = (key, checked) => {

        console.log("Key " + key + " Checked " + checked);
        let newArray = [...this.state.data];

        newArray[key].status = checked;

        let tempSelectedArray = [...this.state.selectedList];
        tempSelectedArray[this.state.selectedList.length] = newArray[key];

        this.setState({ data: newArray, selectedList: tempSelectedArray }, () => { this.submitButton(false) });
        console.log("Checked item ", newArray[key]);

    }

    componentDidMount() {
        this.setState({ data: this.props.data, isLoading: true })
    }

    renderItem = ({ item, index }) => {

        if (item.empty === true) {
            return (
                <CardView
                    cardElevation={0}
                    cardMaxElevation={0}
                    cornerRadius={0}
                    style={styles.itemInvisible}>
                    <ImageBackground source={{ uri: item.imageURL }} style={styles.containerImg} resizeMode={'cover'}>
                        <View style={styles.check}>
                        </View>
                        <Text style={styles.text}>{item.category}</Text>
                    </ImageBackground>
                </CardView>
            );
        }

        return (
            <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={8}
                style={styles.card}
            >
                <ImageBackground source={{ uri: item.imageURL }} style={styles.containerImg} resizeMode={'cover'} >
                    <View style={styles.check}>
                        <CircleCheckBox
                            checked={item.status}
                            onToggle={(checked) => this.handleChange(index, checked)}
                            outerColor="#4169e1"
                            filterColor="#dcdcdc"
                            innerColor="#4169e1"
                            outerSize={19}
                            innerSize={10}
                            filterSize={30} />
                    </View>
                    <Text style={styles.text}>{item.category}</Text>
                </ImageBackground>
            </CardView>
        );
    };

    render() {
        if (this.state.isLoading) {
            return (
                <FlatList
                    data={formatData(this.state.data, numColumns)}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                    keyExtractor={(item, index) => index.toString()} />
            );
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

const styles = StyleSheet.create({

    header: {
        backgroundColor: '#FF4500',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    headerText: {
        color: 'black',
        fontSize: 20,
        padding: 26,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    btn: {
        position: 'absolute',
        right: 10,
        top: 15,
        backgroundColor: '#FF4500',
        color: 'red'
    },
    cb: {
        height: 100,
        width: 200,
        position: 'absolute',
    },
    userStyle: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute'
    },
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    containerImg: {
        flex: 1,
        backgroundColor: '#eee',
    },
    card: {
        backgroundColor: '#f8f8f8',
        flex: 1,
        margin: 5,
        height: 110
    },
    text: {
        color: "#fff",
        textAlign: 'center',
        textAlignVertical: "center",
        marginTop: 17,
        fontWeight: 'bold',
        fontSize: 18
    },
    check: {
        marginTop: 5,
        marginLeft: 5
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        flex: 1,
        margin: 5,
        height: 110
    }

});