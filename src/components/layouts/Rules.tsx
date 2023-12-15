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

      
  <Stack  direction={'column'} alignItems={'center'} sx={{ paddingTop:"32px"}}>
  <ScoringBreakdown/>
  </Stack>


    )
}