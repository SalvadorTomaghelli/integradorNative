import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth, db } from '../firebase/config'
import Home from "../screens/Home";
import AntDesign from "@expo/vector-icons/AntDesign";
import Profile from "../screens/Profile";

class HomeMenu extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
        if (!user) {
            this.props.navigation.navigate("Login")
        }
    })
}

  render() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
          }}
        />
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />,
          }}/>
      </Tab.Navigator>
    );
  }
}

export default HomeMenu;