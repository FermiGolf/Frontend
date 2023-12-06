import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { GroupByCriteria } from '../../const/const';
import { useTranslation } from 'react-i18next';


type HoleViewTogglePropsType = { view:string,onChange:(props:any)=> void}
export default function HoleViewToggle(props:HoleViewTogglePropsType) {


  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newCriteria: GroupByCriteria,
  ) => {
    props.onChange(newCriteria);
  };
  const { t } = useTranslation();

  return (
    <ToggleButtonGroup
      value={props.view}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value={GroupByCriteria.BY_ROUND} aria-label="left aligned">
        {t('hole-breakdown-round')}
      </ToggleButton>
      <ToggleButton value={GroupByCriteria.BY_PLAYER} aria-label="centered">
      {t('hole-breakdown-player')}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}