import {  HoleInfo, HoleDetail, ScoreMetrics, mockGetTeamInfoResponse, RoundInfo, HoleNumbers } from "../../@types/score.type";
import { randomIntFromInterval } from "../../utils/number"






const createHoleData = () : HoleInfo =>{
    let  randomParNum;
    let randomStoke;
    let randomFermiScore;
    let overUnder;
    let holeNum;
let holeData:HoleInfo = [];
    // let holeData:{[key:string]:HoleDetail}={};
    for(let i=0;i<18;i++){
        randomParNum = randomIntFromInterval(3,5);
        randomStoke = randomIntFromInterval(1,9).toString();
        randomFermiScore = randomIntFromInterval(-1,12).toString();
        overUnder = randomIntFromInterval(-2,6).toString();
        holeNum = `${i+1}`;

        
        holeData.push(
            
            {holeNumber:holeNum  as unknown as HoleNumbers,
                holeDetail:{par:randomParNum,score:{stroke:randomStoke, fermiScore:randomFermiScore, overUnder:overUnder}}}
            );

    }

    return holeData;

  }

const  createRoundData = (
    round1: ScoreMetrics,
    round2: ScoreMetrics,
    round3: ScoreMetrics,
    round4: ScoreMetrics,
    playScore: ScoreMetrics,
  ):RoundInfo =>{
    return { round1:{score:round1,holeInfo:createHoleData(),isComplete:true}, 
            round2:{score:round2,holeInfo:createHoleData(),isComplete:true}, 
            round3: {score:round3,holeInfo:createHoleData(),isComplete:true}, 
            round4:{score:round4,holeInfo:createHoleData(),isComplete:true},
            playScore};
  }
  
  const createScoreMetric = (stoke:string,fermiScore:string,overUnder:string)=>({
    stroke:stoke,
    fermiScore:fermiScore,
    overUnder:overUnder,
})
  const rounds = [
    createRoundData(
        createScoreMetric('66','13','-6'),
        createScoreMetric('WD','WD','WD'),
         createScoreMetric('WD','WD','WD'), 
         createScoreMetric('WD','WD','WD'),
         createScoreMetric('66','13','-6'),
         ),
    createRoundData(
        createScoreMetric('66','9.5','-6'),
    createScoreMetric('77','13','+5'),
     createScoreMetric('MC','MC','MC'), 
     createScoreMetric('MC','MC','MC'),
     createScoreMetric('143','22.5','-1'),
     ),
    createRoundData(  createScoreMetric('66','22.5','-6'),
    createScoreMetric('77','11.5','+5'),
     createScoreMetric('70','22','-2'), 
     createScoreMetric('69','15','-3'),
     createScoreMetric('143','74','-6')),
    createRoundData(
        createScoreMetric('66','20','-6'),
    createScoreMetric('77','13.5','+5'),
     createScoreMetric('70','24','-2'), 
     createScoreMetric('69','15.5','-3'),
     createScoreMetric('143','74','-6')
    ),

  ];
  
  
export const mockTeamInfoResponse : mockGetTeamInfoResponse= {
    teamTotalFermiScore:"219",
    draftPlacement:"T3",
    players:[
    {
    playerName: 'John Rahm',
    roundInfo:rounds[0],
    totalScore: createScoreMetric('240','125','-6'),
    placementInfo: {
        placement:90,
        tie:false,
        placementScore:0
    }

},
{
    playerName: 'Corey Conner',
    roundInfo:rounds[1],
    totalScore: createScoreMetric('240','125','-6'),
    placementInfo:   {
        placement:90,
        tie:false,
        placementScore:0
    }

},
{
    playerName: 'Si Woo Kim',
    roundInfo:rounds[2],
    totalScore: createScoreMetric('240','125','-6'),
    placementInfo:{
        placement:22,
        tie:false,
        placementScore:3
    }

},
{
    playerName: 'Taylor Montgomery',
    roundInfo:rounds[3],
    totalScore: createScoreMetric('240','125','-6'),
    placementInfo:{
        placement:32,
        tie:false,
        placementScore:2
    }

}
]}
