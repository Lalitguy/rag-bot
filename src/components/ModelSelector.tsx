import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";
import { ModelMap } from "../constants/map";
import { STYLES } from "../constants/styles";
import { useRAGModel } from "../providers/RAGModelProvider";
import { ModelType } from "../types";
import ModelCard from "./cards/ModelCard";
import BaseButton from "./common/BaseButton";
import BaseText from "./common/BaseText";

const ModelSelector = () => {
  const { addModel } = useRAGModel();
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
    <View>
      <BaseText
        text="Select Model"
        style={[STYLES.textBold, STYLES.fontSize16, STYLES.mBottom10]}
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
      <BaseButton
        text={`Download Model ${
          selectedModel.length > 1 ? `(${selectedModel.length})` : ""
        }`}
        onPress={() => addModel(selectedModel)}
        style={styles.buttonStyle}
        textStyle={styles.textStyle}
        disabled={selectedModel.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    paddingVertical: 15,
    backgroundColor: COLORS.green,
  },
  textStyle: {
    ...STYLES.textBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
export default ModelSelector;
