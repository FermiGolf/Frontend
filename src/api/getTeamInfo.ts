import { getTeamInfoClient } from "./const";
export const teamNotFoundMsg='team not found';
export async function getTeamInfo(draftId:string,teamName:string) {
  const client = getTeamInfoClient(draftId,teamName);
    const response = await fetch(client.url,{method:client.method});
   
    if (response.status === 200){
      const teamInfo = await response.json();
    return teamInfo;
    }
    else if (response.status === 404){
      throw new Error(teamNotFoundMsg);
      }
    else{

      const errorMsg = response.statusText;
        throw new Error(errorMsg);
    }
  }