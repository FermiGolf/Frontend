import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import Box from "@mui/material/Box";
import {  HoleInfo } from "../../@types/score.type";
import { ScoreMetricUnit } from "../../const/const";


import GolfScoreContainer from "../common/GolfScoreContainer";

const tableCellAlignment = 'center';
type HoleDataObj = {
  label:string,
  holeInfo:HoleInfo,
}
  type TeamHolesStrokesTableProps = {
    holeData:Array<HoleDataObj>,
    unit:ScoreMetricUnit
  }
export const TeamHolesStrokesTable = ({holeData,unit}:TeamHolesStrokesTableProps)=>{
    const { t } = useTranslation();


    return (
<div>
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="highlighted-row">
            <TableCell >{t("hole-header")}</TableCell>
            
            <TableCell align={tableCellAlignment}>1</TableCell>
            <TableCell align={tableCellAlignment}>2</TableCell>
            <TableCell align={tableCellAlignment}>3</TableCell>
            <TableCell align={tableCellAlignment}>4</TableCell>
            <TableCell align={tableCellAlignment}>5</TableCell>
            <TableCell align={tableCellAlignment}>6</TableCell>
            <TableCell align={tableCellAlignment}>7</TableCell>
            <TableCell align={tableCellAlignment}>8</TableCell>
            <TableCell align={tableCellAlignment}>9</TableCell>
            <TableCell align={tableCellAlignment}>10</TableCell>
            <TableCell align={tableCellAlignment}>11</TableCell>
            <TableCell align={tableCellAlignment}>12</TableCell>
            <TableCell align={tableCellAlignment}>13</TableCell>
            <TableCell align={tableCellAlignment}>14</TableCell>
            <TableCell align={tableCellAlignment}>15</TableCell>
            <TableCell align={tableCellAlignment}>16</TableCell>
            <TableCell align={tableCellAlignment}>17</TableCell>
            <TableCell align={tableCellAlignment}>18</TableCell>
            <TableCell align={tableCellAlignment}>{t('total')}</TableCell>
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
              {row?.holeInfo?.map((hole,index)=>{
                return <TableCell key={`${row.label}-cell-${index}`} align={tableCellAlignment} style={{ padding: '3px'}}>
                    { unit === ScoreMetricUnit.STROKE ? 
                    <GolfScoreContainer value={hole.holeDetail.scores[unit]}  type={hole?.scoreCategory}/> 

                    :
                    hole.holeDetail.scores[unit]}
                    </TableCell>
                
              }
              )}

            
            </TableRow>
          ))}
          <TableRow className="highlighted-row">
            <TableCell><Box fontWeight='fontWeightMedium' display='inline'>{t("par-header")}</Box></TableCell>
            {
              holeData[0]?.holeInfo?.map((holeInfo,index)=>(
                <TableCell key={`par-${index}`}align={tableCellAlignment}>{holeInfo.holeDetail.par}</TableCell>
              ))
            }
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    )
}