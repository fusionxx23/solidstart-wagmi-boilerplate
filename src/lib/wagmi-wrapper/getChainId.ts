import { Config, getChainId, watchChainId } from "@wagmi/core";
import { createSignal } from "solid-js";
export function useGetChainId({ config }: { config: Config }) {
  const initialChainId = getChainId(
    config,
  ) as (typeof config)["chains"][number]["id"];
  const [chainId, setChainId] = createSignal(initialChainId);
  const onChange = () => {
    const newChainId = getChainId(
      config,
    ) as (typeof config)["chains"][number]["id"];
    console.log("onChange", newChainId);
    setChainId(newChainId);
  };
  watchChainId(config, { onChange });

  return chainId;
}
