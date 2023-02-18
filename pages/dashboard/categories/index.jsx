import React, { useEffect, useState, useContext } from 'react'
import SideBarDashboard from '@comp/dashboard/SideBarDashboard'
import CategoriesContent from '@comp/dashboard/CategoriesContent'
import AppContext from '@ctx/AppContext'
import LoaidngOne from 'plugins/Loading'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Categories = () => {
  const context = useContext(AppContext)
  const dataCategory = context.state.dataCategory
  const Loading = context.state.Loading
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('token')
      if (!!!item) {
        // router.push('/dashboard')
        router.push('/')
      }
      context.GetCategories()
    }
  }, [])
  return (
    <div className="container-fluid">
      <Head>
        <title>دسته بندی ها</title>
        <meta name="description" content="دسته بندی ها" />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />

        {Loading ? (
          <LoaidngOne />
        ) : (
          <CategoriesContent dataCategory={dataCategory} />
        )}
      </div>
    </div>
  )
}

export default Categories
