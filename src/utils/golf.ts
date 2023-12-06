type CurrentRound = {
    roundNumber:number,
    isComplete:boolean
}
export const getCurrentRound = ():CurrentRound =>{
    let initialRoundState = {
        roundNumber:1,
    isComplete:false
    };

    return initialRoundState;
}