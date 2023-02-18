import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import AppContext from '@ctx/AppContext'
import Chapar from 'plugins/Chapar'
import { toast } from 'react-toastify'

const EditTagFlashCard = ({ name, flashCardTagId, flashCardCategoryId }) => {
  const [show, setShow] = useState(false)
  const [tagName, setTagName] = useState('')

  const handleClose = () => {
    setShow(false)
    setTagName('')
  }
  const handleShow = () => {
    setShow(true)
    setTagName(name)
  }
  const context = useContext(AppContext)

  const body = {
    Name: tagName,
    FlashCardTagId: flashCardTagId,
    Flashcardcategoryid: flashCardCategoryId,
  }

  const editTagName = async () => {
    if (tagName.length > 0) {
      try {
        await Chapar.put(
          `${process.env.NEXT_PUBLIC_API_URL}/flashcardcategory/tag/${flashCardTagId}`,
          JSON.stringify(body),
        )
        context.GetFlashCardCategory(flashCardCategoryId)
        handleClose()
        toast.success('  نام سر فصل ویرایش شد.', {
          position: 'bottom-right',
          closeOnClick: true,
        })
      } catch ({ error, status }) {
        toast.error('مشکلی وجود دارد ', {
          position: 'bottom-right',
          closeOnClick: true,
        })
      }
    } else {
      toast.error('ورودی نمیتواند خالی باشد', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <>
      <div
        className="w-30-px h-30-px bg-info border-r50 text-center pointer "
        onClick={() => handleShow()}
      >
        <FontAwesomeIcon icon={faPen} className="font-s17 white mt-1" />
      </div>

      <Modal show={show} onHide={handleClose}>
        <div className="text-center py-3">
          شما در حال ویرایش
          <small className="font-s18 font-bold text-red-700 ">
            {' '}
            {' ' + name + ' '}
          </small>
          هستید
        </div>
        <div className="container-md">
          <div className="form-group text-right rtl my-2">
            <input
              type="text"
              className="form-control"
              name="nameValue"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex p-3 rtl">
          <button
            className="btn btn-success w-100 m-2"
            onClick={() => editTagName()}
          >
            ثبت تغییرات
          </button>
          <button className="btn btn-secondary w-30 m-2" onClick={handleClose}>
            لغو
          </button>
        </div>
      </Modal>
    </>
  )
}
export default EditTagFlashCard
