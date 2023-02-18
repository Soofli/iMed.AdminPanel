import AppContext from '@ctx/AppContext'
import axios from 'axios'
import LoadingSmall from 'plugins/Loading/LoadingSmall'

import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DeleteHandOutFromUpload from './../../../../../plugins/Modals/DeleteHandOutFromUpload/index'

const UploadHandOut = () => {
  const [StringBaseFile, setStringBaseFile] = useState('')
  const [loadingSmall, setLoadingSmall] = useState(false)

  const context = useContext(AppContext)
  const dataHandOut = context.state.dataHandOut

  const uploadHandOut = (e) => {
    const file = e.target.files[0]
    setStringBaseFile(file)
  }

  const SendHandOutUload = async () => {
    setLoadingSmall(true)

    const formData = new FormData()
    formData.append('file', StringBaseFile)
    for (var pair of formData.entries()) {
    }

    const header = {
      headers: {
        ' Content-Type': 'multipart/form-data',
        Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
      },
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/file/uploadhandout`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
        },
      })
      .then(function () {
        setLoadingSmall(false)

        context.GetHandOut()
        toast.success(' جزوه با موفقیت آپلود شد ', {
          position: 'bottom-right',
          closeOnClick: true,
        })
      })
      .catch(function () {
        setLoadingSmall(false)

        toast.error('  مشکلی وجود داره ', {
          position: 'bottom-right',
          closeOnClick: true,
        })
      })
  }

  useEffect(() => {
    context.GetHandOut()
  }, [])

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-4 mt-4">
          <div className="bg-white border    border-r30 shadow-sm w-100 over-hidden">
            <div className="position-relative">
              <div className="w-100">
                <p className="mb-0 white p-3 font-weight-bold text-center bg-dark">
                  آپلود جزوه
                </p>

                <div className="p-3">
                  <div className="form-group my-3 text-right  ">
                    <label className=" px-2 font-s14">آپلود فایل : </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        uploadHandOut(e)
                      }}
                      accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
                    />

                    <button
                      className="btn btn-success w-100 mb-2 mt-5"
                      onClick={() => SendHandOutUload()}
                    >
                      {' '}
                      {loadingSmall ? <LoadingSmall /> : '    ارسال'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 mb-5">
          <div className="w-fit border-b-2 d-flex pb-2 mt-5 mb-3 ">
            <h1 className="mb-0 font-s16">لیست فایل ها</h1>
          </div>

          {dataHandOut && dataHandOut.length <= 0 ? (
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th className="w-0 text-center"> جزوه وجود ندارد</th>
                </tr>
              </thead>
            </table>
          ) : (
            <div className="table-responsive-sm">
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th className="w-0 text-center">#</th>
                    <th className="w-90 text-center font-s15">لیست جزوات</th>

                    <th className="w-10 text-center font-s15">وضعیت</th>
                  </tr>
                </thead>
                {dataHandOut.map((e, index) => (
                  <>
                    {' '}
                    <tbody className="text-center" key={index}>
                      <tr className="">
                        <th scope="row">{index + 1}</th>
                        <td className="font-s14 ">{e.name}</td>

                        <td className="font-s14">
                          <DeleteHandOutFromUpload name={e.name} />
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadHandOut
