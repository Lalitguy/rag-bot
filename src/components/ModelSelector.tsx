import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";
import { ModelMap, VectorStore } from "../constants/map";
import { STYLES } from "../constants/styles";
import { useRAGModel } from "../providers/RAGModelProvider";
import { ModelType } from "../types";
import ModelCard from "./cards/ModelCard";
import BaseButton from "./common/BaseButton";
import BaseText from "./common/BaseText";

const ModelSelector = () => {
  const { updateModels } = useRAGModel();
  const [selectedModel, setSelectedModel] = useState<ModelType[]>([]);

  const handleModelSelect = (id: ModelType, remove: boolean = false) => {
    setSelectedModel((prev) => {
      if (remove) {
        return prev.filter((modelId) => modelId !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <BaseText
          text="Select Model"
          style={[STYLES.textBold, STYLES.fontSize16]}
        />
        <ModelCard
          name={VectorStore.name}
          description={VectorStore.description}
          modelSize={VectorStore.modelSize}
          selected={true}
        />
        {ModelMap.map((model) => {
          const selected = selectedModel.includes(model);
          return (
            <ModelCard
              key={model.id}
              name={model.name}
              description={model.description}
              modelSize={model.modelSize}
              selected={selected}
              onPress={() => handleModelSelect(model, selected)}
            />
          );
        })}
      </ScrollView>
      <BaseButton
        text={`Download Model ${
          selectedModel.length > 1 ? `(${selectedModel.length})` : ""
        }`}
        onPress={() => updateModels(selectedModel)}
        style={styles.buttonStyle}
        textStyle={styles.textStyle}
        disabled={selectedModel.length === 0}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 50,
    flex: 1,
  },
  buttonStyle: {
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    paddingVertical: 15,
    backgroundColor: COLORS.green,
    position: "absolute",
    bottom: 0,
    left: 12,
    right: 0,
  },
  textStyle: {
    ...STYLES.textBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
export default ModelSelector;
