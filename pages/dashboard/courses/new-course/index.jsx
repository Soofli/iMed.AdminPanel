import NewCourseContent from '@comp/dashboard/NewCourseContent'
import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const index = () => {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('token')
      if (!!!item) {
        // router.push('/dashboard')
        router.push('/')
      }
    }
  }, [])
  return (
    <div className="container-fluid">
      <Head>
        <title>دوره جدید</title>
        <meta name="description" content="دوره جدید" />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />
        <NewCourseContent />
      </div>
    </div>
  )
}

export default index
