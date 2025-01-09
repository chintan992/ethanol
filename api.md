const BASE_URL = 'https://consumet-neon.vercel.app';

export async function searchAnime(query: string) {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/${query}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
}

export async function getAnimeInfo(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/info/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching anime info:', error);
    throw error;
  }
}

export async function getStreamingLinks(episodeId: string, isDub: boolean = false) {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/watch/${episodeId}${isDub ? '?dub=true' : ''}`);
    const data = await response.json();
    
    if (isDub && (!data.sources || data.sources.length === 0)) {
      console.warn('Dub not available, falling back to sub');
      return getStreamingLinks(episodeId, false);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching streaming links:', error);
    throw error;
  }
}

export async function getTrendingAnime() {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/trending`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return [];
  }
}

export async function getPopularAnime() {
  try {
    const response = await fetch(`${BASE_URL}/meta/anilist/popular`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular anime:', error);
    return [];
  }
}

