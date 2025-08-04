import { COLORS } from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.dark,
        },
        headerTitleStyle: {
          color: COLORS.white,
          fontFamily: "Nunito-Semi",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Offline Assistant",
          headerBackVisible: false,
          headerRight: () => (
            <Link asChild href="/(offline)/documents">
              <MaterialIcons
                name="library-books"
                size={22}
                color={COLORS.button}
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="documents"
        options={{
          title: "My Reference Documents",
          headerTintColor: COLORS.button,
        }}
      />
    </Stack>
  );
};

export default TabLayout;
