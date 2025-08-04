import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { RAGParams, useRAG } from "react-native-rag";
import BaseInput from "./common/BaseInput";
import { ChatListItem } from "../types";
import { COLORS } from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { dismissKeyboard } from "../utils";
import useKeyboard from "../hooks/useKeyboard";
import { STYLES } from "../constants/styles";
import BaseText from "./common/BaseText";
import { useRagModelProvider } from "../providers/RAGModelProvider";
import { useIsFocused } from "@react-navigation/native";
import BaseButton from "./common/BaseButton";
import { RagSystemPrompt } from "../constants/map";
import Spinner from "./common/Spinnner";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
interface RagChatProps {
  rag: ReturnType<typeof useRAG>;
}

const RagChat = ({ rag }: RagChatProps) => {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const { isKeyboardVisible } = useKeyboard();
  const isScreenFocused = useIsFocused();
  const [docIdMap, setDocIdMap] = useState<Map<number, string[]>>(new Map());
  const { docs } = useRagModelProvider();
  const [userInput, setUserInput] = useState("");
  const [modelThinking, setModelThinking] = useState(false);

  useEffect(() => {
    const syncDocs = async () => {
      if (!rag.isReady) return;

      // Delete old ones
      for (const [id, vecIds] of docIdMap.entries()) {
        for (const vecId of vecIds) {
          await rag.deleteDocument(vecId);
        }
      }

      // Add updated ones
      const newMap = new Map<number, string[]>();
      for (const docEntry of docs) {
        const vecIds = await rag.splitAddDocument(docEntry.doc);
        newMap.set(docEntry.id, vecIds);
      }

      setDocIdMap(newMap);
      console.log(newMap);
    };

    if (isScreenFocused) {
      syncDocs();
    }
  }, [docs, isScreenFocused]);

  const handleSearch = async () => {
    const userQuery = userInput.trim();
    setChats((prev) => [...prev, { role: "user", content: userQuery }]);
    setUserInput("");
    setModelThinking(true);
    dismissKeyboard();
    const result = await rag.generate(
      [
        { role: "system", content: RagSystemPrompt },
        { role: "user", content: userQuery },
      ],
      {
        augmentedGeneration: true,
      }
    );
    setModelThinking(false);
    setChats((prev) => [...prev, { role: "assistant", content: result }]);
    console.log(result);
  };

  const isTopBarVisible = isKeyboardVisible && chats.length === 0;

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
      {isTopBarVisible && (
        <View style={styles.topBar}>
          <AntDesign
            name="close"
            size={20}
            color={COLORS.lightGray}
            onPress={dismissKeyboard}
          />
        </View>
      )}
      <ScrollView>
        {chats.map((chat, index) => (
          <BaseText
            text={chat.content}
            key={index}
            style={chat.role === "user" ? STYLES.endSef : undefined}
          />
        ))}

        {modelThinking && (
          <View style={[STYLES.flexRow, STYLES.itemsCenter, STYLES.mLeft10]}>
            <Spinner />
            <BaseText text="Thinking..." />
          </View>
        )}
      </ScrollView>
      <View
        style={[
          chats?.length === 0
            ? isKeyboardVisible
              ? styles.inputContainerTop
              : styles.initialKeyboard
            : {},
          styles.commonInputContainerStyle,
        ]}
      >
        <BaseInput
          placeholder="Ask me anything, I'm here to help! "
          numberOfLines={4}
          style={styles.inputStyle}
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
        />
        {!isTopBarVisible && (
          <BaseButton
            style={styles.buttonStyle}
            customComponent={
              <AntDesign name="arrowup" size={24} color="black" />
            }
            onPress={handleSearch}
            disabled={modelThinking || userInput.length === 0}
          />
        )}
      </View>
      {isTopBarVisible && (
        <BaseButton
          style={styles.absoluteSearchButton}
          text="Search"
          customComponent={<AntDesign name="arrowup" size={24} color="black" />}
          onPress={handleSearch}
          disabled={modelThinking || userInput.length === 0}
        />
      )}
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
  inputStyle: {
    fontFamily: "Fk-Grotesk",
    letterSpacing: 1.05,
  },
  initialKeyboard: {
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 12,
    width: SCREEN_WIDTH - 24,
    marginBottom: 12,
  },
  commonInputContainerStyle: {
    paddingTop: 12,
    backgroundColor: COLORS.darkTertiary,
  },
  assistantText: {
    fontFamily: "Fk-Grotesk",
    fontSize: 22,
  },
  textWrap: {
    padding: 50,
    marginTop: 100,
  },
  buttonStyle: {
    height: 30,
    width: 30,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
    alignSelf: "flex-end",
  },
  absoluteSearchButton: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: SCREEN_WIDTH / 3,
    alignItems: "center",
  },
});

export default RagChat;
