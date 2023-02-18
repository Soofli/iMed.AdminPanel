import ContentDashboard from '@comp/dashboard/ContentDashboard'
import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Dashboard = () => {
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
      <div className="row rtl ">
        <SideBarDashboard />
        <ContentDashboard />
      </div>
    </div>
  )
}

export default Dashboard
