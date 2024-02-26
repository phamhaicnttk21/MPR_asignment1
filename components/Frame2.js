import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Button, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Frame2 = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='white' />
      <View style={styles.headerContainer}>
        <Text style={styles.headerContent}>Opponents 's Guess</Text>
      </View>

      <View style={styles.number}>
        <Text style={styles.bold}>13</Text>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Lower or Higher?</Text>
        
        <View style={styles.lowerContainer}>
        <Button style={styles.lowerButtton} title="-"></Button>
        </View>
       
        <View style={styles.higherContainer}>
        <Button style={styles.higherButton} title="+"></Button>
        </View>
        
      </View>

      <ScrollView style={styles.historyGuess}>
      
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
  bold:{
    fontWeight:"bold"
  },
  number:{
    alignItems: "center",
    justifyContent: "center",
    height: 63,
    backgroundColor: "#00FFFF",
    borderRadius: 30,
    resizeMode: "contain",
    marginTop: 30,
  },
  optionContainer:{
    backgroundColor:"#F56C40",
    
    width: 350,
    height:200,
    marginRight:500
  },
  historyGuess:{
    backgroundColor:"#EFF396"
  }


});
export default Frame2;
