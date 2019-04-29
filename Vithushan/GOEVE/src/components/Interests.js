import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground } from 'react-native';
import CardView from 'react-native-cardview';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';

export default class Interests extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
            <View flexDirection="row">
                <CardView
                    cardElevation={4}
                    cardMaxElevation={4}
                    cornerRadius={8}
                    style={styles.card}
                >
                    <ImageBackground source={require('./pics/startup.png')} style={styles.containerImg} resizeMode={'cover'}>
                    <View style={styles.check}>
                    <CircleCheckBox
                        checked={false}
                        onToggle={(checked) => console.log('My state is: ', checked)}
                        outerColor="#4169e1"
                        filterColor="#dcdcdc"
                        innerColor="#4169e1"
                        outerSize={19}
                        innerSize={10}
                        filterSize={30}
                    />
                    </View>
                    <Text style={styles.text}>Elevation 2</Text>
                    </ImageBackground>
                </CardView>
                <CardView
                    cardElevation={4}
                    cardMaxElevation={4}
                    cornerRadius={8}
                    style={styles.card}
                >
                    <ImageBackground source={require('./pics/startup.png')} style={styles.containerImg} resizeMode={'cover'}>
                    <View style={styles.check}>
                    <CircleCheckBox
                        checked={true}
                        onToggle={(checked) => console.log('My state is: ', checked)}
                        outerColor="#4169e1"
                        filterColor="#dcdcdc"
                        innerColor="#4169e1"
                        outerSize={19}
                        innerSize={10}
                        filterSize={30}
                    />
                    </View>
                    <Text style={styles.text}>Elevation 2</Text>
                    </ImageBackground>
                </CardView>
            </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});