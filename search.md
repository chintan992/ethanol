import { AnimeCard } from "@/components/anime-card"
import { SearchBar } from "@/components/search-bar"
import { searchAnime } from "@/utils/api"

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q: string }
}) {
  const results = await searchAnime(searchParams.q)

  return (
    <main className="container mx-auto px-4 py-8">
      <SearchBar />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Search Results for &quot;{searchParams.q}&quot;
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.results?.map((anime: any) => (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              title={anime.title.userPreferred || anime.title.english || anime.title.romaji}
              image={anime.image}
              type={anime.type}
              releaseDate={anime.releaseDate}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

