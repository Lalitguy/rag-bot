import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import RAGModelProvider from "../providers/RAGModelProvider";

const queryClient = new QueryClient();

const Root = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} backgroundColor={COLORS.dark} />
        <RAGModelProvider>
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen name="index" />
            </Stack>
          </QueryClientProvider>
        </RAGModelProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Root;
