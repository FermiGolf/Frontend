import { Dispatch, SetStateAction, createContext } from 'react';
import { ITournamentInfo } from '../@types/draft.typs';
interface IDraftContext {
    refreshTime: number;
    setRefreshTimestamp: Dispatch<SetStateAction<number>>;
    draftName:string;
    setDraftName:Dispatch<SetStateAction<string>>;
    tournamentInfo:ITournamentInfo | undefined;
    setTournamentInfo:Dispatch<SetStateAction<ITournamentInfo>>;
  }
export const DraftContext = createContext<IDraftContext>({
    refreshTime:0,
    setRefreshTimestamp: () => {},
     draftName:'',
    setDraftName:() => {},
    tournamentInfo:undefined,
    setTournamentInfo: ()=>{},
});
