import { STYLES } from "@/src/constants/styles";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import BaseButton from "../common/BaseButton";
import BaseInput from "../common/BaseInput";
import { defaultKnowledgeForm } from "@/src/constants/defaults";
import { KnowledgeFormData } from "@/src/types";
import { isValidUrl } from "@/src/utils";
import { useKnowledgeAdd, useKnowledgeUpdate } from "@/src/api/knowledge";
import useKeyboard from "@/src/hooks/useKeyboard";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "@/src/constants/colors";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const placeholderTitles = [
  "e.g., How to reset your account password",
  "e.g., Managing user roles and access",
  "e.g., Verifying your email address",
  "e.g., Troubleshooting login issues",
  "e.g., Understanding API rate limits",
];

interface Props {
  formValues?: KnowledgeFormData;
  updateId?: string;
}
const KnowledgeForm = ({ formValues, updateId }: Props) => {
  const [form, setForm] = useState(formValues || defaultKnowledgeForm);
  const [formErrors, setFormErrors] = useState(defaultKnowledgeForm);
  const { isKeyboardVisible } = useKeyboard();
  const isScreenFocused = useIsFocused();
  const placeholder = useMemo(
    () =>
      placeholderTitles[Math.floor(Math.random() * placeholderTitles.length)],
    [isScreenFocused]
  );

  const { mutate: insertKnowledge, isPending } = useKnowledgeAdd();
  const { mutate: updateKnowledge, isPending: isUpdatePending } =
    useKnowledgeUpdate();

  const handleChange = (val: string, key: keyof KnowledgeFormData) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    let hasError = false;
    for (const key in form) {
      if (form[key as keyof KnowledgeFormData] === "") {
        if (key === "link") {
          const linkValue = form.link?.trim();
          if (linkValue && !isValidUrl(linkValue)) {
            setFormErrors((prev) => ({
              ...prev,
              link: "Please enter a valid URL",
            }));
            hasError = true;
          }
          continue;
        }
        setFormErrors((prev) => ({
          ...prev,
          [key]: `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } field is required`,
        }));
        hasError = true;
      }
    }

    if (hasError) return;

    if (updateId) {
      updateKnowledge({ data: form, id: updateId });
      return;
    }

    insertKnowledge(form);
  };

  const buttonDisabled = Object.entries(form).every(([_, value]) => !value);

  const loading = (updateId ? isUpdatePending : isPending) || buttonDisabled;

  return (
    <View style={STYLES.flex}>
      <KeyboardAvoidingView style={STYLES.flex}>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          <BaseInput
            label="Title"
            placeholder={placeholder}
            numberOfLines={1}
            value={form.title}
            onChangeText={(val) => handleChange(val, "title")}
            error={formErrors.title}
            style={styles.inputStyle}
            labelStyle={styles.labelStyle}
          />
          <BaseInput
            label="Description"
            numberOfLines={14}
            placeholder="Provide a detailed explanation, including key information, steps, or insights relevant to this topic"
            value={form.description}
            onChangeText={(val) => handleChange(val, "description")}
            error={formErrors.description}
            style={styles.inputStyle}
            labelStyle={styles.labelStyle}
          />
          <BaseInput
            label="Link"
            numberOfLines={1}
            placeholder="Add a reference URL (optional)"
            value={form.link}
            onChangeText={(val) => handleChange(val, "link")}
            error={formErrors.link}
            style={styles.inputStyle}
            labelStyle={styles.labelStyle}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {!isKeyboardVisible && (
        <BaseButton
          text={
            updateId
              ? isUpdatePending
                ? "Updating..."
                : "Update"
              : isPending
              ? "Saving..."
              : "Save"
          }
          style={styles.buttonStyles}
          textStyle={STYLES.textBold}
          onPress={handleSubmit}
          disabled={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH - 24,
  },
  inputStyle: {
    backgroundColor: COLORS.darkSecondary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkTertiary,
    borderRadius: 0,
    paddingHorizontal: 0,
    marginHorizontal: 4,
  },
  labelStyle: {
    paddingHorizontal: 4,
  },
});
export default KnowledgeForm;
