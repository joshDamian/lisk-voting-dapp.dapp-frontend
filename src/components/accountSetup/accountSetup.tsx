import { FC } from "react";
import { ImportPassphrase } from "./importPassphrase";

interface AccountSetupProps {
  setupAccount: (passphrase: string) => Promise<void>;
  createAccount: () => Promise<string>;
}

const AccountSetup: FC<AccountSetupProps> = ({ setupAccount, createAccount }) => {
  async function createNewAccount() {
    try {
      const passphrase = await createAccount();
      await setupAccount(passphrase);
    } catch (error) {}
  }
  return (
    <div className="p-4 lg:p-8">
      <h3 className="mb-8 text-xl lg:text-4xl">Authenticate to continue</h3>
      <section className="text-center p-8 dark:border-neutral-800 border-gray-300 border rounded-xl">
        <button
          type="button"
          className="lg:text-lg font-medium bg-blue-500 py-3 px-4 rounded-md"
          onClick={createNewAccount}
        >
          Create New Account
        </button>
      </section>
      <h3 className="text-center my-6 opacity-70 text-2xl">OR</h3>
      <section>
        <h3 className="mb-4 lg:text-lg font-medium">Import Passphrase</h3>
        <ImportPassphrase setupAccount={setupAccount} numberOfWords={24} />
      </section>
    </div>
  );
};

export { AccountSetup };
