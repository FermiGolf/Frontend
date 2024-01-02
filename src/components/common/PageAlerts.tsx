import { Alert, AlertTitle } from "@mui/material";
import React, { useContext, useMemo } from 'react';

import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../contexts/NotificationContext";
import { draftNotFoundErrMsg } from "../../api/getDraftLeaderboard";
import { teamNotFoundMsg } from "../../api/getTeamInfo";
import { tornamentNotFoundByTornamentErrMsg } from "../../api/getTornamentDetail";

export const PageAlerts = ()=>{

    const { t } = useTranslation();
    const {notification}=useContext(NotificationContext);
    const alertMsg = useMemo(()=>{
        let placeholder =  '';
        notification.map((singleNotification)=>{

            singleNotification.message ===draftNotFoundErrMsg 
            || singleNotification.message===teamNotFoundMsg
            || singleNotification.message === tornamentNotFoundByTornamentErrMsg
            ? 
            placeholder = t('incorrect-user-input')
            :
            
            placeholder =  t('general-error-message');
        })
        
        return placeholder
    },[notification]);

    
    return(
        <Alert severity={'error'}>
  <AlertTitle>{t('general-error-title')}</AlertTitle>
  { alertMsg}
</Alert>
    )
}