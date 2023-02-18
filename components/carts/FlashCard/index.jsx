import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import DeleteFlashCardsModal from "plugins/Modals/DeleteFlashCardsModal";
import PersianNumber from "plugins/PersianNumber";
import { useRouter } from "next/router";
import AppContext from "@ctx/AppContext";

const FlashCardCart = ({ catName, data }) => {
  const router = useRouter();

  const context = useContext(AppContext);

  const handleEditFlashCard = () => {
    context.HandleModalFlashCard(true, data, "edit");
  };
  return (
    <div className="col-md-3 mt-3">
      <div className="bg-cyan-700 p-2 border-r10 ">
        <h2 className="mb-0 font-s13 text-right font-weight-light white h-50-px overflow-hidden">
          {data.question}
        </h2>
        <div className="flex mt-3">
          <p className="mb-0 badge bg-dark white font-weight-light mx-1 px-2 border-r50">
            <small className="mx-1 text-sm">
              {" "}
              <PersianNumber number={data.flashCardAnswers.length} />{" "}
            </small>
            جواب
          </p>
          <p className="mb-0 badge bg-warning  px-2 border-r50 ">
            {data.flashCardTagName}
          </p>
          {/* <p className="mb-0 badge bg-danger mr-1 white font-weight-light px-2 border-r50">
            {catName}
          </p> */}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-90">
          <div className="bg-white shadow  rounded-b-xl d-flex justify-between overflow-hidden ">
            <DeleteFlashCardsModal
              flashCardId={data.flashCardId}
              flashCardCategoryId={data.flashCardCategoryId}
            />
            <div
              className="w-100 text-center border-r-2 pointer p-2  hover:bg-sky-700 hover:text-white tr03"
              onClick={() => handleEditFlashCard(true)}
            >
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCardCart;
