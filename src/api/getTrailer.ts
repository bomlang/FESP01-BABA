import axios from 'axios'

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

type YoutubeSearchItem = {
  id: string
  snippet: {
    title: string
    thumbnails: {
      default: {
        url: string
      }
    }
  }
}

export const getTrailer = async (
  query: string
): Promise<YoutubeSearchItem[]> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${query}&part=snippet&type=video`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.items
  } catch (error) {
    console.error('트레일러를 가져오는 중 오류 발생:', error)
    throw error
  }
}
