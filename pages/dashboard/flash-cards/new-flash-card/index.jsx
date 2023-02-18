import NewFlashCardContent from '@comp/dashboard/NewFlashCardContent'
import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import AppContext from '@ctx/AppContext'
import Head from 'next/head'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NewFlashCard = () => {
  const context = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('token')
      if (!!!item) {
        // router.push('/dashboard')
        router.push('/')
      }
      context.setCoverCourse(null)
    }
  }, [])

  return (
    <div className="container-fluid">
      <Head>
        <title>فلش کارت جدید</title>
        <meta name="description" content="فلش کارت جدید" />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />
        <NewFlashCardContent />
      </div>
    </div>
  )
}

export default NewFlashCard
