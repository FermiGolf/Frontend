import React, { useCallback, useMemo, useState } from "react";

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';


import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardActionArea, Collapse } from '@mui/material';
import { TornamentStatus } from "../../@types/draft.typs";
import { t } from "i18next";

type TornamentCardProps = {
    fermiDraftName:string,
    widthOverride?:boolean,
    fermiDraftId:string,
    tornamentYear:string,
    tournamentStatus:TornamentStatus,
    teams:Array<string>
}
const draft={tournamentStatus:TornamentStatus.OFFICIAL}
export const TornamentCard = (props:TornamentCardProps)=>{
    const findDraft =useCallback(()=>{
        window.location.pathname = `/drafts/${props.fermiDraftId}`;
    },[]);
    const [expanded, setExpanded] = useState(false);
    const handleClick = useCallback(()=>{
        setExpanded(!expanded);
    },[expanded])
    const cardWidth = useMemo(()=> props.widthOverride ? '40%' : '100%',[])


    return(
        <Card sx={{ margin: '16px',width:cardWidth}}>
            <CardActionArea onClick={findDraft}>
      <CardContent>
    
        <Typography variant="h5" component="div">
        {props.fermiDraftName}
        </Typography>
        <Stack direction={"row"} justifyContent={'space-between'}>
        <Typography 
         variant="subtitle2"

        color="text.secondary"
        gutterBottom
        >
            
          {t('year')}: {props.tornamentYear}
        </Typography> 
        {props?.tournamentStatus === TornamentStatus.OFFICIAL && <Chip label={t('data-last-updated-after-done')} />}
        </Stack>
       
        
       
       
      </CardContent>
      
      </CardActionArea>
      <CardActions sx={{justifyContent:"space-between"}}>
        <Button size="small" onClick={handleClick}>{t('view-teams')}({props.teams.length})</Button>
        <Button size="small" onClick={findDraft}>{t('view-draft')}</Button>
      </CardActions>
      <Collapse collapsedSize={0} in={expanded} >
        <CardContent>
        <Typography variant="body1">
        {props.teams.map((team,index)=>(`${team}${index !==props.teams.length-1 ? ", ":" "}`))}
        </Typography>
        
        </CardContent>
      </Collapse>
    </Card>
    )
}