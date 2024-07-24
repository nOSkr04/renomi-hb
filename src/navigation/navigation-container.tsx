import * as React from "react";
import { NavigationContainer as RNNavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "./root-stack-navigator";
const NavigationContainer = () => {
  return (
    <RNNavigationContainer>
      <RootStackNavigator />
    </RNNavigationContainer>
  );
};

export { NavigationContainer };
