import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Comentarios from "../components/Comentarios";

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            userName: "",
            logued: false,
            err: "",
            comentarios:[]
        };
    }

    componentDidMount() {
        
        console.log('data: ', JSON.stringify(auth.currentUser, null, 4));

        
        db.collection('users')
            .where('email', '==', `${auth.currentUser.email}`)
            .onSnapshot((docs) => {
                let usuario = {};
                docs.forEach((doc) => {
                    usuario = doc.data(); 
                });

                this.setState({ userName: usuario.userName || "Nombre no disponible" });
            });
        db.collection('comentarios')
            .where('email','==',`${auth.currentUser.email}`).onSnapshot((docs)=>{
                let comentarios=[]
                docs.forEach((doc)=>{
                    comentarios.push({
                        id:doc.id,
                        data:doc.data(),
                    })
                })
                this.setState({comentarios:comentarios},()=>console.log(this.state.comentarios))
            })
    }

    handleLogout() {
        auth.signOut();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Profile</Text>
                <Text style={styles.info}>Nombre: {this.state.userName}</Text>
                <Text style={styles.info}>Email: {auth.currentUser.email}</Text>
                <Text style={styles.info}>Cantidad de comentarios: {this.state.comentarios.length}</Text>
                <Text>
                    Comentarios: {this.state.comentarios.length === 0 ? (<Text>No hay posteos aun</Text>) :
                        <FlatList data={this.state.comentarios} keyExtractor={item => item.id.toString()} renderItem={({ item }) => { return <Comentarios infoComentarios={item} /> }} />}
                </Text>
                <TouchableOpacity  onPress={() => this.handleLogout()} style={styles.boton}>
                    <Text style={styles.logout}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'rgb(82 65 65)', 
    },
    titulo: {
      fontSize: 30,
      backgroundColor: 'black',
      color: 'rgb(242 243 220)',
      borderRadius: 10,
      margin: 10,
      padding: 15,
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
    info: {
      fontSize: 18,
      color: 'rgb(242 243 220)', 
      marginVertical: 5,
      paddingHorizontal: 10,
    },
    boton: {
      backgroundColor: '#28a745',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
      marginTop: 20,
      width: '20%',
      alignSelf: 'center'

    },
    logout: {
      color: '#fff',
      textAlign: 'center',
      textDecorationLine: 'underline'
    }
  });