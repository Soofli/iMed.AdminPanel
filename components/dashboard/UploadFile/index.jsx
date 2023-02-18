import React, { useState } from 'react'
import UploadCoverImage from './Component/UploadCoverImage'
import UploadVideo from './Component/UploadVideo'
import UploadHandOut from './Component/UploadHandOut/index'

const UploadFile = () => {
  const [activeTypeUpload, setActiveTypeUpload] = useState(0)

  return (
    <div className="col-lg-9 mt-[100px]">
      <div className="w-fit border-b-2 d-flex pb-2 mb-4 ">
        <h1 className="mb-0 font-s16">آپلود فایل ها</h1>
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
              <p className="mb-0 font-s13 ">کاور </p>
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
              <p className="mb-0 font-s13 ">ویدئو</p>
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
              <p className="mb-0 font-s13 ">جزوه </p>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="row">
            {activeTypeUpload == 0 ? (
              <UploadCoverImage />
            ) : activeTypeUpload == 1 ? (
              <UploadVideo />
            ) : activeTypeUpload == 2 ? (
              <UploadHandOut />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadFile
