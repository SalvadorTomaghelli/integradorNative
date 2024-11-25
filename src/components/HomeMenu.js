import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from '../firebase/config'
import Home from "../screens/Home";
import AntDesign from "@expo/vector-icons/AntDesign";
import Profile from "../screens/Profile";
import CraerPost from "../screens/CrearPost";
import Buscador from "../screens/Buscador";



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
          name="CrearPost"
          component={(props) => <CraerPost {...props} />}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="plus" size={24} color="black" />,
          }}
        />
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />,
          }}/>
        <Tab.Screen
          name='Buscador'
          component={Buscador}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="search1" size={24} color="black" />,
          }} />
      </Tab.Navigator>
    );
  }
}

export default HomeMenu;