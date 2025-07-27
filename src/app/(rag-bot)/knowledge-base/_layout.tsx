import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const KnowledgeBaseStack = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default KnowledgeBaseStack;
