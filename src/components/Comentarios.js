import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import AntDesign from "@expo/vector-icons/AntDesign";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      cantLikes: props.infoComentarios.data.likes
        ? props.infoComentarios.data.likes.length
        : 0,
    };
  }

  componentDidMount() {
    if (
      this.props.infoComentarios.data.likes &&
      this.props.infoComentarios.data.likes.includes(auth.currentUser.email)
    ) {
      this.setState({
        liked: true,
      });
    }
  }
  
  like() {
    db.collection("comentarios")
      .doc(this.props.infoComentarios.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState((prevState) => ({
          liked: true,
          cantLikes: prevState.cantLikes + 1,
        }));
      });
  }

  unLike() {
    db.collection("comentarios")
      .doc(this.props.infoComentarios.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState((prevState) => ({
          liked: false,
          cantLikes: prevState.cantLikes - 1,
        }));
      });
  }

  deleteComentario() {
    db.collection("comentarios")
      .doc(this.props.infoComentarios.id)
      .delete()
  }

  render() {
    const { email, comentario, createdAt } = this.props.infoComentarios.data;

    return (
      <View style={styles.comentarios}>
        <Text style={styles.textoArriba}>Autor: {email}</Text>
        <Text style={styles.textoAbajo}>{comentario}</Text>
        <Text>{new Date(createdAt).toLocaleString()}</Text>


        {this.state.liked ? (
          <TouchableOpacity
            onPress={() => this.unLike()}
          >
            <AntDesign name="like1" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this.like()}
          >
            <AntDesign name="like2" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text>Cantidad de likes: {this.state.cantLikes}</Text>

      
        <TouchableOpacity
  
          onPress={() => this.deleteComentario()}
        >
          <Text>Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  comentarios:{
    alignItems: 'flex-start',
    width: '60%',
    padding: 10,          
    borderRadius: 10,
    margin: 10,         
    marginBottom: 20,
    borderWidth: 2,
    backgroundColor: 'rgb(242 243 220)'
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
