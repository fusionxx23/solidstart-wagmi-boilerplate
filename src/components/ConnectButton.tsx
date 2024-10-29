import { useGetConnector } from "~/lib/wagmi-wrapper/getConnector";
import { useAppKit } from "./appKitProvider";
import { For } from "solid-js";

export default function ConnectButton() {
  const connectors = useGetConnector();
  return (
    <div class="py-2">
      <For each={connectors()}>
        {(connector) => (
          <>
            <button type="button" onClick={() => connector.connect()}>
              Connect {connector.name}
            </button>
            <button type="button" onClick={() => connector.disconnect()}>
              Disconnect {connector.name}
            </button>
          </>
        )}
      </For>
    </div>
  );
}
