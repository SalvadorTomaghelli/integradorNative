import React, {Component} from "react";
import { View,Text, FlatList, StyleSheet } from "react-native";
import { db } from '../firebase/config'
import Comentarios from "../components/Comentarios";



export default class Home extends Component{
    constructor(){
        super()
        this.state={
            comentarios:[]
        }
    }
    componentDidMount(){
        db.collection('comentarios').orderBy('createdAt','desc').onSnapshot((docs)=>{
            let comentarios=[]
            docs.forEach((doc)=>{
                comentarios.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            this.setState({comentarios:comentarios})
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                <Text style= {styles.titulo}>
                    Comentarios de la comunidad:
                    
                </Text>
                {this.state.comentarios.length === 0 ? (<Text>No hay posteos aun</Text>) : 
                <FlatList 
                data={this.state.comentarios} 
                keyExtractor={item => item.id.toString()} 
                renderItem={({item})=>{return <Comentarios infoComentarios={item}/>}}/>} 
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor: 'rgb(82 65 65)',
        display: 'center'
    },
    titulo:{
        fontSize: 15,
        backgroundColor: 'black',
        color: 'rgb(242 243 220)',
        borderRadius: 10,
        width: '20%',
        margin: 10,
        padding: 15,
        textDecorationLine: 'underline'
    },
})
