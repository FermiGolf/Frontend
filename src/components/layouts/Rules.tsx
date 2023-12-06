import {ScoringBreakdown} from '../common/ScoringBreakdown';
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Breadcrumbs } from '@mui/material';

import Link from "@mui/material/Link";


import Stack from '@mui/material/Stack';

export const Rules = ()=>{
    const { t } = useTranslation();
    return(
        <Grid container spacing={2} >
          {/* <Grid xs={12} sm={12} sx={{ paddingTop:"16px"}}>
          <Breadcrumbs aria-label="breadcrumb">
  <Link
    underline="hover"
    color="inherit"
    href="/"
  >
    Home
  </Link>
  <Typography color="text.primary">{t('rules')}</Typography>
</Breadcrumbs>
</Grid> */}
             <Grid xs={2} sm={3}>
  </Grid>
  <Grid xs={12} sm={5} sx={{ paddingTop:"32px"}}>
  <ScoringBreakdown/>
  </Grid>
        </Grid>

    )
}