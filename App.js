import { StatusBar } from "expo-status-ban";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStachlavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Main from "./screens/Main";
 const Stack = createStackNavigator();
export default class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
             headerShown: false
            }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
        );
    }
}