import AddButton from "@/src/components/animated/AddButton";
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
      <AddButton onPress={addDocument} />
    </Container>
  );
};

export default Documents;
