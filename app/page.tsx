import ClientPage from '@/components/client-page'
import { getTrendingAnime } from '@/utils/api'

export default async function HomePage() {
  // Fetch initial data on server
  const initialTrending = await getTrendingAnime()
  
  return <ClientPage initialTrending={initialTrending} />
}
