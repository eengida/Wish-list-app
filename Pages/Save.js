import React from 'react'
import { View, Image, StyleSheet, Button, Text } from 'react-native'
import { auth, db, storage } from './firebase';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

export default function Save(props) {

    const uploadImage = async ( type ) => {
        const uri = props.route.params.image;
        var childPath = '';
        var alertMsg = '';

        if(type === "image") {
            childPath = `image/${auth.currentUser.uid}/${Math.random().toString(36)}`;
            alertMsg = 'Image successfully saved!';
        } else {
            childPath = `image/${auth.currentUser.uid}/profilePicture.jpeg`;
            alertMsg = 'Successfully set profile picture!'
        }

        const myDoc = doc(db, "users", auth.currentUser.uid)
        
        const response = await fetch(uri);
        const blob = await response.blob();
        const task = 
            storage
            .ref()
            .child(childPath)
            .put(blob)
        console.log("task passed");
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = snapshot => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot);
                alert(alertMsg);
                myDoc.update({profilePicId: snapshot});
            })
        }

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
        alert('Uploading...');
    }
    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly'}}>
            <Image source={{uri: props.route.params.image}} style={{ flex: 1, resizeMode: 'contain', flexDirection: 'row', width: '100%', height: '100%'}}/>
            <Button title="Save" onPress={() => uploadImage("image")}/>
            <Button title="Make Profile Picture" onPress={() => uploadImage("profile")}/>
        </View>
    )
}
const styles = StyleSheet.create({
    cameraContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    fixedRatio: {
      flex: 1,
      aspectRatio: 2 / 3
    }
  })
