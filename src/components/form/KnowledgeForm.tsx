import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import React from "react";
import BaseInput from "../common/BaseInput";
import { STYLES } from "@/src/constants/styles";

const placeholderTitles = [
  "e.g., How to reset your account password",
  "e.g., Managing user roles and access",
  "e.g., Verifying your email address",
  "e.g., Troubleshooting login issues",
  "e.g., Understanding API rate limits",
];

const KnowledgeForm = () => {
  const placeholder =
    placeholderTitles[Math.floor(Math.random() * placeholderTitles.length)];
  return (
    <KeyboardAvoidingView style={STYLES.flex}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <BaseInput label="Title" placeholder={placeholder} numberOfLines={1} />
        <BaseInput
          label="Description"
          numberOfLines={14}
          placeholder="Provide a detailed explanation, including key information, steps, or insights relevant to this topic"
        />
        <BaseInput
          label="Link"
          numberOfLines={1}
          placeholder="Add a reference URL (optional)"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KnowledgeForm;
