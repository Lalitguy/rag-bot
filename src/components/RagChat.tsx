import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { RAGParams } from "react-native-rag";
import BaseInput from "./common/BaseInput";
import { ChatListItem } from "../types";
import { COLORS } from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { dismissKeyboard } from "../utils";
import useKeyboard from "../hooks/useKeyboard";
import { STYLES } from "../constants/styles";
import BaseText from "./common/BaseText";
import { useRagModelProvider } from "../providers/RAGModelProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
interface RagChatProps {
  rag: RAGParams;
}

const RagChat = ({ rag }: RagChatProps) => {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const { isKeyboardVisible } = useKeyboard();

  return (
    <View style={STYLES.flex}>
      {chats.length === 0 && !isKeyboardVisible && (
        <View style={styles.textWrap}>
          <BaseText
            text="Hi there! I'm your Offline Assistant, here to help you out anytime — no internet needed."
            style={[styles.assistantText, STYLES.mBottom10]}
          />
          <BaseText
            text="How can I assist you today? 🤗"
            style={styles.assistantText}
          />
        </View>
      )}
      {chats.length === 0 && isKeyboardVisible && (
        <View style={styles.topBar}>
          <AntDesign
            name="close"
            size={20}
            color={COLORS.lightGray}
            onPress={dismissKeyboard}
          />
        </View>
      )}
      <BaseInput
        style={[
          chats?.length === 0
            ? isKeyboardVisible
              ? styles.inputContainerTop
              : styles.initialKeyboard
            : {},
        ]}
        placeholder="Ask me anything, I'm here to help! "
        numberOfLines={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: COLORS.darkTertiary,
    alignItems: "flex-end",
    paddingTop: 7,
    paddingRight: 7,
  },
  inputContainerTop: {
    borderRadius: 0,
    paddingVertical: 0,
  },
  initialKeyboard: {
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH - 24,
    left: 12,
    paddingVertical: 24,
  },
  assistantText: {
    fontFamily: "Fk-Grotesk",
    fontSize: 22,
  },
  textWrap: {
    padding: 50,
    marginTop: 100,
  },
});

export default RagChat;
