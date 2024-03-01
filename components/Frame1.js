import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Frame1 = () => {
  const [number, setNumber] = useState("");

  const navigation = useNavigation();
  let confirm = () => {
    navigation.navigate("Frame2");
  };

  const onChanged = (text) => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("please enter numbers only");
      }
    }
    setNumber(newText);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='white' />

      {/* header container */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerContent}>Mini-Game App</Text>
        <Image style={styles.image} source={require("../assets/game.png")} />
      </View>

      {/* text container */}
      <View style={styles.textContainer}>
        <Text style={styles.textContent}>Enter Your Number:</Text>
      </View>

      <View style={styles.enterContainer}>
        <TextInput
          onChangeText={(text) => onChanged(text)}
          style={styles.input}
          value={number}
          keyboardType='numeric'
          maxLength={2}
        ></TextInput>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.note}>*Note: number in range from 01 to 99</Text>
      </View>

      {/* Confirm */}
      <View style={styles.button}>
        <Button
          onPress={() => confirm()}
          title='Confirm'
          style={styles.confirm}
        ></Button>
      </View>

      {/* disguised */}
      <View style={styles.disguisedContainer}>
        <Image
          source={require("../assets/disguised.png")}
          style={styles.disguised}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    width: "100%",
    height: "100%", // Background color for the entire screen
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
    // position:'absolute'
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
  note: {
    color: "white",
    marginLeft: 40,
  },
  button: {
    marginTop: 70,
  },
  disguisedContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150, // Set a specific width for the image
    height: 150, // Set a specific height for the image
    alignSelf: "center",
    marginTop: 20,
  },
  disguised: {
    width: 200,
    height: 200,
  },
});

export default Frame1;
