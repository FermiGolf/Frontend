import React ,{ useMemo, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import { TeamHolesStrokesTable } from './TeamHolesStrokesTable';
import { useTranslation } from 'react-i18next';
import { ScoreMetricUnitRadioButtonGroup } from '../ScoreMetricUnitRadioButtonGroup';
import { GroupByCriteria, ScoreMetricUnit } from '../../const/const';




import Stack from '@mui/material/Stack';

import HoleViewToggle from './HoleViewToggle';
import { HoleInfo, ScoreCatergory, mockGetTeamInfoResponse } from '../../@types/score.type';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
        {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
type TeamHolesTabsContainerProps = {
  team:mockGetTeamInfoResponse
};

export function TeamHolesTabsContainer({team}:TeamHolesTabsContainerProps) {
    const { t } = useTranslation();


  const [scoreUnit, setScoreUnit] = useState<ScoreMetricUnit>(ScoreMetricUnit.FERMISCORE);
  const [groupByCriteria, setCriteria] = React.useState<GroupByCriteria>(GroupByCriteria.BY_ROUND);

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScoreUnit((event.target as HTMLInputElement).value as ScoreMetricUnit);
  };
  


  const tableLabels = useMemo(()=> groupByCriteria === GroupByCriteria.BY_PLAYER ? 
  [team.players[0].playerName,team.players[1].playerName,team.players[2].playerName,team.players[3].playerName]
  :[t("round-fermi-score-header-round",{roundNumber:1}),
  t("round-fermi-score-header-round",{roundNumber:2}),
  t("round-fermi-score-header-round",{roundNumber:3}),
  t("round-fermi-score-header-round",{roundNumber:4})],
  [groupByCriteria,team]);

  type FinalTableDataObj = { label:string,holeInfo:HoleInfo,secondaryLabel:string,};
  type FinalTableData = {
    tab1:Array<FinalTableDataObj>,
    tab2:Array<FinalTableDataObj>,
    tab3:Array<FinalTableDataObj>,
    tab4:Array<FinalTableDataObj>
  }
type TableDataByCriteria = {[GroupByCriteria.BY_ROUND]:FinalTableData,[GroupByCriteria.BY_PLAYER]:FinalTableData}
  const tableData:TableDataByCriteria = useMemo(()=> {
    let finalRoundData:FinalTableData = {tab1:[],tab2:[],tab3:[],tab4:[]};
    let finalPlayerData:FinalTableData = {tab1:[],tab2:[],tab3:[],tab4:[]};
    team.players?.map((player,index)=>{

      player?.roundInfo?.round1?.holeInfo && player?.roundInfo?.round1?.holeInfo.length > 0 && finalRoundData.tab1.push({
        label:player.playerName,
        secondaryLabel: t("round-fermi-score-header-round",{roundNumber:1}),
        holeInfo:player?.roundInfo?.round1?.holeInfo,
      });
      player?.roundInfo?.round2?.holeInfo && player?.roundInfo?.round2?.holeInfo.length > 0 && finalRoundData.tab2.push({
        label:player.playerName,
        secondaryLabel: t("round-fermi-score-header-round",{roundNumber:2}),
        holeInfo:player?.roundInfo?.round2?.holeInfo
      });
      player?.roundInfo?.round3?.holeInfo && player?.roundInfo?.round3?.holeInfo.length > 0 && finalRoundData.tab3.push({
        label:player.playerName,
        secondaryLabel: t("round-fermi-score-header-round",{roundNumber:3}),
        holeInfo:player?.roundInfo?.round3?.holeInfo
      });
      player?.roundInfo?.round4?.holeInfo && player?.roundInfo?.round4?.holeInfo.length > 0 && finalRoundData.tab4.push({
        label:player.playerName,
        secondaryLabel: t("round-fermi-score-header-round",{roundNumber:4}),
        holeInfo:player?.roundInfo?.round4?.holeInfo
      });

      switch(index) { 
        case 0: { 
          player?.roundInfo?.round1?.holeInfo && player?.roundInfo?.round1?.holeInfo.length > 0 && finalPlayerData.tab1.push({
            label:t("round-fermi-score-header-round",{roundNumber:1}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round1?.holeInfo
          });
          player?.roundInfo?.round2?.holeInfo && player?.roundInfo?.round2?.holeInfo.length > 0 &&  finalPlayerData.tab1.push({
            label:t("round-fermi-score-header-round",{roundNumber:2}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round2?.holeInfo
          });
          player?.roundInfo?.round3?.holeInfo && player?.roundInfo?.round3?.holeInfo.length > 0 && finalPlayerData.tab1.push({
            label:t("round-fermi-score-header-round",{roundNumber:3}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round3?.holeInfo
          });
          player?.roundInfo?.round4?.holeInfo && player?.roundInfo?.round4?.holeInfo.length > 0 && finalPlayerData.tab1.push({
            label:t("round-fermi-score-header-round",{roundNumber:4}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round4?.holeInfo
          });
           break; 
        } 
        case 1: { 
          player?.roundInfo?.round1?.holeInfo && player?.roundInfo?.round1?.holeInfo.length > 0 && finalPlayerData.tab2.push({
            label:t("round-fermi-score-header-round",{roundNumber:1}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round1?.holeInfo
          });
          player?.roundInfo?.round2?.holeInfo && player?.roundInfo?.round2?.holeInfo.length > 0 && finalPlayerData.tab2.push({
            label:t("round-fermi-score-header-round",{roundNumber:2}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round2?.holeInfo
          });
          player?.roundInfo?.round3?.holeInfo && player?.roundInfo?.round3?.holeInfo.length > 0 && finalPlayerData.tab2.push({
            label:t("round-fermi-score-header-round",{roundNumber:3}),
             secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round3?.holeInfo
          });
          player?.roundInfo?.round4?.holeInfo && player?.roundInfo?.round4?.holeInfo.length > 0 && finalPlayerData.tab2.push({
            label:t("round-fermi-score-header-round",{roundNumber:4}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round4?.holeInfo
          });
           break; 
        } 
        case 2: { 
          player?.roundInfo?.round1?.holeInfo && player?.roundInfo?.round1?.holeInfo.length > 0 && finalPlayerData.tab3.push({
            label:t("round-fermi-score-header-round",{roundNumber:1}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round1?.holeInfo
          });
          player?.roundInfo?.round2?.holeInfo && player?.roundInfo?.round2?.holeInfo.length > 0 && finalPlayerData.tab3.push({
            label:t("round-fermi-score-header-round",{roundNumber:2}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round2?.holeInfo
          });
          player?.roundInfo?.round3?.holeInfo && player?.roundInfo?.round3?.holeInfo.length > 0 && finalPlayerData.tab3.push({
            label:t("round-fermi-score-header-round",{roundNumber:3}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round3?.holeInfo
          });
          player?.roundInfo?.round4?.holeInfo && player?.roundInfo?.round4?.holeInfo.length > 0 && finalPlayerData.tab3.push({
            label:t("round-fermi-score-header-round",{roundNumber:4}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round4?.holeInfo
          });
           break; 
        } 
        case 3: { 
          player?.roundInfo?.round1?.holeInfo && player?.roundInfo?.round1?.holeInfo.length > 0 && finalPlayerData.tab4.push({
            label:t("round-fermi-score-header-round",{roundNumber:1}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round1?.holeInfo
          });
          player?.roundInfo?.round2?.holeInfo && player?.roundInfo?.round2?.holeInfo.length > 0 && finalPlayerData.tab4.push({
            label:t("round-fermi-score-header-round",{roundNumber:2}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round2?.holeInfo
          });
          player?.roundInfo?.round3?.holeInfo && player?.roundInfo?.round3?.holeInfo.length > 0 &&  finalPlayerData.tab4.push({
            label:t("round-fermi-score-header-round",{roundNumber:3}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round3?.holeInfo
          });
          player?.roundInfo?.round4?.holeInfo && player?.roundInfo?.round4?.holeInfo.length > 0 && finalPlayerData.tab4.push({
            label:t("round-fermi-score-header-round",{roundNumber:4}),
            secondaryLabel: player.playerName,
            holeInfo:player?.roundInfo?.round4?.holeInfo
          });
           break; 
        }
     } 

    })

    return {[GroupByCriteria.BY_ROUND]:finalRoundData,[GroupByCriteria.BY_PLAYER]:finalPlayerData};
  },[team]);

  const tab1Visible = useMemo(()=> tableData && tableData[groupByCriteria]?.tab1?.length>0,[groupByCriteria,tableData]);
  const tab2Visible = useMemo(()=> tableData && tableData[groupByCriteria]?.tab2?.length>0,[groupByCriteria,tableData]);
  const tab3Visible = useMemo(()=> tableData && tableData[groupByCriteria]?.tab3?.length>0,[groupByCriteria,tableData]);
  const tab4Visible = useMemo(()=> tableData && tableData[groupByCriteria]?.tab4?.length>0,[groupByCriteria,tableData]);

const defaultTabValue = useMemo(()=>tab4Visible? 3 : tab3Visible ? 2 : tab2Visible ? 1: 0,[tab2Visible,tab3Visible,tab4Visible])
const [value, setValue] = React.useState(defaultTabValue);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};
const handleSetCriteria = (event: GroupByCriteria)=>{

  setCriteria(event);

  setValue(0);
}
  return (
    <Box sx={{ width: '100%'}} >
    
        <Stack spacing={1}>
        <Stack direction="row" alignContent={'bottom'} sx={{justifyContent:'space-between'}}>
    <ScoreMetricUnitRadioButtonGroup unit={scoreUnit} onChange={handleUnitChange} hideOverUnder={true}/>
    <HoleViewToggle view={groupByCriteria} onChange={handleSetCriteria}/>
    </Stack>
    </Stack>


      <Box sx={{ borderBottom: 1, borderColor: 'divider',paddingBottom:'8px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="team-holes-table" variant="fullWidth">
          {tab1Visible && <Tab icon={<SportsGolfIcon />} 
          iconPosition="start" wrapped={true}
          label={tableLabels[0]} {...a11yProps(0)} />}
          {tab2Visible && <Tab icon={<SportsGolfIcon />} wrapped={true}
          iconPosition="start" label={tableLabels[1]} {...a11yProps(1)} />}
         {tab3Visible &&  <Tab icon={<SportsGolfIcon />} iconPosition="start" 
         wrapped={true}
         label={tableLabels[2]} {...a11yProps(2)} />}
         { tab4Visible &&  <Tab icon={<SportsGolfIcon />} wrapped={true} iconPosition="start" label={tableLabels[3]} {...a11yProps(3)} />}
        </Tabs>
      </Box>
      {tab1Visible && <CustomTabPanel value={value} index={0}>
        <TeamHolesStrokesTable holeData={tableData[groupByCriteria].tab1} unit={scoreUnit}/>
      </CustomTabPanel>
      }
      {tab2Visible && <CustomTabPanel value={value} index={1}>
      <TeamHolesStrokesTable holeData={tableData[groupByCriteria].tab2} unit={scoreUnit}/>

      </CustomTabPanel>
      }
      {tab3Visible && 
      <CustomTabPanel value={value} index={2}>
      <TeamHolesStrokesTable holeData={tableData[groupByCriteria].tab3} unit={scoreUnit}/>

      </CustomTabPanel>
      }
      { tab4Visible && 
      <CustomTabPanel value={value} index={3}>
      <TeamHolesStrokesTable holeData={tableData[groupByCriteria].tab4} unit={scoreUnit}/>

      </CustomTabPanel>
}
    </Box>
  );
}