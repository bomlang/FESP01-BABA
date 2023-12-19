import styled from 'styled-components'
import FeedComponent from '@/components/FeedComponent'
import CategoryComponent from '@/components/CategoryComponent'
import RecommendContentsSection from '@/layout/RecommendContentsSection'
import { useEffect, useState } from 'react'

function Main() {
  const [, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <>
      <MainPageTitle aria-label="메인페이지">메인 페이지</MainPageTitle>
      <Wrapper>
        <CategoryComponent />
        {window.innerWidth < 1030 ? <RecommendContentsSection /> : ''}

        <FeedComponent />
      </Wrapper>
    </>
  )
}

export default Main

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`

const MainPageTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`
