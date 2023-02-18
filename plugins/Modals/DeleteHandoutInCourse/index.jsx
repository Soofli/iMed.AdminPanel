import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import AppContext from '@ctx/AppContext'

const DeleteHandoutInCourse = ({ name }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const context = useContext(AppContext)
  const activeHandOutCourse = context.state.activeHandOutCourse

  const deleteHandOutSelect = () => {
    // const a = activeHandOutCourse.find((item) => item.Name == name)
    context.setActiveHandOutCourse(
      activeHandOutCourse.filter((item) => item.name !== name),
    )
    //
    // handleClose()
  }
  return (
    <>
      <div className="w-100 mx-1">
        <button
          className="btn btn-outline-danger w-100 py-0"
          onClick={handleShow}
        >
          {' '}
          <FontAwesomeIcon className="font-s12" icon={faTrash} />
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <div className="text-center p-3">
          <FontAwesomeIcon
            className="font-s60 text-danger"
            icon={faInfoCircle}
          />
        </div>
        <div className="text-center">آیا از حذف جزوه اطمینان دارید؟</div>

        <div className="d-flex p-3">
          <button
            className="btn btn-danger w-100 m-2"
            onClick={() => deleteHandOutSelect()}
          >
            بله
          </button>
          <button className="btn btn-secondary w-100 m-2" onClick={handleClose}>
            خیر
          </button>
        </div>
      </Modal>
    </>
  )
}
export default DeleteHandoutInCourse
