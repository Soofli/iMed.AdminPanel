import AppContext from "@ctx/AppContext";
import React, { useContext, useEffect, useState } from "react";
import moment from "jalali-moment";
import DeleteMember from "plugins/Modals/DeleteMember";
import DeleteComment from "plugins/Modals/DeleteComment";
import AcceptComment from "plugins/Modals/AcceptComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import DeleteCommentFlashCard from "./../../../plugins/Modals/DeleteCommentFlashCard/index";

const CommentsContent = () => {
  const context = useContext(AppContext);
  const dataCommentCourse = context.state.dataCommentCourse;
  const paginationCommentCourse = context.state.paginationCommentCourse;
  const moreButtonCommentCourse = context.state.paginationCommentCourse;
  const reverseDateCommentCourse = context.state.paginationCommentCourse;
  const dataCommentFlashCard = context.state.dataCommentFlashCard;
  const paginationCommentFlashCard = context.state.paginationCommentFlashCard;
  const moreButtonCommentFlashCard = context.state.moreButtonCommentFlashCard;
  const reverseDateCommentFlashCard = context.state.reverseDateCommentFlashCard;
  const [activeType, setActiveType] = useState(0);

  useEffect(() => {
    if (dataCommentCourse.length <= 0) {
      context.GetCommentCourse(paginationCommentCourse);
    }
    if (dataCommentFlashCard.length <= 0) {
      context.GetCommentFlashCard(paginationCommentCourse);
    }
  }, []);

  const handlePaginationCommentCourse = () => {
    context.GetCommentCourse(paginationCommentCourse + 1, true);
  };
  const handleReverseDateCommentCourse = () => {
    context.setDataCommentCourse(dataCommentCourse.slice().reverse());
    context.setReverseDateCommentCourse(!reverseDateCommentCourse);
  };

  const handlePaginationCommentFlashCard = () => {
    context.GetCommentFlashCard(paginationCommentFlashCard + 1, true);
  };

  const handleReverseDateCommentFlashCard = () => {
    context.setDataCommentFlashCard(dataCommentFlashCard.slice().reverse());
    context.setReverseDateCommentFlashCard(!reverseDateCommentFlashCard);
  };

  return (
    <div className="col-lg-9 mt-[100px]">
      <div className="d-flex w-fit">
        <div
          className={`mx-3 pb-2 pointer tr03 ${
            activeType == 0 ? " border-b-2" : "darkgrey"
          }`}
          onClick={() => setActiveType(0)}
        >
          <h1 className="mb-0 font-s16 "> دوره ها</h1>
        </div>
        <div
          className={`mx-3 pb-2 pointer tr03 ${
            activeType == 1 ? " border-b-2" : "darkgrey"
          }`}
          onClick={() => setActiveType(1)}
        >
          <h1 className="mb-0 font-s16 "> فلش کارت ها</h1>
        </div>
      </div>{" "}
      {activeType == 0 ? (
        <div className="row my-5">
          {dataCommentCourse && dataCommentCourse.length <= 0 ? (
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th className="w-0 text-center"> نظری وجود ندارد</th>
                </tr>
              </thead>
            </table>
          ) : (
            <div className="table-responsive-sm w-100">
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th className="w-0 text-center">#</th>
                    <th className="w-30 text-center font-s15">نام کاربر</th>
                    <th className="w-40 text-center font-s15">متن نظر</th>
                    <th
                      className="w-20 text-center font-s15"
                      onClick={() => handleReverseDateCommentCourse()}
                    >
                      {reverseDateCommentCourse ? (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="text-danger text-sm mx-2"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronUp}
                          className="text-success text-sm mx-2"
                        />
                      )}
                      تاریخ
                    </th>
                    <th className="w-20 text-center font-s15">امتیاز</th>
                    <th className="w-10 text-center font-s15">وضعیت</th>
                    {/* <th className="w-10 text-center font-s15">وضعیت</th> */}
                  </tr>
                </thead>

                <tbody className="text-center">
                  {dataCommentCourse.map((e, index) => (
                    <>
                      <tr className="">
                        <th scope="row">{index + 1}</th>
                        <td className="font-s14 font-weight-bold">
                          {e.author}
                        </td>
                        <td className="font-s14 font-weight-bold">
                          {e.rateMessage}
                        </td>
                        <td className="font-s14   ">
                          {moment(e.createdAt, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </td>
                        <td className="font-s14 font-weight-bold">{e.score}</td>
                        <td className="font-s14">
                          {e.isConfirmed ? (
                            <DeleteComment rateId={e.rateId} />
                          ) : (
                            <AcceptComment rateId={e.rateId} type="COURSE" />
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              {context.state.moreButtonCommentCourse ? (
                <div className="flex justify-center w-100 mt-3">
                  <button
                    className="btn btn-outline-danger border-r50 px-3 py-1 text-base"
                    onClick={() => handlePaginationCommentCourse()}
                  >
                    مشاهده بیشتر
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-sm mx-2"
                    />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="row my-5">
          {dataCommentFlashCard && dataCommentFlashCard.length <= 0 ? (
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th className="w-0 text-center"> نظری وجود ندارد</th>
                </tr>
              </thead>
            </table>
          ) : (
            <div className="table-responsive-sm w-100">
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th className="w-0 text-center">#</th>
                    <th className="w-30 text-center font-s15">نام کاربر</th>
                    <th className="w-40 text-center font-s15">متن نظر</th>
                    <th
                      className="w-20 text-center font-s15"
                      onClick={() => handleReverseDateCommentFlashCard()}
                    >
                      {reverseDateCommentFlashCard ? (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="text-danger text-sm mx-2"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronUp}
                          className="text-success text-sm mx-2"
                        />
                      )}
                      تاریخ
                    </th>
                    <th className="w-20 text-center font-s15">امتیاز</th>
                    <th className="w-10 text-center font-s15">وضعیت</th>
                    {/* <th className="w-10 text-center font-s15">وضعیت</th> */}
                  </tr>
                </thead>

                <tbody className="text-center">
                  {dataCommentFlashCard.map((e, index) => (
                    <>
                      <tr className="">
                        <th scope="row">{index + 1}</th>
                        <td className="font-s14 font-weight-bold">
                          {e.author}
                        </td>
                        <td className="font-s14 font-weight-bold">
                          {e.rateMessage}
                        </td>
                        <td className="font-s14   ">
                          {moment(e.createdAt, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </td>
                        <td className="font-s14 font-weight-bold">{e.score}</td>
                        <td className="font-s14">
                          {e.isConfirmed ? (
                            <DeleteCommentFlashCard rateId={e.rateId} />
                          ) : (
                            <AcceptComment rateId={e.rateId} type="FLASHCARD" />
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>

              {context.state.moreButtonCommentFlashCard ? (
                <div className="flex justify-center w-100 mt-3">
                  <button
                    className="btn btn-outline-danger border-r50 px-3 py-1 text-base"
                    onClick={() => handlePaginationCommentFlashCard()}
                  >
                    مشاهده بیشتر
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-sm mx-2"
                    />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsContent;
