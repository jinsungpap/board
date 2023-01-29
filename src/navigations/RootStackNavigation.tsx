import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { BottomTabNavigation } from "./BottomTabNavigation";

export type RootStackParamList = {
  BottomTab: undefined;
  FeedList: {
    list: {
      id: string;
      content: string;
      writer: string;
      imageUrl: string;
      likeCount: number;
    }[];
  };
  AddFeed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "containedModal",
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
  return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
};

export const useRootRoute = <RouteName extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
};
