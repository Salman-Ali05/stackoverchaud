import { AppContentPage } from './page/AppContentPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClassroomProvider } from './hooks/ClassroomProvider';
import { LandingPage } from './page/LandingPage';

function App() {
  return (
    <ClassroomProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<AppContentPage />} />
        </Routes>
      </Router>
    </ClassroomProvider>
  );
}

export default App;