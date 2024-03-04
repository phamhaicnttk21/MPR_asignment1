// Frame0.js
import React from "react";
import { View, StyleSheet, Button, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

const Frame0 = () => {
  const navigation = useNavigation();

  const startNewGame = () => {
    navigation.navigate("Frame1");
  };

  return (
    <View style={styles.container}>

 
       
      
          <Button title='Start New Game' onPress={startNewGame} color ="#089F25"  />
       
        
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#121212",

  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
 
});

export default Frame0;
