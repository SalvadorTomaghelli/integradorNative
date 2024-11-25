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
        <View style = {styles.comentarios}>
            <Text style = {styles.textoArriba}>{this.props.infoComentarios.data.comentario}</Text>
            <Text style = {styles.textoAbajo}>Autor: {this.props.infoComentarios.data.email}</Text>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({

    comentarios:{
      alignItems: 'flex-start',
      width: '50%',
      padding: 10,          
      borderRadius: 10,
      margin: 10,         
      marginBottom: 20,
      borderWidth: 2
    },
    textoAbajo:{
      borderTopWidth: 2,
      color: 'black',
    },
    textoArriba:{
      paddingBottom: 5
    },
    titulo:{
      fontSize: 30
  },
})

  export default Comentarios;