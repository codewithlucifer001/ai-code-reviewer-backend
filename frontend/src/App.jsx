import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage';
import WorkspaceApp from './WorkspaceApp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Core Workspace Application Route */}
        <Route
          path="/app"
          element={
            <>
              <SignedIn>
                <WorkspaceApp />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl="/app" />
              </SignedOut>
            </>
          }
        />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}