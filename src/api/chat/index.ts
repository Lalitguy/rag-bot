import type { ChatPrompt } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useChatPrompt = () => {
  return useMutation({
    async mutationFn(data: ChatPrompt) {
      const response = await fetch(`${API_URL}/search`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    async onSuccess() {
      console.log("cnat successful");
    },
    async onError(error) {
      console.log(error);
    },
  });
};
