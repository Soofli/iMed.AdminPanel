import AppContext from "@ctx/AppContext";
import DeleteMember from "plugins/Modals/DeleteMember";
import AddAdminSignUpModal from "plugins/Modals/AddAdminSignUpModal";
import React, { useContext, useEffect, useState } from "react";
import DeleteComment from "plugins/Modals/DeleteComment";
import AcceptComment from "plugins/Modals/AcceptComment";
import ConfirmMember from "plugins/Modals/ConfirmMember";
import PersianNumber from "./../../../plugins/PersianNumber/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const MembersContent = () => {
  const context = useContext(AppContext);
  const dataUser = context.state.dataUser;
  const dataAdmin = context.state.dataAdmin;
  const paginationUser = context.state.paginationUser;
  const [activeType, setActiveType] = useState(0);
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);

  console.log(dataUser);

  useEffect(() => {
    if (dataUser.length <= 0) {
      context.GetUsers(paginationUser);
    }
    context.GetAdmins();
  }, []);

  const handlePaginationUser = () => {
    context.GetUsers(paginationUser + 1, true);
  };

  const HandleSearch = (des) => {
    if (!des) {
      context.GetUsers(-1);
      setSearchIcon(false);
      setSearch("");
    } else {
      setSearchIcon(true);
      context.GetUsersFilter(search);
    }
  };

  return (
    <div className="col-lg-9 mt-[100px]">
      <div className="d-flex justify-content-between w-100">
        <div className="d-flex w-fit">
          <div
            className={`mx-3 pb-2 pointer tr03 ${
              activeType == 0 ? " border-b-2" : "darkgrey"
            }`}
            onClick={() => setActiveType(0)}
          >
            <h1 className="mb-0 font-s16 "> کاربران</h1>
          </div>
          <div
            className={`mx-3 pb-2 pointer tr03 ${
              activeType == 1 ? " border-b-2" : "darkgrey"
            }`}
            onClick={() => setActiveType(1)}
          >
            <h1 className="mb-0 font-s16 "> ادمین ها</h1>
          </div>
        </div>{" "}
        <div className="">
          {activeType == 1 ? <AddAdminSignUpModal /> : ""}
          {/* </> */}
        </div>
      </div>

      <div className="row w-100 mt-4 mx-auto">
        <div className=" col-lg-6 mx-auto z-5">
          <div className="flex w-100 mt-3">
            <div className="form-group m-0 text-right w-80   ">
              <input
                type="text"
                className="form-control border-r50 py-4 "
                name="search"
                placeholder="  جستجوی نام کاربری یا شماره تماس"
                // readOnly
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div
              className={`w-20  rounded-full relative left-10 text-center z-6 ${
                searchIcon ? "bg-red " : "bg-info"
              }`}
              onClick={() => HandleSearch(!searchIcon)}
            >
              {searchIcon ? (
                <FontAwesomeIcon
                  icon={faTimes}
                  className=" white text-xl mt-3"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSearch}
                  className=" white text-xl mt-3"
                />
              )}
            </div>{" "}
          </div>
        </div>
      </div>

      {activeType == 0 ? (
        <>
          {" "}
          <div className="row my-3">
            {dataUser && dataUser.length <= 0 ? (
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th className="w-0 text-center"> کاربری وجود ندارد</th>
                  </tr>
                </thead>
              </table>
            ) : (
              <div className="table-responsive-sm w-100">
                <table className="table">
                  <thead>
                    <tr className="table-active">
                      <th className="w-0 text-center">#</th>
                      <th className="w-20 text-center font-s15">نام کاربر</th>
                      <th className="w-30 text-center font-s15">موجودی</th>
                      <th className="w-20 text-center font-s15">
                        شماره دانشجویی / نظام
                      </th>
                      <th className="w-20 text-center font-s15">شماره تماس</th>
                      <th className="w-10 text-center font-s15">وضعیت</th>

                      {/* <th className="w-10 text-center font-s15">وضعیت</th> */}
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    {dataUser &&
                      dataUser.map((e, index) => (
                        <>
                          <tr className="">
                            <th scope="row">{index + 1}</th>
                            <td className="font-s14 font-weight-bold">
                              {e.firstName + " " + e.lastName}
                            </td>
                            <td className="font-s14  font-bold">
                              <PersianNumber number={e.walletBalance} />
                            </td>
                            <td className="font-s14  ">{e.studentCode}</td>
                            <td className="font-s14 font-weight-bold ">
                              {e.phoneNumber}
                            </td>
                            <td className="font-s14 text-success font-weight-bold">
                              <ConfirmMember
                                image={e.userIdentityImageFileName}
                                name={e.firstName + " " + e.lastName}
                                id={e.id}
                                walletBalance={e.walletBalance}
                                score={e.score}
                                phoneNumber={e.phoneNumber}
                                gender={e.gender}
                                email={e.email}
                                studentCode={e.studentCode}
                                isConfirmed={e.isConfirmed}
                                identityCode={e.identityCode}
                              />
                            </td>

                            {/* <td className="font-s14">
                        <DeleteMember name={1} />
                      </td> */}
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>

                {context.state.moreButtonUser ? (
                  <div className="flex justify-center w-100 mt-3">
                    <button
                      className="btn btn-outline-danger border-r50 px-3 py-1 text-base"
                      onClick={() => handlePaginationUser()}
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
        </>
      ) : (
        <>
          {" "}
          <div className="row my-4">
            {dataAdmin && dataAdmin.length <= 0 ? (
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th className="w-0 text-center"> ادمینی وجود ندارد</th>
                  </tr>
                </thead>
              </table>
            ) : (
              <div className="table-responsive-sm w-100">
                <table className="table">
                  <thead>
                    <tr className="table-active">
                      <th className="w-0 text-center">#</th>

                      <th className="w-30 text-center font-s15">
                        نام و نام خاوادگی
                      </th>
                      <th className="w-30 text-center font-s15">نام کاربری </th>

                      <th className="w-30 text-center font-s15">ایمیل</th>
                      <th className="w-30 text-center font-s15">شماره تماس</th>
                      {/* <th className="w-10 text-center font-s15">وضعیت</th> */}
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    {dataAdmin.map((e, index) => (
                      <>
                        <tr className="">
                          <th scope="row">{index + 1}</th>
                          <td className="font-s14 font-weight-bold text-sky-900">
                            {e.firstName + " " + e.lastName}
                          </td>
                          <td className="font-s14 font-weight-bold text-sky-900">
                            {e.userName}
                          </td>
                          <td className="font-s14 ">{e.email}</td>
                          <td className="font-s14 font-weight-bold ">
                            {e.phoneNumber}
                          </td>

                          {/* <td className="font-s14">
                      <DeleteMember name={1} />
                    </td> */}
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MembersContent;
