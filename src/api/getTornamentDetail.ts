
import { getTornamentClient } from "./const";

export const tornamentNotFoundByTornamentErrMsg = 'tornament not found'
export async function getTornamentDetail(draftId:string) {
  const client = getTornamentClient(draftId);
    const response = await fetch(client.url,{method:client.method});
    if (response.status === 200){
      const tornament = await response.json();
      return tornament;
      }
      else if (response.status === 404){
        throw new Error(tornamentNotFoundByTornamentErrMsg);
        }
      else{
        const errorMsg = response.statusText;
        throw new Error(errorMsg);
      }

  }