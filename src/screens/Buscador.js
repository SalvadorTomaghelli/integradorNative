import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList, TextInput } from "react-native-web";
import { auth, db } from '../firebase/config'

export default class Home extends Component{
    constructor(){
        super()
        this.state={
            buscarUser: '',
            users: [],
            todosUsers: []
        }
    }

    componentDidMount(){
        db.collection('users').orderBy('createdAt','desc').onSnapshot((docs)=>{
            let users=[]
            docs.forEach((doc)=>{
                users.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            this.setState({users:users, todosUsers:users},()=>console.log(this.state.users))
        })
    }

    onSubmit(text){
        const filtrado = this.state.todosUsers.filter((user1) => user1.data.userName.toLowerCase().includes(text.toLowerCase())
        ); this.setState({users: filtrado})
    }

    render(){
        return(

            <View>
                <Text>Buscador</Text>
                <TextInput
                    placeholder="Busca un nombre"
                    value={this.state.buscarUser}
                    onChangeText={(text) => { this.setState({ buscarUser: text }); this.onSubmit(text);}}
                />
                <FlatList data = {this.state.users}  
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => <Text> {item.data.userName}</Text>}/>
                
            </View>
        )
    }
}
