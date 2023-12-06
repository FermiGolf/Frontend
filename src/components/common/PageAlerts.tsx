import { Alert, AlertTitle } from "@mui/material";
import React, { useContext } from 'react';
import { NotificationContext } from "../../contexts/NotificationContext";
import { useTranslation } from "react-i18next";

export const PageAlerts = ()=>{
    const {notification} = useContext(NotificationContext);
    const { t } = useTranslation();
    return(
        <Alert severity={notification.type}>
  <AlertTitle>Error</AlertTitle>
  {t('general-error-message')}
</Alert>
    )
}