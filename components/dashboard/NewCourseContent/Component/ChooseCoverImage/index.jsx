import AppContext from "@ctx/AppContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import AddCoverCourseModal from "plugins/Modals/AddCoverCourseModal";
import React, { useContext } from "react";
import test from "../../../../../public/images/1.jpg";

const ChooseCoverImage = ({ title }) => {
  const context = useContext(AppContext);
  const image = context.state.CoverCourse;
  return (
    <div className="col-lg-3 mt-4 ">
      {" "}
      {image == null ? (
        <AddCoverCourseModal title={title} />
      ) : image.length <= 0 ? (
        <AddCoverCourseModal title={title} />
      ) : (
        <>
          <div>
            <div className="w-100 h-200-px border-r20 shadow-md bg-cyan-700 pointer mt-3  overflow-hidden">
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/file/image/${image}`}
                  layout="responsive"
                  alt=""
                  width="100"
                  height="100"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-90">
                <div className="bg-white shadow  mt-2 rounded-xl d-flex justify-between overflow-hidden ">
                  <div
                    className="w-100 text-center border-r-2 pointer p-2  hover:bg-sky-700 hover:text-white tr03"
                    onClick={() => {
                      context.setCoverCourse("");
                      context.setActiveCoverCourse(null);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChooseCoverImage;
