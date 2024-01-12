import Paper from '@mui/material/Paper';
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Link from '@mui/material/Link';
import InfoIcon from '@mui/icons-material/Info';
import { grey, lightGreen } from '@mui/material/colors';
import TourIcon from '@mui/icons-material/Tour';
import LinkIcon from '@mui/icons-material/Link';

import GroupsIcon from '@mui/icons-material/Groups';

import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

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
import DateRangeIcon from '@mui/icons-material/DateRange';


import { ITournamentInfo, RoundKey, TornamentStatus } from '../../@types/draft.typs';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { TableHead } from '@mui/material';
import { t } from 'i18next';
import MediaQuery from 'react-responsive';
import { CutlineNamePlaceholder } from '../../const/const';

const lightGrey = grey[300];


type TournamentLeaderboardProps = {
    draftId:string,
    tournamentInfo:ITournamentInfo,
}

export const TournamentLeaderboard = (props:TournamentLeaderboardProps)=>{
  
  const handleClickTeam = useCallback((teamOwner : string | undefined )=>{
    window.open(`/drafts/${props.draftId}/teams/${teamOwner}`, '_blank');

},[]);
const currentRoundKey:RoundKey = useMemo(()=> {
  return props.tournamentInfo?.currentRound==='4'? 
   'R4'
   :  props.tournamentInfo?.currentRound==='3'?
   'R3'
   :  props.tournamentInfo?.currentRound==='2'?
   'R2'
   :
  'R1'},[]) 
    return (
        <Stack direction='column' alignItems={'start'} width={'fill'}  spacing={3}>


          
          <Stack direction='column' alignItems={'start'} spacing={1}>
            
          { props.tournamentInfo?.currentRound &&  props.tournamentInfo?.currentRound.length > 0 && props.tournamentInfo?.currentRound !=='0' &&
        <Stack direction='row' spacing={1} height={'fit-content'}>
         <div style={{backgroundColor:lightGreen[500], textAlign: 'center', borderRadius: '3px',}}  > 
         <Typography  variant="subtitle2" width={'20px'}> {t('round-fermi-score-header-r',{roundNumber: props.tournamentInfo?.currentRound})}</Typography>
          </div>
          <Typography  variant="subtitle2" width={'85px'} color={lightGreen[500]}> {t('in-progress')}</Typography>
        </Stack>
        

        }
        <Link
    underline="hover"
    color="inherit"
    href={`/tournaments/${ props.tournamentInfo?.tornamentName}`}
  >

        <Stack direction='row' spacing={1} height={'fit-content'}  alignItems={'center'}>
        <TourIcon/>
             <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          
           { props.tournamentInfo?.tornamentName}
        </Typography> 
        <LinkIcon/>
        </Stack>
        </Link>
        <Stack direction='row' spacing={1} height={'fit-content'}  alignItems={'center'}>
        { props.tournamentInfo?.tournamentCourse &&  <Typography  
        variant="subtitle2"
        color={'text.secondary'}> { props.tournamentInfo?.tournamentCourse}</Typography>
        }
        { props.tournamentInfo?.tournamentLocation && 
        <Typography  
        variant="subtitle2"
        color={'text.secondary'}> @{ props.tournamentInfo?.tournamentLocation}</Typography>
        }
         { props.tournamentInfo?.tournamentDuration && 
        <Typography  
        variant="subtitle2"
        color={'text.secondary'}> 
        <Stack direction={'row'}  alignItems={'top'} >
          <DateRangeIcon/>
           <Typography variant='subtitle2'  width={'auto'} color={'text.secondary'} >
          { props.tournamentInfo?.tournamentDuration}
          </Typography>
          </Stack>
            </Typography>
            }
</Stack>
        </Stack>
        <MediaQuery minWidth={900}>
        <TableContainer component={Paper}>
      <Table aria-label="tournament leader board table"
       sx={{width:'fill'}}
       >
      
        
        <TableHead>
          <TableRow>
            <TableCell  component="th" align="left">{t('position')}</TableCell>
            <TableCell component="th" align="left">Player(Team)</TableCell>
            <TableCell  component="th" align="left">{t('total')}</TableCell>
            <TableCell  component="th" align="left">{t('through')}</TableCell>
            <TableCell  component="th" align="left" >
              <div style={{ paddingLeft:'2px',paddingRight:'2px',borderRadius: '3px',textAlign: 'center',backgroundColor: props.tournamentInfo?.currentRound === '1' ? lightGreen[500] : 'transparent'}}>
            {t('round-fermi-score-header-r',{roundNumber:1})}
            </div></TableCell>
            <TableCell  component="th" align="left">
            <div style={{paddingLeft:'2px',paddingRight:'2px',borderRadius: '3px',textAlign: 'center',backgroundColor: props.tournamentInfo?.currentRound === '2' ? lightGreen[500] : 'transparent'}}>
              {t('round-fermi-score-header-r',{roundNumber:2})}
              </div>
              </TableCell>
            <TableCell  component="th" align="left">
            <div style={{paddingLeft:'2px',paddingRight:'2px',borderRadius: '3px',textAlign: 'center',backgroundColor: props.tournamentInfo?.currentRound === '3' ? lightGreen[500] : 'transparent'}}>
              {t('round-fermi-score-header-r',{roundNumber:3})}
              </div></TableCell>
            <TableCell  component="th" align="left">
            <div style={{paddingLeft:'2px',paddingRight:'2px',borderRadius: '3px',textAlign: 'center',backgroundColor: props.tournamentInfo?.currentRound === '4' ? lightGreen[500] : 'transparent'}}>
              {t('round-fermi-score-header-r',{roundNumber:4})}
              </div>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tournamentInfo?.tornamentLeaderboard?.map((standingInfo) => {

            return CutlineNamePlaceholder.indexOf(standingInfo.playerName) > -1 ? 
            <TableRow
            key={standingInfo.playerName}
            sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor: lightGrey, }}
          >
          <TableCell colSpan={8}> 
          <Stack direction={'row'} width={'fill'} spacing={1} alignItems={'center'} justifyContent={'center'}>
            <InfoIcon style={{ fontSize: 'medium' }}/>
            <Typography variant='body2'>
          { `${t(standingInfo.playerName)} @ ${standingInfo.totalOverUnder}`}
          
          </Typography>
          </Stack>
          
          </TableCell>
          
          </TableRow>
            :
             <TableRow
              key={standingInfo.playerName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align="left">
              {`${standingInfo.placement}.`}
              </TableCell>
              <TableCell component="th" align="left">
              {`${standingInfo.playerName}`}
              

             { standingInfo.teamOwner &&  
               <Chip label={` ${standingInfo.teamOwner}`} 
               disabled = {!Boolean(standingInfo.teamOwner)}
               onClick={()=>{handleClickTeam(standingInfo.teamOwner)}}
               sx={{marginLeft:'8px'}}
               variant="outlined"
               icon={<GroupsIcon />} 
               />
               }
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo.totalOverUnder}
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo.playThrough}
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo.R1? standingInfo.R1 : '-'}
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo.R2? standingInfo.R2 : '-'}
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo.R3? standingInfo.R3 : '-'}
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo.R4? standingInfo.R4 : '-'}
              </TableCell>

            </TableRow>
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </MediaQuery>

        <MediaQuery maxWidth={900}>
        <TableContainer component={Paper}>
      <Table aria-label="tournament leader board table"
       sx={{width:'fill'}}
       >
      
        
        <TableHead>
          <TableRow>
            <TableCell  component="th" align="left">{t('position-short')}</TableCell>
            <TableCell component="th" align="left">Player(Team)</TableCell>
            <TableCell  component="th" align="left">{t('total-short')}</TableCell>
            <TableCell  component="th" align="left">{t('through-short')}</TableCell>
            <TableCell  component="th" align="left" >
              <div style={{ paddingLeft:'2px',paddingRight:'2px',borderRadius: '3px',textAlign: 'center',backgroundColor:lightGreen[500]}}>
            {t('round-fermi-score-header-r',{roundNumber: props.tournamentInfo?.currentRound})}
            </div></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tournamentInfo?.tornamentLeaderboard?.map((standingInfo) => {
            return CutlineNamePlaceholder.indexOf(standingInfo.playerName) > -1 ? 
            <TableRow
            key={standingInfo.playerName}
            sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor: lightGrey, }}
          >
          <TableCell colSpan={8}> 
          <Stack direction={'row'} width={'fill'} spacing={1} alignItems={'center'} justifyContent={'center'}>
            <InfoIcon style={{ fontSize: 'medium' }}/>
            <Typography variant='body2'>
          { `${t(standingInfo.playerName)} @ ${standingInfo.totalOverUnder}`}
          
          </Typography>
          </Stack>
          
          </TableCell>
          
          </TableRow>
            :
            <TableRow
              key={standingInfo.playerName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align="left">
              {`${standingInfo.placement}.`}
              </TableCell>
              <TableCell component="th" align="left">
              <Stack direction='column' alignItems={'start'} spacing={1} flexWrap={'wrap'}>
              {`${standingInfo.playerName}`}
              

             { standingInfo.teamOwner &&  
               <Chip label={`${standingInfo.teamOwner}`} 
               disabled = {!Boolean(standingInfo.teamOwner)}
               onClick={()=>{handleClickTeam(standingInfo.teamOwner)}}
               sx={{marginLeft:'8px'}}
               variant="outlined"
               icon={<GroupsIcon />} 
               />
               }
               </Stack>
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo.totalOverUnder}
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo.playThrough}
              </TableCell>
              <TableCell component="th" align="left">
              {standingInfo[currentRoundKey]? standingInfo[currentRoundKey] : '-'}
              </TableCell>
            </TableRow>
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </MediaQuery>
            </Stack>
    )

}