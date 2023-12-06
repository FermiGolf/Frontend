import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Avatar from "@mui/material/Avatar";
import Stack from '@mui/material/Stack';




type TeamCardProps = {
    teamName:string,
    draftPlacement:string,
    teamTotalFermiScore:string

}

export const TeamCard = (props: TeamCardProps)=>{
    const { t } = useTranslation();

    return(
        <Card 
        sx={{
            width:"fit-content"
        }}
        >
            <CardContent>
            <Stack direction="row" spacing={2}   alignItems="center">
            <Avatar 
            aria-label="team-icon">
            {Array.from(props.teamName)[0]}
          </Avatar>
            <Stack direction="column" spacing={1}   alignItems="start">
            <Typography color="text.primary" variant="h6"> {props.teamName}</Typography>
            <Stack direction="row" spacing={2}   alignItems="center">
             <Typography color="text.primary" variant="subtitle1"> {t('position')}{": "}{props.draftPlacement}</Typography>
             <Typography color="text.secondary" variant="subtitle1"> {t('round-fermi-score-header-player-score')}{": "} {props.teamTotalFermiScore}</Typography>
            </Stack>
            </Stack>
            </Stack>
            </CardContent>
        </Card>
    )
} 