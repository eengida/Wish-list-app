import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthStyle from '../assets/styles/AuthStyle'
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import { deleteDoc, doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Searchbar }from 'react-native-paper'
import SearchBar from "../Components/SearchBar";
import List from "../Components/List";


export default function FriendScreen() {
  const [search, setSearch] = useState("")
  const [clicked, setClicked] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false)
  const [userList, setUserList] = useState([])

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
    const myDoc = doc(db, "users", "userList")

    getDoc(myDoc)
    .then((snapshot) => {
      if(snapshot.exists) {
        setUserDoc(snapshot.data())
        setUserList(snapshot.data().users)
      } else {
        alert("No Users found!")
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

  const onChangeSearch = (query) => {
    setSearch(query)
  }

  return (
    <SafeAreaView style={AuthStyle.container}>
        <View>
        {/* <TextInput style={styles.input} placeholder={'Enter username'} onChangeText={text => setSearch(text)} /> */}
        {/* <Searchbar
          placeholder="Enter Username"
          onChangeText={onChangeSearch}
          value={search}
    /> */}
        <SearchBar
        searchPhrase={search}
        setSearchPhrase={setSearch}
        clicked={clicked}
        setClicked={setClicked}
      />
        <FlatList 
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          keyExtractor = {(item, index) => index.toString()}

          />
        </View>
    </SafeAreaView>
  )
}
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
