import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "galio-framework";

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <Text h3 color="white">
        Game over!
      </Text>
      <Text p>Found number in {props.rounds} gusses!!</Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          color="primary"
          onPress={() => props.resetGame()}
        >
          Play Again
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingVertical: "20%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff126e"
  },
  buttonContainer: {
    marginTop: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  button: {
    width: "47%",
    height: 150
  }
});

export default GameOver;
