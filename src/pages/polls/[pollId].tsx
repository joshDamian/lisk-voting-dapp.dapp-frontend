import { Poll } from "@/components/platform/polls/poll";
import { NextPageWithLayout } from "../_app";
import { Layout } from "@/components/layout";
import { useRouter } from "next/router";
import { getPoll } from "@/api/poll";
import useSWR from "swr";
import { getAccount } from "@/utils/account";
import Link from "next/link";

const PollPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { pollId } = router.query;

  const key = "/account";
  const { data: account, isLoading, error } = useSWR(key, () => getAccount());

  if (!pollId) return <></>;
  if (account === undefined) return <div>Loading</div>;
  if (account === null) return router.push("/");

  return (
    <div>
      <div className="mb-6">
        <Link className="underline" href={"/"}>
          {"< See All Polls"}
        </Link>
      </div>
      <Poll pollId={pollId as string} getPoll={getPoll} userAddress={account.address} />
    </div>
  );
};

PollPage.getLayout = (page) => <Layout>{page}</Layout>;

export default PollPage;
