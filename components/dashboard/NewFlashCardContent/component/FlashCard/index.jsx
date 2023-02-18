import React, { useContext, useEffect } from "react";
import AddFlashCard from "plugins/Modals/AddFlashCard";
import FlashCardCart from "@comp/carts/FlashCard";
import { data } from "autoprefixer";
import AppContext from "@ctx/AppContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const FlashCardCreateContent = () => {
  const context = useContext(AppContext);
  const data = context.state.DataFlashCardSingleCategory;
  const [catName, setCatName] = useState([]);
  const [Category, setCategory] = useState([]);
  const [activeCat, setActiveCat] = useState(0);

  useEffect(() => {
    if (data.flashCards) {
      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);

          return rv;
        }, {});
      };
      const faqTemp = Object.values(
        groupBy(data.flashCards, "flashCardTagName")
      );
      setCategory(faqTemp);
      setCatName(Object.keys(groupBy(data.flashCards, "flashCardTagName")));
    }
  }, [data]);

  return (
    <>
      <div className="w-fit border-b-2 d-flex pb-2 mb-3 mt-5 ">
        <h1 className="mb-0 font-s16">ساخت فلش کارت </h1>{" "}
      </div>{" "}
      <div className="row mt-5">
        {catName.map((e, index) => (
          <>
            <div
              className="w-100"
              key={index}
              onClick={() => setActiveCat(index)}
            >
              <div className="bg-info white rounded-xl p-3 flex justify-between my-2 pointer tr03">
                <h3 className="mb-0 text-base font-bold white">{e}</h3>
                {activeCat == index ? (
                  <FontAwesomeIcon icon={faChevronDown} className="white" />
                ) : (
                  <FontAwesomeIcon icon={faChevronLeft} className="white" />
                )}
              </div>
            </div>
            {activeCat == index ? (
              <div className="col-lg-12">
                <div className="row  mb-3 tr03">
                  {data && data.flashCards ? (
                    <>
                      {data &&
                        Category &&
                        Category[index].map((e) => (
                          <>
                            <FlashCardCart catName={data.name} data={e} />
                          </>
                        ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ))}
      </div>
      <AddFlashCard />
    </>
  );
};

export default FlashCardCreateContent;
