import BaseButton from "@/src/components/common/BaseButton";
import BaseInput from "@/src/components/common/BaseInput";
import Container from "@/src/components/common/Container";
import useKeyboard from "@/src/hooks/useKeyboard";
import { useRagModelProvider } from "@/src/providers/RAGModelProvider";
import { dismissKeyboard } from "@/src/utils";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text } from "react-native";

const Documents = () => {
  const { docs, setDocs } = useRagModelProvider();
  const { isKeyboardVisible } = useKeyboard();

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isKeyboardVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardVisible]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const handleDocumentChange = (id: number, text: string) => {
    setDocs((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, doc: text } : doc))
    );
  };

  const addDocument = () => {
    setDocs((prev) => [...prev, { id: prev.length, doc: "" }]);
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {docs.map((doc, index) => (
          <BaseInput
            key={index}
            value={doc.doc}
            onChangeText={(text) => handleDocumentChange(doc.id, text)}
            label={`Document ${index + 1}`}
            placeholder="Enter Document Text"
            numberOfLines={6}
          />
        ))}
      </ScrollView>
      <BaseButton
        customComponent={
          <Animated.View style={[{ transform: [{ rotate }] }]}>
            <AntDesign name="plus" size={24} color="black" />
          </Animated.View>
        }
        style={styles.buttonStyle}
        onPress={isKeyboardVisible ? dismissKeyboard : addDocument}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 65,
    height: 65,
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    right: 30,
  },
});

export default Documents;
