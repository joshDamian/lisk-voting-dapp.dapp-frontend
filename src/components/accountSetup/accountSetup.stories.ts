import type { Meta, StoryObj } from "@storybook/react";
import { AccountSetup } from "./accountSetup";

const meta = {
  title: "Account Setup",
  component: AccountSetup,
  tags: ["autodocs"],
  args: {
    setupAccount: (passphrase) => new Promise((resolve) => {}),
    createAccount: () =>
      new Promise((resolve) => {
        resolve("height property grow");
      }),
  },
} satisfies Meta<typeof AccountSetup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story: Story = {};
