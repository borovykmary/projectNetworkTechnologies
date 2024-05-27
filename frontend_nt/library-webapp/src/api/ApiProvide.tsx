import { createContext, useContext } from "react";
import { LibraryClient } from "./library-clients";

const ApiContext = createContext(new LibraryClient());

export default function ApiProvider({ children }: any) {
  const apiClient = new LibraryClient();
  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
