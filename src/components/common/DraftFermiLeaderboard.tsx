
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from '@mui/material/Link';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import LinkIcon from '@mui/icons-material/Link';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import {  getGameLeaderboard } from '../../api/getDraftLeaderboard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DraftContext } from '../../contexts/DraftContext';

import CircularProgress from '@mui/material/CircularProgress';
import { NotificationContext } from '../../contexts/NotificationContext';
import { useParams } from 'react-router-dom';


import { ITournamentInfo, TornamentStatus } from '../../@types/draft.typs';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TableHead from '@mui/material/TableHead';


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
    const {draftName,setDraftName,setTournamentInfo} = useContext(DraftContext);

    const {setRefreshTimestamp: setTimestamp} = useContext(DraftContext);
    const {setNotification} = useContext(NotificationContext);

    useEffect(()=>{
      getGameLeaderboard(draftId).then((draftLeaderboard)=>{

        setDraftLeaderboard(draftLeaderboard);
        setLeaderBoardLoading(false);
        setTimestamp(draftLeaderboard.tournamentUpdatedDatetime);
        draftName ===''&& setDraftName(draftLeaderboard.fermiDraftName);
        let tourInfo : ITournamentInfo = {
          tornamentName : '',
          currentRound:'',
          tournamentLocation:'',
          tournamentCourse:'',
          tournamentDuration:'',
          tornamentLeaderboard:[],
      };
      if (Boolean(draftLeaderboard.tornamentName)) {tourInfo.tornamentName = draftLeaderboard.tornamentName;}
      if (Boolean(draftLeaderboard.currentRound)) {tourInfo.currentRound = draftLeaderboard.currentRound;}
      if (Boolean(draftLeaderboard.tournamentLocation)) {tourInfo.tournamentLocation = draftLeaderboard.tournamentLocation;}
      if (Boolean(draftLeaderboard.tournamentCourse)) {tourInfo.tournamentCourse = draftLeaderboard.tournamentCourse;}
      if (Boolean(draftLeaderboard.tournamentDuration)) {tourInfo.tournamentDuration = draftLeaderboard.tournamentDuration;}
      if (Boolean(draftLeaderboard.tornamentLeaderboard)) {tourInfo.tornamentLeaderboard = draftLeaderboard.tornamentLeaderboard;}

        setTournamentInfo(tourInfo)
      }
      ).catch((error)=>{

        setLeaderBoardLoading(false);
        setNotification(oldArray => [...oldArray, {type:"error",message:error.message}]);

      });
    },[])

return(
  


      
      <Stack direction='column' alignItems={'center'} width={'fit-content'}>

      
    <Stack  className='draft-leader-board-header' direction={'row'} spacing={3}>
      
       {draftLeaderboard && 
       <Stack direction={'row'} spacing={1} height={'fit-content'}  alignItems={'center'}>
       <InsertDriveFileIcon/>

        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
           {draftLeaderboard.fermiDraftName}
        </Typography> 
        </Stack>
       
        }
        {draftLeaderboard?.tournamentStatus === TornamentStatus.OFFICIAL && <Chip label={t('data-last-updated-after-done')} />}
        </Stack>

         { leaderBoardLoading && <CircularProgress/> }
         {draftLeaderboard && 
         <Grid sm={12} xs={12}>
     <TableContainer component={Paper}>
      <Table aria-label="leader board table" sx={{width:'fill'}}>
      <TableHead>
          <TableRow>
            <TableCell  component="th" align="left" width={'fit-content'}>{t('position')}</TableCell>
            <TableCell component="th" align="left" width={'auto'}>{t('team')}</TableCell>
            <TableCell  component="th" align="center" width={'auto'}>{t('round-fermi-score-header-player-score')}</TableCell>
          </TableRow>
        </TableHead>
      
        <TableBody>
          {  draftLeaderboard?.leaderboard?.map((standingInfo) => (
            <TableRow
              key={standingInfo.teamName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align="left" >
              {`${standingInfo.draftPlacement}.`}
              </TableCell>
              <TableCell component="th" width={'auto'}>
              <Link  underline="hover"
               color="inherit" 
               href={`/drafts/${draftId}/teams/${standingInfo.teamName}`}>
                <Stack direction='row' 
                spacing={1}
                 height={'fit-content'}  
                 alignItems={'center'} 
               
                >
                  <Typography variant='body2'  width={'auto'} color={'text.primary'} >
                {`${standingInfo.teamName}`}
                </Typography>
                <LinkIcon style={{ fontSize: 'medium' }}/>
                </Stack>
                </Link>
              </TableCell>
              <TableCell align="center" width={'auto'}>{standingInfo.fermiScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Grid>}
</Stack>


)
}