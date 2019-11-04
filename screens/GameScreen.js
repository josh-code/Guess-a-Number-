import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button } from "galio-framework";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNo = Math.floor(Math.random() * (max - min)) + min;
  if (randomNo === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNo;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(1, 100, props.selectedNumber)
  );
  const [rounds, setRounds] = useState(1);
  const lowestGuess = useRef(1);
  const highestGuess = useRef(100);

  //   useEffect(() => {
  //     if (currentGuess === props.selectedNumber) {
  //       props.onGameOver(rounds);
  //     }
  //   });

  const narrowGuess = hint => {
    if (
      (hint === "lower" && currentGuess < props.selectedNumber) ||
      (hint === "higher" && currentGuess > props.selectedNumber)
    ) {
      return Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "sorry!", style: "cancel" }
      ]);
    }
    if (hint === "lower") {
      highestGuess.current = currentGuess;
    } else {
      lowestGuess.current = currentGuess;
    }
    let guessNum = generateRandomNumber(
      lowestGuess.current,
      highestGuess.current,
      currentGuess
    );
    if (guessNum === props.selectedNumber) {
      props.onGameOver(rounds + 1);
    }
    setRounds(rounds + 1);
    setCurrentGuess(guessNum);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.gameBox}>
        <Text h1 style={{ paddingBottom: 20, color: "white" }}>
          {currentGuess}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            color="transparent"
            onPress={() => narrowGuess("lower")}
          >
            Lower
          </Button>
          <Button
            style={styles.button}
            onPress={() => narrowGuess("higher")}
            color="transparent"
          >
            Higher
          </Button>
        </View>
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
  },
  gameBox: {
    width: "85%",
    // height: "10%",
    alignItems: "center",
    // justifyContent: "center",
    // borderColor: "grey",
    // borderRadius: 10,
    // borderWidth: 1,
    marginVertical: 40,
    paddingVertical: 30
    // backgroundColor: "#ff126e"
    // elevation: 8
  }
});

export default GameScreen;
