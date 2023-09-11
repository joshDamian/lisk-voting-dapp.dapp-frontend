import { ComponentProps, FC } from "react";
import { PollCard } from "./pollCard";
import useSWR from "swr";

type PollCardProps = ComponentProps<typeof PollCard>;

interface PollsProps {
  userAddress: string;
  getPollIds: () => Promise<Array<string>>;
  getPoll: PollCardProps["getPoll"];
}

const Polls: FC<PollsProps> = ({ userAddress, getPollIds, getPoll }) => {
  const key = "/api/polls";
  const { data: pollIds, error, isLoading } = useSWR(key, () => getPollIds());

  if (error) return <div>Error loading polls</div>;
  if (!pollIds) return <div>Loading</div>;
  return (
    <section className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      {pollIds.map((pollId) => (
        <PollCard
          key={pollId}
          pollId={pollId}
          getPoll={getPoll}
          userAddress={userAddress}
        />
      ))}
      {pollIds.length === 0 && <div className="text-center">No polls found</div>}
    </section>
  );
};

export { Polls };
