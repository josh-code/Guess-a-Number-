import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";

const fetchFonts = () => {
  return Font.loadAsync({
    gotham: require("./assets/fonts/GothamPro-Black.ttf")
  });
};

export default function App() {
  const [userSelection, setUserSelection] = useState();
  const [guessRounds, setGuessRounds] = useState();
  const [contentLoaded, setContentLoaded] = useState(false);

  if (!contentLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setContentLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  const startGameHandler = selectednumber => {
    setUserSelection(selectednumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const reset = () => {
    setGuessRounds(0);
    setUserSelection(NaN);
  };

  let currentScreen = <StartGameScreen setSelection={startGameHandler} />;

  if (userSelection && guessRounds <= 0) {
    currentScreen = (
      <GameScreen selectedNumber={userSelection} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    currentScreen = <GameOver rounds={guessRounds} resetGame={reset} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {currentScreen}
      {/* <GameOver rounds={1} resetGame={reset} /> */}
      {/* <GameScreen selectedNumber={10} onGameOver={gameOverHandler} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
