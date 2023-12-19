interface PopularData {
  results: PopularDataItem[]
}

interface PopularDataItem {
  genre_ids: ReactNode
  vote_average: ReactNode
  poster_path: string
  id: number
  title: string
}

interface SearchListProps {
  id: number
  media_type: string
  ganre_ids?: number[]
  title?: string
  name?: string
  poster_path: string | null
}

interface SearchResultProps {
  id: number
  media_type: string
  ganre_ids?: number[]
  title?: string
  name?: string
  poster_path: string | null
}

interface MovieGenres {
  genres: {
    id: number
    name: string
  }[]
}

interface ReviewData {
  map(
    arg0: (item: any) => import('react/jsx-runtime').JSX.Element
  ): React.ReactNode
  [
    movie_id: string,
    user_id: string,
    text: string,
    created_at: string,
    updated_at: string,
    id: number,
    ott: json,
    image_id: number,
    rating: number
  ]
}

interface UserData {
  email: string | undefined
  id: string | undefined
}

interface LikeData {
  created_at: string
  id: number
  img_url: string
  likes: string[]
  movie_id: string
  movie_title: string
  ott: string[]
  rating: number
  text: string
  updated_at: string
  user_id: string
}

interface LikesType {
  user_id: string
  review_id: number
}
interface BookmarkStore {
  bookmarkList: number[]
  setBookmarkList: (itemIds: number[]) => void
  deleteBookmarkList: (itemId: number) => void
}

interface MovieProps {
  id: number
  title: string
  poster_path: string
}
