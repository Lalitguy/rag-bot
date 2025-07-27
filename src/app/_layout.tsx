import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

const Root = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"light-content"} backgroundColor={COLORS.dark} />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Root;
