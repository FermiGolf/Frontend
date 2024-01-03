
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PlayerCard } from "../common/PlayerCard";

import {  mockGetTeamInfoResponse } from "../../@types/score.type";
import { ScoreMetricUnit } from "../../const/const";

import { ScoreMetricUnitRadioButtonGroup } from "../ScoreMetricUnitRadioButtonGroup";
import Stack from "@mui/material/Stack";

import { useParams } from "react-router-dom";

import { TeamCard } from "./TeamCard";

import Divider from "@mui/material/Divider";
import MediaQuery from "react-responsive";

const responsesiveViewThreshhold=1224;

type TeamPlayerCardProps = {
  team:mockGetTeamInfoResponse
}

export const TeamPlayerCards = ({team}:TeamPlayerCardProps)=>{
    const params= useParams();
    const { t } = useTranslation();
  

    const teamName = useMemo(()=> params.teamname||"?",[params.teamname]);
  

    const [scoreUnit, setScoreUnit] = useState<ScoreMetricUnit>(ScoreMetricUnit.FERMISCORE);

    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setScoreUnit((event.target as HTMLInputElement).value as ScoreMetricUnit);
    };
    return(
        <React.Fragment>
<Stack direction="column" spacing={2}>
            <TeamCard 
            teamName={teamName} 
            draftPlacement={team?.draftPlacement} 
            teamTotalFermiScore={team.teamTotalFermiScore} />
           
            <Divider variant="fullWidth"  sx={{ borderBottomWidth: 5 }}>
            <Typography color="text.secondary" variant="h6">{t('team-lineup')} 
            </Typography></Divider>
            <ScoreMetricUnitRadioButtonGroup 
            unit={scoreUnit} 
            onChange={handleUnitChange} 
            hideStroke={true}/>
            
            
 <MediaQuery maxWidth={responsesiveViewThreshhold}>
        <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2} sx={{justifyContent:'space-even'}}>
        {team?.players?.map((player,index)=>{
            return  (index === 0 || index ===1) && <PlayerCard 
            key={index}
            name={player.playerName} 
            scoreUnit={scoreUnit}
            round1={
              {score:player?.roundInfo?.round1?.score && player?.roundInfo?.round1?.score[scoreUnit],
              isComplete:player?.roundInfo?.round1?.isComplete
            }}
            round2={
              {score:player?.roundInfo?.round2?.score && player?.roundInfo?.round2?.score[scoreUnit],
                isComplete:player?.roundInfo?.round2?.isComplete
              }}
            round3={
              {score:player?.roundInfo?.round3?.score && player?.roundInfo?.round3?.score[scoreUnit],
                isComplete:player?.roundInfo?.round3?.isComplete
              }}
            round4={
              {score:player?.roundInfo?.round4?.score && player?.roundInfo?.round4?.score[scoreUnit],
                isComplete:player?.roundInfo?.round4?.isComplete
              }}
            totalScore={player?.totalScore && player?.totalScore[scoreUnit]}
            placement={player?.placementInfo?.tie?`T${player.placementInfo.placement}`:player.placementInfo.placement.toString()}
            placementScore={player?.placementInfo?.placementScore?.toString()}
            />      
})}
</Stack>
<Stack direction="row" spacing={2}  sx={{justifyContent:'space-even'}}>
{team?.players?.map((player,index)=>{
            return (index === 2 || index ===3) && <PlayerCard 
            scoreUnit={scoreUnit}
            key={index}
            name={player.playerName} 
            round1={
              {score:player?.roundInfo?.round1?.score && player?.roundInfo?.round1?.score[scoreUnit],
              isComplete:player?.roundInfo?.round1?.isComplete
            }}
            round2={
              {score:player?.roundInfo?.round2?.score && player?.roundInfo?.round2?.score[scoreUnit],
                isComplete:player?.roundInfo?.round2?.isComplete
              }}
            round3={
              {score:player?.roundInfo?.round3?.score && player?.roundInfo?.round3?.score[scoreUnit],
                isComplete:player?.roundInfo?.round3?.isComplete
              }}
            round4={
              {score:player?.roundInfo?.round4?.score && player?.roundInfo?.round4?.score[scoreUnit],
                isComplete:player?.roundInfo?.round4?.isComplete
              }}
            totalScore={player?.totalScore && player?.totalScore[scoreUnit]}
            placement={player?.placementInfo?.tie?`T${player.placementInfo.placement}`:player.placementInfo.placement.toString()}
            placementScore={player?.placementInfo?.placementScore?.toString()}
            />
           
})}
 </Stack>
          </Stack>
        </MediaQuery>


            <MediaQuery minWidth={responsesiveViewThreshhold}>
              <Stack direction="row" spacing={2}>
       
       
            {team?.players?.map((player,index)=>(
            <PlayerCard 
            scoreUnit={scoreUnit}
            key={index}
            name={player.playerName} 
            round1={
              {score:player?.roundInfo?.round1?.score && player?.roundInfo?.round1?.score[scoreUnit],
              isComplete:player?.roundInfo?.round1?.isComplete
            }}
            round2={
              {score:player?.roundInfo?.round2?.score && player?.roundInfo?.round2?.score[scoreUnit],
                isComplete:player?.roundInfo?.round2?.isComplete
              }}
            round3={
              {score:player?.roundInfo?.round3?.score && player?.roundInfo?.round3?.score[scoreUnit],
                isComplete:player?.roundInfo?.round3?.isComplete
              }}
            round4={
              {score:player?.roundInfo?.round4?.score && player?.roundInfo?.round4?.score[scoreUnit],
                isComplete:player?.roundInfo?.round4?.isComplete
              }}
            totalScore={player?.totalScore && player?.totalScore[scoreUnit]}
            placement={player?.placementInfo?.tie?`T${player.placementInfo.placement}`:player.placementInfo.placement.toString()}
            placementScore={player?.placementInfo?.placementScore?.toString()}
            />
            ))}

            </Stack>
            </MediaQuery>

            </Stack>
            </React.Fragment>
    )
}