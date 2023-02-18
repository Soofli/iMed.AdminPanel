import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import AppContext from '@ctx/AppContext'

const LogOut = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLogOut = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <>
      {/* <div className="w-100 mx-1">
        <button
          className="btn btn-outline-danger w-100 py-0"
         
        >
          {' '}
          <FontAwesomeIcon className="font-s12" icon={faTrash} />
        </button>
      </div> */}
      <li className="bg-danger border-r10 p-2" onClick={() => handleShow()}>
        <p className="white mb-0 pointer font-s11 "> خروج</p>
      </li>

      <Modal show={show} onHide={handleClose}>
        <div className="text-center p-3">
          <FontAwesomeIcon
            className="font-s60 text-danger"
            icon={faInfoCircle}
          />
        </div>
        <div className="text-center">میخواهید خارج شوید ؟</div>

        <div className="d-flex p-3">
          <button
            className="btn btn-danger w-100 m-2"
            onClick={() => handleLogOut()}
          >
            بله
          </button>
          <button className="btn btn-secondary w-100 m-2" onClick={handleClose}>
            لغو
          </button>
        </div>
      </Modal>
    </>
  )
}
export default LogOut
