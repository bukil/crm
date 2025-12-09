import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ContentLibrary from './pages/ContentLibrary';
import DesignRationale from './pages/DesignRationale';
import ExternalViewer from './pages/ExternalViewer';
import { FileProvider } from './context/FileContext';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <FileProvider>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="library" element={<ContentLibrary />} />
          <Route path="rationale" element={<DesignRationale />} />
        </Route>

        {/* Standalone routes */}
        <Route path="/share" element={<ExternalViewer />} />

        {/* Redirect for convenience during dev if base path is involved */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FileProvider>
  );
}

export default App;
