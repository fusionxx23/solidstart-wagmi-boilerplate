import { http, createConfig, injected, createStorage } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { createContext, useContext, type JSX } from "solid-js";

export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  storage: createStorage({ storage: window?.localStorage }),
  transports: {
    [sepolia.id]: http(),
  },
});

const ConfigContext = createContext(config);
const ConfigProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export function useConfig() {
  const context = useContext(ConfigContext);
  // if (context) {
  //   throw new Error("useConfig must be within ConfigProvider!");
  // }
  return context;
}
export default ConfigProvider;
