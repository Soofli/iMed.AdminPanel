import CoursesCart from "@comp/carts/Courses";
import FlashCardsCart from "@comp/carts/FlashCards";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AddFlashCartCategory from "plugins/Modals/AddFlashCard";
import React from "react";

const FlashCardsContent = ({ dataFlashCardCategory }) => {
  return (
    <div className="col-lg-9 mt-[100px]">
      <div className="w-fit border-b-2 d-flex pb-2 mb-5 ">
        <h1 className="mb-0 font-s16">دسته بندی فلش کارت ها </h1>
      </div>
      <div className="row">
        {dataFlashCardCategory.map((e) => (
          <>
            <FlashCardsCart
              imageFileName={e.imageFileName}
              name={e.name}
              price={e.price}
              flashCardCategoryId={e.flashCardCategoryId}
              teacher={e.teacher}
              courseCategoryName={e.courseCategoryName}
              isFree={e.isFree}
              author={e.author}
              isSuggested={e.isSuggested}
            />
          </>
        ))}
        <div className="col-lg-3 mt-4">
          <Link href="/dashboard/flash-cards/new-flash-card">
            <a>
              <div className="bg-cyan-700 tr03 shadow rounded-md h-[256px] text-center hover:bg-cyan-900   overflow-hidden pointer">
                {" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mt-[80px] font-s60 white"
                />
                <p className="mb-0 mt-2  no-underline white">
                  ساخت دسته بندی جدید
                </p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashCardsContent;
