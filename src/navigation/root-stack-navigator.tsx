import React from "react";
import { NavigationRoutes, RootStackParamList } from "./types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home-screen";
import AuthScreen from "../screens/auth";
import DetailScreen from "../screens/detail-screen";
import AddPostScreen from "../screens/add-post";
const Stack = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Screen } = Stack;

const RootStackNavigator = () => {
  const navigationOptions = () => {
    return { headerShown: false };
  };

  return (
    <Navigator
      initialRouteName={NavigationRoutes.HomeScreen}
      screenOptions={navigationOptions}
    >
      <Screen component={HomeScreen} name={NavigationRoutes.HomeScreen} />
      <Screen component={AuthScreen} name={NavigationRoutes.AuthScreen} />
      <Screen component={DetailScreen} name={NavigationRoutes.DetailScreen} />
      <Screen component={AddPostScreen} name={NavigationRoutes.AddPostScreen} />
    </Navigator>
  );
};

export { RootStackNavigator };
