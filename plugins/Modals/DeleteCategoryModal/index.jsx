import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chapar from 'plugins/Chapar'
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import AppContext from '@ctx/AppContext'

const DeleteCategoryModal = ({ id }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const context = useContext(AppContext)

  const deleteCategory = async () => {
    try {
      const data = await Chapar.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/coursecategory/${id}`,
      )

      toast.success('  حذف با موفقیت انجام شد.', {
        position: 'bottom-right',
        closeOnClick: true,
      })
      context.GetCategories()
    } catch ({ error, status }) {
      toast.error('  مشکلی وجود داره ', {
        position: 'bottom-right',
        closeOnClick: true,
      })
    }
  }

  return (
    <>
      <div
        className="w-100 text-center pointer trash-hover  p-2 tr03 "
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <div className="text-center p-3">
          <FontAwesomeIcon
            className="font-s60 text-danger"
            icon={faInfoCircle}
          />
        </div>
        <div className="text-center">آیا از حذف دسته بندی اطمینان دارید؟</div>

        <div className="d-flex p-3">
          <button
            className="btn btn-danger w-100 m-2"
            onClick={() => deleteCategory()}
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

export default DeleteCategoryModal
