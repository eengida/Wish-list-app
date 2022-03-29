import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyle from "../assets/styles/AuthStyle";
import { View, Text } from "react-native";
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
  const [wishList, setWishList] = useState(["apple"]);

  console.log(wishList);

  // useEffect(() => {
  //   onSnapshot(
  //     collection(db, "wishlists", (snapshot) => {
  //       setWishList(snapshot.docs.map((doc) => doc.data()));
  //     })
  //   );
  // }, []);

  return (
    <SafeAreaView style={AuthStyle.container}>
      <View>
        <Text>Current Wishlists</Text>
      </View>
    </SafeAreaView>
  );
}
