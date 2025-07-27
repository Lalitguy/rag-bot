import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="menu"
              size={24}
              color={focused ? "#bbb" : "#eee"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="knowledge-base"
        options={{
          title: "Menu",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="menu"
              size={24}
              color={focused ? "#bbb" : "#eee"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
