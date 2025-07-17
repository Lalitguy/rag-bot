import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
        }}
      />
      <Tabs.Screen
        name="second"
        options={{
          title: "Menu Two",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
