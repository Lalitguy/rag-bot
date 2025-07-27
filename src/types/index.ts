interface KnowledgeFormData {
  title: string;
  description: string;
  link?: string;
}

interface KnowledgeFormDataWithId extends KnowledgeFormData {
  id: string;
}

export { KnowledgeFormData, KnowledgeFormDataWithId };
