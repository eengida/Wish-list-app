import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import WishlistItems from "../Components/WishlistItems";

const Users = ({ item }) => {
  const navigation = useNavigation();

  //   const display = () => {
  //     return .map((item) => {
  //       return <Text>{item}</Text>;
  //     });
  //   };

  return (
    <TouchableOpacity
      style={styles.users}
      onPress={() =>
        navigation.navigate("WishlistItems", { wishList: item.list })
      }
      //   onPress={display}
    >
      <View style={styles.usersView}>
        <Text style={styles.usersText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  users: {
    padding: 20,
    backgroundColor: "#ba8d6b",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  usersView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usersText: {
    fontSize: 18,
  },
});

export default Users;
