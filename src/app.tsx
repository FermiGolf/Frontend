import React, { useMemo, useState } from 'react';


import { FermiRoutes } from './components/common/FermiRoutes';
import { RouterProvider } from 'react-router-dom';



import Stack from '@mui/material/Stack';
import { TopAppBar } from './components/common/TopAppBar';
import CssBaseline from '@mui/material/CssBaseline';

import {  DraftContext } from './contexts/DraftContext';
import { PageAlerts } from './components/common/PageAlerts';
import { AppNotification, NotificationContext } from './contexts/NotificationContext';





const App = () => {
  const [refreshTime, setRefreshTimestamp] = useState(0);
  const [draftName, setDraftName] = useState('');
  const [notification, setNotification] = useState<Array<AppNotification>>([{type:'info',message:''}]);
  const shouldShowAlert = useMemo(()=>{
    let placeholder =  false;
    notification.map((singleNotification)=>{
        placeholder = placeholder || singleNotification.type === 'error';
    })
    
    return placeholder
},[notification]);


  return <React.Fragment>
     <DraftContext.Provider value={{refreshTime, setRefreshTimestamp, draftName,setDraftName}}>
      <NotificationContext.Provider value={{notification,setNotification}}>
    <Stack direction="column" >
    {shouldShowAlert  && <PageAlerts/>}
    <CssBaseline />
      <TopAppBar/>
      <div id="body">
        <RouterProvider router={FermiRoutes} />
    </div>
    </Stack>
    </NotificationContext.Provider>
    </DraftContext.Provider>
    </React.Fragment>

};

export default App;