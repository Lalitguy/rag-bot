import { KnowledgeFormData } from "../types";

export const defaultKnowledgeForm: KnowledgeFormData = {
  title: "",
  description: "",
  link: "",
};

export const KnowledgeFormError: Record<keyof KnowledgeFormData, string> = {
  title: "",
  description: "",
  link: "",
};
