import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage onLoginClick={() => setCurrentPage('auth')} />
      ) : (
        <AuthScreen onBack={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}

export default App;
