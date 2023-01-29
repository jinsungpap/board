import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigation } from "./navigations/RootStackNavigation";

export const RootApp: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
