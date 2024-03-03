import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Frame2 from "./components/Frame2";
import Frame1 from "./components/Frame1";
import Frame0 from "./components/Frame0";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRoutename='Frame0'>
        <Stack.Screen name="Frame0" component={Frame0}/>
          <Stack.Screen name='Frame1' component={Frame1} />
          <Stack.Screen name="Frame2" component={Frame2} />
          
        </Stack.Navigator>
      </NavigationContainer>
    // </View>
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
