const liskBrowserClient = require("@liskhq/lisk-client/browser");

export const validatePassphrase = (
  passphrase: string,
  numberOfWords: number
): Array<{
  message: string;
  code: string;
}> => {
  if (passphrase.trim().length === 0) {
    return [{ code: "empty_value", message: "Invalid Passphrase" }];
  }

  return liskBrowserClient.passphrase.validation.getPassphraseValidationErrors(
    passphrase,
    undefined,
    numberOfWords
  );
};
