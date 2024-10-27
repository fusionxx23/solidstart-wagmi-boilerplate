import { Config, getAccount, watchAccount } from "@wagmi/core";
import { createSignal } from "solid-js";
export function useGetAccount({ config }: { config: Config }) {
  const initialAccount = getAccount(config);
  const [account, setAccount] = createSignal(initialAccount);
  const onChange = () => {
    const newAccount = getAccount(config);

    console.log("onChange", newAccount);
    setAccount(newAccount);
  };

  watchAccount(config, { onChange });
  return account;
}
