import { KnowledgeFormData } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useKnowledgeAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: KnowledgeFormData) {
      const response = await fetch(`${API_URL}/embed`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    async onSuccess() {
      router.replace("/(rag-bot)/knowledge-base");
      queryClient.invalidateQueries({ queryKey: ["knowledge-list"] });
    },
    async onError(error) {
      console.error(error);
    },
  });
};
