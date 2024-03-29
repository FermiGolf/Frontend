import React, {   useContext, useEffect, useMemo, useState } from "react";
import { TornamentCard } from "../common/TornamentCard";

import MediaQuery from "react-responsive";
import { Stack, Breadcrumbs, Typography, Link, CircularProgress } from "@mui/material";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../contexts/NotificationContext";
import { tornamentNotFoundByTornamentErrMsg, getTornamentDetail } from "../../api/getTornamentDetail";
import { TornamentStatus } from "../../@types/draft.typs";
import { FindDraftByTornament } from "./FindDraftByTornament";
import HomeIcon from '@mui/icons-material/Home';

import TourIcon from '@mui/icons-material/Tour';


type TornamentDraftList = {
    tornamentName:string,
    drafts:Array<{
    fermiDraftName:string,
    widthOverride?:boolean,
    fermiDraftId:string,
    tornamentYear:string,
    tournamentCourse:string,
    tournamentStatus:TornamentStatus,
    teams:Array<string>}>
}

export const DraftsByTornament=()=>{
    const params= useParams();
    const tornamentId = useMemo(()=> params.tornamentId || 'null',[params.tornamentId]);
    const [draftList,setDraftList] = useState<TornamentDraftList>();
    const [draftsLoading,setDraftsLoading] = useState<boolean>(true);

    const displayTornamentIdentifier = useMemo(()=> draftList?.tornamentName?draftList?.tornamentName:params.tornamentId,[params.draftid, draftList]);

    const {setNotification,notification} = useContext(NotificationContext);
    useEffect(()=>{
        getTornamentDetail(tornamentId).then((drafts)=>{
  
            setDraftList(drafts);
          setDraftsLoading(false);


        }
        ).catch((error)=>{
  
          setDraftsLoading(false);
          setNotification(oldArray => [...oldArray, {type:"error",message:error.message}]);
  
        });
      },[])

      const isDraftNotFound = useMemo(()=>{
        let placeholder =  false;
        notification.map((singleNotification)=>{
    
            placeholder = placeholder || singleNotification.message===tornamentNotFoundByTornamentErrMsg;
        })
        
        return placeholder
    },[notification]);
    return(
        <React.Fragment>
            <Stack direction={'column'} 
spacing={2} sx={{ paddingTop:"16px",paddingLeft:"16px"}}>
          <Breadcrumbs aria-label="breadcrumb">
          <Stack direction={'row'} spacing={0.3} alignItems={'center'}>
            <HomeIcon/>
  <Link
    underline="hover"
    color="inherit"
    href="/"
  >
    {t("home")}
  </Link>
  </Stack>
  <Stack direction={'row'} spacing={0.3} alignItems={'center'}>
  <TourIcon/>
  <Typography color="text.primary">{displayTornamentIdentifier}</Typography>
  </Stack>
</Breadcrumbs>
{draftsLoading && <CircularProgress/>}
{isDraftNotFound && <FindDraftByTornament/>}

             <MediaQuery minWidth={1224}>
                <Stack direction={'row'} 
                flexWrap="wrap"
                justifyContent="center"
            alignItems="center"
                >
            {draftList?.drafts?.map((draft,index)=>(
                <TornamentCard 
                key={`tornament-card-${index}`}
                fermiDraftId={draft.fermiDraftId}
                fermiDraftName={draft.fermiDraftName}
                tornamentYear={draft.tornamentYear}
                tournamentCourse={draft.tournamentCourse}
                widthOverride={true}
                teams={draft.teams}/>
            ))}
            </Stack>

            </MediaQuery>
            <MediaQuery maxWidth={1224}>
            {draftList?.drafts?.map((draft,index)=>(
                <TornamentCard 
                key={`tornament-card-${index}`}
                fermiDraftId={draft.fermiDraftId}
                fermiDraftName={draft.fermiDraftName}
                tournamentCourse={draft.tournamentCourse}
                tornamentYear={draft.tornamentYear}
                teams={draft.teams}/>
            ))}

</MediaQuery>
</Stack>
            
        </React.Fragment>
    )
}