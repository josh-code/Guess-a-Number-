import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { ScreenOrientation } from "expo";
import { Text, Button } from "galio-framework";
import { Ionicons } from "@expo/vector-icons";

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
  //To lock screen Rotation
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomNumber(1, 100, props.selectedNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const lowestGuess = useRef(1);
  const highestGuess = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
      setAvailableDeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
      lowestGuess.current = currentGuess + 1;
    }
    let guessNum = generateRandomNumber(
      lowestGuess.current,
      highestGuess.current,
      currentGuess
    );
    if (guessNum === props.selectedNumber) {
      props.onGameOver(pastGuesses.length + 1);
    }
    setPastGuesses(initialGuesses => [guessNum, ...initialGuesses]);
    setCurrentGuess(guessNum);
  };

  const renderListItem = (listLength, itemData) => (
    <View>
      <Text h5 style={{ paddingVertical: 20, color: "white" }}>
        {itemData.item}
      </Text>
    </View>
  );

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <View style={styles.gameBoxLandscape}>
          <Button
            style={styles.button}
            color="transparent"
            onPress={() => narrowGuess("lower")}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </Button>
          <Text h1 style={{ paddingBottom: 20, color: "white" }}>
            {currentGuess}
          </Text>
          <Button
            style={styles.button}
            onPress={() => narrowGuess("higher")}
            color="transparent"
          >
            <Ionicons name="md-add" size={24} color="white" />
          </Button>
        </View>
        <View style={{ flex: 1, height: "100%", width: "100%" }}>
          {/* <ScrollView cotect >
          {pastGuesses.map(guess => renderListItem(guess))}
        </ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }

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
            <Ionicons name="md-remove" size={24} color="white" />
          </Button>
          <Button
            style={styles.button}
            onPress={() => narrowGuess("higher")}
            color="transparent"
          >
            <Ionicons name="md-add" size={24} color="white" />
          </Button>
        </View>
      </View>
      <View style={{ flex: 1, height: "100%", width: "100%" }}>
        {/* <ScrollView cotect >
          {pastGuesses.map(guess => renderListItem(guess))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff126e"
  },
  buttonContainer: {
    // marginTop: "50%",
    flexDirection: "row",
    justifyContent: "space-between",

    width: "100%"
  },
  button: {
    width: "30%",
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
  },
  gameBoxLandscape: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center"
  }
});

export default GameScreen;
