import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";

class comentarioForm extends Component {
  constructor() {
    super();
    this.state = {
      comentario: "",
    };
  }
//   componentDidMount(){
//     auth.onAuthStateChanged(user => {
//         if(user){
//             this.props.navigation.navigate("Login")
//         }
//     })
// }
  onSubmit(comentario) {
    // console.log(
    //   "Valores del comentario:",
    //   "comentario:",
    //   this.state.comentario,
    // );\
    db.collection("comentarios").add({
      email: auth.currentUser.email,
      comentario: this.state.comentario,
      createdAt: Date.now(),
      likes:[]
    })
  }
  render() {
    return (
      <View style= {styles.container}>
        <Text>Nuevo comentario</Text>
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

export default comentarioForm;