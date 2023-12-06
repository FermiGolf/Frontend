import React, { useState } from 'react';


import { FermiRoutes } from './components/common/FermiRoutes';
import { RouterProvider } from 'react-router-dom';



import Stack from '@mui/material/Stack';
import { TopAppBar } from './components/common/TopAppBar';
import CssBaseline from '@mui/material/CssBaseline';



import {  RefreshTimeContext } from './contexts/RefreshTimeContext';
import { PageAlerts } from './components/common/PageAlerts';
import { AppNotification, NotificationContext } from './contexts/NotificationContext';


const App = () => {
  const [refreshTime, setRefreshTimestamp] = useState(0);
  const [notification, setNotification] = useState<AppNotification>({type:'info',message:''});


  return <React.Fragment>
     <RefreshTimeContext.Provider value={{refreshTime, setRefreshTimestamp}}>
      <NotificationContext.Provider value={{notification,setNotification}}>
    <Stack direction="column" >
    {notification.message.length > 0 && <PageAlerts/>}
    <CssBaseline />
      <TopAppBar/>
      <div id="body">
        <RouterProvider router={FermiRoutes} />
    </div>
    </Stack>
    </NotificationContext.Provider>
    </RefreshTimeContext.Provider>
    </React.Fragment>

};

export default App;