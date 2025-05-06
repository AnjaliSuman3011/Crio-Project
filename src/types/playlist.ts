export interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: number;
  channelTitle?: string;
  publishedAt?: string;
}

export interface PlaylistVideo {
  id: string;
  title: string;
  channelTitle?: string;
  thumbnail?: string;
  duration?: number;
  publishedAt?: string;
  playlistName?: string;
}
