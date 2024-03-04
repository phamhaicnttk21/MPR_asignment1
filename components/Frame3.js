import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Frame3 = ({ isGameWon }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {isGameWon ? "You Win!" : "You Lose!"}
      </Text>
      <Button title="Try Again" onPress={() => navigation.navigate("Frame0")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
});

export default Frame3;