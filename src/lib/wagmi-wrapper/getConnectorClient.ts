import {
  QueryOptions,
  useQueryClient,
  createQuery,
} from "@tanstack/solid-query";
import {
  Config,
  getConnectorClient,
  GetConnectorClientErrorType,
  GetConnectorClientReturnType,
} from "@wagmi/core";
import {
  GetConnectorClientData,
  GetConnectorClientOptions,
  GetConnectorClientQueryFnData,
  GetConnectorClientQueryKey,
  getConnectorClientQueryKey,
} from "@wagmi/core/query";
import { useConfig } from "./configProvider";
import { useGetAccount } from "./getAccount";
import { useGetChainId } from "./getChainId";

export function useGetConnectorClient() {
  const { config } = useConfig();
  const queryClient = useQueryClient();
  const account = useGetAccount({ config });
  const chainId = useGetChainId({ config });
  const activeConnector = account().connector;
  const { queryKey, ...options } = getConnectorClientQueryOptions(config, {
    chainId: chainId() as (typeof config)["chains"][number]["id"],
    connector: activeConnector,
  });

  const connectorQuery = createQuery(() => ({
    queryKey: queryKey,
    queryClient,
    queryFn: options.queryFn,
  }));

  return connectorQuery;
}

export function getConnectorClientQueryOptions<
  config extends Config,
  chainId extends config["chains"][number]["id"],
>(config: config, options: GetConnectorClientOptions<config, chainId> = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { connector } = options;
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1];
      return getConnectorClient(config, {
        ...parameters,
        connector,
      }) as unknown as Promise<GetConnectorClientReturnType<config, chainId>>;
    },
    queryKey: getConnectorClientQueryKey(options),
  } as const satisfies QueryOptions<
    GetConnectorClientQueryFnData<config, chainId>,
    GetConnectorClientErrorType,
    GetConnectorClientData<config, chainId>,
    GetConnectorClientQueryKey<config, chainId>
  >;
}
