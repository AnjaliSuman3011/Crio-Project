import * as XLSX from 'xlsx';
import { Playlist, PlaylistVideo } from '../types/playlist';

const extractVideoId = (url: string): string => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^[a-zA-Z0-9_-]{11}$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  throw new Error(`Invalid YouTube URL or video ID: ${url}`);
};

export const parseSheetData = async (file: File): Promise<Playlist[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const playlists: Playlist[] = [];
        let currentPlaylist: Playlist | null = null;

        rawData.forEach((row: any[], index: number) => {
          if (!row.length || !row[0]) return;

          const firstCell = row[0].toString().trim();

          // Detect playlist header: "Playlist: DSA" or just "DSA"
          const isPlaylistHeader = /^Playlist:|^[A-Z]/.test(firstCell) && !firstCell.startsWith('http');

          if (isPlaylistHeader) {
            const playlistName = firstCell.replace(/^Playlist:/i, '').trim();
            currentPlaylist = {
              id: `playlist-${playlists.length + 1}`,
              name: playlistName,
              videos: []
            };
            playlists.push(currentPlaylist);
          } else if (currentPlaylist) {
            try {
              const videoId = extractVideoId(firstCell);
              const videoTitle = row[1]?.toString().trim() || 'Untitled Video';

              currentPlaylist.videos.push({
                id: videoId,
                title: videoTitle,
                thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
                channelTitle: row[2]?.toString().trim() || '',
                publishedAt: row[3]?.toString().trim() || ''
              });
            } catch (error) {
              console.warn(`Skipping invalid video URL at row ${index + 1}:`, error);
            }
          }
        });

        if (playlists.length === 0) {
          reject(new Error('No valid playlist data found in the file'));
        } else {
          resolve(playlists);
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};
