import { FC } from "react";
import useSWR from "swr";
import { VotesReport } from "./votesReport";
import { Vote } from "./vote";
import { vote } from "@/api/poll";
import { useRouter } from "next/router";

interface PollProps {
  userAddress: string;
  pollId: string;
  getPoll: (pollId: string) => Promise<{
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
  }>;
}

const Poll: FC<PollProps> = ({ pollId, userAddress, getPoll }) => {
  const router = useRouter();

  const key = `/api/polls/${pollId}`;
  const { data: poll, error } = useSWR(key, () => getPoll(pollId));

  if (error) return <div>Error loading poll.</div>;
  if (!poll) return <div>Loading</div>;

  const isExpired = new Date().getTime() / 1000 > poll.expirationDate;
  const votedOption = poll.votes.find(
    (v) => v.voter.toLowerCase() === userAddress.toLowerCase()
  )?.option;

  return (
    <div>
      <div className="space-y-8">
        <section className="flex justify-between space-x-3">
          <div>
            <h3 className="text-xl font-semibold lg:text-2xl">{poll.title}</h3>
            <p className="text-xs opacity-60 mt-1">Created by: {poll.creator}</p>
          </div>
          <div>
            <div
              className={`${
                isExpired ? "bg-red-500" : "bg-green-500"
              } py-1.5 px-3 rounded-full`}
            >
              {isExpired ? "Expired" : "Active"}
            </div>
          </div>
        </section>
        <section className="border-gray-300 dark:border-neutral-800 bg-gradient-to-b from-zinc-200 p-6 backdrop-blur-2xl dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 relative">
          <VotesReport options={poll.options} votes={poll.votes} />
        </section>
        <section className="border-y py-6 border-gray-300 dark:border-neutral-800">
          <h3 className="text-lg font-semibold lg:text-xl mb-6">Vote</h3>
          <Vote
            canVote={!isExpired && !Boolean(votedOption)}
            vote={async (option) => {
              await vote(poll.id, option);
              router.reload();
            }}
            votedOption={votedOption}
            options={poll.options}
          />
        </section>
        <section>
          <h3 className="text-lg font-semibold lg:text-xl">About</h3>
          <p>{poll.description}</p>
        </section>
      </div>
    </div>
  );
};

export { Poll };
