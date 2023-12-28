
import { getDraftsByTornamentClient } from "./const";

export const draftNotFoundByTornamentErrMsg = 'draft not found'
export async function getDrafts(draftId:string) {
  const client = getDraftsByTornamentClient(draftId);
    const response = await fetch(client.url,{method:client.method});
    if (response.status === 200){
      const drafts = await response.json();
      return drafts;
      }
      else if (response.status === 404){
        throw new Error(draftNotFoundByTornamentErrMsg);
        }
      else{
        const errorMsg = response.statusText;
        throw new Error(errorMsg);
      }

  }