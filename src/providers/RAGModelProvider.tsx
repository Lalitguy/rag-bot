import { createContext, PropsWithChildren, useContext } from "react";
import { ModelProviderProps } from "../types";

const ModelContext = createContext<ModelProviderProps>({
  offlinePermission: false,
  setOfflinePermission: () => {},
  isModelDownloading: false,
  downloadModel: () => {},
  downloadProgress: 0,
  error: null,
  isModelReady: false,
});

const RAGModelProvider = ({ children }: PropsWithChildren) => {
  return (
    <ModelContext.Provider
      value={{
        offlinePermission: false,
        setOfflinePermission: () => {},
        isModelDownloading: false,
        downloadModel: () => {},
        downloadProgress: 0,
        error: null,
        isModelReady: false,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default RAGModelProvider;

export const useRAGModel = () => useContext(ModelContext);
