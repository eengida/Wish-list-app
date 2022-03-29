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

const ListItems = ({ item }) => {
  console.log("type of variable is:" + typeof item);

  //   console.log("name is: ", item.uid);

  return <Text>This is ListItems component </Text>;
};

export default ListItems;
