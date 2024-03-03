// Frame0.js
import React from "react";
import { View, StyleSheet, Button, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Frame0 = () => {
  const navigation = useNavigation();

  const startNewGame = () => {
    navigation.navigate("Frame1");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={"../assets/chill.png"}
        resizeMode='cover'
        style={styles.image}
      >
        <LinearGradient style={styles.gradient} colors={["black", "cyan"]}>
          <Button title='Start New Game' onPress={startNewGame} />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Frame0;
