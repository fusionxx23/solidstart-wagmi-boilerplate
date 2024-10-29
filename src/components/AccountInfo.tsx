import { useGetAccount } from "~/lib/wagmi-wrapper/getAccount";
import { useSimulateMintWeth } from "./hooks/useSimulateMintWeth";
import { useGetConnector } from "~/lib/wagmi-wrapper/getConnector";
import { initializeWagmiConfig } from "./hooks/useIsConnected";

export default function AccountInfo() {
  const account = useGetAccount();
  useSimulateMintWeth();

  initializeWagmiConfig();
  useGetConnector();
  return (
    <div class="">
      <div>
        <span>Address: {account().address}</span>
        <span>ChainId: {account().chainId}</span>
      </div>
      <div>
        <span>isConnected: {account().isConnected ? "True" : "False"}</span>
      </div>
    </div>
  );
}
