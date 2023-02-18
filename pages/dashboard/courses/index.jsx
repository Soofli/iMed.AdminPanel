import CoursesContent from '@comp/dashboard/CoursesContent'
import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import AppContext from '@ctx/AppContext'
import Head from 'next/head'
import LoaidngOne from 'plugins/Loading'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

const Courses = () => {
  const context = useContext(AppContext)
  const dataCourses = context.state.dataCourses
  const Loading = context.state.Loading
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('token')
      if (!!!item) {
        // router.push('/dashboard')
        router.push('/')
      }
      context.GetCourses()
    }
  }, [])

  return (
    <div className="container-fluid">
      <Head>
        <title> دوره ها </title>
        <meta name="description" content="دوره ها " />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />

        {Loading ? (
          <LoaidngOne />
        ) : (
          <CoursesContent dataCourses={dataCourses} />
        )}
      </div>
    </div>
  )
}

export default Courses
