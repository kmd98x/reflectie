import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Screen components
import ZeroState from './components/screens/ZeroState';
import Naam from './components/screens/Naam';
import PrivacyBeleid from './components/screens/PrivacyBeleid';
import WaarStaJeNu from './components/screens/WaarStaJeNu';
import Homepage from './components/screens/Homepage';
import Profiel from './components/screens/Profiel';
import Settings from './components/screens/Settings';
import Statement from './components/screens/Statement';
import KomtDitJeBekendVoor from './components/screens/KomtDitJeBekendVoor';
import Patroon from './components/screens/Patroon';
import CoachingVraag from './components/screens/CoachingVraag';
import AfspraakJacqueline from './components/screens/AfspraakJacqueline';
import GoedGedaan from './components/screens/GoedGedaan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ZeroState />} />
        <Route path="/naam" element={<Naam />} />
        <Route path="/privacy" element={<PrivacyBeleid />} />
        <Route path="/waar-sta-je-nu" element={<WaarStaJeNu />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/profiel" element={<Profiel />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/statement/:index" element={<Statement />} />
        <Route path="/komt-dit-je-bekend-voor" element={<KomtDitJeBekendVoor />} />
        <Route path="/patroon" element={<Patroon />} />
        <Route path="/coaching-vraag" element={<CoachingVraag />} />
        <Route path="/afspraak-jacqueline" element={<AfspraakJacqueline />} />
        <Route path="/goed-gedaan" element={<GoedGedaan />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

