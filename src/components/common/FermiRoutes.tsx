import React from 'react';

import { TeamSnapshot } from '../layouts/TeamSnapshot';
import { DraftSnapshot } from '../layouts/DraftSnapshot';
import { PathNotFound } from '../layouts/PathNotFound';
import {
  Navigate,
    createBrowserRouter,
  } from "react-router-dom";
import { NoDraftFound } from '../layouts/NoDraftFound';
import { Rules } from '../layouts/Rules';
  export const FermiRoutes =  createBrowserRouter([
    {
      path: "*",
      element: <Navigate to="/drafts" replace />,

    },
    {
      path: "/drafts",
      element: <NoDraftFound />,

    },
    {
      path: "drafts/:draftid",
      element: <DraftSnapshot />,

    },
    {
      path: "drafts/:draftid/teams/:teamname",
      element: <TeamSnapshot />,

    },
    { path: "*", element: <PathNotFound /> },
    {path: "/rules",element:<Rules/>}
  ]);
