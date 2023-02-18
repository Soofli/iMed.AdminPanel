import AppContext from '@ctx/AppContext'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chapar from 'plugins/Chapar'
import React, { useContext, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import SimpleReactValidator from 'simple-react-validator'

const AddHandoutCourseModal = () => {
  const [show, setShow] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userName, setUserName] = useState('')

  const [phone, setPhone] = useState('')
  const [, forceUpdate] = useState()

  const [submited, setSubmited] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const context = useContext(AppContext)

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: 'پر کردن این فیلد الزامی میباشد',
      },
      element: (message) => (
        <>
          <div className="text-right px-1">
            <small className="text-danger t-ig-small ">{message}</small>
          </div>
        </>
      ),
    }),
  )

  const body = { firstName, lastName, email, password, phone, userName }

  const createAdmin = async () => {
    if (password === confirmPassword) {
      if (validator.current.allValid()) {
        try {
          const data = await Chapar.post(
            `${process.env.NEXT_PUBLIC_API_URL}/Authorize/SignUpAdmin`,
            JSON.stringify(body),
          )

          setSubmited(true)
          handleClose()

          toast.success('ادمین ساخته شد.', {
            position: 'bottom-right',
            closeOnClick: true,
          })
          context.GetAdmins()
        } catch ({ error, status }) {
          toast.error('مشکلی وجود دارد ', {
            position: 'bottom-right',
            closeOnClick: true,
          })
        }
      } else {
        toast.error('پرکردن همه ی فیلد ها واجب است', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        validator.current.showMessages()
        forceUpdate(1)
      }
    } else {
      toast.error('رمز عبور با تکرار آن یکسان نیست', {
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
      <button className="btn btn-info  font-s15" onClick={() => handleShow()}>
        اضافه کردن ادمین
        <FontAwesomeIcon icon={faPlus} className="mx-2" />
      </button>

      <Modal show={show} onHide={handleClose} size="xl">
        <div>
          <div className="text-center p-3" closeButton>
            <Modal.Title>اضافه کردن ادمین</Modal.Title>
          </div>
          <div
            className="alert alert-info text-right font-s14 m-3 font-weight-bold"
            role="alert"
          >
            نکته مهم : رمز عبور حداقل باید 6 کارکتر باشد{' '}
          </div>
          <div className="p-3">
            <div className="row rtl">
              <div className="col-md-4">
                <div className="form-group text-right my-2">
                  <label className=" px-2 font-s14"> نام :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      validator.current.showMessageFor('firstName')
                    }}
                  />
                  {!submited ? (
                    <>
                      {validator.current.message(
                        'firstName',
                        firstName,
                        'required',
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group text-right my-2">
                  <label className=" px-2 font-s14"> نام خانوادگی :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                      validator.current.showMessageFor('lastName')
                    }}
                  />
                  {!submited ? (
                    <>
                      {validator.current.message(
                        'lastName',
                        lastName,
                        'required',
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group text-right my-2">
                  <label className=" px-2 font-s14"> نام کاربری :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value)
                      validator.current.showMessageFor('userName')
                    }}
                  />
                  {!submited ? (
                    <>
                      {validator.current.message(
                        'userName',
                        userName,
                        'required',
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group text-right my-2">
                  <label className=" px-2 font-s14"> ایمیل :</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      validator.current.showMessageFor('email')
                    }}
                  />
                  {!submited ? (
                    <>{validator.current.message('email', email, 'required')}</>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group text-right my-2">
                  <label className=" px-2 font-s14"> شماره تماس :</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      validator.current.showMessageFor('phone')
                    }}
                  />
                  {!submited ? (
                    <>{validator.current.message('phone', phone, 'required')}</>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group text-right my-2">
                  <label className=" px-2 font-s14"> رمز عبور :</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      validator.current.showMessageFor('password')
                    }}
                  />

                  {!submited ? (
                    <>
                      {validator.current.message(
                        'password',
                        password,
                        'required',
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group text-right my-2">
                  <label className=" px-2 font-s14"> تکرار رمز عبور :</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      validator.current.showMessageFor('confirmPassword')
                    }}
                  />
                  {!submited ? (
                    <>
                      {validator.current.message(
                        'confirmPassword',
                        confirmPassword,
                        'required',
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="mt-5" onClick={() => createAdmin()}>
                  <button className="btn btn-success w-100">ثبت</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddHandoutCourseModal
