import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import ContentLibrary from './pages/ContentLibrary';
import ExternalViewer from './pages/ExternalViewer';
import { FileProvider } from './context/FileContext';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <FileProvider>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ContentLibrary />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          {/* Add other dashboard routes here in future */}
        </Route>

        {/* Standalone routes */}
        <Route path="/view/:fileId" element={<ExternalViewer />} />

        {/* Redirect for convenience during dev if base path is involved */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FileProvider>
  );
}

export default App;
