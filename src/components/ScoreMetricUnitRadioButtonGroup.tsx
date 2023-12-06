import React,{useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useTranslation } from 'react-i18next';
import { ScoreMetricUnit } from '../const/const';

type PropsType = { unit:string,onChange:(props:any)=> void,hideOverUnder?:boolean}

export const ScoreMetricUnitRadioButtonGroup =({unit,onChange,hideOverUnder}:PropsType)=> {
    const { t } = useTranslation();


  return (
    <FormControl>

      <RadioGroup
        row
        aria-labelledby="metrics-unit-radio-buttons-group-label"
        name="metric-unit-radio-buttons-group"
        value={unit}
        onChange={onChange}
      >
        <FormControlLabel value={ScoreMetricUnit.FERMISCORE} control={<Radio />} label="Score" />
        <FormControlLabel value={ScoreMetricUnit.STROKE} control={<Radio />} label="Stroke" />
        {!hideOverUnder && <FormControlLabel value={ScoreMetricUnit.OVERUNDER} control={<Radio />} label="+/-" />}

      </RadioGroup>
    </FormControl>
  );
}