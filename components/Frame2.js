import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Button, ScrollView } from "react-native";
import Toast, { ToastMessage } from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";

const Frame2 = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [opponentGuessHistory, setOpponentGuessHistory] = useState([]);
  const scrollViewRef = useRef();
  const route = useRoute();
  const { userEnteredNumber } = route.params;

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
      });
    } else {
      // User made the wrong choice
      Toast.show({
        type: "error",
        text1: "Wrong option. Please try again",
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='white' />
      <View style={styles.headerContainer}>
        <Text style={styles.headerContent}>Opponents 's Guess</Text>
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
              style={styles.lowerButtton}
              title='-'
              onPress={() => handleUserInput(false)}
            ></Button>
          </View>

          <View style={styles.higherContainer}>
            <Button
              style={styles.higherButton}
              title='+'
              onPress={() => handleUserInput(true)}
            ></Button>
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.historyGuess}
        contentContainerStyle={styles.historyContainer}
      >
        {opponentGuessHistory.map((guess, index) => (
          <Text key={index}>{`Opponent's Guess ${index + 1}: ${guess}`}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    width: "100%",
    height: "100%",
    paddingTop: StatusBar.currentHeight || 0,
    paddingTop: 70,
    paddingRight: 52,
    paddingLeft: 52,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 63,
    backgroundColor: "#FA7878",
    borderRadius: 30,
    resizeMode: "contain",
  },
  headerContent: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  number: {
    alignItems: "center",
    justifyContent: "center",
    height: 63,
    backgroundColor: "#00FFFF",
    borderRadius: 30,
    resizeMode: "contain",
    marginTop: 30,
  },
  optionContainer: {
    backgroundColor: "#F56C40",

    width: "100%",
    height: "25%",
    marginTop: 20,
    display: "flex",
    borderRadius: 30,
  },
  optionText: {
    justifyContent: "center",
    paddingLeft: "32%",
    fontWeight: "bold",
  },
  plusOrSubstract: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 60,
    width: "90%",
  },
  higherButton: {
    backgroundColor: "#28a745",
  },
  lowerButtton: {
    color: "#fff", // Set the color as needed
    fontSize: 24, // Set the font size as needed
    fontWeight: "bold",
  },

  historyGuess: {
    backgroundColor: "#EFF396",
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 30,
  },
});

export default Frame2;
