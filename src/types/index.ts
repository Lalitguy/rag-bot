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

export { KnowledgeFormData, KnowledgeFormDataWithId, ChatPrompt };
