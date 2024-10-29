import { getAccount, watchAccount } from "@wagmi/core";
import { createSignal } from "solid-js";
import { useConfig } from "./configProvider";
export function useGetAccount() {
  const config = useConfig();
  const initialAccount = getAccount(config);
  console.log(initialAccount);
  const [account, setAccount] = createSignal(initialAccount);
  const onChange = () => {
    console.log("ON CHANGE");
    const newAccount = getAccount(config);
    setAccount(newAccount);
  };

  watchAccount(config, { onChange });
  return account;
}
