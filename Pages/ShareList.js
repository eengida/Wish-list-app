import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyle from "../assets/styles/AuthStyle";
import { View, Text,Button } from "react-native";
import { Touchable } from "react-native";
import { Share } from "react-native";
import files from "../assets/Base64";



const Sharing = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Here is my wish-listtt...',
          url: files.image    //not working for now
          
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};

export default Sharing;