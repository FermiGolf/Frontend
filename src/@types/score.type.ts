type ScoreMetrics = {
    stroke:string,
    fermiScore:string,
    overUnder:string,
}

type PlacementInfo = {
    placement:number,
    tie:boolean,
    placementScore:number
}

type RoundDetail =  {score:ScoreMetrics,holeInfo:HoleInfo,isComplete:boolean};
type RoundInfo = {
    round1: RoundDetail,
    round2: RoundDetail,
    round3: RoundDetail,
    round4: RoundDetail,
    playScore: ScoreMetrics,
}
type HoleDetail = {
    par:number,
    score:ScoreMetrics
}
type HoleNumbers = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18 ;
type HoleObj = {holeNumber:HoleNumbers,holeDetail:HoleDetail};
type HoleInfo = Array<HoleObj>
type PlayerInfo = {
    playerName:string,
    roundInfo:RoundInfo,
    totalScore:ScoreMetrics
    placementInfo:PlacementInfo
}
type mockGetTeamInfoResponse ={
    teamTotalFermiScore:string,
    players:Array<PlayerInfo>
    draftPlacement:string,
}
export{ PlayerInfo ,HoleInfo,HoleNumbers,HoleDetail,RoundInfo,RoundDetail,PlacementInfo,ScoreMetrics,mockGetTeamInfoResponse}