import { AppContent } from './components/AppContext';
import { ClassroomProvider } from './hooks/ClassroomProvider';

function App() {
  return (
    <ClassroomProvider>
      <AppContent />
    </ClassroomProvider>
  );
}

export default App;