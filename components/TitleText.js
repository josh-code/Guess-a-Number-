import React from "react";
import { Text, StyleSheet } from "react-native";

const TitleText = props => <Text style={styles.title}>{props.text}</Text>;

const styles = StyleSheet.create({
  title: {
    fontFamily: "gotham",
    fontSize: 18
  }
});

export default TitleText;
