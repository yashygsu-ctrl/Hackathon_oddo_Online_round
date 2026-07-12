import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Fleet from './pages/Fleet';
import Drivers from './pages/Drivers';
import Trips from './pages/Trips';
import Maintenance from './pages/Maintenance';
import Expenses from './pages/Expenses';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import useStore from './store/useStore';
import Layout from './components/Layout';
import { Lock } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useStore(state => state.user);
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full">
          <Lock className="w-16 h-16 text-[#ef4444] mb-4" />
          <h2 className="text-3xl font-bold text-gray-200 mb-2">Encrypted for respective RBAC</h2>
          <p className="text-gray-400">You do not have permission to view this module.</p>
        </div>
      </Layout>
    );
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst']}><Dashboard /></ProtectedRoute>} />
        <Route path="/fleet" element={<ProtectedRoute allowedRoles={['Fleet Manager', 'Dispatcher', 'Financial Analyst']}><Fleet /></ProtectedRoute>} />
        <Route path="/drivers" element={<ProtectedRoute allowedRoles={['Fleet Manager', 'Safety Officer']}><Drivers /></ProtectedRoute>} />
        <Route path="/trips" element={<ProtectedRoute allowedRoles={['Dispatcher', 'Safety Officer']}><Trips /></ProtectedRoute>} />
        <Route path="/maintenance" element={<ProtectedRoute allowedRoles={['Fleet Manager']}><Maintenance /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute allowedRoles={['Financial Analyst']}><Expenses /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute allowedRoles={['Fleet Manager', 'Financial Analyst']}><Analytics /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst']}><Settings /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
