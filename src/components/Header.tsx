import React from 'react';
import { Youtube } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#004E45] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Youtube className="h-6 w-6 mr-2 text-red-500" />
        <h1 className="text-xl font-semibold">YouTube Playlist Manager</h1>
      </div>
    </header>
  );
};
