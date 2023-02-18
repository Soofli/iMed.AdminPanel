import AppContext from '@ctx/AppContext'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'

const AddHandoutCourseModal = ({ dataHandOut }) => {
  const [show, setShow] = useState(false)
  const [nameHandOut, setNameHandOut] = useState('')
  const [detailHandOut, setDetailHandOut] = useState('')
  const [activeHandOut, setActiveHandOut] = useState(-1)
  const [activeHandOutName, setActiveHandOutName] = useState('')
  const [activeHandOutLocation, setActiveHandOutLocation] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const context = useContext(AppContext)

  const activeHandOutSelect = (index, location, name) => {
    setActiveHandOut(index)
    setActiveHandOutName(name)
    setActiveHandOutLocation(location)
  }

  const sendDataHandOut = () => {
    context.setActiveHandOutCourse([
      ...context.state.activeHandOutCourse,
      {
        name: nameHandOut,
        detail: detailHandOut,
        fileLocation: activeHandOutLocation,
        fileName: activeHandOutName,
      },
    ])
    setTimeout(() => {}, 1000)
  }

  return (
    <>
      <button
        className="btn btn-info my-3 font-s15"
        onClick={() => handleShow()}
      >
        اضافه کردن جزوه
        <FontAwesomeIcon icon={faPlus} className="mx-2" />
      </button>

      <Modal show={show} onHide={handleClose} size="xl">
        <div className="text-center my-4">
          <h1 className="mb-0 font-s16 font-weight-bold ">
            جزوه مورد نظر خود برای افزودن به دوره را انتخاب و سپس پس از ثبت (نام
            جزوه) و (جزئیات) بر روی دکمه ثبت جزوه کلیک کنید{' '}
          </h1>
        </div>
        <div className="container my-3">
          <div className="row">
            {dataHandOut.map((e, index) => (
              <>
                {' '}
                <div className="col-lg-3 my-3">
                  <div
                    className={` border text-center border-r10 shadow-sm overflow-hidden pointer cover-course tr03 ${
                      activeHandOut == index ? 'cover-course-active' : ''
                    }`}
                    onClick={() =>
                      activeHandOutSelect(index, e.location, e.name)
                    }
                  >
                    <p className="mb-0 p-2 font-s13 font-weight-bold ">
                      {e.name}
                    </p>
                  </div>

                  {activeHandOut == index ? (
                    <>
                      {' '}
                      <div className="form-group text-right my-2">
                        <label className=" px-2 font-s11"> لیست جزوات</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          onChange={(e) => setNameHandOut(e.target.value)}
                        />
                      </div>
                      <div className="form-group text-right my-2">
                        <label className=" px-2 font-s11"> جزییات</label>
                        <textarea
                          type="text"
                          className="form-control"
                          name="name"
                          onChange={(e) => setDetailHandOut(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    ''
                  )}
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
                className="px-4 btn btn-success"
                onClick={() => sendDataHandOut() + handleClose()}
              >
                ثبت جزوه
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddHandoutCourseModal
