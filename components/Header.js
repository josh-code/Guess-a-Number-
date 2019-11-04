import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "galio-framework";

const Header = props => {
  return (
    <View style={styles.header}>
      <Text p color="white">
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    paddingTop: "12%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff126e"
  },
  headerTitle: {}
});

export default Header;
