import React, { useState, useEffect } from 'react';
import { PlaylistSearch } from './PlaylistSearch';
import { PlaylistContent } from './PlaylistContent';
import { VideoPlayer } from './VideoPlayer';
import { Playlist, PlaylistVideo } from '../types/playlist';

export const PlaylistManager: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<PlaylistVideo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setSelectedVideo(null);
  };

  const handleSelectVideo = (video: PlaylistVideo) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const json = await response.json();

        const mockPlaylists: Playlist[] = [
          {
            id: 'sample',
            name: 'Sample Playlist from API',
            videos: json.slice(0, 1).map((item: any) => ({
              id: 'dQw4w9WgXcQ',
              title: item.title,
              channelTitle: 'Demo Channel',
              thumbnail: '',
              duration: 180,
              publishedAt: new Date().toISOString()
            }))
          }
        ];

        setPlaylists(mockPlaylists);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-[#F4F6F8]">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-gray-600 text-lg">Loading playlist...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Playlist section now on the left */}
          <div className="order-2 lg:order-1 flex flex-col space-y-6">
            <div className="bg-[#B9F5D8] rounded-xl shadow-md p-4">
              <PlaylistSearch 
                playlists={playlists} 
                onSelectPlaylist={handleSelectPlaylist}
                selectedPlaylist={selectedPlaylist}
              />
            </div>
            <div className="bg-white rounded-xl shadow-md flex-grow overflow-hidden">
              <PlaylistContent 
                playlist={selectedPlaylist} 
                onSelectVideo={handleSelectVideo}
                selectedVideo={selectedVideo}
              />
            </div>
          </div>

          {/* Video player now on the right */}
          <div className="order-1 lg:order-2 bg-[#004E45] rounded-xl shadow-md overflow-hidden text-white transition-all duration-300 h-full">
            {selectedVideo ? (
              <VideoPlayer video={selectedVideo} />
            ) : (
              <div className="flex items-center justify-center h-full p-8 text-center text-white">
                <div>
                  <p className="text-xl font-medium mb-2">No video selected</p>
                  <p>Select a playlist and choose a video to play</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
