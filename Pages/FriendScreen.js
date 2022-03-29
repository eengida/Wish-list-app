import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";

import AuthStyle from "../assets/styles/AuthStyle";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ListItems from "../Components/ListItems";

export default function FriendScreen() {
  const navigation = useNavigation();
  const [wishlists, setWishlists] = useState([
    {
      name: "user1",
      uid: "2Xg5CdLavvXW9goE80qRNMuwi293",
      addedItems: ["Book", "Shoes", "Potato"],
    },
    {
      name: "user2",
      uid: "SPnKNxwFxic8TldzFTN0J1QbDEu2",
      addedItems: ["monitor", "PC", "cellphone"],
    },
    {
      name: "user3",
      uid: "hQW3dwHmcIXxfzNtRuuja8DsPN12",
      addedItems: ["A", "S", "F", "G"],
    },
    { name: "user4", uid: "urmupomSalXbk7n1qZJgmlY5KNg2", addedItems: [""] },
    {
      name: "user5",
      uid: "vrt4xl3R7teaR3II4mWAAUJJuE13",
      addedItems: ["Bike"],
    },
  ]);
  return (
    // <SafeAreaView style={AuthStyle.container}>
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Friends List</Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.uid}
        data={wishlists}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ListItems", (item = { item }))}
          >
            <Text style={styles.item}>{item.uid}</Text>
          </TouchableOpacity>
        )}
      />
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthStyle from '../assets/styles/AuthStyle'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { deleteDoc, doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { auth, db } from './firebase';


export default function FriendScreen() {
  const [search, setSearch] = useState()
  const [dataLoaded, setDataLoaded] = useState(false)

  const userDB = collection(db, "items");
  const userID = auth.currentUser.uid;

  // Storing User Data
  const [userDoc, setUserDoc] = useState(null)
  // Update Text
  const [text, setText] = useState("")
  // MARK: CRUD Functions

  //load database
  const getItems = () =>
  {
    const myDoc = doc(db, "wishlists", auth.currentUser.uid)

    getDoc(myDoc)
    .then((snapshot) => {
      if(snapshot.exists) {
        setUserDoc(snapshot.data())
      } else {
        alert("No Wishlist found!")
      }
    })
    .catch((error) => {
      alert(error.message)
    })
    setDataLoaded(true);
  }

  if (dataLoaded == false) {
    getItems();
  }



  const Create = () => {
    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    const myDoc = doc(db, "wishlists", auth.currentUser.uid)

    // Your Document Goes Here
    const docData = {
      addedItems
    }

    setDoc(myDoc, docData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Successfully saved to wishlist!")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })
  }
  return (
    <SafeAreaView style={AuthStyle.container}>
        <View>
        <TextInput style={styles.input} placeholder={'Enter username'} onChangeText={text => setSearch(text)} />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 10,
    backgroundColor: "pink",
    fontSize: 24,
    // marginHorizontal: 10,
  },

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: '35%'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
