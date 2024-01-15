import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import Badge from '@mui/material/Badge';

import { getTeamInfo } from "../../api/getTeamInfo";
import { ScoreMetricUnitRadioButtonGroup } from "../common/ScoreMetricUnitRadioButtonGroup";
import { ScoreMetricUnit } from "../../const/const";
import { Box, Grid, Typography } from "@mui/material";


function createData(
    name:string,
    round1: string,
    round2: string,
    round3: string,
    round4: string,
    playScore: string,
    placementScore:number,
  ) {
    return { name,round1, round2, round3, round4, playScore ,placementScore};
  }
  
  const rows = [
    createData('John Rahm', "13", "WD", "WD","WD", "13",0),
    createData('Corey Conner', "9.5", "13", "MC", "MC","22.5",0),
    createData('Si Woo Kim', "22.5", "11.5", "22", "15","74",3),
    createData('Taylor Montgomery', "20", "13.5", "24", "15.5","74",2),

  ];

export const TeamRoundFermiScoreTable = ()=>{
    const { t } = useTranslation();
    const [teamInfo,setTeamInfo] = useState<unknown>()
    useEffect(()=>{
      getTeamInfo('foo','bar').then((response)=>{
        setTeamInfo(response);
      }
      );
    },[])
    const [scoreUnit, setScoreUnit] = useState<ScoreMetricUnit>(ScoreMetricUnit.FERMISCORE);

    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setScoreUnit((event.target as HTMLInputElement).value as ScoreMetricUnit);
    };
    return (
      <Box component="section">
        <Grid container >
        <Grid xs={6} sm={9}> <Typography color="text.primary" variant="h6">{t("team-round-label")}</Typography></Grid>
  <Grid xs={6} sm={3}>
    <ScoreMetricUnitRadioButtonGroup unit={scoreUnit} onChange={handleUnitChange}/>
        </Grid>
     </Grid>


 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="team round score table">
        <TableHead>
          <TableRow className="highlighted-row">
            <TableCell></TableCell>
            <TableCell align="right">{t("round-fermi-score-header-round",{roundNumber:1})}</TableCell>
            <TableCell align="right">{t("round-fermi-score-header-round",{roundNumber:2})}</TableCell>
            <TableCell align="right">{t("round-fermi-score-header-round",{roundNumber:3})}</TableCell>
            <TableCell align="right">{t("round-fermi-score-header-round",{roundNumber:4})}</TableCell>
            <TableCell align="right">{t('round-fermi-score-header-player-score')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.round1}</TableCell>
              <TableCell align="right">{row.round2}</TableCell>
              <TableCell align="right">{row.round3}</TableCell>
              <TableCell align="right">{row.round4}</TableCell>
              <TableCell align="right">
              
                 <Badge color="success" overlap="circular" badgeContent={row.placementScore && `+${row.placementScore}`}>
                 <div className="round-cell">  {row.playScore}  </div>
                </Badge>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Box>

    )
}