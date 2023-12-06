import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { HoleDetail, HoleInfo } from "../../@types/score.type";
import { ScoreMetricUnit } from "../../const/const";


type HoleDataObj = {
  label:string,
  holeInfo:HoleInfo
}
  type TeamHolesStrokesTableProps = {
    holeData:Array<HoleDataObj>,
    unit:ScoreMetricUnit
  }
export const TeamHolesStrokesTable = ({holeData,unit}:TeamHolesStrokesTableProps)=>{
    const { t } = useTranslation();


    return (

 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="highlighted-row">
            <TableCell >{t("hole-header")}</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">2</TableCell>
            <TableCell align="right">3</TableCell>
            <TableCell align="right">4</TableCell>
            <TableCell align="right">5</TableCell>
            <TableCell align="right">6</TableCell>
            <TableCell align="right">7</TableCell>
            <TableCell align="right">8</TableCell>
            <TableCell align="right">9</TableCell>
            <TableCell align="right">10</TableCell>
            <TableCell align="right">11</TableCell>
            <TableCell align="right">12</TableCell>
            <TableCell align="right">13</TableCell>
            <TableCell align="right">14</TableCell>
            <TableCell align="right">15</TableCell>
            <TableCell align="right">16</TableCell>
            <TableCell align="right">17</TableCell>
            <TableCell align="right">18</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holeData.map((row,index) => (
            <TableRow
              key={`${row.label}-${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              {row.holeInfo.map((hole,index)=>(
                <TableCell key={`${row.label}-cell-${index}`} align="right">{hole.holeDetail.score[unit]}</TableCell>
              ))}
            
            </TableRow>
          ))}
          <TableRow className="highlighted-row">
            <TableCell><Box fontWeight='fontWeightMedium' display='inline'>{t("par-header")}</Box></TableCell>
            {
              holeData[0].holeInfo.map((holeInfo,index)=>(
                <TableCell key={`par-${index}`}align="right">{holeInfo.holeDetail.par}</TableCell>
              ))
            }
          
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    )
}