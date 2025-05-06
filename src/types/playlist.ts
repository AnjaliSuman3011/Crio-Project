// src/types/playlist.ts

export interface PlaylistVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  duration: number; // in seconds
  publishedAt: string;
  playlistName?: string;
}

export interface Playlist {
  id: string;
  name: string;
  videos: PlaylistVideo[];
}
