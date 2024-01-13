export enum TornamentStatus {OFFICIAL='official', ONGOING='ongoing', UNKNOWN = 'unknow'};
    
export type ITournamentInfo = {
    tornamentName : string,
    currentRound:string,
    tournamentLocation?:string,
    tournamentCourse?:string,
    tournamentDuration?:string,
    tournamentStatus:TornamentStatus,
    tornamentLeaderboard:Array<TornamentLeaderboard>
}


 export type RoundKey = 
    'R1' |
    'R2' |
     'R3'|
    'R4'
;
 export type TornamentLeaderboard =  {
    teamOwner?:string,
    playerName:string,
    placement:string,
    totalOverUnder:string,
    playThrough:string,
} & { [key in RoundKey]?: string };
