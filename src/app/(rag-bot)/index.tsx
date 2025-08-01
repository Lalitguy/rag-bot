import { useChatPrompt } from "@/src/api/chat";
import StreamContent from "@/src/components/animated/StreamContent";
import BaseButton from "@/src/components/common/BaseButton";
import BaseInput from "@/src/components/common/BaseInput";
import BaseText from "@/src/components/common/BaseText";
import Container from "@/src/components/common/Container";
import Spinner from "@/src/components/common/Spinnner";
import { COLORS } from "@/src/constants/colors";
import { STYLES } from "@/src/constants/styles";
import { ChatListItem } from "@/src/types";
import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

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
      <KeyboardAvoidingView
        style={STYLES.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          style={styles.scrollWrap}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          {chatList.map((item, index) => (
            <View
              key={index}
              style={[
                STYLES.flexRow,
                item.role === "user" ? STYLES.endSef : {},
              ]}
            >
              {item.role === "user" ? (
                <>
                  <View style={styles.userChatWrap}>
                    <BaseText text={item.content} />
                  </View>
                  <View style={styles.userChatTail}>
                    <View style={styles.userChatTailCut} />
                  </View>
                </>
              ) : (
                <View style={styles.assistantChatWrap}>
                  <BaseText text={item.content} />
                </View>
              )}
            </View>
          ))}
          {isPending && (
            <View
              style={[
                STYLES.flexRow,
                STYLES.itemsCenter,
                styles.assistantChatWrap,
              ]}
            >
              <Spinner />
              <BaseText text="Thinking..." />
            </View>
          )}
          <View style={styles.emptyHeight} />
        </ScrollView>
        <View style={[styles.searchWrap]}>
          <BaseInput
            placeholder="Ask a question..."
            numberOfLines={4}
            autoHeight={false}
            bottomSpacing={false}
            onChangeText={handleTextChange}
            value={inputText}
          />
          <View style={[STYLES.flexRow, STYLES.justifyEnd]}>
            <BaseButton
              style={styles.buttonStyle}
              onPress={handleSubmit}
              customComponent={
                <AntDesign name="arrowup" size={24} color="black" />
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollWrap: {
    flex: 1,
    marginBottom: 90,
  },
  searchWrap: {
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH,
    // left: 8,
    gap: 6,
    backgroundColor: COLORS.darkTertiary,
    borderRadius: 12,
    minHeight: 82,
    paddingTop: 6,
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
  },
  userChatWrap: {
    backgroundColor: COLORS.darkTertiary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderBottomRightRadius: 0,
    maxWidth: "80%",
    alignSelf: "flex-end",
    marginTop: 12,
    position: "relative",
    opacity: 0.9,
  },
  userChatTail: {
    width: 6,
    height: "100%",
    backgroundColor: COLORS.darkTertiary,
    position: "relative",
    marginRight: 8,
  },
  userChatTailCut: {
    position: "absolute",
    top: 0,
    bottom: 2,
    width: 6,
    backgroundColor: COLORS.darkSecondary,
    right: 0,
    borderBottomLeftRadius: 8,
  },
  assistantChatWrap: {
    backgroundColor: COLORS.darkSecondary,
    paddingVertical: 6,
    width: "90%",
    alignSelf: "flex-start",
    marginLeft: 12,
    marginTop: 6,
    textAlign: "justify",
  },
  emptyHeight: {
    height: 30,
  },
});

export default RagBot;
