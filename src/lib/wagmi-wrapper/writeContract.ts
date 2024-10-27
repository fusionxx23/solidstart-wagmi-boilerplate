import { MutationOptions } from "@tanstack/solid-query";
import { Config, writeContract, WriteContractErrorType } from "@wagmi/core";
import { WriteContractData, WriteContractVariables } from "@wagmi/core/query";
import { Abi } from "viem";

export function writeContractMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return writeContract(config, variables);
    },
    mutationKey: ["writeContract"],
  } as const satisfies MutationOptions<
    WriteContractData,
    WriteContractErrorType,
    WriteContractVariables<
      Abi,
      string,
      readonly unknown[],
      config,
      config["chains"][number]["id"]
    >
  >;
}
