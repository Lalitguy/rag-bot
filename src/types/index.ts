import { VectorStore } from "./../constants/map";
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

export type VectorStoreModelType = Omit<
  ModelType,
  "id" | "tokenizerConfigSource"
> & {
  id: "vectorStore";
};

interface ModelProviderProps {
  offlinePermission: boolean;
  setOfflinePermission: (value: boolean) => void;
  models: ModelType[];
  updateModels: React.Dispatch<React.SetStateAction<ModelType[]>>;
  vectorStoreModel: VectorStoreModelType;
  setVectorStoreModel: React.Dispatch<
    React.SetStateAction<VectorStoreModelType>
  >;
  selectedModel: ModelType["id"][];
  updateSelectedModel: (v: ModelType["id"][]) => void;
  docs: docType[];
  setDocs: React.Dispatch<React.SetStateAction<docType[]>>;
}

interface docType {
  id: number;
  doc: string;
}

interface KnowledgeFormData {
  title: string;
  description: string;
  link?: string;
}

interface KnowledgeFormDataWithId extends KnowledgeFormData {
  _id: string;
}

interface ChatPrompt {
  prompt: string;
  rag?: boolean;
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
  docType,
};
