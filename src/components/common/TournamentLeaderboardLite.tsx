import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack, Typography, Chip } from "@mui/material"
import { grey, lightGreen } from "@mui/material/colors"
import { t } from "i18next"
import React, { useCallback, useMemo } from "react"
import { CutlineNamePlaceholder } from "../../const/const";
import { ITournamentInfo, RoundKey } from "../../@types/draft.typs";

import InfoIcon from '@mui/icons-material/Info';
const lightGrey = grey[300];
const narrow = '45px'

import GroupsIcon from '@mui/icons-material/Groups';

type TournamentLeaderboardLiteProps = {
    draftId:string,
    tournamentInfo:ITournamentInfo,
}

export const TournamentLeaderboardLite = (props:TournamentLeaderboardLiteProps)=>{
    const currentRoundKey:RoundKey = useMemo(()=> {
        return props.tournamentInfo?.currentRound==='4'? 
         'R4'
         :  props.tournamentInfo?.currentRound==='3'?
         'R3'
         :  props.tournamentInfo?.currentRound==='2'?
         'R2'
         :
        'R1'},[]) 
        const handleClickTeam = useCallback((teamOwner : string | undefined )=>{
            window.open(`/drafts/${props.draftId}/teams/${teamOwner}`, '_blank');
        
        },[]);
    return (
        <TableContainer component={Paper}>
      <Table aria-label="tournament leader board table"
       sx={{width:'fit-content'}}
       >
      
        
        <TableHead>
          <TableRow>
            <TableCell  component="th" align="left" sx={{maxWidth: narrow}}>{t('position-short')}</TableCell>
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
              <TableCell component="th" align="left" sx={{maxWidth: narrow}}>
              {`${standingInfo.placement}`}
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
    )
}

