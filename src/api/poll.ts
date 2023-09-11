import { getLiskClient } from "@/utils/getLiskClient";

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
  return pollIds;
};
