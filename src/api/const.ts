export const baseURL = "https://2jv8x4c3kg.execute-api.us-east-1.amazonaws.com/prod"

export enum APIPath {
    DRAFTS = '/drafts',
    TEAMS = '/teams',
    TORNAMENTS = '/tournaments'
}

type CLIENT = {
    method:string,
    url:string,
}

export const getDraftLeaderboardClient = (draftId : string):CLIENT =>{
  return { 
    method: 'GET',
    url : `${baseURL}${APIPath.DRAFTS}/${draftId}`
   }
}
export const getTornamentClient = (tornamentName : string):CLIENT =>{
  return { 
    method: 'GET',
    url : `${baseURL}${APIPath.TORNAMENTS}/${tornamentName}`
   }
}

export const getTornamentsListClient = ():CLIENT =>{
  return { 
    method: 'GET',
    url : `${baseURL}${APIPath.TORNAMENTS}`
   }
}


export const getTeamInfoClient = (draftId : string, teamName:string):CLIENT =>{
    return { 
      method: 'GET',
      url : `${baseURL}${APIPath.DRAFTS}/${draftId}${APIPath.TEAMS}/${teamName}`
     }
  }
  

  
