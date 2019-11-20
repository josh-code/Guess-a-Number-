import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import {} from "galio-framework";

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid
        })
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: "15%",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: Platform.OS === "android" ? "#ff126e" : "white"
  },
  headerAndroid: {
    backgroundColor: "#ff126e"
  },
  headerIos: {},
  headerTitle: {
    color: Platform.OS === "ios" ? "#ff126e" : "white",
    fontSize: 20
  }
});

export default Header;
