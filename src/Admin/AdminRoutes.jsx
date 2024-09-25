import React from 'react'
import { Routes, Route } from 'react-router'
import { AdminPage, User, EditUser, Candidates, EditCandidates, ElectorialMatrixes, UserFeedback,VotingDurationSetting } from './AdminPage'
import { ErrorPage } from '@/pages'
import UserPage from './AdminPage/user/UserPage'
const AdminRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/edit/:id" element={<EditUser />} />
        <Route path="/candidate" element={<Candidates />} />
        <Route path="/candidate/edit/:id" element={<EditCandidates />} />
        <Route path="/electorial-matrix" element={<ElectorialMatrixes />} />
        <Route path="/feedback" element={<UserFeedback />} />
        <Route path="/voting-duration" element={<VotingDurationSetting />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
  )
}

export default AdminRoutes