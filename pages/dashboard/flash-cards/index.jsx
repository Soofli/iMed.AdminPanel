import FlashCardsContent from '@comp/dashboard/FlashCardsContent'
import ChooseCoverImage from '@comp/dashboard/NewCourseContent/Component/ChooseCoverImage'
import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import AppContext from '@ctx/AppContext'
import Head from 'next/head'
import LoaidngOne from 'plugins/Loading'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

const FlashCards = () => {
  const context = useContext(AppContext)
  const dataFlashCardCategory = context.state.dataFlashCardCategory
  const Loading = context.state.Loading
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('token')
      if (!!!item) {
        // router.push('/dashboard')
        router.push('/')
      }
      context.GetFlashCardCategories()
      context.setDataFlashCardSingleCategory([])
    }
  }, [])
  return (
    <div className="container-fluid">
      <Head>
        <title>فلش کارت ها</title>
        <meta name="description" content="دوره ها " />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />

        {Loading ? (
          <LoaidngOne />
        ) : (
          <FlashCardsContent dataFlashCardCategory={dataFlashCardCategory} />
        )}
      </div>
    </div>
  )
}

export default FlashCards
