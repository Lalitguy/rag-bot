interface ModelProviderProps {
  offlinePermission: boolean;
  setOfflinePermission: (value: boolean) => void;
  isModelDownloading: boolean;
  downloadModel: (value: boolean) => void;
  downloadProgress: number;
  error: string | null;
  isModelReady: boolean;
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
  ModelProviderProps,
  KnowledgeFormData,
  KnowledgeFormDataWithId,
  ChatPrompt,
  ChatListItem,
};
