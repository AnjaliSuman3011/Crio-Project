import React, { useState, useEffect } from 'react';
import { PlaylistSearch } from './PlaylistSearch';
import { PlaylistContent } from './PlaylistContent';
import { VideoPlayer } from './VideoPlayer';
import { Playlist, PlaylistVideo } from '../types/playlist';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const fetchVideoDetails = async (videoIds: string[]): Promise<PlaylistVideo[]> => {
  const url = 'https://www.googleapis.com/youtube/v3/videos';
  const { data } = await axios.get(url, {
    params: {
      part: 'snippet,contentDetails',
      id: videoIds.join(','),
      key: API_KEY,
    },
  });

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    duration: parseYouTubeDuration(item.contentDetails.duration),
    publishedAt: item.snippet.publishedAt,
  }));
};

const parseYouTubeDuration = (isoDuration: string): number => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match?.[1] || '0', 10);
  const minutes = parseInt(match?.[2] || '0', 10);
  const seconds = parseInt(match?.[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
};

export const PlaylistManager: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<PlaylistVideo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadPlaylists = async () => {
      setLoading(true);

      const rawPlaylists = [
        {
          id: 'dev-testing-to-dev-mastery',
          name: 'Developer Transition: Testing to Developer Mastery',
          videos: ['awCL6LGcnLE', '4Py73BESagg', '3Dm-L-y-qLQ', 'TO-EhZr2R40', 'JSKraCKuwoU']
        },
        {
          id: 'fresher-to-full-fledged-developer',
          name: 'Developer Transition: Fresher to Full-Fledged Developer',
          videos: [
            '1RUTJ12S4DY',
        'g5WfP3M7TZs',
        'NkTastmzvBU',
        'PW-ly0xfkzc',
        'vrcmigsgUdI',
        '0JVhFB_O2no',
        'J8CU7w7bcXY',
        '5CSdftluKnM',
        'qAeF6buZAPY',
        'cVlpxwPUi18'
          ]
        },
        {
          id: 'qa-manual-to-auto',
          name: 'QA Transition: Manual to Automation',
          videos: ['LeCCxglhYBE', 'o87ulyZj-yI', '2-X0oJ6sFc0', 'HE9RUN2W0qg', '8a7cX24NUJg']
        },
        {
          id: 'non-it-to-dev',
          name: 'Developer Transition: Non-IT to Developer',
          videos: ['3fAYdlTyPWU',
        '9q-2bstk0yA',
        'Sy12vViOoAk',
        'cyZRLEg0los',
        'gWe2f63sF1k',
        'Xi_G50Ffkfk',
        'jM4ly9JmLwQ',
        '7dqv1Z_Zizs',
        'U6xIwnoX3vQ',
        '52hLt1BY-c0']
        },
        {
          id: 'hike-journey',
          name: 'Navigating your Hike% Journey',
          videos: ['48eiTb-7DaQ', 'VcVnMIf2i_c', '__vSYQdZ9dQ', 'Al4Ih2ddYv8', 'zwHUnAq_VCE']
        },
        {
          id: 'qa-non-it',
          name: 'QA Transition: Non-IT to QA',
          videos: ['BSZY0oNeMfo', 'nYlnH1thoAw', 'dJgk8sFh6EA', 'iK7eOmEV0_Q', 'Kb2JSpcYH7s']
        },
        {
          id: 'qa-breakthrough',
          name: 'QA Transition: Career Breakthrough',
          videos: ['mgdMrPC-mtg', 'WiyrLdj32d0', '6PwUrP7n_Yw', 'ddhB1miqqw8']
        },
        {
          id: 'career-path',
          name: 'Accelerating your Career Path',
          videos: ['xAacKtPrJ3g', 'bC37CholyUo', '_-gW48SJF2M', 'SaIv3kOJBi0', 'HIM0pFZkqqY']
        },
        {
          id: 'student-insights',
          name: 'Launchpad Student Insights',
          videos: [
    'HphnBYS8TOw',
    'K3sfoAtzOH0',
    'tjSrXY7vNxM',
    'riiPMk7J0ZM',
    'lHqYZP7QKwc',
    'ml9Y0mOPtVI',
    'divjSJXSC0s',
    'pd8nMVgslOk',
    'bc0VfUfUwuY',
    'XVXtjehcS2g',
    'xaFHLkNeQIQ',
    'SUcdfiz703o',
    'U8iTf7Y2ZDM',
    '_F3P3CjzwMw',
    '5ZqvOEBvCvk',
    'RHlm8PwcLaU',
    '7N0_b1NXbc0',
    'Q_XAutdVZ0Y',
    'CF06c7xL0Xo',
    'ctwHyesX0tE',
    'fKhyc_D3nsY',
    '942sD_3-qAM',
    'Bmq-S3DvChU']
        },
        {
          id: 'crio-voices',
          name: 'Crio Voices',
          videos: ['7kgneAX1AL8', 'UwyW6wN3QDM', 'D50HUpFZv9o', 'vWKDcNmA9V8', '9f9TASg8KJI']
        },
        {
          id: 'alumni-network',
          name: 'Crio Alumni Network',
          videos: ['sqies9pRtyk', 'I1HW4_cf_BE', 'pJJZvW_3Lsw', '8IywHvFI5SY', 'WZ6vnwPCNLY']
        }
      ];

      try {
        const enrichedPlaylists = await Promise.all(
          rawPlaylists.map(async (pl) => {
            const videoDetails = await fetchVideoDetails(pl.videos);
            return { id: pl.id, name: pl.name, videos: videoDetails };
          })
        );

        setPlaylists(enrichedPlaylists);

        // Automatically select the first playlist and its second video
        if (enrichedPlaylists.length > 0) {
          const firstPlaylist = enrichedPlaylists[0];
          setSelectedPlaylist(firstPlaylist);

          // Select the second video if available
          if (firstPlaylist.videos.length > 1) {
            setSelectedVideo(firstPlaylist.videos[1]);
          }
        }
      } catch (error) {
        console.error("Error loading playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  return (
    
      <div className="max-w-7xl mx-auto p-4 bg-[#F4F6F8]">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-gray-600 text-lg">Loading playlist...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh]">
            
            {/* Playlist section */}
            <div className="order-2 lg:order-1 flex flex-col space-y-6 overflow-y-auto">
              <div className="bg-[#B9F5D8] rounded-xl shadow-md p-4">
                <PlaylistSearch 
                  playlists={playlists} 
                  onSelectPlaylist={setSelectedPlaylist} 
                  selectedPlaylist={selectedPlaylist} 
                />
              </div>
              <div className="bg-white rounded-xl shadow-md flex-grow overflow-y-auto">
                <PlaylistContent 
                  playlist={selectedPlaylist} 
                  onSelectVideo={setSelectedVideo} 
                  selectedVideo={selectedVideo} 
                />
              </div>
            </div>
    
            {/* Video player section */}
            <div className="order-1 lg:order-2 bg-[#004E45] rounded-xl shadow-md overflow-hidden text-white h-full">
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
