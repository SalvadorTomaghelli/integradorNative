import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";

class Comentarios extends Component {
    constructor() {
      super();
      this.state = {
        liked: false,
        cantlikes: ""
      };
    }
  
    render() {
      return (
        <View>
            <Text>{this.props.infoComentarios.data.comentario}</Text>
            <Text>Autor: {this.props.infoComentarios.data.email}</Text>
        </View>
      );
    }
  }

  export default Comentarios;