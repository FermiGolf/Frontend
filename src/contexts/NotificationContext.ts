import { AlertColor } from '@mui/material/Alert';
import { Dispatch, SetStateAction, createContext } from 'react';

export type AppNotification = {type:AlertColor,message:string}

interface INotificationContext{
    notification: Array<AppNotification>;
    setNotification: Dispatch<SetStateAction<Array<AppNotification>>>;
  }
export const NotificationContext = createContext<INotificationContext>({
    notification:[],
    setNotification: () => {}
});
