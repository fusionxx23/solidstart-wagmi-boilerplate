import { createGetAccount } from "~/lib/wagmi-wrapper/getAccount";

export default function AccountInfo() {
  const account = createGetAccount();
  return (
    <div class="">
      <div>
        <span>Address: {account().address}</span>
      </div>
      <div>
        <span>isConnected: {account().isConnected ? "True" : "False"}</span>
      </div>
    </div>
  );
}
