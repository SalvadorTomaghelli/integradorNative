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
      auth.onAuthStateChanged((user) => {
        console.log("el user es: ",user)
          if (user) {
              this.props.navigation.navigate('HomeMenu')
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
  if (this.isFormValid()) {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        this.setState({ logueado: true }, () => {
          console.log(this.state.logueado);
          this.props.navigation.navigate("HomeMenu");
        });
      })
      .catch(e => {
        this.setState({ error: 'Credenciales invalidas' });
      });
  } 
}

  
    render() {
      return (
        <View style = {styles.container}>
            <Text style ={styles.titulo}> Inicia sesion</Text>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style ={styles.logueo}>Ir al registro</Text>
          </TouchableOpacity>
          <TextInput style ={styles.field}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput style ={styles.field}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
          
          
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <Text style ={styles.register}> Login </Text>
          </TouchableOpacity>

          {this.state.error ? (
            <Text style ={styles.error}>{this.state.error}</Text>):
            null}
          
        </View>
      );
    }}

    const styles = StyleSheet.create({
      container:{
          alignItems: 'center',
          width: '100%',
          padding: 10,
           backgroundColor: 'rgb(82 65 65)',
           height: '100%'
      },
      field: {
          backgroundColor: 'gray',
          borderRadius: 5,
          padding: 10,
          margin: 5
      },
      error: {
          color: 'white',
          backgroundColor: '#e77575',
          borderRadius: 5,
          padding: 10,
          marginTop: 5
      },
      register: {
          textDecorationLine: 'underline',
          backgroundColor: 'green',
          color: 'white',
          borderRadius: 5,
          padding: 5
      },
      titulo:{
          fontSize: 30
      },
      logueo:{
          color: 'rgb(161 161 236)',
          textDecorationLine: 'underline'
      }
  })