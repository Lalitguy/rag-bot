import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { COLORS } from "@/src/constants/colors";

const KnowledgeBaseStack = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerStyle: { backgroundColor: COLORS.dark },
        headerTitleStyle: {
          color: COLORS.white,
          fontFamily: "Nunito-Semi",
        },
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "My knowledge base",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: "Add to knowledge base",
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "Edit knowledge ",
        }}
      />
    </Stack>
  );
};

export default KnowledgeBaseStack;
