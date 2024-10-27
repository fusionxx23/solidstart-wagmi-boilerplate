import { createAppKit } from "@reown/appkit";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 1. Get a project ID at https://cloud.reown.com
const projectId = "3e0bd05f2cb55ad94bc32398b44eeeaa";

export const networks = [mainnet, arbitrum];

// 2. Set up Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

// 3. Configure the metadata
const metadata = {
  name: "AppKit",
  description: "SolidStart Wagmi Boilerplate",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export default function ConnectButton() {
  return (
    <div class="py-2">
      <button
        class="px-4 py-2 border border-black rounded-md"
        onClick={() => modal.open()}
      >
        Connect
      </button>
    </div>
  );
}
