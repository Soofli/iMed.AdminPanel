import CommentsContent from '@comp/dashboard/CommentsContent'
import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Comments = () => {
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
        <title>نظر ها</title>
        <meta name="description" content="نظر ها" />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />
        <CommentsContent />
      </div>
    </div>
  )
}

export default Comments
