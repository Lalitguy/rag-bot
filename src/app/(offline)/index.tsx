import ModelSelectorCard from "@/src/components/cards/ModelSelectorCard";
import BaseButton from "@/src/components/common/BaseButton";
import BaseText from "@/src/components/common/BaseText";
import Container from "@/src/components/common/Container";
import DownloadProgress from "@/src/components/common/DownloadProgress";
import ModelSelector from "@/src/components/ModelSelector";
import OfflineModelNotice from "@/src/components/OfflineModelNotice";
import RagModel from "@/src/components/RagModel";
import { COLORS } from "@/src/constants/colors";
import { ModelMap } from "@/src/constants/map";
import { STYLES } from "@/src/constants/styles";
import { useModelManager } from "@/src/hooks/useModelManager";
import { useRagModelProvider } from "@/src/providers/RAGModelProvider";
import { ModelType } from "@/src/types";
import { ExecuTorchLLM } from "@react-native-rag/executorch";
import React, { use, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const ProofOfConcept = () => {
  const {
    offlinePermission,
    models,
    updateModels,
    updateSelectedModel,
    selectedModel: storedSelectedModel,
  } = useRagModelProvider();

  const { llms, vectorStore, readyModels } = useModelManager();
  const [selectedLLM, setSelectedLLM] = useState<ExecuTorchLLM | null>(null);

  const [selectedModel, setSelectedModel] = useState<ModelType["id"]>("qwen3");
  const [confirmModel, setConfirmModel] = useState<ModelType | null>(null);

  useEffect(() => {
    if (readyModels.length === 0 && models.length === 1) {
      setSelectedModel(models[0].id);
    }
  }, [readyModels.length, models.length]);

  useEffect(() => {
    if (selectedModel) {
      const model = ModelMap.find((m) => m.id === selectedModel);
      setSelectedLLM(llms[model?.id as keyof typeof llms]);
    }
  }, [selectedModel]);

  const handleModelSelect = (id: ModelType["id"]) => {
    if (readyModels.find((m) => m.id === id)) {
      setSelectedModel(id);
    } else {
      const model = ModelMap.find((m) => m.id === id);
      if (model) {
        setConfirmModel(model);
      }
    }
  };

  const handleConfirmModel = ({ confirm }: { confirm: boolean }) => {
    if (confirm) {
      updateModels((prev) => [...prev, confirmModel as ModelType]);
      updateSelectedModel([
        ...storedSelectedModel,
        confirmModel?.id as ModelType["id"],
      ]);
      setSelectedLLM(llms[confirmModel?.id as keyof typeof llms]);
    }
    setConfirmModel(null);
  };

  return (
    <Container noPadding>
      {!offlinePermission && <OfflineModelNotice />}
      {offlinePermission && (!models || models.length === 0) && (
        <ModelSelector />
      )}
      {selectedLLM && (
        <RagModel
          vectorStore={vectorStore}
          llm={selectedLLM}
          selectedModel={
            models.find((m) => m.modelSource === selectedLLM) || models[0]
          }
        />
      )}
      {readyModels.length > 0 && models.length > 0 && (
        <View
          style={[STYLES.flexRow, STYLES.spaceBetween, STYLES.mHorizontal12]}
        >
          {ModelMap.map((model) => (
            <ModelSelectorCard
              key={model.id}
              name={model.name}
              onPress={() => handleModelSelect(model.id)}
              selected={model.id === selectedModel}
            />
          ))}
        </View>
      )}
      {confirmModel && (
        <View
          style={[
            STYLES.mHorizontal12,
            STYLES.spaceBetween,
            STYLES.flexRow,
            STYLES.itemsCenter,
          ]}
        >
          <BaseText text={`Download ${confirmModel.name} ?`} />
          <BaseButton
            text="Cancel"
            style={styles.btn}
            textStyle={styles.cancelButtonText}
            onPress={() => handleConfirmModel({ confirm: false })}
          />
          <BaseButton
            text="Download"
            style={[styles.btn]}
            textStyle={styles.downlaodButton}
            onPress={() => handleConfirmModel({ confirm: true })}
          />
        </View>
      )}
      {readyModels.length > 0 &&
        models.map(
          (model) =>
            !model.isReady &&
            model.downloadProgress !== 0 && (
              <DownloadProgress
                progress={model.downloadProgress}
                text={`Downloading ${model.name}`}
                key={model.id}
              />
            )
        )}
    </Container>
  );
};

const styles = StyleSheet.create({
  downlaodButton: {
    color: COLORS.green,
  },
  cancelButtonText: {
    color: COLORS.button,
  },
  btn: {
    backgroundColor: "transparent",
    padding: 0,
    width: "auto",
  },
});

export default ProofOfConcept;
