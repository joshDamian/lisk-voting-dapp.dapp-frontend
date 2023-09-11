import { FC } from "react";
import useSWR from "swr";
import { PollCard } from "../polls/pollCard";
import { getPoll } from "@/api/poll";
import { useRouter } from "next/router";

interface AccountProps {
  userAddress: string;
  getAccount: (userAddress: string) => Promise<{
    address: string;
    forYou: {
      polls: string[];
      votes: string[];
    };
    balance: number;
  }>;
  logout: () => void;
}

const Account: FC<AccountProps> = ({ userAddress, getAccount, logout }) => {
  const router = useRouter();

  const key = `/api/account`;

  const { data: account, error } = useSWR(key, () => getAccount(userAddress));

  if (error) return <div>Error loading account.</div>;
  if (!account) return <div>Loading</div>;

  const voteCount = account.forYou.votes.length;
  const pollCount = account.forYou.polls.length;

  return (
    <div className="space-y-14">
      <section className="w-fit flex items-center gap-x-4">
        <div className="rounded-full p-3 border dark:border-neutral-800 border-gray-300">
          <span className="opacity-80">{account.address}</span>
        </div>
        <button
          type="button"
          className="underline"
          onClick={() => {
            logout();
            router.reload();
          }}
        >
          Logout
        </button>
      </section>
      <section className="flex dark:divide-neutral-800 divide-gray-300 divide-x">
        <div className="pr-20">
          <h3 className="text-lg mb-2 opacity-60">Polls Created</h3>
          <p className="text-5xl">{pollCount}</p>
        </div>
        <div className="pl-6 pr-20">
          <h3 className="text-lg mb-2 opacity-60">Total Votes</h3>
          <p className="text-5xl">{voteCount}</p>
        </div>
        <div className="pl-6">
          <h3 className="text-lg mb-2 opacity-60">Lisk Balance</h3>
          <p className="text-5xl">{account.balance}</p>
        </div>
      </section>
      <section>
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Your Polls</h3>
          <button
            type="button"
            className="bg-blue-500 py-3 px-5 text-center rounded-full"
          >
            Create Poll
          </button>
        </div>
        <div className="flex flex-col mt-8 gap-6">
          {account.forYou.polls.map((pollId) => (
            <PollCard
              key={pollId}
              pollId={pollId}
              getPoll={getPoll}
              userAddress={account.address}
            />
          ))}
          {account.forYou.polls.length === 0 && (
            <div className="text-center">No polls found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export { Account };
