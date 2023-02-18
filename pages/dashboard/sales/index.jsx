import SalesContent from '@comp/dashboard/SalesContent'
import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Sales = () => {
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
        <title>فروش</title>
        <meta name="description" content="فروش" />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />
        <SalesContent />
      </div>
    </div>
  )
}

export default Sales
