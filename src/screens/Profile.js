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
            <View >
                <Text >Profile</Text>
                <Text >Nombre: {this.state.userName}</Text>
                <Text >Email: {auth.currentUser.email}</Text>
                <Text>Cantidad de comentarios: {this.state.comentarios.length}</Text>
                <Text>
                    Comentarios: {this.state.comentarios.length === 0 ? (<Text>No hay posteos aun</Text>) :
                        <FlatList data={this.state.comentarios} keyExtractor={item => item.id.toString()} renderItem={({ item }) => { return <Comentarios infoComentarios={item} /> }} />}
                </Text>
                <TouchableOpacity onPress={() => this.handleLogout()}>
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}