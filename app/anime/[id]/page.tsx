'use client'

import { useEffect, useState, useCallback, use } from "react"
import { getAnimeInfo, getStreamingLinks, type AnimeInfo } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

export default function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo | null>(null)
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null)
  const [streamingUrl, setStreamingUrl] = useState<string | null>(null)
  const [isDub, setIsDub] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAnimeInfo = async () => {
      const info = await getAnimeInfo(id)
      setAnimeInfo(info)
    }
    fetchAnimeInfo()
  }, [id])

  const handleEpisodeSelect = useCallback(async (episodeId: string) => {
    setIsLoading(true)
    setStreamingUrl(null)
    setSelectedEpisode(episodeId)
    try {
      const links = await getStreamingLinks(episodeId, isDub)
      if (!links.sources?.length) {
        throw new Error(isDub ? 'Dub not available' : 'Sub not available')
      }
      setStreamingUrl(links.sources[0]?.url || null)
    } catch (error) {
      console.error('Error fetching streaming links:', error)
      alert(error instanceof Error ? error.message : 'Failed to load video')
      if (isDub) {
        setIsDub(false)
      }
    }
    setIsLoading(false)
  }, [isDub])

  useEffect(() => {
    if (selectedEpisode) {
      handleEpisodeSelect(selectedEpisode)
    }
  }, [isDub, selectedEpisode, handleEpisodeSelect])

  if (!animeInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[300px,1fr] gap-8">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={animeInfo.image}
            alt={animeInfo.title.userPreferred}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{animeInfo.title.userPreferred}</h1>
          <p className="text-gray-400 mb-4">{animeInfo.description}</p>
          
          <div className="flex gap-4 mb-6">
            <Button
              variant={isDub ? "outline" : "default"}
              onClick={() => setIsDub(false)}
              disabled={isLoading}
            >
              Sub
            </Button>
            <Button
              variant={isDub ? "default" : "outline"}
              onClick={() => setIsDub(true)}
              disabled={isLoading}
            >
              Dub
            </Button>
          </div>

          {selectedEpisode && (
            <div className="mb-8">
              {isLoading ? (
                <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : streamingUrl ? (
                <video
                  key={streamingUrl}
                  controls
                  className="w-full aspect-video bg-black rounded-lg"
                  src={streamingUrl || undefined}
                />
              ) : (
                <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Select an episode to watch</p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {animeInfo.episodes?.map((episode) => (
              <Button
                key={episode.id}
                variant={selectedEpisode === episode.id ? "default" : "outline"}
                className="w-full"
                onClick={() => handleEpisodeSelect(episode.id)}
                disabled={isLoading}
              >
                {episode.number}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
