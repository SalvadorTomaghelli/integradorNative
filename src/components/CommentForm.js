import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";

class comentarioForm extends Component {
  constructor() {
    super();
    this.state = {
      comentario: "",
    };
  }

  onSubmit() {
    db.collection("comentarios").add({
      email: auth.currentUser.email,
      comentario: this.state.comentario,
      createdAt: Date.now(),
      likes:[]
    })
    this.props.navigation.navigate('Home')
  }
  render() {
    return (
      <View style= {styles.container}>
        <Text style={styles.titulo}>Agrega un comentario</Text>
        <TextInput style= {styles.input}
          placeholder="comenta algo"
          onChangeText={(text) => this.setState({ comentario: text })}
          value={this.state.comentario}
        />
        <TouchableOpacity style= {styles.boton} onPress={() => this.onSubmit(this.state.comentario)}>
          <Text style= {styles.texto}> Enviar </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:10,

  },
    input: {
    height:20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    border: '1px #ccc solid',
    borderRadius: 6,
    marginVertical: 10

  },
  boton: {
    backgroundColor:'#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    border: '1px solid #28a745',
    borderRadius: 10,
    width: '10%',
  },
  texto: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    textDecorationLine: 'underline'


  },
  titulo:{
      fontSize: 40
  }


});

export default comentarioForm;