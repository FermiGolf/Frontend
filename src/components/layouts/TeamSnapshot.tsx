import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useContext, useEffect, useState,useMemo } from "react";
import { DraftFermiLeaderboard } from "../common/DraftFermiLeaderboard";

import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';

import TourIcon from '@mui/icons-material/Tour';



import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";

import { t } from "i18next";
import { getTeamInfo, teamNotFoundMsg } from "../../api/getTeamInfo";
import { mockGetTeamInfoResponse } from "../../@types/score.type";

import { NotificationContext } from "../../contexts/NotificationContext";
import { TeamHolesTabsContainer } from "../team/TeamHolesTabsContainer";
import { TeamPlayerCards } from "../team/TeamPlayerCardsContainer";
import { DraftContext } from "../../contexts/DraftContext";
import { NoDraftFound } from "./NoDraftFound";
import { draftNotFoundErrMsg } from "../../api/getDraftLeaderboard";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MediaQuery from "react-responsive";


export const TeamSnapshot = ()=>{
  const params= useParams();
  const [teamInfo,setTeamInfo] = useState<mockGetTeamInfoResponse>();
  const [teamInfoLoading, setTeamInfoLoading] = useState<boolean>(true);
  const {setNotification} = useContext(NotificationContext);
  const draftId = useMemo(()=> params.draftid || 'null',[params.draftid]);
  const teamName = useMemo(()=> params.teamname || 'null',[params.teamname]);
  

  const {draftName,setDraftName} = useContext(DraftContext);

  const displayDraftIdentifier = useMemo(()=> draftName==='' ? params.draftid: draftName,[params.draftid,draftName]);
  const {notification}=useContext(NotificationContext);




  const isDraftNotFound = useMemo(()=>{
    let placeholder =  false;
    notification.map((singleNotification)=>{

        placeholder = placeholder || singleNotification.message===draftNotFoundErrMsg;
    })
    
    return placeholder
},[notification]);



  const isTeamNotFound = useMemo(()=>{
    let placeholder =  false;
    notification.map((singleNotification)=>{

        placeholder = placeholder || singleNotification.message===teamNotFoundMsg;
    })
    
    return placeholder
},[notification]);


  
    useEffect(()=>{
      getTeamInfo(draftId,teamName).then((response)=>{
        setTeamInfo(response);
        draftName ===''&& setDraftName(response.fermiDraftName);
        setTeamInfoLoading(false);
        
      }
      ).catch((error)=>{
        setTeamInfoLoading(false);
        
        setNotification(oldArray => [...oldArray, {type:"error",message:error.message}]);
      });
    },[])

    return(
      <Grid  container  spacing={2} sx={{ paddingTop:"16px",paddingLeft:"16px"}} >
        <Grid  xs={12} sm={12} lg={12}  alignItems={'start'}  >
        

          <Breadcrumbs aria-label="breadcrumb">
          <Stack direction={'row'} alignItems={'center'} spacing = {0.3}>
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
  <Link
    underline="hover"
    color="inherit"
    href={`/drafts/${params.draftid}`}
  >
    <Typography color="text.primary">{displayDraftIdentifier}</Typography>
  </Link>
  </Stack>
  <Stack direction={'row'} alignItems={'center'} spacing = {0.3}>
  <GroupsIcon/>
  <Typography color="text.primary">{teamName}</Typography>
  </Stack>
</Breadcrumbs>
</Grid>



{isDraftNotFound && <Grid   xs={12} sm={12} container justifyContent={'center'} >


<NoDraftFound/>

</Grid>
}
{teamInfoLoading && <CircularProgress/>}


{teamInfo&&  
  <Grid  xs={12} sm={12} lg={9}  alignItems={'start'}  >
             <Stack direction={'column'} spacing={1} 

             >
 <Stack direction={'column'} spacing={1} alignItems={'center'} flexWrap={'wrap'}

>

<Link
    underline="hover"
    color="inherit"
    href={`/tournaments/${teamInfo.tornamentName}`}
  >
    <Stack direction='row' spacing={1} height={'fit-content'}  alignItems={'center'}>
  <TourIcon/>

               <Typography variant="h5" component="div">
        {teamInfo.tornamentName}
        </Typography>

</Stack>
</Link>

        <Typography 
         variant="subtitle2"

        color="text.secondary"
        gutterBottom
        >
            
            {teamInfo.tornamentYear} @{teamInfo.tournamentCourse}
        </Typography> 
</Stack>
              <div className={"team-score-tables-container"}>

             <TeamPlayerCards team={teamInfo}/>
             </div>
             <div className={"divider"}>
             <Divider variant="fullWidth"  sx={{ borderBottomWidth: '45px'  }}>
             <Typography color="text.secondary" variant="h6">
              {t("player-hole-label")}
              </Typography>
               </Divider>
             </div>
             <div className={"team-score-tables-container"}>
   <TeamHolesTabsContainer team={teamInfo}/>
</div>
   
  </Stack>
  </Grid>
}

{!isDraftNotFound && isTeamNotFound && <Grid  xs={12} sm={12} lg={12} alignItems={'start'}>
  <Typography color={'text.secondary'} variant="subtitle2"> *{t('team-not-found')}</Typography>
  </Grid>}
<Grid  xs={12} sm={12} lg={3}  alignItems={'start'}  >


    <DraftFermiLeaderboard/>

  </Grid>


        </Grid>
    )
}