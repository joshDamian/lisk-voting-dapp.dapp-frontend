const liskBrowserClient = require("@liskhq/lisk-client/browser");

const transactions = liskBrowserClient.transactions;

export const convertBeddowsToLSK = (beddows: string): string => {
  return transactions.convertBeddowsToLSK(beddows);
};
