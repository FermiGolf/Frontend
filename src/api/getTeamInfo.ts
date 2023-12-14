import { getTeamInfoClient } from "./const";
export const teamNotFoundMsg='team not found';
export async function getTeamInfo(draftId:string,teamName:string) {
  const client = getTeamInfoClient(draftId,teamName);
    const response = await fetch(client.url,{method:client.method});
    const teamInfo = await response.json();
    if (response.status === 200){
    return teamInfo;
    }
    else if (response.status === 404){
      throw new Error(teamNotFoundMsg);
      }
    else{
      console.log(response.status);
      const errorMsg = response.statusText;
        throw new Error(errorMsg);
    }
  }