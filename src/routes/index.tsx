import { A } from "@solidjs/router";
import AccountInfo from "~/components/AccountInfo";
import Counter from "~/components/Counter";
import { clientOnly } from "@solidjs/start";
const ConnectButton = clientOnly(() => import("../components/ConnectButton"));
export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Counter />
      <ConnectButton />
      <AccountInfo />
    </main>
  );
}
