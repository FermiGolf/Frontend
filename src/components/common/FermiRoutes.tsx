import React from 'react';

import { TeamSnapshot } from '../layouts/TeamSnapshot';
import { DraftSnapshot } from '../layouts/DraftSnapshot';

import {
  Navigate,
    createBrowserRouter,
  } from "react-router-dom";

import { Rules } from '../layouts/Rules';
import { FindDraftByTornament } from '../layouts/FindDraftByTornament';
import { DraftsByTornament } from '../layouts/DraftsByTornament';
  export const FermiRoutes =  createBrowserRouter([
    {
      path: "*",
      element: <Navigate to="/tournaments" replace />,

    },
    {
      path: "/tournaments",
      element: <FindDraftByTornament />,

    },
    {
      path: "drafts/:draftid",
      element: <DraftSnapshot />,

    },
    {
      path: "drafts/:draftid/teams/:teamname",
      element: <TeamSnapshot />,

    },
    {path:"tournaments/:tornamentId",element:<DraftsByTornament/>},
    {path: "/rules",element:<Rules/>}
  ]);
