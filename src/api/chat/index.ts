import type { ChatPrompt } from "@/src/types";
import { useMutation } from "@tanstack/react-query";

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
      const responseJSON = await response.json();
      return responseJSON.data;
    },
  });
};
