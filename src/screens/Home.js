import React, {Component} from "react";
import { View,Text, FlatList, StyleSheet } from "react-native";
import CommentForm from "../components/CommentForm";
import { TextInput } from "react-native-web";
import { auth, db } from '../firebase/config'
import Comentarios from "../components/Comentarios";



export default class Home extends Component{
    constructor(){
        super()
        this.state={
            comentarios:[]
        }
    }
    componentDidMount(){
        console.log("usuaRIO REGISTRADO?",JSON.stringify(auth.currentUser,null,4))
        db.collection('comentarios').orderBy('createdAt','desc').onSnapshot((docs)=>{
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
    render(){
        return(
            <View style = {styles.container}>
                <Text style= {styles.titulo}>
                    Comentarios de la comunidad
                    
                </Text>
                {this.state.comentarios.length === 0 ? (<Text>No hay posteos aun</Text>) : 
                <FlatList 
                data={this.state.comentarios} 
                keyExtractor={item => item.id.toString()} 
                renderItem={({item})=>{return <Comentarios infoComentarios={item}/>}}/>} 
                                                                                    {/*  fijarse si es toString()  */}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10
    },
    titulo:{
        fontSize: 30,
        marginBottom: 10
    },
})
