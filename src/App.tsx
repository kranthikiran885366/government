import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import GovernmentSpending from './pages/GovernmentSpending';
import LeaderPerformance from './pages/LeaderPerformance';
import AgriculturePrices from './pages/AgriculturePrices';
import ReportIssues from './pages/ReportIssues';
import SchemeDetails from './pages/SchemeDetails';
import CommunityFeedback from './pages/CommunityFeedback';
import { useStore } from './stores/useStore';
import './styles/animations.css';

const queryClient = new QueryClient();

function App() {
  const { subscribeToUpdates, fetchLeaders, fetchProjects, fetchSpending, 
    fetchAgriculturePrices, fetchIssues, fetchFeedback } = useStore();

  useEffect(() => {
    // Subscribe to real-time updates
    subscribeToUpdates();

    // Initial data fetch
    fetchLeaders();
    fetchProjects();
    fetchSpending();
    fetchAgriculturePrices();
    fetchIssues();
    fetchFeedback();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/spending" element={<GovernmentSpending />} />
            <Route path="/leaders" element={<LeaderPerformance />} />
            <Route path="/agriculture" element={<AgriculturePrices />} />
            <Route path="/report" element={<ReportIssues />} />
            <Route path="/schemes" element={<SchemeDetails />} />
            <Route path="/community" element={<CommunityFeedback />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;