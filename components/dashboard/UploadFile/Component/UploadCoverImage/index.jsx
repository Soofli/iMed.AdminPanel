import AppContext from '@ctx/AppContext'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Chapar from 'plugins/Chapar'
import DeleteImageFromUpload from 'plugins/Modals/DeleteImageFromUpload'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import test from '../../../../../public/images/1.jpg'
import LoadingSmall from 'plugins/Loading/LoadingSmall'

const UploadCoverImage = () => {
  const [StringBaseFile, setStringBaseFile] = useState('')
  const [FileName, setFileName] = useState('')
  const [FileType, setFileType] = useState('')
  const [loadingSmall, setLoadingSmall] = useState(false)

  const context = useContext(AppContext)
  const dataImage = context.state.dataImage

  const uploadImage = async (e) => {
    setFileType(e.target.files[0].type.split('/').pop())

    const file = e.target.files[0]
    const base64 = await convertBase64(file)

    setStringBaseFile(base64.split(',')[1])
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const body = {
    StringBaseFile,
    FileName: FileName + '.' + FileType,
  }

  const handeUploadImg = async () => {
    setLoadingSmall(true)
    try {
      const data = await Chapar.post(
        `${process.env.NEXT_PUBLIC_API_URL}/file/uploadimage`,
        JSON.stringify(body),
      )

      setLoadingSmall(false)
      toast.success('  کاور با موفقیت آپلود شد ', {
        position: 'bottom-right',
        closeOnClick: true,
      })

      context.GetImages()
      // setNewCategoryValue('')
    } catch ({ error, status }) {
      setLoadingSmall(false)

      toast.error('  مشکلی وجود داره ', {
        position: 'bottom-right',
        closeOnClick: true,
      })
    }
  }

  useEffect(() => {
    context.GetImages()
  }, [])

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-4 mt-4">
          <div className="bg-white border    border-r30 shadow-sm w-100 over-hidden">
            <div className="position-relative">
              <div className="w-100">
                <p className="mb-0 white p-3 font-weight-bold text-center bg-dark">
                  آپلود عکس
                </p>

                <div className="p-3">
                  <div className="form-group my-3 text-right  ">
                    <label className=" px-2 font-s14">آپلود فایل : </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        uploadImage(e)
                      }}
                    />

                    <div className="form-group text-right my-4">
                      <label className=" px-2 font-s14"> نام کاور :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={(e) => setFileName(e.target.value)}
                      />
                    </div>
                    <button
                      className={`btn btn-success w-100 mb-2 mt-2 ${
                        StringBaseFile.length <= 0 || FileName <= 0
                          ? 'fuck-cick disabled'
                          : ''
                      }`}
                      onClick={() => handeUploadImg()}
                    >
                      {' '}
                      {loadingSmall ? <LoadingSmall /> : '    ارسال'}
                    </button>

                    <small className="text-right darkgrey font-s10">
                      اندازه عکس ها باید مثل نمونه دیفالت باشد
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8  mb-5">
          <div className="w-fit border-b-2 d-flex pb-2 mt-5 mb-3 ">
            <h1 className="mb-0 font-s16">لیست فایل ها</h1>
          </div>

          {dataImage && dataImage.length <= 0 ? (
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th className="w-0 text-center"> عکسی وجود ندارد</th>
                </tr>
              </thead>
            </table>
          ) : (
            <div className="table-responsive-sm">
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th className="w-0 text-center">#</th>
                    <th className="w-90 text-center font-s15">لیست کاورها</th>

                    <th className="w-10 text-center font-s15">وضعیت</th>
                  </tr>
                </thead>
                {dataImage.map((e, index) => (
                  <>
                    {' '}
                    <tbody className="text-center" key={index}>
                      <tr className="">
                        <th scope="row">{index + 1}</th>
                        <td className="font-s14 ">{e.name}</td>

                        <td className="font-s14">
                          <DeleteImageFromUpload name={e.name} />
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

export default UploadCoverImage
