export interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: number;
  channelTitle?: string;
  publishedAt?: string;
}

export interface Playlist {
  id: string;
  name: string;
  videos: PlaylistVideo[];
}