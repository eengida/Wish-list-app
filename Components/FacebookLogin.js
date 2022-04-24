import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Facebook from 'expo-facebook';

//console.disableYellowBox = true;

export default function App() {

  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  const facebookLogIn = async () => {
    try {
         await Facebook.initializeAsync({
           appId:'701607807950649',
         });
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync( {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  }

  return (
    isLoggedin ?
      userData ?
        <View style={styles.container1}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 50 }}
            source={{ uri: userData.picture.data.url }}
            onLoadEnd={() => setImageLoadStatus(true)} />
          <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{ position: "absolute" }} />
          <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {userData.name}!</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
        </View> :
        null
      :
      <View style={styles.container1}>
        <Image
          style={{ width: 27, height: 20, borderRadius: 5, marginVertical: 2 }}
          source={require("../assets/fb-logo.png")} />
        <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={facebookLogIn}>
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>

      </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "brown",
    width:'100%',
    padding: 15,
   
    alignItems:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    color:'white',
    width : '100%',
    backgroundColor:'#87ceeb',
         fontWeight:'700',
         fontSize:15,
    borderRadius: 60
  },
  buttonText:{
    color:'black',
    fontWeight:'700',
    fontSize:16

},
buttonOutline:{
  marginTop: 5,
  backgroundColor:'blue',
  borderColor:'black',
  borderWidth:2


},
button:{
  backgroundColor: "brown",
  width:'100%',
  padding: 8,
  borderRadius:6,
  alignItems:'center'

},
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",

    bottom: 0
  },
});