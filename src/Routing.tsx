import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from 'pages/Dashboard';
import { Landing } from 'pages/Landing';
import { routes } from 'constants/routes';
import { Project } from 'pages/Project';
import { Listing } from 'pages/Listing';
import { WalletSwaps } from 'pages/WalletSwaps';

export const Routing: React.FC = () => (
  <Routes>
    <Route path={routes.HOME} element={<Landing />} />
    <Route path={routes.DASHBOARD} element={<Dashboard />} />
    <Route path={routes.PROJECT()} element={<Project />} />
    <Route path={routes.LISTING} element={<Listing />} />
    <Route path={routes.WALLET} element={<WalletSwaps />} />
  </Routes>
);
