type ModelType = "qwen3" | "ilama3" | "smollm2";

interface ModelProviderProps {
  offlinePermission: boolean;
  setOfflinePermission: (value: boolean) => void;
  isModelReady: boolean;
  setModelReady: (value: boolean) => void;
  model: ModelType[] | null;
  addModel: (model: ModelType[]) => void;
}

interface KnowledgeFormData {
  title: string;
  description: string;
  link?: string;
}

interface KnowledgeFormDataWithId extends KnowledgeFormData {
  id: string;
}

interface ChatPrompt {
  prompt: string;
}

interface ChatListItem {
  role: "user" | "assistant";
  content: string;
}

export {
  ModelType,
  ModelProviderProps,
  KnowledgeFormData,
  KnowledgeFormDataWithId,
  ChatPrompt,
  ChatListItem,
};
