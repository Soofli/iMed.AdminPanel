import { faBars, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import user from '../../../public/images/user.png'
import LogOut from 'plugins/Modals/LouOut'

const SideBarDashboard = () => {
  //   if (typeof window === 'undefined') {
  //     global.window = {}
  //   }

  const [screen, setScreen] = useState(false)
  const [loadTime, isLoadTime] = useState(true)

  const handleLogOut = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  useEffect(() => {
    if (loadTime) {
      isLoadTime(false)
      window.addEventListener('resize', handleResize)
      if (window.innerWidth <= 992) setScreen(true)
    }
  })

  const handleResize = () => {
    if (window.innerWidth <= 992) {
      setScreen(true)
    } else {
      setScreen(false)
    }
  }
  const [sidebar, setSidebar] = useState(false)

  return (
    <div
      className={` px-0 z-[1000] ${
        screen == true
          ? `${sidebar ? 'w-200-px left-0' : 'w-0-px'} position-fixed top-0`
          : 'col-lg-2 w-100  '
      }`}
      style={{ left: '0', transition: '.2s' }}
    >
      <div
        className={`position-fixed  ${screen ? ' d-block ' : 'd-none'}`}
        style={{
          left: '20px',
          top: '30px',
          zIndex: '-1',
        }}
      >
        <div
          className=" bg-secondary border-r20 "
          onClick={() => setSidebar(true)}
        >
          <p className="white p-2 mb-0">
            <FontAwesomeIcon icon={faBars} className="mx-2" />
            داشبورد
          </p>
        </div>
      </div>
      <div
        className="bg-slate-200 text-center fixed w-200-px "
        style={{ height: '100vh' }}
      >
        <div className={screen ? (sidebar ? '' : 'hidden') : ''}>
          <div
            className={`absolute text-left ml-4 ${
              screen ? ' d-block ' : 'd-none'
            }`}
            style={{ left: '0', top: '0' }}
            onClick={() => setSidebar(false)}
          >
            <FontAwesomeIcon
              className="font-s30 pt-3"
              icon={faArrowCircleRight}
            />
          </div>{' '}
          <div className="bg-white shadow p-3 text-center d-flex justify-content-center rounded-b-full">
            <div>
              <div className="w-80-px">
                <Image src={user} layout="" alt="" />
              </div>
              <p className="mb-0 font-weight-bold font-s13 my-2">قاسم محمدی</p>
              <p className="badge bg-dark white border-r30 font-s10  py-2 px-3 ">
                سوپر ادمین
              </p>
            </div>
          </div>
        </div>

        <div className=" p-2  over-auto-y">
          <ul className="list-style-none p-0">
            <li className=" list-style-slide-active ">
              <Link href="/dashboard">
                <a className="no-underline black block w-100 p-[7px] ">
                  {' '}
                  صفحه اصلی
                </a>
              </Link>
            </li>
            <li className="list-style-slide">
              <Link href="/dashboard/categories">
                <a className="no-underline black block w-100 p-[7px] ">
                  {' '}
                  دسته بندی ها
                </a>
              </Link>
            </li>

            <li className="list-style-slide">
              <Link href="/dashboard/courses">
                <a className="no-underline black block w-100 p-[7px] ">
                  {' '}
                  دوره ها
                </a>
              </Link>
            </li>

            <li className="list-style-slide">
              <Link href="/dashboard/flash-cards">
                <a className="no-underline black block w-100 p-[7px] ">
                  {' '}
                  فلش کارت ها{' '}
                </a>
              </Link>
            </li>

            <li className="list-style-slide">
              <Link href="/dashboard/add-file">
                <a className="no-underline black block w-100 p-[7px] ">
                  آپلود فایل
                </a>
              </Link>
            </li>

            <li className="list-style-slide">
              <Link href="/dashboard/members">
                <a className="no-underline black block w-100 p-[7px] ">
                  {' '}
                  کاربران
                </a>
              </Link>
            </li>

            <li className="list-style-slide">
              <Link href="/dashboard/sales">
                <a className="no-underline black block w-100 p-[7px] ">
                  {' '}
                  فروش ها
                </a>
              </Link>
            </li>
            <li className="list-style-slide">
              <Link href="/dashboard/comments">
                <a className="no-underline black block w-100 p-[7px] ">
                  {' '}
                  نظرات
                </a>
              </Link>
            </li>

            <LogOut />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBarDashboard
