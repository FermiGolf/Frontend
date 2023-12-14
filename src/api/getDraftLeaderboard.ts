import { getDraftLeaderboardClient } from "./const";

export const draftNotFoundErrMsg = 'draft not found'
export async function getGameLeaderboard(draftId:string) {
  const client = getDraftLeaderboardClient(draftId);
    const response = await fetch(client.url,{method:client.method});
    const draftLeaderboard = await response.json();
    if (response.status === 200){
      return draftLeaderboard;
      }
      else if (response.status === 404){
        throw new Error(draftNotFoundErrMsg);
        }
      else{
        const errorMsg = response.statusText;
        throw new Error(errorMsg);
      }

  }