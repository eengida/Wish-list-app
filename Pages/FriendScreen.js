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
});
