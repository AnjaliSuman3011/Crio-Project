import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Playlist, PlaylistVideo } from '../types/playlist';
import { formatDuration } from '../utils/formatters';

interface PlaylistContentProps {
  playlist: Playlist | null;
  onSelectVideo: (video: PlaylistVideo) => void;
  selectedVideo: PlaylistVideo | null;
}

export const PlaylistContent: React.FC<PlaylistContentProps> = ({ 
  playlist, 
  onSelectVideo,
  selectedVideo
}) => {
  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center text-gray-500">
        <div>
          <p className="text-xl font-medium mb-2">No playlist selected</p>
          <p>Search and select a playlist to view its content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#B9F5D8]">
        <h2 className="text-lg font-semibold text-[#004E45]">Playlist Content</h2>
        <p className="text-sm text-gray-500">{playlist.videos.length} videos</p>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {playlist.videos.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {playlist.videos.map((video) => (
              <div 
                key={video.id}
                className={`p-3 hover:bg-[#B9F5D8] cursor-pointer transition-colors duration-150 ${
                  selectedVideo?.id === video.id ? 'bg-[#B9F5D8]' : ''
                }`}
                onClick={() => onSelectVideo(video)}
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 relative group">
                    <div className="w-24 h-16 md:w-32 md:h-20 bg-gray-200 rounded overflow-hidden">
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#004E45]">
                          <Play className="h-8 w-8 text-white opacity-50" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                      <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black bg-opacity-70 rounded text-xs text-white">
                        {formatDuration(video.duration)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{video.title}</p>
                    {video.channelTitle && (
                      <p className="mt-1 text-xs text-gray-500">{video.channelTitle}</p>
                    )}
                    {video.publishedAt && (
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            This playlist has no videos
          </div>
        )}
      </div>
    </div>
  );
};
