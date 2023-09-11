const liskBrowserClient = require("@liskhq/lisk-client/browser");

const cryptography = liskBrowserClient.cryptography;

interface Account {
  address: string;
  passphrase: string;
}

const LOCAL_STORAGE_KEY = "USER_ACCOUNT";

export const setupAccount = async (passphrase: string) => {
  if (typeof window === "undefined") return;
  const address = await getAddressFromPassphrase(passphrase);
  const account = {
    address: address,
    passphrase: passphrase,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(account));
};

export const getAccount = (): Account | null => {
  if (typeof window === "undefined") return null;
  const account = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!account) return null;

  return JSON.parse(account) as Account;
};

export const extractPrivateKey = async (passphrase: string): Promise<Buffer> => {
  return await cryptography.ed.getPrivateKeyFromPhraseAndPath(
    passphrase,
    "m/44'/134'/0'"
  );
};
export const getAddressFromPassphrase = async (passphrase: string): Promise<string> => {
  const privateKey = await extractPrivateKey(passphrase);

  const addressBuffer = cryptography.address.getAddressFromPrivateKey(privateKey);
  const address = cryptography.address.getLisk32AddressFromAddress(addressBuffer);

  return address;
};
