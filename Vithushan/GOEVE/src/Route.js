import React, {
    Component
} from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from "react-navigation";
import Interests from './components/Interests';



const interestsStack = createStackNavigator({
    Home: {
        screen: Interests,
        navigationOptions: {
            header: null,
        },
    }
}, {
      showIcon: true,
});

const MainContainer = createSwitchNavigator({
    App: {
        //screen: HomeStack,
        screen: interestsStack,
    },
},{
     showIcon: true,
});
export const  Main = createAppContainer(MainContainer);