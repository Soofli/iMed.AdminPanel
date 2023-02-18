import Image from "next/image";
import React, { useContext } from "react";
import test from "../../../public/images/1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import DeleteCategoryModal from "plugins/Modals/DeleteCategoryModal";
import PersianNumber from "plugins/PersianNumber";
import DeleteCourseModal from "plugins/Modals/DeleteCourseModal";
import { useRouter } from "next/router";
import AppContext from "@ctx/AppContext";
import DeleteFlashCardsCategoryModal from "plugins/Modals/DeleteFlashCardsCategoryModal";

const FlashCardsCart = ({
  imageFileName,
  author,
  name,
  price,
  teacher,
  courseCategoryName,
  isFree,
  flashCardCategoryId,
  isSuggested,
}) => {
  const router = useRouter();
  const context = useContext(AppContext);

  const handleEditCourse = () => {
    // context.GetCourse(courseId)
    router.push(
      "/dashboard/flash-cards/new-flash-card?id=" + flashCardCategoryId
    );
  };
  return (
    <div className="col-lg-3 mt-4">
      <div className="bg-cyan-700 rounded-md  overflow-hidden p-1">
        <div className="h-full w-full overflow-hidden">
          <div className="">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/file/image/${imageFileName}`}
              layout="responsive"
              alt=""
              className="object-cover "
              width={130}
              height={200}
            />
          </div>
        </div>

        <div className="absolute left-0 mt-[-20px] ml-[15px]">
          <p
            className="mb-0 badge bg-warning  mr-1  font-bold px-4 p-3 shadow"
            style={{ borderRadius: "0 30px 30px 0 " }}
          >
            {isSuggested ? "پیشنهاد ویژه" : ""}
          </p>
        </div>

        <div className="text-right  p-3">
          <h2 className="mb-1 font-s16 font-weight-bold white">{name}</h2>
          <div className="flex mt-3">
            <p className="mb-0 badge bg-dark white font-weight-light px-2 border-r50">
              {author}
            </p>

            {price != 0 ? (
              <p className="mb-0 badge bg-white   px-2 border-r50 mr-1 ">
                <PersianNumber
                  number={price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
                <small className="mr-2">تومان</small>
              </p>
            ) : (
              ""
            )}

            <p className="mb-0 badge bg-danger mr-1 white font-weight-light px-2 border-r50">
              {price <= 0 ? "رایگان" : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-90">
          <div className="bg-white shadow  rounded-b-xl d-flex justify-between overflow-hidden ">
            <DeleteFlashCardsCategoryModal
              flashCardCategoryId={flashCardCategoryId}
            />
            <div
              className="w-100 text-center border-r-2 pointer p-2  hover:bg-sky-700 hover:text-white tr03"
              onClick={() => handleEditCourse(true)}
            >
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCardsCart;
