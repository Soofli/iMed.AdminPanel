import React, { useRef, useState, useContext, useEffect } from "react";
import {
  faTimes,
  faPlus,
  faPen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import ChooseCoverImage from "@comp/dashboard/NewCourseContent/Component/ChooseCoverImage";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import AppContext from "@ctx/AppContext";
import Chapar from "plugins/Chapar";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import EditTagFlashCard from "plugins/Modals/EditTagFlashCard";

const FlashCardCategoryCreateContent = () => {
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی میباشد",
      },
      element: (message) => (
        <>
          <div className="text-right px-1">
            <small className="text-danger t-ig-small ">{message}</small>
          </div>
        </>
      ),
    })
  );

  const router = useRouter();

  const context = useContext(AppContext);
  const data = context.state.DataFlashCardSingleCategory;
  const [show, setShow] = useState(false);

  const [submited, setSubmited] = useState(false);
  const [, forceUpdate] = useState();

  const [FlashCardTags, setFlashCardTags] = useState([]);
  const [FlashCardTagsValue, setFlashCardTagsValue] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [isFreeValue, setIsFreeValue] = useState(true);
  const [isSuggested, setIsSuggested] = useState(true);
  const [authorValue, setAuthorValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [tagRemoveName, setTagRemoveName] = useState("");
  const [longAnswerValue, setLongAnswerValue] = useState("");

  const handleClose = (ans) => {
    if (ans) {
      removeFlashCardTags(tagRemoveName);
      setShow(false);
    } else {
      setShow(false);
    }
  };

  const handleShow = (name) => {
    setShow(true);
    setTagRemoveName(name);
  };

  const body = {
    Name: nameValue,
    Author: authorValue,
    Detail: detailValue,
    Price: priceValue,
    IsFree: isFreeValue,
    isSuggested,
    FlashCardTags,
    Image: context.state.activeCoverCourse,
  };

  const bodyEdit = {
    Name: nameValue,
    Author: authorValue,
    Detail: detailValue,
    Price: priceValue,
    IsFree: isFreeValue,
    isSuggested,
    FlashCardTags,
    Image: context.state.activeCoverCourse,
    FlashCardCategoryId: router.query.id,
  };

  const createFlashCardCategory = async () => {
    if (validator.current.allValid()) {
      try {
        await Chapar.post(
          `${process.env.NEXT_PUBLIC_API_URL}/flashcardcategory`,
          JSON.stringify(body)
        );
        setSubmited(true);
        toast.success("دسته بندی فلش کارت ساخته شد.", {
          position: "bottom-right",
          closeOnClick: true,
        });
        router.push("/dashboard/flash-cards");
        // context.GetAdmins()
      } catch ({ error, status }) {
        toast.error("مشکلی وجود دارد ", {
          position: "bottom-right",
          closeOnClick: true,
        });
      }
    } else {
      toast.error("پرکردن همه ی فیلد ها واجب است", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const editFlashCardCategory = async () => {
    if (validator.current.allValid()) {
      try {
        await Chapar.put(
          `${process.env.NEXT_PUBLIC_API_URL}/flashcardcategory`,
          JSON.stringify(bodyEdit)
        );
        setSubmited(true);
        toast.success("دسته بندی فلش کارت ویرایش شد.", {
          position: "bottom-right",
          closeOnClick: true,
        });
        router.push("/dashboard/flash-cards");
      } catch ({ error, status }) {
        toast.error("مشکلی وجود دارد ", {
          position: "bottom-right",
          closeOnClick: true,
        });
      }
    } else {
      toast.error("پرکردن همه ی فیلد ها واجب است", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleFlashCardTags = () => {
    if (FlashCardTagsValue.length <= 0) {
      toast.error("  مقدار ورودی نمی تواند خالی باشد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    } else {
      FlashCardTags.push({ name: FlashCardTagsValue, sub: false });
      setFlashCardTagsValue("");
    }
  };

  const removeFlashCardTags = (tagName) => {
    setFlashCardTags(FlashCardTags.filter((item) => item.name !== tagName));
  };

  useEffect(() => {
    if (data.length !== 0) {
      setPriceValue(data.price);
      setNameValue(data.name);
      setFlashCardTags(data.flashCardTags);
      setDetailValue(data.detail);
      setIsFreeValue(data.isFree);
      setIsFreeValue(data.isFree);
      setIsSuggested(data.isSuggested);
      setAuthorValue(data.author);
      context.setCoverCourse(data.imageFileName);
      context.setActiveCoverCourse(data.image);
    } else {
    }
  }, [data]);

  return (
    <>
      <div className="w-fit border-b-2 d-flex pb-2 mb-3 ">
        <h1 className="mb-0 font-s16">ساخت دسته بندی فلش کارت </h1>{" "}
      </div>{" "}
      <div
        className="alert alert-danger text-right font-s14 m-2 font-weight-bold"
        role="alert"
      >
        در زمان ویرایش دسته بندی در صورت تغییر در مشخصات اصلی دسته بندی ، ابتدا
        دکمه ویرایش دسته بندی را بزنید سپس اقدام به اضافه کردن دسته بندی کنید
      </div>
      <div className="row rtl">
        <ChooseCoverImage title="کاور مورد نظر برای دسته بندی فلش کارت را انتخاب نمایید" />

        <div className="col-lg-9 mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group text-right  my-2">
                <label className=" px-2 font-s14"> نام دسته بندی :</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameValue"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
                {!submited ? (
                  <>
                    {validator.current.message(
                      "nameValue",
                      nameValue,
                      "required"
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group text-right  my-2">
                <label className=" px-2 font-s14"> نویسنده :</label>
                <input
                  type="text"
                  className="form-control"
                  name="authorValue"
                  value={authorValue}
                  onChange={(e) => setAuthorValue(e.target.value)}
                />
                {!submited ? (
                  <>
                    {validator.current.message(
                      "authorValue",
                      authorValue,
                      "required"
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group text-right  my-2">
                <label className=" px-2 font-s14">پیشنهاد ویژه : </label>
                <select
                  className="form-control"
                  name="isFreeValue"
                  value={isSuggested}
                  onChange={(e) => setIsSuggested(e.target.value)}
                >
                  <option value={true}>هست</option>
                  <option value={false}>نیست</option>
                </select>
                {!submited ? (
                  <>
                    {validator.current.message(
                      "isFreeValue",
                      isFreeValue,
                      "required"
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group text-right  my-2">
                <label className=" px-2 font-s14 "> قیمت دوره :</label>
                <input
                  type="number"
                  className="form-control"
                  name="priceValue"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                />
                {!submited ? (
                  <>
                    {validator.current.message(
                      "priceValue",
                      priceValue,
                      "required"
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group text-right  my-2">
                <label className=" px-2 font-s14 "> توضیحات :</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="detailValue"
                  value={detailValue}
                  onChange={(e) => setDetailValue(e.target.value)}
                />
                {!submited ? (
                  <>
                    {validator.current.message(
                      "detailValue",
                      detailValue,
                      "required"
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group text-right  my-2">
                <label className=" px-2 font-s14 "> سرفصل های دوره :</label>
                <div className="flex">
                  <input
                    type="text"
                    className="form-control"
                    name="FlashCardTagsValue"
                    value={FlashCardTagsValue}
                    onChange={(e) => setFlashCardTagsValue(e.target.value)}
                  />
                  <button
                    className="btn btn-success border-r50 mx-2"
                    onClick={() => handleFlashCardTags()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                {FlashCardTags &&
                  FlashCardTags.map((e, index) => {
                    return (
                      <div
                        key={index}
                        className={` mx-2 mt-3 p-1 d-flex border-r50 ${
                          e.sub == false ? "bg-info" : "bg-dark"
                        } `}
                        name={e.name}
                      >
                        <div
                          className="w-30-px h-30-px bg-white border-r50 text-center pointer "
                          onClick={() => handleShow(e.name)}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="font-s19 text-red-800 mt-1"
                          />
                        </div>

                        <p className="mb-0 white font-s14 px-2 mx-3 pt-1 font-bold">
                          {e.name}
                        </p>

                        {e.sub == false ? (
                          ""
                        ) : (
                          <EditTagFlashCard
                            name={e.name}
                            flashCardCategoryId={e.flashCardCategoryId}
                            flashCardTagId={e.flashCardTagId}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        {!!router.query.id ? (
          <button
            className="btn btn-success"
            onClick={() => editFlashCardCategory()}
          >
            ویرایش دسته بندی{" "}
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => createFlashCardCategory()}
          >
            ساخت دسته بندی
          </button>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <div className="text-center p-3">
          <FontAwesomeIcon
            className="font-s60 text-danger"
            icon={faInfoCircle}
          />
        </div>
        <div className="text-center">
          با حذف سرفصل ، فلش کارت های آن حذف میشود ، آیا اطمینان دارید ؟
        </div>

        <div className="d-flex p-3">
          <button
            className="btn btn-danger w-100 m-2"
            onClick={() => handleClose(true)}
          >
            بله
          </button>
          <button
            className="btn btn-secondary w-100 m-2"
            onClick={() => handleClose(false)}
          >
            خیر
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FlashCardCategoryCreateContent;
