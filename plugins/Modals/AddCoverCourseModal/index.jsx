import AppContext from '@ctx/AppContext'
import {
  faInfoCircle,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

const AddCoverCourseModal = ({ title }) => {
  const [show, setShow] = useState(false)
  const [activeCouers, setActiveCouers] = useState(-1)
  const [activeCoverName, setActiveCoverName] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const context = useContext(AppContext)
  const dataImage = context.state.dataImage
  const imageId = context.state.imageIdCourse

  const sendDataCover = (index, location, name) => {
    setActiveCouers(index)
    setActiveCoverName(name)
    context.setActiveCoverCourse({
      fileLocation: location,
      fileName: name,
      name,
    })

    context.setActiveCoverCourseEditTime({
      fileLocation: location,
      fileName: name,
      name,
      imageId,
    })

    setTimeout(() => {}, 1000)
  }

  useEffect(() => {
    context.GetImages()
  }, [])

  return (
    <>
      <div
        className="w-100 h-200-px border-r20 shadow-md bg-cyan-700 pointer mt-3  overflow-hidden "
        onClick={() => handleShow()}
      >
        <div className="text-center">
          <FontAwesomeIcon className="font-s60 mt-5 mb-2 white" icon={faPlus} />
          <p className="mb-0 white font-s13  ">
            {' '}
            {title ? title : 'کاور را انتخاب کنید'}
          </p>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" data-dismiss="modal">
        <div className="text-center my-4">
          <h1 className="mb-0 font-s16 font-weight-bold ">
            .ابتدا تصویر مورد نظر خود برای کاور را انتخاب و سپس بر روی دکمه "ثبت
            کاور" کلیک نمایید
          </h1>
        </div>
        <div className="container my-3">
          <div className="row">
            {dataImage.map((e, index) => (
              <>
                <div className="col-lg-4 my-3">
                  <div
                    className="border-r20 border overflow-hidden"
                    onClick={() => sendDataCover(index, e.location, e.name)}
                  >
                    <div
                      className={`w-100 h-100-px  shadow-md bg-cyan-700 pointer   overflow-hidden {
                      ${activeCouers == index ? 'cover-course-active' : ''}`}
                    >
                      <div>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/file/image/${e.name}`}
                          layout="responsive"
                          alt=""
                          width="100"
                          height="100"
                        />
                      </div>
                    </div>
                    <div
                      className={`  text-center  overflow-hidden pointer cover-course py-2 tr03 ${
                        activeCouers == index ? 'cover-course-active' : ''
                      }`}
                    >
                      <p className="mb-0 p-1 font-s12">{e.name}</p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="bg-light p-3 text-center">
          <div className="d-flex justify-content-end">
            <div className="mx-2">
              <button
                className="px-4 btn btn-danger"
                onClick={() => handleClose()}
              >
                لغو
              </button>
            </div>
            <div className="mx-2">
              <button
                className={`px-4 btn btn-success ${
                  activeCouers == -1 ? 'fuck-click' : ''
                } `}
                onClick={() => context.GetImage(activeCoverName)}
              >
                ثبت کاور
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddCoverCourseModal
