import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Frame1 from "./components/Frame1";

export default function App() {
  return (
    <View style={styles.container}>
      <Frame1/>
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
