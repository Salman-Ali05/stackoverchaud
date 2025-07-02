import { useContext, useState } from 'react';
import { Building2, BarChart3, Eye, Settings, LogOut } from 'lucide-react';
import { ClassroomContext } from '../hooks/ClassroomContext';
import { Dashboard } from '../components/Dashboard';
import { Scene3D } from '../components/Scene3D';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

export function AppContentPage() {
  const {
    toggleClassroom,
    stats,
    classrooms,
    selectedClassroom,
    setSelectedClassroom
  } = useContext(ClassroomContext);

  const [activeTab, setActiveTab] = useState<'3d' | 'dashboard'>('3d');
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    navigate('/');
    logout();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt='logo' className='w-20' />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === '3d'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Vue 3D</span>
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </div>
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-red-900 transition-colors background-transparent hover:bg-red-50`}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === '3d' ? (
          <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Instructions</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Cliquez sur les salles de classe pour changer leur état (libre/occupé).
                    Utilisez la souris pour naviguer dans la vue 3D.
                  </p>
                </div>
              </div>
            </div>

            {selectedClassroom && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  Salle sélectionnée : {selectedClassroom.name}
                </h2>
                <p className="text-sm text-slate-600">
                  Capacité : {selectedClassroom.capacity} personnes
                </p>
               <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-slate-600">
                  Etat : 
                </span>
                 <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedClassroom.isOccupied
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {selectedClassroom.isOccupied ? 'Occupée' : 'Disponible'}
                </span>
               </div>
                <button
                  onClick={() => {
                    toggleClassroom(selectedClassroom.id);
                    setSelectedClassroom(null);
                  }}
                  disabled={selectedClassroom.isOccupied}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  style={{
                    cursor: selectedClassroom.isOccupied ? 'not-allowed' : 'pointer',
                    opacity: selectedClassroom.isOccupied ? 0.6 : 1
                  }}
                >
                  Reserver la salle
                </button>
              </div>
            )}

            <Scene3D classrooms={classrooms} onToggleClassroom={toggleClassroom} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                  <p className="text-sm text-slate-600">Total</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                  <p className="text-sm text-slate-600">Disponibles</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
                  <p className="text-sm text-slate-600">Occupées</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{stats.occupancyRate}%</p>
                  <p className="text-sm text-slate-600">Occupation</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard classrooms={classrooms} stats={stats} />
        )}
      </main>
    </div>
  );
}
