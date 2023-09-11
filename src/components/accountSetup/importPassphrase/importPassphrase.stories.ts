import type { Meta, StoryObj } from "@storybook/react";
import { ImportPassphrase } from "./importPassphrase";

const meta = {
  title: "Account Setup/Import Passphrase",
  component: ImportPassphrase,
  tags: ["autodocs"],
  args: {
    setupAccount: (passphrase) => new Promise((resolve) => {}),
    numberOfWords: 24,
  },
} satisfies Meta<typeof ImportPassphrase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story: Story = {};
