import { KeyboardAvoidingViewBase, StyleSheet, Text, View,TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import { KeyboardAvoidingView,TouchableOpacity } from 'react-native'
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ImageBackground } from 'react-native';
import {signInWithPopup,FacebookAuthProvider} from 'firebase/auth';

import Header from '../Header';


const LoginScreen = () => {

        const signInWithFacebook = ()=>{
            const provider = new FacebookAuthProvider();
            signInWithPopup(auth,provider)
            .then((re)=>{
              console.log(re);
            })
            .catch((err)=>{
               console.log(err.message);
            })

        }
    

         const [email, setEmail] =useState('')
         const [password, setpassword] =useState('')
         const navigation = useNavigation();

         useEffect(() =>{
            const unsubscribe = auth.onAuthStateChanged(user =>{
                if(user){
                    navigation.replace("Home")
                }
            })
            return unsubscribe;

        },[])

        

        const handleLogin = ()=>{
            signInWithEmailAndPassword(auth,email,password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("logged in",user.email);
            })
            .catch(error => alert(error.message))
        }



  return (

    <KeyboardAvoidingView
    style = {styles.container}
    behavior= 'padding'>
        <View style = {styles.container}> 
            <ImageBackground 
            source={require('../assets/gifts.png')}
            style = {styles.pic}
            />
            <Header/>
        </View>
        <View style = {styles.inputContainer}>
            <TextInput
            
            placeholder='Email'
            value={email}
            onChangeText = {text => setEmail(text)}
            style = {styles.input}

            />

            <TextInput
            
            placeholder='Password'
            value={password}
            onChangeText = {text =>setpassword(text) }
            style = {styles.input}
            secureTextEntry

            />


            </View>
            <View  style ={styles.buttonContainer} > 
                    <TouchableOpacity
                    onPress = {handleLogin}
                    style= {styles.button}
                    >                                   
            
                    <Text style = {styles.buttonText}> Login</Text>
            
                    </TouchableOpacity>



                    <TouchableOpacity
                    onPress = {signInWithFacebook}
                    style= {styles.button}
                    >                                   
            
                    <Text style = {styles.buttonText}> Login With Facebook</Text>
            
                    </TouchableOpacity>


            
                    <TouchableOpacity
                    onPress = {() => navigation.navigate("Register")}
                    style= {[styles.button, styles.buttonOutline]}               
                    >                                   
            
                    <Text style = {styles.buttonOutlineText}> Register</Text>
            
                    </TouchableOpacity>
            
                    </View>

            

      </KeyboardAvoidingView>

      
  )
}

export default LoginScreen

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'brown'
        
        
    },

    inputContainer:{
        width: '80%'

    },
     input:{
         backgroundColor:"green",
         paddingHorizontal:15,
         paddingVertical:10,
         borderRadius:10,
         marginTop:5,
         color:'white'
         



     },
     buttonContainer:{
         width: '60%',
         justifyContent:'center',
         alignItems:'center',
         marginTop:25

     },


     button:{
         backgroundColor: "brown",
         width:'100%',
         padding: 15,
         borderRadius:10,
         alignItems:'center'

     },
     buttonText:{
         color:'white',
         fontWeight:'700',
         fontSize:16

     },
     buttonOutline:{
         marginTop: 5,
         backgroundColor:'white',
         borderColor:'black',
         borderWidth:2


     },
     buttonOutlineText:{

     },
     pic:{
        width: "100%",
        height:"100%",
        resizeMode: "cover",
        position:'absolute'
     }


});