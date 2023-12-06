import { Dispatch, SetStateAction, createContext } from 'react';
interface IRefreshTimeContextontext {
    refreshTime: number;
    setRefreshTimestamp: Dispatch<SetStateAction<number>>;
  }
export const RefreshTimeContext = createContext<IRefreshTimeContextontext>({
    refreshTime:0,
    setRefreshTimestamp: () => {}
});
