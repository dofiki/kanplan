import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProjectSelectionPage from '../pages/ProjectSelectionPage';
import OnboardingPage from '../pages/OnboardingPage';
import AddTaskPage from '../pages/AddTaskPage';
import StatusPage from '../pages/StatusPage';
import KanBanPage from '../pages/KanBanPage.jsx';
import NotFoundPage from '../pages/NotFoundPage';

 function PageRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KanBanPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/projects" element={<ProjectSelectionPage />} />
        <Route path="/tasks" element={<AddTaskPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default PageRouter;
