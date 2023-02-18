import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import AppContext from "@ctx/AppContext";
import { toast } from "react-toastify";
import Chapar from "plugins/Chapar";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Lightbox } from "react-modal-image";
import PersianNumber from "./../../PersianNumber/index";

const ConfirmMember = ({
  image,
  name,
  id,
  walletBalance,
  score,
  phoneNumber,
  gender,
  email,
  studentCode,
  isConfirmed,
  identityCode,
}) => {
  //   const BigPicture = () => typeof window === `undefined`
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeType, setActiveType] = useState(1);
  const [wallet, setWallet] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const context = useContext(AppContext);

  const closeLightbox = () => {
    setOpen(false);
  };

  useEffect(() => {
    setWallet(walletBalance);
    if (isConfirmed) {
      setActiveType(1);
    }
  }, []);

  const body = { walletBalance: wallet, phoneNumber };

  const handleEditWallet = async () => {
    try {
      await Chapar.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/admin/UpdateUser`,
        JSON.stringify(body)
      );
      setShow(false);
      context.GetUsers(-1);
      toast.success("  موجودی ویرایش شد.", {
        position: "bottom-right",
        closeOnClick: true,
      });
    } catch ({ error, status }) {
      toast.error("مشکلی وجود دارد ", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const AcceptUser = async () => {
    try {
      const data = await Chapar.post(
        `${process.env.NEXT_PUBLIC_API_URL}/account/user/${id}/Confirm`
      );

      toast.success("  تایید با موفقیت انجام شد.", {
        position: "bottom-right",
        closeOnClick: true,
      });
      context.GetUsers();
      setShow(false);
    } catch ({ error, status }) {
      toast.error("  مشکلی وجود داره ", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };
  return (
    <>
      <div className="w-100 mx-1">
        <button className="btn btn-secondary w-100 py-0" onClick={handleShow}>
          {" "}
          <FontAwesomeIcon className="font-s12" icon={faInfoCircle} />
          {isConfirmed ? (
            <FontAwesomeIcon className="font-s12  mx-2" icon={faCheck} />
          ) : (
            ""
          )}
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <h2 className="mb-0 font-s17 p-4 text-center  bg-info white">
          <small className="mb-0 font-weight-bold mt-3 font-s20"> {name}</small>
        </h2>
        <div className="text-center  my-2 p-3">
          <p className="mb-0 text-sm py-2 border-b  ml-auto">
            شماره تماس :
            <span className="font-bold text-base mx-2">{phoneNumber} </span>
          </p>
          <p className="mb-0 text-sm py-2 border-b  ml-auto">
            موجودی کیف پول :
            <span className="font-bold text-base mx-2">
              <PersianNumber number={walletBalance} />
            </span>
          </p>
          <p className="mb-0 text-sm py-2 border-b  ml-auto">
            امتیاز :
            <span className="font-bold text-base mx-2">
              <PersianNumber number={score} />
            </span>
          </p>
          <p className="mb-0 text-sm py-2 border-b  ml-auto">
            جنسیت :
            <span className="font-bold text-base mx-2">
              {gender == 0 ? "مرد" : "زن"}{" "}
            </span>
          </p>
          <p className="mb-0 text-sm py-2 border-b  ml-auto">
            کد ملی :
            <span className="font-bold text-base mx-2">{identityCode} </span>
          </p>
          <p className="mb-0 text-sm py-2  ml-auto">
            کد نظام :
            <span className="font-bold text-base mx-2">
              <PersianNumber number={studentCode} />
            </span>
          </p>
        </div>
        <hr />
        <div>
          <div className="flex mx-auto justify-center   mt-2">
            {!isConfirmed ? (
              <div
                className={`mx-3 pb-2 pointer tr03 ${
                  activeType == 0 ? " border-b-2" : "darkgrey"
                }`}
                onClick={() => setActiveType(0)}
              >
                <h1 className="mb-0 text-sm "> احراز هویت</h1>
              </div>
            ) : (
              ""
            )}

            <div
              className={`mx-3 pb-2 pointer tr03 ${
                activeType == 1 ? " border-b-2" : "darkgrey"
              }`}
              onClick={() => setActiveType(1)}
            >
              <h1 className="mb-0 text-sm ">موجودی</h1>
            </div>
          </div>{" "}
        </div>

        {activeType == 0 ? (
          <>
            <div className="p-3">
              {!!image ? (
                <>
                  {" "}
                  <div className=" border-r10 overflow-hidden">
                    <div
                      className="pointer h-full w-full"
                      onClick={() => setOpen(true)}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/file/IdentityImage/${image}`}
                        layout="responsive"
                        alt=""
                        className="object-cover "
                        width={100}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="w-100 text-right">
                    <small className="text-danger">
                      برای بزرگ نمایی عکس روی آن کلیک کنید
                    </small>
                  </div>
                </>
              ) : (
                <h2 className="mb-0 font-s14 p-4 text-center">
                  عکسی آپلود نکرده است
                </h2>
              )}
            </div>
            {open && (
              <Lightbox
                medium={`${process.env.NEXT_PUBLIC_API_URL}/file/IdentityImage/${image}`}
                large={`${process.env.NEXT_PUBLIC_API_URL}/file/IdentityImage/${image}`}
                alt={name}
                onClose={() => closeLightbox()}
              />
            )}
            <div className="d-flex p-3">
              <button
                className={`btn btn-success w-100 m-2 ${
                  !!image ? "" : "fuck-cick op03"
                }`}
                onClick={() => AcceptUser()}
              >
                تایید مدارک
              </button>
              <button
                className="btn btn-secondary w-100 m-2"
                onClick={handleClose}
              >
                لغو
              </button>
            </div>
          </>
        ) : (
          <div>
            <div className="col-md-12">
              <div
                className="form-group text-right rtl  my-2 p-3
              "
              >
                <label className=" px-2 font-s14 "> موجودی فلش کارت:</label>
                <input
                  type="text"
                  className="form-control w-100"
                  name="wallet"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                />
              </div>

              <div className="d-flex p-3">
                <button
                  className="btn btn-success w-100 m-2"
                  onClick={() => handleEditWallet()}
                >
                  ثبت تغیرات
                </button>
                <button
                  className="btn btn-secondary w-100 m-2"
                  onClick={handleClose}
                >
                  لغو
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
export default ConfirmMember;
