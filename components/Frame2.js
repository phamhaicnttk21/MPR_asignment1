import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Button, ScrollView } from "react-native";
import Toast, { ToastMessage } from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
const Frame2 = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [opponentGuessHistory, setOpponentGuessHistory] = useState([]);
  const scrollViewRef = useRef();
  const route = useRoute();
  const { userEnteredNumber } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    // Scroll to the end of the ScrollView when the component mounts
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [opponentGuessHistory]);

  // handle random number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
  }

  // handle toast message
  const handleUserInput = (isHigher) => {
    setOpponentGuessHistory((prevHistory) => [...prevHistory, randomNumber]);

    if (
      (isHigher && randomNumber > userEnteredNumber) ||
      (!isHigher && randomNumber < userEnteredNumber)
    ) {
      // User made the correct choice
      Toast.show({
        type: "success",
        text1: "Excellent",
        backgroundColor: "#28a745",
      });
    } else {
      // User made the wrong choice
      Toast.show({
        type: "error",
        text1: "Wrong option. Please try again",
        backgroundColor: "#FFD700",
      });
    }

    // Generate a new random number for the next round
    setRandomNumber(generateRandomNumber());
  };

  // tryAgain
  const tryAgain = () => {
    navigation.navigate("Frame1");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='white' />
      <View style={styles.headerContainer}>
        <Text style={styles.headerContent}>Opponent's Guess</Text>
      </View>

      <View style={styles.number}>
        <Text style={styles.bold}>
          {randomNumber.toString().padStart(2, "0")}
        </Text>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Lower or Higher?</Text>

        <View style={styles.plusOrSubstract}>
          <View style={styles.lowerContainer}>
            <Button
              title='-'
              onPress={() => handleUserInput(false)}
              color='#2D9596' // Set the color for the "Lower" button
            />
          </View>

          <View style={styles.higherContainer}>
            <Button
              title='+'
              onPress={() => handleUserInput(true)}
              color='#2D9596' // Set the color for the "Higher" button
            />
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.historyGuess}
        contentContainerStyle={styles.historyContainer}
      >
        {opponentGuessHistory.map((guess, index) => (
          <View key={index} style={styles.historyEntry}>
            <Text style={styles.historyText}>{`Opponent's Guess ${
              index + 1
            }: ${guess}`}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tryAgain}>
        <Button title='Try again' onPress={tryAgain} ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 63,
    backgroundColor: "#FA7878",
    borderRadius: 30,
  },
  headerContent: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#000",
  },
  number: {
    alignItems: "center",
    justifyContent: "center",
    height: 63,
    backgroundColor: "#00FFFF",
    borderRadius: 30,
    marginTop: 20,
  },
  optionContainer: {
    backgroundColor: "#F56C40",
    padding: 20,
    marginTop: 20,
    borderRadius: 30,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  plusOrSubtract: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  lowerContainer: {
    backgroundColor: "#dc3545",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  higherContainer: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  historyGuess: {
    backgroundColor: "#EFF396",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
  },
  historyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  historyEntry: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tryAgain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Frame2;
