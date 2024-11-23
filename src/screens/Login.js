import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from "react-native-web";
import { auth, db } from '../firebase/config'

class Login extends Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: "",
        logued: false,
        err: ""
      };
    }
    componentDidMount(){
      auth.onAuthStateChanged(user => console.log('el usuario es:', user))
    }
    onSubmit() {
      console.log(
        "Valores del form:",
        "mail",
        this.state.email,
        "pass",
        this.state.password
      );
      auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => this.setState({logued:true}))
      .catch(e => this.setState({error: 'fallo el logueo'}))
    }
  
    render() {
      return (
        <View>
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
          <TouchableOpacity onPress={() => this.onSubmit()}>
            <Text > Login </Text>
          </TouchableOpacity>{" "}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text>Ir al registro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text>Entrar a la app</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  
  export default Login;