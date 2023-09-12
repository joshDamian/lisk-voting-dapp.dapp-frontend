import { extractPrivateKey, getAccount } from "@/utils/account";
import { getLiskClient } from "@/utils/getLiskClient";
import { convertLSKToBeddows } from "@/utils/transaction";

interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  date: number;
  creator: string;
  expirationDate: number;
  votes: {
    voter: string;
    date: number;
    option: string;
  }[];
}

export const getPoll = async (id: string): Promise<Poll> => {
  const liskClient = await getLiskClient();
  const poll = await liskClient.invoke<Poll>("poll_getPoll", { id });
  return poll;
};

export const getPollIds = async (address: string = ""): Promise<string[]> => {
  const liskClient = await getLiskClient();
  const pollIds = await liskClient.invoke<string[]>("poll_getPolls", { address });
  return pollIds.reverse();
};

export const createPoll = async (payload: {
  title: string;
  description: string;
  options: string[];
  expirationDate: number;
}) => {
  const account = getAccount();
  if (!account) throw new Error("Authenticate first");
  const liskClient = await getLiskClient();

  const sk = await extractPrivateKey(account.passphrase);

  const tx = await liskClient.transaction.create(
    {
      module: "poll",
      command: "createPoll",
      fee: BigInt(convertLSKToBeddows("0.1")),
      params: payload,
    },
    sk.toString("hex")
  );
  await liskClient.transaction.send(tx);
};

export const vote = async (pollId: string, option: string) => {
  const account = getAccount();
  if (!account) throw new Error("Authenticate first");
  const liskClient = await getLiskClient();

  const sk = await extractPrivateKey(account.passphrase);

  const tx = await liskClient.transaction.create(
    {
      module: "poll",
      command: "voteOnPoll",
      fee: BigInt(convertLSKToBeddows("0.1")),
      params: {
        pollId,
        option,
      },
    },
    sk.toString("hex")
  );
  await liskClient.transaction.send(tx);
};
