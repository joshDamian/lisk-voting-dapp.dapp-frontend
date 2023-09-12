import Link from "next/link";
import { FC } from "react";
import useSWR from "swr";

interface PollCardProps {
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

const PollCard: FC<PollCardProps> = ({ pollId, userAddress, getPoll }) => {
  const key = `/api/polls/${pollId}`;

  const { data: poll, error } = useSWR(key, () => getPoll(pollId));

  if (error) return <div>Error loading poll.</div>;
  if (!poll) return <div>Loading</div>;

  const voteCount = poll.votes.length;
  const isExpired = new Date().getTime() / 1000 > poll.expirationDate;
  return (
    <div className="border-gray-300 dark:border-neutral-800 bg-gradient-to-b from-zinc-200 p-6 backdrop-blur-2xl dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 min-w-full lg:min-w-[580px] relative">
      <Link href={`/polls/${poll.id}`} className="absolute inset-0 z-50" />
      <h3 className="text-xl font-medium">{poll.title}</h3>
      <p className="opacity-50 py-4 line-clamp-1">{poll.description}</p>
      <div className="flex items-center justify-between">
        <h3 className="opacity-70">
          <span className="text-xl font-medium">{voteCount}</span>{" "}
          {voteCount === 1 ? "vote" : "votes"}
        </h3>
        <div
          className={`${
            isExpired ? "bg-red-500" : "bg-green-500"
          } py-1.5 px-3 rounded-full`}
        >
          {isExpired ? "Expired" : "Active"}
        </div>
      </div>
    </div>
  );
};

export { PollCard };
