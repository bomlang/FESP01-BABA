import { MovieInfo } from '@/types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingSpinner } from './SearchPage'
import DetailReview from '@/components/DetailReview'
import loadingSpinner from '@/assets/spinner/popcornLoding.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { findMovieDirector, getDetailData } from '@/api/tmdbDetailData'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { getReviewData, getReviewDataWithUserInfo } from '@/api/getReviewData'

function Detail() {
  const { id: movieID } = useParams()

  const [reviewData, setReviewData] = useState<any[] | null>(null)
  const [nicknames, setNicknames] = useState<any[] | null | undefined>(null)
  const [movieinfoData, setMovieInfoData] = useState<MovieInfo | null>(null)
  const [movieCreditData, setMovieCreditData] = useState<string | undefined>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getMovieInfoData = async () => {
      try {
        const response = await getDetailData(movieID as string)
        const director = await findMovieDirector(movieID as string)

        if (response) {
          const data = response.data
          setMovieInfoData(data)
          setMovieCreditData(director)
        }
      } catch (error) {
        console.error(
          `상세정보 데이터를 가져오는데 실패하였습니다...🥲: ${error}`
        )
      }
    }

    getMovieInfoData()
  }, [movieID])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await getReviewData()
        const nicknameData = await getReviewDataWithUserInfo()
        setReviewData(data)
        setNicknames(nicknameData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner src={loadingSpinner} alt="로딩 중..." />
      ) : (
        <>
          <DetailDivWrapper>
            <DetailH2>{movieinfoData?.title}</DetailH2>
            <StarDiv>
              <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
              <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
              <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
              <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                style={{ color: '#FFC61A', stroke: 'black' }}
              />
              <span>4.5</span>
            </StarDiv>

            <Img
              src={`https://image.tmdb.org/t/p/original${movieinfoData?.poster_path}`}
              alt={`${movieinfoData?.title} 포스터`}
              width="100%"
              height="100%"
              object-fit="cover"
            ></Img>

            <Wrapper>
              <MovieInfoDiv>
                <CertificationDiv>15</CertificationDiv>
                <span>|</span>
                {movieinfoData?.release_date}
                <span>|</span>
                {movieinfoData?.genres.map((item, index, array) => (
                  <GenreWrapper key={item.id}>
                    {item.name}
                    {index < array.length - 1 && <div>&middot;</div>}
                  </GenreWrapper>
                ))}
                <span>|</span>
                {movieinfoData?.runtime}분
              </MovieInfoDiv>
              <DirectorInfoDiv>
                <DirectorDiv>
                  감독
                  <span>|</span>
                </DirectorDiv>
                {movieCreditData}
              </DirectorInfoDiv>
            </Wrapper>
          </DetailDivWrapper>

          <Wrapper>
            {reviewData?.map(reviewItem => {
              const matchingNicknames = nicknames
                ?.filter(n => n.user_email === reviewItem.user_id)
                .map(n => n.nickname)

              return (
                <DetailReview
                  key={reviewItem.user_id} // 고유한 식별자로 사용하는 값으로 지정
                  nickname={matchingNicknames?.[0] || 'Default Nickname'} // 배열이 아닌 경우 첫 번째 값을 사용하거나 기본값 지정
                  rating={reviewItem.rating}
                  text={reviewItem.text}
                />
              )
            })}
          </Wrapper>
        </>
      )}
    </Container>
  )
}

export default Detail

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 700px) {
    margin-bottom: 90px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding-bottom: 10px;
`

const DetailDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`

const DetailH2 = styled.h2`
  font-size: 26px;

  text-align: start;
`

const StarDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-self: start;
  margin: 9px;
  gap: 5px;
`

const Img = styled.img`
  width: 100%;
  height: 320px;
  margin: 10px;
  border-radius: 5px;
`

const MovieInfoDiv = styled.div`
  display: flex;
  justify-self: start;
  align-items: center;
  width: 100%;
  gap: 5px;
  padding: 10px 10px 0 0;
`

const CertificationDiv = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 2px;
`

const DirectorInfoDiv = styled.div`
  display: flex;
  justify-self: start;
  align-items: center;
  gap: 5px;
  width: 100%;
`

const DirectorDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  color: #777;
`

const GenreWrapper = styled.div`
  display: flex;
  gap: 4px;
`
