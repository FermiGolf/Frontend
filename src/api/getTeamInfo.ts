import { getTeamInfoClient } from "./const";

export async function getTeamInfo(draftId:string,teamName:string) {
  const client = getTeamInfoClient(draftId,teamName);
    const response = await fetch(client.url,{method:client.method});
    const teamInfo = await response.json();
    return teamInfo;
  }