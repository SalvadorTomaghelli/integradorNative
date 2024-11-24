import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from "react-native-web";
import { auth, db } from '../firebase/config'

export default class Home extends Component{
    
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(!user){
                this.props.navigation.navigate("Login")
                console.log("no estas logueado!!!!!!!!!!!!")
            }
        })
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