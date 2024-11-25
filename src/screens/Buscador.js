import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from "react-native-web";
import { auth, db } from '../firebase/config'

export default class Home extends Component{
    constructor(){
        super()
        this.state={
            buscar: ''
        }
    }
    onSubmit(){
        
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Buscador</Text>
                <TextInput style={styles.input}
                    placeholder="busca algo"
                    onChangeText={(text) => this.setState({ buscar: text })}
                    value={this.state.buscar}
                />
                <TouchableOpacity style={styles.boton} onPress={() => this.onSubmit(this.state.buscar)}>
                    <Text style={styles.texto}> Buscar </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
