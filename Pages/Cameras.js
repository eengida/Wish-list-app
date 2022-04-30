
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      

    })();
  }, []);
  const takePicture = async () =>{
      //block the code till pic is taken
    if(camera){
        const data = await camera.takePictureAsync(null);
        //console.log(data.uri);
        //temp file |
        setImage(data.uri);
    }


  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

if (!result.cancelled) {
  setImage(result.uri);
}
};



 //if null-> something went wrong-
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex:1}}>
      <Camera style={{flex:1}} type={type}
          //accessing camera
         ref = {ref => setCamera(ref)}
      >
        <View style={{flex:1,backgroundColor:'transparent',flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity
           style = {{flex:0.3,alignSelf:'flex-end',alignItems:'center'}}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              <Text style = {{fontSize:18,marginBottom:10,color:'white'}}> Flipp </Text>
           
          </TouchableOpacity>
          <TouchableOpacity
           style = {{flex:0.3,alignSelf:'flex-end',alignItems:'center'}}
           onPress={ () => takePicture()} >
             <Text style = {{fontSize:18,marginBottom:10,color:'white'}}> takePic</Text>
            </TouchableOpacity>
            <TouchableOpacity
           style = {{flex:0.3,alignSelf:'flex-end',alignItems:'center'}}
           onPress={ () => pickImage()} >
             <Text style = {{fontSize:18,marginBottom:10,color:'white'}}> CameraRoll</Text>
            </TouchableOpacity>
            {image && <Image source = {{uri:image}} style ={{flex:1}} />}
        </View>
      </Camera>
     
    </View>
    
  );
}


const styles = StyleSheet.create({
    camera: {
       flex: 1,
       flexDirection:'row'
    },
    buttonContainer:{
        flex:1,
        aspectRatio:1
    },
    button:{
      width:'100%',
      height:'100%',
      textAlign:'center'
    },
    text:{
        backgroundColor:'black',
        color:'white'
    }
}); 


