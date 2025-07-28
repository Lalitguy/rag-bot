import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from "@/src/constants/colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.dark,
          paddingTop: 2,
          height: 56,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: "Nunito-Semi",
          letterSpacing: 0.9,
          fontSize: 10,
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.lightGray,
        headerStyle: {
          backgroundColor: COLORS.dark,
        },
        headerTitleStyle: {
          color: COLORS.white,
          fontFamily: "Nunito-Semi",
          width: "100%",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ask the Assistant",
          tabBarLabel: "Assistant",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="assistant"
              size={22}
              color={focused ? COLORS.white : COLORS.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="knowledge-base"
        options={{
          title: "Add to knowledge base",
          tabBarLabel: "Resources",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="library-books"
              size={22}
              color={focused ? COLORS.white : COLORS.gray}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
