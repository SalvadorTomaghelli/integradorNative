import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from "react-native-web";
import { auth, db } from '../firebase/config'



export default class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email: "",
            userName: "",
            password: "",
            bio: "",
            createdAt: ""

        }
    }
    //esto de aca para ver que el usuario esta logueado, xq no podes registrarte estando logueado.
    // componentDidMount(){
    //     auth.onAuthStateChanged(user => {
    //         if(user){
    //             this.props.navigation.navigate("Home")
    //         }
    //     })
    // }


    handleSubmit(){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => 
        this.setState({registred: true}),
        db.collection('users').add({
            email: this.state.email,
            bio:this.state.bio,
            userName: this.state.userName,
            createdAt: Date.now(),
        })
        )
        .then(() => this.props.navigation.navigate("Usuarios"))
        .catch((error) => this.setState({ error: "Fallo el registro" }))
    }



    render(){

        return(
        <View style={styles.container}>
            <Text>Formulario del Register</Text>

            <Text>Navegacion cruzada a Login</Text>

            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                <Text>Ya tengo cuenta</Text>
            </TouchableOpacity> */}

            <TextInput style = {styles.field}
            keyboardType = 'email-address'
            placeholder = 'email'
            onChangeText = {text => this.setState({email:text})}
            value = {this.state.email}
            />
            <TextInput style = {styles.field}
            keyboardType = 'default'
            placeholder = 'userName'
            onChangeText = {text => this.setState({userName:text})}
            value = {this.state.userName}
            />
            <TextInput style = {styles.field}
            keyboardType = 'default'
            placeholder = 'password'
            secureTextEntry = {true}
            onChangeText = {text => this.setState({password:text})}
            value = {this.state.password}
            />
            <TouchableOpacity onPress ={() => this.handleSubmit()}>
                <Text>Register</Text>
            </TouchableOpacity>
            
        </View>
    )
    }
    
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: '100%',
        padding: 10
    },
})
