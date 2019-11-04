import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text
} from "react-native";
import { Input, Button, Block } from "galio-framework";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmedValue, setConfirmedValue] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    Keyboard.dismiss();
    setEnteredValue("");
    setConfirmedValue(false);
    setSelectedNumber(NaN);
  };

  const confirmValueHandler = () => {
    Keyboard.dismiss();
    let chosenNumber = parseInt(enteredValue);
    if (chosenNumber <= 0 || chosenNumber > 99 || isNaN(chosenNumber)) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmedValue(true);
    setEnteredValue("");
    setSelectedNumber(chosenNumber);
  };

  let confirmedOutput;

  if (confirmedValue) {
    confirmedOutput = (
      <View style={styles.confirmedBox}>
        <Text
          h2
          style={{
            paddingBottom: 20,
            color: "white",
            fontSize: 50,
            fontFamily: "gotham"
          }}
        >
          {selectedNumber}
        </Text>
        <Button
          style={styles.button}
          color="transparent"
          onPress={() => props.setSelection(selectedNumber)}
        >
          Continue
        </Button>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text h4 style={{ fontFamily: "gotham" }}>
          Start a New Game!{" "}
        </Text>
        <View style={styles.input}>
          <Input
            placeholder="Enter a Number"
            type="number-pad"
            blurOnSubmit={true}
            maxLength={2}
            style={styles.input}
            onChangeText={numberInputHandler}
            value={enteredValue}
          ></Input>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={resetInputHandler}>
            Reset
          </Button>
          <Button
            style={styles.button}
            onPress={confirmValueHandler}
            color="primary"
          >
            Confirm
          </Button>
        </View>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingVertical: "20%",
    alignItems: "center"
  },
  input: {
    textAlign: "center",
    paddingVertical: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%"
  },
  button: {
    width: "47%"
  },
  confirmedBox: {
    width: "80%",
    // height: "10%",
    alignItems: "center",
    // justifyContent: "center",
    // borderColor: "grey",
    borderRadius: 10,
    // borderWidth: 1,
    marginVertical: 40,
    paddingVertical: 30,
    backgroundColor: "#ff126e"
    // elevation: 8
  }
});

export default StartGameScreen;
