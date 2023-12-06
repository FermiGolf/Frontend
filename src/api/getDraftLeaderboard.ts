import { getDraftLeaderboardClient } from "./const";

export async function getGameLeaderboard(draftId:string) {
  const client = getDraftLeaderboardClient(draftId);
    const response = await fetch(client.url,{method:client.method});
    const draftLeaderboard = await response.json();
    return draftLeaderboard;
  }