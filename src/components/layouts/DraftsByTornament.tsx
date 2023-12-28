import React, {   useContext, useEffect, useMemo, useState } from "react";
import { TornamentCard } from "../common/TornamentCard";

import MediaQuery from "react-responsive";
import { Stack, Breadcrumbs, Typography, Link, CircularProgress } from "@mui/material";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../contexts/NotificationContext";
import { draftNotFoundByTornamentErrMsg, getDrafts } from "../../api/getDrafts";
import { TornamentStatus } from "../../@types/draft.typs";
import { FindDraftByTornament } from "./FindDraftByTornament";


type TornamentDraftList = {
    tornamentName:string,
    drafts:Array<{
    fermiDraftName:string,
    widthOverride?:boolean,
    fermiDraftId:string,
    tornamentYear:string,
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
        getDrafts(tornamentId).then((drafts)=>{
  
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
    
            placeholder = placeholder || singleNotification.message===draftNotFoundByTornamentErrMsg;
        })
        
        return placeholder
    },[notification]);
    return(
        <React.Fragment>
            <Stack direction={'column'} 
spacing={2} sx={{ paddingTop:"16px",paddingLeft:"16px"}}>
          <Breadcrumbs aria-label="breadcrumb">
  <Link
    underline="hover"
    color="inherit"
    href="/"
  >
    {t("home")}
  </Link>
  <Typography color="text.primary">{t("tornament-name")}  - {displayTornamentIdentifier}</Typography>
</Breadcrumbs>
{draftsLoading && <CircularProgress/>}
{isDraftNotFound && <FindDraftByTornament/>}

             <MediaQuery minWidth={1224}>
                <Stack direction={'row'} 
                flexWrap="wrap"
                justifyContent="center"
            alignItems="center"
                >
            {draftList?.drafts?.map((draft)=>(
                <TornamentCard 
                fermiDraftId={draft.fermiDraftId}
                fermiDraftName={draft.fermiDraftName}
                tornamentYear={draft.tornamentYear}
                widthOverride={true}
                tournamentStatus={draft.tournamentStatus}
                teams={draft.teams}/>
            ))}
            </Stack>

            </MediaQuery>
            <MediaQuery maxWidth={1224}>
            {draftList?.drafts?.map((draft)=>(
                <TornamentCard 
                fermiDraftId={draft.fermiDraftId}
                fermiDraftName={draft.fermiDraftName}
                tornamentYear={draft.tornamentYear}

                tournamentStatus={draft.tournamentStatus}
                teams={draft.teams}/>
            ))}

</MediaQuery>
</Stack>
            
        </React.Fragment>
    )
}