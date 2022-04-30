import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { auth } from './firebase'
import { useNavigation } from '@react-navigation/core'
import StyledButtons from '../StyledButtons'
import { ImageBackground } from 'react-native'

const HomeScreen = (props) => {

    const navigation = useNavigation();

     const handleSignout=()=>{
       auth.signOut().then(()=>{
         navigation.replace("Login")

       })
     }

  return (
    <View style = {styles.container}>
       <ImageBackground
       source = {require('../assets/paper.jpg')}
       style=  {styles.photo}
      
      
      />
      <Text style={{ marginTop: 0 }}>User:{auth.currentUser?.email}</Text>
      <TouchableOpacity 
      onPress={handleSignout}
      style = {styles.button}
      >
      <Text style = {styles.buttonText}>Sign out</Text>

      </TouchableOpacity>
      <View style = {styles.buttonContainer}>

        <StyledButtons 
        content = {"Add Item"}
        onPress = {()=>
        {
        navigation.navigate("AddItem");
      }}
       
        
        />

      <StyledButtons 
        content = {"Friends"}
        onPress = {()=>
        {
        navigation.navigate("FriendScreen");}}
       
        
        />
        <StyledButtons 
        content = {"Notifications"}
        onPress = {()=>
        {
        navigation.navigate("Notifications");;
      }}
       
        
        />

      <StyledButtons 
        content = {"Lists"}
        onPress = {()=>
        {
        navigation.navigate("ListScreen");
      }}
       
        
        />   
        <StyledButtons 
        content = {"My Profile"}
        onPress = {()=>
        {console.warn('Profile is pressed');
        navigation.navigate("Profile");
      }}
       
        
        /> 

      <StyledButtons 
        content = {"Share"}
        onPress = {()=>
        {console.warn('Share is pressed');
        navigation.navigate("ShareList");
      }}
       
        
        /> 

<StyledButtons 
        content = {"Cameras"}
        onPress = {()=>
        {
        navigation.navigate("Cameras");
      }}
       
        
        /> 


      </View>
    </View>
  )
}

    
  


export default HomeScreen

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    
      },
    
    
      buttonText:{
        color:'white',
        fontWeight:'500',
        fontSize:16,
    
      },
      button:{
        backgroundColor: "brown",
               width:'80%',
               padding: 5,
               borderRadius:10,
               alignItems:'center',
               marginTop: 0
      },
      buttonContainer:{
        position:'absolute',
        top:40,
        width:'100%'
      },
      photo:{
        width:'100%',
        height:'90%',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
        
        

      }
    

    
})