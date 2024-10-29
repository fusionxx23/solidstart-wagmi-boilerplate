// AppKitProvider.jsx
import { createContext, createSignal, useContext, type JSX } from "solid-js";
import { createAppKit } from "@reown/appkit";
import { arbitrum, mainnet } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 1. Get a project ID at https://cloud.reown.com
const projectId = "3e0bd05f2cb55ad94bc32398b44eeeaa";

export const networks = [mainnet, arbitrum];

// 2. Set up Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

// 3. AppKiture the metadata
const metadata = {
  name: "AppKit",
  description: "SolidStart Wagmi Boilerplate",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum],
  metadata,

  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
const AppKitContext = createContext(modal);
export const AppKitProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <AppKitContext.Provider value={modal}>{children}</AppKitContext.Provider>
  );
};

export function useAppKit() {
  const context = useContext(AppKitContext);
  // if (context) {
  //   throw new Error("useAppKit must be within ConfigProvider!");
  // }
  return context;
}
