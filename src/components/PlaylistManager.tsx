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
    setLoading(true);

    const playlistsData: Playlist[] = [
      {
        id: 'dev-testing-to-dev-mastery',
        name: 'Developer Transition: Testing to Developer Mastery',
        videos: [
          'awCL6LGcnLE', '4Py73BESagg', '3Dm-L-y-qLQ', 'TO-EhZr2R40', 'JSKraCKuwoU'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'dev-fresher-to-full',
        name: 'Developer Transition: Fresher to Full-Fledged Developer',
        videos: [
          '1RUTJ12S4DY', 'g5WfP3M7TZs', 'NkTastmzvBU', 'PW-ly0xfkzc', 'vrcmigsgUdI'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'non-it-to-dev',
        name: 'Developer Transition: Non-IT to Developer',
        videos: [
          '3fAYdlTyPWU', '9q-2bstk0yA', 'Sy12vViOoAk', 'cyZRLEg0los', 'gWe2f63sF1k'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'hike-journey',
        name: 'Navigating your Hike% Journey',
        videos: [
          '48eiTb-7DaQ', 'VcVnMIf2i_c', '__vSYQdZ9dQ', 'Al4Ih2ddYv8', 'zwHUnAq_VCE'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'qa-manual-to-auto',
        name: 'QA Transition: Manual to Automation',
        videos: [
          'LeCCxglhYBE', 'o87ulyZj-yI', '2-X0oJ6sFc0', 'HE9RUN2W0qg', '8a7cX24NUJg'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'qa-non-it',
        name: 'QA Transition: Non-IT to QA',
        videos: [
          'BSZY0oNeMfo', 'nYlnH1thoAw', 'dJgk8sFh6EA', 'iK7eOmEV0_Q', 'Kb2JSpcYH7s'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'qa-breakthrough',
        name: 'QA Transition: Career Breakthrough',
        videos: [
          'mgdMrPC-mtg', 'WiyrLdj32d0', '6PwUrP7n_Yw', 'ddhB1miqqw8', ''
        ].filter(Boolean).map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'career-path',
        name: 'Accelerating your Career Path',
        videos: [
          'xAacKtPrJ3g', 'bC37CholyUo', '_-gW48SJF2M', 'SaIv3kOJBi0', 'HIM0pFZkqqY'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'student-insights',
        name: 'Launchpad Student Insights',
        videos: [
          'ck5d1SlWTAY', 'HphnBYS8TOw', 'K3sfoAtzOH0', 'tjSrXY7vNxM', 'riiPMk7J0ZM'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'crio-voices',
        name: 'Crio Voices',
        videos: [
          '7kgneAX1AL8', 'UwyW6wN3QDM', 'D50HUpFZv9o', 'vWKDcNmA9V8', '9f9TASg8KJI'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      },
      {
        id: 'alumni-network',
        name: 'Crio Alumni Network',
        videos: [
          'sqies9pRtyk', 'I1HW4_cf_BE', 'pJJZvW_3Lsw', '8IywHvFI5SY', 'WZ6vnwPCNLY'
        ].map((id, idx) => ({
          id,
          title: `Video ${idx + 1}`,
          channelTitle: '',
          thumbnail: '',
          duration: 0,
          publishedAt: ''
        }))
      }
    ];

    setPlaylists(playlistsData);
    setLoading(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-[#F4F6F8]">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-gray-600 text-lg">Loading playlist...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
