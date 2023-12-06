import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useContext, useEffect, useState } from "react";
import { DraftFermiLeaderboard } from "../DraftFermiLeaderboard";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";

import { t } from "i18next";
import { getTeamInfo } from "../../api/getTeamInfo";
import { mockGetTeamInfoResponse } from "../../@types/score.type";
import CircularProgress from "@mui/material/CircularProgress";
import { NotificationContext } from "../../contexts/NotificationContext";
import { TeamHolesTabsContainer } from "../team/TeamHolesTabsContainer";
import { TeamPlayerCards } from "../team/TeamPlayerCardsContainer";


export const TeamSnapshot = ()=>{
  const params= useParams();
  const [teamInfo,setTeamInfo] = useState<mockGetTeamInfoResponse>();
  const [teamInfoLoading, setTeamInfoLoading] = useState<boolean>(true);
  const {setNotification} = useContext(NotificationContext);
    useEffect(()=>{
      getTeamInfo('foo','bar').then((response)=>{
        setTeamInfo(response);
        setTeamInfoLoading(false);
      }
      ).catch(()=>{
        setTeamInfoLoading(false);
        setNotification({type:"error",message:'getTeamInfo error'});
      });
    },[])

    return(
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} sx={{ paddingTop:"16px"}}>
          <Breadcrumbs aria-label="breadcrumb">
  <Link
    underline="hover"
    color="inherit"
    href="/"
  >
    Home
  </Link>
  <Link
    underline="hover"
    color="inherit"
    href={`/drafts/${params.draftid}`}
  >
    <Typography color="text.primary">{t("draft")} - {params.draftid}</Typography>
  </Link>
  <Typography color="text.primary">{t("team")} - {params.teamname}</Typography>
</Breadcrumbs>
</Grid>
{teamInfoLoading && <CircularProgress/> }
{teamInfo&&  
             <Grid xs={12} sm={9} >
              
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
   
  </Grid>
}
  <Grid xs={12} sm={3}>
    <DraftFermiLeaderboard/>
  </Grid>
        </Grid>
    )
}