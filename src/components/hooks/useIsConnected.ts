import { useConfig } from "~/lib/wagmi-wrapper/configProvider";
import { useGetConnector } from "~/lib/wagmi-wrapper/getConnector";
const deadState = {
  chainId: 11155111 as const,
  connections: new Map(),
  current: null,
  status: "disconnected" as const,
};
/**
 * useIsConnected
 * Function grab connector info on refresh.
 */
export async function initializeWagmiConfig() {
  const config = useConfig();
  const connectorsState = useGetConnector();
  async function getChainId() {
    const connectors = connectorsState();
    for (const connector of connectors) {
      const isAuthorized = await connector.isAuthorized();
      if (isAuthorized) {
        const accounts = await connector.getAccounts();
        const chainId = await connector.getChainId();
        const newState = {
          chainId: 11155111 as const,
          connections: new Map().set(connector.uid, {
            accounts: accounts,
            chaindId: chainId,
            connector,
          }),
          current: connector.uid,
          status: "connected" as const,
        };
        config.setState(newState);
        return true;
      }
    }
    return false;
  }

  const foundConnect = await getChainId();
  if (foundConnect) {
    //@ts-ignore
    const provider = window?.ethereum;
    if (provider) {
      provider.on("accountsChanged", (accounts: string[]): void => {
        if (accounts.length === 0) {
          config.setState(deadState);
        }
      });
    }
  }
}
