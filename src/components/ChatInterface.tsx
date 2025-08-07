import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";
import { STYLES } from "../constants/styles";
import useKeyboard from "../hooks/useKeyboard";
import { ChatListItem } from "../types";
import { dismissKeyboard } from "../utils";
import BaseButton from "./common/BaseButton";
import BaseInput from "./common/BaseInput";
import BaseText from "./common/BaseText";
import Spinner from "./common/Spinnner";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface Props {
  chats: ChatListItem[];
  handleSearch: () => void;
  isPending: boolean;
  userInput: string;
  userInputChange: (text: string) => void;
  offline?: boolean;
  ragState?: boolean;
  setRagState?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChatInterface = ({
  handleSearch,
  isPending: modelThinking,
  chats,
  userInput,
  userInputChange,
  offline,
  ragState,
  setRagState,
}: Props) => {
  const { isKeyboardVisible } = useKeyboard();
  const scrollViewRef = React.useRef<ScrollView>(null);

  const isTopBarVisible = isKeyboardVisible && chats.length === 0;

  return (
    <View style={STYLES.flex}>
      {chats.length === 0 && !isKeyboardVisible && (
        <View style={styles.textWrap}>
          <BaseText
            text={
              offline
                ? "Hi there! I'm your Offline Assistant, here to help you out anytime — no internet needed."
                : "Hi there! I'm your AI Assistant, here to help you out anytime."
            }
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
      <ScrollView
        keyboardDismissMode="none"
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
        style={styles.scrollWrap}
      >
        {chats.map((item, index) => (
          <View
            key={index}
            style={[STYLES.flexRow, item.role === "user" ? STYLES.endSef : {}]}
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
                <BaseText text={item.content} selectable />
              </View>
            )}
          </View>
        ))}

        {modelThinking && (
          <View style={[STYLES.flexRow, STYLES.itemsCenter, STYLES.mLeft10]}>
            <Spinner />
            <BaseText text="Thinking..." />
          </View>
        )}
        <View style={styles.bottomSpace} />
      </ScrollView>
      <View
        style={[
          chats.length === 0 && isKeyboardVisible
            ? styles.inputContainerTop
            : styles.commonInputContainerStyle,
        ]}
      >
        <BaseInput
          placeholder="Ask me anything, I'm here to help! "
          numberOfLines={isTopBarVisible ? 4 : 2}
          style={styles.inputStyle}
          value={userInput}
          onChangeText={(text) => userInputChange(text)}
        />
        {!isTopBarVisible && (
          <View
            style={[
              STYLES.flexRow,
              STYLES.justifyEnd,
              STYLES.gap12,
              STYLES.paddingHorizontal6,
            ]}
          >
            <BaseButton
              style={[
                styles.ragSearchButton,
                ragState ? styles.ragSearchActive : {},
              ]}
              text="Rag search"
              textStyle={[ragState ? STYLES.textSemiBold : STYLES.textBtnColor]}
              onPress={() => setRagState?.((prev) => !prev)}
            />
            <BaseButton
              style={styles.buttonStyle}
              customComponent={
                <AntDesign name="arrowup" size={24} color="black" />
              }
              onPress={handleSearch}
              disabled={modelThinking || userInput.length === 0}
            />
          </View>
        )}
      </View>
      {isTopBarVisible && (
        <View>
          <BaseButton
            style={[
              styles.ragSearchButton,
              ragState ? styles.ragSearchActive : {},
            ]}
            text="Rag search"
            textStyle={[ragState ? STYLES.textSemiBold : STYLES.textBtnColor]}
            onPress={() => setRagState?.((prev) => !prev)}
          />
          <BaseButton
            style={styles.absoluteSearchButton}
            text="Search"
            customComponent={
              <AntDesign name="arrowup" size={20} color="black" />
            }
            onPress={handleSearch}
            disabled={modelThinking || userInput.length === 0}
            textStyle={STYLES.textSemiBold}
          />
        </View>
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
    position: "absolute",
    top: 25,
    width: SCREEN_WIDTH,
    paddingTop: 6,
    backgroundColor: COLORS.darkTertiary,
  },
  inputStyle: {
    fontFamily: "Fk-Grotesk",
    letterSpacing: 1.05,
  },
  commonInputContainerStyle: {
    paddingTop: 12,
    backgroundColor: COLORS.darkTertiary,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: SCREEN_WIDTH,
  },
  scrollWrap: {
    flex: 1,
    marginBottom: 80,
  },
  bottomSpace: {
    height: 50,
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
  ragSearchButton: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
    width: "auto",
    backgroundColor: COLORS.darkTertiary,
    borderColor: COLORS.button,
    borderWidth: 1,
  },
  ragSearchActive: {
    backgroundColor: COLORS.button,
  },
  absoluteSearchButton: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: SCREEN_WIDTH / 3,
    alignItems: "center",
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
    letterSpacing: 1,
  },
});

export default ChatInterface;
