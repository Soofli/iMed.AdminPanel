import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import AppContext from "@ctx/AppContext";
import { toast } from "react-toastify";
import Chapar from "plugins/Chapar";

const AcceptComment = ({ rateId, type }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const context = useContext(AppContext);

  const deleteComment = async () => {
    try {
      const data = await Chapar.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/rate/${rateId}`
      );

      toast.success("  حذف با موفقیت انجام شد", {
        position: "bottom-right",
        closeOnClick: true,
      });

      if (type == "COURSE") {
        context.GetCommentCourse(-1);
      } else {
        context.GetCommentFlashCard(-1);
      }
      setShow(false);
    } catch ({ error, status }) {
      toast.error("  مشکلی وجود داره ", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const acceptComment = async () => {
    try {
      const data = await Chapar.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rate/${rateId}/ConfirmRate`
      );

      toast.success("  تایید با موفقیت انجام شد.", {
        position: "bottom-right",
        closeOnClick: true,
      });

      if (type == "COURSE") {
        context.GetCommentCourse(-1);
      } else {
        context.GetCommentFlashCard(-1);
      }
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
        <button className="btn btn-success w-100 py-0" onClick={handleShow}>
          {" "}
          <FontAwesomeIcon className="font-s12" icon={faCheck} />
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <div className="text-center p-3">
          <FontAwesomeIcon
            className="font-s60 text-danger"
            icon={faInfoCircle}
          />
        </div>
        <div className="text-center">آیا از تایید نظر اطمینان دارید ؟</div>

        <div className="d-flex p-3">
          <button
            className="btn btn-success w-100 m-2"
            onClick={() => acceptComment()}
          >
            تایید
          </button>

          <button
            className="btn btn-danger w-100 m-2"
            onClick={() => deleteComment()}
          >
            حذف
          </button>

          <button className="btn btn-secondary w-100 m-2" onClick={handleClose}>
            لغو
          </button>
        </div>
      </Modal>
    </>
  );
};
export default AcceptComment;
