// ConfigProvider.jsx
import { createContext, useContext, JSX } from "solid-js";
import { config } from "../config";

const ConfigContext = createContext<{ config: typeof config }>();
export const ConfigProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be within ConfigProvider!");
  }
  return context;
}
