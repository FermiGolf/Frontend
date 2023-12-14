import { Dispatch, SetStateAction, createContext } from 'react';
interface IDraftContext {
    refreshTime: number;
    setRefreshTimestamp: Dispatch<SetStateAction<number>>;
    draftName:string;
    setDraftName:Dispatch<SetStateAction<string>>;
  }
export const DraftContext = createContext<IDraftContext>({
    refreshTime:0,
    setRefreshTimestamp: () => {},
     draftName:'',
    setDraftName:() => {},
});
