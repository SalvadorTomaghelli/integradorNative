import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from "react-native-web";
import { auth, db } from '../firebase/config'


export default class Profile extends Component{
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          logued: false,
          err: ""
        };
      }
    //   componentDidMount(){
    //       console.log(user)
    //   }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("Login")
            }
        })
    }
    
    render(){
        return(
            <View>
                <Text>Profile</Text>
                <Text>Nombre: {auth.currentUser.userName}</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                
            </View>
        )
    }
}