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
            <View style={styles.container}>
                <Text style={styles.titulo}>Buscador</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Busca un nombre"
                    value={this.state.buscarUser}
                    onChangeText={(text) => { this.setState({ buscarUser: text }); this.onSubmit(text);}}
                />
                <FlatList data = {this.state.users}  
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => <Text style={styles.resultado}> {item.data.userName}</Text>}/>
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgb(82, 65, 65)", // Fondo oscuro, igual que el Home
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(242, 243, 220)", // Color claro para el texto
    backgroundColor: "black",
    textAlign: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "rgb(242, 243, 220)", // Fondo claro para contraste
    color: "black",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  resultado: {
    fontSize: 16,
    color: "rgb(242, 243, 220)", // Color del texto de los resultados
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
});
