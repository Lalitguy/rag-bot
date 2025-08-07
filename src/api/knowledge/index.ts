import { KnowledgeFormData, KnowledgeFormDataWithId } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation, useRouter } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useKnowledgeAdd = () => {
  const router = useRouter();
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

export const useAllKnowledge = () => {
  return useQuery({
    queryKey: ["knowledge-list"],
    queryFn: async (): Promise<{
      data: KnowledgeFormDataWithId[];
      success: boolean;
    }> => {
      const response = await fetch(`${API_URL}/knowledge`);

      const responseJSON = await response.json();

      const { data = [] } = responseJSON;
      return {
        success: true,
        data,
      };
    },
  });
};

export const useKnowledgeId = (id: string) => {
  return useQuery({
    queryKey: ["knowledge", id],
    queryFn: async (): Promise<{
      data: KnowledgeFormDataWithId;
      success: boolean;
    }> => {
      const response = await fetch(`${API_URL}/knowledge/${id}`);

      const responseJSON = await response.json();

      const { data } = responseJSON;

      const { _id, ...rest } = data;

      return {
        success: true,
        data: rest,
      };
    },
  });
};

export const useKnowledgeUpdate = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation({
    async mutationFn({ data, id }: { data: KnowledgeFormData; id: string }) {
      const response = await fetch(`${API_URL}/knowledge/update/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    async onSuccess(_, { id }) {
      queryClient.invalidateQueries({ queryKey: ["knowledge-list"] });
      queryClient.invalidateQueries({ queryKey: ["knowledge", id] });
      navigation.goBack();
    },
  });
};
