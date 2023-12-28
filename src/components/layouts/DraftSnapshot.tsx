
import React, { useContext, useMemo, useState } from "react";
import { DraftFermiLeaderboard } from "../common/DraftFermiLeaderboard";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import { t } from "i18next";
import { DraftContext } from "../../contexts/DraftContext";
import { Stack } from "@mui/material";
import { NoDraftFound } from "./NoDraftFound";
import { NotificationContext } from "../../contexts/NotificationContext";
import { draftNotFoundErrMsg } from "../../api/getDraftLeaderboard";
export const DraftSnapshot = ()=>{
  const params= useParams();
  const {draftName} = useContext(DraftContext);
  const displayDraftIdentifier = useMemo(()=> draftName==='' ? params.draftid: draftName,[params.draftid,draftName]);
  const {notification}=useContext(NotificationContext);

  const isDraftNotFound = useMemo(()=>{
    let placeholder =  false;
    notification.map((singleNotification)=>{

        placeholder = placeholder || singleNotification.message===draftNotFoundErrMsg;
    })
    
    return placeholder
},[notification]);



    return(
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
  <Typography color="text.primary">{t("draft")}  - {displayDraftIdentifier}</Typography>
</Breadcrumbs>

<Stack direction={'column'} alignItems={'center'} >
  <DraftFermiLeaderboard/>
  {isDraftNotFound && <NoDraftFound/>}
  </Stack>

  </Stack>

    )
}