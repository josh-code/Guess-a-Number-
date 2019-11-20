import React from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { Text, Button } from "galio-framework";
import MainButton from "../components/MainButton";

const GameOver = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text h3 color="white">
          Game over!
        </Text>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={1000}
            style={styles.img}
            // source={require("../assets/game-popup-game-over-neon-sign-game-over-neon-vector-23935949.jpg")}
            source={{
              uri:
                "https://images.unsplash.com/photo-1547093349-65cdba98369a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            }}
            resizeMode="cover"
          />
        </View>
        <Text p color="white">
          Found number in {props.rounds} gusses!!
        </Text>
        <View style={styles.buttonContainer}>
          <MainButton onPress={() => props.resetGame()}>Play Again</MainButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingVertical: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff126e"
  },
  buttonContainer: {
    marginTop: "10%",
    width: Dimensions.get("window").width > 350 ? "80%" : "100%",
    alignItems: "center"
  },
  imageContainer: {
    width: (Dimensions.get("window").width / 5) * 3,
    height: (Dimensions.get("window").width / 5) * 3,
    borderRadius: 200,
    borderColor: "white",
    borderWidth: 3,
    overflow: "hidden",
    marginVertical: 20
  },
  img: {
    width: "100%",
    height: "100%"
  }
});

export default GameOver;
