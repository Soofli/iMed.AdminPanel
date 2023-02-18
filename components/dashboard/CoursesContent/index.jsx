import CoursesCart from "@comp/carts/Courses";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const CoursesContent = ({ dataCourses }) => {
  return (
    <div className="col-lg-9 mt-[100px]">
      <div className="w-fit border-b-2 d-flex pb-2 mb-5 ">
        <h1 className="mb-0 font-s16">دوره های آی مد</h1>
      </div>
      <div className="row">
        {dataCourses.map((e) => (
          <>
            <CoursesCart
              imageFileName={e.imageFileName}
              name={e.name}
              price={e.price}
              courseId={e.courseId}
              teacher={e.teacher}
              courseCategoryName={e.courseCategoryName}
              isFree={e.isFree}
              isSuggested={e.isSuggested}
            />
          </>
        ))}

        <div className="col-lg-4 mt-4">
          <Link href="courses/new-course">
            <a className="white no-underline">
              <div className="bg-cyan-700 tr03 shadow rounded-md h-[256px] text-center hover:bg-cyan-900   overflow-hidden pointer">
                {" "}
                <FontAwesomeIcon icon={faPlus} className="mt-[80px] font-s60" />
                <p className="mb-0 mt-2  no-underline">ساخت دوره جدید</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesContent;
