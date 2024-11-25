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
            registrado: false,
            error: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('HomeMenu')
            }
        })
    }

    isEmailValid(){
        if ((this.state.email === '') || (!this.state.email.includes('@'))){
            this.setState({error: 'email invalido'})
            console.log(this.state.error)
            return false
        } else {
            return true
        }
    }

    isUserNameValid(){
        if (this.state.userName === ''){
            this.setState({error: 'Nombre de usuario invalido'})
            return false
        } else {
            return true
        }
    }

    isPasswordValid(){
        if ((this.state.password === '') || (!this.state.password >= 6)){
            this.setState({error: 'contrasena invalida'})
            return false
        } else {
            return true
        }    
    }


    isFormValid(){
        if(this.isEmailValid() && this.isUserNameValid() && this.isPasswordValid()) {
            return true
        } else {
            return false
        }
        
    }



    handleSubmit(){
        if (this.isFormValid()){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
            this.setState({registrado: true});

        return db.collection('users').add({
            email: this.state.email,
            password:this.state.password,
            userName: this.state.userName,
            createdAt: Date.now(),
        });


        })
        .then(() => this.props.navigation.navigate("Login"))
        .catch((error) => this.setState({ error: error.message }))
    }}



    render(){

        return(
        <View style={styles.container}>
            <Text style = {styles.titulo}>Registrate</Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                <Text style = {styles.logueo}>Ya tengo cuenta</Text>
            </TouchableOpacity>

            <TextInput style = {styles.field}
            keyboardType = 'email-address'
            placeholder = 'email'
            onChangeText = {text => this.setState({email:text})}
            value = {this.state.email}
            />
            <TextInput style = {styles.field}
            placeholder = 'user name'
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
            <TouchableOpacity  onPress ={() => this.handleSubmit()}>
                <Text style = {styles.register}>Register</Text>
            </TouchableOpacity>

            {this.state.error ? (
            <Text style = {styles.error}>{this.state.error}</Text>):
            null}
            
        </View>
    );
    }}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: 'rgb(82 65 65)',
        height: '100%'
    },
    field: {
        backgroundColor: 'gray',
        borderRadius: 5,
        padding: 10,
        margin: 5
    },
    error: {
        color: 'white',
        backgroundColor: '#e77575',
        borderRadius: 5,
        padding: 10,
        marginTop: 5
    },
    register: {
        textDecorationLine: 'underline',
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 5,
        padding: 5
    },
    titulo:{
        fontSize: 30
    },
    logueo:{
        color: 'rgb(161 161 236)',
        textDecorationLine: 'underline'
    }
})
