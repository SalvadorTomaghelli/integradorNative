import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import HomeMenu from "./src/components/HomeMenu";

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>

      <Stack.Navigator>
       
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeMenu"
          component={HomeMenu}
          options={{ headerShown: false }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

