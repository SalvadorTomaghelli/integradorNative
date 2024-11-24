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
    
    render(){
        return(
            <View>
                <Text>
                    Home
                    
                </Text>
                
            </View>
        )
    }
}