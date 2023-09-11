import React, { FC } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Polls } from "./polls";
import { getPoll, getPollIds } from "@/api/poll";
import { Account } from "./account";
import { getAccount } from "@/api/account";
import { resetAccount } from "@/utils/account";

interface PlatformProps {
  account: {
    address: string;
    passphrase: string;
  };
}

const Platform: FC<PlatformProps> = ({ account }) => {
  return (
    <div className="w-full p-4 lg:p-8 max-w-5xl">
      <Tabs.Root className="flex flex-col" defaultValue="polls">
        <Tabs.List
          className="shrink-0 flex border-b border-gray-300 dark:border-neutral-800"
          aria-label="Platform view"
        >
          <Tabs.Trigger
            className="border-gray-300 bg-gradient-to-b from-zinc-200 p-6 data-[state=active]:backdrop-blur-2xl dark:border-neutral-800 data-[state=active]:dark:bg-zinc-800/30 dark:from-inherit data-[state=active]:border data-[state=active]:bg-gray-200 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:focus:relative  outline-none cursor-default"
            value="polls"
          >
            Polls
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-gray-300 bg-gradient-to-b from-zinc-200 p-6 data-[state=active]:backdrop-blur-2xl dark:border-neutral-800 data-[state=active]:dark:bg-zinc-800/30 dark:from-inherit data-[state=active]:border data-[state=active]:bg-gray-200 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:focus:relative  outline-none cursor-default"
            value="account"
          >
            Account
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow py-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="polls"
        >
          <Polls
            userAddress={account.address}
            getPoll={getPoll}
            getPollIds={getPollIds}
          />
        </Tabs.Content>
        <Tabs.Content
          className="grow py-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="account"
        >
          <Account
            userAddress={account.address}
            getAccount={getAccount}
            logout={resetAccount}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export { Platform };
