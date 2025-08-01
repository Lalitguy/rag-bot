import { View, Text, ViewStyle, StyleProp, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BaseText from "../common/BaseText";

interface StreamContentProps {
  content: string;
  style?: StyleProp<ViewStyle>;
  delay?: number;
}

const tokenizeContent = (text: string) => {
  const tokens: string[] = [];

  const parts = text.split(/(\s+|\n+)/); // split by space or newline
  for (const part of parts) {
    if (part === "") continue;
    if (part.match(/^\n+$/)) {
      tokens.push("\n"); // treat any \n or \n\n as single line break
    } else {
      tokens.push(part);
    }
  }

  return tokens;
};

const StreamContent = ({
  content,
  style = {},
  delay = 10,
}: StreamContentProps) => {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;
    let isCancelled = false;

    const words = tokenizeContent(content);

    const streamWords = () => {
      if (index >= words.length || isCancelled) return;

      setDisplayedWords((prev) => [...prev, words[index]]);
      index++;

      setTimeout(streamWords, delay);
    };

    streamWords();

    return () => {
      isCancelled = true; // Cleanup
    };
  }, [content, delay]);

  return (
    <View style={[styles.viewStyle, style]}>
      {displayedWords.map((word, index) => (
        <BaseText key={index} text={word} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 2,
  },
});

export default StreamContent;
