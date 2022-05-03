import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

export default function WishlistItems({}) {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        {route.params.wishList.map((item) => (
          <Text style={styles.listText}>{item}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "brown",
    flex: 1,
    // borderColor: "#eee",
  },
  listView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ba8d6b",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  listText: {
    fontSize: 18,
  },
});
