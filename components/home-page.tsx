'use client'

import { useEffect, useState, Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { AnimeCard } from "@/components/anime-card"
import { searchAnime, getTrendingAnime } from "@/utils/api"
import { Loader2 } from 'lucide-react'
import type { AnimeResult } from '@/types/anime'

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<AnimeResult[]>([])
  const [trendingAnime, setTrendingAnime] = useState<AnimeResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Load trending anime on initial page load
    const loadTrendingAnime = async () => {
      const trending = await getTrendingAnime()
      setTrendingAnime(trending)
    }
    loadTrendingAnime()
  }, [])

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setSearchQuery(query)
    if (query.trim()) {
      const results = await searchAnime(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
    setIsLoading(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : searchQuery ? (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Search Results for &quot;{searchQuery}&quot;
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  {...anime}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Trending Anime</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trendingAnime.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  {...anime}
                />
              ))}
            </div>
          </div>
        )}
      </Suspense>
    </main>
  )
}
