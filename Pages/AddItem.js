import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Items from "../Components/Items";
import { deleteDoc, doc, getDoc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase";

export default function App() {
  const [item, setItem] = useState();
  const [addedItems, setAddedItems] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  // const [itemList, setItemList] = useState(null);
  // const [splitItemList, setSplitItemList] = useState(null);

  const userDB = collection(db, "items");
  const userID = auth.currentUser.uid;

  // Storing User Data
  const [userDoc, setUserDoc] = useState(null);
  // Update Text
  const [text, setText] = useState("");
  // MARK: CRUD Functions

  //load database
  const getItems = () => {
    const myDoc = doc(db, "wishlists", auth.currentUser.uid);

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
          setAddedItems(snapshot.data().addedItems);
        } else {
          alert("No Wishlist found!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    setDataLoaded(true);
  };

  if (dataLoaded == false) {
    getItems();
  }

  const Create = () => {
    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    const myDoc = doc(db, "wishlists", auth.currentUser.uid);

    // Your Document Goes Here
    const docData = {
      addedItems,
    };

    setDoc(myDoc, docData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Successfully saved to wishlist!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const handleAddItem = () => {
    Keyboard.dismiss();
    setAddedItems([...addedItems, item]);
    setItem(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...addedItems];
    itemsCopy.splice(index, 1);
    setAddedItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>WishLists</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            <Button title="Save" onPress={Create} />
            {/* <Button title='Load' onPress={getItems}/> */}
            {addedItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Items text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Item..."}
          value={item}
          onChangeText={(text) => setItem(text)}
        />
        <TouchableOpacity onPress={() => handleAddItem()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    alignItems: "center",
    marginLeft: "35%",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
