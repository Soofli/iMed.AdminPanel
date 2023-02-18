import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import UploadFile from '@comp/dashboard/UploadFile'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const AddFile = () => {
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
        <title>اضافه کردن فایل</title>
        <meta name="description" content="اضافه کردن فایل" />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />
        <UploadFile />
      </div>
    </div>
  )
}

export default AddFile
