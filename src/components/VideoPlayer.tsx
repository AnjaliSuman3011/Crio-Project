import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Maximize2, Volume2, VolumeX } from 'lucide-react';
import { PlaylistVideo } from '../types/playlist';

interface VideoPlayerProps {
  video: PlaylistVideo;
}

const logEvent = (eventName: string, data: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, data);
  }
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [playerState, setPlayerState] = useState<{ player: any | null }>({ player: null });
  const [startTime, setStartTime] = useState<number | null>(null);

  const onReady = (event: any) => {
    setPlayerState({ player: event.target });
  };

  const onStateChange = (event: any) => {
    const state = event.data;
    const currentTime = playerState.player?.getCurrentTime?.() || 0;

    switch (state) {
      case 1: // Playing
        logEvent("video_started", {
          videoId: video.id,
          videoTitle: video.title,
          channelTitle: video.channelTitle,
          playlistName: video.playlistName || 'Unknown',
        });
        setStartTime(Date.now());
        break;

      case 2: // Paused
        logEvent("video_paused", {
          videoId: video.id,
          videoTitle: video.title,
          channelTitle: video.channelTitle,
          playlistName: video.playlistName || 'Unknown',
          pausedAt: currentTime,
        });
        break;

      case 0: // Ended
        logEvent("video_completed", {
          videoId: video.id,
          videoTitle: video.title,
          channelTitle: video.channelTitle,
          playlistName: video.playlistName || 'Unknown',
        });
        break;
    }
  };

  const toggleMute = () => {
    if (playerState.player) {
      if (isMuted) {
        playerState.player.unMute();
        logEvent("video_unmuted", { videoId: video.id });
      } else {
        playerState.player.mute();
        logEvent("video_muted", { videoId: video.id });
      }
      setIsMuted(!isMuted);
    }
  };

  const enterFullscreen = () => {
    if (playerState.player) {
      const iframe = playerState.player.getIframe();
      iframe.requestFullscreen();
      logEvent("fullscreen_clicked", { videoId: video.id });
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1 as const,
      modestbranding: 1 as const,
      rel: 0 as const,
      controls: 0 as const,
      fs: 0 as const,
      enablejsapi: 1 as const,
      origin: window.location.origin,
    },
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (playerState.player && startTime) {
        const endTime = Date.now();
        const watchedSeconds = Math.round((endTime - startTime) / 1000);
        const videoTime = playerState.player.getCurrentTime?.();
        logEvent("video_watch_duration", {
          videoId: video.id,
          videoTitle: video.title,
          channelTitle: video.channelTitle,
          playlistName: video.playlistName || 'Unknown',
          secondsWatched: watchedSeconds,
          lastKnownTimestamp: videoTime,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [video.id, playerState.player, startTime]);

  return (
    <div className="relative h-full flex flex-col">
      <div className="p-4 border-b border-[#B9F5D8] bg-[#004E45] text-white">
        <h2 className="text-lg font-semibold line-clamp-1">{video.title}</h2>
        {video.channelTitle && (
          <p className="text-sm text-[#B9F5D8]">{video.channelTitle}</p>
        )}
      </div>

      <div className="flex-grow relative bg-black">
        <YouTube
          videoId={video.id}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          className="w-full h-full"
          iframeClassName="w-full h-full"
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/70 to-transparent">
          <div>
            <p className="text-white text-sm font-medium truncate max-w-xs">{video.title}</p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={toggleMute}
              className="text-white hover:text-[#B9F5D8] focus:outline-none transition-colors duration-200"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>

            <button
              onClick={enterFullscreen}
              className="text-white hover:text-[#B9F5D8] focus:outline-none transition-colors duration-200"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
