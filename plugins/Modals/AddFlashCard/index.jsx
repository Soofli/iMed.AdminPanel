import {
  faAmbulance,
  faAngry,
  faAudioDescription,
  faFastForward,
  faInfoCircle,
  faLaptopMedical,
  faPlus,
  faRocket,
  faTimes,
  faTrash,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chapar from "plugins/Chapar";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AppContext from "@ctx/AppContext";
import SimpleReactValidator from "simple-react-validator";
import { useCallback } from "react";

const AddFlashCartCategory = ({}) => {
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
  const [submited, setSubmited] = useState(false);
  const [show, setShow] = useState(false);
  const [fastCreate, setFastCreate] = useState(false);
  const [flashCardAnswers, setFlashCardAnswers] = useState([]);
  const [answerValue, setAnswerValue] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [flashCardTags, setFlashCardTags] = useState(null);
  const [longAnswerValue, setLongAnswerValue] = useState("");
  const [count, setCount] = useState(0);

  const [, forceUpdateNew] = useState();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const router = useRouter();

  const context = useContext(AppContext);
  const data = context.state.DataFlashCardSingleCategory;
  const dataActiveFlashCard = context.state.activeFlashCard;

  const flashCardAnswersSort = useCallback(async (data) => {
    setFlashCardAnswers([...data].sort((a, b) => a.row - b.row));
  }, []);

  const handleFlashCardQuestion = () => {
    if (count.length <= 0) {
      toast.error("  اولویت ستون جواب را مشخص کنید", {
        position: "bottom-right",
        closeOnClick: true,
      });
    } else {
      if (answerValue.length <= 0) {
        toast.error("  مقدار ورودی نمی تواند خالی باشد", {
          position: "bottom-right",
          closeOnClick: true,
        });
      } else {
        flashCardAnswers.push({
          answer: answerValue,
          isTrue: false,
          row: count,
        });
        setAnswerValue("");
        setCount(count + 1);
      }
    }
  };

  const removeFlashCardQuestion = (answer) => {
    setFlashCardAnswers(
      flashCardAnswers.filter((item) => item.answer !== answer)
    );
  };

  const trueAnswerInArray = (index) => {
    flashCardAnswers[index].isTrue = true;
    forceUpdate();
  };

  const wrongAnswerInArray = (index) => {
    flashCardAnswers[index].isTrue = false;
    forceUpdate();
  };

  const body = {
    Question: questionValue,
    FlashCardTagId: flashCardTags,
    flashCardId: context.state.flashCardId,
    FlashCardAnswers: flashCardAnswers,
    LongAnswer: longAnswerValue,
  };

  const createFlashCard = async () => {
    if (flashCardAnswers.filter((e) => e.isTrue == true).length <= 0) {
      toast.error(" حداقل یک جواب درست باید باشد ", {
        position: "bottom-right",
        closeOnClick: true,
      });
    } else if (validator.current.allValid() && !!questionValue) {
      try {
        await Chapar.post(
          `${process.env.NEXT_PUBLIC_API_URL}/flashcard`,
          JSON.stringify(body)
        );
        setSubmited(true);
        toast.success("  فلش کارت ساخته شد.", {
          position: "bottom-right",
          closeOnClick: true,
        });

        if (fastCreate) {
          setFlashCardAnswers([]);
          setQuestionValue("");
        } else {
          context.HandleModalFlashCard(false, data.flashCardCategoryId);
        }
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
      forceUpdateNew(1);
    }
  };

  const editFlashCard = async () => {
    console.log(body);
    if (flashCardAnswers.filter((e) => e.isTrue == true).length <= 0) {
      toast.error(" حداقل یک جواب درست باید باشد ", {
        position: "bottom-right",
        closeOnClick: true,
      });
    } else if (validator.current.allValid()) {
      try {
        await Chapar.put(
          `${process.env.NEXT_PUBLIC_API_URL}/flashcard`,
          JSON.stringify(body)
        );
        setSubmited(true);
        toast.success("  فلش کارت ویرایش شد.", {
          position: "bottom-right",
          closeOnClick: true,
        });

        if (fastCreate) {
          setFlashCardAnswers([]);
          setQuestionValue("");
        } else {
          context.HandleModalFlashCard(false, data.flashCardCategoryId);
        }
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
      forceUpdateNew(1);
    }
  };

  useEffect(() => {
    if (context.state.editFlashCardTime) {
      // setFlashCardAnswers(dataActiveFlashCard.flashCardAnswers);
      flashCardAnswersSort(dataActiveFlashCard.flashCardAnswers);
      setQuestionValue(dataActiveFlashCard.question);

      const tag = data.flashCardTags.find(
        (e) => e.flashCardTagId == dataActiveFlashCard.flashCardTagId
      );
      setFlashCardTags(dataActiveFlashCard.flashCardTagId);

      setLongAnswerValue(dataActiveFlashCard.longAnswer);
      setCount(dataActiveFlashCard.flashCardAnswers.length + 1);
    } else {
      setFlashCardAnswers([]);
      setQuestionValue("");
      setFlashCardTags(null);
      setLongAnswerValue("");
      setLongAnswerValue("");
      setCount(1);
    }
  }, [context.state.ModalFlashCard]);

  return (
    <>
      <div className="col-md-3 mt-3">
        <div
          className="bg-cyan-700  border-r10 text-center pointer py-3"
          onClick={() => context.HandleModalFlashCard(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mt-[10px] font-s40 white" />
          <p className="mb-0 mt-2  no-underline white font-s14">
            ساخت فلش کارت جدید
          </p>
        </div>
      </div>

      <Modal show={context.state.ModalFlashCard} size="lg" data-dismiss="modal">
        <div className="text-center pt-4 pb-2">
          <Modal.Title>ساخت فلش کارت </Modal.Title>
        </div>
        <div
          className="alert alert-info text-right font-s14 m-2 font-weight-bold"
          role="alert"
        >
          نکته مهم : برای ساخت سریع فلش کارت آیکون موشک پایین صفحه را فعال کنید{" "}
        </div>
        <div className="container-md">
          <div className="row rtl">
            <div className="col-md-6">
              <div className="form-group text-right  my-2">
                <label className=" px-2 font-s14"> نام دسته بندی :</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameValue"
                  readOnly
                  value={data.name}
                  // onChange={(e) => setNameValue(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group text-right  my-2">
                <label className=" px-2 font-s14">سر فصل ها: </label>
                <select
                  className="form-control"
                  name="flashCardTags"
                  onChange={(e) => setFlashCardTags(e.target.value)}
                  value={flashCardTags}
                >
                  <option value="" disabled selected>
                    انتخاب کنید{" "}
                  </option>

                  {data.flashCardTags &&
                    data.flashCardTags.map((e) => (
                      <>
                        <option value={e.flashCardTagId}>{e.name}</option>
                      </>
                    ))}
                </select>
                {!submited ? (
                  <>
                    {validator.current.message(
                      "flashCardTags",
                      flashCardTags,
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
                <label className=" px-2 font-s14 "> سئوال :</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="questionValue"
                  value={questionValue}
                  onChange={(e) => setQuestionValue(e.target.value)}
                />
                {!submited ? (
                  <>
                    {validator.current.message(
                      "questionValue",
                      questionValue,
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
                <label className=" px-2 font-s14 "> جواب های سئوال:</label>
                <div className="flex">
                  <input
                    type="number"
                    className="form-control w-10 mx-2 text-center placeholder-slate-200"
                    name="count"
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    // placeholder="111"
                    value={count}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    onChange={(e) => setAnswerValue(e.target.value)}
                    value={answerValue}
                  />
                  <button
                    className="btn btn-success border-r50 mx-2"
                    onClick={() => handleFlashCardQuestion()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              {flashCardAnswers &&
                flashCardAnswers.map((e, index) => {
                  return (
                    <div
                      className="bg-cyan-700 p-2 border-r10 my-2 d-flex justify-content-between "
                      key={index}
                    >
                      <h1 className="  font-s16 white text-shadow ">{e.row}</h1>
                      <div className="">
                        <div
                          className="w-20-px h-20-px border-r50 position-relative bg-white text-center pointer red"
                          onClick={() => removeFlashCardQuestion(e.answer)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                      </div>
                      <div className="w-70">
                        <p className="mb-0 font-s13 white text-right">
                          {" "}
                          {e.answer}
                        </p>
                      </div>

                      <div className="d-flex justify-content-end w-20 ">
                        <div
                          className={` mx-1 text-center border-r10 pointer position-relative h-20-px ${
                            !!flashCardAnswers[index].isTrue
                              ? "bg-success"
                              : "bg-light"
                          }`}
                          onClick={() => trueAnswerInArray(index)}
                        >
                          <p
                            className={`mb-0 font-s14 px-3 ${
                              !!flashCardAnswers[index].isTrue
                                ? "white text-shadow"
                                : ""
                            }`}
                          >
                            درست
                          </p>
                        </div>
                        <div
                          className={` mx-1 text-center border-r10 pointer position-relative h-20-px ${
                            !!!flashCardAnswers[index].isTrue
                              ? "bg-danger"
                              : "bg-light"
                          }`}
                          onClick={() => wrongAnswerInArray(index)}
                        >
                          <p
                            className={`mb-0 font-s14 px-3 ${
                              !!!flashCardAnswers[index].isTrue
                                ? "white text-shadow"
                                : ""
                            }`}
                          >
                            غلط
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group text-right rtl  my-2">
            <label className=" px-2 font-s14 "> آموزش پشت فلش کارت:</label>
            <textarea
              type="text"
              className="form-control h-100-px"
              name="longAnswerValue"
              value={longAnswerValue}
              onChange={(e) => setLongAnswerValue(e.target.value)}
            />
            {!submited ? (
              <>
                {validator.current.message(
                  "longAnswerValue",
                  longAnswerValue,
                  "required"
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="bg-light p-3 text-center mt-5">
          <div className="d-flex justify-content-between rtl">
            <div className="d-flex">
              <div className="mx-2 ">
                <button
                  className="px-4 btn btn-danger"
                  onClick={() =>
                    context.HandleModalFlashCard(
                      false,
                      data.flashCardCategoryId
                    )
                  }
                >
                  لغو
                </button>
              </div>
              <div className="mx-2 ">
                {context.state.editFlashCardTime ? (
                  <button
                    className="px-4 btn btn-success"
                    onClick={() => editFlashCard()}
                  >
                    ویرایش
                  </button>
                ) : (
                  <button
                    className="px-4 btn btn-success"
                    onClick={() => createFlashCard()}
                  >
                    ثبت
                  </button>
                )}
              </div>
            </div>

            {context.state.editFlashCardTime ? (
              ""
            ) : (
              <div onClick={() => setFastCreate(!fastCreate)}>
                <div
                  className={` bg-white shadow-sm pointer border-r50 px-2  tr03 p-1 w-fit ${
                    fastCreate ? "bg-red" : "bg-white "
                  }`}
                >
                  <p
                    className={`mb-0 font-s14 p-2  ${
                      fastCreate ? "white" : "black"
                    }`}
                  >
                    <FontAwesomeIcon icon={faRocket} />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddFlashCartCategory;
