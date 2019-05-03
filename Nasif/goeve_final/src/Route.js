{
    /* 
     * Author : M. Nasif Nuha
     * Date : 16/04/2019
     * Description : Structure for the entire application.
     */
}

import React, { Component } from 'react';
import { createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator } from "react-navigation";
import { View, Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Body } from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginButton } from 'react-native-fbsdk';

import Home from './components/Home';
import Interets from './components/Interets'
import Login from './components/Login';

const { width: widthDim } = Dimensions.get('window');

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView >
            <Container>
                <Content>
                    <Body >
                        <View>
                            <Image square
                                source={{ uri: 'data:image/jpeg;base64,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' }}
                                style={{
                                    width: 80,
                                    marginTop: 8,
                                    marginLeft: -8,
                                    height: 80,
                                    alignSelf: 'stretch',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 45,
                                    overflow: 'hidden'
                                }} />
                        </View>
                        <View
                            style={{
                                alignSelf: 'stretch',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Mohamed Nasif Nuha</Text>
                            <Text style={{ fontSize: 13 }}>nasifnuh@gmail.com</Text>
                        </View>
                    </Body>

                    {/* Text tag for spacing; Don't remove */}
                    <Text> </Text>

                    {/* Home Button */}
                    <Icon.Button
                        color='#000000'
                        name='home'
                        size={25}
                        style={{ backgroundColor: 'white' }}
                        onPress={() => { props.navigation.navigate('Home') }}>
                        <Text style={{ color: '#000000' }}>Home</Text>
                    </Icon.Button>

                    {/* Interests Button */}
                    <FontAwesome.Button
                        color='#000000'
                        name='heart'
                        size={20}
                        style={{ backgroundColor: 'white' }}
                        onPress={() => { props.navigation.navigate('Interets') }}>
                        <Text style={{ color: '#000000' }}>Interests</Text>
                    </FontAwesome.Button>

                    {/* Logout Button */}
                    <MaterialCommunityIcons.Button
                        style={{ backgroundColor: '#4267B2' }}
                        onPress={() => { props.navigation.navigate('Login') }}>
                        <LoginButton onLogoutFinished={() => props.navigation.navigate('Login')} />
                    </MaterialCommunityIcons.Button>
                </Content>
            </Container>
        </ScrollView>
    </SafeAreaView>
);

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#FB6600' },
            headerTitleStyle: {
                color: '#fff'
            },
            title: 'Home',
            headerLeft: (
                <Icon name='menu' size={25} onPress={() => { navigation.openDrawer() }} style={{ padding: 10, color: '#191919' }} />
            )
        }),
    }
}, {
        showIcon: true,
    });

const InterestsStack = createStackNavigator({
    Interets: {
        screen: Interets,
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#FB6600' },
            headerTitleStyle: {
                color: '#fff'
            },
            title: 'Interests',
            headerLeft: (
                <Icon name='menu' size={25} onPress={() => { navigation.openDrawer() }} style={{ padding: 10 }} />
            )
        }),
    }
}, {
        showIcon: true,
    });

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack
    },
    Interets: {
        screen: InterestsStack
    }
}, {
        initialRouteName: 'Home',
        showIcon: true,
        contentComponent: CustomDrawerComponent,
        drawerWidth: (widthDim / (4 / 3))
    });

const LoginStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    }
})
const MainContainer = createSwitchNavigator({
    App: {
        screen: DrawerNavigator,
    },
    Auth: {
        screen: LoginStack
    },
}, {
        showIcon: true,
        initialRouteName: 'Auth'
    });
export const Main = createAppContainer(MainContainer);