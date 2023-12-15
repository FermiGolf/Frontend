

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

import {playScoringBreakdowns,placementScoringBreakdowns} from '../../const/const';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


export const ScoringBreakdown = ()=>{
    const { t } = useTranslation();
    return(
        <Stack direction={'column'} spacing={1}>

            <TableContainer component={Paper} sx={{alignContent:"center", width: 'max-content'}}>
      <Table sx={{ width: 'max-content' }} aria-label={t("rules-title")}>
        <TableHead>
        <TableRow className="highlighted-row">
            <TableCell align="left">{t("scoring-criteria")}</TableCell>
            <TableCell align="left">{t("points")}</TableCell>
          </TableRow>
            </TableHead>
            <TableHead>
        <TableRow className="secondary-highlighted-row">
            <TableCell align="left"><Typography color="text.secondary">{t("play-score-label")}</Typography></TableCell>
            <TableCell />
          </TableRow>
            </TableHead>
            
            <TableBody>
            {playScoringBreakdowns.map((row,index) => (
            <TableRow
              key={`play-score-${index}`}
            >
                 <TableCell component="th" scope="row"  className='indented-row'>
                 <Stack direction="row" spacing={1}>
                 <Typography color="text.primary">{ t(row.rule)}</Typography>
                 {row.info && <Tooltip title={t(row.info)} placement={'right'} enterTouchDelay={1}><InfoOutlinedIcon /></Tooltip>}
                </Stack>                
                </TableCell>
              <TableCell component="th" scope="row">
              <Typography color="text.primary"> {row.points}</Typography>
              </TableCell>
            </TableRow>
          ))}

        <TableRow className="secondary-highlighted-row">
        
            <TableCell align="left">
            <Stack direction="row" spacing={1}>
              <Typography color="text.secondary">{t("placement-score-label")}</Typography>
            <Tooltip title={t('scoring-notes')} placement={'right'} enterTouchDelay={1}><InfoOutlinedIcon /></Tooltip>
            </Stack>
            </TableCell>


            <TableCell />
          </TableRow>

          {placementScoringBreakdowns.map((row,index) => (
            <TableRow
              key={`placement-score-${index}`}
            >
                <TableCell component="th" scope="row"  className='indented-row'>
                <Typography color="text.primary"> {t(row.rule)}{" "}{t('placement-label')}</Typography>
                </TableCell>
              <TableCell component="th" scope="row">
              <Typography color="text.primary">  {row.points}</Typography>
              </TableCell>
            </TableRow>
          ))}
            </TableBody>
            </Table>
            </TableContainer>

<List dense={true}>
 
            <ListItem>
            <Typography variant='subtitle2' color="text.secondary"> 
            *{t("scoring-additional-info-wd")}
            </Typography>
            </ListItem>
            <ListItem>
            <Typography variant='subtitle2' color="text.secondary"> 
            *{t("scoring-additional-info-playoff")}
            </Typography>
            </ListItem>
            </List>



            </Stack>
    )
}