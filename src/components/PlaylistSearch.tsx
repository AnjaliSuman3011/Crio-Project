import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Music } from 'lucide-react';
import { Playlist } from '../types/playlist';

interface PlaylistSearchProps {
  playlists: Playlist[];
  onSelectPlaylist: (playlist: Playlist) => void;
  selectedPlaylist: Playlist | null;
}

export const PlaylistSearch: React.FC<PlaylistSearchProps> = ({ 
  playlists, 
  onSelectPlaylist,
  selectedPlaylist
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPlaylists(playlists);
    } else {
      const filtered = playlists.filter(playlist => 
        playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlaylists(filtered);
    }

    if (searchTerm.trim() !== '') {
      setIsOpen(true);
    }
  }, [searchTerm, playlists]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectPlaylist = (playlist: Playlist) => {
    onSelectPlaylist(playlist);
    setSearchTerm('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#004E45] focus:border-[#004E45] sm:text-sm transition duration-150 ease-in-out"
          placeholder="Search playlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={clearSearch}
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className={`px-4 py-2 flex items-center hover:bg-[#B9F5D8] cursor-pointer transition-colors duration-150 ${
                  selectedPlaylist?.id === playlist.id ? 'bg-[#B9F5D8]' : ''
                }`}
                onClick={() => handleSelectPlaylist(playlist)}
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#004E45] flex items-center justify-center">
                  <Music className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{playlist.name}</p>
                  <p className="text-xs text-gray-500">{playlist.videos.length} videos</p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No playlists found</div>
          )}
        </div>
      )}
      
      {selectedPlaylist && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">Selected Playlist:</h3>
          <div className="mt-1 flex items-center">
            <div className="h-10 w-10 rounded-md bg-[#004E45] flex items-center justify-center">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-base font-medium">{selectedPlaylist.name}</p>
              <p className="text-sm text-gray-500">{selectedPlaylist.videos.length} videos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
