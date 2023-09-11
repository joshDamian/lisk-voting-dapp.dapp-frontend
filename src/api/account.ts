import { getLiskClient } from "@/utils/getLiskClient";
import { convertBeddowsToLSK } from "@/utils/transaction";

interface Account {
  address: string;
  forYou: {
    polls: string[];
    votes: string[];
  };
  balance: number;
}

export const getAccount = async (address: string): Promise<Account> => {
  const liskClient = await getLiskClient();
  const account = await liskClient.invoke<Account>("poll_getAccount", { address });

  const nativeBalance = await liskClient.invoke<{
    availableBalance: string;
  }>("token_getBalance", {
    tokenID: "1481248200000000",
    address,
  });

  return {
    ...account,
    balance: parseFloat(convertBeddowsToLSK(nativeBalance.availableBalance)),
  };
};
