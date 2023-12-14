import { Alert, AlertTitle } from "@mui/material";
import React, { useContext, useMemo } from 'react';

import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../contexts/NotificationContext";
import { draftNotFoundErrMsg } from "../../api/getDraftLeaderboard";
import { teamNotFoundMsg } from "../../api/getTeamInfo";

export const PageAlerts = ()=>{

    const { t } = useTranslation();
    const {notification}=useContext(NotificationContext);
    const alertMsg = useMemo(()=>{
        let placeholder =  '';
        notification.map((singleNotification)=>{

            singleNotification.message ===draftNotFoundErrMsg || singleNotification.message===teamNotFoundMsg? 
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