import type { AnimeResult } from '@/types/anime'

const BASE_URL = 'https://consumet-neon.vercel.app';

// ...existing code from api.md...

// Update return types for these functions
export async function searchAnime(query: string): Promise<AnimeResult[]> {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/${query}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
}

export async function getTrendingAnime(): Promise<AnimeResult[]> {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/trending`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return [];
  }
}

export interface AnimeInfo extends AnimeResult {
  description: string;
  episodes: Array<{
    id: string;
    number: number;
  }>;
}

export async function getAnimeInfo(id: string): Promise<AnimeInfo> {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/info/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching anime info:', error);
    throw error;
  }
}

export interface StreamingLinks {
  sources: Array<{
    url: string;
    quality: string;
  }>;
}

export async function getStreamingLinks(episodeId: string, isDub: boolean = false, attempted: boolean = false): Promise<StreamingLinks> {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/watch/${episodeId}${isDub ? '?dub=true' : ''}`);
    const data = await response.json();
    
    // Only attempt fallback once and only if dub was requested
    if (isDub && (!data.sources || data.sources.length === 0) && !attempted) {
      console.warn('Dub not available, falling back to sub');
      return getStreamingLinks(episodeId, false, true);
    }
    
    // If no sources found at all, throw error
    if (!data.sources || data.sources.length === 0) {
      throw new Error(isDub ? 'Dub not available' : 'Sub not available');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching streaming links:', error);
    throw error;
  }
}

// ...existing code from api.md...
