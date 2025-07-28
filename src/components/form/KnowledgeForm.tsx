import { STYLES } from "@/src/constants/styles";
import React, { useEffect, useState } from "react";
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
import { useKnowledgeAdd } from "@/src/api/knowledge";

const SCREEN_WIDTH = Dimensions.get("screen").width;
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

  const [form, setForm] = useState(defaultKnowledgeForm);
  const [formErrors, setFormErrors] = useState(defaultKnowledgeForm);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { mutate: insertKnowledge, isPending } = useKnowledgeAdd();

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

    insertKnowledge(form);
  };

  useEffect(() => {
    if (Object.entries(formErrors).every(([key, value]) => !value)) {
      setButtonDisabled(true);
    }
  }, [form]);

  const loading = isPending || buttonDisabled;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Keyboard is visible
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Keyboard is hidden
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
          />
          <BaseInput
            label="Description"
            numberOfLines={14}
            placeholder="Provide a detailed explanation, including key information, steps, or insights relevant to this topic"
            value={form.description}
            onChangeText={(val) => handleChange(val, "description")}
            error={formErrors.description}
          />
          <BaseInput
            label="Link"
            numberOfLines={1}
            placeholder="Add a reference URL (optional)"
            value={form.link}
            onChangeText={(val) => handleChange(val, "link")}
            error={formErrors.link}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {!isKeyboardVisible && (
        <BaseButton
          text="Submit"
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
});
export default KnowledgeForm;
