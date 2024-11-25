import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import {auth} from '../firebase/config'

export default class Login extends Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: "",
        logueado: false,
        error: ""
      };
    }

    componentDidMount(){
        auth.onAuthStateChanged(() => {
            if (this.state.logueado) {
                this.props.navigation.navigate('Home')
            }
        })
    }

    isEmailValid(){
      if ((this.state.email === '') || (!this.state.email.includes('@'))){
          this.setState({error: 'email invalido'})
          console.log(this.state.error)
          return false
      } else {
          return true
      }
  }

  isPasswordValid(){
    if ((this.state.password === '') || (!this.state.password >= 6)){
        this.setState({error: 'contrasena invalida'})
        return false
    } else {
        return true
    }    
}


  isFormValid(){
  if(this.isEmailValid() && this.isPasswordValid()) {
      return true
  } else {
      return false
  } 
}



    handleSubmit() {
      if(this.isFormValid()){
      auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => this.setState({logueado:true}))
      .catch(e => this.setState({error: 'fallo el logueo'}))
      return console.log(this.state.logueado)

    } else {
      return this.setState({error : 'credenciales invalidas'})
    }
  }
  
    render() {
      return (
        <View>
            <Text> Inicia sesion</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="email"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
          {this.state.error ? (
            <Text>{this.state.error}</Text>):
            null}
          
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <Text > Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text>Ir al registro</Text>
          </TouchableOpacity>
        </View>
      );
    }}
