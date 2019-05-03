import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, CheckBox, Button } from 'react-native';
import CircleCheckBox from 'react-native-circle-checkbox';
import CardView from 'react-native-cardview';

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

export default class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
        }
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange = (key,checked) => {
            console.log("Key "+key+" Checked "+checked)
          const newArray = [...this.state.data];
          newArray[key].status = checked;
          this.setState({data:newArray})
          console.log("Length "+this.state.data.length)
          this.state.data.map((item,key)=>{console.log(item.name+" "+item.status)})
      }
      
      componentWillMount (){
          this.setState({data:this.props.data})
      }
    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return (
                <CardView
                    cardElevation={0}
                    cardMaxElevation={0}
                    cornerRadius={0}
                    style={styles.itemInvisible}
                >
                    <ImageBackground source={item.url} style={styles.containerImg} resizeMode={'cover'}>
                        <View style={styles.check}>
                        </View>
                        <Text style={styles.text}>{item.name}</Text>
                    </ImageBackground>
                </CardView>);
        }
        return (
            <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={8}
                style={styles.card}
            >
                <ImageBackground source={item.url} style={styles.containerImg} resizeMode={'cover'}>
                    <View style={styles.check}>
                        <CircleCheckBox
                            checked={item.status}
                            onToggle={(checked)=>this.handleChange(index,checked)}
                            outerColor="#4169e1"
                            filterColor="#dcdcdc"
                            innerColor="#4169e1"
                            outerSize={19}
                            innerSize={10}
                            filterSize={30}
                        />
                    </View>
                    <Text style={styles.text}>{item.name}</Text>
                </ImageBackground>
            </CardView>
        );
    };

    render() {
        return (
        
            <FlatList
                data={formatData(this.state.data, numColumns)}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
            />
        
            
        );
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
        backgroundColor: '#eee',
    },
    containerImg: {
        flex: 1,
        backgroundColor: '#eee',
    },
    card: {
        backgroundColor: 'white',
        flex: 1,
        margin: 5,
        height: 110
    },
    text: {
        color: "#000",
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