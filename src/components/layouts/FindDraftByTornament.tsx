
import { InputLabel, Select, MenuItem, SelectChangeEvent, FormControl, FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


import React, {  useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tornaments } from "../../const/tornaments";
import MediaQuery from "react-responsive";



export const FindDraftByTornament = ()=>{
    const { t } = useTranslation();
    const [tornamentId,setTornamentID] = useState<string>('');
    const sortedTornamens = useMemo(()=> Tornaments.sort((a, b) => {
        const nameA = a?.name?.toUpperCase(); 
        const nameB = b?.name?.toUpperCase(); 
        if (nameA && nameB && nameA < nameB) {
          return -1;
        }
        if (nameA && nameB && nameA > nameB) {
          return 1;
        }
        return 0;
      }),[])

    const setTornament =(event:SelectChangeEvent<string>)=>{
        setTornamentID(event.target.value);
    };
    const findDraft =useCallback(()=>{
        window.location.pathname = `/tornaments/${tornamentId}`;
    },[tornamentId]);

  

    return(
        <React.Fragment>
            <MediaQuery minWidth={1224}>

            <Stack direction={"row"} spacing={2} 
            flexWrap="wrap"
            justifyContent="center"
            alignItems="start"
            sx={{paddingTop:"32px"}}
            
            >
          <FormControl sx={{  minWidth: 200 ,maxWidth:"90%"}} size="medium">
            <InputLabel id="tornament-name-select-label">
                {t('tornament-name')}
            </InputLabel>
  <Select
    labelId="tornament-name-select-label"
    id="tornament-name-select"
    value={tornamentId}
    label={t('tornament-name')}
    onChange={setTornament}
  >
    {sortedTornamens.map((tornament,index)=>(
         <MenuItem value={tornament.tournId} key={`tornament-name-${index}`}>{tornament.name}</MenuItem>

    ))}
   
  </Select>
  <FormHelperText>{t('find-by-tornament-helper')}</FormHelperText>
  </FormControl>
            <Button 
            variant="contained"
            size="medium"
            sx={{height:'48px'}}
            onClick={findDraft}
            >{t("find-draft")} </Button>

</Stack>
</MediaQuery>
<MediaQuery maxWidth={1224}>
<Stack direction={"column"} spacing={2} 
            flexWrap="wrap"
            justifyContent="center"
            alignItems="start"
            sx={{paddingTop:"32px"}}
            
            >
          <FormControl sx={{  minWidth: 200 ,maxWidth:"90%"}} size="medium">
            <InputLabel id="tornament-name-select-label">
                {t('tornament-name')}
            </InputLabel>
  <Select
    labelId="tornament-name-select-label"
    id="tornament-name-select"
    value={tornamentId}
    label={t('tornament-name')}
    onChange={setTornament}
  >
    {sortedTornamens.map((tornament,index)=>(
         <MenuItem value={tornament.tournId} key={`tornament-name-${index}`}>{tornament.name}</MenuItem>

    ))}
   
  </Select>
  <FormHelperText>{t('find-by-tornament-helper')}</FormHelperText>
  </FormControl>
            <Button 
            variant="contained"
            size="medium"
            sx={{height:'48px'}}
            onClick={findDraft}
            >{t("find-draft")} </Button>

</Stack>
    </MediaQuery>

            </React.Fragment>
    )
}