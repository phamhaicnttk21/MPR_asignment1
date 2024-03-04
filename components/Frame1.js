import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const Frame1 = () => {
  // State to manage the user-entered number
  const [number, setNumber] = useState("");

  // State to manage the mute/unmute status
  const [isMuted, setIsMuted] = useState(false);

  // Create an Audio.Sound object for background music
  const soundObject = new Audio.Sound();

  // Access the navigation object for navigating to Frame2
  const navigation = useNavigation();

  // Function to toggle mute/unmute
  const toggleMute = async () => {
    if (isMuted) {
      // If currently muted, play the background music
      await soundObject.playAsync();
    } else {
      // If currently unmuted, stop the background music
      await soundObject.stopAsync();
    }

    // Toggle the mute status
    setIsMuted(!isMuted);
  };

  // Function to navigate to Frame2 when the user confirms their number
  const confirm = () => {
    if (number) {
      navigation.navigate("Frame2", { userEnteredNumber: number });
    } else {
      alert("Please enter a number before confirming.");
    }
  };

  // Function to handle changes in the TextInput
  const onChanged = (text) => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("Please enter numbers only");
      }
    }

    // Update the user-entered number
    setNumber(newText);
  };

  useEffect(() => {
    // Load and play background music when the component mounts
    const playBackgroundMusic = async () => {
      await soundObject.loadAsync(require("../assets/river.mp3"));
      await soundObject.setIsLoopingAsync(true);
      await soundObject.setIsMutedAsync(isMuted);
      await soundObject.playAsync();
    };

    playBackgroundMusic();

    // Stop the music when the component is unmounted
    return async () => {
      await soundObject.stopAsync();
    };
  }, [isMuted]); // Include isMuted in the dependency array to react to changes in mute status

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["black", "cyan"]}>
        <StatusBar barStyle='light-content' backgroundColor='white' />

        {/* Header container */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerContent}>Mini-Game App</Text>
          <Image style={styles.image} source={require("../assets/game.png")} />
        </View>

        {/* Text container */}
        <View style={styles.textContainer}>
          <Text style={styles.textContent}>Enter Your Number:</Text>
        </View>

        {/* Input container */}
        <View style={styles.enterContainer}>
          <TextInput
            onChangeText={(text) => onChanged(text)}
            style={styles.input}
            value={number}
            keyboardType='numeric'
            maxLength={2}
          />
        </View>

        {/* Note container */}
        <View style={styles.noteContainer}>
          <Text style={styles.note}>
            *Note: number in the range from 01 to 99
          </Text>
        </View>

        {/* Confirm button */}
        <View style={styles.button}>
          <Button onPress={() => confirm()} title='Confirm' color='#FF914D' />
        </View>

        {/* Disguised image container */}
        <View style={styles.disguisedContainer}>
          <Image
            source={require("../assets/disguised.png")}
            style={styles.disguised}
          />
        </View>

        {/* Mute icon container */}
        <View style={styles.muteContainer}>
          <TouchableOpacity onPress={toggleMute}>
            <Image
              source={
                isMuted
                  ? require("../assets/mute.png")
                  : require("../assets/mute.png")
              }
              style={styles.mute}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
  gradient: {
    marginBottom: "20%",
    marginTop: 10,
    borderRadius: 20,
    opacity: 0.96,
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
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    position: "absolute",
    paddingTop: 40,
    right: 220,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 63,
    backgroundColor: "#00FFFF",
    borderRadius: 30,
    resizeMode: "contain",
    marginTop: 30,
  },
  textContent: {
    fontWeight: "bold",
    fontSize: 16,
  },
  enterContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 67,
    height: 53,
    backgroundColor: "#BFDF6B",
    borderRadius: 30,
    marginLeft: 120,
    marginTop: 30,
  },
  input: {
    color: "#000000",
    fontSize: 16,
  },
  noteContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  note: {
    color: "white",
  },
  button: {
    marginTop: 70,
  },
  disguisedContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 20,
  },
  disguised: {
    width: 200,
    height: 200,
  },
  muteContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  mute: {
    width: 30,
    height: 30,
  },
  muteContainer: {
    flexDirection: "row",
    width: 20,
    height: 20,
    borderRightColor: "white",
  },
});

export default Frame1;
