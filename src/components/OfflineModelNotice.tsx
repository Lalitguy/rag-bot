import React from "react";
import { StyleSheet, View } from "react-native";
import { STYLES } from "../constants/styles";
import { useRagModelProvider } from "../providers/RAGModelProvider";
import BaseButton from "./common/BaseButton";
import BaseText from "./common/BaseText";

const OfflineModelNotice = () => {
  const { setOfflinePermission } = useRagModelProvider();
  return (
    <View style={styles.container}>
      <BaseText
        text="Want to use the AI fully offline?"
        style={[STYLES.textBold, STYLES.fontSize16]}
      />
      <BaseText
        text="You can download a compact language model to your device to enable fully offline usage. This ensures your data remains private — no information is sent to any server."
        style={styles.message}
      />
      <BaseText
        text="You can choose to download a language model to your device. This allows the app to function entirely offline, helping protect your privacy by ensuring your data never leaves your device."
        style={styles.message}
      />
      <BaseButton
        text="I Understand"
        style={styles.understandButton}
        onPress={() => setOfflinePermission(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingHorizontal: 16,
  },
  message: {
    marginTop: 10,
    letterSpacing: 1.1,
  },
  understandButton: {
    alignSelf: "center",
    marginTop: 20,
  },
});

export default OfflineModelNotice;
