import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  docType,
  ModelProviderProps,
  ModelType,
  VectorStoreModelType,
} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModelMap, VectorStore } from "../constants/map";

const ModelContext = createContext<ModelProviderProps>({
  offlinePermission: false,
  setOfflinePermission: (v: boolean) => {},
  models: [],
  updateModels: () => {},
  vectorStoreModel: VectorStore,
  setVectorStoreModel: () => {},
  selectedModel: [],
  updateSelectedModel: (v: ModelType["id"][]) => {},
  docs: [],
  setDocs: () => {},
});

const RAGModelProvider = ({ children }: PropsWithChildren) => {
  const [offlinePermission, setOfflinePermission] = useState(false);
  const [models, setModels] = useState<ModelType[]>([]);
  const [vectorStoreModel, setVectorStoreModel] =
    useState<VectorStoreModelType>(VectorStore);
  const [selectedModel, setSelectedModel] = useState<ModelType["id"][]>([]);
  const [docs, setDocs] = useState<docType[]>([]);

  useEffect(() => {
    const checkModelStatus = async () => {
      const offlinePermission = await AsyncStorage.getItem("offlinePermission");
      setOfflinePermission(offlinePermission === "true");

      for (const model of ModelMap) {
        const isReady = await AsyncStorage.getItem(`model_ready_${model.id}`);
        const modelSelected = await AsyncStorage.getItem(
          `model_selected_${model.id}`
        );
        if (modelSelected === "true") {
          setSelectedModel((prev) => [...prev, model.id]);
          setModels((prev) => [
            ...prev,
            { ...model, isReady: isReady === "true" },
          ]);
        }
      }
    };

    checkModelStatus();
  }, []);

  const handleOfflinePermission = useCallback((permission: boolean) => {
    setOfflinePermission(permission);
    AsyncStorage.setItem("offlinePermission", String(permission));
  }, []);

  const handleSelectedModel = useCallback((model: ModelType["id"][]) => {
    setSelectedModel(model);
    for (const id of model) {
      const key = `model_selected_${id}`;
      AsyncStorage.setItem(key, "true");
    }
  }, []);

  return (
    <ModelContext.Provider
      value={{
        offlinePermission,
        setOfflinePermission: handleOfflinePermission,
        models,
        updateModels: setModels,
        vectorStoreModel,
        setVectorStoreModel: setVectorStoreModel,
        selectedModel,
        updateSelectedModel: handleSelectedModel,
        docs,
        setDocs,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default RAGModelProvider;

export const useRagModelProvider = () => useContext(ModelContext);
