// ConfigProvider.jsx
import { createContext, useContext, JSX, createSignal } from "solid-js";
import { useConfig } from "./configProvider";
import { getClient, watchClient } from "@wagmi/core";

const ConfigContext = createContext();
export const ClientProvider = ({ children }: { children: JSX.Element }) => {
  const { config } = useConfig();
  const initClient = getClient(config);
  const [client, setClient] = createSignal(initClient);
  const onChange = () => {
    setClient(getClient(config));
  };
  watchClient(config, { onChange });
  return (
    <ConfigContext.Provider value={{ client }}>
      {children}
    </ConfigContext.Provider>
  );
};

export function useClient() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be within ConfigProvider!");
  }
  return context;
}
