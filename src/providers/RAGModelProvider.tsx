import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ModelProviderProps, ModelType } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModelContext = createContext<ModelProviderProps>({
  offlinePermission: false,
  setOfflinePermission: (v: boolean) => {},
  isModelReady: false,
  setModelReady: (v: boolean) => {},
  models: [],
  updateModels: () => {},
});

const RAGModelProvider = ({ children }: PropsWithChildren) => {
  const [offlinePermission, setOfflinePermission] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [models, setModels] = useState<ModelType[]>([]);

  useEffect(() => {
    const checkModelStatus = async () => {
      const offlinePermission = await AsyncStorage.getItem("offlinePermission");
      setOfflinePermission(offlinePermission === "true");
      const modelReady = await AsyncStorage.getItem("modelReady");
      setIsModelReady(modelReady === "true");
    };

    checkModelStatus().catch(console.error);
  }, []);

  const handleOfflinePermission = (permission: boolean) => {
    setOfflinePermission(permission);
    AsyncStorage.setItem("offlinePermission", String(permission));
  };

  const handleModelReady = (ready: boolean) => {
    setIsModelReady(ready);
    AsyncStorage.setItem("modelReady", String(ready));
  };

  useEffect(() => {
    if (offlinePermission) {
    }
  }, [offlinePermission]);

  return (
    <ModelContext.Provider
      value={{
        offlinePermission,
        setOfflinePermission: handleOfflinePermission,
        isModelReady,
        setModelReady: handleModelReady,
        models,
        updateModels: setModels,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default RAGModelProvider;

export const useRAGModel = () => useContext(ModelContext);
