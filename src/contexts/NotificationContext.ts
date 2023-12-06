import { AlertColor } from '@mui/material/Alert';
import { Dispatch, SetStateAction, createContext } from 'react';

export type AppNotification = {type:AlertColor,message:string}

interface INotificationContext{
    notification: AppNotification;
    setNotification: Dispatch<SetStateAction<AppNotification>>;
  }
export const NotificationContext = createContext<INotificationContext>({
    notification:{type:'info',message:''},
    setNotification: () => {}
});
