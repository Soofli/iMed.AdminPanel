import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import AppContext from '@ctx/AppContext'
import { toast } from 'react-toastify'
import Chapar from 'plugins/Chapar'

const ModalLoading = ({ rateId }) => {
  const context = useContext(AppContext)

  return (
    <>
      <Modal show={context.state.modalLoading} size="sm">
        <div className="mx-auto p-3">
          <div class="lds-circle">
            <div></div>
          </div>
        </div>
        <p className="mb-0 font-weight-bold  text-center p-2">لطفا صبر کنید</p>
      </Modal>
    </>
  )
}
export default ModalLoading
