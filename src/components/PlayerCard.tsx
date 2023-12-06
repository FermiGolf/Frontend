

import React from "react";
import { useTranslation } from "react-i18next";
import Card from '@mui/material/Card';
import { lightGreen } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";


type RoundInfo = {score:string,isComplete:boolean};

type PlayerCardProps ={
    name:string
    totalScore:string
    placement:string,
    placementScore:string,
    round1:RoundInfo,
    round2:RoundInfo,
    round3:RoundInfo,
    round4:RoundInfo,
}
type RoundInfoProps={
    roundNumber:string,
    score:string
}
const RoundInfo = (props:RoundInfoProps)=>{
    const { t } = useTranslation();
    return(
        <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={`${t("round-fermi-score-header-round",{roundNumber:props.roundNumber})}: ${props.score}`}

            />
           
        </Stack>
    )
}
export const PlayerCard = (props:PlayerCardProps)=>{
    const { t } = useTranslation();


    return(
       
            <Card sx={{minWidth: "24%" }} >
            <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: lightGreen[500] }} aria-label="recipe">
            {props.totalScore}
          </Avatar>
        }
        title={props.name}
        subheader={
             <Stack direction="row" spacing={1}   alignItems="center">
                 
              <div className="padded-cell"> 

             {t('position')}{": "}{props.placement} 

             </div>
            {props.placementScore && props.placementScore !=="0" 
            &&  <Chip label={props.placementScore && `+${props.placementScore}`}
            sx={ {backgroundColor:'#8cc34a',height:'24px'}}/>
        }
            </Stack>
            
        
    }
      />
      <CardContent>
      <Stack direction="column" spacing={2}>

       {props.round1.isComplete && <RoundInfo roundNumber="1" score={props.round1.score}/>}
       {props.round2.isComplete &&<RoundInfo roundNumber="2" score={props.round2.score}/>}
       {props.round3.isComplete &&<RoundInfo roundNumber="3" score={props.round3.score}/>}
       {props.round4.isComplete &&<RoundInfo roundNumber="4" score={props.round4.score}/>}

      </Stack>
        </CardContent>
        </Card>
    )
}