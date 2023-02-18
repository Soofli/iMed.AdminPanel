import React from 'react'
import Image from 'next/image'
import logo from '../../../public/images/logo.png'

const ContentDashboard = () => {
  return (
    <div className="col-lg-9 mt-[100px]">
      <h1 className="text-center font-s25 font-bold">
        {' '}
        به پنل مدیریت آی مد خوش آمدید
      </h1>
      <div className="flex justify-center">
        <div className="w-300-px">
          <Image src={logo} Layout="responsive" alt="" />
        </div>
      </div>
    </div>
  )
}

export default ContentDashboard
