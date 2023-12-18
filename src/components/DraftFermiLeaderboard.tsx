
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from '@mui/material/Link';


import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import {  getGameLeaderboard } from '../api/getDraftLeaderboard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DraftContext } from '../contexts/DraftContext';

import CircularProgress from '@mui/material/CircularProgress';
import { NotificationContext } from '../contexts/NotificationContext';
import { useParams } from 'react-router-dom';


import { TornamentStatus } from '../@types/draft.typs';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


 type StandingInfo = { teamName:string,
  fermiScore: string,
  draftPlacement:string}
  

type DraftLeaderboard = {
  tournamentUpdatedDatetime:number,
  fermiDraftName:string,
  leaderboard:Array<StandingInfo>,
  tournamentStatus:TornamentStatus,
}
export const DraftFermiLeaderboard = ()=>{
    const { t } = useTranslation();
    const params= useParams();
    const draftId = useMemo(()=> params.draftid || 'null',[params.draftid]);
    const [draftLeaderboard,setDraftLeaderboard] = useState<DraftLeaderboard>();
    const [leaderBoardLoading,setLeaderBoardLoading] = useState<boolean>(true);
    const {draftName,setDraftName} = useContext(DraftContext);

    const {setRefreshTimestamp: setTimestamp} = useContext(DraftContext);
    const {setNotification} = useContext(NotificationContext);

    useEffect(()=>{
      getGameLeaderboard(draftId).then((draftLeaderboard)=>{

        setDraftLeaderboard(draftLeaderboard);
        setLeaderBoardLoading(false);
        setTimestamp(draftLeaderboard.tournamentUpdatedDatetime);
        draftName ===''&& setDraftName(draftLeaderboard.fermiDraftName);
      }
      ).catch((error)=>{

        setLeaderBoardLoading(false);
        setNotification(oldArray => [...oldArray, {type:"error",message:error.message}]);

      });
    },[])

return(
  


      
      <Stack direction='column' alignItems={'center'} width={'fill'}>

      
    <Stack  className='draft-leader-board-header' direction={'row'} spacing={3}>
      
       {draftLeaderboard && 

        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
           {draftLeaderboard.fermiDraftName}
        </Typography> 
       
        }
        {draftLeaderboard?.tournamentStatus === TornamentStatus.OFFICIAL && <Chip label={t('data-last-updated-after-done')} />}
        </Stack>

         { leaderBoardLoading ? <CircularProgress/> : <Grid sm={12} xs={12}>
     <TableContainer component={Paper}>
      <Table aria-label="leader board table" sx={{width:'fill'}}>
      
        <TableBody>
          {  draftLeaderboard?.leaderboard?.map((standingInfo) => (
            <TableRow
              key={standingInfo.teamName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {`${standingInfo.draftPlacement}.`}
              <Link  underline="hover"
               color="inherit" 
               href={`/drafts/${draftId}/teams/${standingInfo.teamName}`}>
                {`${standingInfo.teamName}`}
                </Link>
              </TableCell>
              <TableCell align="right">{standingInfo.fermiScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Grid>}
</Stack>


)
}