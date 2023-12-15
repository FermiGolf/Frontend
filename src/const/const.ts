enum ScoreMetricUnit {
    STROKE = 'stroke',
    FERMISCORE = 'fermiScore',
    OVERUNDER = 'overUnder'

}
type ScoringRules =  {
    rule:string,
    points:number,
    info?:string,
}
const playScoringBreakdowns: Array<ScoringRules> = [
    {
        rule:'albatross',
        points:12,
        info:"albatross-info"
    },
    {
        rule:'holeInOne',
        points:10,
        info:"hole-in-one-info"
    },
    {
        rule:'eagle',
        points:6,
        info:"eagle-info"
    },
    {
        rule:'birdie',
        points:3
    },
    {
        rule:'par',
        points:0.5
    },
    {
        rule:'bogey',
        points:-0.5
    },
    {
        rule:'bogeyPlus',
        points:-1
    }
]
const placementScoringBreakdowns: Array<ScoringRules> = [
    {
        rule:'firstPlace',
        points:30,
    },
    {
        rule:'secondPlace',
        points:20,
    },
    {
        rule:'thirdPlace',
        points:18,
    },
    {
        rule:'forthPlace',
        points:16
    },
    {
        rule:'fifthPlace',
        points:14
    },
    {
        rule:'sixthPlace',
        points:12
    },
    {
        rule:'seventhPlace',
        points:10
    },
    {
        rule:'eighthPlace',
        points:9
    },
    {
        rule:'nighthPlace',
        points:8
    },
    {
        rule:'tenthPlace',
        points:7
    },
    {
        rule:'elevenToFifteen',
        points:6,

    },
    {
        rule:'sixteenToTwenty',
        points:5,

    },
    {
        rule:'twentyOneTotwentyFive',
        points:4
    },
    {
        rule:'twentySixToThirty',
        points:3
    },
    {
        rule:'thirtyOneToForty',
        points:2
    },
    {
        rule:'fortyOneToFifty',
        points:1
    }
]

enum GroupByCriteria { BY_ROUND='round',BY_PLAYER='player'}
export {ScoreMetricUnit,playScoringBreakdowns,placementScoringBreakdowns,GroupByCriteria}