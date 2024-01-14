
import React, { useContext, useMemo, useState } from "react";
import { DraftFermiLeaderboard } from "../common/DraftFermiLeaderboard";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";


import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

import HomeIcon from '@mui/icons-material/Home';

import { t } from "i18next";
import { DraftContext } from "../../contexts/DraftContext";
import { Divider, Stack } from "@mui/material";
import { NoDraftFound } from "./NoDraftFound";
import { NotificationContext } from "../../contexts/NotificationContext";
import { draftNotFoundErrMsg } from "../../api/getDraftLeaderboard";
import {  TournamentLeaderboard } from "../common/TournamentLeaderboard";
import MediaQuery from "react-responsive";
export const DraftSnapshot = ()=>{
  const params= useParams();
  const {draftName,tournamentInfo} = useContext(DraftContext);
  const displayDraftIdentifier = useMemo(()=> draftName==='' ? params.draftid: draftName,[params.draftid,draftName]);
  const {notification}=useContext(NotificationContext);
  const draftID = useMemo(()=> params.draftid || '',[ params.draftid]);

  const isDraftNotFound = useMemo(()=>{
    let placeholder =  false;
    notification.map((singleNotification)=>{

        placeholder = placeholder || singleNotification.message===draftNotFoundErrMsg;
    })
    
    return placeholder
},[notification]);



    return(
<Stack direction={'column'} 
spacing={2} 
sx={{ paddingTop:"16px",paddingLeft:"16px"}}>
  <Breadcrumbs aria-label="breadcrumb">
    <Stack direction={'row'} alignItems={'c'} spacing = {0.3}>
      <HomeIcon/>
  <Link
    underline="hover"
    color="inherit"
    href="/"
  >
    {t("home")}
  </Link>
  </Stack>
  <Stack direction={'row'} alignItems={'center'} spacing = {0.3}>
  <RequestQuoteIcon/>
  <Typography color="text.primary"> {displayDraftIdentifier}</Typography>
  </Stack>
</Breadcrumbs>
<Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
{isDraftNotFound && <NoDraftFound/>}
</Stack>

<MediaQuery minWidth={1224}>
{ !isDraftNotFound && 
<Stack direction={'row'} alignItems={'start'} spacing={8} justifyContent={'center'}>
<Stack direction={'column'} alignItems={'end'} spacing={1}>
  <Typography  variant="subtitle2" color={'text.secondary'} >{t('draft')} {t('leader-board')}</Typography>
  <DraftFermiLeaderboard/>
</Stack>
{tournamentInfo?.tornamentName && <Divider orientation="vertical" variant="middle" flexItem /> }
{tournamentInfo?.tornamentName &&
  <Stack direction={'column'} alignItems={'start'} spacing={1}>
  <Typography  variant="subtitle2" color={'text.secondary'} >{t('tornament-name')} {t('leader-board')}</Typography>
  <TournamentLeaderboard draftId={draftID} tournamentInfo={tournamentInfo}/>
  </Stack>
}
  </Stack>
}
</MediaQuery>

<MediaQuery maxWidth={1224}>
{ !isDraftNotFound && 
<Stack direction={'column'} alignItems={'center'} spacing={8} >
<Stack direction={'column'} alignItems={'center'} spacing={1}>
  <Typography  variant="subtitle2" color={'text.secondary'} >{t('draft')} {t('leader-board')}</Typography>
  <DraftFermiLeaderboard/>
</Stack>
  
{tournamentInfo?.tornamentName && <Divider orientation="horizontal" variant="middle" flexItem />}
{tournamentInfo?.tornamentName && <Stack direction={'column'} alignItems={'center'} spacing={1}>
  <Typography  variant="subtitle2" color={'text.secondary'} >{t('tornament-name')} {t('leader-board')}</Typography>
  <TournamentLeaderboard draftId={draftID} tournamentInfo={tournamentInfo}/>
  </Stack>
}
  </Stack>
}
</MediaQuery>
  
  </Stack>



    )
}