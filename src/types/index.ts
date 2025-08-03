import { ResourceSource } from "react-native-rag";

interface ModelType {
  id: "qwen3" | "ilama3" | "smollm2";
  modelSource: ResourceSource;
  tokenizerSource: ResourceSource;
  tokenizerConfigSource: ResourceSource;
  downloadProgress: number;
  isReady: boolean;
  name: string;
  description: string;
  modelSize: string;
}

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
  ChatListItem,
  ChatPrompt,
  KnowledgeFormData,
  KnowledgeFormDataWithId,
  ModelProviderProps,
  ModelType,
};
