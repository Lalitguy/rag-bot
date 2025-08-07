import { useChatPrompt } from "@/src/api/chat";
import ChatInterface from "@/src/components/ChatInterface";
import Container from "@/src/components/common/Container";
import { STYLES } from "@/src/constants/styles";
import { ChatListItem } from "@/src/types";
import React, { useRef, useState } from "react";
import { Keyboard, ScrollView } from "react-native";

const RagBot = () => {
  const { mutate: promptSearch, isPending } = useChatPrompt();
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const [ragActive, setRagActive] = useState(true);

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
        rag: ragActive,
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
        ragState={ragActive}
        setRagState={setRagActive}
      />
    </Container>
  );
};

export default RagBot;
