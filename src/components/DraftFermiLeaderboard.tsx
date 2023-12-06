
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useState } from "react";
import Link from '@mui/material/Link';


import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import { getGameLeaderboard } from '../api/getDraftLeaderboard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { RefreshTimeContext } from '../contexts/RefreshTimeContext';

import CircularProgress from '@mui/material/CircularProgress';
import { NotificationContext } from '../contexts/NotificationContext';

 type StandingInfo = { name:string,
  fermiScore: string,
  draftPlacement:string}
  

type DraftLeaderboard = {
  draftName:string,
  leaderboard:Array<StandingInfo>
}
export const DraftFermiLeaderboard = ()=>{
    const { t } = useTranslation();
    const [draftLeaderboard,setDraftLeaderboard] = useState<DraftLeaderboard>();
    const [leaderBoardLoading,setLeaderBoardLoading] = useState<boolean>(true);

    const {setRefreshTimestamp: setTimestamp} = useContext(RefreshTimeContext);
    const {setNotification} = useContext(NotificationContext);
    useEffect(()=>{
      getGameLeaderboard('foo').then((draftLeaderboard)=>{
        setDraftLeaderboard(draftLeaderboard);
        setLeaderBoardLoading(false);
        setTimestamp(draftLeaderboard.lastRefreshAt);
      }
      ).catch(()=>{
        setLeaderBoardLoading(false);
        setNotification({type:"error",message:'getGameLeaderboard error'});
      });
    },[])

return(
  
    <Grid container >
      <Grid xs={12} sm={12}>
    <div  className='draft-leader-board-header'>
       {draftLeaderboard && <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
           {t('leader-board')}
        </Typography> }
        </div>
        </Grid>
         { leaderBoardLoading ? <CircularProgress/> : <Grid sm={12} xs={12}>
     <TableContainer component={Paper}>
      <Table aria-label="simple table">
      
        <TableBody>
          {draftLeaderboard?.leaderboard?.length && draftLeaderboard?.leaderboard?.length >0 && draftLeaderboard?.leaderboard.map((standingInfo) => (
            <TableRow
              key={standingInfo.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {`${standingInfo.draftPlacement}.`}
              <Link  underline="hover"
               color="inherit" 
               href={`/drafts/123455/teams/${standingInfo.name}`}>
                {`${standingInfo.name}`}
                </Link>
              </TableCell>
              <TableCell align="right">{standingInfo.fermiScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Grid>}
    </Grid>

)
}