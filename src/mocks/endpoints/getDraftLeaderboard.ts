import { TornamentStatus } from "../../@types/draft.typs";

function createData(
  teamName:string,
    fermiScore: string,
    draftPlacement:string,
   

  ) {
    return { teamName,fermiScore,draftPlacement};
  }
  export const mockDraftLeaderboardResponse ={
    tornamentName : 'THE PLAYERS Championship',
    currentRound:"1",
    tournamentLocation:'HONOLULU, HAWAII • USA',
    tournamentCourse:'Walalle Country Club',
    tournamentDuration:'Jan 11 - Jan 16, 2024',
    tournamentUpdatedDatetime:1701813043,
    tournamentStatus:TornamentStatus.ONGOING,
    fermiDraftName:'Courts Game',
    tornamentLeaderboard:[
      {
        teamOwner:"Gimbal",
        playerName:"Victor Hovland",

          placement:'T3',
          

            totalOverUnder:'-3',
            playThrough:"F*",
            R1:'-3',
            R2:'-',
            R3:'-',
            R4:'-',
          
     },
     {
      teamOwner:"Courts",
      playerName:"Kimchi",

        placement:'12',
        totalOverUnder:'-5',
            playThrough:"F",
            R1:'-5',
            R2:'-',
            R3:'-',
            R4:'-',
   },
   {
    playerName:"PROJECTED-CUTLINE",
    totalOverUnder:'-5',
 },
   {

    playerName:"Ram",

      placement:'T30',
      totalOverUnder:'+3',
            playThrough:"F",
            R1:'+3',
            R2:'-',
            R3:'-',
            R4:'-',
      
 }
    ],
    leaderboard:
    [
    createData('Courts', "315","1"),
    createData('Gimbal', "313.5","2"),
    createData('Thunem', "301.5","3"),
    createData('T Mac', "271","T4"),
    createData('Myers', "256","T4"),
    createData('Marco', "243.5","6"),
    createData('Ali', "233","7"),
    createData('Paste', "226.5","8"),
    createData('P Mac', "222","9"),
    createData('Bean', "217.5","10"),
    createData('Berald', "196.5","11"),
    createData('Scottie G', "183.5","12"),
  ]};
