import { apiClient } from "@liskhq/lisk-client";
const liskBrowserClient = require("@liskhq/lisk-client/browser");

type ApiClient = Awaited<ReturnType<typeof apiClient.createWSClient>>;

const apiClientHelper = liskBrowserClient.apiClient;
const apiUrl = "ws://localhost:7887/rpc-ws";

let clientInstance: ApiClient;

export const getLiskClient = async () => {
  if (clientInstance) return clientInstance;

  clientInstance = await apiClientHelper.createWSClient(apiUrl);

  return clientInstance;
};
