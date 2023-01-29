import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScreenPostAdd } from "../screens/ScreenPostAdd";
import { ScreenPostDetail } from "../screens/ScreenPostDetail";
import { BottomTabNavigation } from "./BottomTabNavigation";

export type RootStackParamList = {
  BottomTab: undefined;
  PostAdd: undefined;
  PostDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen name="PostAdd" component={ScreenPostAdd} />
      {/* <Stack.Screen name="PostDetail" component={ScreenPostDetail} /> */}
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
  return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
};

export const useRootRoute = <RouteName extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
};
