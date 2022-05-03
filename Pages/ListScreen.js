import React, { useState, useEffect } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AuthStyle from "../assets/styles/AuthStyle";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import Users from "../Components/Users";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export default function ListScreen() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "friends"), (snapshot) =>
        setWishlist(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        // renderItem={({ item }) => <Text>{item.name}</Text>}
        renderItem={({ item }) => <Users item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "brown",
  },
});
