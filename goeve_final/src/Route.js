import React, { Component } from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Home from "./components/Home";
import Interets from "./components/Interets";
import CustomDrawer from "./components/CustomDrawer";
import Login from "./components/Login";

const { width: widthDim } = Dimensions.get("window");

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: "#FB6600" },
        headerTitleStyle: {
          color: "#fff"
        },
        title: "Home",
        headerLeft: (
          <Icon
            name="menu"
            size={25}
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{ padding: 10, color: "#191919" }}
          />
        )
      })
    }
  },
  {
    showIcon: true
  }
);

const InterestsStack = createStackNavigator(
  {
    Interets: {
      screen: Interets,
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: "#FB6600" },
        headerTitleStyle: {
          color: "#fff"
        },
        title: "Interests",
        headerLeft: (
          <Icon
            name="menu"
            size={25}
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{ padding: 10 }}
          />
        )
      })
    }
  },
  {
    showIcon: true
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Interets: {
      screen: InterestsStack
    }
  },
  {
    initialRouteName: "Home",
    showIcon: true,
    contentComponent: CustomDrawer,
    drawerWidth: widthDim / (4 / 3)
  }
);

const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
});
const MainContainer = createSwitchNavigator(
  {
    App: {
      screen: DrawerNavigator
    },
    Auth: {
      screen: LoginStack
    }
  },
  {
    showIcon: true,
    initialRouteName: "Auth"
  }
);
export const Main = createAppContainer(MainContainer);
