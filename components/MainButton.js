import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

const MainButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.border}>
      <ButtonComponent onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderRadius: 30,
    overflow: "hidden"
  },
  button: {
    width: "80%",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white"
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});

export default MainButton;
