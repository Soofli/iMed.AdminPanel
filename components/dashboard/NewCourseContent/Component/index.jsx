import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'
import ChooseCoverImage from './ChooseCoverImage/index'
import ChooseHandout from './ChooseHandout'
import ChooseVideo from './ChooseVideo'

const AddFileCourse = () => {
  const [activeTypeUpload, setActiveTypeUpload] = useState(0)
  return (
    <div className="col-lg-12">
      <div className="w-fit border-b-2 d-flex pb-2 mt-5 mb-3  ">
        <h1 className="mb-0 font-s16">اضافه کردن فایل های دوره</h1>{' '}
      </div>{' '}
      <div className="alert alert-danger text-right font-s14" role="alert">
        نکته مهم : برای افزودن کاور ، ویدئو و جزوه به دوره مورد نظر ، بایدابتدا
        از بخش{' '}
        <Link href="/dashboard/add-file">
          <a className="font-weight-bold"> آپلودفایل </a>
        </Link>{' '}
        فایل های مورد نظر را آپلود و سپس در این بخش به دوره اضافه نمایید.{' '}
      </div>
      <div className="alert alert-danger text-right font-s14" role="alert">
        توجه : برای ساخت دوره ، انتخاب کردن کاور دوره الزامی است.
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex">
            <div
              className={`w-fit   py-2 pointer tr03   px-4 mx-1 border-r50  ${
                activeTypeUpload == 0
                  ? 'white bg-cyan-700 shadow font-weight-bold'
                  : 'hover:bg-stone-800  hover:text-white'
              } `}
              onClick={() => setActiveTypeUpload(0)}
            >
              <p className="mb-0 font-s13 ">کاور دوره</p>
            </div>

            <div
              className={`w-fit   py-2 pointer tr03   px-4 mx-1 border-r50  ${
                activeTypeUpload == 1
                  ? 'white bg-cyan-700 shadow font-weight-bold'
                  : 'hover:bg-stone-800  hover:text-white'
              } `}
              onClick={() => setActiveTypeUpload(1)}
            >
              {' '}
              <p className="mb-0 font-s14 ">ویدئو ها</p>
            </div>

            <div
              className={`w-fit   py-2 pointer tr03   px-4 mx-1 border-r50  ${
                activeTypeUpload == 2
                  ? 'white bg-cyan-700 shadow font-weight-bold'
                  : 'hover:bg-stone-800  hover:text-white'
              } `}
              onClick={() => setActiveTypeUpload(2)}
            >
              {' '}
              <p className="mb-0 font-s13 ">جزوه ها</p>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="row">
            {activeTypeUpload == 0 ? (
              <ChooseCoverImage
                title="کاور مورد نظر برای دوره را انتخاب نمایید
              "
              />
            ) : activeTypeUpload == 1 ? (
              <ChooseVideo />
            ) : activeTypeUpload == 2 ? (
              <ChooseHandout />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFileCourse
