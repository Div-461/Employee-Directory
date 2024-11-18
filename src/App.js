import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const NotFound = React.lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<React.Suspense><Dashboard /></React.Suspense>} />
        <Route path='*' element={<React.Suspense fallback='Loading...'><NotFound /></React.Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
