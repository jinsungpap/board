import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { IconName } from "../components/Icons";
import { TabIcon } from "../components/TabIcon";
import { ScreenBlogAdd } from "../screens/ScreenBlogAdd";
import { ScreenHome } from "../screens/ScreenHome";

export type BottomTabParamList = {
  Home: undefined;
  BlogAdd: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        const getIconsName = (): IconName => {
          if (route.name === "BlogAdd") {
            return "person";
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
      <BottomTab.Screen name="BlogAdd" component={ScreenBlogAdd} />
    </BottomTab.Navigator>
  );
};
