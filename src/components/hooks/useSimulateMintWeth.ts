import { simulateContract } from "@wagmi/core";
import { useGetAccount } from "~/lib/wagmi-wrapper/getAccount";
import { createQuery } from "@tanstack/solid-query";
import { wethContract } from "~/contracts/wethContract";
import { parseUnits } from "viem";
import { useConfig } from "~/lib/wagmi-wrapper/configProvider";
export function useSimulateMintWeth() {
  const config = useConfig();
  const account = useGetAccount();
  console.log("MintWeth", account().chainId, account().address);
  const result = createQuery(() => ({
    queryFn: async () => {
      console.log(config.state, "STATe");
      console.log("RAN HERE");
      try {
        const result = await simulateContract(config, {
          ...wethContract,
          functionName: "deposit",
          value: parseUnits("0.001", 18),
        });
        return result;
      } catch (e) {
        // console.log(e);
      }
      return {};
    },
    queryKey: ["MintWeth", account().chainId],
    enabled: Boolean(account().address && account().chainId),
  }));
  return result;
}
