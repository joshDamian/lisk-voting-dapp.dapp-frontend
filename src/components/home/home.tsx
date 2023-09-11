import { getAccount, setupAccount } from "@/utils/account";
import { FC } from "react";
import { Platform } from "../platform";
import { AccountSetup } from "../accountSetup";
import * as bip39 from "bip39";
import useSwr from "swr";

const ENTROPY = 256; // 256 bits of entropy for 24 words

const Home: FC = () => {
  const key = "/account";
  const { data: account, isLoading, error } = useSwr(key, () => getAccount());

  if (error) return <div>Error loading account</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <section>
      {account ? (
        <Platform account={account} />
      ) : (
        <AccountSetup
          setupAccount={setupAccount}
          createAccount={() => Promise.resolve(bip39.generateMnemonic(ENTROPY))}
        />
      )}
    </section>
  );
};

export { Home };
