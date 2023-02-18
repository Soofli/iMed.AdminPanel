import AppContext from "@ctx/AppContext";
import React, { useContext, useEffect, useState } from "react";
import moment from "jalali-moment";
import PersianNumber from "plugins/PersianNumber";
import { DatePicker } from "jalali-react-datepicker";
import LoaidngOne from "plugins/Loading";
import Courses from "./../../../pages/dashboard/courses/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const SalesContent = () => {
  const context = useContext(AppContext);
  const dataSale = context.state.dataSale;
  const dataSaleFlashCards = context.state.dataSaleFlashCards;
  const loading = context.state.loading;
  const isFilter = context.state.isFilter;
  const paginationPerches = context.state.paginationPerches;
  const paginationPerchesFlashCards = context.state.paginationPerchesFlashCards;
  const reverseDateCourse = context.state.reverseDateCourse;
  const reverseDateFlashCard = context.state.reverseDateFlashCard;
  console.log();

  const [member, setMember] = useState("");
  const [courseName, setCourseName] = useState("");
  const [date, setDate] = useState([]);
  const [dateJoin, setDateJoin] = useState("");
  const [activeType, setActiveType] = useState(0);

  const handleDate = (datePicker) => {
    setDate(datePicker);

    const a = datePicker.split("-").join("/");
    const b = a.slice(0, a.length - 3);
    setDateJoin(b);
  };

  const handleFilter = () => {
    context.GetSaleCoursesFilter(member, courseName, dateJoin);
  };

  const deleteFilter = () => {
    context.GetSaleCourses(paginationPerches);
    setDateJoin("");
    setCourseName("");
    setMember("");
  };

  const handlePaginationSale = () => {
    context.GetSaleCourses(paginationPerches + 1, true);
  };

  const handlePaginationSaleFlachCard = () => {
    context.GetSaleFlashCards(paginationPerchesFlashCards + 1, true);
  };

  const handleReverseDateCourse = () => {
    context.setDataSale(dataSale.slice().reverse());
    context.setReverseDateCourse(!reverseDateCourse);
  };
  const handleReverseDateFlashCard = () => {
    context.setDataSaleFlashCards(dataSaleFlashCards.slice().reverse());
    context.setReverseDateFlashCard(!reverseDateFlashCard);
  };

  useEffect(() => {
    if (dataSale.length <= 0) {
      context.GetSaleCourses(paginationPerches);
    }

    if (dataSaleFlashCards.length <= 0) {
      context.GetSaleFlashCards(paginationPerchesFlashCards);
    }
  }, []);

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
      <div className="row mt-3  border-b-2">
        <div className="col-lg-3">
          <div className="form-group text-right my-2">
            <input
              type="text"
              className="form-control"
              name="teacher"
              value={courseName}
              placeholder="نام دوره"
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-lg-3">
          <div className="form-group text-right my-2">
            <input
              type="text"
              className="form-control"
              name="teacher"
              value={member}
              placeholder="نام کاربر"
              onChange={(e) => {
                setMember(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-lg-3">
          <div className="form-group text-right position-relative top-[-16px]  ">
            <DatePicker
              className="form-control "
              placeholder="تاریخ برگزاری"
              label={null}
              onClickSubmitButton={(value) => {
                handleDate(value.value._i);
                //
              }}
            />
          </div>
        </div>

        <div className="col-lg-3 my-2 ">
          <div>
            {isFilter ? (
              <div className="d-flex ">
                <button
                  className={`btn mx-2  w-100 ${
                    !!member || !!courseName || !!date
                      ? "btn-success"
                      : "fuck-cick opacity-50 btn-info"
                  }`}
                  onClick={() => handleFilter()}
                >
                  اعمال فیلتر
                </button>
                <button
                  className="btn btn-danger mx-2  w-100 "
                  onClick={() => deleteFilter()}
                >
                  حذف فیلتر
                </button>
              </div>
            ) : (
              <button
                className={`btn  w-100 ${
                  !!member || !!courseName || !!date
                    ? "btn-success"
                    : "fuck-cick opacity-50 btn-info"
                }`}
                onClick={() => handleFilter()}
              >
                اعمال فیلتر
              </button>
            )}
          </div>
        </div>
      </div>
      {activeType == 0 ? (
        <div className="row my-5 p-3">
          {dataSale && dataSale.length <= 0 ? (
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th className="w-0 text-center"> فروشی وجود ندارد</th>
                </tr>
              </thead>
            </table>
          ) : (
            <div className="table-responsive-sm w-100">
              {loading ? (
                <LoaidngOne />
              ) : (
                <table className="table mt-4">
                  <thead>
                    <tr className="table-active">
                      <th className="w-0 text-center">#</th>
                      <th className="w-20 text-center font-s15">نام کاربر</th>
                      <th className="w-20 text-center font-s15">نام دوره</th>
                      <th className="w-10 text-center font-s15">نوع دوره</th>
                      <th
                        className="w-20 text-center font-s15"
                        onClick={() => handleReverseDateCourse()}
                      >
                        {reverseDateCourse ? (
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
                      <th className="w-20 text-center font-s15">ساعت</th>
                      <th className="w-30 text-center font-s15">
                        {" "}
                        قیمت (تومان)
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    {dataSale.map((e, index) => (
                      <>
                        <tr className="">
                          <th scope="row">{index + 1}</th>
                          <td className="font-s14 font-weight-bold ">
                            {e.userFirstName + " " + e.userLastName}
                          </td>
                          <td className="font-s14  ">{e.courseName}</td>
                          <td className="font-s14 font-weight-bold ">
                            {e.isFree ? "رایگان" : "نقدی"}
                          </td>
                          <td className="font-s14 ">
                            {moment(e.createdAt, "YYYY/MM/DD")
                              .locale("fa")
                              .format("YYYY/MM/DD")}
                          </td>

                          <td className="font-s14 ">
                            {moment(e.createdAt, "YYYY/M/D HH:mm")
                              .locale("fa")
                              .format("HH:mm")}
                          </td>
                          <td className="font-s14 font-weight-bold  text-primary ">
                            {e.price != 0 ? (
                              <PersianNumber
                                number={e.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              />
                            ) : (
                              <p className="mb-0 text-sm text-yellow-600">
                                رایگان
                              </p>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {context.state.moreButton ? (
            <div className="flex justify-center w-100 mt-3">
              <button
                className="btn btn-outline-danger border-r50 px-3 py-1 text-base"
                onClick={() => handlePaginationSale()}
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
      ) : (
        <div className="row my-5 p-3">
          {dataSaleFlashCards && dataSaleFlashCards.length <= 0 ? (
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th className="w-0 text-center"> فروشی وجود ندارد</th>
                </tr>
              </thead>
            </table>
          ) : (
            <div className="table-responsive-sm w-100">
              {loading ? (
                <LoaidngOne />
              ) : (
                <table className="table mt-4">
                  <thead>
                    <tr className="table-active">
                      <th className="w-0 text-center">#</th>
                      <th className="w-20 text-center font-s15">نام کاربر</th>
                      <th className="w-20 text-center font-s15">
                        نام فلش کارت
                      </th>
                      <th className="w-10 text-center font-s15">نوع دوره</th>
                      <th
                        className="w-20 text-center font-s15"
                        onClick={() => handleReverseDateFlashCard()}
                      >
                        {reverseDateFlashCard ? (
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
                        تاریخ{" "}
                      </th>
                      <th className="w-20 text-center font-s15">ساعت</th>
                      <th className="w-30 text-center font-s15">
                        {" "}
                        قیمت (تومان)
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    {dataSaleFlashCards.map((e, index) => (
                      <>
                        <tr className="">
                          <th scope="row">{index + 1}</th>
                          <td className="font-s14 font-weight-bold ">
                            {e.userFirstName + " " + e.userLastName}
                          </td>
                          <td className="font-s14  ">
                            {e.flashCardCategoryName}
                          </td>
                          <td className="font-s14 font-weight-bold ">
                            {e.isFree ? "رایگان" : "نقدی"}
                          </td>
                          <td className="font-s14 ">
                            {moment(e.createdAt, "YYYY/MM/DD")
                              .locale("fa")
                              .format("YYYY/MM/DD")}
                          </td>

                          <td className="font-s14 ">
                            {moment(e.createdAt, "YYYY/M/D HH:mm")
                              .locale("fa")
                              .format("HH:mm")}
                          </td>
                          <td className="font-s14 font-weight-bold  text-primary ">
                            {e.price != 0 ? (
                              <PersianNumber
                                number={e.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              />
                            ) : (
                              <p className="mb-0 text-sm text-yellow-600">
                                رایگان
                              </p>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {context.state.moreButtonFlashCards ? (
            <div className="flex justify-center w-100 mt-3">
              <button
                className="btn btn-outline-danger border-r50 px-3 py-1 text-base"
                onClick={() => handlePaginationSaleFlachCard()}
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
  );
};

export default SalesContent;
