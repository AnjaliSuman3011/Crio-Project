import React from 'react';
import { PlaylistManager } from './components/PlaylistManager';
import { Header } from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-6">
        <PlaylistManager />
      </main>
    </div>
  );
}

export default App;