import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { DraftFermiLeaderboard } from "../DraftFermiLeaderboard";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";


export const DraftSnapshot = ()=>{
  const params= useParams();
    return(
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} sx={{ paddingTop:"16px"}}>
          <Breadcrumbs aria-label="breadcrumb">
  <Link
    underline="hover"
    color="inherit"
    href="/"
  >
    Home
  </Link>
  <Typography color="text.primary">Draft-{params.draftid}</Typography>
</Breadcrumbs>
</Grid>
             <Grid xs={4} sm={4}>
  </Grid>
  <Grid xs={12} sm={3}>
    <DraftFermiLeaderboard/>
  </Grid>
        </Grid>
    )
}