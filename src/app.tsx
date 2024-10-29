import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { AppKitProvider } from "./components/appKitProvider";

import { clientOnly } from "@solidjs/start";
const queryClient = new QueryClient();

const ConfigProvider = clientOnly(
  () => import("./lib/wagmi-wrapper/configProvider"),
);
export default function App() {
  return (
    <ConfigProvider>
      <AppKitProvider>
        <QueryClientProvider client={queryClient}>
          <Router
            root={(props) => (
              <>
                <Nav />
                <Suspense>{props.children}</Suspense>
              </>
            )}
          >
            <FileRoutes />
          </Router>
        </QueryClientProvider>
      </AppKitProvider>
    </ConfigProvider>
  );
}
