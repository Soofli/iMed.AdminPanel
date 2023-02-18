import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import AppContext from '@ctx/AppContext'
import { toast } from 'react-toastify'
import Chapar from 'plugins/Chapar'

const DeleteMember = ({ name }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const context = useContext(AppContext)

  const deleteImageFromUpload = async () => {
    try {
      const data = await Chapar.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/file/image/${name}`,
      )

      toast.success('  حذف با موفقیت انجام شد.', {
        position: 'bottom-right',
        closeOnClick: true,
      })
      context.GetImages()
      setShow(false)
    } catch ({ error, status }) {
      toast.error('  مشکلی وجود داره ', {
        position: 'bottom-right',
        closeOnClick: true,
      })
    }
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
        <div className="text-center">آیا از حذف کاربر اطمینان دارید؟</div>

        <div className="d-flex p-3">
          <button
            className="btn btn-danger w-100 m-2"
            onClick={() => deleteImageFromUpload()}
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
export default DeleteMember
