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
            createdAt: "",
        }
    }
    
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate("Home")
            }
        })
    }

    validarFormulario(){
        const email = this.state.email
        const userName = this.state.userName
        const password = this.state.password
        if (email !== '' && userName !== '' && password !== ''){
            return true
        }else{
            return false
        }
    }

    validarEmail(email) {
        return email.includes('@');
    }
    validarUserName(userName) {
        return userName !== '';
    }
    validarPassword(password) {
        return password.length >= 6;
    }
    

    handleSubmit(){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => 
        this.setState({registred: true}),
        db.collection('users').add({
            email: this.state.email,
            password:this.state.password,
            userName: this.state.userName,
            createdAt: Date.now(),
        })
        )
        .then(() => this.props.navigation.navigate("Login"))
        .catch((error) => this.setState({ error: "Fallo el registro" }))
    }



    render(){

        return(
        <View style={styles.container}>
            <Text>Formulario del Register</Text>

            <Text>Navegacion cruzada a Login</Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                <Text>Ya tengo cuenta</Text>
            </TouchableOpacity>

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
            <TouchableOpacity disabled={!this.validarFormulario()} onPress ={() => this.handleSubmit()}>
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
