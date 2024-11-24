import React, {Component} from "react";
import { View,Text, FlatList, } from "react-native";
import CommentForm from "../components/CommentForm";
import { TextInput } from "react-native-web";
import { auth, db } from '../firebase/config'



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
            this.setState({comentarios:comentarios},()=>console.log(this.state.comentarios))
        })
    }
    render(){
        return(
            <View>
                <Text>
                    Home
                    
                </Text>
                <CommentForm/>
                {this.state.comentarios.length === 0 ? (<Text>No hay posteos aun</Text>) : 
                <FlatList data={this.state.comentarios} keyExtractor={item => item.id.toString()} renderItem={({item})=>{return <Comentarios infoComentarios={item}/>}}/>} 
                                                                                    {/*  fijarse si es toString()  */}
            </View>
        )
    }
}