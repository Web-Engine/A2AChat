import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import './index.css';

// Lazy loading for pages
const ChatPage = lazy(() => import('./pages/chat/ChatPage'));
const AgentListPage = lazy(() => import('./pages/agent/AgentListPage'));
const AgentCreatePage = lazy(() => import('./pages/agent/AgentCreatePage'));
const AgentDetailPage = lazy(() => import('./pages/agent/AgentDetailPage'));
const AgentEditPage = lazy(() => import('./pages/agent/AgentEditPage'));
const AgentRelationshipListPage = lazy(() => import('./pages/agent/relationship/AgentRelationshipListPage'));
const AgentRelationshipCreatePage = lazy(() => import('./pages/agent/relationship/AgentRelationshipCreatePage'));
const AgentRelationshipEditPage = lazy(() => import('./pages/agent/relationship/AgentRelationshipEditPage'));
const ScheduleListPage = lazy(() => import('./pages/schedule/ScheduleListPage'));
const ScheduleCreatePage = lazy(() => import('./pages/schedule/ScheduleCreatePage'));
const ScheduleDetailPage = lazy(() => import('./pages/schedule/ScheduleDetailPage'));
const ScheduleEditPage = lazy(() => import('./pages/schedule/ScheduleEditPage'));
const MCPServerPage = lazy(() => import('./pages/mcp/MCPServerPage'));
const MCPServerDetailPage = lazy(() => import('./pages/mcp/MCPServerDetailPage'));
const MCPInstallPage = lazy(() => import('./pages/mcp/MCPInstallPage'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ChatPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:roomId" element={<ChatPage />} />
            
            <Route path="agents">
              <Route index element={<AgentListPage />} />
              <Route path="new" element={<AgentCreatePage />} />
              <Route path=":id" element={<AgentDetailPage />} />
              <Route path=":id/edit" element={<AgentEditPage />} />
              <Route path="relationship">
                <Route index element={<AgentRelationshipListPage />} />
                <Route path="create" element={<AgentRelationshipCreatePage />} />
                <Route path=":id/edit" element={<AgentRelationshipEditPage />} />
              </Route>
            </Route>
            
            <Route path="schedules">
              <Route index element={<ScheduleListPage />} />
              <Route path="new" element={<ScheduleCreatePage />} />
              <Route path=":id" element={<ScheduleDetailPage />} />
              <Route path=":id/edit" element={<ScheduleEditPage />} />
            </Route>
            
            <Route path="mcp">
              <Route index element={<MCPServerPage />} />
              <Route path="install" element={<MCPInstallPage />} />
              <Route path=":serverId" element={<MCPServerDetailPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App; 