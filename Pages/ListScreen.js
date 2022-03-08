import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyle from "../assets/styles/AuthStyle";
import { View, Text } from "react-native";

export default function ListScreen() {
  const [wishList, setWishList] = useState([]);

  // console.log(wishList);

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
