import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Button, ScrollView, ToastAndroid } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Frame3 from "./Frame3";
const Frame2 = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [opponentGuessHistory, setOpponentGuessHistory] = useState([]);
  const scrollViewRef = useRef();
  const route = useRoute();
  const navigation = useNavigation();
  const { userEnteredNumber } = route.params;
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  
    if (opponentGuessHistory.length === 8) {
      const hasCorrectGuess = opponentGuessHistory.some(guess => guess === userEnteredNumber);
  
      if (hasCorrectGuess) {
        setIsGameWon(true);
      } else {
        setIsGameWon(false);
      }
  
      setIsGameOver(true);
    } else if (opponentGuessHistory.some(guess => guess === userEnteredNumber)) {
      setIsGameOver(true);
      setIsGameWon(true);
    }
  }, [opponentGuessHistory, userEnteredNumber]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
  }

  const handleUserInput = (isHigher) => {
    if (opponentGuessHistory.length >= 8) {
      // Don't allow more guesses if 8 turns are reached
      return;
    }

    setOpponentGuessHistory((prevHistory) => [...prevHistory, randomNumber]);

    if (randomNumber === userEnteredNumber) {
      if (isHigher) {
        showToast("Oh no. Please try again.");
      } else {
        showToast("Excellent");
      }
    } else if (
      (isHigher && randomNumber > userEnteredNumber) ||
      (!isHigher && randomNumber < userEnteredNumber)
    ) {
      showToast("Excellent");
    } else {
      showToast("Wrong option. Please try again");
    }

    setRandomNumber(generateRandomNumber());
  };

  const tryAgain = () => {
    navigation.navigate("Frame1");
  };

  const showToast = (message) => {
    setTimeout(() => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }, 500);
  };

  const navigateToResult = () => {
    navigation.navigate("Frame3", { isGameWon });
  };

  const handleBingo = () => {
    if (randomNumber === userEnteredNumber) {
      setIsGameOver(true);
      setIsGameWon(true);
      navigateToResult();
    }
  };

  const handleGameOver = () => {
    navigation.navigate("Frame3", { isGameWon: isGameWon });
  };

  return (
    <View style={styles.container}>
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

        <View style={styles.plusOrSubtract}>
          <View style={styles.lowerContainer}>
            <Button
              title='Lower'
              onPress={() => handleUserInput(false)}
              color='#2D9596'
            />
          </View>

          <View style={styles.higherContainer}>
            <Button
              title='Higher'
              onPress={() => handleUserInput(true)}
              color='#2D9596'
            />
          </View>

          <View style={styles.bingoButtonContainer}>
            <Button
              title='Bingo'
              onPress={handleBingo}
              style={styles.bingoButton}
              color='#2D9596'
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

      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>
            {isGameWon ? "You Win!" : "You Lose!"}
          </Text>
          <Button
            title='Continue'
            onPress={navigateToResult}
            color='#D83E38'
            marginBottom='40px'
          />
        </View>
      )}

      <View style={styles.tryAgain}>
        <Button title='Try again' onPress={tryAgain}></Button>
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
    marginTop: 10,
  },
  higherContainer: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  bingoButtonContainer: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
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
