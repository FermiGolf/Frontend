import React, { useContext, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


import { useTranslation } from 'react-i18next';
import { DraftContext } from '../../contexts/DraftContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import MediaQuery from 'react-responsive';



export const TopAppBar = ()=>{
  const { t } = useTranslation();
  const {refreshTime} = useContext(DraftContext);
  const minsFromNow = useMemo(()=>Math.round(((new Date().getTime()-refreshTime)/1000)/60),[refreshTime]);
    return (
        <AppBar position="sticky" color={'inherit'}>
        <Toolbar >
        
        <Stack direction="row" sx={{justifyContent:'space-between',width:'100%',alignItems:'center'}}>
        <MediaQuery minWidth={1224}>
          
        <Stack direction="row" sx={{alignItems:'center'}}>
        <GolfCourseIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{

            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {t('app-title')}
        </Typography>
       
        <Button 
         href="/rules"
        variant="text"
        size="large"
        sx={{

          color: 'inherit',
          display: { xs: 'none', md: 'flex' }
        }}
        >{t('rules-title')}</Button>
        </Stack>


        </MediaQuery>
        <MediaQuery maxWidth={1224}>
        <Stack direction="row" sx={{alignItems:'center'}}>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {t('sm-screen-app-title')}
        </Typography>

        </Stack>
        </MediaQuery>

       
        
        {refreshTime !==0 && <Stack direction="row" spacing={1}>
          <AccessTimeIcon color={"inherit"} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="subtitle2"
          noWrap
          color={"text.secondary"}
        >
          {t('data-last-updated-at',{numberOfMin:minsFromNow})}
        </Typography>
        </Stack>}
        </Stack>
        </Toolbar>
      </AppBar>
    )
}