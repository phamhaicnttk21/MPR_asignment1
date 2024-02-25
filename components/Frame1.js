import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Frame1 = () => {
  const [number, setNumber] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini-Game App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor:"FA7878",
    fontSize: "20px",
    lineHeight: "20px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    textAlign:"center"
   
  },
});

export default Frame1;
