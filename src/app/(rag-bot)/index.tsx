import { useChatPrompt } from "@/src/api/chat";
import ChatInterface from "@/src/components/ChatInterface";
import Container from "@/src/components/common/Container";
import { COLORS } from "@/src/constants/colors";
import { STYLES } from "@/src/constants/styles";
import { ChatListItem } from "@/src/types";
import React, { useRef, useState } from "react";
import { Dimensions, Keyboard, ScrollView, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const RagBot = () => {
  const { mutate: promptSearch, isPending } = useChatPrompt();
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const [chatList, setChatList] = useState<ChatListItem[]>([]);

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  const handleSubmit = () => {
    if (inputText) {
      Keyboard.dismiss();
      setChatList((prev) => [...prev, { content: inputText, role: "user" }]);

      const promptData = {
        prompt: inputText,
      };
      setInputText("");
      promptSearch(promptData, {
        onSuccess(data) {
          setChatList((prev) => [
            ...prev,
            { content: data, role: "assistant" },
          ]);
        },
      });
    }
  };

  return (
    <Container style={STYLES.justifyEnd} noPadding>
      <ChatInterface
        chats={chatList}
        handleSearch={handleSubmit}
        isPending={isPending}
        userInputChange={handleTextChange}
        userInput={inputText}
      />
    </Container>
  );
};

export default RagBot;
