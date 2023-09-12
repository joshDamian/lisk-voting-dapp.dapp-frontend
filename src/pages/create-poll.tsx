import { CreatePoll } from "@/components/createPoll";
import { NextPageWithLayout } from "./_app";
import { Layout } from "@/components/layout";
import { createPoll } from "@/api/poll";
import { useRouter } from "next/router";
import Link from "next/link";

const CreatePollPage: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-6">
        <Link className="underline" href={"/"}>
          {"< See All Polls"}
        </Link>
      </div>
      <h3 className="mb-8 text-xl lg:text-4xl text-center">Create A Poll</h3>
      <CreatePoll
        createPoll={async (payload) => {
          await createPoll(payload);
          router.push("/");
        }}
      />
    </div>
  );
};

CreatePollPage.getLayout = (page) => <Layout>{page}</Layout>;

export default CreatePollPage;
