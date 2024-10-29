import { connect, getConnectors, watchConnectors } from "@wagmi/core";
import { config } from "../config";
import { createEffect, createSignal } from "solid-js";

export function useGetConnector() {
  const initConnector = getConnectors(config);
  const [connector, setConnectors] = createSignal(initConnector);

  const onChange = () => {
    const newConnectors = getConnectors(config);
    setConnectors(newConnectors);
  };
  watchConnectors(config, { onChange });
  return connector;
}
