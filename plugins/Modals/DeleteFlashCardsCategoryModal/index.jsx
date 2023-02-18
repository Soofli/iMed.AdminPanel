import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import AppContext from '@ctx/AppContext'
import { toast } from 'react-toastify'
import Chapar from 'plugins/Chapar'

const DeleteFlashCardsCategoryModal = ({ flashCardCategoryId }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const context = useContext(AppContext)

  const deleteFlashCat = async () => {
    try {
      const data = await Chapar.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/flashcardcategory/${flashCardCategoryId}`,
      )

      toast.success('  حذف با موفقیت انجام شد.', {
        position: 'bottom-right',
        closeOnClick: true,
      })
      context.GetFlashCardCategories()
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
        <div className="text-center">
          با حذف دوره محتویات داخل آن پاک میشود ، آیا از حذف آن مطمئن هستید؟
        </div>

        <div className="d-flex p-3">
          <button
            className="btn btn-danger w-100 m-2"
            onClick={() => deleteFlashCat()}
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
export default DeleteFlashCardsCategoryModal
