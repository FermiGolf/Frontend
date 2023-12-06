export const baseURL = "http://example.com/movies.json"

export enum APIPath {
    DRAFTS = '/drafts',
    TEAMS = '/teams'
}

type CLIENT = {
    method:string,
    url:string,
}

export const getDraftLeaderboardClient = (draftId : string):CLIENT =>{
  return { 
    method: 'GET',
    url : `${APIPath.DRAFTS}?draftId=${draftId}`
   }
}


export const getTeamInfoClient = (draftId : string, teamName:string):CLIENT =>{
    return { 
      method: 'GET',
      url : `${APIPath.TEAMS}?draftId=${draftId}&&teamname=${teamName}`
     }
  }
  
