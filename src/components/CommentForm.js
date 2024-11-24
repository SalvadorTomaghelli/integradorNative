import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
    };
  }
  onSubmit() {
    console.log(
      "Valores del comentario:",
      "comentario:",
      this.state.comment,
    );
  }
  render() {
    return (
      <View style= {styles.container}>
        <TextInput style= {styles.input}
          placeholder="comentario"
          onChangeText={(text) => this.setState({ comment: text })}
          value={this.state.comment}
        />
        <TouchableOpacity style= {styles.boton} onPress={() => this.onSubmit()}>
          <Text style= {styles.texto}> Enviar </Text>
        </TouchableOpacity>{" "}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    marginTop: 20,

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
    border: '1px solid #28a745'
  },
  texto: {
    color: '#fff',
    textAlign: 'center',

  }


});

export default CommentForm;