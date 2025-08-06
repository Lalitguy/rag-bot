import BaseText from "@/src/components/common/BaseText";
import Container from "@/src/components/common/Container";
import DownloadProgress from "@/src/components/common/DownloadProgress";
import ModelSelector from "@/src/components/ModelSelector";
import OfflineModelNotice from "@/src/components/OfflineModelNotice";
import RagModel from "@/src/components/RagModel";
import { COLORS } from "@/src/constants/colors";
import { useModelManager } from "@/src/hooks/useModelManager";
import { useRagModelProvider } from "@/src/providers/RAGModelProvider";
import { ExecuTorchLLM } from "@react-native-rag/executorch";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const ProofOfConcept = () => {
  const { offlinePermission, models } = useRagModelProvider();

  const { llms, vectorStore } = useModelManager();
  const [selectedLLM, setSelectedLLM] = useState<ExecuTorchLLM | null>(null);

  useEffect(() => {
    if (models.length) {
      setSelectedLLM(llms[models[0].id as keyof typeof llms]);
    }
  }, [llms]);

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
      {/*readyModels.length > 0 && models.length > 0 && (
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
        ) */}
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
