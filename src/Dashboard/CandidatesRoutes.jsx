import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { PresidentialElection } from './PresidentialElection';
import { PresidentialCandidates } from './PresidentialCandidates';
import { SuccessfullyVoted } from './SuccessfullyVoted';
import { Dashboard } from './Dashboard';
import { VicePresidentialElection } from './VicePresidentialElection';
import { Profile } from './UserProfile';
import { ErrorPage } from '@/pages';
export const CandidatesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/my-profile" element={<Profile />} />
      <Route path="/presidential-election" element={<PresidentialElection />} />
      <Route
        path="/presidential-election/:candidateId"
        element={<PresidentialCandidates />}
      />
      <Route
        path="/presidential-election/:candidateId/successfully-voted"
        element={<SuccessfullyVoted />}
      />
      <Route
        path="/vice-presidential-eleciton"
        element={<VicePresidentialElection />}
      />
      <Route
        path="/vice-presidential-eleciton/:candidateId"
        element={<PresidentialCandidates />}
      />
      <Route
        path="/vice-presidential-eleciton/:candidateId/successfully-voted"
        element={<SuccessfullyVoted />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default CandidatesRoutes;
