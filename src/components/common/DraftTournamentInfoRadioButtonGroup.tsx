import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useTranslation } from 'react-i18next';
import { ScoreMetricUnit } from '../../const/const';

type PropsType = { 
  viewType:string,
  onChange:(props:any)=> void,


}
export enum LeaderBoardViewType  {DRAFT_INFO='draft-info',TOURNAMENT_INFO='tournament-info'}

export const DraftTournamentInfoRadioButtonGroup =({viewType,onChange}:PropsType)=> {
    const { t } = useTranslation();


  return (
    <FormControl>

      <RadioGroup
        row
        aria-labelledby="metrics-unit-radio-buttons-group-label"
        name="metric-unit-radio-buttons-group"
        value={viewType}
        onChange={onChange}
      >
        <FormControlLabel value={LeaderBoardViewType.DRAFT_INFO} control={<Radio />} label={t(LeaderBoardViewType.DRAFT_INFO)} />
         <FormControlLabel value={LeaderBoardViewType.TOURNAMENT_INFO} control={<Radio />} label={t(LeaderBoardViewType.TOURNAMENT_INFO)} /> 


      </RadioGroup>
    </FormControl>
  );
}