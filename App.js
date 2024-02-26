import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Frame2 from "./components/Frame2";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    
    <View style={styles.container}>
      
      <Frame2/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
