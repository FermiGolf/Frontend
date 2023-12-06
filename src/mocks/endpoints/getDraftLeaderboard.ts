

function createData(
    name:string,
    fermiScore: string,
    draftPlacement:string
   

  ) {
    return { name,fermiScore,draftPlacement};
  }
  export const mockDraftLeaderboardResponse ={
    lastRefreshAt:1701813043000,
    draftName:'Courts Game',
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
