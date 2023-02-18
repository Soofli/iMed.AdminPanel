import AppContext from "@ctx/AppContext";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddVideoCourseModal from "plugins/Modals/AddVideoCourseModal";
import DeleteVideoInCourse from "plugins/Modals/DeleteVideoInCourse";
import React, { useContext, useEffect, FC, forwardRef, useState } from "react";
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";

// const CustomComponent =
//   forwardRef <
//   HTMLDivElement >
//   ((props, ref) => {
//     return <div ref={ref}>{props.children}</div>;
//   });

const ChooseVideo = () => {
  const context = useContext(AppContext);
  const dataVideo = context.state.dataVideo;
  const activeVideoCourse = context.state.activeVideoCourse;
  const activeVideoCourseSort = [...activeVideoCourse].sort(
    (a, b) => a.row - b.row
  );

  useEffect(() => {
    context.GetVideos();
    if (typeof window !== "undefined") {
      window.Sortable = require("sortablejs");
    }
  }, []);

  //

  const onSortItems = () => {
    let sortByRow = [];
    for (let i = 0; i < activeVideoCourse.length; i++) {
      //
      const b = (activeVideoCourse[i].row = i);
    }
  };

  return (
    <div className="col-lg-12 mt-5 ">
      {activeVideoCourse.length <= 0 ? (
        <div className="table-responsive-sm">
          <AddVideoCourseModal dataVideo={dataVideo} />
          <table className="table">
            <thead>
              <tr className="table-active">
                <th className="w-0 text-center">ویدئویی وجود ندارد</th>
              </tr>
            </thead>
          </table>
        </div>
      ) : (
        <div className="table-responsive-sm">
          <AddVideoCourseModal dataVideo={dataVideo} />

          <div>
            <div className="p-3 bg-warning border-r50 flex">
              <div className="w-20 text-center">#</div>
              <div className="w-30 text-center font-s15">نام ویدئو</div>
              <div className="w-30 text-center font-s15">زمان ویدئو</div>
              <div className="w-30 text-center font-s15">رایگان </div>
              <div className="w-20 text-center font-s15">وضعیت</div>
            </div>
          </div>
          <div className="text-center border-r10 ">
            <>
              <ReactSortable
                // tag={CustomComponent}
                list={activeVideoCourse}
                setList={context.setActiveVideoCourse}
                onChange={() => onSortItems()}
              >
                {activeVideoCourseSort.map((e, index) => (
                  <>
                    {" "}
                    <div className="flex p-3 my-2 bg-white shadow-sm border-r20">
                      <div className="w-20">{index + 1}</div>
                      <div className="font-s14 w-30 ">{e.name}</div>
                      <div className="font-s14 w-30 font-weight-bold">
                        {e.videoTime} دقیقه
                      </div>
                      <div className="font-s14 w-30 font-weight-bold">
                        {e.isFree ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-success"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-danger"
                          />
                        )}
                      </div>

                      <div className="d-flex w-20">
                        <DeleteVideoInCourse name={e.name} />
                      </div>
                    </div>
                  </>
                ))}
              </ReactSortable>
            </>
          </div>
          {/* 
            {activeVideoCourse.map((e, index) => (
              <>
                {" "}
                <tbody className="text-center">
                  <tr className="">
                    <th scope="row">{index + 1}</th>
                    <td className="font-s14 ">{e.name}</td>
                    <td className="font-s14 font-weight-bold">
                      {e.videoTime} دقیقه
                    </td>

                    <td className="d-flex">
                      <DeleteVideoInCourse name={e.name} />
                    </td>
                  </tr>
                </tbody>
              </>
            ))} */}
        </div>
      )}
    </div>
  );
};

export default ChooseVideo;
