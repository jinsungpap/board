import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { IconName } from "../components/Icons";
import { TabIcon } from "../components/TabIcon";
import { ScreenHome } from "../screens/ScreenHome";
import { ScreenPostList } from "../screens/ScreenPostList";

export type BottomTabParamList = {
  Home: undefined;
  Post: undefined;
  PostAdd: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        const getIconsName = (): IconName => {
          if (route.name === "Post") {
            return "list";
          }
          return "home";
        };
        const routeIconName = getIconsName();
        return {
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <TabIcon visibleBadge={false} iconName={routeIconName} iconColor={color} />;
          },
        };
      }}
    >
      <BottomTab.Screen name="Home" component={ScreenHome} />
      <BottomTab.Screen name="Post" component={ScreenPostList} />
    </BottomTab.Navigator>
  );
};
