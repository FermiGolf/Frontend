import React, { useCallback, useMemo, useState } from "react";

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

import LinkIcon from '@mui/icons-material/Link';
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardActionArea, Collapse, Link, Stack } from '@mui/material';

import { t } from "i18next";

type TornamentCardProps = {
    fermiDraftName:string,
    widthOverride?:boolean,
    fermiDraftId:string,
    tornamentYear:string,
    tournamentCourse:string,

    teams:Array<string>
}

export const TornamentCard = (props:TornamentCardProps)=>{
    const findDraft =useCallback(()=>{
        window.open(`/drafts/${props.fermiDraftId}`, '_self');

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
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <RequestQuoteIcon/>
        <Typography variant="h5" component="div">
        {props.fermiDraftName}
        </Typography>

        </Stack>

        <Typography 
         variant="subtitle2"

        color="text.secondary"
        gutterBottom
        >
            
            {props.tornamentYear} @{props.tournamentCourse}
        </Typography> 
        

       
        
       
       
      </CardContent>
      
      </CardActionArea>
      <CardActions sx={{justifyContent:"space-between"}}>
        <Button size="small" onClick={handleClick} startIcon={<ExpandMoreIcon/>}>
          {t('view-teams', {numberOfTeam: props.teams.length})}</Button>
        <Button size="small" onClick={findDraft}>{t('view-draft')}</Button>
      </CardActions>
      <Collapse collapsedSize={0} in={expanded} >
        <CardContent>
        <Stack direction={'row'} flexWrap={'wrap'} spacing={0.3}>
        
        {props.teams.map((team,index)=>{
        return <Stack direction={'row'}  spacing={0}>
          <Stack direction={'row'} alignItems={'center'} spacing={0.2}>
         <Link
        underline="hover"
        color="inherit"
        href={`/drafts/${props.fermiDraftId}/teams/${team}`}
      > {team}
      </Link>
      <LinkIcon fontSize="small"/>
      </Stack>
      <Typography variant="body1">
       {`${index !==props.teams.length-1 ? ", ":" "}`}
       </Typography>
       </Stack>
}
        )}

        </Stack>
        
        </CardContent>
      </Collapse>
    </Card>
    )
}