
import { InputLabel, Select, MenuItem, SelectChangeEvent, FormControl, FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


import React, {  useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import MediaQuery from "react-responsive";

import { NotificationContext } from "../../contexts/NotificationContext";
import { getTornamentList } from "../../api/getTornamentList";

type Tornament = {
    name:string
}

export const FindDraftByTornament = ()=>{
    const { t } = useTranslation();
    const [tornamentName,setTornamentName] = useState<string>('');
    const [tornamentsLoading,setTornamentsLoading] = useState<boolean>(true);
    const [tornaments,setTornaments] = useState<Array<Tornament>>([]);
    const {setNotification} = useContext(NotificationContext);


    useEffect(()=>{
        getTornamentList().then((tornaments)=>{
  
            setTornaments(tornaments);
          setTornamentsLoading(false);


        }
        ).catch((error)=>{
  
          setTornamentsLoading(false);
          setNotification(oldArray => [...oldArray, {type:"error",message:error.message}]);
  
        });
      },[])



    const setTornament =(event:SelectChangeEvent<string>)=>{
        setTornamentName(event.target.value);
    };
    const findDraft =useCallback(()=>{
        window.location.pathname = `/tornaments/${tornamentName}`;
    },[tornamentName]);



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
    value={tornamentName}
    label={t('tornament-name')}
    onChange={setTornament}
    disabled = {tornamentsLoading || tornaments.length === 0}
  >
    {tornaments.length > 0 && tornaments.map((tornament,index)=>(
         <MenuItem value={tornament.name} key={`tornament-name-${index}`}>{tornament.name}</MenuItem>

    ))}
   
  </Select>
  <FormHelperText>{t('find-by-tornament-helper')}</FormHelperText>
  </FormControl>
            <Button 
            variant="contained"
            size="medium"
            sx={{height:'48px'}}
            onClick={findDraft}
            disabled = {tornamentsLoading || tornaments.length === 0}
            >{t("find-draft")} </Button>

</Stack>
</MediaQuery>
<MediaQuery maxWidth={1224}>
<Stack direction={"column"} spacing={2} 
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            sx={{paddingTop:"32px"}}
            
            >
          <FormControl sx={{  minWidth: 200 ,maxWidth:"90%"}} size="medium">
            <InputLabel id="tornament-name-select-label">
                {t('tornament-name')}
            </InputLabel>
  <Select
    labelId="tornament-name-select-label"
    id="tornament-name-select"
    value={tornamentName}
    label={t('tornament-name')}
    onChange={setTornament}
    disabled = {tornamentsLoading || tornaments.length === 0}
  >
    {tornaments.length > 0 && tornaments.map((tornament,index)=>(
         <MenuItem value={tornament.name} key={`tornament-name-${index}`}>{tornament.name}</MenuItem>

    ))}
   
  </Select>
  <FormHelperText>{t('find-by-tornament-helper')}</FormHelperText>
  </FormControl>
            <Button 
            variant="contained"
            size="medium"
            sx={{height:'48px'}}
            onClick={findDraft}
            disabled = {tornamentsLoading || tornaments.length === 0}
            >{t("find-draft")} </Button>

</Stack>
    </MediaQuery>

            </React.Fragment>
    )
}